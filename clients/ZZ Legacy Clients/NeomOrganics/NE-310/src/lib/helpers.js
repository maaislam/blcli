import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const checkboxClickEvents = () => {
  const allCheckboxes = document.querySelectorAll('.checkbox__input');
  for (let i = 1; i < allCheckboxes.length; i += 1) {
    const checkbox = allCheckboxes[i];
    checkbox.addEventListener('click', (e) => {
      setTimeout(() => {
        let optInValues = document.querySelector('.prefs input[name="checkout[note]"]').value;
        if (i == 1) {
          // SMS
          if (optInValues.indexOf('SMS') > -1) {
            fireEvent('Click - Checkbox deselect (opt in) - SMS');
          } else {
            fireEvent('Click - Checkbox select (opt out) - SMS');
          }
        } else if (i == 2) {
          // Post from NEOM
          if (optInValues.indexOf('Post') > -1) {
            fireEvent('Click - Checkbox deselect (opt in) - Post from NEOM');
          } else {
            fireEvent('Click - Checkbox select (opt out) - Post from NEOM');
          }
        } else if (i == 3) {
          // Post from Third Parties
          if (optInValues.indexOf('Third Parties') > -1) {
            fireEvent('Click - Checkbox deselect (opt in) - Post from other trusted retailers');
          } else {
            fireEvent('Click - Checkbox select (opt out) - Post from other trusted retailers');
          }
        }
      }, 500);
      
    });

  }
};