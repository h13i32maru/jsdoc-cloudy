/**
 * @classdesc
 * this is SampleGlobalClass1 classdesc.
 *
 * @fileexample
 * var foo = 'this is SampleGlobalClass1 fileexample';
 *
 * @desc
 * this is SampleGlobalClass1 desc.
 * after 2nd line are more information.
 * @param {string} p1 p1 is SampleGlobalClass1 1st param.
 * @param {number} p2 p2 is SampleGlobalClass1 2nd param.
 * @class
 * @example
 * var foo = 'this is SampleGlobalClass1 example';
 */
function SampleGlobalClass1(p1, p2){

  /**
   * this is SampleGlobalClass1#member1 desc.
   * after 2nd line are more information.
   * @member {string}
   * @example
   * var foo = 'this is SampleGlobalClass1#member1 example';
   */
  this.member1 = null;

  /**
   * this is SampleGlobalClass1#method1 desc.
   * after 2nd line are more information.
   * @param {boolean} p1 p1 is SampleGlobalClass1#method1 1st param.
   * @param {Object} p2 p2 is SampleGlobalClass1#method1 2nd param.
   * @example
   * var foo = 'this is SampleGlobalClass1#method1 example';
   */
  this.method1 = function(p1, p2){};
}
