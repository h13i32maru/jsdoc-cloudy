import {readDoc, assert, find} from './util.js';

describe('@instance: ', ()=> {
  let doc = readDoc('TagInstance.Class1.html');

  it('shows instance summary.', ()=>{
    find(doc, '[data-s="summaryMemberDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'member1: number');
      assert.includes(doc, 'a', '#instance-member1', 'href');
    });

    find(doc, '[data-s="summaryMethodDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'method1()');
      assert.includes(doc, 'a', '#instance-method1', 'href');
    });
  });

  it('shows instance detail.', ()=>{
    assert.includes(doc, '[data-s="members"] #instance-member1', 'member1: number');
    assert.includes(doc, '[data-s="methods"] #instance-method1', 'method1()');
  });
});
