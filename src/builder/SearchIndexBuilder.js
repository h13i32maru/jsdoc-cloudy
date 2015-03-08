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
      searchIndex.push([doc.longname.toLowerCase(), this._getURL(doc, null, 2), doc.longname]);
    }

    let javascript = 'window.jsdocCloudySearchIndex = ' + JSON.stringify(searchIndex, null, 2);

    callback(javascript, 'script/search_index.js');
  }
}
