import shared from "../../../../../../core-files/shared";

const stockMsg = (skuAvailabilityCollcetion, location, stockAmount) => {
    const msg = skuAvailabilityCollcetion === "AvailableToday" ? "Click and collect as 1 minute" : "Next day click and collect available";
    
    const htmlStr = `
    <div class="${shared.ID}__sl_msg_wrapper">
        <div class="${shared.ID}__pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="12 12 275 55.51679992675781" fill="none">
            <g filter="url(#filter0_d_29_320)">
            <path d="M287 58.28C287 59.9369 285.657 61.28 284 61.28L229.849 61.28C229.32 61.28 228.801 61.4196 228.344 61.6846L218.982 67.1122C218.037 67.6599 216.869 67.651 215.933 67.0888L206.972 61.708C206.505 61.4279 205.971 61.28 205.427 61.28L15 61.28C13.3431 61.28 12 59.9368 12 58.28L12 15C12 13.3431 13.3431 12 15 12L284 12C285.657 12 287 13.3432 287 15L287 58.28Z" fill="white"></path>
            <path d="M286.5 58.28C286.5 59.6607 285.381 60.78 284 60.78L229.849 60.78C229.232 60.78 228.627 60.9428 228.093 61.252L218.731 66.6796C217.944 67.1361 216.971 67.1286 216.19 66.6601L207.229 61.2793C206.685 60.9526 206.062 60.78 205.427 60.78L15 60.78C13.6193 60.78 12.5 59.6607 12.5 58.28L12.5 15C12.5 13.6193 13.6193 12.5 15 12.5L284 12.5C285.381 12.5 286.5 13.6193 286.5 15L286.5 58.28Z" stroke="#7EB344"></path>
            </g>
            <defs>
            <filter id="filter0_d_29_320" x="0" y="0" height="79.5168" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
            <feOffset></feOffset>
            <feGaussianBlur stdDeviation="6"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_29_320"></feBlend>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_29_320" result="shape"></feBlend>
            </filter>
            </defs>
            </svg>
        </div>
        <div class=${shared.ID}__main_container>
            <div class="${shared.ID}__stock"> ${stockAmount} currently stock at ${location}.</div>
            <div class="${shared.ID}__msg">${msg} </div>
        </div>
        
    </div>`;
    return htmlStr.trim();
  };
  
export default stockMsg;

