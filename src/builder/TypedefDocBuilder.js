import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class TypedefDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    s.load('content', this._buildTypedefDoc());
    callback(s.html, '@typedef.html');
  }

  _buildTypedefDoc() {
    var typedefPublicDocs = this._find({kind: 'typedef', access: 'public'});
    var typedefProtectedDocs = this._find({kind: 'typedef', access: 'protected'});
    var typedefPrivateDocs = this._find({kind: 'typedef', access: 'private'});

    var s = new SpruceTemplate(this._readTemplate('typedef.html'));
    s.load('summaryPublic', this._buildSummaryTypedefDocs(typedefPublicDocs, 'Public'));
    s.load('summaryProtected', this._buildSummaryTypedefDocs(typedefProtectedDocs, 'Protected'));
    s.load('summaryPrivate', this._buildSummaryTypedefDocs(typedefPrivateDocs, 'Private'));

    s.drop('publicTypedefTitle', !typedefPublicDocs.length);
    s.load('publicTypedefs', this._buildMemberDocs(typedefPublicDocs));

    s.drop('protectedTypedefTitle', !typedefProtectedDocs.length);
    s.load('protectedTypedefs', this._buildMemberDocs(typedefProtectedDocs));

    s.drop('privateTypedefTitle', !typedefPrivateDocs.length);
    s.load('privateTypedefs', this._buildMemberDocs(typedefPrivateDocs));

    return s;
  }
}
