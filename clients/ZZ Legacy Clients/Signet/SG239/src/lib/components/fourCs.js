import shared from "../../../../../../core-files/shared";

export default () => {

  const { ID } = shared;

  // change images
  const fourCs = {
    'Colour': {
      image: 'https://cdn.media.amplience.net/i/ernestjones/1000x1000_ListPage_EJ2103B04?w=1000&fmt=webp',
      text: 'The colour of a diamond is considered one of the key factors in determining the value of the stone. A traditional diamond is considered to be a "white" stone, although they can actually be found in many colours, such as pink and yellow.'
    },
    'Clarity': {
      image: 'https://cdn.media.amplience.net/i/ernestjones/1000x1000_ListPage_EJ2210B02_AskOurExperts?w=1000&fmt=webp',
      text: 'All diamonds are beautiful, but they all have minute imperfections. This is what makes every individual diamond stone as unique as a fingerprint. However, like colour, the level of imperfections in each diamond can differ hugely, and so clarity refers to the level of flawlessness the diamond has. Imperfections are classed as inclusions (internal flaws), which can make the diamond look cloudy, and blemishes (external marks) such as scratches.'
    },
    'Cut': {
      image: 'https://cdn.media.amplience.net/i/ernestjones/1000x1000_ListPage_EJ2108B03?w=1000&fmt=webp',
      text: 'A diamonds cut refers to its proportions and finish, influencing the value of a diamond. A skilled professional will work on a diamond stone to give it its cut, transforming it from its natural form, and cutting it into a finished shape that is more familiar. The cut should not be confused with shape as discussed above, which refers to the shape of the finished diamond, such as princess or baguette.'
    },
    'Carat': {
      image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/4fc33caa-545e-11ed-923c-565a8705635f',
      text: 'The term "carat" refers to the weight of a diamond, and not the size. One carat of diamond weighs 200 milligrams or 1/5th of a gram. One carat of diamond can be divided as 100 points of diamond. As such, this can then be divided down, so that 50 points of diamond refers to half a carat of diamond and 25 points refers to a quarter of a carat of diamond, and so on.'
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