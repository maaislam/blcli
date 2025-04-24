import { pollerLite } from '../../../../../../lib/uc-lib';

export default () => {
  // Change Help Text on Location field
  pollerLite(['p.RC022_locationFooter'], () => {
    const locationHelperText = document.querySelector('p.RC022_locationFooter');
    if (locationHelperText) {
      locationHelperText.innerText = `We'll sort your search results by nearest venue first`; 
    }
  });

  // Change Default Value in Select
  pollerLite(['span.RC022_selectCourseTypeText.ui-selectmenu-text'], () => {
    const selectField = document.querySelector('span.RC022_selectCourseTypeText.ui-selectmenu-text');
    if (selectField) {
      selectField.innerText = 'Select a course type'; 
    }
  });

  // Make Search CTA Button inactive
  pollerLite(['.RC022_btnContainer', 'button.RC022_searchDatesFinalBtn'], () => {
    const ctaBtnContainer = document.querySelector('.RC022_btnContainer');
    if (ctaBtnContainer) {
      ctaBtnContainer.classList.add('RC053-disabled');
    }
  });
};