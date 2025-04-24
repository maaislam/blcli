/**
 * EJ001 - Navigation / Header Redesign
 */
import Header from './components/Header/component';
import { setup } from './services';

const Experiment = {
  settings: {
    ID: 'EJ001',
    VARIATION: '2',
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
