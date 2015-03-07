import {readDoc, assert, find} from './util.js';

describe('Layout: ', ()=> {
  let doc = readDoc('index.html');
  let encode = encodeURIComponent;

  it('has user script and style.', ()=>{
    find(doc, 'head', (doc)=>{
      assert.includes(doc, 'script[src="user/script/0-script1.js"]', 'user/script/0-script1.js', 'src');
      assert.includes(doc, 'script[src="user/script/1-script2.js"]', 'user/script/1-script2.js', 'src');

      assert.includes(doc, 'link[href="user/css/0-style1.css"]', 'user/css/0-style1.css', 'href');
      assert.includes(doc, 'link[href="user/css/1-style2.css"]', 'user/css/1-style2.css', 'href');
    });
  });
});
