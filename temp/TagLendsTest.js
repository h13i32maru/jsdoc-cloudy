import {readDoc, assert, find} from './util.js';

describe('@lends: ', ()=> {
  let doc = readDoc('TagLends.Class1.html');

  it('shows summary.', ()=>{
    assert.includes(doc, '[data-s="summaryConstructorDocs"] [data-s="target"]:nth-child(1)', 'Class1()');
    assert.includes(doc, '[data-s="summaryMemberDocs"] [data-s="target"]:nth-child(1)', 'member1: number');
    assert.includes(doc, '[data-s="summaryMethodDocs"] [data-s="target"]:nth-child(1)', 'method1()');
  });

  it('shows detail.', ()=>{
    assert.includes(doc, '[data-s="member"] #instance-member1', 'member1: number');
    assert.includes(doc, '[data-s="method"] #instance-method1', 'method1()');
  });
});
