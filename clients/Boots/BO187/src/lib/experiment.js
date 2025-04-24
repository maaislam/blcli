import { setup, fireEvent } from "../../../../../core-files/services";
import { insertAfterElement, pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
  const { ID, VARIATION } = shared;
  setup();
  fireEvent("Conditions Met");
  document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem(`${ID}`) !== "Fired") {
      window.cmCreateManualLinkClickTag(
        `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
      );
      sessionStorage.setItem(`${ID}`, "Fired");
    }
  });

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION == "control") {
    return;
  }

  pollerLite([".grid_mode.grid"], () => {
    const listItems = document.querySelectorAll(".grid_mode.grid > li");
    const tile = listItems[8].cloneNode();
    tile.classList.add(`${ID}-root`);

    let data;

    switch (window.location.pathname) {
      case "/fragrance/perfume/all-perfume":
        data = [
          {
            title: "Floral",
            url: "/fragrance/perfume/all-perfume#facet:-700000000000013561610210811111497108&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10200021?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Oriental",
            url: "/fragrance/perfume/all-perfume#facet:-70000000000001356161189711010510810897,-700000000000013561610697115109105110101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10011435?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Gift sets",
            url: "/fragrance/perfume/perfume-gift-sets",
            image:
              "https://boots.scene7.com/is/image/Boots/10300177?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Save Up to ½ Price on Selected Fragrance",
            url: "/fragrance/fragrance-offers/fragrance-offers-save-up-to-half-price",
            image:
              "https://boots.scene7.com/is/image/Boots/10111918?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
      case "/cerave":
        data = [
          {
            title: "Face Moisturiser",
            url: "/cerave#facet:-7000000000000135104109111105115116117114105115105110103&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10258272?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Cleanser",
            url: "/cerave#facet:-70000000000001351049910810197110115105110103&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10306571?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Dry Skin",
            url: "/cerave#facet:-700000000000013562210011412132115107105110&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10246701?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Oily Skin",
            url: "/cerave#facet:-700000000000013562211110510812132115107105110&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10246702?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
      case "/opticians/glasses/all-frames-boots-opticians":
        data = [
          {
            title: "Men's",
            url: "/opticians/glasses/all-frames-boots-opticians#facet:-7000000000000135619109101110115&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10263437?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Women's",
            url: "/opticians/glasses/all-frames-boots-opticians#facet:-7000000000000135619119111109101110115&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10263439?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Boots Eyewear",
            url: "/opticians/glasses/all-frames-boots-opticians#facet:-100266111111116115326912110111910197114&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10274244?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
      case "/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months":
        data = [
          {
            title: "Baby Boy",
            url: "/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months#facet:-70000000000001356199897981213298111121&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10287733?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Baby Girl",
            url: "/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months#facet:-700000000000013561998979812132103105114108&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10287896?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Unisex",
            url: "/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months#facet:-7000000000000135619117110105115101120&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10301187?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
      case "/beauty/makeup/face/foundation":
        data = [
          {
            title: "Full Coverage",
            url: "/beauty/makeup/face/foundation#facet:-7000000000000138601102117108108&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10285826?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Medium Coverage",
            url: "/beauty/makeup/face/foundation#facet:-7000000000000138601109101100105117109&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10263262?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Light Coverage",
            url: "/beauty/makeup/face/foundation#facet:-7000000000000138601108105103104116&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10134290?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "No7",
            url: "/beauty/makeup/face/foundation#facet:-10027811155&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10262468?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
      case "/beauty/skincare/facial-skincare/moisturiser":
        data = [
          {
            title: "Dry Skin",
            url: "/beauty/skincare/facial-skincare/moisturiser#facet:-700000000000013562210011412132115107105110&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10258272?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Oily Skin",
            url: "/beauty/skincare/facial-skincare/moisturiser#facet:-700000000000013562211110510812132115107105110&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10156201?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "SPF 30",
            url: "/beauty/skincare/facial-skincare/moisturiser#facet:-7000000000000135625115112102325148&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10253097?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "SPF 15",
            url: "/beauty/skincare/facial-skincare/moisturiser#facet:-7000000000000135625115112102324953&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10288482?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
      case "/the-ordinary/the-ordinary-shop-all":
        data = [
          {
            title: "Face Moisturiser",
            url: "/the-ordinary/the-ordinary-shop-all#facet:-7000000000000135605102979910132109111105115116117114105115101114&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10267775?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Cleanser",
            url: "/the-ordinary/the-ordinary-shop-all#facet:-70000000000001356059910810197110115101114&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10267784?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Face Serum",
            url: "/the-ordinary/the-ordinary-shop-all#facet:-7000000000000135605102979910132115101114117109&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10267780?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Face Oil",
            url: "/the-ordinary/the-ordinary-shop-all#facet:-7000000000000135605102979910132111105108&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10267770?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
      case "/no7-shop-all":
        data = [
          {
            title: "Face",
            url: "/no7-shop-all#facet:-70000000000001356271029799101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10288475?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Eye",
            url: "/no7-shop-all#facet:-7000000000000135627101121101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10288489?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Foundation",
            url: "/no7-shop-all#facet:-700000000000013560510211111711010097116105111110&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10300810?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Day Cream",
            url: "/no7-shop-all#facet:-700000000000013560510097121329911410197109&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10193857?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
      case "/fragrance/aftershave/mens-aftershave":
        data = [
          {
            title: "Woody",
            url: "/fragrance/aftershave/mens-aftershave#facet:-7000000000000135616119111111100121&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10243636?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Aromatic",
            url: "/fragrance/aftershave/mens-aftershave#facet:-7000000000000135616971141111099711610599&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10012114?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Eau de Parfum",
            url: "/fragrance/aftershave/mens-aftershave#facet:-700000000000013561710197117321001013211297114102117109&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10288093?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Eau de Toilette",
            url: "/fragrance/aftershave/mens-aftershave#facet:-7000000000000135617101971173210010132116111105108101116116101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10122736?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
      case "/beauty/skincare/skincare-all-skincare":
        data = [
          {
            title: "Face",
            url: "/beauty/skincare/skincare-all-skincare#facet:-70000000000001356271029799101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10202350?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Eye",
            url: "/beauty/skincare/skincare-all-skincare#facet:-7000000000000135627101121101&productBeginIndex:0&orderBy:11&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10290321?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Hand",
            url: "/beauty/skincare/skincare-all-skincare#facet:-700000000000013562710497110100&productBeginIndex:0&orderBy:11&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10262748?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
          {
            title: "Lip",
            url: "/beauty/skincare/skincare-all-skincare#facet:-7000000000000135627108105112&productBeginIndex:0&orderBy:11&pageView:grid&minPrice:&maxPrice:&pageSize:&",
            image:
              "https://boots.scene7.com/is/image/Boots/10293756?id=-Klmv1&fmt=jpg&fit=constrain,1&wid=504&hei=548",
          },
        ];
        break;
    }

    tile.innerHTML = /* HTML */ `<div class="estore_product_container">
      <div class="${ID}-container">
        <h4>You might also like</h4>
        <ul>
          ${data
            .map(
              (item) => /* HTML */ `
                <li class="${ID}-list-item" style="width: 100% !important;">
                  <a href="${item.url}">
                    <img src="${item.image}" alt="${item.title}" />
                    <span>${item.title}</span>
                  </a>
                </li>
              `
            )
            .join("")}
        </ul>
      </div>
    </div>`;

    if (!document.querySelector(`.${ID}-root`)) {
      if (window.innerWidth <= 640) {
        insertAfterElement(listItems[4], tile);
      } else {
        insertAfterElement(listItems[8], tile);
      }
    }

    const tileLinks = document.querySelectorAll(`.${ID}-list-item a`);

    tileLinks.forEach((link) => {
      link.addEventListener("click", () =>
        window.scrollTo({ top: 230, behavior: "smooth" })
      );
    });

    // Tracking
    tileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        fireEvent(`'${link.innerText}' tile clicked`);
      });
    });
    // End Tracking
  });
};
