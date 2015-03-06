import {readDoc, assert, find} from './util.js';

describe('nav: ', ()=> {
  let doc = readDoc('index.html');
  let encode = encodeURIComponent;

  it('has home and readme link.', ()=>{
    find(doc, '[data-s="nav"]', (doc)=>{
      assert.includes(doc, 'h1 a:nth-of-type(1)', 'HOME');
      assert.includes(doc, 'h1 a:nth-of-type(1)', './', 'href');

      assert.includes(doc, 'h1 a:nth-of-type(2)', 'README');
      assert.includes(doc, 'h1 a:nth-of-type(2)', 'readme.html', 'href');
    });
  });

  it('has class nav.', ()=>{
    // public
    assert.includes(doc, '[data-s="classDoc"]:nth-of-type(1)', 'Class1');
    assert.includes(doc, '[data-s="classDoc"]:nth-of-type(1) a', encode('module:module|module1~Class1.html'), 'href');

    // protected
    assert.includes(doc, '[data-s="classDoc"]:nth-of-type(2)', 'Class2');
    assert.includes(doc, '[data-s="classDoc"]:nth-of-type(2) a', encode('module:module|module1~Class2.html'), 'href');

    // private
    assert.includes(doc, '[data-s="classDoc"]:nth-of-type(3)', 'Class3');
    assert.includes(doc, '[data-s="classDoc"]:nth-of-type(3) a', encode('module:module|module1~Class3.html'), 'href');

    // variation
    assert.includes(doc, '[data-s="classDoc"]:nth-of-type(4)', 'NamespaceAndClass');
    assert.includes(doc, '[data-s="classDoc"]:nth-of-type(4) a', encode('module:module|module1~NamespaceAndClass(2).html'), 'href');
  });

  it('has interface nav.', ()=>{
    // public
    assert.includes(doc, '[data-s="interfaceDoc"]:nth-of-type(1)', 'Interface1');
    assert.includes(doc, '[data-s="interfaceDoc"]:nth-of-type(1) a', encode('module:module|module1~Interface1.html'), 'href');

    // protected
    assert.includes(doc, '[data-s="interfaceDoc"]:nth-of-type(2)', 'Interface2');
    assert.includes(doc, '[data-s="interfaceDoc"]:nth-of-type(2) a', encode('module:module|module1~Interface2.html'), 'href');

    // private
    assert.includes(doc, '[data-s="interfaceDoc"]:nth-of-type(3)', 'Interface3');
    assert.includes(doc, '[data-s="interfaceDoc"]:nth-of-type(3) a', encode('module:module|module1~Interface3.html'), 'href');
  });

  it('has namespace nav.', ()=>{
    // public
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(1)', '@global');
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(1) a', encode('@global.html'), 'href');
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(2)', 'Namespace1');
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(2) a', encode('module:module|module1~Namespace1.html'), 'href');

    // protected
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(3)', 'Namespace2');
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(3) a', encode('module:module|module1~Namespace2.html'), 'href');

    // private
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(4)', 'Namespace3');
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(4) a', encode('module:module|module1~Namespace3.html'), 'href');

    // variation
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(5)', 'NamespaceAndClass');
    assert.includes(doc, '[data-s="namespaceDoc"]:nth-of-type(5) a', encode('module:module|module1~NamespaceAndClass.html'), 'href');
  });

  it('has module nav.', ()=>{
    // public
    assert.includes(doc, '[data-s="moduleDoc"]:nth-of-type(1)', 'module/module1');
    assert.includes(doc, '[data-s="moduleDoc"]:nth-of-type(1) a', encode('module:module|module1.html'), 'href');

    // protected
    assert.includes(doc, '[data-s="moduleDoc"]:nth-of-type(2)', 'module/module2');
    assert.includes(doc, '[data-s="moduleDoc"]:nth-of-type(2) a', encode('module:module|module2.html'), 'href');

    // private
    assert.includes(doc, '[data-s="moduleDoc"]:nth-of-type(3)', 'module/module3');
    assert.includes(doc, '[data-s="moduleDoc"]:nth-of-type(3) a', encode('module:module|module3.html'), 'href');
  });

  it('has mixin nav.', ()=>{
    // public
    assert.includes(doc, '[data-s="mixinDoc"]:nth-of-type(1)', 'Mixin1');
    assert.includes(doc, '[data-s="mixinDoc"]:nth-of-type(1) a', encode('module:module|module1~Mixin1.html'), 'href');

    // protected
    assert.includes(doc, '[data-s="mixinDoc"]:nth-of-type(2)', 'Mixin2');
    assert.includes(doc, '[data-s="mixinDoc"]:nth-of-type(2) a', encode('module:module|module1~Mixin2.html'), 'href');

    // private
    assert.includes(doc, '[data-s="mixinDoc"]:nth-of-type(3)', 'Mixin3');
    assert.includes(doc, '[data-s="mixinDoc"]:nth-of-type(3) a', encode('module:module|module1~Mixin3.html'), 'href');
  });

  it('has file nav.', ()=>{
    // public
    assert.includes(doc, '[data-s="fileDoc"]:nth-of-type(1)', 'module/module1.js');
    assert.includes(doc, '[data-s="fileDoc"]:nth-of-type(1) a', encode('@file-module|module1.js.html'), 'href');

    // protected
    assert.includes(doc, '[data-s="fileDoc"]:nth-of-type(2)', 'module/module2.js');
    assert.includes(doc, '[data-s="fileDoc"]:nth-of-type(2) a', encode('@file-module|module2.js.html'), 'href');

    // private
    assert.includes(doc, '[data-s="fileDoc"]:nth-of-type(3)', 'module/module3.js');
    assert.includes(doc, '[data-s="fileDoc"]:nth-of-type(3) a', encode('@file-module|module3.js.html'), 'href');
  });
});
