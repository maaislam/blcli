/**
 * MP130 - Mia Classic star review
 * @author User Conversion
 */
import { setup } from './services';
import PLP from './plp';
import PDP from './pdp';

const activate = () => {
  setup();
  // const { pageType, includedSKUs } = options; // Uncomment for debug
  const pageType = options.state.get('pageType');
  const includedSKUs = options.state.get('includedSKUs');
  switch (pageType) {
    case 'PLP':
      PLP(includedSKUs);
      break;

    case 'PDP':
      PDP(includedSKUs);
      break;

    default:
      break;
  }
};

export default activate;
