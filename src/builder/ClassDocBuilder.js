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
    var staticPrivateMemberDocs = this._find({kind: 'member', memberof: classDoc.longname, scope: 'static', access: 'private'});
    var staticProtectedMemberDocs = this._find({kind: 'member', memberof: classDoc.longname, scope: 'static', access: 'protected'});
    var staticPublicMemberDocs = this._find({kind: 'member', memberof: classDoc.longname, scope: 'static', access: 'public'});

    var staticPrivateMethodDocs = this._find({kind: 'function', memberof: classDoc.longname, scope: 'static', access: 'private'});
    var staticProtectedMethodDocs = this._find({kind: 'function', memberof: classDoc.longname, scope: 'static', access: 'protected'});
    var staticPublicMethodDocs = this._find({kind: 'function', memberof: classDoc.longname, scope: 'static', access: 'public'});

    var privateMemberDocs = this._find({kind: 'member', memberof: classDoc.longname, scope: 'instance', access: 'private'});
    var protectedMemberDocs = this._find({kind: 'member', memberof: classDoc.longname, scope: 'instance', access: 'protected'});
    var publicMemberDocs = this._find({kind: 'member', memberof: classDoc.longname, scope: 'instance', access: 'public'});

    var privateMethodDocs = this._find({kind: 'function', memberof: classDoc.longname, scope: 'instance', access: 'private'});
    var protectedMethodDocs = this._find({kind: 'function', memberof: classDoc.longname, scope: 'instance', access: 'protected'});
    var publicMethodDocs = this._find({kind: 'function', memberof: classDoc.longname, scope: 'instance', access: 'public'});

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

    s.load('summaryStaticPrivateMemberDocs', this._buildSummaryDocs(staticPrivateMemberDocs, 'Static Private Members'));
    s.load('summaryStaticProtectedMemberDocs', this._buildSummaryDocs(staticProtectedMemberDocs, 'Static Protected Members'));
    s.load('summaryStaticPublicMemberDocs', this._buildSummaryDocs(staticPublicMemberDocs, 'Static Public Members'));

    s.load('summaryStaticPrivateMethodDocs', this._buildSummaryDocs(staticPrivateMethodDocs, 'Static Private Methods'));
    s.load('summaryStaticProtectedMethodDocs', this._buildSummaryDocs(staticProtectedMethodDocs, 'Static Protected Methods'));
    s.load('summaryStaticPublicMethodDocs', this._buildSummaryDocs(staticPublicMethodDocs, 'Static Public Methods'));

    s.load('summaryConstructorDocs', this._buildSummaryDocs([classDoc], 'Constructor'));

    s.load('summaryPrivateMemberDocs', this._buildSummaryDocs(privateMemberDocs, 'Private Members'));
    s.load('summaryProtectedMemberDocs', this._buildSummaryDocs(protectedMemberDocs, 'Protected Members'));
    s.load('summaryPublicMemberDocs', this._buildSummaryDocs(publicMemberDocs, 'Public Members'));

    s.load('summaryPrivateMethodDocs', this._buildSummaryDocs(privateMethodDocs, 'Private Methods'));
    s.load('summaryProtectedMethodDocs', this._buildSummaryDocs(protectedMethodDocs, 'Protected Methods'));
    s.load('summaryPublicMethodDocs', this._buildSummaryDocs(publicMethodDocs, 'Public Methods'));

    s.load('staticPrivateMembers', this._buildDetailDocs(staticPrivateMemberDocs, 'Static Private Members'));
    s.load('staticProtectedMembers', this._buildDetailDocs(staticProtectedMemberDocs, 'Static Protected Members'));
    s.load('staticPublicMembers', this._buildDetailDocs(staticPublicMemberDocs, 'Static Public Members'));

    s.load('staticPrivateMethods', this._buildDetailDocs(staticPrivateMethodDocs, 'Static Private Methods'));
    s.load('staticProtectedMethods', this._buildDetailDocs(staticProtectedMethodDocs, 'Static Protected Methods'));
    s.load('staticPublicMethods', this._buildDetailDocs(staticPublicMethodDocs, 'Static Public Methods'));

    s.load('constructor', this._buildDetailDocs([classDoc], 'Constructor'));

    s.load('privateMembers', this._buildDetailDocs(privateMemberDocs, 'Private Members'));
    s.load('protectedMembers', this._buildDetailDocs(protectedMemberDocs, 'Protected Members'));
    s.load('publicMembers', this._buildDetailDocs(publicMemberDocs, 'Public Members'));

    s.load('privateMethods', this._buildDetailDocs(privateMethodDocs, 'Private Methods'));
    s.load('protectedMethods', this._buildDetailDocs(protectedMethodDocs, 'Protected Methods'));
    s.load('publicMethods', this._buildDetailDocs(publicMethodDocs, 'Public Methods'));

    return s;
  }

  _buildExtendsChainHTML(doc) {
    if (!doc._custom_extends_chains) return;

    var links = [];
    for (var longname of doc._custom_extends_chains) {
      links.push(this._buildDocLinkHTML(longname));
    }
    return links.join(' → ');

    //while (1) {
    //  if (!doc.augments) break;
    //
    //  var superClassDoc = this._find({longname: doc.augments[0]})[0];
    //  if (superClassDoc) {
    //    links.push(this._buildDocLinkHTML(superClassDoc.longname));
    //    doc = superClassDoc;
    //  } else {
    //    links.push(this._buildDocLinkHTML(doc.augments[0]));
    //    break;
    //  }
    //}
    //
    //if (links.length) {
    //  links.unshift(`<span>${selfDoc.name}</span>`);
    //}
    //
    //return links.reverse().join(' → ');
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
