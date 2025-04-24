import quantitySelector from './quantitySelector';

const productCard = (ID, cardData) => {
  const {
    Id,
    Name,
    PriceFormatted,
    ListPriceFormatted,
    SalePrice,
    ListPrice,
    ProfileNumber,
    slug,
    SingleVariantSku,
    PricePerUnitInformation,
    UnitPriceFormatted,
    UnitPriceMeasureUnit,
  } = cardData;

  const htmlStr = `

    <div class="${ID}-product">

        <a href="/product/${Id}/${slug}" class="${ID}-product--image">
        
        <img src="/assets/en-gb/images/product/prod_${ProfileNumber}_1_613x613.jpg" alt="${Name}" class="${ID}-product--image--img" />
        
        </a>

        <div class="${ID}-product--content">
        
        <a href="/product/${Id}/${slug}"> ${Name} </a>
        
        <div class="${ID}-product--contentprice">
            <span class="${ID}-nowprice">${PriceFormatted}</span>
            ${SalePrice && ListPrice > SalePrice ? `<span class="${ID}-wasprice">${ListPriceFormatted}</span>` : ''}
            
        </div>

        <div class="${ID}-product--contentamount">${PricePerUnitInformation} (${UnitPriceFormatted} / ${UnitPriceMeasureUnit})</div>
        
        </div>
        <div class="${ID}-product-qty">
        ${quantitySelector(ID)}
        </div>

        <div class="${ID}-product--atb" data-sku="${SingleVariantSku}">

        <div class="${ID}-product--atbbutton" >
        
            <a href="/product/${Id}/${slug}" class="${ID}-addtobasket">Add To Bag</a>

        </div>

        </div>

    </div>`;
  return htmlStr.trim();
};

export default productCard;
