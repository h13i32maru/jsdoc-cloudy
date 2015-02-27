import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class NamespaceDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    var namespaceDocs = this._find({kind: ['namespace', 'module', 'mixin']});
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

    var publicMemberDocs = this._find({kind: 'member', memberof, access: 'public', isEnum: {isUndefined: true}});
    var protectedMemberDocs = this._find({kind: 'member', memberof, access: 'protected', isEnum: {isUndefined: true}});
    var privateMemberDocs = this._find({kind: 'member', memberof, access: 'private', isEnum: {isUndefined: true}});

    var publicClassDocs = this._find({kind: 'class', memberof, access: 'public'});
    var protectedClassDocs = this._find({kind: 'class', memberof, access: 'protected'});
    var privateClassDocs = this._find({kind: 'class', memberof, access: 'private'});

    var publicInterfaceDocs = this._find({kind: 'interface', memberof, access: 'public'});
    var protectedInterfaceDocs = this._find({kind: 'interface', memberof, access: 'protected'});
    var privateInterfaceDocs = this._find({kind: 'interface', memberof, access: 'private'});

    var publicTypedefDocs = this._find({kind: 'typedef', memberof, access: 'public', _custom_is_callback: false});
    var protectedTypedefDocs = this._find({kind: 'typedef', memberof, access: 'protected', _custom_is_callback: false});
    var privateTypedefDocs = this._find({kind: 'typedef', memberof, access: 'private', _custom_is_callback: false});

    var publicEventDocs = this._find({kind: 'event', memberof, access: 'public'});
    var protectedEventDocs = this._find({kind: 'event', memberof, access: 'protected'});
    var privateEventDocs = this._find({kind: 'event', memberof, access: 'private'});

    var publicMixinDocs = this._find({kind: 'mixin', memberof, access: 'public'});
    var protectedMixinDocs = this._find({kind: 'mixin', memberof, access: 'protected'});
    var privateMixinDocs = this._find({kind: 'mixin', memberof, access: 'private'});

    var publicConstDocs = this._find({kind: 'constant', memberof, access: 'public'});
    var protectedConstDocs = this._find({kind: 'constant', memberof, access: 'protected'});
    var privateConstDocs = this._find({kind: 'constant', memberof, access: 'private'});

    var publicEnumDocs = this._find({kind: 'member', memberof, access: 'public', isEnum: true});
    var protectedEnumDocs = this._find({kind: 'member', memberof, access: 'protected', isEnum: true});
    var privateEnumDocs = this._find({kind: 'member', memberof, access: 'private', isEnum: true});

    var publicCallbackDocs = this._find({kind: 'typedef', memberof, access: 'public', _custom_is_callback: true});
    var protectedCallbackDocs = this._find({kind: 'typedef', memberof, access: 'protected', _custom_is_callback: true});
    var privateCallbackDocs = this._find({kind: 'typedef', memberof, access: 'private', _custom_is_callback: true});

    var s = new SpruceTemplate(this._readTemplate('namespace.html'));

    s.load('parentNamespace', this._buildDocLinkHTML(namespaceDoc.memberof || '@global'));
    s.text('access', namespaceDoc.access);
    s.text('kind', namespaceDoc.kind);
    s.text('namespace', namespaceDoc.name);
    s.load('namespaceDesc', namespaceDoc.description);

    // requires
    s.drop('requiresLabel', !namespaceDoc.requires);
    s.loop('require', namespaceDoc.requires, (i, require, s)=>{
      s.load('require', this._buildDocLinkHTML(require));
    });

    // mixes
    s.drop('mixesLabel', !namespaceDoc.mixes);
    s.loop('mixes', namespaceDoc.mixes, (i, mixes, s)=>{
      s.load('mixes', this._buildDocLinkHTML(mixes));
    });

    // variation
    var variationDocs = this._find({memberof: namespaceDoc.longname, name: namespaceDoc.name, variation: {'isUndefined': false}});
    var variationHTML = [];
    for (var variationDoc of variationDocs) {
      variationHTML.push(this._buildDocLinkHTML(variationDoc, `(${variationDoc.variation})`, {inner: true}));
    }
    if (variationHTML.length) {
      s.load('variation', `this ${namespaceDoc.kind} has some variation(s). ${variationHTML.join(', ')}`);
    } else {
      s.drop('variation');
    }

    s.drop('fileexampleDocs', !namespaceDoc.fileexamples);
    s.loop('fileexampleDoc', namespaceDoc.fileexamples, (i, fileexample, s)=>{
      s.text('fileexampleCode', fileexample);
    });

    if (namespaceDoc.since) {
      s.text('since', namespaceDoc.since);
    } else {
      s.drop('sinceLabel');
    }

    s.drop('namespaceSummary', !(publicNamespaceDocs.length + protectedNamespaceDocs.length + privateNamespaceDocs.length));
    s.load('summaryPublicNamespaceDocs', this._buildSummaryNamespaceDocs(publicNamespaceDocs, 'Public Namespaces'));
    s.load('summaryProtectedNamespaceDocs', this._buildSummaryNamespaceDocs(protectedNamespaceDocs, 'Protected Namespaces'));
    s.load('summaryPrivateNamespaceDocs', this._buildSummaryNamespaceDocs(privateNamespaceDocs, 'Private Namespaces'));

    s.drop('classSummary', !(publicClassDocs.length + protectedClassDocs.length + privateClassDocs.length));
    s.load('summaryPublicClassDocs', this._buildSummaryClassDocs(publicClassDocs, false, 'Public Classes'));
    s.load('summaryProtectedClassDocs', this._buildSummaryClassDocs(protectedClassDocs, false, 'Protected Classes'));
    s.load('summaryPrivateClassDocs', this._buildSummaryClassDocs(privateClassDocs, false, 'Private Classes'));

    s.drop('interfaceSummary', !(publicInterfaceDocs.length + protectedInterfaceDocs.length + privateInterfaceDocs.length));
    s.load('summaryPublicInterfaceDocs', this._buildSummaryClassDocs(publicInterfaceDocs, false, 'Public Interfaces'));
    s.load('summaryProtectedInterfaceDocs', this._buildSummaryClassDocs(protectedInterfaceDocs, false, 'Protected Interfaces'));
    s.load('summaryPrivateInterfaceDocs', this._buildSummaryClassDocs(privateInterfaceDocs, false, 'Private Interfaces'));

    s.drop('memberSummary', !(publicMemberDocs.length + protectedMemberDocs.length + privateMemberDocs.length));
    s.load('summaryPublicMemberDocs', this._buildSummaryMemberDocs(publicMemberDocs, 'Public Members'));
    s.load('summaryProtectedMemberDocs', this._buildSummaryMemberDocs(protectedMemberDocs, 'Protected Members'));
    s.load('summaryPrivateMemberDocs', this._buildSummaryMemberDocs(privateMemberDocs, 'Private Members'));

    s.drop('methodSummary', !(publicMethodDocs.length + protectedMethodDocs.length + privateMethodDocs.length));
    s.load('summaryPublicMethodDocs', this._buildSummaryFunctionDocs(publicMethodDocs, 'Public Methods'));
    s.load('summaryProtectedMethodDocs', this._buildSummaryFunctionDocs(protectedMethodDocs, 'Protected Methods'));
    s.load('summaryPrivateMethodDocs', this._buildSummaryFunctionDocs(privateMethodDocs, 'Private Methods'));

    s.drop('typedefSummary', !(publicTypedefDocs.length + protectedTypedefDocs.length + privateTypedefDocs.length));
    s.load('summaryPublicTypedefDocs', this._buildSummaryMemberDocs(publicTypedefDocs, 'Public Typedefs'));
    s.load('summaryProtectedTypedefDocs', this._buildSummaryMemberDocs(protectedTypedefDocs, 'Protected Typedefs'));
    s.load('summaryPrivateTypedefDocs', this._buildSummaryMemberDocs(privateTypedefDocs, 'Private Typedefs'));

    s.drop('eventSummary', !(publicEventDocs.length + protectedEventDocs.length + privateEventDocs.length));
    s.load('summaryPublicEventDocs', this._buildSummaryMemberDocs(publicEventDocs, 'Public Events'));
    s.load('summaryProtectedEventDocs', this._buildSummaryMemberDocs(protectedEventDocs, 'Protected Events'));
    s.load('summaryPrivateEventDocs', this._buildSummaryMemberDocs(privateEventDocs, 'Private Events'));

    s.drop('mixinSummary', !(publicMixinDocs.length + protectedMixinDocs.length + privateMixinDocs.length));
    s.load('summaryPublicMixinDocs', this._buildSummaryNamespaceDocs(publicMixinDocs, 'Public Mixins'));
    s.load('summaryProtectedMixinDocs', this._buildSummaryNamespaceDocs(protectedMixinDocs, 'Protected Mixins'));
    s.load('summaryPrivateMixinDocs', this._buildSummaryNamespaceDocs(privateMixinDocs, 'Private Mixins'));

    s.drop('constSummary', !(publicConstDocs.length + protectedConstDocs.length + privateConstDocs.length));
    s.load('summaryPublicConstDocs', this._buildSummaryMemberDocs(publicConstDocs, 'Public Constants'));
    s.load('summaryProtectedConstDocs', this._buildSummaryMemberDocs(protectedConstDocs, 'Protected Constants'));
    s.load('summaryPrivateConstDocs', this._buildSummaryMemberDocs(privateConstDocs, 'Private Constants'));

    s.drop('enumSummary', !(publicEnumDocs.length + protectedEnumDocs.length + privateEnumDocs.length));
    s.load('summaryPublicEnumDocs', this._buildSummaryMemberDocs(publicEnumDocs, 'Public Enums'));
    s.load('summaryProtectedEnumDocs', this._buildSummaryMemberDocs(protectedEnumDocs, 'Protected Enums'));
    s.load('summaryPrivateEnumDocs', this._buildSummaryMemberDocs(privateEnumDocs, 'Private Enums'));

    s.drop('callbackSummary', !(publicCallbackDocs.length + protectedCallbackDocs.length + privateCallbackDocs.length));
    s.load('summaryPublicCallbackDocs', this._buildSummaryFunctionDocs(publicCallbackDocs, 'Public Callbacks'));
    s.load('summaryProtectedCallbackDocs', this._buildSummaryFunctionDocs(protectedCallbackDocs, 'Protected Callbacks'));
    s.load('summaryPrivateCallbackDocs', this._buildSummaryFunctionDocs(privateCallbackDocs, 'Private Callbacks'));

    s.load('publicMemberDocs', this._buildMemberDocs(publicMemberDocs, 'Public Members'));
    s.load('protectedMemberDocs', this._buildMemberDocs(protectedMemberDocs, 'Protected Members'));
    s.load('privateMemberDocs', this._buildMemberDocs(privateMemberDocs, 'Private Members'));

    s.load('publicMethodDocs', this._buildFunctionDocs(publicMethodDocs, 'Public Methods'));
    s.load('protectedMethodDocs', this._buildFunctionDocs(protectedMethodDocs, 'Protected Methods'));
    s.load('privateMethodDocs', this._buildFunctionDocs(privateMethodDocs, 'Private Methods'));

    s.load('publicTypedefDocs', this._buildMemberDocs(publicTypedefDocs, 'Public Typedefs'));
    s.load('protectedTypedefDocs', this._buildMemberDocs(protectedTypedefDocs, 'Protected Typedefs'));
    s.load('privateTypedefDocs', this._buildMemberDocs(privateTypedefDocs, 'Private Typedefs'));

    s.load('publicEventDocs', this._buildMemberDocs(publicEventDocs, 'Public Events'));
    s.load('protectedEventDocs', this._buildMemberDocs(protectedEventDocs, 'Protected Events'));
    s.load('privateEventDocs', this._buildMemberDocs(privateEventDocs, 'Private Events'));

    s.load('publicConstDocs', this._buildMemberDocs(publicConstDocs, 'Public Constants'));
    s.load('protectedConstDocs', this._buildMemberDocs(protectedConstDocs, 'Protected Constants'));
    s.load('privateConstDocs', this._buildMemberDocs(privateConstDocs, 'Private Constants'));

    s.load('publicEnumDocs', this._buildMemberDocs(publicEnumDocs, 'Public Enums'));
    s.load('protectedEnumDocs', this._buildMemberDocs(protectedEnumDocs, 'Protected Enums'));
    s.load('privateEnumDocs', this._buildMemberDocs(privateEnumDocs, 'Private Enums'));

    s.load('publicCallbackDocs', this._buildFunctionDocs(publicCallbackDocs, 'Public Callbacks'));
    s.load('protectedCallbackDocs', this._buildFunctionDocs(protectedCallbackDocs, 'Protected Callbacks'));
    s.load('privateCallbackDocs', this._buildFunctionDocs(privateCallbackDocs, 'Private Callbacks'));

    return s;
  }
}
