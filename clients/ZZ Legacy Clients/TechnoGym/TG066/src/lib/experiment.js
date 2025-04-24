/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import StickyTab from './components/stickyTab/stickyTab';
import SlideOutTab from './components/form/slideOutTab';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const stickyTab = new StickyTab();

  pollerLite(['.TG066_stickyTab'], () => {
    const innerForm = new SlideOutTab();
  });

  // Experiment code
};

export default activate;
