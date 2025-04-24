/**
 * RC053 - Usability iteration on homepage search
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import RC026_content from './RC026/RC026_content';
import state from './state';
import changeElements from './components/changeElements';
import mobile_view from './mobile_view';
import checkPreselectedLocation from './checkPreselectedLocation';
import sendGAEvents from './bindExperimentEvents/sendGaEvents';

const activate = () => {
  setup(); 
  RC026_content;

  if (settings.VARIATION === '1') {
    // Experiment code
    // Get Device Type
    const device = (() => {
      const width = window.innerWidth;
      let deviceType = '';
      if (width <= 450) {
        deviceType = 'mobile';
      } else {
        deviceType = 'desktop';
      }
      return deviceType;
    })();
    
    // Make changes on elements
    changeElements();

    /**
     * @desc Observe Location field and Course Type field 
    **/
    /**** Location Field ****/
    // Check if the location input value is already pre-set
    checkPreselectedLocation();

    pollerLite(['input#main_0_homepagetopcomponents_0_rctcontainer1placeholder_0_rctsubcontainer1placeholder_0_TextBox_AddressOrPostCode'], () => {
      const locationField = document.querySelector('input#main_0_homepagetopcomponents_0_rctcontainer1placeholder_0_rctsubcontainer1placeholder_0_TextBox_AddressOrPostCode');
      if (locationField) {
        const ctaBtnContainer = document.querySelector('.RC022_btnContainer');
        locationField.addEventListener('change', () => {
          if (locationField.value !== '') {
            state.locationChosen = true;
            // Check if user has selected Location and Course Type
            if (state.locationChosen && state.courseTypeChosen) {
              if (ctaBtnContainer) {
                ctaBtnContainer.classList.remove('RC053-disabled');
              }
            }
          } else {
            ctaBtnContainer.classList.add('RC053-disabled');
          }
        });
      }
    });

    /**** Course Type field ****/
    // Remove default course type from step 2a
    pollerLite(['span.RC022_workplace_option.RC022_courseType--active'], () => {
      const defaultSelectedType = document.querySelector('span.RC022_workplace_option.RC022_courseType--active');
      if (defaultSelectedType) {
        defaultSelectedType.classList.remove('RC022_courseType--active');
      }
    });
    observer.connect([document.querySelector('span.RC022_selectCourseType.ui-selectmenu-button.ui-widget.ui-state-default.ui-corner-all.customSecond')], () => {
      const selectField = document.querySelector('span.RC022_selectCourseTypeText.ui-selectmenu-text');
      const selected = selectField.innerText;
      if (selected !== 'Select a course type' && selected !== 'Workplace' && selected !== 'Public') {
        state.courseTypeChosen = true;
      } else {
        state.courseTypeChosen = false;
      }
      // Check if user has selected Location and Course Type
      if (state.locationChosen && state.courseTypeChosen) {
        const ctaBtnContainer = document.querySelector('.RC022_btnContainer');
        if (ctaBtnContainer) {
          ctaBtnContainer.classList.remove('RC053-disabled');
        }
      }
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: true,
      },
    });

    if (device === 'mobile') {
      mobile_view();
    }

    // Send GA Events
    sendGAEvents();
  }
};

export default activate;
