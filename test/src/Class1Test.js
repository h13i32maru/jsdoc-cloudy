import {readDoc, assert, find} from './util.js';

describe('Class1: ', ()=> {
  let doc = readDoc('Class1.html');

  it('has basic information.', ()=>{
    assert.includes(doc, '[data-s="nameSpace"]', '@global');
    assert.includes(doc, 'h1 [data-s="className"]', 'Class1');
    assert.includes(doc, '[data-s="classDesc"]', 'this is Class1 classdesc.');
    assert.includes(doc, '[data-s="fileexampleCode"]', "var foo = Class1;");
  });
});
