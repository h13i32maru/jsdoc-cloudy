import path from 'path';
import DocBuilder from './DocBuilder.js';

export default class StaticFileBuilder extends DocBuilder {
  exec(callback) {
    let searchIndex = [];
    let docs = this._find({
      kind: {'!is': 'package'},
      inherited: {isUndefined: true},
      mixed: {isUndefined: true}
    });

    for (let doc of docs) {
      let indexText, url, displayText;

      if (doc._custom_import_path) {
        displayText = `${doc._custom_import_path}~${doc.name}`;
        indexText = displayText.toLowerCase();
        url = this._getURL(doc, null, 2);
      } else {
        displayText = doc.longname;
        indexText = displayText.toLowerCase();
        url = this._getURL(doc, null, 2);
      }

      searchIndex.push([indexText, url, displayText]);
    }

    let javascript = 'window.jsdocCloudySearchIndex = ' + JSON.stringify(searchIndex, null, 2);

    callback(javascript, 'script/search_index.js');
  }
}
