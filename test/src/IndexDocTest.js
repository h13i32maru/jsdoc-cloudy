import {readDoc, assert, find} from './util.js';

describe('IndexDoc: ', ()=>{

  let doc = readDoc('index.html');

  it('has basic information.', ()=>{
    assert.includes(doc, 'h1 [data-s="title"]', 'sample for test');
    assert.includes(doc, 'h1 .version', '1.2.3');
    assert.includes(doc, 'h1 .url', 'https://github.com/h13i32maru/jsdoc-cloudy');
    assert.includes(doc, 'h1 + [data-s="description"]', 'this is sample for test description.');
  });

  it('has summary of class', ()=>{
    find(doc, '[data-s="summaryClassDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'Class1(p1: string, p2: number)');
      assert.includes(doc, '', 'this is Class1 desc.');
      assert.includes(doc, 'a', 'Class1.html', 'href');
    });

    find(doc, '[data-s="summaryClassDocs"] tr[data-s="target"]:nth-child(3)', (doc)=>{
      assert.includes(doc, '', 'Class1(p1: string, p2: number)');
      assert.includes(doc, '', 'this is Class1 desc.');
      assert.includes(doc, 'a', 'Namespace1.Class1.html', 'href');
    });
  });

  it('has summary of namespace', ()=>{
    find(doc, '[data-s="summaryNamespaceDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'Namespace1');
      assert.includes(doc, '', 'this is Namespace1 desc.');
      assert.includes(doc, 'a', 'Namespace1.html', 'href');
    });

    find(doc, '[data-s="summaryNamespaceDocs"] tr[data-s="target"]:nth-child(2)', (doc)=>{
      assert.includes(doc, '', '@global');
      assert.includes(doc, '', 'global object.');
      assert.includes(doc, 'a', '@global.html', 'href');
    });
  });
});
