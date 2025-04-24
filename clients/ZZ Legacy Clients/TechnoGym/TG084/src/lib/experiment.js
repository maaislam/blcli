/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import PageMarkup from './generalMarkup';
import TopHeader from './components/topHeaderContent/topheader';
import TopBar from './components/topCategoryBar/topBar';
import AddProducts from './components/treadmillProducts/products';
import Lightbox from './components/form/formLightbox';
import settings from './settings';
import topBarAnchor from './components/topCategoryBar/topBarAnchor';
import ContactBlock from './components/contactBlock/contactBlock';
import formSubmit from './components/form/formSubmit';

const activate = () => {
  setup();

  const pageContent = new PageMarkup();
  const topContent = new TopHeader();
  const categoryBar = new TopBar();
  const products = new AddProducts();
  const formLightbox = new Lightbox(settings.ID, {
    content: `<div class="${settings.ID}-Lightbox_loader"><span></span></div>
    <div class="${settings.ID}-success_message"><span>Thanks, we will contact you as soon as possible</span></div>
    <h3>Fill in the form</h3><div class="${settings.ID}-lightboxForm"></div>`,
  });

  const contactblock = new ContactBlock();

  // add the top bar scroll
  topBarAnchor();

  formSubmit();
};

export default activate;
