import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class NamespaceDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    var docs = this._find({kind: ['namespace', 'module', 'mixin', 'file', 'class', 'interface']});
    for (var doc of docs) {
      s.load('content', this._buildObjectDoc(doc));
      s.load('fileFooter', this._buildFileFooterHTML(doc));
      var fileName = this._getOutputFileName(doc);
      callback(s.html, fileName);
    }
  }

  _buildObjectDoc(doc) {
    var extendsChain = this._buildExtendsChainHTML(doc);
    var directSubclass = this._buildDirectSubclassHTML(doc);
    var indirectSubclass = this._buildIndirectSubclassHTML(doc);

    var s = new SpruceTemplate(this._readTemplate('object.html'));

    // header
    s.load('memberof', this._buildDocLinkHTML(doc.memberof));
    s.text('access', doc.access);
    s.text('kind', doc.kind);
    s.load('file', this._buildFileDocLinkHTML(doc), 'append');
    s.text('since', doc.since, 'append');
    s.text('version', doc.version, 'append');
    s.load('variation', this._buildVariationHTML(doc), 'append');

    // extends chain
    s.load('extends', this._buildDocsLinkHTML(doc.augments, null, false, ', '), 'append');
    s.load('extendsChain', extendsChain, 'append');
    s.load('directSubclass', directSubclass, 'append');
    s.load('indirectSubclass', indirectSubclass, 'append');
    s.load('implements', this._buildDocsLinkHTML(doc.implements, null, false, ', '), 'append');
    s.load('indirectImplements', this._buildDocsLinkHTML(doc._custom_indirect_implements, null, false, ', '), 'append');
    s.load('mixes', this._buildDocsLinkHTML(doc.mixes, null, false, ', '), 'append');
    s.load('indirectMixes', this._buildDocsLinkHTML(doc._custom_indirect_mixes, null, false, ', '), 'append');
    s.load('directImplemented', this._buildDocsLinkHTML(doc._custom_direct_implemented, null, false, ', '), 'append');
    s.load('indirectImplemented', this._buildDocsLinkHTML(doc._custom_indirect_implemented, null, false, ', '), 'append');
    s.load('directMixed', this._buildDocsLinkHTML(doc._custom_direct_mixed, null, false, ', '), 'append');
    s.load('indirectMixed', this._buildDocsLinkHTML(doc._custom_indirect_mixed, null, false, ', '), 'append');

    // self
    s.text('name', doc.name);
    s.load('description', doc.classdesc || doc.description);
    s.load('deprecated', this._buildDeprecatedHTML(doc));
    s.load('experimental', this._buildExperimentalHTML(doc));
    s.load('require', this._buildDocsLinkHTML(doc.requires), 'append');
    s.load('author', this._buildAuthorHTML(doc), 'append');
    s.load('see', this._buildDocsLinkHTML(doc.see), 'append');
    s.load('todo', this._buildDocsLinkHTML(doc.todo), 'append');

    // file example
    s.drop('fileexampleDocs', !doc.fileexamples);
    s.loop('fileexampleDoc', doc.fileexamples, (i, fileexample, s)=>{
      s.text('fileexampleCode', fileexample);
    });

    // summary
    s.load('namespaceSummary', this._buildSummaryHTML(doc, 'namespace', 'Namespaces'), 'append');
    s.load('classSummary', this._buildSummaryHTML(doc, 'class', 'Classes'), 'append');
    s.load('interfaceSummary', this._buildSummaryHTML(doc, 'interface', 'Interfaces'), 'append');
    s.load('mixinSummary', this._buildSummaryHTML(doc, 'mixin', 'Mixin'), 'append');
    s.load('staticMemberSummary', this._buildSummaryHTML(doc, 'member', 'Members', true), 'append');
    s.load('staticMethodSummary', this._buildSummaryHTML(doc, 'function', 'Methods', true), 'append');
    s.load('constructorSummary', this._buildSummaryHTML(doc, 'constructor', 'Constructor'), 'append');
    s.load('memberSummary', this._buildSummaryHTML(doc, 'member', 'Members'), 'append');
    s.load('methodSummary', this._buildSummaryHTML(doc, 'function', 'Methods'), 'append');
    s.load('typedefSummary', this._buildSummaryHTML(doc, 'typedef', 'Typedefs'), 'append');
    s.load('eventSummary', this._buildSummaryHTML(doc, 'event', 'Events'), 'append');
    s.load('constSummary', this._buildSummaryHTML(doc, 'constant', 'Constants'), 'append');
    s.load('enumSummary', this._buildSummaryHTML(doc, 'enum', 'Enums'), 'append');
    s.load('callbackSummary', this._buildSummaryHTML(doc, 'callback', 'callback'), 'append');

    s.load('inheritedSummary', this._buildInheritedSummaryHTML(doc), 'append');

    // detail
    s.load('staticMemberDetails', this._buildDetailHTML(doc, 'member', 'Members', true));
    s.load('staticMethodDetails', this._buildDetailHTML(doc, 'function', 'Methods', true));
    s.load('constructorDetails', this._buildDetailHTML(doc, 'constructor', 'Constructors'));
    s.load('memberDetails', this._buildDetailHTML(doc, 'member', 'Members'));
    s.load('methodDetails', this._buildDetailHTML(doc, 'function', 'Methods'));
    s.load('typedefDetails', this._buildDetailHTML(doc, 'typedef', 'Typedefs'));
    s.load('eventDetails', this._buildDetailHTML(doc, 'event', 'Events'));
    s.load('constDetails', this._buildDetailHTML(doc, 'constant', 'Constants'));
    s.load('enumDetails', this._buildDetailHTML(doc, 'enum', 'Enums'));
    s.load('callbackDetails', this._buildDetailHTML(doc, 'callback', 'Callbacks'));

    // source code
    s.drop('sourceCodeWrap', !doc._custom_source_code);
    s.text('sourceCode', doc._custom_source_code);

    return s;
  }

  _buildVariationHTML(doc) {
    var variationDocs = this._find({memberof: doc.memberof, name: doc.name});
    var html = [];
    for (var variationDoc of variationDocs) {
      if (variationDoc.variation === doc.variation) continue;

      html.push(this._buildDocLinkHTML(variationDoc.longname, `(${variationDoc.variation || 1})`));
    }

    return html.join(', ');
  }

  _buildExtendsChainHTML(doc) {
    if (!doc._custom_extends_chains) return;

    var links = [];
    for (var longname of doc._custom_extends_chains) {
      links.push(this._buildDocLinkHTML(longname));
    }

    links.push(doc.name);

    return links.join(' → ');
  }

  _buildIndirectSubclassHTML(doc) {
    if (!doc._custom_indirect_subclasses) return;

    var links = [];
    for (var longname of doc._custom_indirect_subclasses) {
      links.push(this._buildDocLinkHTML(longname));
    }
    return links.join(', ');
  }

  _buildDirectSubclassHTML(doc) {
    if (!doc._custom_direct_subclasses) return;

    var links = [];
    for (var longname of doc._custom_direct_subclasses) {
      links.push(this._buildDocLinkHTML(longname));
    }
    return links.join(', ');
  }

  _buildInheritedSummaryHTML(doc) {
    if (['class', 'interface'].indexOf(doc.kind) === -1) return;

    let longnames = [
      ...doc._custom_extends_chains || [],
      ...doc.implements || [],
      ...doc._custom_indirect_implements || [],
      ...doc.mixes || [],
      ...doc._custom_indirect_mixes || []
    ];

    let html = [];
    for (let longname of longnames) {
      let superDoc = this._find({longname })[0];

      let targetDocs = this._orderedFind('scope desc, kind desc, access desc', {memberof: longname, inherits: {isUndefined: true}, mixed: {isUndefined: true}});
      let title = `From ${superDoc.kind} ${this._buildDocLinkHTML(longname, longname)}`;
      let result = this._buildSummaryDoc(targetDocs, '----------', false, superDoc.kind);
      if (result) {
        result.load('title', title);
        html.push(result.html);
      }
    }

    return html.join('\n');
  }
}
