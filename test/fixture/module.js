/**
 * this is Module1 desc.
 * this is second line.
 * @module Module1
 * @since 1.2.3
 * @private
 * @deprecated
 * @fileexample
 * var foo = Module1;
 * console.log(foo);
 * @fileexample
 * var bar = Module1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link module1:Module~Class1#method1}
 * @mixes module:Module1.Mixin1
 * @mixes module:Module1.Mixin2
 */

/**
 * this is Namespace1 desc.
 * this is second line.
 * @namespace
 * @since 1.2.3
 * @public
 * @deprecated
 * @example
 * var foo = Namespace1;
 * console.log(foo);
 * @example
 * var bar = Namespace1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link Namespace1}
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
 * this is second line.
 * @class
 * @classdesc
 * this is Class1 classdesc.
 * this is second line.
 * @since 1.2.3
 * @public
 * @deprecated
 * @example
 * var foo = Class1;
 * console.log(foo);
 * @see http://example.com
 * @see {@link Namespace1.Class1}
 */
function Class1(){}

/**
 * @class
 * @protected
 */
function Class2(){}

/**
 * @class
 * @private
 */
function Class3(){}

/**
 * this is Interface1 desc.
 * this is second line.
 * @interface
 * @classdesc
 * this is Interface1 classdesc.
 * this is second line.
 * @since 1.2.3
 * @public
 * @deprecated
 * @example
 * var foo = Interface1;
 * console.log(foo);
 * @see http://example.com
 * @see {@link Namespace1.Interface1}
 */
function Interface1(){}

/**
 * @protected
 * @interface
 */
function Interface2(){}

/**
 * @private
 * @interface
 */
function Interface3(){}

/**
 * this is method1 desc.
 * this is second line.
 * @since 1.2.3
 * @public
 * @deprecated
 * @example
 * var foo = method1;
 * @see http://example.com
 * @see {@link Namespace1.Class1#method1}
 * @param {?(string|number)} [p1=10] this is p1 desc.
 * @param {!(string|number)} [p2=10] this is p2 desc.
 * @param {Object} p3 this is p3 desc.
 * @param {string[]} p3.p4 this is p4 desc.
 * @return {Object} this is return desc.
 * @property {number} [return.p1=10] this is p1 desc.
 * @property {Object} return.p2 this is p2 desc.
 * @property {string} return.p2.p3 this is p3 desc.
 * @throws {Error} this is throws Error desc.
 * @throws {InvalidArgumentException} this is throws InvalidArgumentException desc.
 * @virtual
 */
function method1(p1, p2, p3){}

/**
 * @protected
 */
function method2(){}

/**
 * @private
 */
function method3(){}

/**
 * this is member1 desc.
 * this is second line.
 * @type {Object}
 * @property {!(string|number)} member1.p1 this is p1 desc.
 * @property {?(string|number)} member1.p2 this is p2 desc.
 * @property {Object} member.p3 this is p3 desc.
 * @property {string[]} member.p3.p4 this is p4 desc.
 * @since 1.2.3
 * @public
 * @deprecated
 * @example
 * var foo = member1;
 * console.log(foo);
 * @example
 * var bar = member1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link Namespace1.Class1#member1}
 * @readonly
 */
var member1 = null;

/**
 * @protected
 * @type {number}
 */
var member2 = null;

/**
 * @private
 * @type {number}
 */
var member3 = null;

/**
 * this is Typedef1 desc.
 * this is second line.
 * @typedef {Object} Typedef1
 * @property {!(string|number)} Typedef1.p1 this is p1 desc.
 * @property {?string} Typedef1.p2 this is p2 desc.
 * @property {Object} Typedef1.p3 this is p3 desc.
 * @property {string[]} Typedef1.p3.p4 this is p4 desc.
 * @since 1.2.3
 * @deprecated
 * @public
 * @example
 * var foo = Typedef1;
 * console.log(foo);
 * @example
 * var bar = Typedef1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link Typedef1}
 */

/**
 * @typedef {number} Typedef2
 * @protected
 */

/**
 * @typedef {number} Typedef3
 * @private
 */

/**
 * this is Event1 desc.
 * @event module:Module1~Event1
 * @type {Object}
 * @property {!(string|number)} Event1.p1 this is p1 desc.
 * @property {?string} Event1.p2 this is p2 desc.
 * @property {Object} Event1.p3 this is p3 desc.
 * @property {string[]} Event1.p3.p4 this is p4 desc.
 * @since 1.2.3
 * @deprecated
 * @public
 * @example
 * var foo = Event1;
 * console.log(foo);
 * @example
 * var bar = Event1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link module:Module1~Class1#member1}
 */

/**
 * @event module:Module1~Event3
 * @protected
 */

/**
 * @event module:Module1~Event3
 * @private
 */

/**
 * this is CONST1 desc.
 * this is second line.
 * @const {Object}
 * @property {!(string|number)} CONST1.p1 this is p1 desc.
 * @property {?string} CONST1.p2 this is p2 desc.
 * @property {Object} CONST1.p3 this is p3 desc.
 * @property {string[]} CONST1.p3.p4 this is p4 desc.
 * @since 1.2.3
 * @deprecated
 * @public
 * @example
 * var foo = CONST1;
 * console.log(foo);
 * @example
 * var bar = CONST1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link module:Module1~Class1#member1}
 */
const CONST1 = {};

/**
 * @const {number}
 * @protected
 */
const CONST2 = {};

/**
 * @const {number}
 * @private
 */
const CONST3 = {};

/**
 * this is Module1(2) desc.
 * this is second line.
 * @variation 2
 * @since 1.2.3
 * @public
 * @deprecated
 * @example
 * var foo = Module1;
 * console.log(foo);
 * @example
 * var bar = Module1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link Namespace1.Class1#method1}
 * @param {?(string|number)} [p1=10] this is p1 desc.
 * @param {!(string|number)} [p2=10] this is p2 desc.
 * @param {Object} p3 this is p3 desc.
 * @param {string[]} p3.p4 this is p4 desc.
 * @return {Object} this is return desc.
 * @property {number} [return.p1=10] this is p1 desc.
 * @property {Object} return.p2 this is p2 desc.
 * @property {string} return.p2.p3 this is p3 desc.
 * @throws {Error} this is throws Error desc.
 * @throws {InvalidArgumentException} this is throws InvalidArgumentException desc.
 * @virtual
 */
function Module1(p1, p2, p3){}

/**
 * this is enum1 desc.
 * @enum {number}
 * @since 1.2.3
 * @deprecated
 * @public
 * @example
 * var foo = enum1;
 * console.log(foo);
 * @example
 * var bar = enum1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link module:Module1~Class1#member1}
 */
var enum1 = {
  /**
   * this is enum1.CONST1 desc.
   */
  CONST1: 1,
  /**
   * this is enum1.CONST2 desc.
   * @type {Object}
   * @property {!(string|number)} CONST2.p1 this is p1 desc.
   * @property {?string} CONST2.p2 this is p2 desc.
   * @property {Object} CONST2.p3 this is p3 desc.
   * @property {string[]} CONST2.p3.p4 this is p4 desc.
   */
  CONST2: null
};

/**
 * @enum {number}
 * @protected
 */
var enum2;

/**
 * @enum {number}
 * @private
 */
var enum3;
