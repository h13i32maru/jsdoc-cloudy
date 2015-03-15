import {readDoc, assert, find} from './util.js';

describe('module/module1~Class1: ', ()=> {
  let doc = readDoc('module:module|module1~Class1.html');
  let encode = encodeURIComponent;

  it('has header notice.', ()=>{
    find(doc, '[data-ice="content"] .header-notice', (doc)=>{
      assert.includes(doc, '[data-ice="memberof"]', 'module/module1');
      assert.includes(doc, '[data-ice="memberof"] a', encode('module:module|module1.html'), 'href');
      assert.includes(doc, '[data-ice="access"]', 'public');
      assert.includes(doc, '[data-ice="kind"]', 'class');

    });
  });

  it('has self detail.', ()=>{
    find(doc, '[data-ice="content"] .self-detail', (doc)=>{
      assert.includes(doc, '[data-ice="name"]', 'Class1');

      assert.includes(doc, '[data-ice="extendsChain"]', 'XMLHttpRequest → Class3 → Class2 → Class1');
      assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(1) a', 'https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest', 'href');
      assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(2) a', encode('module:module|module1~Class3.html'), 'href');
      assert.includes(doc, '[data-ice="extendsChain"] span:nth-of-type(3) a', encode('module:module|module1~Class2.html'), 'href');

      assert.includes(doc, '[data-ice="implements"]', 'Interface1, XMLHttpRequest');
      assert.includes(doc, '[data-ice="implements"] li:nth-of-type(1) a', encode('module:module|module1~Interface1.html'), 'href');
      assert.includes(doc, '[data-ice="implements"] li:nth-of-type(2) a', 'https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest', 'href');

      assert.includes(doc, '[data-ice="indirectImplements"]', 'Interface2, Interface3');
      assert.includes(doc, '[data-ice="indirectImplements"] li:nth-of-type(1) a', encode('module:module|module1~Interface2.html'), 'href');
      assert.includes(doc, '[data-ice="indirectImplements"] li:nth-of-type(2) a', encode('module:module|module1~Interface3.html'), 'href');

      assert.includes(doc, '[data-ice="mixes"]', 'Mixin1, XMLHttpRequest');
      assert.includes(doc, '[data-ice="mixes"] li:nth-of-type(1) a', encode('module:module|module1~Mixin1.html'), 'href');
      assert.includes(doc, '[data-ice="mixes"] li:nth-of-type(2) a', 'https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest', 'href');

      assert.includes(doc, '[data-ice="indirectMixes"]', 'Mixin2, Mixin3');
      assert.includes(doc, '[data-ice="indirectMixes"] li:nth-of-type(1) a', encode('module:module|module1~Mixin2.html'), 'href');
      assert.includes(doc, '[data-ice="indirectMixes"] li:nth-of-type(2) a', encode('module:module|module1~Mixin3.html'), 'href');

      assert.includes(doc, '[data-ice="description"]', 'this is Class1 classdesc.');
    });
  });

  it('has static member summary.', ()=>{
    find(doc, '[data-ice="staticMemberSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public staticMember1: number this is staticMember1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Class1.html') + '#static-staticMember1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected staticMember2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private staticMember3');
      });
    });
  });

  it('has static method summary.', ()=>{
    find(doc, '[data-ice="staticMethodSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public staticMethod1 this is staticMethod1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Class1.html') + '#static-staticMethod1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected staticMethod2');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private staticMethod3');
      });
    });
  });

  it('has constructor summary.', ()=>{
    find(doc, '[data-ice="constructorSummary"]', (doc)=>{
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public Class1(p1: string | number, p2: string | number, p3: Object) this is Class1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Class1.html') + '#inner-Class1', 'href');
      });
    });
  });

  it('has member summary.', ()=>{
    find(doc, '[data-ice="memberSummary"]', (doc)=>{
      // public
      find(doc, 'table[data-ice="summary"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public readonly member1: Object this is member1 desc.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Class1.html') + '#instance-member1', 'href');
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
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public virtual method1(p1: string | number, p2: string | number, p3: Object): Object');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this method was deprecated. this is method1 deprecated.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this method is experimental. this is method1 experimental.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'this is method1 summary.');
        assert.notIncludes(doc, '[data-ice="target"]:nth-of-type(1)', 'this is second line.');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'version 0.0.1 since 1.2.3');
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Class1.html') + '#instance-method1', 'href');
      });
      // protected
      find(doc, 'table[data-ice="summary"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'protected method2 this is method2 desc.');
        assert.notIncludes(doc, '[data-ice="target"]:nth-of-type(1)', 'this is second line.');
      });
      // private
      find(doc, 'table[data-ice="summary"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'private method3 this is method3 desc.');
        assert.notIncludes(doc, '[data-ice="target"]:nth-of-type(1)', 'this is second line.');
      });
    });
  });

  it('has inherited summary.', ()=>{
    find(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(1)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public staticMemberY1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Class3.html') + '#static-staticMemberY1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'protected staticMemberY2');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2) a', encode('module:module|module1~Class3.html') + '#static-staticMemberY2', 'href');
    });

    find(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(2)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public staticMethodX1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3) a', encode('module:module|module1~Class2.html') + '#static-staticMethodX1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'protected staticMethodX2');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4) a', encode('module:module|module1~Class2.html') + '#static-staticMethodX2', 'href');
    });

    find(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(3)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public memberXX1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Interface1.html') + '#instance-memberXX1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'protected memberXX2');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2) a', encode('module:module|module1~Interface1.html') + '#instance-memberXX2', 'href');
    });

    find(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(4)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public methodYY1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3) a', encode('module:module|module1~Interface2.html') + '#instance-methodYY1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'protected methodYY2');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4) a', encode('module:module|module1~Interface2.html') + '#instance-methodYY2', 'href');
    });

    find(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(6)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1)', 'public memberXXX1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(1) a', encode('module:module|module1~Mixin1.html') + '#static-memberXXX1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(2)', 'protected memberXXX2');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(2) a', encode('module:module|module1~Mixin1.html') + '#static-memberXXX2', 'href');
    });

    find(doc, '[data-ice="inheritedSummary"] [data-ice="summary"]:nth-of-type(7)', (doc)=>{
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3)', 'public methodYYY1');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(3) a', encode('module:module|module1~Mixin2.html') + '#static-methodYYY1', 'href');

      assert.includes(doc, '[data-ice="target"]:nth-of-type(4)', 'protected methodYYY2');
      assert.includes(doc, '[data-ice="target"]:nth-of-type(4) a', encode('module:module|module1~Mixin2.html') + '#static-methodYYY2', 'href');
    });
  });

  it('has static member detail.', ()=>{
    find(doc, '[data-ice="staticMemberDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#static-staticMember1', 'public staticMember1: number');
        assert.includes(doc, '[data-ice="description"]', 'this is staticMember1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#static-staticMember2', 'protected staticMember2: number');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#static-staticMember3', 'private staticMember3: number');
      });
    })
  });

  it('has static method detail.', ()=>{
    find(doc, '[data-ice="staticMethodDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#static-staticMethod1', 'public staticMethod1');
        assert.includes(doc, '[data-ice="description"]', 'this is staticMethod1 desc.');
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#static-staticMethod2', 'protected staticMethod2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#static-staticMethod3', 'private staticMethod3');
      });
    })
  });

  it('has constructor detail.', ()=>{
    find(doc, '[data-ice="constructorDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#inner-Class1', 'public Class1(p1: string | number, p2: string | number, p3: Object)');
        assert.includes(doc, '#inner-Class1 + [data-ice="description"]', 'this is Class1 desc.');

        find(doc, '#inner-Class1 ~ [data-ice="properties"]', (doc)=>{
          assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 string | number optional default: 10 nullable: true this is p1 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 string | number optional default: 10 nullable: false this is p2 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(3)', 'p3 Object this is p3 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(4)', 'p3.p4 Array.<string> this is p4 desc.');
        });
      });
    })
  });

  it('has member detail.', ()=>{
    find(doc, '[data-ice="memberDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#instance-member1', 'public readonly member1: Object');
        assert.includes(doc, '#instance-member1 + [data-ice="description"]', 'this is member1 desc.');
        assert.includes(doc, '[data-ice="defaultvalue"]', '{p1: 10, p2: 10, p3: {p4: ["A", "B"]}');

        find(doc, '#instance-member1 ~ [data-ice="properties"]', (doc)=>{
          assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 string | number optional default: 10 nullable: true this is p1 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 string | number optional default: 10 nullable: false this is p2 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(3)', 'p3 Object this is p3 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(4)', 'p3.p4 Array.<string> this is p4 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(5)', 'p3.p5 Class1 this is desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(6)', 'p3.p6 member1 this is desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(7)', 'p3.p6 member1 this is desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(8)', 'p3.p7 staticMember1 this is desc.');

          assert.includes(doc, '[data-ice="property"]:nth-of-type(5) a', encode('module:module|module1~Class1.html'), 'href');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(6) a', encode('module:module|module1.html') + '#inner-member1', 'href');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(7) a', encode('module:module|module1~Class1.html') + '#instance-member1', 'href');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(8) a', encode('module:module|module1~Class1.html') + '#static-staticMember1', 'href');
        });
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#instance-member2', 'protected member2: number');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#instance-member3', 'private member3: number');
      });
    })
  });

  it('has method detail.', ()=>{
    find(doc, '[data-ice="methodDetails"]', (doc)=>{
      // public
      find(doc, '[data-ice="detail"]:nth-of-type(1)', (doc)=>{
        assert.includes(doc, '#instance-method1', 'public virtual method1(p1: string | number, p2: string | number, p3: Object): Object');
        assert.includes(doc, '#instance-method1', 'version 0.0.1 since 1.2.3');
        assert.includes(doc, '[data-ice="deprecated"]', 'this method was deprecated. this is method1 deprecated.');
        assert.includes(doc, '[data-ice="experimental"]', 'this method is experimental. this is method1 experimental.');
        assert.includes(doc, '#instance-method1 ~ [data-ice="description"]', 'this is method1 desc.');

        find(doc, '#instance-method1 ~ [data-ice="properties"]', (doc)=>{
          assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 string | number optional default: 10 nullable: true this is p1 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 string | number optional default: 10 nullable: false this is p2 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(3)', 'p3 Object this is p3 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(4)', 'p3.p4 Array.<string> this is p4 desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(5)', 'p3.p5 Class1 this is desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(6)', 'p3.p6 member1 this is desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(7)', 'p3.p6 member1 this is desc.');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(8)', 'p3.p7 staticMember1 this is desc.');

          assert.includes(doc, '[data-ice="property"]:nth-of-type(5) a', encode('module:module|module1~Class1.html'), 'href');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(6) a', encode('module:module|module1.html') + '#inner-member1', 'href');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(7) a', encode('module:module|module1~Class1.html') + '#instance-member1', 'href');
          assert.includes(doc, '[data-ice="property"]:nth-of-type(8) a', encode('module:module|module1~Class1.html') + '#static-staticMember1', 'href');
        });

        find(doc, '[data-ice="returnParams"]', (doc)=>{
          assert.includes(doc, '[data-ice="returnType"]', 'Object');
          assert.includes(doc, '[data-ice="returnDescription"]', 'this is return desc.');

          find(doc, '[data-ice="returnProperties"]', (doc)=>{
            assert.includes(doc, '[data-ice="property"]:nth-of-type(1)', 'p1 string | number optional default: 10 nullable: true this is p1 desc.');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(2)', 'p2 string | number optional default: 10 nullable: false this is p2 desc.');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(3)', 'p3 Object this is p3 desc.');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(4)', 'p3.p4 Array.<string> this is p4 desc.');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(5)', 'p3.p5 Class1 this is desc.');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(6)', 'p3.p6 member1 this is desc.');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(7)', 'p3.p6 member1 this is desc.');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(8)', 'p3.p7 staticMember1 this is desc.');

            assert.includes(doc, '[data-ice="property"]:nth-of-type(5) a', encode('module:module|module1~Class1.html'), 'href');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(6) a', encode('module:module|module1.html') + '#inner-member1', 'href');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(7) a', encode('module:module|module1~Class1.html') + '#instance-member1', 'href');
            assert.includes(doc, '[data-ice="property"]:nth-of-type(8) a', encode('module:module|module1~Class1.html') + '#static-staticMember1', 'href');
          });
        });

        assert.includes(doc, '[data-ice="this"]', 'Class1');
        assert.includes(doc, '[data-ice="this"] a', encode('module:module|module1~Class1.html'), 'href');

        assert.includes(doc, '[data-ice="fire"]', 'Event1 Event2');
        assert.includes(doc, '[data-ice="fire"] li:nth-of-type(1) a', encode('module:module|module1.html') + '#inner-Event1', 'href');
        assert.includes(doc, '[data-ice="fire"] li:nth-of-type(2) a', encode('module:module|module1.html') + '#inner-Event2', 'href');

        assert.includes(doc, '[data-ice="listen"]', 'Event1 Event2');
        assert.includes(doc, '[data-ice="listen"] li:nth-of-type(1) a', encode('module:module|module1.html') + '#inner-Event1', 'href');
        assert.includes(doc, '[data-ice="listen"] li:nth-of-type(2) a', encode('module:module|module1.html') + '#inner-Event2', 'href');

        assert.includes(doc, '[data-ice="throw"]:nth-of-type(1)', 'Error this is throws Error desc.');
        assert.includes(doc, '[data-ice="throw"]:nth-of-type(2)', 'Class1 this is throws Class1 desc.');
        assert.includes(doc, '[data-ice="throw"]:nth-of-type(3)', 'ReferenceError this is throws ReferenceError desc.');

        assert.includes(doc, '[data-ice="throw"]:nth-of-type(2) a', encode('module:module|module1~Class1.html'), 'href');
        assert.includes(doc, '[data-ice="throw"]:nth-of-type(3) a', 'https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError', 'href');

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

        find(doc, '[data-ice="author"] ul', (doc)=>{
          assert.includes(doc, 'li:nth-of-type(1)', 'foo');
          assert.includes(doc, 'li:nth-of-type(2)', 'bar');

          assert.includes(doc, 'li:nth-of-type(1) a', 'mailto:foo@example.com', 'href');
          assert.includes(doc, 'li:nth-of-type(2) a', 'http://twitter.com/bar', 'href');
        });

        find(doc, '[data-ice="todo"] ul', (doc)=>{
          assert.includes(doc, 'li:nth-of-type(1)', 'this is method1 1st todo.');
          assert.includes(doc, 'li:nth-of-type(2)', 'this is method1 2nd todo.');
        });
      });
      // protected
      find(doc, '[data-ice="detail"]:nth-of-type(2)', (doc)=>{
        assert.includes(doc, '#instance-method2', 'protected method2');
      });
      // private
      find(doc, '[data-ice="detail"]:nth-of-type(3)', (doc)=>{
        assert.includes(doc, '#instance-method3', 'private method3');
      });
    })
  });
});
