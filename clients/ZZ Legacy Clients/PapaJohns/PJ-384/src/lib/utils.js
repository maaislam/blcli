export function bindTriggerToBasket(callback) {
  function setEventListener(...els) {
    els.forEach((el) => {
      el.addEventListener("click", (e) => {
        callback(e);
      });
    });
  }

  const form = document.querySelector("#aspnetForm");

  const basketButton = document.querySelector(".header .basket .menuLinkTop");
  const notificationButton = document.querySelector(
    "#ctl00__objHeader_upBasketNotification .buttons #ctl00__objHeader_lbNotificationCheckout"
  );

  if (basketButton.href.includes("javascript")) {
    new MutationObserver((mutations) => {
      const mobileBasketButton = mutations[
        mutations.length - 1
      ].target.querySelector("#ctl00__objHeader_aCheckoutMobile");

      if (mobileBasketButton) setEventListener(mobileBasketButton);
    }).observe(form, { childList: true });
  } else {
    const header = document.querySelector("div.header.header_pj");

    if (basketButton || notificationButton) {
      setEventListener(notificationButton, basketButton);
    }

    new MutationObserver(() => {
      const basketButton = document.querySelector(
        ".header .basket .menuLinkTop"
      );
      const notificationButton = document.querySelector(
        "#ctl00__objHeader_upBasketNotification .buttons #ctl00__objHeader_lbNotificationCheckout"
      );

      if (basketButton || notificationButton) {
        setEventListener(basketButton, notificationButton);
      }
    }).observe(header, {
      childList: true,
      subtree: true,
    });
  }
}
