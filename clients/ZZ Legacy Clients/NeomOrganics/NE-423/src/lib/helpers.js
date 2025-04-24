import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import data from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

// export const getUrlParameter = (name, url) => {
//   if (!url) {
//     url = window.location.href;
//   }
//   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,'\\\]');
//   const regexS = `[\\?&]${name}=([^&#]*)`;
//   const regex = new RegExp(regexS);
//   const results = regex.exec(url);
//   return results == null ? null : results[1];
// };