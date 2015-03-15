var fs = require('fs-extra');
var path = require('path');

exports.publish = function(data, option, tutorials) {
  var dataJSON = data().stringify();
  var optionJSON = JSON.stringify(option);

  fs.writeFileSync(path.resolve(__dirname, './exported-data.json'), dataJSON, {encoding: 'utf8'});
  fs.writeFileSync(path.resolve(__dirname, './exported-option.json'), optionJSON, {encoding: 'utf8'});
};
