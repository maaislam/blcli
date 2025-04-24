import { getStorage, setStorage } from './local-storage.function';

const scentGenderPrefix = {
  MASCULINE: encodeURIComponent('AFLOR^') + 'Mens',
  FEMININE: encodeURIComponent('AFLOR^') + 'Womens',
  UNISEX: encodeURIComponent('AFLOR^') + 'Unisex+Adults',
};

const genderPath = {
  MASCULINE: '/beauty/perfumes/mens',
  FEMININE: '/beauty/perfumes/womens',
  UNISEX: '/beauty/perfumes/unisex-adults',
};

const scentPath = {
  'FRUITY/FLORAL': 'SCENT^Floral,Fruity,Floral-Fruity',
  'FRESH/ZESTY': 'SCENT^Fresh,Fresh-Zest,Zest',
  'SPICY/ORIENTAL': 'SCENT^Oriental,Spicy,Spicy-Oriental',
  'WOODY/MUSKY': 'SCENT^Woody-Musk',
};

const pricePath = {
  'UP TO £40': 'APRI^0-40',
  '£40-£80': 'APRI^40-80',
  '£80-£120': 'APRI^80-120',
  'OVER £120': 'APRI^120-1000',
};

/**
 * @returns {string}
 */
export const getRequestUrl = () => {
  const storage = getStorage();

  const pathname = encodeURIComponent(genderPath[storage.steps[2]]);

  const scentPrefix = scentGenderPrefix[storage.steps[2]];

  const scent = scentPath[storage.steps[3]];

  const price = pricePath[storage.steps[4]];

  const selectedFilters = `${scentPrefix}${encodeURIComponent(
    `|${scent}|${price}`
  )}`;

  return `https://www.houseoffraser.co.uk/api/productlist/v1/getforcategory?categoryId=HOF_101PERFUMEAFTERSHAVE&page=1&productsPerPage=36&sortOption=rank&selectedFilters=${selectedFilters}&isSearch=false&searchText=&columns=4&mobileColumns=2&clearFilters=false&pathName=${pathname}&searchTermCategory=&selectedCurrency=GBP&portalSiteId=318&searchCategory=`;
};

export const fetchProducts = () => {
  fetch(getRequestUrl())
    .then((response) => response.json())
    .then(
      /**
       * @param {{
       *  numberOfProducts: number;
       *  products: {
       *    imageSashUrl: string,
       *    url: string,
       *    image: string,
       *    imageLarge: string,
       *    alternativeImage?: null,
       *    alternativeImageLarge?: null,
       *    productId: string,
       *    colourId: string,
       *    hidePrice: boolean,
       *    brand: string,
       *    name: string,
       *    showFromPriceLabel: boolean,
       *    price: string,
       *    ticketPrice: string,
       *    sizes: string,
       *    nonBuyableProductText?: null,
       *    averageRating?: null,
       *    numberOfRatings: number,
       *    showTicketPrice: boolean,
       *    productRollupVariants?: null,
       *    topProductRollupVariants?: null,
       *    showProductRollupVariantMoreLink: boolean,
       *    productRollupVariantMoreCount: number,
       *    showTicketPricePrefix: boolean,
       *    discountPercentage: number,
       *    colourName: string,
       *    priceUnFormatted: number,
       *    priceLabel?: null,
       *    imageAltText: string,
       *    productSequenceNumber: number,
       *    rank: number,
       *    noFollowPdpLink: boolean,
       *    discountPercentText: string,
       *    imageSash: string,
       *    productSizes: {
       *      useAlternateSizes: boolean,
       *      sizes: string,
       *      minSize?: null,
       *      maxSize?: null,
       *      alternateSizesText?: null,
       *    },
       *    financeMonthlyPayment?: null,
       *    taxonomy?: null,
       *    webCategory: string,
       *    lazyLoad: boolean,
       *  }[];
       *}} data
       * */
      (data) => {
        Promise.all([

          
          data.products.map((productGeneralInfo, index) => {
            if (index > 9) return;

            return fetch(
              `https://www.houseoffraser.co.uk/productdetail/getcolourvariantsforproduct?productId=${productGeneralInfo.productId}&selectedCurrency=GBP`
            )
              .then((response) => response.json())
              .then(
                /**
                 * @param {{
                 *  sizeText: string;
                 *  colourText: string;
                 *  selectText: string;
                 *  viewProductText: string;
                 *  addToBagText: string;
                 *  addToWishListText: string;
                 *  bagToolTipText: string;
                 *  clickToSelectText: string;
                 *  productDisplayName: string;
                 *  selectedColourVariantId: string;
                 *  isPersonalisable: boolean;
                 *  ageRestriction: number;
                 *  isEvoucher: boolean;
                 *  description: string;
                 *  promotionInfoText: string;
                 *  fromText: string;
                 *  productShortDescription: string;
                 *  productCodeText: string;
                 *  productDescriptionReadMoreText: string;
                 *  viewProductTextAlt: string;
                 *  isProductInActiveGiftPromotion: boolean;
                 *  showColour: boolean;
                 *  sizeGuideText: string;
                 *  variantsData?:
                 *    | {
                 *        altImages?: string[] | null,
                 *        imageUrl: string,
                 *        thumbnailUrl: string,
                 *        detailsUrl: string,
                 *        colVarId: string,
                 *        colourName: string,
                 *        preOrderAvailableDate: string,
                 *        sizeVariants?:
                 *          | {
                 *              sizeName: string,
                 *              sizeVarId: string,
                 *              preOrderable: boolean,
                 *              preOrderDate: string,
                 *              prodSizePrices: {
                 *                refPrice: string,
                 *                sellPrice: string,
                 *                showRefPrice: boolean,
                 *                priceUnFormatted: string,
                 *              },
                 *              suppliedBy?: string | null,
                 *            }[]
                 *          | null,
                 *        prodVarPrices: {
                 *          refPrice: string,
                 *          sellPrice: string,
                 *          showRefPrice: boolean,
                 *          priceUnFormatted: string,
                 *        },
                 *      }[]
                 *    | null;
                 *}} dataSingle
                 * */
                (dataSingle) => {
                  const storage = getStorage();

                  const updatedProduct = {
                    ...productGeneralInfo,
                    productShortDescription: dataSingle.productShortDescription
                      .replace('<ul>', '')
                      .replace('<li>', '')
                      .replace('</li>', '')
                      .replace('</ul>', ''),
                    // Get add to bad ID
                    addToBadId: dataSingle.variantsData
                      ?.find?.(
                        (variant) =>
                          variant.colVarId === productGeneralInfo.colourId
                      )
                      ?.sizeVariants?.find?.(
                        (variant) =>
                          variant.prodSizePrices.sellPrice ===
                          productGeneralInfo.price
                      )?.sizeVarId,
                  };

                  setStorage({
                    ...storage,
                    steps: {
                      ...storage.steps,
                      5: {
                        numberOfProducts: data.numberOfProducts,
                        products: storage.steps[5]?.products
                          ? [...storage.steps[5].products, updatedProduct]
                          : [updatedProduct],
                      },
                    },
                  });

                  return updatedProduct;
                }
              );
          }),
        ]);
      }
    );
};

/**
 * Get the url needed to redirect client to the filtered perfume page
 * @returns {string}
 */
export const getSeeAllMatchesUrl = () => {
  const storage = getStorage();

  const pathname = genderPath[storage.steps[2]];

  const scent = encodeURIComponent(scentPath[storage.steps[3]]);

  const price = encodeURIComponent(pricePath[storage.steps[4]]);

  return `${pathname}#dcp=1&dppp=36&OrderBy=rank&Filter=${scent}|${price}`;
};
