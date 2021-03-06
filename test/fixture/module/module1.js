/**
 * @file this is module/module1.js desc.
 * this is second line.
 */

/**
 * this is module/module1 desc.
 * this is second line.
 * @module module/module1
 * @summary this is module/module1 summary.
 * @since 1.2.3
 * @version 0.0.1
 * @deprecated this is module/module1 deprecated.
 * @experimental this is module/module1 experimental.
 * @fileexample
 * var foo = module1;
 * console.log(foo);
 * @fileexample
 * var bar = module1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link module:module/module1}
 * @see {@link module:module/module1~Namespace1}
 * @see {@link module:module/module1~Class1}
 * @see {@link module:module/module1~Interface1}
 * @see {@link module:module/module1~Mixin1}
 * @see {@link module:module/module1~method1}
 * @see {@link module:module/module1~member1}
 * @see {@link module:module/module1~Typedef1}
 * @see {@link module:module/module1~Callback1}
 * @see {@link module:module/module1~CONSTANT1}
 * @see {@link module:module/module1~event:Event1}
 * @see {@link external:XMLHttpRequest}
 * @see {@link module/module1.js}
 * @see {@link module:module/module1~Class1#member1}
 * @see {@link module:module/module1~Class1#method1}
 * @see {@link module:module/module1~Class1.staticMember1}
 * @see {@link module:module/module1~Class1.staticMethod1}
 * @requires module:module/module1
 * @requires module:module/module1~Namespace1
 * @requires module:module/module1~Class1
 * @requires module:module/module1~Interface1
 * @requires module:module/module1~Mixin1
 * @requires module:module/module1~method1
 * @requires module:module/module1~member1
 * @requires module:module/module1~Typedef1
 * @requires module:module/module1~Callback1
 * @requires module:module/module1~CONSTANT1
 * @requires module:module/module1~event:Event1
 * @requires external:XMLHttpRequest
 * @requires module:module/module1~Class1#member1
 * @requires module:module/module1~Class1#method1
 * @requires module:module/module1~Class1.staticMember1
 * @requires module:module/module1~Class1.staticMethod1
 * @author foo <foo@example.com>
 * @author bar <http://twitter.com/bar>
 * @copyright this is module/module1 copyright
 * this is second line.
 * @license MIT
 * @todo this is module/module1 1st todo.
 * @todo this is module/module1 2nd todo.
 */

/**
 * this is Namespace1 desc.
 * @namespace
 */
var Namespace1;

/**
 * @namespace
 * @protected
 */
var Namespace2;

/**
 * @namespace
 * @private
 */
var Namespace3;

/**
 * this is Class1 desc.
 * @class
 * @mixes module:module/module1~Mixin1
 * @mixes external:XMLHttpRequest
 * @classdesc this is Class1 classdesc.
 * this is second line.
 * @extends module:module/module1~Class2
 * @extends external:XMLHttpRequest
 * @implements module:module/module1~Interface1
 * @implements external:XMLHttpRequest
 * @param {?(string|number)} [p1=10] this is p1 desc.
 * @param {!(string|number)} [p2=10] this is p2 desc.
 * @param {Object} p3 this is p3 desc.
 * @param {string[]} p3.p4 this is p4 desc.
 */
function Class1(p1, p2, p3){}

/**
 * this is method1 desc.
 * @summary this is method1 summary.
 * @since 1.2.3
 * @version 0.0.1
 * @deprecated this is method1 deprecated.
 * @experimental this is method1 experimental.
 * @see http://example.com
 * @see {@link module:module/module1}
 * @see {@link module:module/module1~Namespace1}
 * @see {@link module:module/module1~Class1}
 * @see {@link module:module/module1~Interface1}
 * @see {@link module:module/module1~Mixin1}
 * @see {@link module:module/module1~method1}
 * @see {@link module:module/module1~member1}
 * @see {@link module:module/module1~Typedef1}
 * @see {@link module:module/module1~Callback1}
 * @see {@link module:module/module1~CONSTANT1}
 * @see {@link module:module/module1~event:Event1}
 * @see {@link external:XMLHttpRequest}
 * @see {@link module/module1.js}
 * @see {@link module:module/module1~Class1#member1}
 * @see {@link module:module/module1~Class1#method1}
 * @see {@link module:module/module1~Class1.staticMember1}
 * @see {@link module:module/module1~Class1.staticMethod1}
 * @requires module:module/module1
 * @requires module:module/module1~Namespace1
 * @requires module:module/module1~Class1
 * @requires module:module/module1~Interface1
 * @requires module:module/module1~Mixin1
 * @requires module:module/module1~method1
 * @requires module:module/module1~member1
 * @requires module:module/module1~Typedef1
 * @requires module:module/module1~Callback1
 * @requires module:module/module1~CONSTANT1
 * @requires module:module/module1~event:Event1
 * @requires external:XMLHttpRequest
 * @requires module:module/module1~Class1#member1
 * @requires module:module/module1~Class1#method1
 * @requires module:module/module1~Class1.staticMember1
 * @requires module:module/module1~Class1.staticMethod1
 * @author foo <foo@example.com>
 * @author bar <http://twitter.com/bar>
 * @copyright this is method1 copyright
 * this is second line.
 * @license MIT
 * @todo this is method1 1st todo.
 * @todo this is method1 2nd todo.
 *
 * @param {?(string|number)} [p1=10] this is p1 desc.
 * @param {!(string|number)} [p2=10] this is p2 desc.
 * @param {Object} p3 this is p3 desc.
 * @param {string[]} p3.p4 this is p4 desc.
 * @param {module:module/module1~Class1} p3.p5 this is desc.
 * @param {module:module/module1~member1} p3.p6 this is desc.
 * @param {module:module/module1~Class1#member1} p3.p6 this is desc.
 * @param {module:module/module1~Class1.staticMember1} p3.p7 this is desc.
 *
 * @return {Object} this is return desc.
 * @property {?(string|number)} [p1=10] this is p1 desc.
 * @property {!(string|number)} [p2=10] this is p2 desc.
 * @property {Object} p3 this is p3 desc.
 * @property {string[]} p3.p4 this is p4 desc.
 * @property {module:module/module1~Class1} p3.p5 this is desc.
 * @property {module:module/module1~member1} p3.p6 this is desc.
 * @property {module:module/module1~Class1#member1} p3.p6 this is desc.
 * @property {module:module/module1~Class1.staticMember1} p3.p7 this is desc.
 *
 * @throws {Error} this is throws Error desc.
 * @throws {module:module/module1~Class1} this is throws Class1 desc.
 * @throws {external:ReferenceError} this is throws ReferenceError desc.
 *
 * @virtual
 *
 * @fires module:module/module1~event:Event1
 * @fires module:module/module1~event:Event2
 *
 * @listens module:module/module1~event:Event1
 * @listens module:module/module1~event:Event2
 *
 * @this module:module/module1~Class1
 */
Class1.prototype.method1 = function(p1, p2, p3){};

/**
 * this is method2 desc. this is second line.
 * @protected
 */
Class1.prototype.method2 = function(){};

/**
 * this is method3 desc.
 * this is second line.
 * @private
 */
Class1.prototype.method3 = function(){};

/**
 * this is member1 desc.
 * @type {Object}
 * @property {?(string|number)} [p1=10] this is p1 desc.
 * @property {!(string|number)} [p2=10] this is p2 desc.
 * @property {Object} p3 this is p3 desc.
 * @property {string[]} p3.p4 this is p4 desc.
 * @property {module:module/module1~Class1} p3.p5 this is desc.
 * @property {module:module/module1~member1} p3.p6 this is desc.
 * @property {module:module/module1~Class1#member1} p3.p6 this is desc.
 * @property {module:module/module1~Class1.staticMember1} p3.p7 this is desc.
 * @readonly
 * @default {p1: 10, p2: 10, p3: {p4: ["A", "B"]}
 */
Class1.prototype.member1 = null;

/**
 * @protected
 * @type {number}
 */
Class1.prototype.member2 = null;

/**
 * @private
 * @type {number}
 */
Class1.prototype.member3 = null;


/**
 * this is staticMethod1 desc.
 */
Class1.staticMethod1 = function(){};

/**
 * @protected
 */
Class1.staticMethod2 = function(){};

/**
 * @private
 */
Class1.staticMethod3 = function(){};

/**
 * this is staticMember1 desc.
 * @type {number}
 */
Class1.staticMember1 = null;

/**
 * @protected
 * @type {number}
 */
Class1.staticMember2 = null;

/**
 * @private
 * @type {number}
 */
Class1.staticMember3 = null;

/**
 * @class
 * @protected
 * @extends module:module/module1~Class3
 * @implements module:module/module1~Interface2
 * @mixes module:module/module1~Mixin2
 */
function Class2(){}
Class2.prototype.methodX1 = function(){};
/** @protected */
Class2.prototype.methodX2 = function(){};
Class2.prototype.memberX1 = 0;
/** @protected */
Class2.prototype.memberX2 = 0;
Class2.staticMethodX1 = function(){};
/** @protected */
Class2.staticMethodX2 = function(){};
Class2.staticMemberX1 = 0;
/** @protected */
Class2.staticMemberX2 = 0;


/**
 * @class
 * @private
 * @extends external:XMLHttpRequest
 * @implements module:module/module1~Interface3
 * @mixes module:module/module1~Mixin3
 */
function Class3(){}
Class3.prototype.methodY1 = function(){};
/** @protected */
Class3.prototype.methodY2 = function(){};
Class3.prototype.memberY1 = 1;
/** @protected */
Class3.prototype.memberY2 = 1;
Class3.staticMethodY1 = function(){};
/** @protected */
Class3.staticMethodY2 = function(){};
Class3.staticMemberY1 = 0;
/** @protected */
Class3.staticMemberY2 = 0;

/**
 * this is Interface1 desc.
 * @interface
 */
function Interface1(){}
Interface1.prototype.methodXX1 = function(){};
/** @protected */
Interface1.prototype.methodXX2 = function(){};
Interface1.prototype.memberXX1 = 1;
/** @protected */
Interface1.prototype.memberXX2 = 1;

/**
 * @interface
 * @protected
 */
function Interface2(){}
Interface2.prototype.methodYY1 = function(){};
/** @protected */
Interface2.prototype.methodYY2 = function(){};
Interface2.prototype.memberYY1 = 1;
/** @protected */
Interface2.prototype.memberYY2 = 1;

/**
 * @interface
 * @private
 */
function Interface3(){}
Interface3.prototype.methodZZ1 = function(){};
/** @protected */
Interface3.prototype.methodZZ2 = function(){};
Interface3.prototype.memberZZ1 = 1;
/** @protected */
Interface3.prototype.memberZZ2 = 1;

/**
 * this is Mixin1 desc.
 * @mixin
 */
var Mixin1;
Mixin1.methodXXX1 = function(){};
/** @protected */
Mixin1.methodXXX2 = function(){};
Mixin1.memberXXX1 = 1;
/** @protected */
Mixin1.memberXXX2 = 1;

/**
 * @mixin
 * @protected
 */
var Mixin2;
Mixin2.methodYYY1 = function(){};
/** @protected */
Mixin2.methodYYY2 = function(){};
Mixin2.memberYYY1 = 1;
/** @protected */
Mixin2.memberYYY2 = 1;

/**
 * @mixin
 * @private
 */
var Mixin3;
Mixin3.methodZZZ1 = function(){};
/** @protected */
Mixin3.methodZZZ2 = function(){};
Mixin3.memberZZZ1 = 1;
/** @protected */
Mixin3.memberZZZ2 = 1;

/**
 * this is method1 desc.
 */
var method1 = function(){};

/**
 * @protected
 */
var method2 = function(){};

/**
 * @private
 */
var method3 = function(){};

/**
 * this is member1 desc.
 * @type {Object}
 */
var member1;

/**
 * @type {number}
 * @protected
 */
var member2;

/**
 * @type {number}
 * @private
 */
var member3;

/**
 * this is CONSTANT1 desc.
 * @constant {number}
 */
var CONSTANT1;

/**
 * @constant {number}
 * @protected
 */
var CONSTANT2;

/**
 * @constant {number}
 * @private
 */
var CONSTANT3;

/**
 * this is Enum1 desc.
 * @enum {Object}
 */
var Enum1;

/**
 * @enum {number}
 * @protected
 */
var Enum2;

/**
 * @enum {number}
 * @private
 */
var Enum3;

/**
 * this is Typedef1 desc.
 * @typedef {Object} Typedef1
 */

/**
 * @typedef {(number|string)} Typedef2
 * @protected
 */

/**
 * @typedef {(number|string)} Typedef3
 * @private
 */

/**
 * this is Callback1 desc.
 * @callback Callback1
 */

/**
 * @callback Callback2
 * @protected
 */

/**
 * @callback Callback3
 * @private
 */

/**
 * this is Event1 desc.
 * @event Event1
 * @type {Object}
 */

/**
 * @event Event2
 * @type {number}
 * @protected
 */

/**
 * @event Event3
 * @type {number}
 * @private
 */

/**
 * @namespace NamespaceAndClass
 */

/**
 * @variation 2
 * @class
 */
function NamespaceAndClass(){}

