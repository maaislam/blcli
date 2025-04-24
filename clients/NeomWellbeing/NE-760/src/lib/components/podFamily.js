const podFamily = (id, data) => {
  const { srcset, imageUrl, productName, description, price, shopUrl, learnMoreUrl, align, classes } = data;

  const htmlStr = `
    <div class="${id}__imageWrapper">
        <img sizes="77.4vw"
            srcset="${srcset}"
            src="${imageUrl}"
            aria-label="${productName}" 
            alt="${productName}" 
            loading="eager" 
            decoding="sync"
        >
        <div class="${id}__productDetailsWrapper ${id}__productDetailsWrapper-${align} ${id}__${classes}">
            <div class="${id}__productDetails">
                <h2 class='${id}__productTitle'>${productName}</h2>
                <p class='${id}__productDescription'>${description}</p>
                <p class='${id}__price'>From ${price}</p>
                <a class='${id}__shopNowCta' href="${shopUrl}">SHOP NOW</a>
                <a class='${id}__learnMoreCta' href="${learnMoreUrl}" target="_blank" tabindex="0">LEARN MORE</a>
            </div>
        </div>
    </div>
    `;
  return htmlStr;
};
export default podFamily;
