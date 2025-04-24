/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import PageMarkup from './pageMarkup';
import AddProducts from './components/carousel/treadmills';
import Lightbox from './components/form/formLightbox';
import settings from './settings';
import formSubmit from './components/form/formSubmit';


const activate = () => {
  setup();

  // TO DO
  const pageContent = new PageMarkup();
  const addTreadmills = new AddProducts();

  const formLightbox = new Lightbox(settings.ID, {
    content: `<div class="${settings.ID}-Lightbox_loader"><span></span></div>
    <div class="${settings.ID}-success_message"><span>Thanks, we will contact you as soon as possible</span></div>
    <h3>Fill in the form</h3><div class="${settings.ID}-lightboxForm"></div>`,
  });
  
  formSubmit();
};

export default activate;
