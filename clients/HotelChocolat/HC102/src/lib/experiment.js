import { setup, fireEvent } from "../../../../../core-files/services";
import { insertAfterElement } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import card from "./card";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") {
    return;
  }

  console.log(ID);

  let content;

  if (window.location.pathname === "/uk/shop/coffee/pods/") {
    content = {
      type: "coffee",
      image: "https://blcro.fra1.digitaloceanspaces.com/HC102/coffee.png",
      title: "The Podster & Rabot Estate Coffee Subscription",
      text: "Buy your Podster for £74.95 (saving £75) when you subscribe*, and earn chocolate rewards.",
    };
  } else {
    content = {
      type: "chocolate",
      image: "https://blcro.fra1.digitaloceanspaces.com/HC102/chocolate.png",
      title: "The Velvetiser™ & Drinking Chocolate Subscription",
      text: "Buy your VelvetiserTM for £49.95 (saving £50) when you subscribe*, and earn chocolate rewards.",
    };
  }

  const entryElement = document.querySelectorAll(".grid-tile")[7];
  const rootElement = card(
    ID,
    content.image,
    content.title,
    content.text,
    content.type,
    false
  );
  insertAfterElement(entryElement, rootElement);

  if (VARIATION === "4") {
    const secondEntry = document.querySelectorAll(".grid-tile")[1];
    const rootElement2 = card(
      ID,
      "https://blcro.fra1.digitaloceanspaces.com/HC102/both.png",
      "The Velvetiser™ & Podster Subscription",
      "Buy both machines for £124.90 (saving £125) when you subscribe*, and earn chocolate rewards.",
      window.location.pathname === "/uk/shop/coffee/pods/"
        ? "coffee"
        : "chocolate",
      true
    );
    insertAfterElement(secondEntry, rootElement2);
  }

  // Tracking
  const addedElements = document.querySelectorAll(`.${ID}-root`);
  addedElements.forEach((el) =>
    el.addEventListener("click", () => fireEvent("In-grid item clicked"))
  );
  // Tracking End
};
