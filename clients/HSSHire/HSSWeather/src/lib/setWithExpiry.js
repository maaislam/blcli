const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
  
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export default setWithExpiry;