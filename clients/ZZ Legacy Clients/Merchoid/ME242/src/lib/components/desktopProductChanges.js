import shared from "../shared";
import scrollToElement from "./scrollToEl";

export default () => {

    const { ID } = shared;

    // add snippet of product description to the top

    const paragraphs = document.querySelectorAll('.product.description .value > p');
    let paragraphToUse = '';
    let matchingText;

    // if the page has descriptions use the p tags
    if(document.querySelector('.product.description .value > p')) {
        paragraphs.forEach((p) => {
            const paragraphContent = p.textContent.trim();
            if(paragraphContent.length > 10 && !paragraphContent.match(/preorder/i)) {
                paragraphToUse = paragraphContent;
            }
        });
        const regexMatch = paragraphToUse.match(/(^[^\.\?\!]+[\.\?\!]*)/gmi);
        if(regexMatch[0]) {
            matchingText = regexMatch;
        }
    } else { // if not then rely on the meta tag
        paragraphToUse = document.querySelector(`meta[property~="og:description"]`).content;
        matchingText = paragraphToUse.trim().replace(/Preorder[^\n]+/im, '').match(/(^[^\.\?\!]+[\.\?\!]*)/gmi);
    }
    
        
    if(matchingText){
        const productInfoSmall = document.createElement('div');
        productInfoSmall.classList.add(`${ID}-info`);
        productInfoSmall.innerHTML = `<p>${matchingText[0]}</p><span class="${ID}-moreInfo">Read more</span>`;

        document.querySelector('.product-info-price').insertAdjacentElement('afterend', productInfoSmall);
    
        // smooth scroll to product desc
        productInfoSmall.querySelector(`.${ID}-moreInfo`).addEventListener('click', () => {
            document.querySelector(`.${ID}-accordionTab[acc-target="${ID}-description"]`).click();
            scrollToElement(document.querySelector(`.${ID}-description`));
        });      
    }  
}