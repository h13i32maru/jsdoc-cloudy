import {readDoc, assert, find} from './util.js';

describe('module/module1: ', ()=> {
  let doc = readDoc('module:module|module1.html');
  let encode = encodeURIComponent;

  it('has header notice.', ()=>{
    find(doc, '[data-ice="content"] .header-notice', (doc)=>{
      assert.includes(doc, '[data-ice="memberof"]', '@global');
      assert.includes(doc, '[data-ice="memberof"] a', encode('@global.html'), 'href');

      assert.includes(doc, '[data-ice="access"]', 'public');
      assert.includes(doc, '[data-ice="kind"]', 'module');
      assert.includes(doc, '[data-ice="version"]', '0.0.1');
      assert.includes(doc, '[data-ice="since"]', '1.2.3');

      assert.includes(doc, '[data-ice="file"]', 'module/module1.js');
      assert.includes(doc, '[data-ice="file"] a', encode('@file-module|module1.js.html'), 'href');
    });
  });

  it('has self detail.', ()=>{
    find(doc, '[data-ice="content"] .self-detail', (doc)=>{
      assert.includes(doc, '[data-ice="name"]', 'module/module1');
      assert.includes(doc, '[data-ice="deprecated"]', 'this module was deprecated. this is module/module1 deprecated.');
      assert.includes(doc, '[data-ice="experimental"]', 'this module is experimental. this is module/module1 experimental.');

      find(doc, '[data-ice="see"] ul', (doc)=>{
        assert.includes(doc, 'li:nth-of-type(1)', 'http://example.com');
        assert.includes(doc, 'li:nth-of-type(2)', 'module/module1');
        assert.includes(doc, 'li:nth-of-type(3)', 'Namespace1');
        assert.includes(doc, 'li:nth-of-type(4)', 'Class1');
        assert.includes(doc, 'li:nth-of-type(5)', 'Interface1');
        assert.includes(doc, 'li:nth-of-type(6)', 'Mixin1');
        assert.includes(doc, 'li:nth-of-type(7)', 'method1');
        assert.includes(doc, 'li:nth-of-type(8)', 'member1');
        assert.includes(doc, 'li:nth-of-type(9)', 'Typedef1');
        assert.includes(doc, 'li:nth-of-type(10)', 'Callback1');
        assert.includes(doc, 'li:nth-of-type(11)', 'CONSTANT1');
        assert.includes(doc, 'li:nth-of-type(12)', 'Event1');
        assert.includes(doc, 'li:nth-of-type(13)', 'XMLHttpRequest');
        assert.includes(doc, 'li:nth-of-type(14)', 'module/module1.js');
        assert.includes(doc, 'li:nth-of-type(15)', 'member1');
        assert.includes(doc, 'li:nth-of-type(16)', 'method1');
        assert.includes(doc, 'li:nth-of-type(17)', 'staticMember1');
        assert.includes(doc, 'li:nth-of-type(18)', 'staticMethod1');

        assert.includes(doc, 'li:nth-of-type(1) a', 'http://example.com', 'href');
        assert.includes(doc, 'li:nth-of-type(2) a', encode('module:module|module1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(3) a', encode('module:module|module1~Namespace1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(4) a', encode('module:module|module1~Class1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(5) a', encode('module:module|module1~Interface1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(6) a', encode('module:module|module1~Mixin1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(7) a', encode('module:module|module1.html') + '#inner-method1', 'href');
        assert.includes(doc, 'li:nth-of-type(8) a', encode('module:module|module1.html') + '#inner-member1', 'href');
        assert.includes(doc, 'li:nth-of-type(9) a', encode('module:module|module1.html') + '#inner-Typedef1', 'href');
        assert.includes(doc, 'li:nth-of-type(10) a', encode('module:module|module1.html') + '#inner-Callback1', 'href');
        assert.includes(doc, 'li:nth-of-type(11) a', encode('module:module|module1.html') + '#inner-CONSTANT1', 'href');
        assert.includes(doc, 'li:nth-of-type(12) a', encode('module:module|module1.html') + '#inner-Event1', 'href');
        assert.includes(doc, 'li:nth-of-type(13) a', 'https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest', 'href');
        assert.includes(doc, 'li:nth-of-type(14) a', encode('@file-module|module1.js.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(15) a', encode('module:module|module1~Class1.html') + '#instance-member1', 'href');
        assert.includes(doc, 'li:nth-of-type(16) a', encode('module:module|module1~Class1.html') + '#instance-method1', 'href');
        assert.includes(doc, 'li:nth-of-type(17) a', encode('module:module|module1~Class1.html') + '#static-staticMember1', 'href');
        assert.includes(doc, 'li:nth-of-type(18) a', encode('module:module|module1~Class1.html') + '#static-staticMethod1', 'href');
      });

      find(doc, '[data-ice="require"] ul', (doc)=>{
        assert.includes(doc, 'li:nth-of-type(1)', 'module/module1');
        assert.includes(doc, 'li:nth-of-type(2)', 'Namespace1');
        assert.includes(doc, 'li:nth-of-type(3)', 'Class1');
        assert.includes(doc, 'li:nth-of-type(4)', 'Interface1');
        assert.includes(doc, 'li:nth-of-type(5)', 'Mixin1');
        assert.includes(doc, 'li:nth-of-type(6)', 'method1');
        assert.includes(doc, 'li:nth-of-type(7)', 'member1');
        assert.includes(doc, 'li:nth-of-type(8)', 'Typedef1');
        assert.includes(doc, 'li:nth-of-type(9)', 'Callback1');
        assert.includes(doc, 'li:nth-of-type(10)', 'CONSTANT1');
        assert.includes(doc, 'li:nth-of-type(11)', 'Event1');
        assert.includes(doc, 'li:nth-of-type(12)', 'XMLHttpRequest');
        assert.includes(doc, 'li:nth-of-type(13)', 'member1');
        assert.includes(doc, 'li:nth-of-type(14)', 'method1');
        assert.includes(doc, 'li:nth-of-type(15)', 'staticMember1');
        assert.includes(doc, 'li:nth-of-type(16)', 'staticMethod1');

        assert.includes(doc, 'li:nth-of-type(1) a', encode('module:module|module1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(2) a', encode('module:module|module1~Namespace1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(3) a', encode('module:module|module1~Class1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(4) a', encode('module:module|module1~Interface1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(5) a', encode('module:module|module1~Mixin1.html'), 'href');
        assert.includes(doc, 'li:nth-of-type(6) a', encode('module:module|module1.html') + '#inner-method1', 'href');
        assert.includes(doc, 'li:nth-of-type(7) a', encode('module:module|module1.html') + '#inner-member1', 'href');
        assert.includes(doc, 'li:nth-of-type(8) a', encode('module:module|module1.html') + '#inner-Typedef1', 'href');
        assert.includes(doc, 'li:nth-of-type(9) a', encode('module:module|module1.html') + '#inner-Callback1', 'href');
        assert.includes(doc, 'li:nth-of-type(10) a', encode('module:module|module1.html') + '#inner-CONSTANT1', 'href');
        assert.includes(doc, 'li:nth-of-type(11) a', encode('module:module|module1.html') + '#inner-Event1', 'href');
        assert.includes(doc, 'li:nth-of-type(12) a', 'https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest', 'href');
        assert.includes(doc, 'li:nth-of-type(13) a', encode('module:module|module1~Class1.html') + '#instance-member1', 'href');
        assert.includes(doc, 'li:nth-of-type(14) a', encode('module:module|module1~Class1.html') + '#instance-method1', 'href');
        assert.includes(doc, 'li:nth-of-type(15) a', encode('module:module|module1~Class1.html') + '#static-staticMember1', 'href');
        assert.includes(doc, 'li:nth-of-type(16) a', encode('module:module|module1~Class1.html') + '#static-staticMethod1', 'href');
      });

      assert.includes(doc, '[data-ice="fileexampleDoc"]:nth-of-type(1)', 'var foo = module1; console.log(foo);');
      assert.includes(doc, '[data-ice="fileexampleDoc"]:nth-of-type(2)', 'var bar = module1; console.log(bar);');

      find(doc, '[data-ice="author"] ul', (doc)=>{
        assert.includes(doc, 'li:nth-of-type(1)', 'foo');
        assert.includes(doc, 'li:nth-of-type(2)', 'bar');

        assert.includes(doc, 'li:nth-of-type(1) a', 'mailto:foo@example.com', 'href');
        assert.includes(doc, 'li:nth-of-type(2) a', 'http://twitter.com/bar', 'href');
      });

      find(doc, '[data-ice="todo"] ul', (doc)=>{
        assert.includes(doc, 'li:nth-of-type(1)', 'this is module/module1 1st todo.');
        assert.includes(doc, 'li:nth-of-type(2)', 'this is module/module1 2nd todo.');
      });
    });
  });

  it('has namespace summary.', ()=>{
    find(doc, '[data-ice="namespaceSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public Namespace1 this is Namespace1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Namespace1.html'), 'href');
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

  it('has member summary.', ()=>{
    find(doc, '[data-ice="memberSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public member1: Object this is member1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1.html') + '#inner-member1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected member2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private member3');
      });
    });
  });

  it('has method summary.', ()=>{
    find(doc, '[data-ice="methodSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public method1 this is method1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1.html') + '#inner-method1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected method2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private method3');
      });
    });
  });

  it('has typedef summary.', ()=>{
    find(doc, '[data-ice="typedefSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public Typedef1: Object this is Typedef1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1.html') + '#inner-Typedef1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected Typedef2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private Typedef3');
      });
    });
  });

  it('has event summary.', ()=>{
    find(doc, '[data-ice="eventSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public Event1: Object this is Event1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1.html') + '#inner-Event1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected Event2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private Event3');
      });
    });
  });

  it('has constant summary.', ()=>{
    find(doc, '[data-ice="constSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public CONSTANT1: number this is CONSTANT1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1.html') + '#inner-CONSTANT1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected CONSTANT2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private CONSTANT3');
      });
    });
  });

  it('has enum summary.', ()=>{
    find(doc, '[data-ice="enumSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public Enum1: Object this is Enum1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1.html') + '#inner-Enum1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected Enum2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private Enum3');
      });
    });
  });

  it('has callback summary.', ()=>{
    find(doc, '[data-ice="callbackSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public Callback1 this is Callback1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1.html') + '#inner-Callback1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected Callback2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private Callback3');
      });
    });
  });

  it('has member detail.', ()=>{
    find(doc, '[data-ice="memberDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#inner-member1', 'public member1: Object');
        assert.includes(doc, '[data-ice="description"]', 'this is member1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#inner-member2', 'protected member2: number');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#inner-member3', 'private member3: number');
      });
    })
  });

  it('has method detail.', ()=>{
    find(doc, '[data-ice="methodDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#inner-method1', 'public method1');
        assert.includes(doc, '[data-ice="description"]', 'this is method1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#inner-method2', 'protected method2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#inner-method3', 'private method3');
      });
    })
  });

  it('has method detail.', ()=>{
    find(doc, '[data-ice="methodDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#inner-method1', 'public method1');
        assert.includes(doc, '[data-ice="description"]', 'this is method1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#inner-method2', 'protected method2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#inner-method3', 'private method3');
      });
    })
  });

  it('has typedef detail.', ()=>{
    find(doc, '[data-ice="typedefDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#inner-Typedef1', 'public Typedef1: Object');
        assert.includes(doc, '[data-ice="description"]', 'this is Typedef1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#inner-Typedef2', 'protected Typedef2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#inner-Typedef3', 'private Typedef3');
      });
    })
  });

  it('has event detail.', ()=>{
    find(doc, '[data-ice="eventDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#inner-Event1', 'public Event1: Object');
        assert.includes(doc, '[data-ice="description"]', 'this is Event1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#inner-Event2', 'protected Event2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#inner-Event3', 'private Event3');
      });
    })
  });

  it('has constant detail.', ()=>{
    find(doc, '[data-ice="constDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#inner-CONSTANT1', 'public CONSTANT1: number');
        assert.includes(doc, '[data-ice="description"]', 'this is CONSTANT1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#inner-CONSTANT2', 'protected CONSTANT2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#inner-CONSTANT3', 'private CONSTANT3');
      });
    })
  });

  it('has enum detail.', ()=>{
    find(doc, '[data-ice="enumDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#inner-Enum1', 'public Enum1: Object');
        assert.includes(doc, '[data-ice="description"]', 'this is Enum1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#inner-Enum2', 'protected Enum2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#inner-Enum3', 'private Enum3');
      });
    })
  });

  it('has callback detail.', ()=>{
    find(doc, '[data-ice="callbackDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#inner-Callback1', 'public Callback1');
        assert.includes(doc, '[data-ice="description"]', 'this is Callback1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#inner-Callback2', 'protected Callback2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#inner-Callback3', 'private Callback3');
      });
    })
  });
});
