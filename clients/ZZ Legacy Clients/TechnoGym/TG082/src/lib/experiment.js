/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import TopHeader from './components/topHeader/topHeader';
import Form from './components/form/form';
import { getLanguage } from './helpers';

const activate = () => {
  setup();

  document.body.classList.add(`TG082-${getLanguage()}`);
  // Experiment code
  const topHeader = new TopHeader();

  const newForm = new Form();
};

export default activate;
