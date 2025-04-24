import {
  fullStory
} from '../../../../../lib/utils';
import settings from './settings';
import {poller} from '../../../../../lib/uc-lib';
const {
  ID,
  VARIATION
} = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function storeTourData() {
  const data = {
    title: '',
    content: ``,
  };
  const tab = document.querySelector('.tab-area .tab-content .content-block[data-id="Tab1"]');
  let tabTitle = tab.querySelector('h3').innerText;
  data.title = tabTitle.trim().toLowerCase();
  const tabContent = tab.querySelector('.text');
  tabContent.querySelector('h3').innerText = tabTitle;
  data.content = tabContent.outerHTML;
  localStorage.setItem('tourData', JSON.stringify(data));
}

function initTest() {
  const data = JSON.parse(localStorage.getItem('tourData'));
  let tourName = null;
  poller(['.NH052_Sidebar-title'], () => {
    tourName = document.querySelector('.NH052_Sidebar-title').innerText.trim().toLowerCase();
  });
      /**
     * if NH052 is active use it
     */
    if(tourName && data){
      console.log('nh052');
      if (data.title === tourName) {
        const element = document.createElement('div');
        element.classList.add('box-with-border');
        element.innerHTML = data.content;
        document.querySelector('.left .box-with-border.orange').insertAdjacentElement('beforebegin', element);
        const oldTitle = document.querySelector('.text h3');
        oldTitle.parentNode.removeChild(oldTitle);
        const newtitle = document.createElement('h2');
        newtitle.textContent = 'What\'s Included?';
        document.querySelector('.text').insertAdjacentElement('afterbegin', newtitle);
      }
    } else {
    /**
     * if not use the localstorage variable to check if
     * the content we have cached is the same as the clicked button
     */
    console.log('else');
    const clickedHoliday = JSON.parse(localStorage.getItem('clickedHoliday'));
    if (data && data.title === clickedHoliday) {
      const element = document.createElement('div');
      element.classList.add('box-with-border');
      element.innerHTML = data.content;
      document.querySelector('.left .box-with-border.orange').insertAdjacentElement('beforebegin', element);
      const oldTitle = document.querySelector('.text h3');
      oldTitle.parentNode.removeChild(oldTitle);
      const newtitle = document.createElement('h2');
      newtitle.textContent = 'What\'s Included?';
      document.querySelector('.text').insertAdjacentElement('afterbegin', newtitle);
    }
    }
}
export {
  setup,
  storeTourData,
  initTest
}; // eslint-disable-line
