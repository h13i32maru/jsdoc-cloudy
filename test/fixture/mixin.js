/**
 * this is Mixin1 desc.
 * this is second line.
 * @mixin
 * @public
 * @since 1.2.3
 * @version 0.0.1
 * @deprecated
 * @fileexample
 * var foo = Mixin1;
 * console.log(foo);
 * @fileexample
 * var bar = Mixin1;
 * console.log(bar);
 * @see http://example.com
 * @see {@link module1:Module~Class1#method1}
 * @memberof module:Module1
 */
var Mixin1 = {
  /**
   * this is method1 desc.
   * this is second line.
   * @since 1.2.3
   * @version 0.0.1
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
  method1: function(){},

  /**
   * @protected
   */
  method2: function(){},

  /**
   * @private
   */
  method3: function(){},

  /**
   * this is member1 desc.
   * this is second line.
   * @type {Object}
   * @property {!(string|number)} member1.p1 this is p1 desc.
   * @property {?(string|number)} member1.p2 this is p2 desc.
   * @property {Object} member.p3 this is p3 desc.
   * @property {string[]} member.p3.p4 this is p4 desc.
   * @since 1.2.3
   * @version 0.0.1
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
  member1: null,

  /**
   * @type {number}
   * @protected
   */
  member2: null,

  /**
   * @type {number}
   * @private
   */
  member3: null
};

/**
 * @mixin
 * @memberof module:Module1
 * @protected
 */
var Mixin2 = {};

/**
 * @mixin
 * @memberof module:Module1
 * @private
 */
var Mixin3 = {};
