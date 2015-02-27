import SpruceTemplate from 'spruce-template';
import NamespaceDocBuilder from './NamespaceDocBuilder.js';

export default class ModuleDocBuilder extends NamespaceDocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    var moduleDocs = this._find({kind: 'module'});
    for (var moduleDoc of moduleDocs) {
      s.load('content', this._buildNamespaceDoc(moduleDoc));
      callback(s.html, `${moduleDoc.longname}.html`);
    }
  }

  /**
   * @override
   * @param moduleDoc
   * @private
   */
  _buildNamespaceDoc(moduleDoc) {
    var s = super._buildNamespaceDoc(moduleDoc);

    s.text('namespace', moduleDoc.longname.replace(/^module: */, ''));

    return s;
  }
}
