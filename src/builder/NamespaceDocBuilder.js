import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class NamespaceDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    var namespaceDocs = this._find({kind: ['namespace', 'module']});
    for (var namespaceDoc of namespaceDocs) {
      s.load('content', this._buildNamespaceDoc(namespaceDoc));
      callback(s.html, `${namespaceDoc.longname}.html`);
    }
  }

  _buildNamespaceDoc(namespaceDoc) {
    var memberof;
    if (namespaceDoc.longname === '@global') {
      memberof = {isUndefined: true};
    } else {
      memberof = namespaceDoc.longname;
    }

    var publicNamespaceDocs = this._find({kind: 'namespace', memberof, access: 'public'});
    var protectedNamespaceDocs = this._find({kind: 'namespace', memberof, access: 'protected'});
    var privateNamespaceDocs = this._find({kind: 'namespace', memberof, access: 'private'});

    var publicMethodDocs = this._find({kind: 'function', memberof, access: 'public'});
    var protectedMethodDocs = this._find({kind: 'function', memberof, access: 'protected'});
    var privateMethodDocs = this._find({kind: 'function', memberof, access: 'private'});

    var publicMemberDocs = this._find({kind: 'member', memberof, access: 'public'});
    var protectedMemberDocs = this._find({kind: 'member', memberof, access: 'protected'});
    var privateMemberDocs = this._find({kind: 'member', memberof, access: 'private'});

    var publicClassDocs = this._find({kind: 'class', memberof, access: 'public'});
    var protectedClassDocs = this._find({kind: 'class', memberof, access: 'protected'});
    var privateClassDocs = this._find({kind: 'class', memberof, access: 'private'});

    var publicInterfaceDocs = this._find({kind: 'interface', memberof, access: 'public'});
    var protectedInterfaceDocs = this._find({kind: 'interface', memberof, access: 'protected'});
    var privateInterfaceDocs = this._find({kind: 'interface', memberof, access: 'private'});

    var publicTypedefDocs = this._find({kind: 'typedef', memberof, access: 'public'});
    var protectedTypedefDocs = this._find({kind: 'typedef', memberof, access: 'protected'});
    var privateTypedefDocs = this._find({kind: 'typedef', memberof, access: 'private'});

    var s = new SpruceTemplate(this._readTemplate('namespace.html'));

    s.load('parentNamespace', this._buildDocLinkHTML(namespaceDoc.memberof || '@global'));
    s.text('access', namespaceDoc.access);
    s.text('kind', namespaceDoc.kind);
    s.text('namespace', namespaceDoc.name);
    s.load('namespaceDesc', namespaceDoc.description);

    s.drop('fileexampleDocs', !namespaceDoc.fileexamples);
    s.loop('fileexampleDoc', namespaceDoc.fileexamples, (i, fileexample, s)=>{
      s.text('fileexampleCode', fileexample);
    });

    if (namespaceDoc.since) {
      s.text('since', namespaceDoc.since);
    } else {
      s.drop('sinceLabel');
    }

    s.drop('classSummary', !(publicClassDocs.length + protectedClassDocs.length + privateClassDocs.length));
    s.load('summaryPublicClassDocs', this._buildSummaryClassDocs(publicClassDocs, false, 'Public Classes'));
    s.load('summaryProtectedClassDocs', this._buildSummaryClassDocs(protectedClassDocs, false, 'Protected Classes'));
    s.load('summaryPrivateClassDocs', this._buildSummaryClassDocs(privateClassDocs, false, 'Private Classes'));

    s.drop('interfaceSummary', !(publicInterfaceDocs.length + protectedInterfaceDocs.length + privateInterfaceDocs.length));
    s.load('summaryPublicInterfaceDocs', this._buildSummaryClassDocs(publicInterfaceDocs, false, 'Public Interfaces'));
    s.load('summaryProtectedInterfaceDocs', this._buildSummaryClassDocs(protectedInterfaceDocs, false, 'Protected Interfaces'));
    s.load('summaryPrivateInterfaceDocs', this._buildSummaryClassDocs(privateInterfaceDocs, false, 'Private Interfaces'));

    s.drop('typedefSummary', !(publicTypedefDocs.length + protectedTypedefDocs.length + privateTypedefDocs.length));
    s.load('summaryPublicTypedefDocs', this._buildSummaryMemberDocs(publicTypedefDocs, 'Public Typedefs'));
    s.load('summaryProtectedTypedefDocs', this._buildSummaryMemberDocs(protectedTypedefDocs, 'Protected Typedefs'));
    s.load('summaryPrivateTypedefDocs', this._buildSummaryMemberDocs(privateTypedefDocs, 'Private Typedefs'));

    s.drop('memberSummary', !(publicMemberDocs.length + protectedMemberDocs.length + privateMemberDocs.length));
    s.load('summaryPublicMemberDocs', this._buildSummaryMemberDocs(publicMemberDocs, 'Public Members'));
    s.load('summaryProtectedMemberDocs', this._buildSummaryMemberDocs(protectedMemberDocs, 'Protected Members'));
    s.load('summaryPrivateMemberDocs', this._buildSummaryMemberDocs(privateMemberDocs, 'Private Members'));

    s.drop('methodSummary', !(publicMethodDocs.length + protectedMethodDocs.length + privateMethodDocs.length));
    s.load('summaryPublicMethodDocs', this._buildSummaryFunctionDocs(publicMethodDocs, 'Public Methods'));
    s.load('summaryProtectedMethodDocs', this._buildSummaryFunctionDocs(protectedMethodDocs, 'Protected Methods'));
    s.load('summaryPrivateMethodDocs', this._buildSummaryFunctionDocs(privateMethodDocs, 'Private Methods'));

    s.drop('namespaceSummary', !(publicNamespaceDocs.length + protectedNamespaceDocs.length + privateNamespaceDocs.length));
    s.load('summaryPublicNamespaceDocs', this._buildSummaryNamespaceDocs(publicNamespaceDocs, 'Public Namespaces'));
    s.load('summaryProtectedNamespaceDocs', this._buildSummaryNamespaceDocs(protectedNamespaceDocs, 'Protected Namespaces'));
    s.load('summaryPrivateNamespaceDocs', this._buildSummaryNamespaceDocs(privateNamespaceDocs, 'Private Namespaces'));

    s.load('publicMemberDocs', this._buildMemberDocs(publicMemberDocs, 'Public Members'));
    s.load('protectedMemberDocs', this._buildMemberDocs(protectedMemberDocs, 'Protected Members'));
    s.load('privateMemberDocs', this._buildMemberDocs(privateMemberDocs, 'Private Members'));

    s.load('publicMethodDocs', this._buildFunctionDocs(publicMethodDocs, 'Public Methods'));
    s.load('protectedMethodDocs', this._buildFunctionDocs(protectedMethodDocs, 'Protected Methods'));
    s.load('privateMethodDocs', this._buildFunctionDocs(privateMethodDocs, 'Private Methods'));

    s.load('publicTypedefDocs', this._buildMemberDocs(publicTypedefDocs, 'Public Typedefs'));
    s.load('protectedTypedefDocs', this._buildMemberDocs(protectedTypedefDocs, 'Protected Typedefs'));
    s.load('privateTypedefDocs', this._buildMemberDocs(privateTypedefDocs, 'Private Typedefs'));

    return s;
  }
}
