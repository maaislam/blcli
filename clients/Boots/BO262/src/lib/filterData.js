// enter 'price', 'reviews' or 'brands'

import shared from "../../../../../core-files/shared";

/**
 * Format:
 * 'pathname': {
     type: 'price' or 'rating' or 'brands',

     // if type is brands, add in brands array like this:
     brands: ['brand1', 'brand2', 'brand3'] 
 }
 */

 export const filterObj = {

    "/tuesday-offer": {
      type: "brand",
    },
    "/sale": {
      type: "promotion",
    },
    "/future-renew": {
      type: "promotion",
    },
    "/beauty/luxury-beauty-skincare/luxury-beauty-offers": {
      type: "product_type",
    },
    "/all-clearance": {
      type: "product_type",
    },
    "/no7-shop-all": {
      type: "brand",
    },
    "/beauty/makeup/face": {
      type: "brand",
    },
    "/baby-child/mothercare-clothing/mothercare-sale": {
      type: "gender",
    },
    "/all-perfume": {
      type: "price",
    },
    "/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months": {
      type: "gender",
    },
    "/friday-offer": {
      type: "promotion",
    },
    "/fragrance/perfume/all-perfume": {
      type: "gender",
    },
    "/elf/elf-shop-all": {
      type: "product_type",
    },
    "/opticians/glasses/opticians-glasses-womens": {
      type: "price",
    },
    "/no7-make-up": {
      type: "product_type",
    },
    "/la-roche-posay/all-la-roche-posay-products": {
      type: "product_type",
    },
    "/sol-de-janeiro-shop-all": {
      type: "product_type",
    },
    "/fenty-beauty-shop-all": {
      type: "product_type",
    },
    "/the-ordinary/the-ordinary-shop-all": {
      type: "product_type",
    },
    "/cerave-shop-all": {
      type: "product_type",
    },
    "/campaign-list-thirty-one": {
      type: "brand",
    },
    "/drunk-elephant/drunk-elephant-shop-all": {
      type: "price",
    },
    "/baby-child/baby-event": {
      type: "product_type",
    },
    "/estee-lauder/all-estee-lauder-products": {
      type: "brand",
    },
    "/la-roche-posay/suncare": {
      type: "spf",
    },
    "/beauty/skincare/skincare-all-skincare": {
      type: "brand",
    },
    "/no7-skincare": {
      type: "product_type",
    },
    "/beauty/makeup/face/foundation": {
      type: "brand",
    },
    "/beauty/makeup/lips": {
      type: "brand",
    },
    "/fragrance/fragrance-offers/fragrance-offers-save-up-to-half-price": {
      type: "gender",
    },
    "/fragrance/aftershave/mens-aftershave": {
      type: "brand",
    },
    "/sol-de-janeiro-mists": {
      type: "price",
    },
    "/no7/future-renew": {
      type: "promotion",
    },
    "/health-pharmacy/condoms-sexual-health/adult-toys": {
      type: "rating",
    },
    "/holidays/suncare/sunprotection": {
      type: "brand",
    },
    "/holidays/travel-toiletries": {
      type: "product_type",
    },
    "/oral-b/oral-b-electric-brushes": {
      type: "price",
    },
    "/campaign-list-twenty-four": {
      type: "product_type",
    },
    "/liz-earle-/shop-all-liz-earle": {
      type: "product_type",
    },
    "/festival/sunprotection": {
      type: "brand",
    },
    "/travel-toiletries": {
      type: "product_type",
    },
    "/beauty/makeup/eyes": {
      type: "brand",
    },
    "/beauty/luxury-beauty-skincare/luxury-beauty-makeup": {
      type: "product_type",
    },
    "/luxury-beauty-offers": {
      type: "product_type",
    },
    "/no7/no7-skincare": {
      type: "product_type",
    },
    "/beauty/skincare/facial-skincare/moisturiser": {
      type: "spf",
    },
    "/savings": {
      type: "price",
    },
    "/luxury-beauty-skincare/luxury-beauty-offers": {
      type: "brand",
    },
    "/beauty-get-the-look-2": {
      type: "product_type",
    },
    "/skincare-savings": {
      type: "brand",
    },
    "/opticians/glasses/all-frames-boots-opticians": {
      type: "gender",
    },
    "/fragrance-savings": {
      type: "gender",
    },
    "/webapp/wcs/stores/servlet/searchdisplay": {
      type: "brand",
    },
    "/beauty/luxury-beauty-skincare/all-luxury-skincare": {
      type: "brand",
    },
    "/opticians/glasses/mens-glasses": {
      type: "price",
    },
    "/elf/elf-face": {
      type: "product_type",
    },
    "/soltan/all-soltan-products": {
      type: "spf",
    },
    "/beauty/hair/shampoo": {
      type: "brand",
    },
    "/baby-child/mothercare-clothing/shop-all-baby-kids-clothing": {
      type: "gender",
    },
    "/cerave-cleansers": {
      type: "skin_type",
    },
    "/holidays/suncare": {
      type: "brand",
    },
    "/electrical/electrical-dental/electric-toothbrushes": {
      type: "brand",
    },
    "/campaign-list-thirty-two": {
      type: "brand",
    },
    "/no7-make-up/no7-foundation-range": {
      type: "foundation_coverage",
    },
    "/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years": {
      type: "gender",
    },
    "/beauty/new-in-beauty-skincare": {
      type: "rating",
    },
    "/la-roche-posay/la-roche-posay-moisturisers": {
      type: "product_type",
    },
    "/soap-and-glory/soap-and-glory-skincare": {
      type: "brand",
    },
    "/clinique/clinique-full-range": {
      type: "brand",
    },
    "/fragrance-offers-save-up-to-half-price": {
      type: "gender",
    },
    "/holidays/suncare/face-sun-protection": {
      type: "brand",
    },
    "/wellness/condoms-sexual-health/adult-toys": {
      type: "gender",
    },
    "/soap-and-glory/shop-all-soap-and-glory": {
      type: "product_type",
    },
    "/fenty-beauty-face": {
      type: "product_type",
    },
    "/gift/her": {
      type: "price",
    },
    "/beauty-savings": {
      type: "product_type",
    },
    "/no7-bestsellers": {
      type: "brand",
    },
    "/soap-and-glory/soap-and-glory-bath-body": {
      type: "product_type",
    },
    "/dior/dior-mens-fragrances/dior-sauvage": {
      type: "product_type",
    },
    "/cerave-moisturisers": {
      type: "skin_type",
    },
    "/electrical/electrical-shop-all": {
      type: "product_type",
    },
    "/beauty/makeup/face/concealer-correctors": {
      type: "brand",
    },
    "/toiletries/bootsdental/teeth-whitening": {
      type: "rating",
    },
    "/la-roche-posay/la-roche-posay-cleansers-toners": {
      type: "skin_type",
    },
    "/beauty/makeup/face/blusher": {
      type: "format",
    },
    "/baby-child/pushchairs-car-seats/pushchairs-strollers-prams-doubles": {
      type: "product_type",
    },
    "/opticians/prescription-sunglasses/all-sunglasses-boots-opticians": {
      type: "price",
    },
    "/no7-make-up/no7-make-up-face": {
      type: "brand",
    },
    "/toiletries/travel-toiletries": {
      type: "product_type",
    },
    "/oral-b/oral-b-replacement-brush-heads": {
      type: "brand",
    },
    "/baby-child/mothercare-clothing/mothercare-boys-clothes-9-months-6-years": {
      type: "size",
    },
    "/health-pharmacy/medicines-treatments/allergy-hayfever": {
      type: "brand",
    },
    "/shop-all-dior": {
      type: "product_type",
    },
    "/no7-new": {
      type: "promotion",
    },
    "/electrical/hair-styling-tools/hair-dryers": {
      type: "product_type",
    },
    "/beauty/makeup/eyebrows": {
      type: "rating",
    },
    "/clarins/clarins-skincare": {
      type: "product_type",
    },
    "/no7/no7-shop-all": {
      type: "brand",
    },
    "/gift/by-recipient/her": {
      type: "price",
    },
    "/electrical/hair-styling-tools/hair-curlers": {
      type: "brand",
    },
    "/toys": {
      type: "age_range",
    },
    "/beauty/makeup/eyes/mascara": {
      type: "brand",
    },
    "/fragrance-offers/fragrance-offers-save-up-to-half-price": {
      type: "gender",
    },
    "/beauty/hair/hair-dye/all-hair-dye-at-home-for-men-women": {
      type: "hair_colour",
    },
    "/baby-and-child-savings": {
      type: "gender",
    },
    "/the-inkey-list-shop-all": {
      type: "product_type",
    },
    "/beauty/makeup/eyes/eye-palettes": {
      type: "brand",
    },
    "/baby-child/babyfeeding/baby-food-weaning": {
      type: "brand",
    },
    "/electrical/hair-styling-tools/hair-straighteners": {
      type: "rating",
    },
    "/toiletries-and-haircare-savings": {
      type: "product_type",
    },
    "/drunk-elephant/drunk-elephant-sets": {
      type: "brand",
    },
    "/health-pharmacy/vitaminsandsupplements/multivitamins": {
      type: "brand",
    },
    "/campaign-list-nine": {
      type: "brand",
    },
    "/nyx-professional-makeup/nyx-professional-makeup-shop-all": {
      type: "product_type",
    },
    "/baby-child/babyfeeding/baby-milk-formula": {
      type: "brand",
    },
    "/loreal-make-up": {
      type: "product_type",
    },
    "/clinique/clinique-skincare": {
      type: "product_type",
    },
    "/beauty/hair/hair-dye/hair-dye-permanent": {
      type: "hair_colour",
    },
    "/electrical/hair-styling-tools/hot-brushes-air-stylers": {
      type: "brand",
    },
    "/elemis-shop-all": {
      type: "product_type",
    },
    "/benefit/all-benefit-products": {
      type: "product_type",
    },
    "/beauty/skincare/facial-skincare/cleanser-toner": {
      type: "product_type",
    },
    "/fragrance/fragrance-gift-sets": {
      type: "gender",
    },
    "/health-pharmacy/medicines-treatments/footcare": {
      type: "brand",
    },
    "/no7-online-only": {
      type: "brand",
    },
    "/no7-skincare/no7-skincare-protect-perfect": {
      type: "brand",
    },
    "/holidays/fake-gradual-tan": {
      type: "brand",
    },
    "/beauty/makeup/brushes-sponges": {
      type: "brand",
    },
  }

  let types = {
    0: "brand",
    1: "promotion",
    2: "product_type",
    3: "gender",
    4: "price", 
    5: "spf",
    6: "rating",
    7: "skin_type",
    8: "foundation_coverage",
    9: "format",
    10: "size",
    11: "age_range",
    12: "hair_colour",
  }


//  export const filterObj = {
//   "/christmas/christmas-3-for-2": {
//    type: 'price',
//   },
//   "/christmas/all-christmas": {
//     type: 'price',
//    },
//   "/fragrance/perfume/all-perfume": {
//     type: 'brands',
//     brands: [
//         'Christian Dior',
//         'Paco Rabanne',
//         'YVES SAINT LAURENT',
//         'Hugo Boss',
//         'Marc Jacobs',
//         'Lancome',
//         'Gucci',
//         'Giorgio Armani',
//         'Calvin Klein', 
//         'Dolce & Gabbanna',
//         'Thierry Mugler',
//         'Estee Lauder'
//     ]
//   },

//   "/fragrance/aftershave/mens-aftershave": {
//     type: 'brands',
//     brands: [
//       'Christian Dior',
//       'Hugo Boss',
//       'Paco Rabanne',
//       'Giorgio Armani',
//       'Prada',
//       'Tom Ford',
//       'YVES SAINT LAURENT',
//       'Jean Paul Gautier',
//       'Calvin Klein', 
//       'Dolce & Gabbanna',
//   ]
//   },
// };

const { ID } = shared;

/**
 *
 * @returns the brand hero filters if in list or if on page
 */

export const brandFilters = (matchingURL) => {
  const brandData = matchingURL.brands;

  const allBrandFilters = document.querySelectorAll("#productsFacets #brand .facetSelect li");

  for (let index = 0; index < allBrandFilters.length; index += 1) {
    const element = allBrandFilters[index];
    const filterName = element.querySelector('.outline *[id^="facetLabel_"]');

    // add the hardcoded brands
    if (matchingURL.brands !== true) {
      if (brandData.indexOf(filterName.textContent) > -1) {
        const filterTarget = element.querySelector(".facetbutton").id;

        const brandFilter = document.createElement("div");
        brandFilter.classList.add(`${ID}-topFilter`);
        brandFilter.classList.add("swiper-slide");
        brandFilter.setAttribute("filter-target", filterTarget);
        brandFilter.innerHTML = `<span>${filterName.textContent}</span>`;

        document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(brandFilter);
      }
    }
  }
};

/**
 *
 * @returns the review filter object
 */
export const reviewsData = () => {
  let filters;
  const filterArr = [];

  filters = document.querySelectorAll("#rating .facetSelect li a");

  for (let index = 0; index < filters.length; index += 1) {
    const element = filters[index];
    const elID = element.getAttribute("id");
    const elName = `${element.querySelector(".outline [id*=facetLabel_-]").getAttribute("title")}`;

    // if rating
    const dataObj = {};
    if (elName) {
      dataObj["name"] = elName;
    }
    dataObj["target"] = elID;
    filterArr.push(dataObj);
  }

  return filterArr;
};

/**
 *
 * @returns the price filter object
 */
export const priceData = () => {
  let filters;
  const filterArr = [];

  filters = document.querySelectorAll("#price .facetSelect li a");

  for (let index = 0; index < filters.length; index += 1) {
    const element = filters[index];
    const elID = element.getAttribute("id");
    const elName = `${element.querySelector("[id*=facetLabel]").textContent.trim()}`;

    // if rating
    const dataObj = {};
    if (elName) {
      dataObj["name"] = elName;
    }
    dataObj["target"] = elID;
    filterArr.push(dataObj);
  }

  return filterArr;
};

export const personalisedFilters = (filterName) => {
  let filters;
  const filterArr = [];
  filterName = filterName.replaceAll('_', ' ');
  const matchingFilterCat = document.getElementById(filterName);

  filters = matchingFilterCat.querySelectorAll(`.facetSelect li a`);

  for (let index = 0; index < filters.length; index += 1) {
    const element = filters[index];
    const elID = element.getAttribute("id");

    console.log(filterName);

    let elName = `${element.querySelector("[id*=facetLabel]").textContent.trim()}`;

    if (filterName === 'rating') {
      elName = `${element.querySelector("[id*=facetLabel]").title.trim()}`;
    }

    // if rating
    const dataObj = {};
    if (elName) {
      dataObj["name"] = elName;
    }
    dataObj["target"] = elID;
    filterArr.push(dataObj);
  }

  return filterArr;
};

/**
 *
 * @returns the review hero filters
 */

export const addReviewFilters = () => {
  const allFilters = reviewsData();

  Object.keys(allFilters).forEach((i) => {
    const data = allFilters[i];
    const filter = document.createElement("div");
    filter.classList.add(`${ID}-topFilter`);
    filter.classList.add("swiper-slide");
    filter.setAttribute("filter-target", data.target);
    filter.innerHTML = `<span>${data.name}</span>`;
    document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(filter);
  });
};

/**
 *
 * @returns the price hero filters
 */

export const addPriceFilters = () => {
  const allFilters = priceData();

  Object.keys(allFilters).forEach((i) => {
    const data = allFilters[i];
    const filter = document.createElement("div");
    filter.classList.add(`${ID}-topFilter`);
    filter.classList.add("swiper-slide");
    filter.setAttribute("filter-target", data.target);
    filter.innerHTML = `<span>${data.name}</span>`;
    document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(filter);
  });
};

