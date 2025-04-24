import settings from '../settings';
import holdingPageContent from './holdingPageContent';
import countdown from './countdown';
import scratchcardPage from './scratchcardPage';

export default () => {
  holdingPageContent();
  countdown();
  if (settings.VARIATION === '2') {
    scratchcardPage();
  }
};

