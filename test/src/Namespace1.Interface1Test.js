import {readDoc, assert, find} from './util.js';

describe('Namespace1.Interface1: ', ()=> {

  let doc = readDoc('Namespace1.Interface1.html');

  describe('basic information', ()=> {
    it('has basic information.', ()=> {
      assert.includes(doc, '[data-s="nameSpace"]', 'Namespace1');
      assert.includes(doc, 'h1 [data-s="className"]', 'Interface1');
      assert.includes(doc, '[data-s="classDesc"]', 'this is Interface1 classdesc.');
      assert.includes(doc, '[data-s="fileexampleCode"]', "var foo = Interface1;");
    });
  });
});
