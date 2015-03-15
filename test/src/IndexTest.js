import {readDoc, assert, find} from './util.js';

describe('index: ', ()=> {
  let doc = readDoc('index.html');
  let encode = encodeURIComponent;

  it('has self detail.', ()=>{
    find(doc, '[data-ice="content"] .self-detail', (doc)=>{
      assert.includes(doc, '[data-ice="title"]', 'sample for test');
      assert.includes(doc, '[data-ice="version"]', '1.2.3');
      assert.includes(doc, '[data-ice="url"]', 'https://github.com/h13i32maru/jsdoc-cloudy');
      assert.includes(doc, '[data-ice="url"]', 'https://github.com/h13i32maru/jsdoc-cloudy', 'href');
      assert.includes(doc, '[data-ice="description"]', 'this is sample for test description.');
    });
  });

  it('has module summary.', ()=>{
    find(doc, '[data-ice="moduleSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public module/module1');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1.html'), 'href');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this module was deprecated. this is module/module1 deprecated.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this module is experimental. this is module/module1 experimental.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this is module/module1 summary.');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected module/module2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private module/module3');
      });
    });
  });

  it('has namespace summary.', ()=>{
    find(doc, '[data-ice="namespaceSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public @global');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('@global.html'), 'href');

        assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public Namespace1');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(2) a', encode('module:module|module1~Namespace1.html'), 'href');

        assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public NamespaceAndClass');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(3) a', encode('module:module|module1~NamespaceAndClass.html'), 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected Namespace2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private Namespace3');
      });
    });
  });

  it('has class summary.', ()=>{
    find(doc, '[data-ice="classSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public Class1(p1: string | number, p2: string | number, p3: Object) this is Class1 classdesc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Class1.html'), 'href');

        assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'public NamespaceAndClass');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(2) a', encode('module:module|module1~NamespaceAndClass(2).html'), 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected Class2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private Class3');
      });
    });
  });

  it('has interface summary.', ()=>{
    find(doc, '[data-ice="interfaceSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public Interface1 this is Interface1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Interface1.html'), 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected Interface2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private Interface3');
      });
    });
  });

  it('has mixin summary.', ()=>{
    find(doc, '[data-ice="mixinSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public Mixin1 this is Mixin1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Mixin1.html'), 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected Mixin2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private Mixin3');
      });
    });
  });

  it('has file summary.', ()=>{
    find(doc, '[data-ice="fileSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public module/module1.js this is module/module1.js desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('@file-module|module1.js.html'), 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected module/module2.js');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private module/module3.js');
      });
    });
  });
});
