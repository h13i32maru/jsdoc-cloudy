//import SpruceTemplate from 'spruce-template';
//import DocBuilder from './DocBuilder.js';
//
//export default class TypedefDocBuilder extends DocBuilder {
//  exec(callback) {
//    //var s = this._buildLayoutDoc();
//    //var docs = this._find({kind: 'typedef'});
//    //for (var doc of docs) {
//    //  s.load('content', this._buildTypedefDoc(doc));
//    //  callback(s.html, `${doc.longname}.html`);
//    //}
//  }
//
//  _buildTypedefDoc(typedefDoc) {
//    var s = new SpruceTemplate(this._readTemplate('typedef.html'));
//    s.load('namespace', this._buildDocLinkHTML(typedefDoc.memberof));
//    s.text('access', typedefDoc.access);
//    s.text('kind', typedefDoc.kind);
//    s.drop('sinceLabel', !typedefDoc.since);
//    s.text('since', typedefDoc.since);
//    s.text('name', typedefDoc.name);
//    s.load('typedef', this._buildMemberDocs([typedefDoc], ''));
//
//    return s;
//  }
//}
