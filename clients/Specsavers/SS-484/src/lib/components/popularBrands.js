const popularBrands = (id) => {
  const htmlStr = `<div class="${id}__popular_brand_list_container">
                        <div class="container">
                            <div class="${id}__popular_brand_title">Our most popular brands</div>
                            <div class="${id}__brand_tabs_wrapper" data-activebrand="designer">
                                <div class="${id}__brand_tab active" data-brand="designer"><span>Designer brands</span></div>
                                <div class="${id}__brand_tab" data-brand="women"><span>Women's brands</span></div>
                                <div class="${id}__brand_tab" data-brand="men"><span>Men's brands</span></div>
                            </div>
                        </div>
                    </div>`;

  return htmlStr.trim();
};
export default popularBrands;
