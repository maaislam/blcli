import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
  	return document.readyState == "complete";
  }
  
], activate);
