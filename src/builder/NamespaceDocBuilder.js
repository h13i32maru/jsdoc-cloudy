import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class NamespaceDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    var namespaceDocs = this._find({kind: ['namespace', 'module', 'mixin', 'file']});
    for (var namespaceDoc of namespaceDocs) {
      s.load('content', this._buildNamespaceDoc(namespaceDoc));
      s.load('fileFooter', this._buildFileFooterHTML(namespaceDoc));
      var fileName = this._getOutputFileName(namespaceDoc);
      callback(s.html, fileName);
    }
  }


  _buildNamespaceDoc(namespaceDoc) {
    var memberof = namespaceDoc.longname;

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

    s.load('parentNamespace', this._buildDocLinkHTML(namespaceDoc.memberof));
    s.text('access', namespaceDoc.access);
    s.text('kind', namespaceDoc.kind);
    s.text('namespace', namespaceDoc.name);
    s.load('namespaceDesc', namespaceDoc.description);

    // file
    var fileLink = this._buildFileDocLinkHTML(namespaceDoc);
    s.drop('fileLabel', !fileLink);
    s.load('file', fileLink);

    // author
    s.drop('authorLabel', !namespaceDoc.author);
    s.load('author', this._buildAuthorHTML(namespaceDoc));

    // version
    if (namespaceDoc.version) {
      s.text('version', namespaceDoc.version);
    } else {
      s.drop('versionLabel');
    }

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
      variationHTML.push(this._buildDocLinkHTML(variationDoc.longname, `(${variationDoc.variation})`));
    }
    if (variationHTML.length) {
      s.load('variation', `this ${namespaceDoc.kind} has some variation(s). ${variationHTML.join(', ')}`);
    } else {
      s.drop('variation');
    }

    // deprecated
    s.load('deprecated', this._buildDeprecatedHTML(namespaceDoc));

    // experimental
    s.load('experimental', this._buildExperimentalHTML(namespaceDoc));

    // see
    var seeDocs = namespaceDoc.see;
    s.drop('seeWrap', !seeDocs);
    s.loop('see', seeDocs, (i, seeDoc, s)=>{
      s.load('seeLink', seeDoc);
    });

    s.drop('fileexampleDocs', !namespaceDoc.fileexamples);
    s.loop('fileexampleDoc', namespaceDoc.fileexamples, (i, fileexample, s)=>{
      s.text('fileexampleCode', fileexample);
    });

    if (namespaceDoc.since) {
      s.text('since', namespaceDoc.since);
    } else {
      s.drop('sinceLabel');
    }

    s.drop('todoWrap', !namespaceDoc.todo);
    s.loop('todo', namespaceDoc.todo, (i, todo, s)=>{
      s.load('todo', todo);
    });

    s.load('namespaceSummary', this._buildSummaryHTML(namespaceDoc, 'namespace', 'Namespaces'), 'append');
    s.load('classSummary', this._buildSummaryHTML(namespaceDoc, 'class', 'Classes'), 'append');
    s.load('interfaceSummary', this._buildSummaryHTML(namespaceDoc, 'interface', 'Interfaces'), 'append');
    s.load('mixinSummary', this._buildSummaryHTML(namespaceDoc, 'mixin', 'Mixin'), 'append');
    s.load('memberSummary', this._buildSummaryHTML(namespaceDoc, 'member', 'Members'), 'append');
    s.load('methodSummary', this._buildSummaryHTML(namespaceDoc, 'function', 'Methods'), 'append');
    s.load('typedefSummary', this._buildSummaryHTML(namespaceDoc, 'typedef', 'Typedefs'), 'append');
    s.load('eventSummary', this._buildSummaryHTML(namespaceDoc, 'event', 'Events'), 'append');
    s.load('constSummary', this._buildSummaryHTML(namespaceDoc, 'constant', 'Constants'), 'append');
    s.load('enumSummary', this._buildSummaryHTML(namespaceDoc, 'enum', 'Enums'), 'append');
    s.load('callbackSummary', this._buildSummaryHTML(namespaceDoc, 'callback', 'callback'), 'append');

    s.load('publicMemberDocs', this._buildDetailDocs(publicMemberDocs, 'Public Members'));
    s.load('protectedMemberDocs', this._buildDetailDocs(protectedMemberDocs, 'Protected Members'));
    s.load('privateMemberDocs', this._buildDetailDocs(privateMemberDocs, 'Private Members'));

    s.load('publicMethodDocs', this._buildDetailDocs(publicMethodDocs, 'Public Methods'));
    s.load('protectedMethodDocs', this._buildDetailDocs(protectedMethodDocs, 'Protected Methods'));
    s.load('privateMethodDocs', this._buildDetailDocs(privateMethodDocs, 'Private Methods'));

    s.load('publicTypedefDocs', this._buildDetailDocs(publicTypedefDocs, 'Public Typedefs'));
    s.load('protectedTypedefDocs', this._buildDetailDocs(protectedTypedefDocs, 'Protected Typedefs'));
    s.load('privateTypedefDocs', this._buildDetailDocs(privateTypedefDocs, 'Private Typedefs'));

    s.load('publicEventDocs', this._buildDetailDocs(publicEventDocs, 'Public Events'));
    s.load('protectedEventDocs', this._buildDetailDocs(protectedEventDocs, 'Protected Events'));
    s.load('privateEventDocs', this._buildDetailDocs(privateEventDocs, 'Private Events'));

    s.load('publicConstDocs', this._buildDetailDocs(publicConstDocs, 'Public Constants'));
    s.load('protectedConstDocs', this._buildDetailDocs(protectedConstDocs, 'Protected Constants'));
    s.load('privateConstDocs', this._buildDetailDocs(privateConstDocs, 'Private Constants'));

    s.load('publicEnumDocs', this._buildDetailDocs(publicEnumDocs, 'Public Enums'));
    s.load('protectedEnumDocs', this._buildDetailDocs(protectedEnumDocs, 'Protected Enums'));
    s.load('privateEnumDocs', this._buildDetailDocs(privateEnumDocs, 'Private Enums'));

    s.load('publicCallbackDocs', this._buildDetailDocs(publicCallbackDocs, 'Public Callbacks'));
    s.load('protectedCallbackDocs', this._buildDetailDocs(protectedCallbackDocs, 'Protected Callbacks'));
    s.load('privateCallbackDocs', this._buildDetailDocs(privateCallbackDocs, 'Private Callbacks'));

    s.drop('sourceCodeWrap', !namespaceDoc._custom_source_code);
    s.text('sourceCode', namespaceDoc._custom_source_code);

    return s;
  }
}
