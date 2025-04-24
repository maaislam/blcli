import shared from './shared';

/**
 * Count persona hits 
 * Limit scoring to once per ID
 */
export default (persona, id) => {
  const ident = `${shared.ID}-personas`;
  const json = localStorage.getItem(ident);

  let store = {
    trackedIds: [],
    scores: {},
  };

  if(json) {
    store = JSON.parse(json);
  }

  if(store.trackedIds.indexOf(id) == -1) {
    store.trackedIds.push(id);

    if(!store.scores[persona]) {
      store.scores[persona] = 0;
    }

    store.scores[persona] += 1;
  }

  localStorage.setItem(ident, JSON.stringify(store));
};
