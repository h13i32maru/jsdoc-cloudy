import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class NamespaceDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    var namespaceDocs = this._find({kind: 'namespace'});
    for (var namespaceDoc of namespaceDocs) {
      s.load('content', this._buildNamespaceDoc(namespaceDoc));
      callback(s.html, `${namespaceDoc.longname}.html`);
    }
  }

  _buildNamespaceDoc(namespaceDoc) {
    if (namespaceDoc.longname === '@global') {
      var memberof = {isUndefined: true};
    } else {
      var memberof = namespaceDoc.longname;
    }
    var namespaceDocs = this._find({kind: 'namespace', memberof});
    var functionDocs = this._find({kind: 'function', memberof});
    var memberDocs = this._find({kind: 'member', memberof});
    var classDocs = this._find({kind: 'class', memberof});

    var s = new SpruceTemplate(this._readTemplate('namespace.html'));

    s.text('parentNamespace', namespaceDoc.namespace);
    s.text('namespace', namespaceDoc.longname);
    s.load('namespaceDesc', namespaceDoc.description);
    s.text('fileexampleCode', namespaceDoc.fileexample);
    s.drop('fileexampleDoc', !namespaceDoc.fileexample);

    s.load('summaryClassDocs', this._buildSummaryClassDocs(classDocs));
    s.load('summaryMemberDocs', this._buildSummaryMemberDocs(memberDocs, 'Members'));
    s.load('summaryFunctionDocs', this._buildSummaryFunctionDocs(functionDocs, 'Functions'));
    s.load('summaryNamespaceDocs', this._buildSummaryNamespaceDocs(namespaceDocs, 'Namespaces'));
    s.load('memberDocs', this._buildMemberDocs(memberDocs));
    s.load('functionDocs', this._buildFunctionDocs(functionDocs));

    return s;
  }
}
