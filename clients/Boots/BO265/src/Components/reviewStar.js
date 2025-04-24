const generateReviewIcons = () => {

    const htmlStr = `        
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M10.7716 0.424194L13.1006 7.59286H20.6373L14.54 12.0233L16.869 19.192L10.7716 14.7615L4.67418 19.192L7.00317 12.0233L0.905787 7.59286H8.44257L10.7716 0.424194Z" fill="#05054B"/>
        </svg>
      `;
    return htmlStr;
};

export const reviewStar = (price) => {

    const prod_price = price;

    const parts = prod_price.toString().split('.');
    const firstPortion = parseFloat(parts[0]);
    const secondPortion = parseFloat(`0.${parts[1]}`);
   
    let content = ``;
    for (let i = 0; i < firstPortion; i++) {
        content += generateReviewIcons();

        while (i === firstPortion && secondPortion >= 0.5) {
            content += `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20" fill="none">
            <path d="M10.6412 0.424194V14.7615L4.54378 19.192L6.87278 12.0233L0.775391 7.59286L8.31218 7.59286L10.6412 0.424194Z" fill="#05054B"/>
            </svg>`;
            break;
        }
    }

   
    return content;
};
