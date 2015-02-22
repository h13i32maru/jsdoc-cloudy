import {readDoc, assert, find} from './util.js';

describe('@classdesc: ', ()=> {
  let doc = readDoc('TagClassdesc.Class1.html');

  it('shows class description.', ()=>{
    assert.includes(doc, '[data-s="classDesc"]', 'this is TagClassdesc.Class1 class desc.');
  })
});
