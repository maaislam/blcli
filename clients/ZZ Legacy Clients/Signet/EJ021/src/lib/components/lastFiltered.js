import settings from '../settings';

export default () => {
// if existing filter is in sessions storage. make active in observer
  if (sessionStorage.getItem(`${settings.ID}-filtered`)) {
    const lastFiltered = sessionStorage.getItem(`${settings.ID}-filtered`);
    const lastFilterLink = document.querySelector(`.${settings.ID}_filterLvl1-filter[name-attr=${lastFiltered}]`);
    lastFilterLink.click();
  }
};
