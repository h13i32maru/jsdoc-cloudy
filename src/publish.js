import fs from 'fs-extra';
import path from 'path';

import StaticFileBuilder from './builder/StaticFileBuilder.js';
import IndexDocBuilder from './builder/IndexDocBuilder.js';
import ReadmeDocBuilder from './builder/ReadmeDocBuilder.js';
import ObjectDocBuilder from './builder/ObjectDocBuilder.js';

/**
 * @param {TaffyDB} data see http://www.taffydb.com/
 * @param option
 * @param tutorials
 */
exports.publish = function(data, option, tutorials) {
  function writeHTML(html, fileName) {
    console.log(fileName);
    var filePath = path.resolve(option.destination, fileName);
    fs.outputFileSync(filePath, html, {encoding: 'utf-8'});
  }

  function copy(srcPath, destPath) {
    console.log(destPath);
    fs.copySync(srcPath, path.resolve(option.destination, destPath));
  }

  new IndexDocBuilder(data, option).exec(writeHTML);
  new ReadmeDocBuilder(data, option).exec(writeHTML);
  new ObjectDocBuilder(data, option).exec(writeHTML);
  new StaticFileBuilder(data, option).exec(copy);
};
