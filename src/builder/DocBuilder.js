import fs from 'fs';
import path from 'path';
import escape from 'escape-html';
import SpruceTemplate from 'spruce-template';

export default class DocBuilder {
  constructor(data) {
    this._data = data;

    this._resolveFileExample();
    this._resolveAccess();
    this._resolveGlobalNamespace();
    this._resolveLink();
  }

  /**
   * @abstract
   * @param callback
   */
  exec(callback) {
  }

  _shorten(desc) {
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

    if (this._find({memberof: {isUndefined: true}}).length) {
      var globalNamespaceDoc = {
        comment: '',
        longname: '@global',
        name: '@global',
        kind: 'namespace',
        description: 'global object.'
      };
      this._data.insert(globalNamespaceDoc);
    }

    this._data.__RESOLVED_GLOBAL_NAMESPACE__ = true;
  }

  _resolveFileExample() {
    var docs = this._find({kind: ['class', 'interface', 'namespace']});
    for (var doc of docs) {
      if (doc.__RESOLVED_FILE_EXAMPLE__) continue;

      var matched = doc.comment.match(/^\s*\*\s@fileexample((?:.|\n)*?)\n\s*\*(?:(?:\s@[a-z])|[/])/m);
      if (matched && matched[1]) {
        var lines = [];
        for (var temp of matched[1].split('\n')) {
          if (!temp) continue;
          temp = temp.replace(/^\s*\*? ?/, '');
          lines.push(temp);
        }
        doc.fileexample = lines.join('\n');
      }

      doc.__RESOLVED_FILE_EXAMPLE__ = true;
    }
  }

  _resolveLink() {
    if(this._data.__RESOLVED_LINK__) return;

    function link(str) {
      if (!str) return str;

      return str.replace(/\{@link ([\w\#_\-.]+)}/g, (str, longname)=>{
        return `<a href="${url(longname)}">${longname}</a>`;
      });
    }

    var url = (longname)=>{
      var doc = this._find({longname})[0];
      if (!doc) return;

      if (doc.kind === 'function' || doc.kind === 'member') {
        var parentLongname = longname.replace(doc.name, '').replace(/.$/, '');
        if (!parentLongname) parentLongname = '@global';
        return `${parentLongname}.html#${doc.scope}-${doc.name}`;
      } else {
        return `${longname}.html`;
      }
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
          } else {
            v.see[i] = `<a href="${v.see[i]}">${v.see[i]}</a>`;
          }
        }
      }

    });

    this._data.__RESOLVED_LINK__ = true;
  }

  _find(...cond) {
    return this._data(...cond).map(v => v);
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
      s.text('className', classDoc.name);
      s.attr('className', 'href', `./${classDoc.longname}.html`)
    });

    // interfaces
    var interfaceDocs = this._find({kind: 'interface'});
    s.loop('interfaceDoc', interfaceDocs, (i, interfaceDoc, s)=>{
      s.text('interfaceName', interfaceDoc.name);
      s.attr('interfaceName', 'href', `./${interfaceDoc.longname}.html`)
    });

    // namespaces
    var namespaceDocs = this._find({kind: 'namespace'});
    s.loop('namespaceDoc', namespaceDocs, (i, namespaceDoc, s)=>{
      s.text('namespace', namespaceDoc.longname);
      s.attr('namespace', 'href', `${namespaceDoc.longname}.html`);
    });

    return s;
  }

  _buildSummaryMemberDocs(memberDocs = [], title = 'Members') {
    if (memberDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', title);
    s.loop('target', memberDocs, (i, memberDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(memberDoc, memberDoc.name, {inner: true}));
      s.load('signature', this._buildVariableSignatureHTML(memberDoc));
      s.load('description', this._shorten(memberDoc.description));
      s.attr('name', 'data-deprecated', memberDoc.deprecated);
      s.text('readonly', memberDoc.readonly ? 'readonly' : '');
      s.text('access', memberDoc.access);
      s.drop('sinceLabel', !memberDoc.since);
      s.text('since', memberDoc.since);
    });

    return s;
  }

  _buildSummaryFunctionDocs(functionDocs = [], title = 'Functions') {
    if (functionDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', title);
    s.loop('target', functionDocs, (i, functionDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(functionDoc, functionDoc.name, {inner: true}));
      s.load('signature', this._buildFunctionSignatureHTML(functionDoc));
      s.load('description', this._shorten(functionDoc.description));
      s.text('virtual', functionDoc.virtual ? 'virtual' : '');
      s.text('override', functionDoc.override ? 'override' : '');
      s.attr('name', 'data-deprecated', functionDoc.deprecated);
      s.text('access', functionDoc.access);
      s.drop('sinceLabel', !functionDoc.since);
      s.text('since', functionDoc.since);
    });

    return s;
  }

  _buildSummaryClassDocs(classDocs = [], innerLink = false) {
    if (classDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', 'Classes');
    s.loop('target', classDocs, (i, classDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(classDoc, classDoc.name, {inner: innerLink}));
      s.load('signature', this._buildFunctionSignatureHTML(classDoc));
      s.load('description', this._shorten(classDoc.description));
      s.attr('name', 'data-deprecated', classDoc.deprecated);
      s.text('access', classDoc.access);
      s.drop('sinceLabel', !classDoc.since);
      s.text('since', classDoc.since);
    });

    return s;
  }

  _buildSummaryNamespaceDocs(namespaceDocs = []) {
    if (namespaceDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', 'Namespaces');
    s.loop('target', namespaceDocs, (i, namespaceDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(namespaceDoc, namespaceDoc.name, {inner: false}));
      s.drop('signature');
      s.load('description', this._shorten(namespaceDoc.description));
      s.attr('name', 'data-deprecated', namespaceDoc.deprecated);
      s.text('access', namespaceDoc.access);
      s.drop('sinceLabel', !namespaceDoc.since);
      s.text('since', namespaceDoc.since);
    });

    return s;
  }

  _buildDocLinkHTML(doc, text = doc.longname || doc, {inner = false} = {}) {
    text = escape(text);

    var longname = doc.longname || doc;

    if (inner) {
      return `<span><a href=#${doc.scope}-${doc.name}>${text}</a></span>`;
    }

    if (longname === '@global') {
      return `<span><a href="@global.html">@global</a></span>`;
    }

    var result = this._find({longname})[0];
    if (result) {
      if (result.kind === 'external') {
        text = text.replace(/^external:\s*/, '');
        var aTag = result.see[0].replace(/>.*?</, `>${text}<`);
        return `<span>${aTag}</span>`;
      } else {
        return `<span><a href="${longname}.html">${text}</a></span>`;
      }
    } else {
      var result = this._find({name: longname});
      if (result && result.length) {
        return `<span><a href="${result[0].longname}.html">${text}</a></span>`;
      } else {
        return `<span>${text}</span>`;
      }
    }
  }

  _buildFunctionSignatureHTML(functionDoc) {
    var params = functionDoc.params || [];
    var signatures = [];
    for (var param of params) {
      var paramName = param.name;
      if (paramName.indexOf('.') !== -1) continue;

      var types = [];
      for (var typeName of param.type.names) {
        types.push(this._buildDocLinkHTML(typeName, typeName));
      }

      signatures.push(`${paramName}: ${types.join(' | ')}`);
    }

    var returnSignatures = [];
    if (functionDoc.returns) {
      for (var typeName of functionDoc.returns[0].type.names) {
        returnSignatures.push(this._buildDocLinkHTML(typeName, typeName));
      }
    }

    if (returnSignatures.length) {
      return '(' + signatures.join(', ') + '): ' + returnSignatures.join(' | ');
    } else {
      return '(' + signatures.join(', ') + ')';
    }
  }

  _buildVariableSignatureHTML(variableDoc) {
    if (!variableDoc.type) return '';

    var types = [];
    for (var typeName of variableDoc.type.names) {
      types.push(this._buildDocLinkHTML(typeName, typeName));
    }

    return ': ' + types.join(', ');
  }

  _buildFunctionDocs(functionDocs) {
    var s = new SpruceTemplate(this._readTemplate('methods.html'));

    s.loop('method', functionDocs, (i, functionDoc, s)=>{
      s.attr('anchor', 'id', `${functionDoc.scope}-${functionDoc.name}`);
      s.text('name', functionDoc.name);
      s.load('signature', this._buildFunctionSignatureHTML(functionDoc));
      s.load('description', functionDoc.description);
      s.text('virtual', functionDoc.virtual ? 'virtual' : '');
      s.text('override', functionDoc.override ? 'override' : '');
      s.text('access', functionDoc.access);
      s.attr('name', 'data-deprecated', functionDoc.deprecated);
      s.drop('sinceLabel', !functionDoc.since);
      s.text('since', functionDoc.since);

      // params
      s.loop('param', functionDoc.params, (i, param, s)=>{
        s.autoDrop = false;
        s.attr('param', 'data-depth', param.name.split('.').length - 1);
        s.text('name', param.name);
        s.attr('name', 'data-depth', param.name.split('.').length - 1);
        s.load('paramDescription', param.description);

        var typeNames = [];
        for (var typeName of param.type.names) {
          typeNames.push(this._buildDocLinkHTML(typeName));
        }
        s.load('type', typeNames.join(' | '));

        // appendix
        var appendix = [];
        if (param.optional) {
          appendix.push('<li>optional</li>');
        }
        if ('defaultvalue' in param) {
          appendix.push(`<li>default: ${param.defaultvalue}</li>`);
        }
        if ('nullable' in param) {
          appendix.push(`<li>nullable: ${param.nullable}</li>`);
        }
        if (appendix.length) {
          s.load('appendix', `<ul>${appendix.join('\n')}</ul>`);
        } else {
          s.text('appendix', '');
        }
      });

      if (!functionDoc.params) {
        s.drop('argumentParams');
      }

      // return
      if (functionDoc.returns) {
        s.load('returnDescription', functionDoc.returns[0].description);
        var typeNames = [];
        for (var typeName of functionDoc.returns[0].type.names) {
          typeNames.push(this._buildDocLinkHTML(typeName));
        }
        if ('nullable' in functionDoc.returns[0]) {
          var nullable = functionDoc.returns[0].nullable;
          s.load('returnType', typeNames.join(' | ') + ` (nullable: ${nullable})`);
        } else {
          s.load('returnType', typeNames.join(' | '));
        }
      } else {
        s.drop('returnParams');
      }

      // throws
      if (functionDoc.exceptions) {
        s.loop('throw', functionDoc.exceptions, (i, exceptionDoc, s)=>{
          s.load('throwName', this._buildDocLinkHTML(exceptionDoc.type.names[0]));
          s.load('throwDesc', exceptionDoc.description);
        });
      } else {
        s.drop('throws');
      }

      // example
      var exampleDocs = functionDoc.examples;
      s.loop('exampleDoc', exampleDocs, (i, exampleDoc, s)=>{
        s.text('exampleCode', exampleDoc);
      });
      if (!exampleDocs) {
        s.drop('example');
      }

      // see
      var seeDocs = functionDoc.see;
      if (seeDocs) {
        s.loop('see', seeDocs, (i, seeDoc, s)=>{
          s.load('seeLink', seeDoc);
        });
      } else {
        s.drop('seeWrap');
      }
    });

    return s.html;
  }

  _buildMemberDocs(memberDocs) {
    var s = new SpruceTemplate(this._readTemplate('members.html'));

    s.loop('member', memberDocs, (i, memberDoc, s)=>{
      s.attr('anchor', 'id', `${memberDoc.scope}-${memberDoc.name}`);
      s.text('name', memberDoc.name);
      s.load('signature', this._buildVariableSignatureHTML(memberDoc));
      s.load('description', memberDoc.description);
      s.text('access', memberDoc.access);
      s.attr('name', 'data-deprecated', memberDoc.deprecated);
      s.text('readonly', memberDoc.readonly ? 'readonly' : '');
      s.drop('sinceLabel', !memberDoc.since);
      s.text('since', memberDoc.since);

      // example
      var exampleDocs = memberDoc.examples;
      s.loop('exampleDoc', exampleDocs, (i, exampleDoc, s)=>{
        s.text('exampleCode', exampleDoc);
      });
      if (!exampleDocs) {
        s.drop('example');
      }

      // see
      var seeDocs = memberDoc.see;
      if (seeDocs) {
        s.loop('see', seeDocs, (i, seeDoc, s)=>{
          s.load('seeLink', seeDoc);
        });
      } else {
        s.drop('seeWrap');
      }
    });

    return s.html;
  }
}
