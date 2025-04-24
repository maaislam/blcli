import { fireEvent } from "../../../../../core-files/services";
import { insertAfterElement, pollerLite } from "../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

const variation3 = () => {
  fireEvent("V3 Code Fired");
  pollerLite([".product_listing_container ul.grid_mode li"], () => {
    const gridItems = document.querySelectorAll(
      ".product_listing_container li:not(.redesign-promotionLink)"
    );

    console.log(gridItems);

    const inGridContent = gridItems[0].cloneNode();
    inGridContent.classList.add(`${ID}-in-grid`);
    inGridContent.innerHTML = /* HTML */ `
      <div class="estore_product_container">
        <div class="${ID}-in-grid-image">
          <img
            src="https://boots.scene7.com/is/image/Boots/10300813_7?scl=1&fmt=png-alpha"
            alt="No7’s new & most powerful multi-benefit foundation"
          />
        </div>
        <div class="${ID}-in-grid-content">
          <p>NEW</p>
          <h4>Discover No7’s new & most powerful multi-benefit foundation</h4>
          <a
            href="https://www.boots.com/no7-restore-and-renew-serum-foundation-30ml-spf-30-10300813"
            >Shop now</a
          >
        </div>
      </div>
    `;

    const inGridContentClone = inGridContent.cloneNode(true);

    if (window.innerWidth <= 768) {
      insertAfterElement(gridItems[2], inGridContent);
      insertAfterElement(gridItems[7], inGridContentClone);
    } else {
      console.log("desktop");
      insertAfterElement(gridItems[4], inGridContent);
      insertAfterElement(gridItems[11], inGridContentClone);
    }

    [inGridContent, inGridContentClone].forEach((el, idx) => {
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fireEvent(`In-grid item #${idx + 1} visible in user's viewport`);
            entry.target.addEventListener("click", () =>
              fireEvent(`In-grid item #${idx + 1} clicked`)
            );
          }
        });
      }).observe(el);
    });
  });
};

export default variation3;
