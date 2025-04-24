class Cache {
  constructor() {
    this.cache = new Map();
  }
  
  /**
   * @return {mixed} value
   */
  add(key, value) {
    this.cache.set(key, value);

    return value;
  }
  
  remove(key) {
    this.cache.delete(key);
  }
  
  get(key) {
    return this.cache.get(key);
  }
}

const cacheObject = new Cache();

export default cacheObject; // Reusable cache instance 
