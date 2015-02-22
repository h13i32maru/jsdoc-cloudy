import {readDoc, assert, find} from './util.js';

describe('Namespace1.Class1: ', ()=>{

  let doc = readDoc('Namespace1.Class1.html');

  describe('basic information', ()=>{
    it('has basic information.', ()=>{
      assert.includes(doc, '[data-s="nameSpace"]', 'Namespace1');
      assert.includes(doc, '[data-s="nameSpace"] a', 'Namespace1.html', 'href');

      assert.includes(doc, '[data-s="extendsClassName"]', 'Class0');
      assert.includes(doc, '[data-s="extendsClassName"]', 'Namespace1.Class0.html', 'href');

      assert.includes(doc, '[data-s="implementsClassName"]', 'Interface1');
      assert.includes(doc, '[data-s="implementsClassName"] a', 'Namespace1.Interface1.html', 'href');

      assert.includes(doc, 'h1 [data-s="className"]', 'Class1');
      assert.includes(doc, '[data-s="classDesc"]', 'this is Class1 classdesc.');
      assert.includes(doc, '[data-s="fileexampleCode"]', "var foo = Class1;");
    });
  });

  describe('static member summary: ', ()=>{
    it('has public', ()=>{
      find(doc, '[data-s="summaryStaticPublicMemberDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'staticMember1: string');
        assert.includes(doc, '', 'this is Class1.staticMember1 desc.');
        assert.includes(doc, 'a', '#static-staticMember1', 'href');
      });

      find(doc, '[data-s="summaryStaticPublicMemberDocs"] tr[data-s="target"]:nth-child(2)', (doc)=>{
        assert.includes(doc, '', 'staticMember2: string');
      });
    });

    it('has protected', ()=>{
      find(doc, '[data-s="summaryStaticProtectedMemberDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'staticMember3: string');
      });
    });

    it('has private', ()=>{
      find(doc, '[data-s="summaryStaticPrivateMemberDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'staticMember4: string');
      });
    });
  });

  describe('static method summary: ', ()=>{
    it('has public', ()=>{
      find(doc, '[data-s="summaryStaticPublicMethodDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'staticMethod1(p1: boolean, p2: Object): Array.<string>');
        assert.includes(doc, '', 'this is Class1.staticMethod1 desc.');
        assert.includes(doc, 'a', '#static-staticMethod1', 'href');
      });

      find(doc, '[data-s="summaryStaticPublicMethodDocs"] tr[data-s="target"]:nth-child(2)', (doc)=>{
        assert.includes(doc, '', 'staticMethod2()');
      });

      find(doc, '[data-s="summaryStaticPublicMethodDocs"] tr[data-s="target"]:nth-child(3)', (doc)=>{
        assert.includes(doc, '', 'override staticMethod5()');
      });
    });

    it('has protected', ()=>{
      find(doc, '[data-s="summaryStaticProtectedMethodDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'staticMethod3()');
      });
    });

    it('has private', ()=>{
      find(doc, '[data-s="summaryStaticPrivateMethodDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'staticMethod4()');
      });
    });
  });

  describe('constructor summary: ',()=>{
    it('has constructor', ()=>{
      find(doc, '[data-s="summaryConstructorDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'Class1(p1: string, p2: number)');
        assert.includes(doc, '', 'this is Class1 desc.');
        assert.includes(doc, 'a', '#static-Class1', 'href');
      });
    });
  });

  describe('member summary: ',()=>{
    it('has public', ()=>{
      find(doc, '[data-s="summaryPublicMemberDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'member1: string');
        assert.includes(doc, '', 'this is Class1#member1 desc.');
        assert.includes(doc, 'a', '#instance-member1', 'href');
      });

      find(doc, '[data-s="summaryPublicMemberDocs"] tr[data-s="target"]:nth-child(2)', (doc)=>{
        assert.includes(doc, '', 'member2: number');
      });

      find(doc, '[data-s="summaryPublicMemberDocs"] tr[data-s="target"]:nth-child(3)', (doc)=>{
        assert.includes(doc, '[data-s="name"]', 'true', 'data-deprecated');
      });

      find(doc, '[data-s="summaryPublicMemberDocs"] tr[data-s="target"]:nth-child(4)', (doc)=>{
        assert.includes(doc, '', 'readonly member6: string');
      });

      find(doc, '[data-s="summaryPublicMemberDocs"] tr[data-s="target"]:nth-child(5)', (doc)=>{
        assert.includes(doc, '', 'member7: string since 1.2.3');
      });

      find(doc, '[data-s="summaryPublicMemberDocs"] tr[data-s="target"]:nth-child(6)', (doc)=>{
        assert.includes(doc, '[data-s="signature"] a', 'https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest', 'href');
      });
    });

    it('has protected', ()=>{
      find(doc, '[data-s="summaryProtectedMemberDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'member3: number');
      });
    });

    it('has private', ()=>{
      find(doc, '[data-s="summaryPrivateMemberDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'member4: number');
      });
    })
  });

  describe('method summary: ', ()=>{
    it('has public', ()=>{
      find(doc, '[data-s="summaryPublicMethodDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'method1(p1: boolean, p2: Object)');
        assert.includes(doc, '', 'this is Class1#method1 desc.');
        assert.includes(doc, 'a', '#instance-method1', 'href');
      });

      find(doc, '[data-s="summaryPublicMethodDocs"] tr[data-s="target"]:nth-child(2)', (doc)=>{
        assert.includes(doc, '', 'method2(p1: boolean): Array.<Object.<string, number>>');
        assert.includes(doc, '', 'this is Class1#method2 desc.');
        assert.includes(doc, 'a', '#instance-method2', 'href');
      });

      find(doc, '[data-s="summaryPublicMethodDocs"] tr[data-s="target"]:nth-child(9)', (doc)=>{
        assert.includes(doc, '', 'virtual method9()');
      });

      find(doc, '[data-s="summaryPublicMethodDocs"] tr[data-s="target"]:nth-child(10)', (doc)=>{
        assert.includes(doc, '', 'method10()');
      });

      find(doc, '[data-s="summaryPublicMethodDocs"] tr[data-s="target"]:nth-child(11)', (doc)=>{
        assert.includes(doc, '', 'override method13()');
      });

      find(doc, '[data-s="summaryPublicMethodDocs"] tr[data-s="target"]:nth-child(12)', (doc)=>{
        assert.includes(doc, '[data-s="name"]', 'true', 'data-deprecated');
      });

      find(doc, '[data-s="summaryPublicMethodDocs"] tr[data-s="target"]:nth-child(13)', (doc)=>{
        assert.includes(doc, '', 'method15() since 1.2.3');
      });
    });

    it('has protected', ()=>{
      find(doc, '[data-s="summaryProtectedMethodDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'method11()');
      });
    });

    it('has private', ()=>{
      find(doc, '[data-s="summaryPrivateMethodDocs"] tr[data-s="target"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '', 'method12()');
      });
    });
  });

  describe('static member detail: ', ()=>{
    it('has public.', ()=>{
      find(doc, '[data-s="staticPublicMembers"] [data-s="member"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#static-staticMember1', 'staticMember1: string');
        assert.includes(doc, '[data-s="description"]', 'this is Class1.staticMember1 desc. after 2nd line are more information.');
        assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is Class1.staticMember1 example';");
      });

      find(doc, '[data-s="staticPublicMembers"] [data-s="member"]:nth-child(2)', (doc)=>{
        assert.includes(doc, '#static-staticMember2', 'staticMember2: string');
      });
    });

    it('has protected', ()=>{
      find(doc, '[data-s="staticProtectedMembers"] [data-s="member"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#static-staticMember3', 'staticMember3: string');
      });
    });

    it('has private', ()=>{
      find(doc, '[data-s="staticPrivateMembers"] [data-s="member"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#static-staticMember4', 'staticMember4: string');
      });
    });
  });

  describe('static method detail: ', ()=>{
    it('has public', ()=>{
      find(doc, '[data-s="staticPublicMethods"] [data-s="method"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#static-staticMethod1', 'staticMethod1(p1: boolean, p2: Object): Array.<string>');
        assert.includes(doc, '[data-s="description"]', 'this is Class1.staticMethod1 desc. after 2nd line are more information.');
        assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 boolean p1 is Class1.staticMethod1 1st param.');
        assert.includes(doc, 'tr[data-s="param"]:nth-child(2)', 'p2 Object p2 is Class1.staticMethod1 2nd param.');
        assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is Class1.staticMethod1 example';");
        assert.includes(doc, '[data-s="returnParams"] [data-s="returnType"]', 'Array.<string>');
        assert.includes(doc, '[data-s="returnParams"] [data-s="returnDescription"]', 'Class1.staticMethod1 returns string array.');
      });

      find(doc, '[data-s="staticPublicMethods"] [data-s="method"]:nth-child(2)', (doc)=>{
        assert.includes(doc, '#static-staticMethod2', 'staticMethod2()');
      });

      find(doc, '[data-s="staticPublicMethods"] [data-s="method"]:nth-child(3)', (doc)=>{
        assert.includes(doc, '#static-staticMethod5', 'override staticMethod5()');
      });
    });

    it('has protected', ()=>{
      find(doc, '[data-s="staticProtectedMethods"] [data-s="method"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#static-staticMethod3', 'staticMethod3()');
      });
    });

    it('has private', ()=>{
      find(doc, '[data-s="staticPrivateMethods"] [data-s="method"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#static-staticMethod4', 'staticMethod4()');
      });
    });
  });

  describe('constructor detail:', ()=>{
    it('has constructor', ()=>{
      find(doc, '[data-s="constructor"]', (doc)=>{
        assert.includes(doc, '#static-Class1', 'Class1(p1: string, p2: number)');
        assert.includes(doc, '[data-s="description"]', 'this is Class1 desc. after 2nd line are more information.');
        assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 string p1 is Class1 1st param.');
        assert.includes(doc, 'tr[data-s="param"]:nth-child(2)', 'p2 number p2 is Class1 2nd param.');
        assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is Class1 example';");
      });
    });
  });

  describe('member detail:', ()=>{
    it('has public', ()=>{
      find(doc, '[data-s="publicMembers"] [data-s="member"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#instance-member1', 'member1: string');
        assert.includes(doc, '[data-s="description"]', 'this is Class1#member1 desc. after 2nd line are more information.');
        assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is Class1#member1 example';");
      });

      find(doc, '[data-s="publicMembers"] [data-s="member"]:nth-child(2)', (doc)=>{
        assert.includes(doc, '#instance-member2', 'member2: number');
      });

      find(doc, '[data-s="publicMembers"] [data-s="member"]:nth-child(3)', (doc)=>{
        assert.includes(doc, '[data-s="name"]', 'true', 'data-deprecated');
      });

      find(doc, '[data-s="publicMembers"] [data-s="member"]:nth-child(4)', (doc)=>{
        assert.includes(doc, '#instance-member6', 'readonly member6: string');
      });

      find(doc, '[data-s="publicMembers"] [data-s="member"]:nth-child(5)', (doc)=>{
        assert.includes(doc, '#instance-member7', 'member7: string since 1.2.3');
      });

      find(doc, '[data-s="publicMembers"] [data-s="member"]:nth-child(6)', (doc)=>{
        assert.includes(doc, '[data-s="signature"] a', 'https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest', 'href');
      });
    });

    it('has protected', ()=>{
      find(doc, '[data-s="protectedMembers"] [data-s="member"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#instance-member3', 'member3: number');
      });
    });

    it('has private', ()=>{
      find(doc, '[data-s="privateMembers"] [data-s="member"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#instance-member4', 'member4: number');
      });
    });
  });

  describe('method detail:', ()=>{
    it('has public', ()=>{
      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#instance-method1', 'method1(p1: boolean, p2: Object)');
        assert.includes(doc, '[data-s="description"]', 'this is Class1#method1 desc. after 2nd line are more information.');
        assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 boolean p1 is Class1#method1 1st param.');
        assert.includes(doc, 'tr[data-s="param"]:nth-child(2)', 'p2 Object p2 is Class1#method1 2nd param.');
        assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is Class1#method1 example';");
        assert.includes(doc, '[data-s="returnParams"] [data-s="returnType"]', 'Array.<string>');
        assert.includes(doc, '[data-s="returnParams"] [data-s="returnDescription"]', 'Class1#method1 returns string array.');
      });

      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(10)', (doc)=>{
        assert.includes(doc, '#instance-method10', 'method10()');
      });

      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(11)', (doc)=>{
        assert.includes(doc, '#instance-method13', 'override method13()');
      });

      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(12)', (doc)=>{
        assert.includes(doc, '#instance-method14 [data-s="name"]', 'true', 'data-deprecated');
      });

      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(13)', (doc)=>{
        assert.includes(doc, '#instance-method15', 'method15() since 1.2.3');
      });

      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(14)', (doc)=>{
        assert.includes(doc, '[data-s="throw"]:nth-child(1)', 'Throw: Error this is throws desc.');
        assert.includes(doc, '[data-s="throw"]:nth-child(2)', 'Throw: InvalidArgumentException this is throws desc.');
      });
    });

    it('has protected', ()=>{
      find(doc, '[data-s="protectedMethods"] [data-s="method"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#instance-method11', 'method11()');
      });
    });

    it('has private', ()=>{
      find(doc, '[data-s="privateMethods"] [data-s="method"]:nth-child(1)', (doc)=>{
        assert.includes(doc, '#instance-method12', 'method12()');
      });
    });

    it('has complex param method', ()=>{
      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(3)', (doc)=>{
        assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 Object');
        assert.includes(doc, 'tr[data-s="param"]:nth-child(2)', 'p1.p2 string this is p1.p2 desc.');
        assert.includes(doc, 'tr[data-s="param"]:nth-child(3)', 'p1.p3 Object');
        assert.includes(doc, 'tr[data-s="param"]:nth-child(4)', 'p1.p3.p4 number this is p1.p3.p4 desc.');
      });
    });

    it('has optional param method', ()=>{
      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(4)', (doc)=>{
        assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 string optional this is p1 desc.');
      });
    });

    it('has default param method', ()=>{
      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(5)', (doc)=>{
        assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 number optional default: 123 this is p1 desc.');
      });
    });

    it('has nullable param method', ()=>{
      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(6)', (doc)=>{
        assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 number nullable: true this is p1 desc.');
        assert.includes(doc, '[data-s="returnParams"] [data-s="returnType"]', 'string (nullable: true)');
      });
    });

    it('has non-nullable param method', ()=>{
      find(doc, '[data-s="publicMethods"] [data-s="method"]:nth-child(7)', (doc)=>{
        assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 number nullable: false this is p1 desc.');
        assert.includes(doc, '[data-s="returnParams"] [data-s="returnType"]', 'string (nullable: false)');
      });
    });

    it('has variable number param method');
  });
});
