export default function getProductData() {
  const foundProductSections = (function getProductsPerSection() {
    const productSections = document.querySelectorAll(
      ".brand-list-wrapper > div"
    );

    return [...productSections].reduce((prev, current) => {
      const id = current.id;
      const products = current.getElementsByClassName("product-item");

      const data = [...products].map((product) => {
        const name = product
          .querySelector(".product-item-link")
          .textContent.trim()
          .split(":");

        const filter = id;
        const url = product.querySelector(".product-item-link").href;
        const brand = name[0].trim();
        const title = name[1] ? name[1].trim() : "";
        const image = product
          .querySelector("img")
          .getAttribute("data-original");
        const price = product
          .querySelector(
            ".price-box > .price-container > .price-wrapper > .price, .price-box > .special-price .price, .price-box > .normal-price .price"
          )
          .textContent.trim();
        const oldPrice = product
          .querySelector(".old-price .price")
          ?.textContent.trim();

        const fastSellingItems = [
          `"I'm Vengeance" Premium Hoodie`,
          `Han Solo Hoth Replica Jacket`,
          `Replica Chest Emblem`,
          `Embrace The Chaos Premium Hoodie`,
          `Luffy Straw Hat Cosplay Replica`,
          `Chaos Undivided Premium Jacket`,
          `Ork Replica Flight Jacket`,
          `Straight Outta Gotham Premium Hoodie`,
          `Logo Light`,
          `Gryffindor Oversized Blanket Hoodie`,
          `Darkness Within Necron Jacket`,
          `Last Son Of Krypton Black Superman Hoodie`,
          `24K Gold Plated Replica Chest Emblem`,
          `Slytherin Oversized Blanket Hoodie`,
          `Through The Ashes Imperium Jacket`,
          `Premium Jacket`,
          `Ultimate Web Head Premium Hoodie`,
          `A Grand Night In Gromit Shaped Mug`,
          `Cowl Cap`,
          `Bat-tle Ready Premium Jacket`,
          `Space Cadet Hoodie`,
          `I Could Wear This All Day Premium Hoodie`,
          `Imperium Bathrobe`,
          `Exodia The Forbidden One Limited Edition 24K Gold Plated Ingot Set`,
          `Limited Amber Edition Welcome Kit`,
          `Stormtrooper Bookends`,
          `Snapback Cap`,
          `"I am the Shadows" Premium Jacket`,
          `Pot Of Greed Limited Edition Tankard`,
          `Welcome To The Family Premium Hoodie`,
          `Gama-Chan Replica Coin Purse`,
          `Limited Edition 24K Gold and .999 Silver Plated S.T.A.R.S. Badge Medallion`,
          `Ultramarines Hoodie`,
          `Chaos Bathrobe`,
          `Vengeance Hoodie`,
          `Life is a Gift Memento Mori Coin`,
          `Vault Dweller's Welcome Kit`,
          `Japanese Logo Messenger Bag`,
          `Fellowship Tankard`,
          `Return Of The Bat Jacket`,
        ];

        const fastSelling = fastSellingItems.includes(title) ? true : false;

        return {
          url,
          brand,
          title,
          image,
          price,
          oldPrice,
          fastSelling,
          filter,
        };
      });

      return { ...prev, [id]: { ...data } };
    }, {});
  })();

  const productSchema = {
    clothing: {
      match: [
        "mens-t-shirts",
        "christmas-sweaters",
        "dressing-gowns--bathrobes",
        "hoodies-and-sweatshirts",
        "jackets-and-outerwear",
        "slippers",
        "wallets-and-purses",
        "bags",
        "caps",
        "ladies-hoodies-and-sweatshirts",
        "socks",
        "scarves",
        "earrings",
        "beanies",
        "nightwear-and-pyjamas",
        "necklaces",
        "cosplay",
        "gloves",
        "jewellery",
      ],
      products: [],
    },
    "home-and-office": {
      match: [
        "home-and-office",
        "cups-coasters-and-mugs",
        "candles",
        "christmas-decorations",
        "kitchenware",
        "lights",
        "doormats--doorstops",
        "posters-and-wallscrolls",
        "stationery",
        "throws--blankets",
        "kitchen-storage",
        "kitchen-gadgets",
      ],
      products: [],
    },

    "toys-and-gadgets": {
      match: [
        "badges",
        "keyrings",
        "models-and-figures",
        "plushies",
        "props--replicas",
        "props-figures-and-plushies",
        "accessories",
        "games",
        "money-boxes",
        "watches",
        "bottle-openers",
        "computer-tablets--mobile",
        "stress-toys",
      ],
      products: [],
    },
  };

  Object.keys(foundProductSections).forEach((section) => {
    Object.keys(productSchema).forEach((category) => {
      if (productSchema[category]["match"].includes(section)) {
        productSchema[category]["products"].push(
          ...Object.values(foundProductSections[section])
        );
      }
    });
  });

  return Object.keys(productSchema).reduce((prev, current) => {
    return { ...prev, [current]: [...productSchema[current].products] };
  }, {});
}
