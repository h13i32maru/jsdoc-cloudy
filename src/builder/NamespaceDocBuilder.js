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

    s.load('memberDetails', this._buildDetailHTML(namespaceDoc, 'member', 'Members'));
    s.load('methodDetails', this._buildDetailHTML(namespaceDoc, 'function', 'Methods'));
    s.load('typedefDetails', this._buildDetailHTML(namespaceDoc, 'typedef', 'Typedefs'));
    s.load('eventDetails', this._buildDetailHTML(namespaceDoc, 'event', 'Events'));
    s.load('constDetails', this._buildDetailHTML(namespaceDoc, 'constant', 'Constants'));
    s.load('enumDetails', this._buildDetailHTML(namespaceDoc, 'enum', 'Enums'));
    s.load('callbackDetails', this._buildDetailHTML(namespaceDoc, 'callback', 'Callbacks'));

    s.drop('sourceCodeWrap', !namespaceDoc._custom_source_code);
    s.text('sourceCode', namespaceDoc._custom_source_code);

    return s;
  }
}
