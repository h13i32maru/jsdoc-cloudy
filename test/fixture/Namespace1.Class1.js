/**
 * @class
 * @memberof Namespace1
 */
function Class0(){}

/**
 * @external XMLHttpRequest
 * @see https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest
 */

/**
 * @classdesc
 * this is Class1 classdesc.
 * {@link Namespace1}
 *
 * @fileexample
 * var foo = Class1;
 * console.log(foo);
 *
 * @fileexample
 * var bar = Class1;
 * console.log(bar);
 *
 * @desc
 * this is Class1 desc.
 * after 2nd line are more information.
 * @param {string} p1 p1 is Class1 1st param.
 * @param {number} p2 p2 is Class1 2nd param.
 * @class
 * @memberof Namespace1
 * @access public
 * @extends Namespace1.Class0
 * @example
 * var foo = 'this is Class1 example';
 * @implements Namespace1.Interface1
 * @since 1.2.3
 * @see http://example.com
 * @see {@link Namespace1.Class1}
 * @see {@link Namespace1.Class1#method1}
 * @see {@link Namespace1.Class1.staticMethod1}
 * @see {@link Namespace1.Class1#member1}
 * @see {@link Namespace1.Class1.staticMember1}
 * @see {@link method1}
 * @see {@link member1}
 * @deprecated since 1.0.0
 */
function Class1(p1, p2){

  /**
   * this is Class1#member1 desc.
   * after 2nd line are more information.
   * @member {string}
   * @example
   * var foo = 'this is Class1#member1 example';
   * @see http://example.com
   * @see http://example.org
   * @property {number} [member1.member2=10] this is member2 desc.
   * @property {?string} member1.member3 this is member3 desc.
   * @property {Object} member1.member4 this is member4 desc.
   * @property {!boolean} member1.member4.member5 this is member5 desc.
   */
  this.member1 = null;

  /**
   * @access public
   * @member {number}
   */
  this.member2;

  /**
   * @access protected
   * @member {number}
   */
  this.member3;

  /**
   * @access private
   * @member {number}
   */
  this.member4;

  /**
   * @deprecated since 1.0.0
   * @member {string}
   */
  this.member5;

  /**
   * @readonly
   * @member {string}
   */
  this.member6;

  /**
   * @member {string}
   * @since 1.2.3
   */
  this.member7;

  /**
   * @member {external:XMLHttpRequest}
   */
  this.member8;

  /**
   * this is Class1#method1 desc.
   * after 2nd line are more information.
   * @param {boolean} p1 p1 is Class1#method1 1st param.
   * @param {Object} p2 p2 is Class1#method1 2nd param.
   * @return {string[]} Class1#method1 returns string array.
   * @property {number} [member1.member2=10] this is member2 desc.
   * @property {?string} member1.member3 this is member3 desc.
   * @property {Object} member1.member4 this is member4 desc.
   * @property {!boolean} member1.member4.member5 this is member5 desc.
   * @example
   * var foo = 'this is Class1#method1 example';
   * @see http://example.com
   * @see http://example.org
   */
  this.method1 = function(p1, p2){};

  /**
   * this is Class1#method2 desc.
   * after 2nd line are more information.
   * @method
   * @param {boolean} p1 p1 is Class1#method2 1st param.
   * @return {Array.<Object.<string, number>>} Class1#method2 returns string array.
   * @example
   * var foo = 'this is Class1#method2 example';
   */
  this.method2 = null;

  /**
   * @param {Object} p1
   * @param {string} p1.p2 this is p1.p2 desc.
   * @param {Object} p1.p3
   * @param {number} p1.p3.p4 this is p1.p3.p4 desc.
   */
  this.method3 = function(p1){};

  /**
   * @param {string} [p1] this is p1 desc.
   */
  this.method4 = function(p1){};

  /**
   * @param {number} [p1=123] this is p1 desc.
   */
  this.method5 = function(p1){};

  /**
   * @param {?number} p1 this is p1 desc.
   * @return {?string} this is return desc.
   */
  this.method6 = function(p1){};

  /**
   * @param {!number} p1 this is p1 desc.
   * @return {!string} this is return desc.
   */
  this.method7 = function(p1){};

  /**
   * @param {...number} p1
   */
  this.method8 = function(p1){};

  /**
   * @abstract
   */
  this.method9 = function(){};

  /**
   * @access public
   */
  this.method10 = function(){};

  /**
   * @access protected
   */
  this.method11 = function(){};

  /**
   * @access private
   */
  this.method12 = function(){};

  /**
   * @override
   */
  this.method13 = function(){};

  /**
   * @deprecated since 1.0.0
   */
  this.method14 = function(){};

  /**
   * @since 1.2.3
   */
  this.method15 = function(){};

  /**
   * link to {@link Namespace1}.
   * @params {string} p1 link to {@link Namespace1}.
   * @throws {Error} this is throws desc. link to {@link Namespace1}.
   * @throws {InvalidArgumentException} this is throws desc.
   * @return {string} link to {@link Namespace1}.
   */
  this.method16 = function(p1){};
}

/**
 * this is Class1.staticMethod1 desc.
 * after 2nd line are more information.
 * @param {boolean} p1 p1 is Class1.staticMethod1 1st param.
 * @param {Object} p2 p2 is Class1.staticMethod1 2nd param.
 * @return {string[]} Class1.staticMethod1 returns string array.
 * @example
 * var foo = 'this is Class1.staticMethod1 example';
 */
Class1.staticMethod1 = function(p1, p2){};

/**
 * @public
 */
Class1.staticMethod2 = function(){};

/**
 * @protected
 */
Class1.staticMethod3 = function(){};

/**
 * @private
 */
Class1.staticMethod4 = function(){};

/**
 * @override
 */
Class1.staticMethod5 = function(){};

/**
 * this is Class1.staticMember1 desc.
 * after 2nd line are more information.
 * @member {string}
 * @example
 * var foo = 'this is Class1.staticMember1 example';
 */
Class1.staticMember1 = null;

/**
 * @member {string}
 * @public
 */
Class1.staticMember2 = null;

/**
 * @member {string}
 * @protected
 */
Class1.staticMember3 = null;

/**
 * @member {string}
 * @private
 */
Class1.staticMember4 = null;

/**
 * this is Event1 desc.
 * @event Namespace1.Class#Event1
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
 * @event Namespace1.Class#Event2
 * @protected
 */

/**
 * @event Namespace1.Class#Event3
 * @private
 */
