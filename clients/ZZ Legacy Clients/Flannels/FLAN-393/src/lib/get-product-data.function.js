import shared from '../../../../../core-files/shared';
import { populateCarousel } from './populate-carousel.function';

const { ID } = shared;

export const getProductData = () => {
  DYO.recommendationWidgetData(118707, {}, function (error, data) {

    populateCarousel(data.slots);

    // GOOD ONE
    Promise.all(
      data.slots.map((singleSlot) =>
        fetch(
          `https://www.flannels.com/ProductDetail/GetColourVariantsForProduct?productId=${singleSlot.item.sku}&selectedCurrency=GBP`
        )
          .then((res) => res.json())
          .then((response) => ({
            ...response,
            sku: singleSlot.item.sku,
            brand: singleSlot.item.brand,
            name: singleSlot.item.name,
          }))
      )
    ).then((response) => {
      localStorage.setItem(
        ID,
        JSON.stringify({
          products: response.reduce(
            (acc, current) => ({ ...acc, [current.sku]: current }),
            {}
          ),
        })
      );
    });
  });
};

/**
 * Get storage
 * @returns {{ products: {[key: string]: {
 *  name: string;
 *  brand: string;
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
 *  variantsData: {
 *    altImages: string[];
 *    imageUrl: string;
 *    thumbnailUrl: string;
 *    detailsUrl: string;
 *    colVarId: string;
 *    colourName: string;
 *    preOrderAvailableDate: string;
 *    sizeVariants: {
 *      sizeName: string;
 *      sizeVarId: string;
 *      preOrderable: boolean;
 *      preOrderDate: Date;
 *      prodSizePrices: {
 *        refPrice: string;
 *        sellPrice: string;
 *        showRefPrice: boolean;
 *        priceUnFormatted: string;
 *      };
 *      suppliedBy: null | string;
 *    }[];
 *    prodVarPrices: {
 *      refPrice: string;
 *      sellPrice: string;
 *      showRefPrice: boolean;
 *      priceUnFormatted: string;
 *    };
 *  }[];
 *  sku: string;
 * };
 *  }
 * modal: {
 *  active: {
 *    altImages: string[];
 *    imageUrl: string;
 *    thumbnailUrl: string;
 *    detailsUrl: string;
 *    colVarId: string;
 *    colourName: string;
 *    preOrderAvailableDate: string;
 *    sizeVariants: {
 *      sizeName: string;
 *      sizeVarId: string;
 *      preOrderable: boolean;
 *      preOrderDate: Date;
 *      prodSizePrices: {
 *        refPrice: string;
 *        sellPrice: string;
 *        showRefPrice: boolean;
 *        priceUnFormatted: string;
 *      };
 *      suppliedBy: null | string;
 *    }[];
 *    prodVarPrices: {
 *      refPrice: string;
 *      sellPrice: string;
 *      showRefPrice: boolean;
 *      priceUnFormatted: string;
 *    };
 *  },
 * variants: {
 *    altImages: string[];
 *    imageUrl: string;
 *    thumbnailUrl: string;
 *    detailsUrl: string;
 *    colVarId: string;
 *    colourName: string;
 *    preOrderAvailableDate: string;
 *    sizeVariants: {
 *      sizeName: string;
 *      sizeVarId: string;
 *      preOrderable: boolean;
 *      preOrderDate: Date;
 *      prodSizePrices: {
 *        refPrice: string;
 *        sellPrice: string;
 *        showRefPrice: boolean;
 *        priceUnFormatted: string;
 *      };
 *      suppliedBy: null | string;
 *    }[];
 *    prodVarPrices: {
 *      refPrice: string;
 *      sellPrice: string;
 *      showRefPrice: boolean;
 *      priceUnFormatted: string;
 *    };
 * }[]}}
 */
export const getStorage = () => {
  const storage = localStorage.getItem(ID);

  if (storage) return JSON.parse(storage);

  localStorage.setItem(
    ID,
    JSON.stringify({
      products: {},
      modal: {
        active: null,
        variants: [],
      },
    })
  );

  return JSON.parse(localStorage.getItem(ID));
};

/**
 * @param {ReturnType<getStorage>} data
 */
export const setStorage = (data) => {
  localStorage.setItem(ID, JSON.stringify(data));
};
