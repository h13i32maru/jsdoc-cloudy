import fs from 'fs';
import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class IndexDocBuilder extends DocBuilder {
  constructor(data, config) {
    super(data);
    this._config = config;
  }

  exec(callback) {
    var s = this._buildLayoutDoc();
    s.load('content', this._buildIndexDoc());
    callback(s.html, 'index.html');
  }

  _buildIndexDoc() {
    var indexInfo = this._getIndexInfo();
    var classDocs = this._find({kind: 'class'});
    var namespaceDocs = this._find({kind: 'namespace'});

    var s = new SpruceTemplate(this._readTemplate('index.html'));

    s.text('title', indexInfo.title);
    s.text('version', indexInfo.version);
    s.text('url', indexInfo.url);
    s.attr('url', 'href', indexInfo.url);
    s.text('description', indexInfo.desc);
    s.load('summaryClassDocs', this._buildSummaryClassDocs(classDocs));
    s.load('summaryNamespaceDocs', this._buildSummaryNamespaceDocs(namespaceDocs));

    return s;
  }

  _getIndexInfo() {
    if (this._config.configure) {
      var configPath = this._config.configure;
      var configJSON = fs.readFileSync(configPath, {encoding: 'utf-8'});
      var config = JSON.parse(configJSON);
    }

    if (this._config.package) {
      var packagePath = this._config.package;
      var json = fs.readFileSync(packagePath, {encoding: 'utf-8'});
      var packageObj = JSON.parse(json);
    }

    var indexInfo = {
      title: config.template.title || packageObj.name,
      desc: config.template.description || packageObj.description,
      version: config.template.version || packageObj.version,
      url: config.template.url || packageObj.repository ? packageObj.repository.url : ''
    };

    return indexInfo;
  }
}
