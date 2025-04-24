import shared from './shared';

export const initiateSlick = (numOfRecentlyViewed) => {
  const { ID, VARIATION } = shared;
  let firstPosition = 1;
  if (numOfRecentlyViewed == 1) {
    firstPosition = 0;
  }

  jQuery(`.${shared.ID}-suggestedProducts__content`).slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 565,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: firstPosition,
          infinite: true,
          // speed: 300,
          slidesToShow: 1,
          centerMode: true,
          // variableWidth: true
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
};
