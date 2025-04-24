export const homepageHTML =
    `<div class="WO018_hPage__banner_wrapper">
            <div class="WO018_hPage__header_wrapper">
                <p class="WO018_hPage__header--title">Do you know why you pay less with us?</p>
                <span class="WO018_hPage__header--expendable"></span>
            </div>
            <div class="WO018_hPage__content_wrapper">
                <p class="WO018_hPage__content--firstPar">
                    You'll pay less and get your order faster 
                    because we make all blinds to order, right here in the UK (Yorkshire in fact). This means 
                    we're not delivering from abroad and we can pass the savings on to you.
                </p>
                <p class="WO018_hPage__content--secondPar">
                    Even better, our team in Wakefield are highly skilled specialists. You'll save money but get 
                    a superior product. Win win.
                </p>
            </div>
        </div>`;

export const categorypageHTML = (categoryMsg,  image) => {
        return `<div class="WO018_customThumbnail col-md-4 col-sm-4 col-xs-6">
                    <div class="thumb_container_tbd">
                        <img class="WO018_thumbImage" src="${image}">
                        ${categoryMsg}
                    </div>
                </div>`;
};

export const categoryMsg1 =
                `<div class="WO018_message__wrapper">
                    <p class="WO018_message--header">We pass the savings on to you</p>
                    <p class="WO018_message--container">
                        We manufacture in Yorkshire, saving on delivery costs which we pass on to you.
                    </p>
                </div>`;

export const categoryMsg2 =
                 `<div class="WO018_message__wrapper">
                     <p class="WO018_message--header">Better quality and service</p>
                     <p class="WO018_message--container">
                        Our UK manufacturing team are highly skilled - producing a better product for you.
                     </p>
                </div>`;

export const categoryMsg3 =
                `<div class="WO018_message__wrapper">
                    <p class="WO018_message--header">Faster delivery</p>
                    <p class="WO018_message--container">
                        Each blind is Made-To-Measure here in the UK, meaning we can ship most products next day.
                    </p>
                </div>`;

// Images specific to each category/product message
export const imagesObj = {
    first: '//useruploads.visualwebsiteoptimizer.com/useruploads/198344/images/40c6472b34b6f6ce7495f1202ee97e3d_piggy-bank.png',
    second: '//useruploads.visualwebsiteoptimizer.com/useruploads/198344/images/278368e674bc30fd38791eccaa7dad25_quality.png',
    third: '//useruploads.visualwebsiteoptimizer.com/useruploads/198344/images/1a257b77ec45d53f24672e040ecefc61_logistics-delivery-truck-in-movement.png'
};

const productMsg1 =
                `<img class="WO018_prodImage" src="${imagesObj.first}">
                 <div class="WO018_product_message__wrapper">
                     <p class="WO018_product_message--header">SAVE WITH US</p>
                     <p class="WO018_product_message--container">
                         We manufacture in Yorkshire, saving on delivery costs which we pass on to you.
                     </p>
                 </div>`;

const productMsg2 =
                `<img class="WO018_prodImage" src="${imagesObj.second}">
                 <div class="WO018_product_message__wrapper">
                     <p class="WO018_product_message--header"><a href="https://www.wooden-blinds-direct.co.uk/pages/made-to-measure" target="_blank">BETTER QUALITY AND SERVICE</a></p>
                     <p class="WO018_product_message--container">
                        Our UK manufacturing team are highly skilled - producing a better product for you.
                     </p>
                 </div>`;

const productMsg3 =
                `<img class="WO018_prodImage" src="${imagesObj.third}">
                 <div class="WO018_product_message__wrapper">
                 <p class="WO018_product_message--header">FAST DELIVERY</p>
                 <p class="WO018_product_message--container">
                     Each blind is Made-To-Measure here in the UK, meaning we can ship next day.
                 </p>
             </div>`;

export const productpageHTML =
    `<div class="WO018_prodPage_banner_wrapper">
        <div class="WO018_prodPag_banner--coloumn WO018_coloumn1">
            ${productMsg1}
        </div>
        <div class="WO018_prodPag_banner--coloumn WO018_coloumn1">
            ${productMsg2}
        </div>
        <div class="WO018_prodPag_banner--coloumn WO018_coloumn1">
            ${productMsg3}
        </div>
    </div>`;