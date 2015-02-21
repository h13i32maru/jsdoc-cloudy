"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var jsdom = require("jsdom");

var SpruceTemplate = (function () {
  function SpruceTemplate(html) {
    var _ref = arguments[1] === undefined ? { autoClose: true, autoDrop: true } : arguments[1];
    var _ref$autoClose = _ref.autoClose;
    var autoClose = _ref$autoClose === undefined ? true : _ref$autoClose;
    var _ref$autoDrop = _ref.autoDrop;
    var autoDrop = _ref$autoDrop === undefined ? true : _ref$autoDrop;
    _classCallCheck(this, SpruceTemplate);

    if (!html) {
      throw new Error("html must be specified.");
    }

    if (typeof html === "string") {
      this._doc = jsdom.jsdom(html, {
        features: {
          FetchExternalResources: [],
          ProcessExternalResources: false
        }
      });
      this._isPartial = html.indexOf("<html>") === -1;
    } else if (html.querySelector) {
      this._doc = html;
      this._isPartial = !!html.ownerDocument;
    }

    this._options = { autoClose: autoClose, autoDrop: autoDrop };
  }

  _prototypeProperties(SpruceTemplate, null, {
    autoDrop: {
      set: function (val) {
        this._options.autoDrop = val;
      },
      get: function () {
        return this._options.autoDrop;
      },
      configurable: true
    },
    autoClose: {
      set: function (val) {
        this._options.autoClose = val;
      },
      get: function () {
        return this._options.autoClose;
      },
      configurable: true
    },
    text: {
      value: function text(id, value) {
        var nodes = this._nodes(id);

        if (this._options.autoDrop && !value) {
          for (var _iterator = nodes[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
            var node = _step.value;
            node.parentElement.removeChild(node);
          }
        } else {
          for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
            var node = _step2.value;
            node.textContent = value;
          }
        }

        return this;
      },
      writable: true,
      configurable: true
    },
    load: {
      value: function load(id, spruceTemplate) {
        var html = "";
        if (spruceTemplate instanceof SpruceTemplate) {
          //html = spruceTemplate._doc.body.innerHTML;
          html = spruceTemplate.html;
        } else if (spruceTemplate) {
          html = spruceTemplate.toString();
        }

        var nodes = this._nodes(id);

        if (this._options.autoDrop && !html) {
          for (var _iterator = nodes[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
            var node = _step.value;
            node.parentElement.removeChild(node);
          }
        } else {
          for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
            var node = _step2.value;
            node.setAttribute("data-s-loaded", 1);
            node.textContent = "";
            node.innerHTML = html;
          }
        }

        return this;
      },
      writable: true,
      configurable: true
    },
    attr: {
      value: function attr(id, key, value) {
        var nodes = this._nodes(id);
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var node = _step.value;
          node.setAttribute(key, value);
        }
        return this;
      },
      writable: true,
      configurable: true
    },
    loop: {
      value: function loop(id, values, callback) {
        if (!values) values = [];

        var nodes = this._nodes(id);
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var node = _step.value;
          var parent = node.parentElement;
          parent.removeChild(node);
          var parentFragment = node.ownerDocument.createDocumentFragment();

          for (var j = 0; j < values.length; j++) {
            var clonedNode = node.cloneNode(true);
            var fragment = node.ownerDocument.createDocumentFragment();
            fragment.appendChild(clonedNode);
            var spruce = new SpruceTemplate(fragment);
            callback(j, values[j], spruce);
            //parent.appendChild(fragment);
            var textNode = this._createTextNode("\n");
            //parent.appendChild(textNode);
            parentFragment.appendChild(fragment);
            parentFragment.appendChild(textNode);
          }
          parent.appendChild(parentFragment);
        }

        return this;
      },
      writable: true,
      configurable: true
    },
    hide: {
      value: function hide(id) {
        var isHide = arguments[1] === undefined ? true : arguments[1];
        var nodes = this._nodes(id);
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var node = _step.value;
          if (isHide) {
            node.style.display = "none";
          } else {
            node.style.display = null;
          }
        }
        return this;
      },
      writable: true,
      configurable: true
    },
    show: {
      value: function show(id) {
        var isShow = arguments[1] === undefined ? true : arguments[1];
        return this.hide(id, !isShow);
      },
      writable: true,
      configurable: true
    },
    drop: {
      value: function drop(id) {
        var isDrop = arguments[1] === undefined ? true : arguments[1];
        if (!isDrop) return;

        var nodes = this._nodes(id);
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var node = _step.value;
          node.parentElement.removeChild(node);
        }

        return this;
      },
      writable: true,
      configurable: true
    },
    close: {
      value: function close() {
        if (!this._doc) return this;

        this._html = this._takeHTML();
        if (this._doc.parentWindow) this._doc.parentWindow.close();
        this._doc = null;
        return this;
      },
      writable: true,
      configurable: true
    },
    html: {
      get: function () {
        if (!this._doc) return this._html;

        this._html = this._takeHTML();

        if (this._options.autoClose && this._doc) {
          this.close();
        }

        return this._html;
      },
      configurable: true
    },
    _nodes: {
      value: function _nodes(id) {
        if (!this._doc) {
          throw new Error("can not operation after close.");
        }

        if (!id) {
          return [];
        }

        var nodes = this._doc.querySelectorAll("[data-s=\"" + id + "\"]");
        return this._filter(nodes);
      },
      writable: true,
      configurable: true
    },
    _createTextNode: {
      value: function _createTextNode(text) {
        if (this._doc.createTextNode) {
          return this._doc.createTextNode(text);
        } else {
          return this._doc.ownerDocument.createTextNode(text);
        }
      },
      writable: true,
      configurable: true
    },
    _filter: {
      value: function _filter(nodes) {
        var results = [];
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          var target = node;
          while (target = target.parentElement) {
            if (target.hasAttribute("data-s-loaded")) {
              break;
            }
          }

          if (!target) {
            results.push(node);
          }
        }

        return results;
      },
      writable: true,
      configurable: true
    },
    _getType: {
      value: function _getType(doc) {
        if (!doc.ownerDocument) {
          return "Document";
        }

        var window = doc.ownerDocument.parentWindow;
        if (doc instanceof window.DocumentFragment) {
          return "Fragment";
        }

        return "Element";
      },
      writable: true,
      configurable: true
    },
    _takeHTML: {
      value: function _takeHTML() {
        var nodes = this._doc.querySelectorAll("[data-s-loaded=\"1\"]");
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].removeAttribute("data-s-loaded");
        }

        switch (this._getType(this._doc)) {
          case "Document":
            if (this._isPartial) {
              var html = this._doc.body.innerHTML;
            } else {
              var html = "<!DOCTYPE html>\n" + this._doc.body.parentElement.outerHTML;
            }
            break;
          case "Fragment":
            if (this._doc.children[0]) {
              var html = this._doc.children[0].outerHTML;
            } else {
              var html = "";
            }
            break;
          case "Element":
            var html = this._doc.outerHTML;
        }

        for (var i = 0; i < nodes.length; i++) {
          nodes[i].setAttribute("data-s-loaded", 1);
        }

        return html;
      },
      writable: true,
      configurable: true
    }
  });

  return SpruceTemplate;
})();

module.exports = SpruceTemplate;


//var fs = require('fs');
//var html = fs.readFileSync('sample.html', {encoding: 'utf-8'});
//
//var values = [{name: 'a', age: 12}, {name: 'b', age: 20}, {name: 'c', age: 30}];
//var s = new SpruceTemplate(html);
//s.text('title', 'Alice');
//s.attr('title', 'href', 'http://hoge.com');
//s.hide('title').show('title');
//s.load('title', new SpruceTemplate(html));
//s.loop('names', values, (i, v, s)=> s.text('name', v.name).text('age', v.age));
//console.log(s.take());
