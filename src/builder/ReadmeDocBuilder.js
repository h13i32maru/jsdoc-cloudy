import IceCap from 'ice-cap';
import DocBuilder from './DocBuilder.js';

export default class ReadmeDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    s.load('content', this._buildReadmeDoc());
    callback(s.html, '@readme.html');
  }

  _buildReadmeDoc() {
    var html = this._readTemplate('readme.html');
    var s = new IceCap(html);
    s.load('readme', this._option.readme);

    return s;
  }
}
