import shared from '../../../../../../core-files/shared';
import { isMobile } from '../helpers/utils';
const { ID } = shared;

const searchAddressPopUp = () => {
  const htmlStr_desktop = ` <div class="${ID}__search_delivery_address_popup">
                              <div class=${ID}__search_icon_close>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <path d="M2.80185 0.818182L4.30398 3.67862L5.84339 0.818182H8.17116L5.80078 4.90909L8.23509 9H5.91797L4.30398 6.17152L2.71662 9H0.372869L2.80185 4.90909L0.458097 0.818182H2.80185Z" fill="#636F7E"/>
                                </svg>
                              </div>    
                              <h2>Our stock and product range depends on your location</h2>                 
                            </div>`;                 

  return htmlStr_desktop.trim();
};
export default searchAddressPopUp;
