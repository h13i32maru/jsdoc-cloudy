import {readDoc, assert, find} from './util.js';

describe('@example: ', ()=> {
  let doc = readDoc('TagExample.html');

  it('shows member example.', ()=>{
    assert.includes(doc, '[data-s="member"]:nth-child(1) [data-s="exampleCode"]', 'var foo = TagExample.member1;');
  });

  it('shows method example.', ()=> {
    assert.includes(doc, '[data-s="method"]:nth-child(1) [data-s="exampleCode"]', 'var foo = TagExample.method1;');
  });
});
