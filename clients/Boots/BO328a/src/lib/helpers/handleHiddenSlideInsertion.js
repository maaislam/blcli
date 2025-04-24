const handleHiddenSlideInsertion = (id, productCount) => {
    // Check if productCount is not divisible by 3
    if (productCount % 3 !== 0) {
        const htmlStr = `<div target="_blank" class="${id}-personalised--product swiper-slide ${id}-hidden-slide" role="group">
            <div class="${id}-personalised--product--image">
                <a class="${id}-personalised--product--link" href="/boots-ibuprofen-tablets-200mg-16s-10267906">
                    <div class="${id}-roundel_section">
                        <span class="${id}-offer_notify">Offer</span>
                    </div>
                    <img src="https://boots.scene7.com/is/image/Boots/10267906?op_sharpen=1"
                        alt="Boots Ibuprofen Tablets 200mg 16 Tablets image">
                </a>
            </div>
            <div class="${id}-personalised--product--content">
                <h4>Boots Ibuprofen Tablets 200mg 16 Tablets</h4>
                <a href="/boots-ibuprofen-tablets-200mg-16s-10267906#criteoSpContainer"
                    class="${id}-personalised--product--rating" data-rating="4">
                    <div data-bv-show="inline_rating" data-bv-product-id="2302622" data-bv-ready="true">
                        
                    </div>
                </a>
                <div class="${id}-priceContainer">
                    £0.55


                </div>


                <p class="${id}-volume">16UNI | £0.03 per 1UNI</p>
                <a href="/boots-ibuprofen-tablets-200mg-16s-10267906" class="${id}-personalised--product--add ${id}-primary"
                    data-model="10267906" data-name="Boots Ibuprofen Tablets 200mg 16 Tablets" data-object="10267906">VIEW
                    PRODUCT</a>
            </div>
        </div>`;
        return htmlStr;
    }
    
    return null;
};

export default handleHiddenSlideInsertion;
