import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class ClassDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    var classDocs = this._find({kind: ['class', 'interface']});
    for (var classDoc of classDocs) {
      s.load('content', this._buildClassDoc(classDoc));
      callback(s.html, `${classDoc.longname}.html`);
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

    var extendsClassDoc = {};
    if (classDoc.augments) {
      extendsClassDoc = this._find({longname: classDoc.augments[0]})[0];
    }

    //if (classDoc.implements) {
    //  var implementsDocs = this._find({longname: classDoc.implements});
    //}

    var s = new SpruceTemplate(this._readTemplate('class.html'));

    s.load('namespace', this._buildDocLinkHTML(classDoc.memberof));

    s.text('access', classDoc.access);
    s.drop('extends', !extendsClassDoc.name);
    s.text('extendsClassName', extendsClassDoc.name);
    s.attr('extendsClassName', 'href', `${extendsClassDoc.longname}.html`);

    s.text('classKind', classDoc.kind);

    s.drop('sinceLabel', !classDoc.since);
    s.text('since', classDoc.since);

    s.text('className', classDoc.name);
    s.load('classDesc', classDoc.classdesc);
    s.drop('fileexampleDocs', !classDoc.fileexamples);
    s.loop('fileexampleDoc', classDoc.fileexamples, (i, fileexample, s)=>{
      s.text('fileexampleCode', fileexample);
    });
    s.load('deprecated', this._buildDeprecatedHTML(classDoc));

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
      s.loop('see', seeDocs, (i, seeDoc, s)=>{
        s.load('seeLink', seeDoc);
      });
    } else {
      s.drop('seeWrap');
    }

    s.load('summaryStaticPrivateMemberDocs', this._buildSummaryMemberDocs(staticPrivateMemberDocs, 'Static Private Members'));
    s.load('summaryStaticProtectedMemberDocs', this._buildSummaryMemberDocs(staticProtectedMemberDocs, 'Static Protected Members'));
    s.load('summaryStaticPublicMemberDocs', this._buildSummaryMemberDocs(staticPublicMemberDocs, 'Static Public Members'));

    s.load('summaryStaticPrivateMethodDocs', this._buildSummaryFunctionDocs(staticPrivateMethodDocs, 'Static Private Methods'));
    s.load('summaryStaticProtectedMethodDocs', this._buildSummaryFunctionDocs(staticProtectedMethodDocs, 'Static Protected Methods'));
    s.load('summaryStaticPublicMethodDocs', this._buildSummaryFunctionDocs(staticPublicMethodDocs, 'Static Public Methods'));

    s.load('summaryConstructorDocs', this._buildSummaryFunctionDocs([classDoc], 'Constructor'));

    s.load('summaryPrivateMemberDocs', this._buildSummaryMemberDocs(privateMemberDocs, 'Private Members'));
    s.load('summaryProtectedMemberDocs', this._buildSummaryMemberDocs(protectedMemberDocs, 'Protected Members'));
    s.load('summaryPublicMemberDocs', this._buildSummaryMemberDocs(publicMemberDocs, 'Public Members'));

    s.load('summaryPrivateMethodDocs', this._buildSummaryFunctionDocs(privateMethodDocs, 'Private Methods'));
    s.load('summaryProtectedMethodDocs', this._buildSummaryFunctionDocs(protectedMethodDocs, 'Protected Methods'));
    s.load('summaryPublicMethodDocs', this._buildSummaryFunctionDocs(publicMethodDocs, 'Public Methods'));

    s.load('staticPrivateMembers', this._buildMemberDocs(staticPrivateMemberDocs, 'Static Private Members'));
    s.load('staticProtectedMembers', this._buildMemberDocs(staticProtectedMemberDocs, 'Static Protected Members'));
    s.load('staticPublicMembers', this._buildMemberDocs(staticPublicMemberDocs, 'Static Public Members'));

    s.load('staticPrivateMethods', this._buildFunctionDocs(staticPrivateMethodDocs, 'Static Private Methods'));
    s.load('staticProtectedMethods', this._buildFunctionDocs(staticProtectedMethodDocs, 'Static Protected Methods'));
    s.load('staticPublicMethods', this._buildFunctionDocs(staticPublicMethodDocs, 'Static Public Methods'));

    s.load('constructor', this._buildFunctionDocs([classDoc], 'Constructor'));

    s.load('privateMembers', this._buildMemberDocs(privateMemberDocs, 'Private Members'));
    s.load('protectedMembers', this._buildMemberDocs(protectedMemberDocs, 'Protected Members'));
    s.load('publicMembers', this._buildMemberDocs(publicMemberDocs, 'Public Members'));

    s.load('privateMethods', this._buildFunctionDocs(privateMethodDocs, 'Private Methods'));
    s.load('protectedMethods', this._buildFunctionDocs(protectedMethodDocs, 'Protected Methods'));
    s.load('publicMethods', this._buildFunctionDocs(publicMethodDocs, 'Public Methods'));

    return s;
  }
}
