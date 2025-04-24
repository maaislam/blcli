import { fireEvent } from "../../../../../../core-files/services";
import { setCookie } from "../helpers/utils";

const crmInput = (ID) => {
  const crmButton = document.querySelector(`.${ID}-crm-button`);
  const crmContainer = document.querySelector(`.${ID}-crm-container`);
  const crmResult = document.querySelector(`.${ID}-crm-result`);

  crmButton.addEventListener('click', () => {
    const email = window.globalDataLayer.bookedEmail;
    
    window.Moengage.add_unique_user_id(email).then((res) => {
      window.Moengage.add_user_attribute("moe_unsubscribe", false);
      window.Moengage.add_user_attribute("src", "amends-page");
      window.Moengage.add_email(email);
      window.Moengage.add_user_attribute("emailpermit", true);
    })
      .then(() => {
        crmContainer.style.display = 'none';
        crmResult.style.display = 'flex';
        setCookie(`${ID}-show`, 'true', 365);
        fireEvent('Click - Moengage user subscribed');
      });
  });
}

export default crmInput;