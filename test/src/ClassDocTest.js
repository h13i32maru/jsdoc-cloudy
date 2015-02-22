import {readDoc, assert, find} from './util.js';

describe('ClassDoc: SampleNamespace1.SampleClass1: ', ()=>{

  let doc = readDoc('SampleNamespace1.SampleClass1.html');

  it('has basic information.', ()=>{
    assert.includes(doc, '[data-s="nameSpace"]', 'SampleNamespace1');
    assert.includes(doc, 'h1[data-s="className"]', 'SampleClass1');
    assert.includes(doc, '[data-s="classDesc"]', 'this is SampleClass1 classdesc.');
    assert.includes(doc, '[data-s="fileexampleCode"]', "var foo = 'this is SampleClass1 fileexample';");
  });

  it('has summary of static members', ()=>{
    find(doc, '[data-s="summaryStaticMembers"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'staticMember1: string');
      assert.includes(doc, '', 'this is SampleClass1.staticMember1 desc.');
      assert.includes(doc, 'a', '#static-staticMember1', 'href');
    });
  });

  it('has summary of static methods', ()=>{
    find(doc, '[data-s="summaryStaticMethods"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'staticMethod1(p1: boolean, p2: Object): Array.<string>');
      assert.includes(doc, '', 'this is SampleClass1.staticMethod1 desc.');
      assert.includes(doc, 'a', '#static-staticMethod1', 'href');
    });
  });

  it('has summary of constructor', ()=>{
    find(doc, '[data-s="summaryConstructor"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'SampleClass1(p1: string, p2: number)');
      assert.includes(doc, '', 'this is SampleClass1 desc.');
      assert.includes(doc, 'a', '#static-SampleClass1', 'href');
    });
  });

  it('has summary of members', ()=>{
    find(doc, '[data-s="summaryMembers"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'member1: string');
      assert.includes(doc, '', 'this is SampleClass1#member1 desc.');
      assert.includes(doc, 'a', '#instance-member1', 'href');
    });
  });

  it('has summary of methods', ()=>{
    find(doc, '[data-s="summaryMethods"] tr[data-s="target"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '', 'method1(p1: boolean, p2: Object)');
      assert.includes(doc, '', 'this is SampleClass1#method1 desc.');
      assert.includes(doc, 'a', '#instance-method1', 'href');
    });
  });

  it('has detail of static members', ()=>{
    find(doc, '[data-s="staticMembers"] [data-s="member"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '#static-staticMember1', 'staticMember1: string');
      assert.includes(doc, '[data-s="description"]', 'this is SampleClass1.staticMember1 desc. after 2nd line are more information.');
      assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is SampleClass1.staticMember1 example';");
    });
  });

  it('has detail of static methods', ()=>{
    find(doc, '[data-s="staticMethods"] [data-s="method"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '#static-staticMethod1', 'staticMethod1(p1: boolean, p2: Object): Array.<string>');
      assert.includes(doc, '[data-s="description"]', 'this is SampleClass1.staticMethod1 desc. after 2nd line are more information.');
      assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 boolean p1 is SampleClass1.staticMethod1 1st param.');
      assert.includes(doc, 'tr[data-s="param"]:nth-child(2)', 'p2 Object p2 is SampleClass1.staticMethod1 2nd param.');
      assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is SampleClass1.staticMethod1 example';");
      assert.includes(doc, '[data-s="returnParams"] [data-s="returnType"]', 'Array.<string>');
      assert.includes(doc, '[data-s="returnParams"] [data-s="returnDescription"]', 'SampleClass1.staticMethod1 returns string array.');
    });
  });

  it('has detail of constructor', ()=>{
    find(doc, '[data-s="constructor"]', (doc)=>{
      assert.includes(doc, '#static-SampleClass1', 'SampleClass1(p1: string, p2: number)');
      assert.includes(doc, '[data-s="description"]', 'this is SampleClass1 desc. after 2nd line are more information.');
      assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 string p1 is SampleClass1 1st param.');
      assert.includes(doc, 'tr[data-s="param"]:nth-child(2)', 'p2 number p2 is SampleClass1 2nd param.');
      assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is SampleClass1 example';");
    });
  });

  it('has detail of members', ()=>{
    find(doc, '[data-s="members"] [data-s="member"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '#instance-member1', 'member1: string');
      assert.includes(doc, '[data-s="description"]', 'this is SampleClass1#member1 desc. after 2nd line are more information.');
      assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is SampleClass1#member1 example';");
    });
  });

  it('has detail of methods', ()=>{
    find(doc, '[data-s="methods"] [data-s="method"]:nth-child(1)', (doc)=>{
      assert.includes(doc, '#instance-method1', 'method1(p1: boolean, p2: Object)');
      assert.includes(doc, '[data-s="description"]', 'this is SampleClass1#method1 desc. after 2nd line are more information.');
      assert.includes(doc, 'tr[data-s="param"]:nth-child(1)', 'p1 boolean p1 is SampleClass1#method1 1st param.');
      assert.includes(doc, 'tr[data-s="param"]:nth-child(2)', 'p2 Object p2 is SampleClass1#method1 2nd param.');
      assert.includes(doc, '[data-s="exampleDoc"]', "var foo = 'this is SampleClass1#method1 example';");
      assert.includes(doc, '[data-s="returnParams"] [data-s="returnType"]', 'Array.<string>');
      assert.includes(doc, '[data-s="returnParams"] [data-s="returnDescription"]', 'SampleClass1#method1 returns string array.');
    });
  });
});

describe('ClassDoc: SampleGlobalClass1: ', ()=> {
  let doc = readDoc('SampleGlobalClass1.html');

  it('has basic information.', ()=>{
    assert.includes(doc, '[data-s="nameSpace"]', '@global');
    assert.includes(doc, 'h1[data-s="className"]', 'SampleGlobalClass1');
    assert.includes(doc, '[data-s="classDesc"]', 'this is SampleGlobalClass1 classdesc.');
    assert.includes(doc, '[data-s="fileexampleCode"]', "var foo = 'this is SampleGlobalClass1 fileexample';");
  });
});
