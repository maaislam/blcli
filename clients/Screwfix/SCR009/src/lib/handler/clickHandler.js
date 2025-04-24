import { fireEvent } from "../../../../../../core-files/services";

export const clickHandler = (target) => {
  if (target.closest(`button[id^="add_for_collection_button"]`) || target.closest(`button[id^="add_for_sticky_collection_button"]`)) {
    // console.log(`User interacts with Click & collect on pdp`);
    fireEvent(`User interacts with Click and collect on pdp`);
  } else if (target.closest(`button[id="product_add_to_trolley_image"]`) || target.closest(`button[id="product_add_to_trolley_sticky_image"]`)) {
    // console.log(`User interacts with Delivery on pdp`);
    fireEvent(`User interacts with Delivery on pdp`);
  }
};
