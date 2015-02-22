/**
 * @class
 * @memberof Namespace1
 */
function Class0(){}

/**
 * @classdesc
 * this is Class1 classdesc.
 *
 * @fileexample
 * var foo = Class1;
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
 */
function Class1(p1, p2){

  /**
   * this is Class1#member1 desc.
   * after 2nd line are more information.
   * @member {string}
   * @example
   * var foo = 'this is Class1#member1 example';
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
   * @deprecated
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
   * this is Class1#method1 desc.
   * after 2nd line are more information.
   * @param {boolean} p1 p1 is Class1#method1 1st param.
   * @param {Object} p2 p2 is Class1#method1 2nd param.
   * @return {string[]} Class1#method1 returns string array.
   * @example
   * var foo = 'this is Class1#method1 example';
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
   * @deprecated
   */
  this.method14 = function(){};

  /**
   * @since 1.2.3
   */
  this.method15 = function(){};
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

