import fs from 'fs';
import path from 'path';

export default class DocResolver {
  constructor(builder) {
    this._builder = builder;
    this._data = builder._data;
  }

  resolve() {
    this._resolveGlobalNamespace();
    this._resolveIgnore();
    this._resolveCustomTag();
    this._resolveAccess();
    this._resolveLink();
    this._resolveCallback();
    this._resolveSourceCode();
    this._resolveExtendsChain();
  }

  _resolveIgnore() {
    if (this._data.__RESOLVED_IGNORE__) return;

    var docs = this._builder._find({ignore: true});
    for (var doc of docs) {
      var regex = new RegExp(`^${doc.longname}[.~#]`);
      this._data({longname: {regex: regex}}).remove();
    }
    this._data({ignore: true}).remove();

    this._data.__RESOLVED_IGNORE__ = true;
  }

  _resolveAccess() {
    if (this._data.__RESOLVED_ACCESS__) return;

    var docs = this._builder._find({access: {isUndefined: true}});
    for (var doc of docs) {
      doc.access = 'public';
    }

    this._data.__RESOLVED_ACCESS__ = true;
  }

  _resolveGlobalNamespace() {
    if (this._data.__RESOLVED_GLOBAL_NAMESPACE__) return;

    var docs = this._builder._find({memberof: {isUndefined: true}});
    if (docs.length) {
      for (var doc of docs) {
        doc.memberof = '@global';
      }

      var globalNamespaceDoc = {
        comment: '',
        longname: '@global',
        name: '@global',
        kind: 'namespace',
        description: 'global object.',
        memberof: '@global'
      };
      this._data.insert(globalNamespaceDoc);
    }

    this._data.__RESOLVED_GLOBAL_NAMESPACE__ = true;
  }

  _resolveCustomTag() {
    if (this._data.__RESOLVED_CUSTOM_TAG__) return;

    var docs = this._builder._find({tags: {isUndefined: false}});
    for (var doc of docs) {
      var tags = doc.tags;
      for (var tag of tags) {
        if (tag.originalTitle === 'fileexample') {
          if (!doc.fileexamples) doc.fileexamples = [];
          doc.fileexamples.push(tag.text);
        } else if (tag.originalTitle === 'experimental') {
          doc.experimental = tag.text;
        }
      }
    }

    this._data.__RESOLVED_CUSTOM_TAG__ = true;
  }

  _resolveLink() {
    if(this._data.__RESOLVED_LINK__) return;

    var link = (str)=>{
      if (!str) return str;

      return str.replace(/\{@link ([\w\#_\-.:\~\/]+)}/g, (str, longname)=>{
        return this._builder._buildDocLinkHTML(longname);
      });
    };

    this._data().each((v)=>{
      v.description = link(v.description);

      if (v.classdesc) {
        v.classdesc = link(v.classdesc);
      }

      if (v.params) {
        for (var param of v.params) {
          param.description = link(param.description);
        }
      }

      if (v.returns) {
        for (var returnParam of v.returns) {
          returnParam.description = link(returnParam.description);
        }
      }

      if (v.exceptions) {
        for (var e of v.exceptions) {
          e.description = link(e.description);
        }
      }

      if (v.see) {
        for (var i = 0; i < v.see.length; i++) {
          if (v.see[i].indexOf('{@link') === 0) {
            v.see[i] = link(v.see[i]);
          } else if(v.see[i].indexOf('<a href') === 0) {
            // ignore
          } else {
            v.see[i] = `<a href="${v.see[i]}">${v.see[i]}</a>`;
          }
        }
      }

    });

    this._data.__RESOLVED_LINK__ = true;
  }

  _resolveCallback() {
    if (this._data.__RESOLVED_CALLBACK__) return;

    var typedefDocs = this._builder._find({kind: 'typedef'});
    for (var typedefDoc of typedefDocs) {
      if (typedefDoc.comment.search(/\* +@callback +[\w_$]+/) !== -1) {
        typedefDoc._custom_is_callback = true;
      } else {
        typedefDoc._custom_is_callback = false;
      }
    }

    this._data.__RESOLVED_CALLBACK__ = true;
  }

  _resolveSourceCode() {
    if (this._data.__RESOLVED_SOURCE_CODE__) return;

    var docs = this._builder._find({kind: 'file'});
    for (var doc of docs) {
      var filePath = path.resolve(doc.meta.path, doc.meta.filename);
      var sourceCode = fs.readFileSync(filePath, {encode: 'utf-8'});
      doc._custom_source_code = sourceCode;
    }

    this._data.__RESOLVED_SOURCE_CODE__ = true;
  }

  _resolveExtendsChain() {
    if (this._data.__RESOLVED_EXTENDS_CHAIN__) return;

    var extendsChain = (doc) => {
      var selfDoc = doc;

      // traverse super class.
      var chains = [];
      while (1) {
        if (!doc.augments) break;

        var superClassDoc = this._builder._find({longname: doc.augments[0]})[0];
        if (superClassDoc) {
          chains.push(superClassDoc.longname);
          doc = superClassDoc;
        } else {
          chains.push(doc.augments[0]);
          break;
        }
      }

      if (chains.length) {
        // direct subclass
        var superClassDoc = this._builder._find({longname: chains[0]})[0];
        if (!superClassDoc._custom_direct_subclasses) superClassDoc._custom_direct_subclasses = [];
        superClassDoc._custom_direct_subclasses.push(selfDoc.longname);

        // indirect subclass
        for (var superClassLongname of chains.slice(1)) {
          var superClassDoc = this._builder._find({longname: superClassLongname})[0];
          if (!superClassDoc._custom_indirect_subclasses) superClassDoc._custom_indirect_subclasses = [];
          superClassDoc._custom_indirect_subclasses.push(selfDoc.longname);
        }

        // extends chains
        selfDoc._custom_extends_chains = chains.reverse();
      }
    };

    var docs = this._builder._find({kind: ['class', 'interface'], augments: {isUndefined: false}});
    for (var doc of docs) {
      extendsChain(doc);
    }

    this._data.__RESOLVED_EXTENDS_CHAIN__ = true;
  }
}
