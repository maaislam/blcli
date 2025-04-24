const store = {
  basketProducts() {
    // Get items from the basket page. Then get similar and return.
    if (!window.dataLayer[2]) {
      this.basketProducts();
    }
    // Get an array of brands (uppercase)
    const { basketProducts } = window.dataLayer[2];
    const brands = basketProducts.map((prod) => {
      const { ProductName } = prod;
      if (ProductName.match(/\b[A-Z]+\b/g)) {
        return ProductName.match(/\b[A-Z]+\b/g).join(' ');
      }
    });
    // Find duplicates, e.g. Most popular brand.
    const mode = (arr) => {
      return arr.sort((a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop();
    };
    const topBrand = mode(brands);

    return topBrand;
  },
  storeBrand(name, key, value) {
    /**
     * Add an item to a localStorage() object
     * @param {String} name  The localStorage() key
     * @param {String} key   The localStorage() value object key
     * @param {String} value The localStorage() value object value
     */

    // Get the existing data
    let existing = localStorage.getItem(name);

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : {};

    // Add new data to localStorage Array
    existing[key] = value;

    // Save back to localStorage
    localStorage.setItem(name, JSON.stringify(existing));
  },
  brandStore() {
    const recentStore = localStorage.getItem('RecentViewed');
    return recentStore;
  },
};

export default store;

