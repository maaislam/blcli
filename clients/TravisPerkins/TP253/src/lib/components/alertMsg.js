import shared from '../../../../../../core-files/shared';
import { isMobile } from '../helpers/utils';
const { ID } = shared;

const alertMsg = () => {
  const htmlStr = ` <div class="${ID}__low_stock_alert_container ${ID}__arrow_top">
                      <div class="${ID}__img_wrapper">
                        <img src="https://sb.monetate.net/img/1/c/thumbnail/2908/6.11.eJwNjsEOgyAQBf9lzxREUYFfaRpjZSMkKgS2tYnx38th8pJ5l7nAY1g9ge1GBinjN-A5LfEg_FV5wbLFgoWmQjFjPWJ2BexTNbwZVdexx9jzVhtt5ItBxj0STrNzGSxIabhUusJbZeBm8Mlb9Z4oWSHKm-_xQJoJeR0R9lVI0Wsp1NAMUhuejhUYnMGRr33t_QfniTVZ.y_9Up4RwvIlARGB0EfsueX5XO-ulSVxJiKDtE-6PhIo/32x37.png"></img>
                        <span>Low Stock</span>
                      </div>
                      <div class="${ID}__alert_msg">Reserve online now and know it’ll be there when you arrive.</div>
                    </div>`;

const htmlStr_mobile = `<div class="${ID}__low_stock_alert_container ${ID}__arrow_top">
                          <div class="${ID}__img_wrapper">
                            <img src="https://sb.monetate.net/img/1/c/thumbnail/2908/6.11.eJwNjsEOgyAQBf9lzxREUYFfaRpjZSMkKgS2tYnx38th8pJ5l7nAY1g9ge1GBinjN-A5LfEg_FV5wbLFgoWmQjFjPWJ2BexTNbwZVdexx9jzVhtt5ItBxj0STrNzGSxIabhUusJbZeBm8Mlb9Z4oWSHKm-_xQJoJeR0R9lVI0Wsp1NAMUhuejhUYnMGRr33t_QfniTVZ.y_9Up4RwvIlARGB0EfsueX5XO-ulSVxJiKDtE-6PhIo/32x37.png"></img>                      
                          </div>
                          <div class="${ID}__alert_msg">
                            <span class="${ID}__alert">Low Stock</span>
                            <span>Reserve online now and know it’ll be there when you arrive.</span>
                          </div>
                        </div>`;                  

  return isMobile() ?  htmlStr_mobile.trim() : htmlStr.trim();
};
export default alertMsg;
