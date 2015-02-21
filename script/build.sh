#!/bin/bash

rm -rf out/src
mkdir -p out/src

./node_modules/.bin/babel --out-dir out/src src

# template dir has javascript file, so bable transpiles the files.
# but, the files must not be transpiled.
# copy original template dir to avoid this problem.
rm -rf out/src/builder/template
cp -a src/builder/template out/src/builder/template
