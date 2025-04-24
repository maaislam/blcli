export const sliderImages = {
  '.swiper-slide:nth-child(1)': { // treadmills
    desktopImage: '//cdn.optimizely.com/img/8355110909/df670433912146a4bccdf7953b4a4a21.jpg',
    mobileImage: '//cdn.optimizely.com/img/8355110909/07f45b76ce2146ca93618be4b9acd3f3.jpg',
    horizontalMobile: '//cdn.optimizely.com/img/8355110909/9b458ccba10145158a362193fd605312.jpg',
  },
  '.swiper-slide:nth-child(2)': { // exercise bikes
    desktopImage: '//cdn.optimizely.com/img/8355110909/745def09a2714ac4837d4db354a8448e.jpg',
    mobileImage: '//cdn.optimizely.com/img/8355110909/b4d17b02963c4c50ad5f5c9b07a09f5c.jpg',
    horizontalMobile: '//cdn.optimizely.com/img/8355110909/f7237d0543c54eeab9ad546d0d6b8c3c.jpg',
  },
  '.swiper-slide:nth-child(3)': { // strength
    desktopImage: '//cdn.optimizely.com/img/8355110909/d5cc4c5f08534f6092fcb8631851c5f8.jpg',
    mobileImage: '//cdn.optimizely.com/img/8355110909/d837e24c38f348429f890bfa7d0ff02e.jpg',
    horizontalMobile: '//cdn.optimizely.com/img/8355110909/075f146b6a6f41279fc8390ea4befd91.jpg',
  },
  /* '.swiper-slide:nth-child(4)': { // cross trainer
    desktopImage: '//cdn.optimizely.com/img/8355110909/5f7718ab8e9644f6ac6a783d7b9029d4.jpg',
    mobileImage: '//cdn.optimizely.com/img/8355110909/2d308e9222f34a5b8f754ee0f17e8801.jpg',
    horizontalMobile: '//cdn.optimizely.com/img/8355110909/b2438b83fafa4d8f9ced54b84cb8918f.jpg',
  }, */
};

export const sliderText = {
  'treadmill': {
    title: 'Treadmills',
    content: 'Performance, innovation and design, our treadmills for your training.',
    link: '/gb/products/shopby/product_type-treadmills.html',
  },
  'bikes': {
    title: 'Exercise Bikes',
    content: 'Indoor cycling for training like real athletes.',
    link: '/gb/products/shopby/product_type-exercise_bikes.html',
  },
  'strength': {
    title: 'Strength',
    content: 'Solutions for home gym dedicated to strength training and functional.',
    link: '/gb/products/strength.html',
  },
  /*'cross': {
    title: 'Elliptical Cross Trainers',
    content: 'A complete workout for total body entertainment in pursuit of the perfect shape.',
    link: '/gb/products/shopby/product_type-elliptical_cross_trainers.html',
  },*/

};

export const textOrder = (order = [
  'treadmill', 'bikes', 'strength', // 'cross',
]) => {
  const map = {
    '.hp-top-slider-foreground .swiper-slide:nth-child(2)': sliderText[order[0]],
    '.hp-top-slider-foreground .swiper-slide:nth-child(3)': sliderText[order[1]],
    '.hp-top-slider-foreground .swiper-slide:nth-child(4)': sliderText[order[2]],
    // '.hp-top-slider-foreground .swiper-slide:nth-child(5)': sliderText[order[3]],
  };

  map['.hp-top-slider-foreground .swiper-slide:nth-child(1)'] = map['.hp-top-slider-foreground .swiper-slide:nth-child(4)'];
  map['.hp-top-slider-foreground .swiper-slide:nth-child(5)'] = map['.hp-top-slider-foreground .swiper-slide:nth-child(2)'];

  return map;
};
