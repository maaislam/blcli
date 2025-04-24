const cache = {
  map: new Map(),

  add(key, value) {
    this.map.set(key, value);
  },
  
  remove(key) {
    this.map.delete(key);
  },
  
  get(key) {
    return this.map.get(key);
  },
};

Object.freeze(cache);

export default cache;
