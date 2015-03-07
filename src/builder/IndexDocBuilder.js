import fs from 'fs';
import SpruceTemplate from 'spruce-template';
import DocBuilder from './DocBuilder.js';

export default class IndexDocBuilder extends DocBuilder {
  exec(callback) {
    var s = this._buildLayoutDoc();
    s.load('content', this._buildIndexDoc());
    callback(s.html, 'index.html');
  }

  _buildIndexDoc() {
    var indexInfo = this._getIndexInfo();

    var s = new SpruceTemplate(this._readTemplate('index.html'));

    s.text('title', indexInfo.title);
    s.text('version', indexInfo.version, 'append');
    s.text('url', indexInfo.url);
    s.attr('url', 'href', indexInfo.url);
    s.text('description', indexInfo.desc);

    s.load('moduleSummary', this._buildSummaryHTML(null, 'module', 'Module Summary'), 'append');
    s.load('namespaceSummary', this._buildSummaryHTML(null, 'namespace', 'Namespace Summary'), 'append');
    s.load('classSummary', this._buildSummaryHTML(null, 'class', 'Class Summary'), 'append');
    s.load('interfaceSummary', this._buildSummaryHTML(null, 'interface', 'Interface Summary'), 'append');
    s.load('mixinSummary', this._buildSummaryHTML(null, 'mixin', 'Mixin Summary'), 'append');
    s.load('fileSummary', this._buildSummaryHTML(null, 'file', 'File Summary'), 'append');

    return s;
  }

  _getIndexInfo() {
    //if (this._config.configure) {
    //  var configPath = this._config.configure;
    //  var configJSON = fs.readFileSync(configPath, {encoding: 'utf-8'});
    //  var config = JSON.parse(configJSON);
    //}

    if (this._option.package) {
      var packagePath = this._option.package;
      var json = fs.readFileSync(packagePath, {encoding: 'utf-8'});
      var packageObj = JSON.parse(json);
    }

    if (this._config) {
      var config = this._config;
      var indexInfo = {
        title: config.cloudy.title || packageObj.name,
        desc: config.cloudy.description || packageObj.description,
        version: config.cloudy.version || packageObj.version,
        url: config.cloudy.url || packageObj.repository ? packageObj.repository.url : ''
      };
    }

    return indexInfo;
  }
}
