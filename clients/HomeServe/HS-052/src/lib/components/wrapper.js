const wrapper = (id, isExistingPage) => {
  const html = `
  <div class="${id}__container">
  ${
    isExistingPage?.tag
      ? `
      <div class="${id}__tagWrapper">
        <span>${isExistingPage.tag}</span>
      </div>
      `
      : ''
  }
    <div class="${id}__wrapper">
        <div class="${id}__content">
          <div class="${id}__priceWrapper">
            <div class="${id}__price annual ${id}__hide">
              <span class="${id}__text">Annual price</span>
              <span class="${id}__symbol">:</span>
              <span class="${id}__number"></span>
            </div>
            <div class="${id}__price excess ${id}__hide">
              <span class="${id}__text">Your excess
                <span class="icon-hs-info-circle-o ${id}__popup"  tabindex="0" role="button" aria-label="More information on excess"></span>
              </span>
              
              <span class="${id}__symbol">:</span>
              <span class="${id}__number"></span>
            </div>
          </div>
        </div>
        <div class="${id}__image">
          <img class="character-img-desktop" src="https://c.webtrends-optimize.com/acs/accounts/60f9b5b9-87b0-423b-a11d-c5a562f2412f/manager/Lo_Stress-character-new.png" />    
          <img class="character-img-mobile" src="https://c.webtrends-optimize.com/acs/accounts/60f9b5b9-87b0-423b-a11d-c5a562f2412f/manager/lo-stress-character-mobile.png" />    
        </div> 
    </div>
  </div>
  `;
  return html.trim();
};

export default wrapper;
