import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { addCssToPage, addJsToPage } from './lib/helpers/utils';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const { ID } = shared;

if (!ieChecks) {
  const glideJs = 'https://cdn.jsdelivr.net/npm/@glidejs/glide@3.6.2/dist/glide.min.js';
  const glideCss = 'https://cdn.jsdelivr.net/npm/@glidejs/glide@3.6.2/dist/css/glide.core.min.css';

  addCssToPage(glideCss, `${ID}__glideCss`);
  addJsToPage(glideJs, `${ID}__glideJs`).then(() => {
    pollerLite(['body'], activate);
  });

}
