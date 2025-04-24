/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import abovethefold from './components/abovethefold';
import form from './components/form';
import belowthefold from './components/belowthefold';
import usps from './components/usps';

const activate = () => {
  setup();
  // above the fold & form
  abovethefold();
  form();

  // below the fold
  belowthefold();
  usps();
  // Experiment code
};

export default activate;
