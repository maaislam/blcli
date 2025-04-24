/**
 * TP146d - Decking calculator
 * @author User Conversion
 */
import { setup } from './services';
import DeckingCalculator from '../components/DeckingCalculator/DeckingCalculator';

const activate = () => {
  setup();
  new DeckingCalculator();
};

export default activate;
