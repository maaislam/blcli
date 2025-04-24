import shared from "../../../../../core-files/shared";
import { featuredProductsData } from "../lib/featuredProductsData";


const { ID, VARIATION } = shared;
const data = featuredProductsData;


const featuredProductSection = (targetPage) => {
    const filteredData = data.filter((item) => item.targetPage === targetPage);
    //desktop
    const featuredContents = () => {
        let r_string = "";
    
        filteredData?.forEach((data) => {
          r_string =
            r_string +
            `               
            <div class="${ID}__featured_primary_product">
                <a href="${data?.featuredBannerContents?.primaryProductHref}">
                    <img src="${data?.featuredBannerContents?.primaryProductImg}"></img>
                </a>
                
            </div>
            <div class="${ID}__promotional_section">
                <div class="${ID}__promotional_section_wrapper">
                    <div class="${ID}__promotional_section">
                        <div class="${ID}__product_summery">
                            <span class="${ID}__title">${data?.featuredBannerContents?.title}</span>
                            <p class="${ID}__subtitle">${data?.featuredBannerContents?.subtitle}</p>
                        </div>
                        <div class=${ID}__product_details>
                            <div class="${ID}__header__container">
                                <p class="${ID}__title">${data?.featuredBannerContents?.promotionalHeader}</p>
                                <p class="${ID}__subtitle">${data?.featuredBannerContents?.promotionalDetails}</p>
                            </div>
                            <div class="${ID}__product_img">
                                <img src="${data?.featuredBannerContents?.promotionalImg}"></img>
                            </div>
                        </div>
                    </div>         
                </div>
            </div>
            <div class="${ID}__secondary_product_container">
                <div class=${ID}__secondary_product_wrapper>
                    <div class="${ID}__product">
                        <img class="${ID}__product_img" src="${data?.featuredBannerContents?.seceondaryProductImg}"></img>
                        <p class="${ID}__product_name">${data?.featuredBannerContents?.secondaryProductName}</p>
                        <p class="${ID}__product_price">${data?.featuredBannerContents?.secondaryProductPrice}</p>
                    </div>
                    
                </div>
            </div>          
            `;
        });
    
        return r_string;
    };

    //mobile

    const featuredContentsForMobile = () => {
        let r_string = "";
    
        filteredData?.forEach((data) => {
          r_string =
            r_string +
            `               
            <div class="${ID}__featured_products_mobile">
                <div class="${ID}__shop_all_link">
                    <a href="${data?.featuredBannerContents?.shopAllLinkForMobile}"><span>shop all</span></a>
                </div>
                <div class="${ID}__product_contents_wrapper">
                    <div class="${ID}__product_contents">
                        <div class="${ID}__title">${data?.featuredBannerContents?.titleForMobile}</div>
                        <div class="${ID}__product_gallery">
                            <div class="${ID}__featured_primary_product">
                                <div class="${ID}__product_background">
                                    <a href="${data?.featuredBannerContents?.primaryProductHref}">
                                        <img src="${data?.featuredBannerContents?.primaryProductImg}"></img>
                                    </a>
                                </div>                            
                            </div>
                            <div class="${ID}__secondary_product_container">
                                <div class=${ID}__secondary_product_wrapper>
                                    <div class="${ID}__product">
                                        <img class="${ID}__product_img" src="${data?.featuredBannerContents?.seceondaryProductImg}"></img>
                                        <p class="${ID}__product_name">${data?.featuredBannerContents?.secondaryProductName}</p>
                                        <p class="${ID}__product_price">${data?.featuredBannerContents?.secondaryProductPrice}</p>
                                        <p class="${ID}_price_details">${data?.featuredBannerContents?.secondaryProductPriceDeatilsForMobile}</p>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                        
                        <div class="${ID}__promotional_section">                           
                            <div class="${ID}__header__container">
                                <p class="${ID}__title">${data?.featuredBannerContents?.promotionalHeader}</p>
                                <p class="${ID}__subtitle">${data?.featuredBannerContents?.promotionalDetails}</p>
                            </div>
                            <div class="${ID}__product_img">
                                <img src="${data?.featuredBannerContents?.promotionalImg}"></img>
                            </div>                                
                        </div> 
                    </div>
                </div>
                
                
                 
                         
            </div>
                   
            `;
        });
    
        return r_string;
    };

    const htmlStr = `
        <div class="${ID}__featured_product_container">
            ${window.innerWidth > 640 ? featuredContents() : featuredContentsForMobile()}
        </div>
        
        
        `;
    return htmlStr.trim();
};

export default featuredProductSection;
