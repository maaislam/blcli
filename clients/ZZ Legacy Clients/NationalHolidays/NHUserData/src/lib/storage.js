import { pipe } from './fn';

/**
 * Recursively build object for given path
 */
const objectBuilder = (obj = {}, path = [], val) => {
  if(path.length === 1) {
    obj[path[0]] = val;
  } else {
    obj[path[0]] = objectBuilder(obj[path[0]], path.slice(1), val);
  }

  return obj;
};

/**
 * Helper object to string
 */
const jsonify = (obj) => {
  if(typeof obj != 'object') {
    throw "Object must be given.";
  }

  return JSON.stringify(obj);
};

/**
 * Helper convert json (or null) to object
 */
const jsonToObject = (json) => {
  return !json ? {} : JSON.parse(json);
};

/**
 * Composable local store for saving flat storage to json
 */
const withSaveLocally = (storageType) => {
  return (o) => {
    return Object.assign({}, o, {
      save(key) {
        storageType.setItem(key, jsonify(this.storage));
      },
      load(key) {
        this.storage = jsonToObject(storageType.getItem(key));
      }
    });
  }
};

/**
 * Helper factory create a storage store
 */
export const createStore = (o) => {
  return Object.assign({}, o, {
    storage: {},
    add(path, val) {
      this.storage = objectBuilder(this.storage, path, val);
    },
  });
};

/**
 * Create a local store (a store with the ability to save the store into local storage
 */
export const createLocalStore = (storageType) => pipe(
  createStore,
  withSaveLocally(storageType)
)({});
