/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");
  // goals

  pollerLite([`.login-intercept.checkout`, `.login-intercept.checkout .login-column`], () => {
    const guestColumn = document.querySelector(`.login-intercept.checkout .login-column:first-child`);
    const userColumn = document.querySelector(`.login-intercept.checkout .login-column:last-child`);

    guestColumn.querySelector("form button[name='dwfrm_login_unregistered']").addEventListener("click", () => {
      fireEvent(`User clicks continue as guest`);
    });

    userColumn.querySelectorAll(`.ui-tabs-tab a`).length > 0 &&
      userColumn.querySelectorAll(`.ui-tabs-tab a`).forEach((anchor) => {
        // console.log(anchor.href);
        if (anchor.href.includes("#tabs-1")) anchor.addEventListener("click", () => fireEvent(`User clicks sign in tab`));
        else if (anchor.href.includes("#tabs-2")) anchor.addEventListener("click", () => fireEvent(`User clicks register tab`));
      });
    userColumn.querySelectorAll(`.ui-tabs-panel form .form-row button[type='submit']`).length > 0 &&
      userColumn.querySelectorAll(`.ui-tabs-panel form .form-row button[type='submit']`).forEach((button) => {
        if (button.name == "dwfrm_login_login") button.addEventListener("click", () => fireEvent(`User clicks sign in`));
        else if (button.name == "dwfrm_login_register") button.addEventListener("click", () => fireEvent(`User clicks create an account`));
      });

    userColumn.querySelector(`a#password-reset`).addEventListener("click", () => {
      fireEvent(`User clicks the forgotten password link`);
    });
  });

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  if (VARIATION == "control") {
    return;
  }

  pollerLite([`.login-intercept.checkout`, `.login-intercept.checkout .login-column`], () => {
    const checkoutUser = document.querySelector(`.login-intercept.checkout`);
    const guestColumn = document.querySelector(`.login-intercept.checkout .login-column:first-child`);
    const userColumn = document.querySelector(`.login-intercept.checkout .login-column:last-child`);

    !guestColumn?.classList.contains(`x-active`) && guestColumn.classList.add(`x-active`);
    !userColumn?.classList.contains(`x-inactive`) && userColumn.classList.add(`x-inactive`);

    guestColumn.addEventListener("click", () => {
      // console.log("from Guest Column");
      !guestColumn?.classList.contains(`x-active`) && guestColumn.classList.add(`x-active`);
      guestColumn?.classList.contains(`x-inactive`) && guestColumn.classList.remove(`x-inactive`);
      userColumn?.classList.contains(`x-active`) && userColumn.classList.remove(`x-active`);
      !userColumn?.classList.contains(`x-inactive`) && userColumn.classList.add(`x-inactive`);
    });
    userColumn.addEventListener("click", () => {
      // console.log("from User Column");
      !userColumn?.classList.contains(`x-active`) && userColumn.classList.add(`x-active`);
      userColumn?.classList.contains(`x-inactive`) && userColumn.classList.remove(`x-inactive`);
      guestColumn?.classList.contains(`x-active`) && guestColumn.classList.remove(`x-active`);
      !guestColumn?.classList.contains(`x-inactive`) && guestColumn.classList.add(`x-inactive`);
    });
    userColumn && userColumn.querySelector("#tabs-1 .field-wrapper input")?.addEventListener("click", () => userColumn.click());
    userColumn && userColumn.querySelector("#tabs-1 .field-wrapper input")?.addEventListener("focus", () => userColumn.click());

    !checkoutUser?.classList.contains(`${ID}--checkout-user`) && checkoutUser.classList.add(`${ID}--checkout-user`);
    !guestColumn?.classList.contains(`${ID}--continue-guest`) && guestColumn.classList.add(`${ID}--continue-guest`);
    !userColumn?.classList.contains(`${ID}--continue-user`) && userColumn.classList.add(`${ID}--continue-user`);

    guestColumn && (guestColumn.querySelector("h2").innerHTML = `Guest checkout`);
    // guestColumn && (guestColumn.querySelector("span.text").innerHTML = `You can create an account once you've <br>completed your order`);
    // guestColumn && (guestColumn.querySelector("span.text").innerHTML = `You’ll have the option to create an account, once you've completed <br>your order.`);
    const spanText = guestColumn.querySelector("span.text");
    const newSpanText = `<span class="guest-body-text">You’ll have the option to create an account, once you've completed <br>your order.</span>`;

    if (spanText) {
      spanText.style.display = "none!important;";
      spanText.insertAdjacentHTML("afterend", newSpanText);
    }

    userColumn && (userColumn.querySelector(".ui-tabs-tab a[href$='tabs-1']").innerHTML = `Sign in`);
    const signInTab = userColumn.querySelector("#tabs-1");
    signInTab && (signInTab.querySelector("label[for='dwfrm_login_password'] span").innerHTML = `Password`);
  });

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
