const progressBar = (id, progressWidth, deductedPrice, isThresholdMet) => {
  const message = isThresholdMet
    ? `You’re <strong>£${deductedPrice}</strong> away from <strong>FREE standard delivery</strong>`
    : "Congratulations! You've Unlocked Free Shipping";
  const htmlStr = `<div class='${id}__discountProgressContainer'>
                        <div class="${id}__discountProgressWrapper">
                            <p class='${id}__shippingMessage'>${message}</p>
                            <div class='${id}__discountProgress'>
                                <div class="${id}__discountProgress-bar" style='width:${progressWidth}%'></div>
                            </div>
                        </div>
                        <div class="${id}__empty"></div>
                 </div>
    `;
  return htmlStr;
};

export default progressBar;
