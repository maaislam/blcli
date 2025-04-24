const highlightCarousel = (data, id, fireEvent) => {
  const card = (item) =>
    `
            <div class="${id}__carouselcard swiper-slide">
                <div class="${id}__carouselcard--image"><img src="${item.imageUrl}" alt="${item.title}" /></div>
                <div class="${id}__carouselcard--title">${item.title}</div>
                <div class="${id}__carouselcard--subtitle">${item.subTitle}</div>
            </div>`;

  const cards = data.map((item) => card(item)).join('\n');

  const highlightContent = `
        <section id="${id}-highlight__section" class="${id}-highlight__section">
        <div class="${id}-highlight__container container">
            <div class="${id}-highlight__container--title">Internationale Filme & Serien ab nur € 9,90 pro Monat</div>
            <div class="${id}-highlight__container--subtitle">Mit HD Austria genießt du eine unglaubliche Auswahl an spannenden Sendungen, Filmen und Serien. Ob du Fernsehen klassisch über SAT empfängst oder über Internet streamst – in unseren vielfältigen Paketen ist garantiert für jeden was dabei!</div>
            <div class="${id}-highlight__container--carousel swiper">
              <div class="swiper-wrapper carouselcard__wrapper">${cards}</div>
             
              <div class="${id}__swiper-pagination"></div>
            
              <div class="${id}__swiper-button-prev"></div>
              <div class="${id}__swiper-button-next"></div>
            </div>
            <a href="/pakete" class="${id}-highlight__container--btn">Pakete entdecken</a>
        </div>
        </section>
    `;

  document.querySelector('#packages').insertAdjacentHTML('afterend', highlightContent);
  document.querySelector(`.${id}-highlight__container--btn`).addEventListener('click', () => {
    fireEvent(`customer has clicked discover all packages button`);
  });
};
export default highlightCarousel;
