import { events } from "../../../../../lib/utils";
import { getLabel } from "./services";
import shared from "./shared";

export default () => {
  const { ID, VARIATION } = shared;

  const addEventListeners = () => {
    // On shade change, update the sticky nav shade label.
    $(
      "#product-swatch-mobile .product-swatch-item, #product-swatch-mobile .colour-swatch-item"
    ).click(function () {
      const variantID = $(this).attr("data-variant-id");
      const variantItem = $(
        '.product-swatch-dropdown.main-product .product-swatch-item[data-variant-id="' +
          variantID +
          '"]'
      );
      if (variantItem.length > 0) {
        // We don't need all of these, but for future reference, here's what we can get!
        const variant = {
          id: variantItem.attr("data-variant-id"),
          position: variantItem.attr("data-position"),
          title: variantItem.find(".swatch-title").text(),
          image: variantItem.find(".swatch-image img").attr("src"),
          available: variantItem.attr("data-available"),
          quantity: variantItem.attr("data-quantity"),
          inventoryStatus: variantItem.attr("data-inventory-status"),
          price: variantItem.attr("data-price"),
          CompareAtPrice: variantItem.attr("data-compare-at-price"),
        };

        $(`.${ID}_shade`).text(variant.title);
        $(`.${ID}_price`).text(
          window.slate.Currency.formatMoney(
            variant.price,
            window.theme.moneyFormat
          )
        );
      }
    });

    // Track CTA clicks
    $("#btn-basket").click(() => {
      if ($(`.${ID}_stickyNav`).length > 0) {
        events.send(`${ID}-${VARIATION}`, "Click", "Sticky Nav CTA");
      }
    });
  };

  // Sticky Nav
  const $ctas = $(".product-key-actions");
  if ($ctas) {
    let label = getLabel();
    if (!label) {
      // Show shade selector

      // Get shade name.
      const shade = $("#product-swatch-mobile .current-swatch .swatch-title")
        .text()
        .trim();

      // Markup
      label = `
        <div>
          <p>Select shade: <span class="${ID}_shade">${shade}</span></p>
          <p>(<span class="${ID}_openShades">change</span>)</p>
        </div>
      `;
    } else {
      // No shade
      label = `<p class="${ID}_productName">${label}</p>`;
    }

    const price = $(
      "#product-detail .product-price .money:not(.original-price)"
    )
      .text()
      .trim();

    // Add wrapper around the CTA which sets the fixed position of the sticky mav.
    $ctas.wrap(`<div class="${ID}_stickyWrapper"></div>`);

    // Add sticky nav extras to DOM
    const $stickyWrapper = $(`.${ID}_stickyWrapper`);
    $stickyWrapper.prepend(`
      <div class="${ID}_overlay"></div>
      <div class="${ID}_productMeta">
        ${label}
        <p class="${ID}_price">${price}</p>
      </div>
    `);

    addEventListeners();

    /* Overlay management - this can likely be much improved, the
    The site's overlay didn't cover the sticky nav here as the
    selector is within the sticky nav, so we needed to add an extra one.
    */

    const $stickyOverlay = $(`.${ID}_overlay`);
    const $siteOverlay = $("#site-overlay");
    const $swatches = $("#product-detail .product-swatch-listing");

    const closeOverlay = () => {
      $siteOverlay.removeClass(
        "mobileVariantControl active mobileQuantityControl"
      );
      $swatches.removeClass("active");
      $(".quantity-mobile-modal.active").removeClass("active");
    };

    // Hides quantity/shade selector, just a click on the main overlay would.
    $stickyOverlay.click(closeOverlay);
    $swatches.find(".icon-close").click(closeOverlay);

    // Toggle shade selector.
    $(`.${ID}_openShades`).click((e) => {
      $swatches.addClass("active");
      $siteOverlay.addClass("mobileVariantControl active");

      $siteOverlay.click(closeOverlay); // site removes click listeners when swatches are open, so we need it readded here

      events.send(`${ID}-${VARIATION}`, "Click", "Sticky Nav shade selector");
    });

    // Observe for changes to the main overlay class, and add sticky nav overlay when it's on.
    const observer = new MutationObserver(() => {
      if ($siteOverlay.hasClass("active")) {
        // add overlay to sticky header
        $stickyOverlay.addClass(`${ID}_active`);
      } else $stickyOverlay.removeClass(`${ID}_active`);
    });

    observer.observe($siteOverlay[0], {
      attributes: true,
      attributeFilter: ["class"],
      childList: false,
      characterData: false,
    });
  } // if ctas
};
