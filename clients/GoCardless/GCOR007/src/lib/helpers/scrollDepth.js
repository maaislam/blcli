import debounce from 'lodash/debounce';

const scrollDepth = (fireEvent) => {
  const getScrollPercent = () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    return Math.round(scrollPercent * 100);
  };

  fireEvent(`Scroll Depth ${getScrollPercent()}%`);
};

export default scrollDepth;
