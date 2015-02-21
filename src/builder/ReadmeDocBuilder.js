import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class ReadmeDocBuilder extends DocBuilder {
  constructor(data, config) {
    super(data);
    this._config = config;
  }

  exec(callback) {
    var s = this._buildLayoutDoc();
    s.load('content', this._buildReadmeDoc());
    callback(s.html, 'readme.html');
  }

  _buildReadmeDoc() {
    var html = this._readTemplate('readme.html');
    var s = new SpruceTemplate(html);
    s.load('readme', this._config.readme);

    return s;
  }
}
