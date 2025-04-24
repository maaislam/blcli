export default () => {
  const hotelSection = document.querySelector('div[id^="hotel"]');
  if (hotelSection) {
    const images = hotelSection.querySelectorAll('img');
    [].forEach.call(images, (img) => {
      img.setAttribute('width', '55');
      img.setAttribute('height', '55');
    });
  }
};