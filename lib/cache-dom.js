class CacheDom {
  /**
   * Constructor
   */
  constructor() {
    this.cache = {};
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache = {};
  }

  /**
   * Get single elm, will use querySelector()
   *
   * @param {string} selector
   * @param {boolean}
   * @return HTMLElement
   */
  get(selector, bypassCache = false) {
    return this.query(selector, bypassCache, 'querySelector');
  }

  /**
   * Get multiple elm, will use querySelector()
   *
   * @param {string} selector
   * @param {boolean}
   * @return NodeList
   */
  getAll(selector, bypassCache = false) {
    return this.query(selector, bypassCache, 'querySelectorAll');
  }

  /**
   * Evaluate selector
   *
   * @param {string} selector
   * @param {boolean}
   * @return NodeList
   */
  query(selector, bypassCache, type) {
    let result = null;

    if (bypassCache) {
      result = document[type](selector);
    } else {
      const cachedResult = this.cache[selector];
      if (cachedResult) {
        result = cachedResult;
      } else {
        result = document[type](selector);
        if (result) {
          this.cache[selector] = result;
        }
      }
    }

    return result;
  }
}

// Single instance pattern
// @see https://k94n.com/es6-modules-single-instance-pattern
export let cacheDom = new CacheDom(); // eslint-disable-line
