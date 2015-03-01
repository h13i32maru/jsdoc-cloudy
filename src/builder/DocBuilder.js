import fs from 'fs';
import path from 'path';
import escape from 'escape-html';
import SpruceTemplate from 'spruce-template';

export default class DocBuilder {
  constructor(data) {
    this._data = data;

    this._resolveGlobalNamespace();
    this._resolveIgnore();
    this._resolveCustomTag();
    this._resolveAccess();
    this._resolveLink();
    this._resolveCallback();
    this._resolveSourceCode();
    this._resolveExtendsChain();
  }

  /**
   * @abstract
   * @param callback
   */
  exec(callback) {
  }

  _shorten(doc) {
    if (!doc) return '';

    if (doc.summary) return doc.summary;

    var desc = doc.description;
    if (!desc) return '';

    var len = desc.length;
    var inSQuote = false;
    var inWQuote = false;
    var inCode = false;
    for (var i = 0; i < desc.length; i++) {
      var char1 = desc.charAt(i);
      var char2 = desc.charAt(i + 1);
      var char4 = desc.substr(i, 6);
      var char5 = desc.substr(i, 7);
      if (char1 === "'") inSQuote = !inSQuote;
      else if (char1 === '"') inWQuote = !inWQuote;
      else if (char4 === '<code>') inCode = true;
      else if (char5 === '</code>') inCode = false;

      if (inSQuote || inCode || inWQuote) continue;

      if (char1 === '.') {
        if (char2 === ' ' || char2 === '\n') {
          len = i + 1;
          break;
        }
      } else if (char1 === '\n') {
        len = i + 1;
        break;
      }
    }

    return desc.substr(0, len);
  }

  _resolveIgnore() {
    if (this._data.__RESOLVED_IGNORE__) return;

    var docs = this._find({ignore: true});
    for (var doc of docs) {
      var regex = new RegExp(`^${doc.longname}[.~#]`);
      this._data({longname: {regex: regex}}).remove();
    }
    this._data({ignore: true}).remove();

    this._data.__RESOLVED_IGNORE__ = true;
  }

  _resolveAccess() {
    if (this._data.__RESOLVED_ACCESS__) return;

    var docs = this._find({access: {isUndefined: true}});
    for (var doc of docs) {
      doc.access = 'public';
    }

    this._data.__RESOLVED_ACCESS__ = true;
  }

  _resolveGlobalNamespace() {
    if (this._data.__RESOLVED_GLOBAL_NAMESPACE__) return;

    var docs = this._find({memberof: {isUndefined: true}});
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

    var docs = this._find({tags: {isUndefined: false}});
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
        //return buildLinkHTML(longname);
        return this._buildDocLinkHTML(longname);
      });
    };

    //var buildLinkHTML = (longname)=>{
    //  var doc = this._find({longname})[0];
    //  if (!doc) return;
    //
    //  if (doc.kind === 'function' || doc.kind === 'member') {
    //    var parentLongname = doc.memberof || '@global';
    //    var url = `${parentLongname}.html#${doc.scope}-${doc.name}`;
    //    return `<a href="${url}">${longname}</a>`;
    //  } else if (doc.kind === 'external') {
    //    return doc.see[0];
    //  } else {
    //    var url = `${longname}.html`;
    //    return `<a href="${url}">${longname}</a>`;
    //  }
    //};

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

    var typedefDocs = this._find({kind: 'typedef'});
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

    var docs = this._find({kind: 'file'});
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

        var superClassDoc = this._find({longname: doc.augments[0]})[0];
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
        var superClassDoc = this._find({longname: chains[0]})[0];
        if (!superClassDoc._custom_direct_subclasses) superClassDoc._custom_direct_subclasses = [];
        superClassDoc._custom_direct_subclasses.push(selfDoc.longname);

        // indirect subclass
        for (var superClassLongname of chains.slice(1)) {
          var superClassDoc = this._find({longname: superClassLongname})[0];
          if (!superClassDoc._custom_indirect_subclasses) superClassDoc._custom_indirect_subclasses = [];
          superClassDoc._custom_indirect_subclasses.push(selfDoc.longname);
        }

        // extends chains
        selfDoc._custom_extends_chains = chains.reverse();
      }
    };

    var docs = this._find({kind: ['class', 'interface'], augments: {isUndefined: false}});
    for (var doc of docs) {
      extendsChain(doc);
    }

    this._data.__RESOLVED_EXTENDS_CHAIN__ = true;
  }

  _find(...cond) {
    return this._data(...cond).order('name asec').map(v => v);
  }

  _readTemplate(fileName) {
    var filePath = path.resolve(__dirname, `./template/${fileName}`);
    return fs.readFileSync(filePath, {encoding: 'utf-8'});
  }

  _buildLayoutDoc() {
    var s = new SpruceTemplate(this._readTemplate('layout.html'), {autoClose: false});
    s.text('date', new Date().toString());
    s.load('nav', this._buildNavDoc());
    return s;
  }

  _buildNavDoc() {
    var html = this._readTemplate('nav.html');
    var s = new SpruceTemplate(html);

    // classes
    var classDocs = this._find({kind: 'class'});
    s.loop('classDoc', classDocs, (i, classDoc, s)=>{
      s.load('classDoc', this._buildDocLinkHTML(classDoc.longname));
      //s.text('className', classDoc.name);
      //s.attr('className', 'href', `${encodeURIComponent(classDoc.longname)}.html`)
    });

    // interfaces
    var interfaceDocs = this._find({kind: 'interface'});
    s.loop('interfaceDoc', interfaceDocs, (i, interfaceDoc, s)=>{
      s.load('interfaceDoc', this._buildDocLinkHTML(interfaceDoc.longname));
      //s.text('interfaceName', interfaceDoc.name);
      //s.attr('interfaceName', 'href', `${encodeURIComponent(interfaceDoc.longname)}.html`)
    });

    // namespaces
    var namespaceDocs = this._find({kind: 'namespace'});
    s.loop('namespaceDoc', namespaceDocs, (i, namespaceDoc, s)=>{
      s.load('namespaceDoc', this._buildDocLinkHTML(namespaceDoc.longname));
      //s.text('namespace', namespaceDoc.name);
      //s.attr('namespace', 'href', `${encodeURIComponent(namespaceDoc.longname)}.html`);
    });

    // modules
    var moduleDocs = this._find({kind: 'module'});
    s.loop('moduleDoc', moduleDocs, (i, moduleDoc, s)=>{
      s.load('moduleDoc', this._buildDocLinkHTML(moduleDoc.longname));
      //s.text('module', moduleDoc.name);
      //s.attr('module', 'href', `${encodeURIComponent(moduleDoc.longname)}.html`);
    });

    // mixin
    var mixinDocs = this._find({kind: 'mixin'});
    s.loop('mixinDoc', mixinDocs, (i, mixinDoc, s)=>{
      s.load('mixinDoc', this._buildDocLinkHTML(mixinDoc.longname));
      //s.text('mixin', mixinDoc.name);
      //s.attr('mixin', 'href', `${encodeURIComponent(mixinDoc.longname)}.html`);
    });


    // files
    var fileDocs = this._find({kind: 'file'});
    s.loop('fileDoc', fileDocs, (i, fileDoc, s)=>{
      s.load('fileDoc', this._buildFileDocLinkHTML(fileDoc));
      //s.text('file', fileDoc.name);
      //s.attr('file', 'href', `@file-${fileDoc.longname}.html`);
    });

    return s;
  }

  _buildSummaryMemberDocs(memberDocs = [], title = 'Members') {
    if (memberDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', title);
    s.loop('target', memberDocs, (i, memberDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(memberDoc.longname));
      s.load('signature', this._buildSignatureHTML(memberDoc));
      s.load('description', this._shorten(memberDoc));
      s.text('readonly', memberDoc.readonly ? 'readonly' : '');
      s.text('access', memberDoc.access);
      s.drop('sinceLabel', !memberDoc.since);
      s.text('since', memberDoc.since);
      s.load('deprecated', this._buildDeprecatedHTML(memberDoc));
      s.load('experimental', this._buildExperimentalHTML(memberDoc));
      s.drop('versionLabel', !memberDoc.version);
      s.text('version', memberDoc.version);
    });

    return s;
  }

  _buildSummaryFunctionDocs(functionDocs = [], title = 'Functions') {
    if (functionDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', title);
    s.loop('target', functionDocs, (i, functionDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(functionDoc.longname, null, true));
      s.load('signature', this._buildSignatureHTML(functionDoc));
      s.load('description', this._shorten(functionDoc));
      s.text('virtual', functionDoc.virtual ? 'virtual' : '');
      s.text('override', functionDoc.override ? 'override' : '');
      s.text('access', functionDoc.access);
      s.drop('sinceLabel', !functionDoc.since);
      s.text('since', functionDoc.since);
      s.load('deprecated', this._buildDeprecatedHTML(functionDoc));
      s.load('experimental', this._buildExperimentalHTML(functionDoc));
      s.drop('versionLabel', !functionDoc.version);
      s.text('version', functionDoc.version);
    });

    return s;
  }

  _buildSummaryClassDocs(classDocs = [], innerLink = false, title = 'Classes') {
    if (classDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', title);
    s.loop('target', classDocs, (i, classDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(classDoc.longname));
      s.load('signature', this._buildSignatureHTML(classDoc));
      s.load('description', this._shorten(classDoc));
      s.text('access', classDoc.access);
      s.drop('sinceLabel', !classDoc.since);
      s.text('since', classDoc.since);
      s.load('deprecated', this._buildDeprecatedHTML(classDoc));
      s.load('experimental', this._buildExperimentalHTML(classDoc));
      s.drop('versionLabel', !classDoc.version);
      s.text('version', classDoc.version);
    });

    return s;
  }

  _buildSummaryNamespaceDocs(namespaceDocs = [], title = 'Namespaces') {
    if (namespaceDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', title);
    s.loop('target', namespaceDocs, (i, namespaceDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(namespaceDoc.longname));
      s.drop('signature');
      s.load('description', this._shorten(namespaceDoc));
      s.text('access', namespaceDoc.access);
      s.drop('sinceLabel', !namespaceDoc.since);
      s.text('since', namespaceDoc.since);
      s.load('deprecated', this._buildDeprecatedHTML(namespaceDoc));
      s.load('experimental', this._buildExperimentalHTML(namespaceDoc));
      s.drop('versionLabel', !namespaceDoc.version);
      s.text('version', namespaceDoc.version);
    });

    return s;
  }

  _getURL(doc, inner = false) {
    // inner?
    if (['function', 'member', 'typedef', 'constant', 'event'].indexOf(doc.kind) !== -1) {
      inner = true;
      var parentLongname = doc.memberof;
    } else {
      if (inner) {
        if (['class', 'interface'].indexOf(doc.kind) !== -1) {
          var parentLongname = doc.longname;
        } else {
          throw new Error('inner option is only used ith class or interface.');
        }
      }
    }

    if (inner) {
      var parentDoc = this._find({longname: parentLongname})[0];
      if (!parentDoc) return;
      var fileName = this._getOutputFileName(parentDoc);
      return `${encodeURIComponent(fileName)}#${doc.scope}-${doc.name}`;
    } else {
      var fileName = this._getOutputFileName(doc);
      return encodeURIComponent(fileName);
    }
  }

  _getOutputFileName(doc) {
    var prefix = doc.kind === 'file' ? '@file-' : '';
    var name = doc.longname.replace(/\//g, '|');
    return `${prefix}${name}.html`;
  }

  _buildFileDocLinkHTML(doc) {
    if (!doc) return;
    if (!doc.meta) return;

    var fileDoc;
    if (doc.kind === 'file') {
      fileDoc = doc;
    } else {
      var fileName = doc.meta.filename;
      fileDoc = this._find({kind: 'file', name: fileName})[0];
    }

    if (!fileDoc) return;

    return `<span><a href="${this._getURL(fileDoc)}">${fileDoc.name}</a></span>`;
  }

  _buildDocLinkHTML(longname, text = null, inner = false) {
    if (typeof longname !== 'string') throw new Error(JSON.stringify(longname));

    var doc = this._find({longname})[0];
    if (!doc)  return `<span>${escape(text || longname)}</span>`;

    if (doc.kind === 'external') {
      var text = doc.longname.replace(/^external:\s*/, '');
      var aTag = doc.see[0].replace(/>.*?</, `>${text}<`);
      return `<span>${aTag}</span>`;
    } else {
      text = escape(text || doc.name);
      var url = this._getURL(doc, inner);
      if (url) {
        return `<span><a href="${url}">${text}</a></span>`;
      } else {
        return `<span>${text}</span>`;
      }
    }
  }

  _buildSignatureHTML(doc) {
    // call signature
    var callSignatures = [];
    if (doc.params) {
      for (var param of doc.params) {
        var paramName = param.name;
        if (paramName.indexOf('.') !== -1) continue;

        var types = [];
        for (var typeName of param.type.names) {
          types.push(this._buildDocLinkHTML(typeName));
        }

        callSignatures.push(`${paramName}: ${types.join(' | ')}`);
      }
    }

    // return signature
    var returnSignatures = [];
    if (doc.returns) {
      for (var typeName of doc.returns[0].type.names) {
        returnSignatures.push(this._buildDocLinkHTML(typeName));
      }
    }

    // type signature
    var typeSignatures = [];
    if (doc.type) {
      for (var typeName of doc.type.names) {
        typeSignatures.push(this._buildDocLinkHTML(typeName));
      }
    }

    var html = '';
    if (callSignatures.length) html = `(${callSignatures.join(', ')})`;
    if (returnSignatures.length) html = `${html}: ${returnSignatures.join(' | ')}`;
    if (typeSignatures.length) html = `${html}: ${typeSignatures.join(' | ')}`;

    return html;
  }

  _buildDetailDocs(docs, title) {
    var s = new SpruceTemplate(this._readTemplate('details.html'));

    s.text('title', title);
    s.drop('title', !docs.length);

    s.loop('detail', docs, (i, doc, s)=>{
      s.attr('anchor', 'id', `${doc.scope}-${doc.name}`);
      s.text('name', doc.name);
      s.load('signature', this._buildSignatureHTML(doc));
      s.load('description', doc.description);
      s.text('virtual', doc.virtual ? 'virtual' : '');
      s.text('override', doc.override ? 'override' : '');
      s.text('access', doc.access);
      s.drop('sinceLabel', !doc.since);
      s.text('since', doc.since);
      s.load('deprecated', this._buildDeprecatedHTML(doc));
      s.load('experimental', this._buildExperimentalHTML(doc));
      s.text('readonly', doc.readonly ? 'readonly' : '');

      if (doc.kind === 'function') {
        s.load('properties', this._buildProperties(doc.params, 'Params:'));
      } else {
        s.load('properties', this._buildProperties(doc.properties, 'Properties:'));
      }

      // author
      s.drop('authorWrap', !doc.author);
      s.load('author', this._buildAuthorHTML(doc));

      // version
      if (doc.version) {
        s.text('version', doc.version);
      } else {
        s.drop('versionWrap');
      }

      // default
      if ('defaultvalue' in doc) {
        s.text('defaultvalue', doc.defaultvalue);
      } else {
        s.drop('defaultvalueWrap');
      }

      // inherits
      if (doc.inherits) {
        s.load('inherit', this._buildDocLinkHTML(doc.inherits));
      } else {
        s.drop('inheritWrap');
      }

      // this
      if (doc.this) {
        s.load('this', this._buildDocLinkHTML(doc.this));
      } else {
        s.drop('thisWrap');
      }

      // fire
      if (doc.fires) {
        s.loop('fireEvent', doc.fires, (i, fire, s)=>{
          var link = this._buildDocLinkHTML(fire);
          s.load('event', link);
        });
      } else {
        s.drop('fires');
      }

      // listen
      if (doc.listens) {
        s.loop('listenEvent', doc.listens, (i, listen, s)=>{
          var link = this._buildDocLinkHTML(listen);
          s.load('event', link);
        });
      } else {
        s.drop('listens');
      }

      // return
      if (doc.returns) {
        s.load('returnDescription', doc.returns[0].description);
        var typeNames = [];
        for (var typeName of doc.returns[0].type.names) {
          typeNames.push(this._buildDocLinkHTML(typeName));
        }
        if ('nullable' in doc.returns[0]) {
          var nullable = doc.returns[0].nullable;
          s.load('returnType', typeNames.join(' | ') + ` (nullable: ${nullable})`);
        } else {
          s.load('returnType', typeNames.join(' | '));
        }

        s.load('returnProperties', this._buildProperties(doc.properties, 'Return Properties:'));
      } else {
        s.drop('returnParams');
      }

      // throws
      if (doc.exceptions) {
        s.loop('throw', doc.exceptions, (i, exceptionDoc, s)=>{
          s.load('throwName', this._buildDocLinkHTML(exceptionDoc.type.names[0]));
          s.load('throwDesc', exceptionDoc.description);
        });
      } else {
        s.drop('throws');
      }

      // example
      var exampleDocs = doc.examples;
      s.loop('exampleDoc', exampleDocs, (i, exampleDoc, s)=>{
        s.text('exampleCode', exampleDoc);
      });
      if (!exampleDocs) {
        s.drop('example');
      }

      // see
      var seeDocs = doc.see;
      if (seeDocs) {
        s.loop('see', seeDocs, (i, seeDoc, s)=>{
          s.load('seeLink', seeDoc);
        });
      } else {
        s.drop('seeWrap');
      }

      s.drop('todoWrap', !doc.todo);
      s.loop('todo', doc.todo, (i, todo, s)=>{
        s.load('todo', todo);
      });
    });

    return s.html;
  }

  _buildProperties(properties, title = 'Properties:') {
    var s = new SpruceTemplate(this._readTemplate('properties.html'));

    s.text('title', title);

    s.loop('property', properties, (i, prop, s)=>{
      s.autoDrop = false;
      s.attr('property', 'data-depth', prop.name.split('.').length - 1);
      s.text('name', prop.name);
      s.attr('name', 'data-depth', prop.name.split('.').length - 1);
      s.load('description', prop.description);

      var typeNames = [];
      for (var typeName of prop.type.names) {
        typeNames.push(this._buildDocLinkHTML(typeName));
      }
      s.load('type', typeNames.join(' | '));

      // appendix
      var appendix = [];
      if (prop.optional) {
        appendix.push('<li>optional</li>');
      }
      if ('defaultvalue' in prop) {
        appendix.push(`<li>default: ${prop.defaultvalue}</li>`);
      }
      if ('nullable' in prop) {
        appendix.push(`<li>nullable: ${prop.nullable}</li>`);
      }
      if (appendix.length) {
        s.load('appendix', `<ul>${appendix.join('\n')}</ul>`);
      } else {
        s.text('appendix', '');
      }
    });

    if (!properties) {
      s.drop('properties');
    }

    return s;
  }

  _buildDeprecatedHTML(doc) {
    if (doc.deprecated) {
      var kind = doc.kind;

      if (kind === 'function') kind = 'method';
      else if(kind === 'typedef' && doc._custom_is_callback) kind = 'callback';

      var deprecated = [`this ${kind} was deprecated.`];
      if (typeof doc.deprecated === 'string') deprecated.push(doc.deprecated);
      return deprecated.join(' ');
    } else {
      return '';
    }
  }

  _buildExperimentalHTML(doc) {
    if (doc.experimental) {
      var kind = doc.kind;

      if (kind === 'function') kind = 'method';
      else if(kind === 'typedef' && doc._custom_is_callback) kind = 'callback';

      var experimental = [`this ${kind} is experimental.`];
      if (typeof doc.experimental === 'string') experimental.push(doc.experimental);
      return experimental.join(' ');
    } else {
      return '';
    }
  }

  _buildAuthorHTML(doc) {
    if (!doc.author) return '';

    var html = [];
    for (var author of doc.author) {
      var matched = author.match(/(.*?) *<(.*?)>/);
      if (matched) {
        var name = matched[1];
        var link = matched[2];
        if (link.indexOf('http') === 0) {
          html.push(`<span><a href="${link}">${name}</a></span>`)
        } else {
          html.push(`<span><a href="mailto:${link}">${name}</a></span>`)
        }
      } else {
        html.push(`<span>${author}</span>`)
      }
    }

    return html.join(', ');
  }

  _buildFileFooterHTML(doc) {
    if (!doc) return '';

    var s = new SpruceTemplate(this._readTemplate('file-footer.html'));

    var flag = false;

    if (doc.copyright) {
      flag = true;
      s.text('copyright', doc.copyright);
    }

    if (doc.license) {
      flag = true;
      s.text('license', doc.license);
    }

    return flag ? s.html : '';
  }
}
