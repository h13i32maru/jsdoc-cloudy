import {readDoc, assert, find} from './util.js';

describe('@desc: ', ()=> {
  let doc = readDoc('TagDesc.html');

  it('shows summary desc.', ()=>{
    assert.includes(doc, '[data-s="summaryMemberDocs"] tr[data-s="target"]:nth-child(1)', 'this is TagDesc.member1 desc.');
    assert.includes(doc, '[data-s="summaryMethodDocs"] tr[data-s="target"]:nth-child(1)', 'this is TagDesc.method1 desc.');
    assert.includes(doc, '[data-s="summaryNamespaceDocs"] tr[data-s="target"]:nth-child(1)', 'this is TagDesc.namespace1 desc.');
  });

  it('shows detail desc.', ()=>{
    assert.includes(doc, '[data-s="memberDocs"] [data-s="member"]:nth-child(1) [data-s="description"]', 'this is TagDesc.member1 desc. after 2nd line is more desc.');
    assert.includes(doc, '[data-s="methodDocs"] [data-s="method"]:nth-child(1) [data-s="description"]', 'this is TagDesc.method1 desc. after 2nd line is more desc.');
  });
});
