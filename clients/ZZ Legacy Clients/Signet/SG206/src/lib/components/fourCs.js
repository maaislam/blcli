import shared from "../../../../../../core-files/shared";

export default () => {

  const { ID } = shared;

  // change images
  const fourCs = {
    'Colour': {
      image: 'https://cdn.media.amplience.net/i/ernestjones/1000x1000_ListPage_EJ2103B04?w=1000&fmt=webp',
      text: 'Diamonds naturally vary in colour with the majority of them on the market being sold as near colourless. At Ernest Jones, we use the GIA (Gemological Institute of America) scale of colour. On this scale, diamond colour is graded from D, which has the least colour, through the alphabet to Z, which has a light yellow colour. Truly colourless diamonds (D) are treasured for their rarity.'
    },
    'Clarity': {
      image: 'https://cdn.media.amplience.net/i/ernestjones/1000x1000_ListPage_EJ2210B02_AskOurExperts?w=1000&fmt=webp',
      text: 'Diamonds naturally vary in colour with the majority of them on the market being sold as near colourless. At Ernest Jones, we use the GIA (Gemological Institute of America) scale of colour. On this scale, diamond colour is graded from D, which has the least colour, through the alphabet to Z, which has a light yellow colour. Truly colourless diamonds (D) are treasured for their rarity.'
    },
    'Cut': {
      image: 'https://cdn.media.amplience.net/i/ernestjones/1000x1000_ListPage_EJ2108B03?w=1000&fmt=webp',
      text: 'Diamonds naturally vary in colour with the majority of them on the market being sold as near colourless. At Ernest Jones, we use the GIA (Gemological Institute of America) scale of colour. On this scale, diamond colour is graded from D, which has the least colour, through the alphabet to Z, which has a light yellow colour. Truly colourless diamonds (D) are treasured for their rarity.'
    },
    'Carat': {
      image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4fc33caa-545e-11ed-923c-565a8705635f',
      text: 'Diamonds naturally vary in colour with the majority of them on the market being sold as near colourless. At Ernest Jones, we use the GIA (Gemological Institute of America) scale of colour. On this scale, diamond colour is graded from D, which has the least colour, through the alphabet to Z, which has a light yellow colour. Truly colourless diamonds (D) are treasured for their rarity.'
    },
  }


  Object.keys(fourCs).forEach((i) => {
    const data = fourCs[i];
    const fourCEl = document.createElement('div');
    fourCEl.className = `swiper-slide ${ID}-fourCSlide`;
    fourCEl.innerHTML = `
    <div class="${ID}-image" style="background-image:url(${data.image})"></div>
    <div class="${ID}-textBlock">
      <h2>${[i][0]}</h2>
      <p>${data.text}</p>
    </div>`;

    document.querySelector(`.${ID}-guideCarousel .swiper-wrapper`).appendChild(fourCEl);
  });


  const mySwiper = new Swiper(`.${ID}-guideCarousel`, {
    direction: "horizontal",
    loop: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: `.${ID}-guideCarousel .swiper-pagination`,
      clickable: true
    },
    paginationClickable: true,
    navigation: {
      nextEl: `.${ID}-guideCarousel .${ID}-swiperNext`,
      prevEl: `.${ID}-guideCarousel .${ID}-swiperPrev`,
      clickable: true,
    },
  });
}