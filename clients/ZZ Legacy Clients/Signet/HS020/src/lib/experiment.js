/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import ReviewBlock from './components/reviewBlock';

const activate = () => {
  setup();
  const reviews = new ReviewBlock();

  const financeMessage = document.querySelector('.buying-buttons-ifc__message');
  if (financeMessage) {
    document.querySelector('.buying-buttons-ifc__button').insertAdjacentElement('afterend', financeMessage);
  }
};

export default activate;
