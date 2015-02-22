#!/bin/bash

#./script/build.sh
./script/build_test.sh

./node_modules/.bin/mocha --require out/test/src/espower-loader.js --require ./node_modules/babel/polyfill.js --recursive out/test/src
