/*
  target: ["uri1","/uri2/specific"],
  panels: [
    {
      type: "review", "category", "product", "general", "discount" (Specify one of the types)
      position: 2 (Panel will be added after this many products)
      review
        content: {
          textBefore (optional): "Product name",
          review: "This is a review",
          textAfter (optional): "Anna P.",
          button (optional): {
            label: "Shop now",
            url: "https://www.avon.ru/product",
          }
        }
      category
        content: {
          image: "https://www.hosting.com/myimage.jpg",
          title: "PERSUASIVE TEXT HERE",
          text (optional): "Secondary text here",
          button (optional): {
            label: "Start now",
            url: "https://www.avon.ru/product",
          }
        }
      product
        content: {
          image: "https://www.hosting.com/myimage.jpg",
          priceWas (optional): "£25",
          priceNow: "£20",
          colour (optional): {
            label: "Extreme Red",
            hex: "#A3081D",
            text: "#ffffff"
          },
          title: "PERSUASIVE TEXT HERE",
          text (optional): "Secondary text here",
          button (optional): {
            label: "Start now",
            url: "https://www.avon.ru/product",
          }
        }
      general
        content: {
          image: "https://www.hosting.com/myimage.jpg",
          textBefore (optional): "Secondary text here",
          title: "PERSUASIVE TEXT HERE",
          button (optional): {
            label: "Start now",
            url: "https://www.avon.ru/product",
          }
        }
      discountCode
        content: {
          textBefore: "Enjoy up to"
          discount: "50",
          code: "LIP50",
          button (optional): {
            label: "Start now",
            url: "https://www.avon.ru/product",
          }
        }
        discountNocode
        content: {
          image: "https://www.hosting.com/myimage.jpg",
          discount: "https://www.hosting.com/myimage.jpg",
          textBefore: "Enjoy up to"
          textAfter (optional): "Lip balms",
          button (optional): {
            label: "Start now",
            url: "https://www.avon.ru/product",
          }
        }
    }, ...
  ]
*/

export default {
  target: ["/make-up"],
  panels: [
    {
      position: 0,
      page: 1,
      type: "review",
      content: {
        image:
          "https://cdn-eu.dynamicyield.com/api/9877934/images/159f013e8d94f__cannabis_review_za_asset.png",
        textBefore: "CANNABIS CALMING OIL",
        review:
          "“I used this for the first time recently and love it. Brilliant for sensitive skin.”",
        textAfter: "Anna P.",
        button: {
          label: "Shop now",
          url: "https://avon.uk.com/search?q=cannabis%20calm",
        },
      },
    },
    {
      position: 5,
      page: 1,
      type: "discountNoCode",
      content: {
        textBefore: "ANY 2 FOR",
        discount:
          "https://cdn-eu.dynamicyield.com/api/9877934/images/36c73c8197498__r179.png",
        image:
          "https://cdn-eu.dynamicyield.com/api/9877934/images/d208a172655__mascara_discount_za_assets.png",
        textAfter: "Avon True Lash Magnify & Euphoric Mascaras",
        button: {
          label: "Shop now",
          url: "https://my.avon.co.za/special-offers/2497/",
        },
      },
    },
    {
      position: 10,
      page: 1,
      type: "discountNoCode",
      content: {
        textBefore: "ANY 2 FOR",
        contentBg: "rgba(0, 0, 0, 0.24);",
        discount:
          "https://cdn-eu.dynamicyield.com/api/9877934/images/18708689124c1__r399.png",
        image:
          "https://cdn-eu.dynamicyield.com/api/9877934/images/117af60224f67__skincare_discount_za_assets.png",
        textAfter: "ANEW PLATINUM DAY CREAM & NIGHT CREAM",
        button: {
          label: "Shop now",
          url: "https://my.avon.co.za/special-offers/2502/",
        },
      },
    },
    {
      position: 16,
      page: 1,
      type: "product",
      content: {
        image:
          "https://cdn-eu.dynamicyield.com/api/9877934/images/27552b7297d4f__fragrance_tool_za_assets.png",
        title: "FIND YOUR PERFECT FRAGRANCE",
        text: "DISCOVER YOUR PERFECT SCENT WITH OUR FRARANCE FINDER",
        button: {
          label: "Start now",
          url: "https://perfumefinder.avon.co.za/",
        },
      },
    },
  ],
};
