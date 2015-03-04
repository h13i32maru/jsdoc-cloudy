import {readDoc, assert, find} from './util.js';

describe('module/module1~NamespaceAndClass: ', ()=> {
  let doc = readDoc('module:module|module1~NamespaceAndClass.html');
  let encode = encodeURIComponent;

  it('has header notice.', ()=> {
    find(doc, '[data-s="content"] .header-notice', (doc)=> {
      assert.includes(doc, '[data-s="variation"]', '(2)');
      assert.includes(doc, '[data-s="variation"] a', encode('module:module|module1~NamespaceAndClass(2).html'), 'href');
    });
  });
});

describe('module/module1~NamespaceAndClass(2): ', ()=> {
  let doc = readDoc('module:module|module1~NamespaceAndClass(2).html');
  let encode = encodeURIComponent;

  it('has header notice.', ()=> {
    find(doc, '[data-s="content"] .header-notice', (doc)=> {
      assert.includes(doc, '[data-s="variation"]', '(1)');
      assert.includes(doc, '[data-s="variation"] a', encode('module:module|module1~NamespaceAndClass.html'), 'href');
    });
  });
});
