/**
 * AV021 - Mobile navigation redesign
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import shared from "./shared";
import MobileNav from "./components/MobileNav/MobileNav";
import { getLayoutName } from "../../../../../lib/utils/avon";

export default () => {
  setup();
  const { $, rootScope, ID } = shared;
  let mobileNav;

  const buildNav = () => {
    mobileNav = new MobileNav();
  };

  buildNav();

  // Rebuild nav if layout changes and it's removed
  rootScope.$on("App_LayoutChanged", () => {
    // Delay to wait for standard rendering to complete
    if (getLayoutName() === "Phone" && !$(`.${ID}_MobileNav`).length) {
      setTimeout(buildNav, 700);
    }
  });

  rootScope.$on("App_WindowSizeChanged", () => {
    mobileNav.refresh();
  });

  rootScope.$on("NotificationService.DismissCookiePolicy", () => {
    setTimeout(mobileNav.refresh, 500);
  });
};
