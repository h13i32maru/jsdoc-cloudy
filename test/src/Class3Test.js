import {readDoc, assert, find} from './util.js';

describe('module/module1~Class3: ', ()=> {
  let doc = readDoc('module:module|module1~Class3.html');
  let encode = encodeURIComponent;

  it('has self detail.', ()=>{
    find(doc, '[data-ice="content"] .self-detail', (doc)=>{
      assert.includes(doc, '[data-ice="name"]', 'Class3');

      assert.includes(doc, '[data-ice="extendsChain"]', 'XMLHttpRequest');
      assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(1) a', 'https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest', 'href');

      assert.includes(doc, '[data-ice="directSubclass"]', 'Class2');
      assert.includes(doc, '[data-ice="directSubclass"] span:nth-of-type(1) a', encode('module:module|module1~Class2.html'), 'href');

      assert.includes(doc, '[data-ice="indirectSubclass"]', 'Class1');
      assert.includes(doc, '[data-ice="indirectSubclass"] span:nth-of-type(1) a', encode('module:module|module1~Class1.html'), 'href');
    });
  });
});
