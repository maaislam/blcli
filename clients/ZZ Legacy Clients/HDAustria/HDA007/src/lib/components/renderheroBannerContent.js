const renderHeroBannerContent = (id, data) => {
  const htmlStr = `
        <div class="${id}__herobanner--container swiper">
            <div class="${id}__herobanner--wrapper swiper-wrapper">
                
            </div>
            <div class="${id}__herobanner--pagination"></div>

      
            <div class="${id}__herobanner--btn-prev"></div>
            <div class="${id}__herobanner--btn-next"></div>

        </div>`;

  document.querySelectorAll('#page-wrapper > section')[0].insertAdjacentHTML('beforebegin', htmlStr);
  document.querySelectorAll('#page-wrapper > section')[0].style.display = 'none';

  const imgContainers = document.querySelector(`.${id}__herobanner--wrapper`);

  data.forEach((item, i) => {
    const imgWrapper = (item) => `
    
                <div class="${id}__herobanner--slider swiper-slide">

                        <div class="${id}__herobanner--img" >
                        
                        <img src="${item}" style="margin: 0;max-width:100%;" />
                        
                        <div class="${id}__herocontent--container">
                        <div class="title">ENTDECKE HD<br/>AUSTRIA</div>
                        <div class="subtitle">Ab nur € 9,90 pro Monat!</div>
                        <div class="btn-container">
                            <a href="https://hdaustria.page.link/pennyworth" target="_blank">LOSLEGEN</a>
                            <a href="#HDA007-highlight__section">Mehr erfahren</a> 
                        </div></div>
                    </div>
                </div>
    `;

    imgContainers.insertAdjacentHTML('afterbegin', imgWrapper(item));
  });
};

export default renderHeroBannerContent;
