import _assert from 'power-assert';
import fs from 'fs';
import path from 'path';
import jsdom from 'jsdom';

export function readDoc(fileName) {
  let html = fs.readFileSync(path.resolve(__dirname, `../fixture/${fileName}`), {encoding: 'utf-8'});
  let doc = jsdom.jsdom(html, {
    features: {
      FetchExternalResources: [],
      ProcessExternalResources: false
    }
  });
  return doc;
}

export function find(doc, selector, callback) {
  let nodes = doc.querySelectorAll(selector);
  if (!nodes.length) assert(false, `node is not found. selector = "${selector}"`);
  if (nodes.length !== 1) assert(false, `many nodes are found. selector = "${selector}"`);

  callback(nodes[0]);
}

function getActual(doc, selector, attr) {
  let node;
  if (selector) {
    let nodes = doc.querySelectorAll(selector);
    if (!nodes.length) assert(false, `node is not found. selector = "${selector}"`);
    if (nodes.length !== 1) assert(false, `many nodes are found. selector = "${selector}"`);
    node = nodes[0];
  } else {
    node = doc
  }

  if (!node) {
    assert(false, `node is not found. selector = "${selector}"`);
  }

  let actual;
  if (attr) {
    actual = node.getAttribute(attr);
  } else {
    actual = node.textContent.replace(/\s+/g, ' ');
  }

  if (actual === null) {
    assert(false, `actual is null. selector = ${selector}, attr = ${attr}`);
  }

  return actual;
}

_assert.includes = function(doc, selector, expect, attr) {
  let actual = getActual(doc, selector, attr);
  assert(actual.includes(expect) === true, `selector: "${selector}"`);
};

_assert.notIncludes = function(doc, selector, expect, attr) {
  let actual = getActual(doc, selector, attr);
  assert(actual.includes(expect) === false, `selector: "${selector}"`);
};

export var assert = _assert;
