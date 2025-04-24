export default (() => {
  // Extend web storage with setObject and getObject helpers
  window.Storage.prototype.setObject = function setStorageObject(key, value) {
    this.setItem(key, JSON.stringify(value));
  };

  window.Storage.prototype.getObject = function getStorageObject(key) {
    const value = this.getItem(key);
    return value && JSON.parse(value);
  };
})();
