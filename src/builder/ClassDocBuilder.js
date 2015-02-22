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

    if (classDoc.implements) {
      var implementsDocs = this._find({longname: classDoc.implements});
    }

    var s = new SpruceTemplate(this._readTemplate('class.html'));

    s.load('nameSpace', this._buildDocLinkHTML(classDoc.memberof || '@global'));

    s.drop('extends', !extendsClassDoc.name);
    s.text('extendsClassName', extendsClassDoc.name);
    s.attr('extendsClassName', 'href', `${extendsClassDoc.longname}.html`);

    s.text('classKind', classDoc.kind);

    s.drop('sinceLabel', !classDoc.since);
    s.text('since', classDoc.since);

    s.text('className', classDoc.name);
    s.load('classDesc', classDoc.classdesc);
    s.text('fileexampleCode', classDoc.fileexample);
    s.drop('fileexampleDoc', !classDoc.fileexample);

    if (implementsDocs) {
      var temp = [];
      for (var implementsDoc of implementsDocs) {
        temp.push(this._buildDocLinkHTML(implementsDoc, implementsDoc.name));
      }
      s.load('implementsClassName', temp.join(', '));
    } else {
      s.drop('implements');
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

    s.drop('staticPrivateMembersTitle', !staticPrivateMemberDocs.length);
    s.load('staticPrivateMembers', this._buildMemberDocs(staticPrivateMemberDocs));

    s.drop('staticProtectedMembersTitle', !staticProtectedMemberDocs.length);
    s.load('staticProtectedMembers', this._buildMemberDocs(staticProtectedMemberDocs));

    s.drop('staticPublicMembersTitle', !staticPublicMemberDocs.length);
    s.load('staticPublicMembers', this._buildMemberDocs(staticPublicMemberDocs));

    s.drop('staticPrivateMethodsTitle', !staticPrivateMethodDocs.length);
    s.load('staticPrivateMethods', this._buildFunctionDocs(staticPrivateMethodDocs));

    s.drop('staticProtectedMethodsTitle', !staticProtectedMethodDocs.length);
    s.load('staticProtectedMethods', this._buildFunctionDocs(staticProtectedMethodDocs));

    s.drop('staticPublicMethodsTitle', !staticPublicMethodDocs.length);
    s.load('staticPublicMethods', this._buildFunctionDocs(staticPublicMethodDocs));

    s.load('constructor', this._buildFunctionDocs([classDoc]));

    s.drop('privateMembersTitle', !privateMemberDocs.length);
    s.load('privateMembers', this._buildMemberDocs(privateMemberDocs));

    s.drop('protectedMembersTitle', !protectedMemberDocs.length);
    s.load('protectedMembers', this._buildMemberDocs(protectedMemberDocs));

    s.drop('publicMembersTitle', !publicMemberDocs.length);
    s.load('publicMembers', this._buildMemberDocs(publicMemberDocs));

    s.drop('privateMethodsTitle', !privateMethodDocs.length);
    s.load('privateMethods', this._buildFunctionDocs(privateMethodDocs));

    s.drop('protectedMethodsTitle', !protectedMethodDocs.length);
    s.load('protectedMethods', this._buildFunctionDocs(protectedMethodDocs));

    s.drop('publicMethodsTitle', !publicMethodDocs.length);
    s.load('publicMethods', this._buildFunctionDocs(publicMethodDocs));

    return s;
  }
}
