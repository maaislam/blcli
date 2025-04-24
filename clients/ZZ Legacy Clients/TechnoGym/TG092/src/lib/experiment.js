/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import HeroBanner from './components/topHeader';
import PageContent from './components/pageMarkup';
import innerContent from './components/innerContent';
import gridImagesSection from './components/gridImagesSection';

const activate = () => {
  setup();
  const topHeader = new HeroBanner();
  const pageMarkup = new PageContent();

  // add the grid images
  gridImagesSection();

  // add inner content
  innerContent();
};

export default activate;
