const renderCtaBlock = (id, anchorElem, parentElem) => {
  parentElem.querySelector(`.${id}__ctablock`)?.remove();
  const htmlStr = `
        <div class="${id}__ctablock">
        
        <ul>
            <li class="${id}__location">
                <svg class="icon"
                    focusable="false">
                    <use xlink:href="#location-bold"
                        href="#location-bold"></use>
                </svg>
                <span>Waar te koop</span>
            </li>
            <li class="${id}__compare"><svg class="icon"
                    focusable="false">
                    <use xlink:href="#compare-bold"
                        href="#compare-bold"></use>
                </svg><div>Vergelijk</div></li>
            
            <li class="${id}__wishlist">
                <svg class="icon unselect"
                    focusable="false"
                    aria-hidden="true">
                    <use xlink:href="#wishlist-unselect-regular"
                        href="#wishlist-unselect-regular"></use>
                </svg>
               
            </li>
            
        </ul>
        
        </div>
    `;
  anchorElem.insertAdjacentHTML('beforeend', htmlStr);
};
export default renderCtaBlock;
