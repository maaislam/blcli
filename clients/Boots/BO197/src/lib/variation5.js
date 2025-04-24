import { fireEvent } from "../../../../../core-files/services";
import { insertAfterElement, pollerLite } from "../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

const variation5 = () => {
  fireEvent("V5 Code Fired");
  pollerLite(["h1"], () => {
    const newBanner = document.createElement("div");
    newBanner.classList.add(`${ID}-root`);
    newBanner.innerHTML = /* HTML */ `
      <div class="${ID}-content">
        <h4>Discover No7’s new & most powerful multi-benefit foundation</h4>
        <a
          href="https://www.boots.com/no7-restore-and-renew-serum-foundation-30ml-spf-30-10300813"
          >Shop now</a
        >
      </div>
      <div class="${ID}-image">
        <img
          src="https://boots.scene7.com/is/image/Boots/10300813?scl=1&fmt=png-alpha"
          alt=""
        />
      </div>
    `;

    const existingBanner = document.querySelector(
      ".imgBanner.short.mrg.clearfix"
    );

    if (existingBanner) {
      insertAfterElement(existingBanner, newBanner);
      existingBanner.remove();
    } else {
      const entryElement = document.getElementById("estore_category_heading");
      insertAfterElement(entryElement, newBanner);
    }

    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fireEvent("Banner in user's viewport");
          entry.target.addEventListener("click", () =>
            fireEvent("User clicked on banner")
          );
        }
      });
    }).observe(newBanner);
  });
};

export default variation5;
