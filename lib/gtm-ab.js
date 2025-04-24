/**
 * Bucket into a variant
 *
 * e.g. 0,1,2,3,4,5 where ) is normally treated as the control
 */
export const determineVariant = (numVariations = 2, split = []) => {
  const randomNumber = Math.random() * 100;
  const divider = 100 / numVariations;

  if(split.length != numVariations) {
    return Math.floor(randomNumber / divider);
  } else {
    let result = 0;
    for(let i = 0; i < split.length; i++) {
      if(randomNumber < split[i]) {
        result = i;
        break;
      }
    }
    return result;
  }
};

/**
 * Bucket user
 */
export const bucketUser = (key, storage, numVariations, split = []) => {
  let currentVariant = storage.getItem(key);
  if(!currentVariant) {
    currentVariant = determineVariant(numVariations, split);

    storage.setItem(key, currentVariant);
  }

  return parseInt(currentVariant, 10);
};
