import shared from "../../../../../../core-files/shared";

//***************variation_1 start **************//

const stockMsg = (skuAvailabilityCollcetion, location, stockAmount) => {
    const msg = skuAvailabilityCollcetion === "AvailableToday" ? "Click and collect as 1 minute" : "Next day click and collect available";
    
    const htmlStr = `
    <div class="${shared.ID}__sl_msg_wrapper">
        <div class="${shared.ID}__pointer">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="12 12.255141258239746 344 49.74485778808594" fill="none">\n            <g filter="url(#filter0_d_29_332)">\n            <path d="M12 21C12 19.3431 13.3431 18 15 18H83.9038C84.2974 18 84.6872 17.9225 85.0509 17.7721L97.8325 12.4831C98.5791 12.1742 99.4187 12.1794 100.161 12.4977L112.434 17.7574C112.807 17.9175 113.209 18 113.616 18H353C354.657 18 356 19.3431 356 21V59C356 60.6569 354.657 62 353 62H15C13.3431 62 12 60.6569 12 59V21Z" fill="white"></path>\n            <path d="M12.5 21C12.5 19.6193 13.6193 18.5 15 18.5H83.9038C84.363 18.5 84.8177 18.4096 85.2421 18.2341L98.0237 12.9451C98.6458 12.6877 99.3455 12.6921 99.9644 12.9573L112.237 18.217C112.673 18.4037 113.142 18.5 113.616 18.5H353C354.381 18.5 355.5 19.6193 355.5 21V59C355.5 60.3807 354.381 61.5 353 61.5H15C13.6193 61.5 12.5 60.3807 12.5 59V21Z" stroke="#7EB344"></path>\n            </g>\n            <defs>\n            <filter id="filter0_d_29_332" x="0" y="0.255157" width="368" height="73.7448" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>\n            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>\n            <feOffset></feOffset>\n            <feGaussianBlur stdDeviation="6"></feGaussianBlur>\n            <feComposite in2="hardAlpha" operator="out"></feComposite>\n            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>\n            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_29_332"></feBlend>\n            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_29_332" result="shape"></feBlend>\n            </filter>\n            </defs>\n            </svg>
        </div>
        <div class=${shared.ID}__main_container>
            <div class="${shared.ID}__stock"> ${stockAmount} currently stock at ${location}.</div>
            <div class="${shared.ID}__msg">${msg} </div>
        </div>
        
    </div>`;
    return htmlStr.trim();
  };

  
export default stockMsg;
//***************variation_1 end**************//
  

  

