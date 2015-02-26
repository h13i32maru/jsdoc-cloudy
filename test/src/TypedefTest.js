import {readDoc, assert, find} from './util.js';

describe('Typedef: ', ()=> {
  let doc = readDoc('@typedef.html');

  it('has summary.', ()=>{
    find(doc, '[data-s="summaryPublic"] [data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'Namespace1.typedef1: number | string');
      assert.includes(doc, '[data-s="deprecated"]', 'this typedef was deprecated.');
      assert.includes(doc, '[data-s="description"]', 'this is typedef1 desc.');
    });

    find(doc, '[data-s="summaryProtected"] [data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'typedef2: boolean');
      assert.includes(doc, '[data-s="description"]', 'this is typedef2 desc.');
    });

    find(doc, '[data-s="summaryPrivate"] [data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'typedef3: Object');
      assert.includes(doc, '[data-s="description"]', 'this is typedef3 desc.');
    });
  });

  it('has detail.', ()=>{
    find(doc, '[data-s="publicTypedefs"] [data-s="member"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '#static-typedef1', 'public typedef1: number | string');
      assert.includes(doc, '[data-s="deprecated"]', 'this typedef was deprecated.');
      assert.includes(doc, '[data-s="description"]', 'this is typedef1 desc.');
      assert.includes(doc, '[data-s="example"]', 'var foo = typedef1;');
      assert.includes(doc, '[data-s="see"]:nth-child(1)', 'See: http://example.com');
      assert.includes(doc, '[data-s="see"]:nth-child(1) a', 'http://example.com', 'href');
      assert.includes(doc, '[data-s="see"]:nth-child(2)', 'See: Namespace1.Class1');
      assert.includes(doc, '[data-s="see"]:nth-child(2) a', 'Namespace1.Class1.html', 'href');
      assert.includes(doc, '[data-s="see"]:nth-child(3)', 'See: https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest');
      assert.includes(doc, '[data-s="see"]:nth-child(3) a', 'https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest', 'href');
    })
  });

  find(doc, '[data-s="protectedTypedefs"] [data-s="member"]:nth-child(1)', (doc)=>{
    assert.includes(doc, '#global-typedef2', 'protected typedef2: boolean');
    assert.includes(doc, '[data-s="description"]', 'this is typedef2 desc.');
  });

  find(doc, '[data-s="privateTypedefs"] [data-s="member"]:nth-child(1)', (doc)=>{
    assert.includes(doc, '#global-typedef3', 'private typedef3: Object');
    assert.includes(doc, '[data-s="description"]', 'this is typedef3 desc.');
    assert.includes(doc, '[data-s="property"]:nth-child(1)', 'typedef3.member1 number optional default: 10 this is member1 desc.');
    assert.includes(doc, '[data-s="property"]:nth-child(2)', 'typedef3.member2 string nullable: true this is member2 desc.');
    assert.includes(doc, '[data-s="property"]:nth-child(3)', 'typedef3.member3 Object this is member3 desc.');
    assert.includes(doc, '[data-s="property"]:nth-child(4)', 'typedef3.member3.member4 boolean nullable: false this is member4 desc.');
  });
});
