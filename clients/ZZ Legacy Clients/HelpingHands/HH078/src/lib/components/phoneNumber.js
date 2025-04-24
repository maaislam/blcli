const phoneNumber = (id, data) => {
  const existingDOM = document.querySelectorAll(`.${id}__phone-container`);
  existingDOM.forEach((item) => {
    item?.remove();
  });

  const controlnumber = document.querySelector(
    `.InfinityNumber${location.pathname !== '/' ? '' : '[data-ict-discovery-number]'}`
  ).innerText;
  // console.log('ahdiahdi', controlnumber);
  // console.log('phoneNumber', data);
  const phNum = data ? data.phone : controlnumber;

  const htmlStr = `
    <div class="${id}__phone-container">
        <span class="${id}__welcome-text">Looking for care</span>
        <div class="${id}__phone-container--wrapper">

            <div class="${id}__display-number">
                <div class="cta-button">
                    <span class="cta-button-icon">
                        <i class="fa fa-phone"></i>
                    </span>          
                    <a href="tel:${phNum}">${phNum}</a>
                </div>
                <span class="${id}__info-icon">
                    <i class="fa fa-info "></i>
                </span>
                <span class="${id}__phone-close-btn">
                   
                </span>
            </div>
            <div class="${id}__openinghrs-container">
                <div class="title">Opening hours</div>
                <div class="text1">
                    Mon-Fri: 8am - 7pm
                </div>
                <div class="text2">
                    Sat-Sun: 9am - 6pm
                </div>
            </div>

        </div> 
    </div>`;

  document.querySelector(`.${id}__search-wrapper`).insertAdjacentHTML('afterend', htmlStr);

  document.querySelector(`.${id}__info-icon`).addEventListener('mouseenter', (e) => {
    document.querySelector(`.${id}__phone-container--wrapper`).classList.add('hovered');
  });
  document.querySelector(`.${id}__phone-container--wrapper`).addEventListener('mouseleave', (e) => {
    e.target.classList.remove('hovered');
  });
  document.querySelector(`.${id}__phone-close-btn`).addEventListener('click', (e) => {
    if (e.target.closest(`.${id}__phone-close-btn`) || e.target.matches(`.${id}__phone-close-btn`)) {
      e.target.closest(`.${id}__phone-container--wrapper`).classList.remove('hovered');
    }
  });
};

export default phoneNumber;
