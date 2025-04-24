const cache = {
  map: new Map(),

  add(key, value) {
    this.map.set(key, value);

    localStorage.setItem(key, value);
  },

  remove(key) {
    this.map.delete(key);
  },

  get(key) {
    this.map.get(key);
  },

};

Object.freeze(cache);

const superCache = Object.assign({  // .assign - Creates Object from another Object
  cacheInLocalStorage() {

  }
}, cache);

export default {
  ID: '{{ID}}',
  VARIATION: '{{VARIATION}}',
};

// gulp --es6 --id='HS023' --variation=4

