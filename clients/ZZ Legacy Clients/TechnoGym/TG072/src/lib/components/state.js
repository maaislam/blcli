/**
 * @desc Helpers to store the information
 */
const localKey = 'TG072-questions';
let state = {};

export const getState = (questionName) => {
  if (questionName) {
    return state[questionName];
  } else {
    return state;
  }
};

export const clearState = () => {
  state = {};
  updateLocalStorage();
};

export const loadStateFromLocalStorage = () => {
  const local = localStorage.getItem(localKey);
  state = JSON.parse(local);

  return getState();
};

const updateLocalStorage = () => {
  localStorage.setItem(localKey, JSON.stringify(state));
};

export const setState = (key, value) => {
  state[key] = value;
  updateLocalStorage();
};

export const deleteBackwardsStateEntry = (selectedTarget) => {
  const stateKeys = Object.keys(state).reverse();
  const numStateKeys = stateKeys.length;
  for (let i = 0; i < numStateKeys; i += 1) {
    delete state[stateKeys[i]];
    if (stateKeys[i] === selectedTarget) {
      break;
    }
  }
  updateLocalStorage();
};
