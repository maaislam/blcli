import settings from './settings';

// crrate new ul in place of the thumbnails
// add the images from the orignal in to it

export default () => {
  const currentThumbnails = document.querySelector('.product-thumbnails.thumbnails');
  const newThumbnails = document.createElement('div');
  newThumbnails.classList.add(`${settings.ID}-thumbnails`);
  newThumbnails.classList.add('product-thumbnails');
  currentThumbnails.insertAdjacentElement('beforebegin', newThumbnails);

  const existingThumbs = currentThumbnails.querySelectorAll('li');

  for (let index = 0; index < existingThumbs.length; index += 1) {
    const element = existingThumbs[index];
    newThumbnails.appendChild(element);
  }

  // on click of the main image show the correct image in lightbox
  /* const mainGallerySlides = document.querySelectorAll('.product-gallery-slider .slide');
  for (let index = 0; index < mainGallerySlides.length; index += 1) {
    const element = mainGallerySlides[index];
    console.log(element);
  } */
};
