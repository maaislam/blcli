import settings from './settings';

export const choicesEnum = {
  'online': 'ONLINE', 
  'rep': 'REP'
};

/**
 * Save choice
 */
export const saveChoice = (choice) => {
  if(!choicesEnum[choice]) {
    throw "Invalid choice passed to saveChoice()";
  }

  localStorage.setItem(settings.CHOICE_KEY, choicesEnum[choice]);
};

/**
 * Get choice (normalized as per enum)
 */
export const getChoice = () => {
  const localStore = localStorage.getItem(settings.CHOICE_KEY);

  return localStore;
};

/**
 * Choices does match
 */
export const choiceMatches = (what) => {
  return getChoice() === choicesEnum[what];
};
