const scrollDepth = (fireEvent) => {
  const getScrollPercent = () => {
    const winHeight = $(window).height();
    const docHeight = $(document).height();
    const scrollTop = $(window).scrollTop(); //NaN or zero at top
    const trackLength = docHeight - winHeight;
    const pctScrolled = Math.floor((scrollTop / trackLength) * 100);
    return pctScrolled;
  };
};
export default scrollDepth;
