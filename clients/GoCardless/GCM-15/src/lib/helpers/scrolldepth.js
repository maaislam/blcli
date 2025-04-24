import debounce from 'lodash/debounce';

const scrollDepth = (fireEvent) => {
  const getDocHeight = () => {
    var D = document;
    return Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
  };

  const getScrollPercent = () => {
    var winheight = window.innerHeight || (document.documentElement || document.body).clientHeight;
    var docheight = getDocHeight();
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var trackLength = docheight - winheight;
    var pctScrolled = Math.floor((scrollTop / trackLength) * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    return pctScrolled;
  };

  window.addEventListener(
    'scroll',
    debounce(() => {
      fireEvent(`Scroll Depth ${getScrollPercent()}%`);
      console.log('testing');
    }, 100)
  );
};
export default scrollDepth;
