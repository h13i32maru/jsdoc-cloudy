var fs = require('fs-extra');
var path = require('path');
var TAFFY = require('taffydb').taffy;
var publish = require('../../src/publish.js').publish;

var dataJSON = fs.readFileSync(path.resolve(__dirname, '../fixture/exported-data.json'), {encoding: 'utf8'});
var optionJSON = fs.readFileSync(path.resolve(__dirname, '../fixture/exported-option.json'), {encoding: 'utf8'});

var records = JSON.parse(dataJSON);
var data = TAFFY(records);
var option = JSON.parse(optionJSON);

publish(data, option);


