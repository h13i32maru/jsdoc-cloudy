import fs from 'fs-extra';
import path from 'path';

import StaticFileBuilder from './builder/StaticFileBuilder.js';
import IndexDocBuilder from './builder/IndexDocBuilder.js';
import ReadmeDocBuilder from './builder/ReadmeDocBuilder.js';
import ClassDocBuilder from './builder/ClassDocBuilder.js';
import NamespaceDocBuilder from './builder/NamespaceDocBuilder.js';

/**
 * @param {TaffyDB} data see http://www.taffydb.com/
 * @param config
 * @param tutorials
 */
exports.publish = function(data, config, tutorials) {
  function writeHTML(html, fileName) {
    console.log(fileName);
    var filePath = path.resolve(config.destination, fileName);
    fs.writeFileSync(filePath, html, {encoding: 'utf-8'});
  }

  function copy(srcPath, destPath) {
    fs.copySync(srcPath, path.resolve(config.destination, destPath));
  }

  new IndexDocBuilder(data, config).exec(writeHTML);
  new ReadmeDocBuilder(data, config).exec(writeHTML);
  new ClassDocBuilder(data).exec(writeHTML);
  new NamespaceDocBuilder(data).exec(writeHTML);
  new StaticFileBuilder().exec(copy);
};
