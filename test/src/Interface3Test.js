import {readDoc, assert, find} from './util.js';

describe('module/module1~Interface3: ', ()=> {
  let doc = readDoc('module:module|module1~Interface3.html');
  let encode = encodeURIComponent;

  it('has implemented.', ()=> {
    find(doc, '[data-ice="directImplemented"]', (doc)=> {
      assert.includes(doc, 'li:nth-of-type(1)', 'Class3');
      assert.includes(doc, 'li:nth-of-type(1) a', encode('module:module|module1~Class3.html'), 'href');
    });

    find(doc, '[data-ice="indirectImplemented"]', (doc)=> {
      assert.includes(doc, 'li:nth-of-type(1)', 'Class1');
      assert.includes(doc, 'li:nth-of-type(1) a', encode('module:module|module1~Class1.html'), 'href');

      assert.includes(doc, 'li:nth-of-type(2)', 'Class2');
      assert.includes(doc, 'li:nth-of-type(2) a', encode('module:module|module1~Class2.html'), 'href');
    });
  });
});
