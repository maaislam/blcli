export const findObject =  (obj, key, value) => {
    if (!obj) return undefined;
  
    if (obj[key] === value) return obj;
  
    for (const k in obj) {
      if (obj.hasOwnProperty(k) && typeof obj[k] === 'object') {
        const found = findObject(obj[k], key, value);
        if (found) return found;
      }
    }
  
    return undefined;
};
  