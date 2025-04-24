import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


if (!localStorage.getItem('AC034-Searchbox-Shown-V2')) {
  flicker();

  poller([
    '#search-bar-body',
    '#search-bar-header',
    () => {
      // Check if searchbox has been shown by attempting to retrieve local storage item
      let displaySearchBox = false;
      if (window.jQuery) {
        displaySearchBox = true;
      }
      return displaySearchBox;
    },
  ], run);
}
