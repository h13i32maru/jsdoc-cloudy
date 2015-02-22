import {readDoc, assert, find} from './util.js';

describe('@class: ', ()=> {
  let doc = readDoc('TagClass.Class1.html');

  it('shows class name.', ()=>{
    assert.includes(doc, '[data-s="nameSpace"]', 'TagClass');
    assert.includes(doc, 'h1[data-s="className"]', 'Class1');
  })
});
