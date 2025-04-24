/**
 * TP148d - Paving calculator
 * @author User Conversion
 */
import { setup } from './services';
import PavingCalculator from '../components/PavingCalculator/PavingCalculator';

const activate = () => {
  setup();
  new PavingCalculator();
};

export default activate;
