/**
 * Shuffle an array
 *
 * Modified from https://www.kirupa.com/html5/shuffling_array_js.htm
 *
 * @param {Array} arr
 */
export const shuffle = (arr) => {
  for (var i = arr.length-1; i >=0; i--) {
      var randomIndex = Math.floor(Math.random()*(i+1));
      var itemAtIndex = arr[randomIndex];

      arr[randomIndex] = arr[i];
      arr[i] = itemAtIndex;
  }
  return arr;
};
