#!/bin/bash

rm -rf out/test
mkdir -p out/test/src
./node_modules/.bin/babel --out-dir out/test/src/ test/src
cp -a test/fixture out/test/

./node_modules/.bin/jsdoc -c out/test/fixture/jsdoc.json
