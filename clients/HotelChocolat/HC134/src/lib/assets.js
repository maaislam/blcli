import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;

export const iconChange = () => {
  const nav = document.querySelector(`#navigation`);
  const hamburger = nav.querySelector(`#hamburger-menu a.menu-toggle`);
  const oldHamburger = hamburger.querySelector(`svg`);
  oldHamburger.innerHTML = `<path d="M22 2.30005H2V3.70005H22V2.30005Z" fill="white"/>
<path d="M16 8.30005H2V9.70005H16V8.30005Z" fill="white"/>
<path d="M16 20.3H2V21.7001H16V20.3Z" fill="white"/>
<path d="M22 14.3H2V15.7H22V14.3Z" fill="white"/>`;
  oldHamburger.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  oldHamburger.setAttribute("width", "24");
  oldHamburger.setAttribute("height", "24");
  oldHamburger.setAttribute("viewBox", "0 0 24 24");
  oldHamburger.setAttribute("fill", "none");

  const shopNavigation = nav.querySelector(`.mb-grid-item a[href="/uk/chocolate-shops"]`);
  //   console.log(shopNavigation);
  shopNavigation.querySelector(`svg`)?.remove();
  const newShopNavigation = `<svg class="icon pin store-locator" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11.9999 2C7.92988 2 4.62988 5.3 4.62988 9.37C4.62988 14.11 11.9999 22 11.9999 22C11.9999 22 19.3699 14.11 19.3699 9.37C19.3699 5.3 16.0699 2 11.9999 2ZM6.02988 9.37C6.02988 6.08 8.70988 3.4 11.9999 3.4C15.2899 3.4 17.9699 6.08 17.9699 9.37C17.9699 12.3 14.2899 17.22 11.9999 19.89C9.70988 17.22 6.02988 12.3 6.02988 9.37Z" fill="white"/>
    <path d="M11.9998 5.67993C9.96982 5.67993 8.31982 7.32993 8.31982 9.35993C8.31982 11.3899 9.96982 13.0399 11.9998 13.0399C14.0298 13.0399 15.6798 11.3899 15.6798 9.35993C15.6798 7.32993 14.0298 5.67993 11.9998 5.67993ZM11.9998 11.6499C10.7398 11.6499 9.71982 10.6299 9.71982 9.36993C9.71982 8.10993 10.7398 7.07993 11.9998 7.07993C13.2598 7.07993 14.2798 8.09993 14.2798 9.35993C14.2798 10.6199 13.2598 11.6499 11.9998 11.6499Z" fill="white"/>
    </svg>`;
  shopNavigation.insertAdjacentHTML("afterbegin", newShopNavigation);

  const userAccount = nav.querySelector(`.mb-grid-item a[href="https://www.hotelchocolat.com/uk/my-account"]`);
  userAccount.querySelector(`svg`)?.remove();
  const newUserAccount = `<svg class="icon account" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.1102 3.52988C13.8902 3.52988 15.3302 4.96988 15.3302 6.74988C15.3302 8.52988 13.8902 9.96988 12.1102 9.96988C10.3302 9.96988 8.89023 8.52988 8.89023 6.74988C8.89023 4.96988 10.3302 3.52988 12.1102 3.52988ZM12.1102 2.12988C9.56023 2.12988 7.49023 4.19988 7.49023 6.74988C7.49023 9.29988 9.56023 11.3699 12.1102 11.3699C14.6602 11.3699 16.7302 9.29988 16.7302 6.74988C16.7302 4.19988 14.6602 2.12988 12.1102 2.12988Z" fill="white"/>
    <path d="M16 14.2699C17.99 14.2699 19.6 15.8799 19.6 17.8699V20.4699H4.4V17.8699C4.4 15.8799 6.01 14.2699 8 14.2699H16M16 12.8699H8C5.24 12.8699 3 15.1099 3 17.8699V21.8699H21V17.8699C21 15.0999 18.76 12.8699 16 12.8699Z" fill="white"/>
    </svg>`;
  userAccount.insertAdjacentHTML("afterbegin", newUserAccount);

  const basket = nav.querySelector(`.mb-grid-item a[href="https://www.hotelchocolat.com/uk/basket"]`);
  basket.classList.add(`${ID}--basket`);
  basket.querySelector(`svg`)?.remove();
  let newBasket = `<svg class="icon bag" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20.5002 6.95H16.5002H16.1802V6.5C16.1802 3.74 14.3002 1.5 12.0002 1.5C9.6902 1.5 7.8202 3.74 7.8202 6.5V6.95H7.5002H3.5002L2.4502 22H21.5602L20.5002 6.95ZM8.8202 6.5C8.8202 4.29 10.2502 2.5 12.0002 2.5C13.7502 2.5 15.1802 4.29 15.1802 6.5V6.95H8.8202V6.5ZM7.5002 8.35H7.8202V9H8.8202V8.35H15.1902V9H16.1902V8.35H16.5102H19.2002L19.9902 19.58H4.0202L4.8102 8.35H7.5002Z" fill="white"/>
    </svg>`;
  basket.insertAdjacentHTML("afterbegin", newBasket);

  pollerLite([`.minicart-total-qty`], () => {
    let minicartTotal = document.querySelector(`#navigation .mb-grid-item a[href="https://www.hotelchocolat.com/uk/basket"] .minicart-total-qty`);
    // let totalQuantity = minicartTotal?.innerText.trim() != "" ? parseInt(minicartTotal?.innerText.trim()) : 0;
    let totalQuantity = minicartTotal?.textContent.trim() != "" ? parseInt(minicartTotal?.textContent.trim()) : 0;
    if (VARIATION == 1) {
      if (totalQuantity == 0) {
        minicartTotal && (minicartTotal.style.display = "none");
      } else {
        minicartTotal && (minicartTotal.style.display = "inline-block");
      }
    }
    if (VARIATION == 2) {
      let newBasketQty = `<span class="minicart-qty" style="visibility: hidden;">${totalQuantity}</span>`;
      basket.insertAdjacentHTML("beforeend", newBasketQty);
      let newTotalQuantity = basket.querySelector(`.minicart-qty`);
      if (totalQuantity > 0 && totalQuantity <= 99) {
        // console.log("if", totalQuantity);
        newTotalQuantity.style.visibility = "visible";
        // minicartTotal && (minicartTotal.style.visibility = "hidden");
        // newTotalQuantity.style.display = "block";
        minicartTotal && (minicartTotal.style.display = "none");
      } else {
        // console.log("else", totalQuantity);
        // minicartTotal && (minicartTotal.style.visibility = "visible");
        minicartTotal && (minicartTotal.style.display = "inline-block");
        if (totalQuantity == 0) {
          minicartTotal && (minicartTotal.style.display = "none");
        }
      }
    }
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        totalQuantity = minicartTotal?.textContent.trim() != "" ? parseInt(minicartTotal?.textContent.trim()) : 0;
        if (VARIATION == 1) {
          if (totalQuantity == 0) {
            minicartTotal && (minicartTotal.style.display = "none");
          } else {
            minicartTotal && (minicartTotal.style.display = "inline-block");
          }
        }
        if (VARIATION == 2) {
          let newTotalQuantity = basket.querySelector(`.minicart-qty`);
          if (totalQuantity > 0 && totalQuantity <= 99) {
            // console.log("if", totalQuantity);
            // minicartTotal && (minicartTotal.style.visibility = "hidden");
            minicartTotal && (minicartTotal.style.display = "none");
            newTotalQuantity.innerText = totalQuantity;
            newTotalQuantity.style.visibility = "visible";
            // newTotalQuantity.style.display = "block";
          } else {
            // console.log("else", totalQuantity);
            newTotalQuantity.style.visibility = "hidden";
            // minicartTotal && (minicartTotal.style.visibility = "visible");
            // newTotalQuantity.style.display = "none";
            minicartTotal && (minicartTotal.style.display = "inline-block");
            if (totalQuantity == 0) {
              minicartTotal && (minicartTotal.style.display = "none");
            }
          }
        }
      });
    });
    observer.observe(minicartTotal, {
      characterData: true,
      attributes: false,
      childList: true,
      subtree: false,
    });
  });
};
