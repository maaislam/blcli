import { __ } from '../../helpers';

export default () => {
  /**
   * @desc Overview section
   */
  const overviewContainer = document.querySelector('#TG069-overview');

  const images = [
    '//cdn.optimizely.com/img/8355110909/f15c1f39d66c4564b0aa607577ef93d0.jpg',
    '//cdn.optimizely.com/img/8355110909/0335e530eb9544769037f84eb60e602e.png',
    '//cdn.optimizely.com/img/8355110909/bf1ecb8e9ece499c9f002a615d8cca44.png',
    '//cdn.optimizely.com/img/8355110909/170688933a9146c3aba9a9bdea83f524.jpg',
    '//cdn.optimizely.com/img/8355110909/20b445a7fbec454cac34cd8ffb5a0d80.png',
    '//cdn.optimizely.com/img/8355110909/ce1eb91d1fab48329da146f7c47fd179.png',
  ];

  overviewContainer.innerHTML = `
  <div class="TG069-text_container">
    <h2>${__('MYRUN')}</h2>
    <p>${__('The perfect combination of minimal design and innovative technology, its compact size make it the perfect home treadmill for a variety of spaces. With training modes like power walk or uphill run, you’ll always get a proper indoor workout: live feedback, adaptive surface and endless fun are all included for the best treadmill experience from your very own home')}</p>
    </div>
  <div class="TG069-grid_images">
    <div class="TG069-grid_column"></div>
    <div class="TG069-grid_column"></div>
    <div class="TG069-grid_column"></div>
    <div class="TG069-grid_column"></div>  
  </div>`;

  // add the images

  const cols = document.querySelectorAll('.TG069-grid_column');
  const createImage = (url) => {
    const gridImage = document.createElement('div');
    gridImage.classList.add('TG069-grid-image');
    gridImage.style = `background-image: url(${url})`;
    return gridImage;
  };

  [].forEach.call(cols, (col, idx) => {
    col.insertAdjacentElement('beforeend', createImage(images[0]));
    images.shift();

    if (idx % 2 !== 0) {
      // Create another grid image
      col.insertAdjacentElement('beforeend', createImage(images[0]));
      images.shift();
    }
  });
};
