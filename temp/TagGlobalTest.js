import {readDoc, assert, find} from './util.js';

describe('@global: ', ()=> {
  let doc = readDoc('@global.html');

  it('shows summary.', ()=>{
    assert.includes(doc, '[data-s="summaryMemberDocs"] [data-s="target"]:nth-child(1)', 'member1: number');
    assert.includes(doc, '[data-s="summaryMethodDocs"] [data-s="target"]:nth-child(1)', 'method1()');
  });

  it('shows detail.', ()=>{
    assert.includes(doc, '[data-s="member"] #global-member1', 'member1: number');
    assert.includes(doc, '[data-s="method"] #global-method1', 'method1()');
  });
});
