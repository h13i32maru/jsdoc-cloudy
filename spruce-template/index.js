var jsdom = require("jsdom");

export default class SpruceTemplate {
  constructor(html, {autoClose = true, autoDrop = true} = {autoClose: true, autoDrop: true}) {
    if (!html) {
      throw new Error('html must be specified.');
    }

    if (typeof html === 'string') {
      this._doc = jsdom.jsdom(html, {
        features: {
          FetchExternalResources: [],
          ProcessExternalResources: false
        }
      });
      this._isPartial = html.indexOf('<html>') === -1;
    } else if (html.querySelector) {
      this._doc = html;
      this._isPartial = !!html.ownerDocument;
    }

    this._options = {autoClose, autoDrop};
  }

  set autoDrop(val) {
    this._options.autoDrop = val;
  }

  get autoDrop() {
    return this._options.autoDrop;
  }

  set autoClose(val) {
    this._options.autoClose = val;
  }

  get autoClose() {
    return this._options.autoClose;
  }

  text(id, value) {
    var nodes = this._nodes(id);

    if (this._options.autoDrop && !value) {
      for (var node of nodes) {
        node.parentElement.removeChild(node);
      }
    } else {
      for (var node of nodes) {
        node.textContent = value;
      }
    }

    return this;
  }

  load(id, spruceTemplate) {
    var html = '';
    if (spruceTemplate instanceof SpruceTemplate) {
      //html = spruceTemplate._doc.body.innerHTML;
      html = spruceTemplate.html;
    } else if(spruceTemplate){
      html = spruceTemplate.toString();
    }

    var nodes = this._nodes(id);

    if (this._options.autoDrop && !html) {
      for (var node of nodes) {
        node.parentElement.removeChild(node);
      }
    } else {
      for (var node of nodes) {
        node.setAttribute('data-s-loaded', 1);
        node.textContent = '';
        node.innerHTML = html;
      }
    }

    return this;
  }

  attr(id, key, value) {
    var nodes = this._nodes(id);
    for (var node of nodes) {
      node.setAttribute(key, value);
    }
    return this;
  }

  loop(id, values, callback) {
    if (!values) values = [];

    var nodes = this._nodes(id);
    for (var node of nodes) {
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
        var textNode = this._createTextNode('\n');
        //parent.appendChild(textNode);
        parentFragment.appendChild(fragment);
        parentFragment.appendChild(textNode);
      }
      parent.appendChild(parentFragment);
    }

    return this;
  }

  hide(id, isHide = true) {
    var nodes = this._nodes(id);
    for (var node of nodes) {
      if (isHide) {
        node.style.display = 'none';
      } else {
        node.style.display = null;
      }
    }
    return this;
  }

  show(id, isShow = true) {
    return this.hide(id, !isShow);
  }

  drop(id, isDrop = true) {
    if (!isDrop) return;

    var nodes = this._nodes(id);
    for (var node of nodes) {
      node.parentElement.removeChild(node);
    }

    return this;
  }

  close() {
    if (!this._doc) return this;

    this._html = this._takeHTML();
    if (this._doc.parentWindow) this._doc.parentWindow.close();
    this._doc = null;
    return this;
  }

  get html() {
    if (!this._doc) return this._html;

    this._html = this._takeHTML();

    if (this._options.autoClose && this._doc) {
      this.close();
    }

    return this._html;
  }

  _nodes(id) {
    if (!this._doc) {
      throw new Error('can not operation after close.');
    }

    if (!id) {
      return [];
    }

    var nodes = this._doc.querySelectorAll(`[data-s="${id}"]`);
    return this._filter(nodes);
  }

  _createTextNode(text) {
    if (this._doc.createTextNode) {
      return this._doc.createTextNode(text);
    } else {
      return this._doc.ownerDocument.createTextNode(text);
    }
  }

  _filter(nodes) {
    var results = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var target = node;
      while(target = target.parentElement) {
        if (target.hasAttribute('data-s-loaded')) {
          break;
        }
      }

      if (!target) {
        results.push(node);
      }
    }

    return results;
  }

  _getType(doc) {
    if (!doc.ownerDocument) {
      return 'Document';
    }

    var window = doc.ownerDocument.parentWindow;
    if (doc instanceof window.DocumentFragment) {
      return 'Fragment';
    }

    return 'Element';
  }

  _takeHTML(){
    var nodes = this._doc.querySelectorAll('[data-s-loaded="1"]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].removeAttribute('data-s-loaded');
    }

    switch(this._getType(this._doc)) {
      case 'Document':
        if (this._isPartial) {
          var html = this._doc.body.innerHTML;
        } else {
          var html = '<!DOCTYPE html>\n' + this._doc.body.parentElement.outerHTML;
        }
        break;
      case 'Fragment':
        if (this._doc.children[0]) {
          var html = this._doc.children[0].outerHTML;
        } else {
          var html = '';
        }
        break;
      case 'Element':
        var html = this._doc.outerHTML;
    }

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute('data-s-loaded', 1);
    }

    return html;
  }
}

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
