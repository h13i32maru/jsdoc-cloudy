import fs from 'fs';
import path from 'path';
import escape from 'escape-html';
import SpruceTemplate from 'spruce-template';

export default class DocBuilder {
  constructor(data) {
    this._data = data;

    this._resolveFileExample();
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
    var docs = this._find([{kind: 'class'}, {kind: 'namespace'}]);
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
    function link(str) {
      if (!str) return str;

      return str.replace(/\{@link ([\w\#_\-.]+)}/g, (str, cap)=>{
        var temp = cap.split('#'); // cap = HogeFoo#bar
        temp[0] += '.html';
        return `<a href="${temp.join('#')}">${cap}</a>`;
      });
    }

    this._data().each((v)=>{
      if(v.__RESOLVED_LINK__) return;

      v.description = link(v.description);

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

      v.__RESOLVED_LINK__ = true;
    });
  }

  _find(cond) {
    return this._data(cond).map(v => v);
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

    // namespaces
    var namespaceDocs = this._find({kind: 'namespace'});
    //var globalNamespaceDoc = getGlobalNamespaceDoc(data);
    //if (globalNamespaceDoc) {
    //  namespaceDocs.unshift(globalNamespaceDoc);
    //}
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
      s.load('name', this._buildDocLinkHTML(memberDoc.name, memberDoc.name, {inner: true}));
      s.load('signature', this._buildVariableSignatureHTML(memberDoc));
      s.load('description', this._shorten(memberDoc.description));
    });

    return s;
  }

  _buildSummaryFunctionDocs(functionDocs = [], title = 'Functions') {
    if (functionDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', title);
    s.loop('target', functionDocs, (i, functionDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(functionDoc.name, functionDoc.name, {inner: true}));
      s.load('signature', this._buildFunctionSignatureHTML(functionDoc));
      s.load('description', this._shorten(functionDoc.description));
    });

    return s;
  }

  _buildSummaryClassDocs(classDocs = [], innerLink = false) {
    if (classDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', 'Classes');
    s.loop('target', classDocs, (i, classDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(classDoc.longname, classDoc.name, {inner: innerLink}));
      s.load('signature', this._buildFunctionSignatureHTML(classDoc));
      s.load('description', this._shorten(classDoc.description));
    });

    return s;
  }

  _buildSummaryNamespaceDocs(namespaceDocs = []) {
    if (namespaceDocs.length === 0) return '';

    var s = new SpruceTemplate(this._readTemplate('summary.html'));

    s.text('title', 'Namespaces');
    s.loop('target', namespaceDocs, (i, namespaceDoc, s)=>{
      s.load('name', this._buildDocLinkHTML(namespaceDoc.longname, namespaceDoc.name, {inner: false}));
      s.drop('signature');
      s.load('description', this._shorten(namespaceDoc.description));
    });

    return s;
  }

  _buildDocLinkHTML(longname, text = longname, {inner = false} = {}) {
    text = escape(text);

    if (inner) {
      return `<span><a href=#${longname}>${text}</a></span>`;
    }

    if (longname === '@global') {
      return `<span><a href="@global.html">@global</a></span>`;
    }

    var result = this._find({longname});
    if (result && result.length === 1) {
      return `<span><a href="${longname}.html">${text}</a></span>`;
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
    var types = [];
    for (var typeName of variableDoc.type.names) {
      types.push(this._buildDocLinkHTML(typeName, typeName));
    }

    return ': ' + types.join(', ');
  }

  _buildFunctionDocs(functionDocs) {
    var s = new SpruceTemplate(this._readTemplate('methods.html'));

    s.loop('method', functionDocs, (i, functionDoc, s)=>{
      s.attr('anchor', 'id', functionDoc.name);
      s.text('name', functionDoc.name);
      s.load('signature', this._buildFunctionSignatureHTML(functionDoc));
      s.load('description', functionDoc.description);

      // params
      s.loop('param', functionDoc.params, (i, param, s)=>{
        s.autoDrop = false;
        s.attr('param', 'data-depth', param.name.split('.').length - 1);
        s.text('name', param.name);
        s.attr('name', 'data-depth', param.name.split('.').length - 1);
        s.load('description', param.description);

        var typeNames = [];
        for (var typeName of param.type.names) {
          typeNames.push(this._buildDocLinkHTML(typeName));
        }
        s.load('type', typeNames.join(' | '));

        var appendix = [];
        if (param.optional) {
          appendix.push('optional');
        }
        s.text('appendix', appendix.join(', '));
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
        s.load('returnType', typeNames.join(' | '));
      } else {
        s.drop('returnParams');
      }

      // example
      var exampleDocs = functionDoc.examples;
      s.loop('exampleDoc', exampleDocs, (i, exampleDoc, s)=>{
        s.text('exampleCode', exampleDoc);
      });
      if (!exampleDocs) {
        s.drop('example');
      }
    });

    return s.html;
  }

// kind = member
  _buildMemberDocs(memberDocs) {
    var s = new SpruceTemplate(this._readTemplate('members.html'));

    s.loop('member', memberDocs, (i, memberDoc, s)=>{
      s.attr('anchor', 'id', memberDoc.name);
      s.text('name', memberDoc.name);
      s.load('signature', this._buildVariableSignatureHTML(memberDoc));
      s.load('description', memberDoc.description);

      // example
      var exampleDocs = memberDoc.examples;
      s.loop('exampleDoc', exampleDocs, (i, exampleDoc, s)=>{
        s.text('exampleCode', exampleDoc);
      });
      if (!exampleDocs) {
        s.drop('example');
      }
    });

    return s.html;
  }
}
