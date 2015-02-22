/**
 * @classdesc
 * this is SampleClass1 classdesc.
 *
 * @fileexample
 * var foo = 'this is SampleClass1 fileexample';
 *
 * @desc
 * this is SampleClass1 desc.
 * after 2nd line are more information.
 * @param {string} p1 p1 is SampleClass1 1st param.
 * @param {number} p2 p2 is SampleClass1 2nd param.
 * @class
 * @memberof SampleNamespace1
 * @example
 * var foo = 'this is SampleClass1 example';
 */
function SampleClass1(p1, p2){

  /**
   * this is SampleClass1#member1 desc.
   * after 2nd line are more information.
   * @member {string}
   * @example
   * var foo = 'this is SampleClass1#member1 example';
   */
  this.member1 = null;

  /**
   * this is SampleClass1#method1 desc.
   * after 2nd line are more information.
   * @param {boolean} p1 p1 is SampleClass1#method1 1st param.
   * @param {Object} p2 p2 is SampleClass1#method1 2nd param.
   * @return {string[]} SampleClass1#method1 returns string array.
   * @example
   * var foo = 'this is SampleClass1#method1 example';
   */
  this.method1 = function(p1, p2){};

  /**
   * this is SampleClass1#method2 desc.
   * after 2nd line are more information.
   * @method
   * @param {boolean} p1 p1 is SampleClass1#method2 1st param.
   * @return {Array.<Object.<string, number>>} SampleClass1#method2 returns string array.
   * @example
   * var foo = 'this is SampleClass1#method2 example';
   */
  this.method2 = null;
}

/**
 * this is SampleClass1.staticMethod1 desc.
 * after 2nd line are more information.
 * @param {boolean} p1 p1 is SampleClass1.staticMethod1 1st param.
 * @param {Object} p2 p2 is SampleClass1.staticMethod1 2nd param.
 * @return {string[]} SampleClass1.staticMethod1 returns string array.
 * @example
 * var foo = 'this is SampleClass1.staticMethod1 example';
 */
SampleClass1.staticMethod1 = function(p1, p2){};

/**
 * this is SampleClass1.staticMember1 desc.
 * after 2nd line are more information.
 * @member {string}
 * @example
 * var foo = 'this is SampleClass1.staticMember1 example';
 */
SampleClass1.staticMember1 = null;
