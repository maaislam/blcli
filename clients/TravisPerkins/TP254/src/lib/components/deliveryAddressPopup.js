import shared from '../../../../../../core-files/shared';
import { isMobile } from '../helpers/utils';
const { ID } = shared;

const deliveryAddressPopUp = () => {
  const htmlStr_desktop = ` <div class="${ID}__delivery_address_popup">
                              <div class=${ID}__icon_close>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <path d="M2.80185 0.818182L4.30398 3.67862L5.84339 0.818182H8.17116L5.80078 4.90909L8.23509 9H5.91797L4.30398 6.17152L2.71662 9H0.372869L2.80185 4.90909L0.458097 0.818182H2.80185Z" fill="#636F7E"/>
                                </svg>
                              </div>
                              <div class="${ID}__contents_wrapper">
                                <div class="${ID}__content_summery">
                                  <h2 class="${ID}__content_header">Our stock and product range depends on your location</h2>
                                  <div class=${ID}__content_details>
                                    <div>
                                      <img src="http://sb.monetate.net/img/1/581/4606163.png"></img>
                                      <span>See the products available to you</span>
                                    </div>
                                    <div>
                                      <img src="http://sb.monetate.net/img/1/581/4606163.png"></img>
                                      <span>Check stock levels at your local branch</span>
                                    </div>
                                    <div>
                                      <img src="http://sb.monetate.net/img/1/581/4606163.png"></img>
                                      <span>See accurate delivery times locally</span>
                                    </div>
                                  </div>
                                </div>
                                <div class="${ID}__content_postcode">
                                  <div class="${ID}__current_location_btn">
                                    <img src="https://sb.monetate.net/img/1/c/thumbnail/2908/6.11.eJwNidEKgyAUQP_lPjtNs1J_ZYxoeUmhMvRuDaJ_nw-HA-dcEDAugcDpnsGR8RvxHOe0E_5qvGBeU8FCY6GUsY6UfQH31A1vBt227DF0XBlrrHwxyLglwnHyPoMDKS2X2lS40hZuBp-81h6IDidEefMt7UgTIa8ScVuEFJ2RQvfKml7xY1-AwRk9BXBKq_sPHTE1jw.Prifw66MhX7pfVk3Ixk5AL0oT3JGX7vTNutaPXhZCrY/242x46.png"></img>
                                    <div class="${ID}__current_location_text">Use my current location</div>
                                  </div>
                                  <span>or</span>
                                  <div class="${ID}__enter_postcode_btn">
                                    <div class="${ID}__postcode_search">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                      <path d="M13.0176 13.5L18.5 18.9824M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="#636F7E" stroke-width="2"/>
                                      </svg>
                                    </div>                                    
                                    <span>Enter Postcode</span>
                                  </div>
                                </div>
                              </div>                      
                            </div>`;

  const htmlStr_mobile = `<div class="${ID}__delivery_address_popup">
                          <div class=${ID}__icon_close>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M2.80185 0.818182L4.30398 3.67862L5.84339 0.818182H8.17116L5.80078 4.90909L8.23509 9H5.91797L4.30398 6.17152L2.71662 9H0.372869L2.80185 4.90909L0.458097 0.818182H2.80185Z" fill="#636F7E"/>
                            </svg>
                          </div>
                          <h2 class="${ID}__content_header">Our stock and product range depends on your location</h2>
                          <div class="${ID}__contents_wrapper">
                            <div class="${ID}__content_summery">
                              <div class=${ID}__content_details>
                                <div>
                                  <img src="http://sb.monetate.net/img/1/581/4606163.png"></img>
                                  <span>See the products available to you</span>
                                </div>
                                <div>
                                  <img src="http://sb.monetate.net/img/1/581/4606163.png"></img>
                                  <span>Check stock levels at your local branch</span>
                                </div>
                                <div>
                                  <img src="http://sb.monetate.net/img/1/581/4606163.png"></img>
                                  <span>See accurate delivery times locally</span>
                                </div>
                              </div>
                            </div>
                            <div class="${ID}__content_postcode">
                              <div class="${ID}__current_location_btn">
                                <img src="https://sb.monetate.net/img/1/c/thumbnail/2908/6.11.eJwNidEKgyAUQP_lPjtNs1J_ZYxoeUmhMvRuDaJ_nw-HA-dcEDAugcDpnsGR8RvxHOe0E_5qvGBeU8FCY6GUsY6UfQH31A1vBt227DF0XBlrrHwxyLglwnHyPoMDKS2X2lS40hZuBp-81h6IDidEefMt7UgTIa8ScVuEFJ2RQvfKml7xY1-AwRk9BXBKq_sPHTE1jw.Prifw66MhX7pfVk3Ixk5AL0oT3JGX7vTNutaPXhZCrY/242x46.png"></img>
                                <div class="${ID}__current_location_text">Use my current location</div>
                              </div>
                              <span>or</span>
                              <div class="${ID}__enter_postcode_btn">
                                <div class="${ID}__postcode_search">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                  <path d="M13.0176 13.5L18.5 18.9824M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="#636F7E" stroke-width="2"/>
                                  </svg>
                                </div>                                    
                                <span>Enter Postcode</span>
                              </div>
                            </div>
                          </div>                      
                          </div>`;

  return isMobile() ? htmlStr_mobile.trim() : htmlStr_desktop.trim();
};
export default deliveryAddressPopUp;
