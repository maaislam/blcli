import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";
import { modalViewAction } from "./modal";

const { ID, VARIATION } = shared;

const handleModalShowhide = (finalData) => {
  //   console.log("handleModalShowhide");
  modalViewAction(finalData);
};

// Check If offer is already applied in the Basket
const checkIfOfferAlreadyApplied = (basketData) => {
  if (basketData.length > 0) {
    for (let i = 0; i < basketData.length; i++) {
      if (basketData[i].orderItemLevelAppliedPromotions.length > 0) {
        const appliedPromotions = basketData[i].orderItemLevelAppliedPromotions;
        for (let j = 0; j < appliedPromotions.length; j++) {
          if (appliedPromotions[j].description === "3 for 2 on selected No7 - cheapest free") {
            return true;
          }
        }
      }
    }
  }
  return false;
};

// Extract the offer items from the basket
const extractOfferApplicableItems = (basketData) => {
  let extractedData = [];
  if (basketData.length > 0) {
    for (let i = 0; i < basketData.length; i++) {
      let isFound = false;
      if (basketData[i].orderItemLevelApplicablePromotions.length > 0) {
        const applicablePromotions = basketData[i].orderItemLevelApplicablePromotions;
        for (let j = 0; j < applicablePromotions.length; j++) {
          if (
            applicablePromotions[j].description === "3 for 2 on selected No7 - cheapest free"
            // ||(applicablePromotions[j].description.includes("3 for 2") &&
            // applicablePromotions[j].description.includes("cheapest free"))
          ) {
            isFound = true;
            break;
          }
        }
      }
      if (isFound) {
        for (let k = 0; k < basketData[i].quantity; k++) {
          extractedData.push(basketData[i]);
        }
      }
    }
  }

  return extractedData;
};

const processFinalDataFromNewBasket = (newBasketData, type) => {
  const shouldShowOffer = checkIfOfferAlreadyApplied(newBasketData);
  let offerApplicableItems = [];
  if (!shouldShowOffer) {
    offerApplicableItems = extractOfferApplicableItems(newBasketData);
  }

  const finalData = {
    shouldShowOffer: !shouldShowOffer && offerApplicableItems.length > 0,
    offerApplicableItems: offerApplicableItems,
    itemCount: type,
  };
  //   console.log("Call the render method with finalData", finalData);
  // Call the render method with finalData
  localStorage.setItem("finalData", JSON.stringify(finalData));

  handleModalShowhide(finalData);
};

const findTheThirdItemAndProcessNewFinalData = (oldData, newData) => {
  //   console.log("findTheThirdItemAndProcessNewFinalData");

  let oldOfferApplicableItems = extractOfferApplicableItems(oldData);

  const oldPartNumbers = oldData.map((item) => item.partNumber);
  const newAddedItem = newData.filter((newItem) => !oldPartNumbers.includes(newItem.partNumber));

  if (newAddedItem.length == 0) {
    //   No new item, that means quantity increased
    const oldApplicablePartNumbers = oldOfferApplicableItems.map((item) => item.partNumber);
    const newApplicableItems = newData.filter((newItem) => oldApplicablePartNumbers.includes(newItem.partNumber));

    if (newApplicableItems.length > 0) {
      let extractedData = [];
      for (let i = 0; i < newApplicableItems.length; i++) {
        for (let k = 0; k < newApplicableItems[i].quantity; k++) {
          extractedData.push(newApplicableItems[i]);
        }
      }
      const newFinalData = {
        shouldShowOffer: true,
        offerApplicableItems: extractedData,
        itemCount: "Increased",
      };
      //   console.log("Call the render method with newFinalData", newFinalData);
      // Call the render method with newFinalData
      localStorage.setItem("finalData", JSON.stringify(newFinalData));
      handleModalShowhide(newFinalData);
    }
  } else {
    newAddedItem.forEach((item) => {
      oldOfferApplicableItems.push(item);
    });
    const newFinalData = {
      shouldShowOffer: true,
      offerApplicableItems: oldOfferApplicableItems,
      itemCount: "Increased",
    };
    // console.log("Call the render method with newFinalData", newFinalData);
    // Call the render method with newFinalData
    localStorage.setItem("finalData", JSON.stringify(newFinalData));
    handleModalShowhide(newFinalData);
  }
};
const handleOfferApplicableItemsNone = () => {
  //   console.log("No action to take");
};

export const processOfferItemsFromOldBasket = (isFirstLoad) => {
  //   console.log("processOfferItemsFromOldBasket");
  //   if (localStorage.getItem("oldBasketProducts") && localStorage.getItem("oldBasketProducts") !== "undefined") {
  //     console.log(JSON.parse(localStorage.getItem("oldBasketProducts")));
  //   } else {
  //     console.log("oldBasketProducts", null);
  //   }

  if (
    localStorage.getItem("oldBasketData") &&
    localStorage.getItem("oldBasketData") !== "undefined" &&
    JSON.parse(localStorage.getItem("oldBasketData")).length > 0
  ) {
    // on page load
    if (isFirstLoad) {
      if (localStorage.getItem("oldBasketProducts") && localStorage.getItem("oldBasketProducts") !== "undefined") {
        const oldBasketData = JSON.parse(localStorage.getItem("oldBasketProducts"));

        // add the new data to the old data as it was empty
        localStorage.setItem("oldBasketData", JSON.stringify(oldBasketData));

        const currentData = {
          isOfferApplied: checkIfOfferAlreadyApplied(oldBasketData),
          offerApplicableItems: extractOfferApplicableItems(oldBasketData),
        };

        if (!currentData.isOfferApplied && currentData.offerApplicableItems.length > 0) {
          const finalData = {
            shouldShowOffer: true,
            offerApplicableItems: currentData.offerApplicableItems,
            itemCount: "first_load",
          };
          //   console.log("page loaded with offer item added into bag - Call the render method with finalData", finalData);
          //  Will call from here on the first load handleShowOrHideModal
          if (VARIATION == 2) {
            handleModalShowhide(finalData);
          }
        } else {
          //   console.log("page loaded without offer item added into bag");
          handleOfferApplicableItemsNone();
        }
      }
      return !isFirstLoad;
      //   exiting the method to stop further execution
    }
    // on basket update [add to bag and update cart products]
    if (localStorage.getItem("oldBasketProducts") && localStorage.getItem("oldBasketProducts") !== "undefined") {
      const oldBasketData = JSON.parse(localStorage.getItem("oldBasketData"));
      const newBasketData = JSON.parse(localStorage.getItem("oldBasketProducts"));
      //   update the old basket data for next cycle
      localStorage.setItem("oldBasketData", JSON.stringify(newBasketData));

      //   console.log("oldBasketData", oldBasketData);
      //   console.log("newBasketData", newBasketData);
      let oldData = {
        isOfferApplied: false,
        offerApplicableItems: [],
      };
      let newData = {
        isOfferApplied: false,
        offerApplicableItems: [],
      };

      // Set old Is Applied Offer Flag
      oldData.isOfferApplied = checkIfOfferAlreadyApplied(oldBasketData);

      if (!oldData.isOfferApplied) {
        // extract old offer applicable items if offer is not applied
        oldData.offerApplicableItems = extractOfferApplicableItems(oldBasketData);
      }

      // Set new Is Applied Offer Flag
      newData.isOfferApplied = checkIfOfferAlreadyApplied(newBasketData);

      if (!newData.isOfferApplied) {
        // extract new offer applicable items if offer is not applied
        newData.offerApplicableItems = extractOfferApplicableItems(newBasketData);
      }

      //   console.log("oldData", oldData);
      //   console.log("newData", newData);

      if (!oldData.isOfferApplied && !newData.isOfferApplied) {
        // That means offer applicable items has increased or decreased or none of them has offer applicable items
        // console.log("That means offer applicable items has increased or decreased or none of them has offer applicable items");
        if (oldData.offerApplicableItems.length > newData.offerApplicableItems.length) {
          // That means offer applicable items has decreased
          //   console.log("That means offer applicable items has decreased");
          //   as it decreased and offer is not applied yet, so we can extract the offerable items from the newBasket
          processFinalDataFromNewBasket(newBasketData, "Decreased");
        } else if (oldData.offerApplicableItems.length < newData.offerApplicableItems.length) {
          // That means offer applicable items has increased
          //   console.log("That means offer applicable items has increased");
          //   as it increased and offer is not applied yet, so we can extract the offerable items from the newBasket
          processFinalDataFromNewBasket(newBasketData, "Increased");
        } else {
          // That means none of them has offer applicable items or both of them has same offer applicable items
          //   console.log("That means none of them has offer applicable items or both of them has same offer applicable items");
          handleOfferApplicableItemsNone();
        }
      } else if (oldData.isOfferApplied && !newData.isOfferApplied) {
        // That means offer applicable items has decreased
        // console.log("That means offer applicable items has decreased");
        processFinalDataFromNewBasket(newBasketData, "Decreased");
      } else if (!oldData.isOfferApplied && newData.isOfferApplied) {
        // That means offer applicable items has increased and we need to find the third item
        // console.log("That means offer applicable items has increased and we need to find the third item");
        findTheThirdItemAndProcessNewFinalData(oldBasketData, newBasketData);
      } else if (oldData.isOfferApplied && newData.isOfferApplied) {
        // That means none of them has offer applicable items or both of them has same or more than 3 offer applicable items
        // console.log("That means none of them has offer applicable items or both of them has same or more than 3 offer applicable items");
        handleOfferApplicableItemsNone();
      }
    } else {
      localStorage.removeItem("oldBasketData");
      const finalData = {
        shouldShowOffer: false,
        offerApplicableItems: [],
        itemCount: "Basket Empty",
      };
      //   console.log("Call the render method with empty basket Or method to remove the DOM", finalData);
      modalViewAction(finalData);
    }
  } else if (localStorage.getItem("oldBasketProducts") && localStorage.getItem("oldBasketProducts") !== "undefined") {
    const newBasketData = JSON.parse(localStorage.getItem("oldBasketProducts"));

    // add the new data to the old data as it was empty
    localStorage.setItem("oldBasketData", JSON.stringify(newBasketData));

    const currentData = {
      isOfferApplied: checkIfOfferAlreadyApplied(newBasketData),
      offerApplicableItems: extractOfferApplicableItems(newBasketData),
    };

    if (!currentData.isOfferApplied && currentData.offerApplicableItems.length > 0) {
      const finalData = {
        shouldShowOffer: true,
        offerApplicableItems: currentData.offerApplicableItems,
        itemCount: "Increased",
      };

      //   console.log("Call the render method with finalData", finalData);
      // Call the render method with finalData
      //localStorage.setItem("finalData", JSON.stringify(finalData));
      handleModalShowhide(finalData);
    }
  }
};
