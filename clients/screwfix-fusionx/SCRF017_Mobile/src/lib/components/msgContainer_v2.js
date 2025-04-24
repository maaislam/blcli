//***************variation_2 start**************//

import shared from "../../../../../../core-files/shared";

const stockMsg_v2 = (skuAvailabilityCollcetion, location, stockAmount) => {
    const msg = skuAvailabilityCollcetion === "AvailableToday" ? "Click and collect as 1 minute" : "Next day click and collect available";
    
    const htmlStr = `
    <div class="${shared.ID}__v2_sl_msg_wrapper">
        <div class=${shared.ID}__v2_main_container>
            <div class="${shared.ID}__v2_stock"> ${stockAmount} currently stock at ${location}.</div>
            <div class="${shared.ID}__v2_msg">${msg} </div>
        </div>
        
    </div>`;
    return htmlStr.trim();
  };

  export default stockMsg_v2;

//***************variation_2 end**************//