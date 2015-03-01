import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class ClassDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    var classDocs = this._find({kind: ['class', 'interface']});
    for (var classDoc of classDocs) {
      s.load('content', this._buildClassDoc(classDoc));
      var fileName = this._getOutputFileName(classDoc);
      callback(s.html, fileName);
    }
  }

  _buildClassDoc(classDoc) {
    var extendsClassDoc;
    if (classDoc.augments) {
      extendsClassDoc = this._find({longname: classDoc.augments[0]})[0];
    }

    var s = new SpruceTemplate(this._readTemplate('class.html'));

    s.load('namespace', this._buildDocLinkHTML(classDoc.memberof));
    s.text('access', classDoc.access);

    s.text('classKind', classDoc.kind);

    s.drop('sinceLabel', !classDoc.since);
    s.text('since', classDoc.since);

    s.text('className', classDoc.name);
    s.load('classDesc', classDoc.classdesc);
    s.drop('fileexampleDocs', !classDoc.fileexamples);
    s.loop('fileexampleDoc', classDoc.fileexamples, (i, fileexample, s)=> {
      s.text('fileexampleCode', fileexample);
    });
    s.load('deprecated', this._buildDeprecatedHTML(classDoc));

    // extends
    s.drop('extendsLabel', !extendsClassDoc);
    if (extendsClassDoc) {
      s.load('extends', this._buildDocLinkHTML(extendsClassDoc.longname));
    }

    // extends chain
    var extendsChain = this._buildExtendsChainHTML(classDoc);
    var directSubclass = this._buildDirectSubclassHTML(classDoc);
    var indirectSubclass = this._buildIndirectSubclassHTML(classDoc);
    s.drop('extendsChainWrap', !(extendsChain + directSubclass + indirectSubclass));
    s.load('extendsChain', extendsChain, 'append');
    s.load('directSubclass', directSubclass, 'append');
    s.load('indirectSubclass', indirectSubclass, 'append');

    // implement
    if (classDoc.implements) {
      var temp = [];
      for (var implementsLongname of classDoc.implements) {
        temp.push(this._buildDocLinkHTML(implementsLongname));
      }
      s.load('implementsClassName', temp.join(', '));
    } else {
      s.drop('implements');
    }

    // see
    var seeDocs = classDoc.see;
    if (seeDocs) {
      s.loop('see', seeDocs, (i, seeDoc, s)=> {
        s.load('seeLink', seeDoc);
      });
    } else {
      s.drop('seeWrap');
    }

    s.load('staticMemberSummary', this._buildSummaryHTML(classDoc, 'member', 'Members'), 'append');
    s.load('staticMethodSummary', this._buildSummaryHTML(classDoc, 'function', 'Methods'), 'append');
    s.load('constructorSummary', this._buildSummaryHTML(classDoc, 'constructor', 'Constructor'), 'append');
    s.load('memberSummary', this._buildSummaryHTML(classDoc, 'member', 'Members', true), 'append');
    s.load('methodSummary', this._buildSummaryHTML(classDoc, 'function', 'Methods', true), 'append');

    s.load('staticMemberDetails', this._buildDetailHTML(classDoc, 'member', 'Members'));
    s.load('staticMethodDetails', this._buildDetailHTML(classDoc, 'function', 'Methods'));
    s.load('constructorDetails', this._buildDetailHTML(classDoc, 'constructor', 'Constructors'));
    s.load('memberDetails', this._buildDetailHTML(classDoc, 'member', 'Members', true));
    s.load('methodDetails', this._buildDetailHTML(classDoc, 'function', 'Methods', true));

    return s;
  }

  _buildExtendsChainHTML(doc) {
    if (!doc._custom_extends_chains) return;

    var links = [];
    for (var longname of doc._custom_extends_chains) {
      links.push(this._buildDocLinkHTML(longname));
    }
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
}
