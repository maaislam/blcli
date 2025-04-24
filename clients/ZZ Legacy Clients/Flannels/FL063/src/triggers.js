import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.existingCustomer .NewCustWrap span.ImgButWrap > a.dnnPrimaryAction',
], activate);
