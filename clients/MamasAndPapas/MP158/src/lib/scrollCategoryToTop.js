export default (el) => {
  const mainContainer = document.querySelector('#shopSlider');
  const scrollVal = el.getBoundingClientRect().y + mainContainer.scrollTop;
  mainContainer.scrollTo(0, scrollVal);
};