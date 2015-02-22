import {readDoc, assert, find} from './util.js';

describe('@method: ', ()=> {
  let doc = readDoc('TagMethod.html');

  it('shows method name in summary', ()=>{
    find(doc, '[data-s="summaryMethodDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'method1()');
      assert.includes(doc, 'a', '#static-method1', 'href');
    });
  });

  it('shows method name in detail', ()=>{
    assert.includes(doc, '[data-s="methodDocs"] #static-method1', 'method1()');
  });
});
