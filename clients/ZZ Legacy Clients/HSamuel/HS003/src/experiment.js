/**
 * HS003 - Navigation / Header Redesign
 */
import Header from './components/Header/component';
import { setup } from './services';

const Experiment = {
  settings: {
    ID: 'HS003',
    VARIATION: '1',
  },

  elements: {},

  globals: {
    isLoggedIn: undefined,
  },

  init() {
    setup();
    Header.init();
  },
};

export default Experiment;
