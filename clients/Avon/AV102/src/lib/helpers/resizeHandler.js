const resizeHandler = (elemToObserve, callbackFunc) => {
  const resizeObserver = new ResizeObserver((entries) => {
    callbackFunc(entries);
  });

  resizeObserver.observe(elemToObserve);
};
export default resizeHandler;
