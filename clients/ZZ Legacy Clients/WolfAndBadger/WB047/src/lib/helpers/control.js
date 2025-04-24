let observer;
let oldHref = location.href;
observer = new MutationObserver((mutations) => {
  let counter1;

  mutations.forEach((mutation) => {
    if (oldHref != location.href) {
      oldHref = location.href;
      counter1 = setInterval(() => {
        if (location.pathname.indexOf('/shopping-bag/') !== -1) {
          (function pollForElm() {
            if (document.querySelectorAll('[href*="/checkout/welcome/"]').length >= 2) {
              fireEvent('Test Code Fired');
              clearInterval(counter1);
            } else {
              setTimeout(pollForElm, 25);
            }
          })();
        }
      }, 25);
    }
  });
});
const config = {
  childList: true,
  subtree: false,
};
observer.observe(document.querySelector('body'), config);
