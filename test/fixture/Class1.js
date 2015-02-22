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
 * @example
 * var foo = Class1;
 * @global
 */
function Class1(p1, p2){

  /**
   * this is Class1#member1 desc.
   * after 2nd line are more information.
   * @member {string}
   * @example
   * var foo = Class1#member1;
   */
  this.member1 = null;

  /**
   * this is Class1#method1 desc.
   * after 2nd line are more information.
   * @param {boolean} p1 p1 is Class1#method1 1st param.
   * @param {Object} p2 p2 is Class1#method1 2nd param.
   * @example
   * var foo = Class1#method1;
   */
  this.method1 = function(p1, p2){};
}
