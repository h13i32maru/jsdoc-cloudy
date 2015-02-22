import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class ClassDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    var classDocs = this._find({kind: 'class'});
    for (var classDoc of classDocs) {
      s.load('content', this._buildClassDoc(classDoc));
      callback(s.html, `${classDoc.longname}.html`);
    }
  }

  _buildClassDoc(classDoc) {
    var staticMemberDocs = this._find({kind: 'member', memberof: classDoc.longname, scope: 'static'});
    var staticMethodDocs = this._find({kind: 'function', memberof: classDoc.longname, scope: 'static'});
    var memberDocs = this._find({kind: 'member', memberof: classDoc.longname, scope: 'instance'});
    var methodDocs = this._find({kind: 'function', memberof: classDoc.longname, scope: 'instance'});

    var s = new SpruceTemplate(this._readTemplate('class.html'));

    s.text('nameSpace', classDoc.memberof || '@global');
    s.text('className', classDoc.name);
    s.load('classDesc', classDoc.classdesc);
    s.text('fileexampleCode', classDoc.fileexample);
    s.drop('fileexampleDoc', !classDoc.fileexample);

    s.load('summaryStaticMembers', this._buildSummaryMemberDocs(staticMemberDocs, 'Static Members'));
    s.load('summaryStaticMethods', this._buildSummaryFunctionDocs(staticMethodDocs, 'Static Methods'));
    s.load('summaryConstructor', this._buildSummaryFunctionDocs([classDoc], 'Constructor'));
    s.load('summaryMembers', this._buildSummaryMemberDocs(memberDocs, 'Members'));
    s.load('summaryMethods', this._buildSummaryFunctionDocs(methodDocs, 'Methods'));

    s.drop('staticMembersTitle', !staticMemberDocs.length);
    s.load('staticMembers', this._buildMemberDocs(staticMemberDocs));

    s.drop('staticMethodsTitle', !staticMethodDocs.length);
    s.load('staticMethods', this._buildFunctionDocs(staticMethodDocs));

    s.load('constructor', this._buildFunctionDocs([classDoc]));

    s.drop('membersTitle', !memberDocs.length);
    s.load('members', this._buildMemberDocs(memberDocs));

    s.drop('methodsTitle', !methodDocs.length);
    s.load('methods', this._buildFunctionDocs(methodDocs));

    return s;
  }
}
