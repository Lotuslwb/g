/**
 * Created by Elaine on 2018/5/9.
 */
const Util = require('../util/index');
const Element = require('./element');
const LinearGradient = require('../defs/linearGradient');

const Defs = function (cfg) {
  Defs.superclass.constructor.call(this, cfg);
  this.set('children', []);
}

Util.extend(Defs, Element);

Util.augment(Defs, {
  isGroup: false,
  canFill: false,
  canStroke: false,
  capture: false,
  visible: false,
  init() {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const id = Util.uniqueId('defs_');
    el.setAttribute('id', id);
    this.set('el', el);
    this.set('children', []);
  },
  find(type, attr) {
    const children = this.get('children');
    let result = null;
    for(let i = 0; i < children.length; i++) {
      if (children[i].match(type, attr)) {
        result = children.get('id');
        break;
      }
    }
    return result;
  },
  findById(id) {
    const children = this.get('children');
    let flag = null;
    Util.each(children, function(child) {
      flag = child.get('id') === id ? child : null;
    });
    return flag;
  },
  add(items) {
    const el = this.get('el');
    const self = this;
    const children = this.get('children');
    if (Util.isArray(items)) {
      Util.each(items, function(item) {
        const parent = item.get('parent');
        if (parent) {
          parent.removeChild(item, false);
          self._setContext(item);
        }
        el.appendChild(item.get('el'));
      });
      children.push.apply(children, items);
      return self;
    }
    if (self.findById(items.get('id'))) {
      return self;
    }
    const parent = items.get('parent');
    if (parent) {
      parent.removeChild(items, false);
    }
    self._setContext(items);
    el.appendChild(items.get('el'));
    return self;
  },
  _setContext(item) {
    item.__cfg.parent = this;
    item.__cfg.defs = this;
    item.__cfg.canvas = this.__cfg.canvas;
    item.__cfg.mounted = true;
  },
  addGradient(cfg) {
    if (cfg.toLowerCase().startsWith('l')) {
      // 线性渐变
      const gradient = new LinearGradient(cfg);
      this.__cfg.el.appendChild(gradient.__attrs.el);
      this.get('children').push(gradient);
      console.log(this.__cfg.el);
      return gradient.__attrs.id;
    }
    // todo 环形渐变
  }
});

module.exports = Defs;