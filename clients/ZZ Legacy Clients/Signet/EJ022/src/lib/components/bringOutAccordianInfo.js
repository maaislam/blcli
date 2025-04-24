import settings from "../settings";

export default () => {
/* Add titles to all the accordian tabs */
  const accordianTabs = document.querySelectorAll('#js-accordion-tabs h2');

  for (let index = 0; index < accordianTabs.length; index += 1) {
    const element = accordianTabs[index];
    const tabName = element.textContent;
    const tabTarget = element.getAttribute('data-accordion-tabs-target');
    if (tabTarget) {
      const matchingTab = document.getElementById(tabTarget);
      if (matchingTab) {
        matchingTab.insertAdjacentHTML('afterbegin', `<h2 class="${settings.ID}-tabTitle">${tabName}</h2>`);
      }
    }
  }

  // remove styling from all of tabs
  const allTabs = document.querySelectorAll('div[data-accordion-tabs]');
  for (let index = 0; index < allTabs.length; index += 1) {
    const element = allTabs[index];
    element.removeAttribute('style');
  }
};

