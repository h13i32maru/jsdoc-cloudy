import {readDoc, assert, find} from './util.js';

describe('@memberof: ', ()=> {
  let doc = readDoc('TagMemberof.html');

  it('shows summary.', ()=>{
    assert.includes(doc, '[data-s="summaryClassDocs"] [data-s="target"]:nth-child(1)', 'Class1()');
    assert.includes(doc, '[data-s="summaryMemberDocs"] [data-s="target"]:nth-child(1)', 'member1: number');
    assert.includes(doc, '[data-s="summaryMethodDocs"] [data-s="target"]:nth-child(1)', 'method1()');
  });

  it('shows detail.', ()=>{
    assert.includes(doc, '[data-s="member"] #static-member1', 'member1: number');
    assert.includes(doc, '[data-s="method"] #static-method1', 'method1()');
  });
});
