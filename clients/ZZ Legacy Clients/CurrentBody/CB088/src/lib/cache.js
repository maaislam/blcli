const cache = {
    cache: {},
    
    add(identifier, value) {
        this.cache[identifier] = value;
    },
    
    get(identifier) {
        return this.cache[identifier];
    },

    getAll() {
        return this.cache;
    }
};

export default cache;
