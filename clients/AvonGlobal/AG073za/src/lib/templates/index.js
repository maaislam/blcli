import makeReview from "./review";
import makeCategory from "./category";
import makeProduct from "./product";
import makeGeneral from "./general";
import makeDiscountCode from "./discountCode";
import MakeDiscountNoCode from "./discountNocode";

/*
  Check for required content.
  c: content object.
*/
const contentMatched = (type, c) => {
  let requiredContent = [];

  // Check for required properties in the content.
  if (type === "review") {
    requiredContent = ["review"];
  }
  if (type === "category") {
    requiredContent = ["image", "title"];
  }
  if (type === "product") {
    requiredContent = ["image", "title"];
  }
  if (type === "general") {
    requiredContent = ["image", "title"];
  }
  if (type === "discountCode") {
    requiredContent = ["discount", "textBefore"];
  }
  if (type === "discountNoCode") {
    requiredContent = ["image", "discount", "textBefore"];
  }

  return requiredContent.every((prop) => c.hasOwnProperty(prop));
};

/*
  Create a promotional template block
*/
const createTemplate = (type, content) => {
  // Check for required content.
  if (contentMatched(type, content)) {
    // Make the panel.
    let panel = null;
    if (type === "review") panel = makeReview(content);
    if (type === "category") panel = makeCategory(content);
    if (type === "product") panel = makeProduct(content);
    if (type === "general") panel = makeGeneral(content);
    if (type === "discountCode") panel = makeDiscountCode(content);
    if (type === "discountNoCode") panel = MakeDiscountNoCode(content);

    return panel;
  }

  console.log(`Missing required panel data - AG073`);
  return false;
};

export default createTemplate;
