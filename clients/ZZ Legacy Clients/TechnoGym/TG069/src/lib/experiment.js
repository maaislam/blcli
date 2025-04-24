/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import topContent from './components/aboveTheFold/topContent';
import generalMarkup from './components/belowTheFold/generalMarkup';
import { getLanguage } from './helpers';


const activate = () => {
  document.body.classList.add(`TG069-${getLanguage()}`);

  setup();
  // above the fold
  topContent();

  // below the fold
  generalMarkup();

  //ad hoc changes
  
  // Experiment code
};

export default activate;
