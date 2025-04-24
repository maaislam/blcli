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
  target: ["/makiyazh"],
  panels: [
    {
      position: 2,
      page: 2,
      type: "review",
      content: {
        textBefore: "Product name",
        review:
          "“Can we use this template to highlight an excellent customer review”",
        textAfter: "Anna P.",
        button: {
          label: "Shop now",
          url: "https://www.avon.ru/product",
        },
      },
    },
    {
      position: 7,
      page: 1,
      type: "discountNoCode",
      content: {
        textBefore: "TIME TO INDULGE",
        discount:
          "https://cdn-eu.dynamicyield.com/api/9877937/images/1f1226a31c2ea__group_10_3.png",
        image:
          "https://cdn-eu.dynamicyield.com/api/9877937/images/62de58dc787__1223000-sw-022-gd-apr2321-cmyk.png",
        textAfter: "Lip Products",
        button: {
          label: "Shop now",
          url: "https://www.avon.ru/product",
        },
      },
    },
    {
      position: 19,
      page: 1,
      type: "discountCode",
      content: {
        textBefore: "TIME TO INDULGE",
        discount: "20% OFF",
        code: "Code: Hello20",
        button: {
          label: "Shop now",
          url: "https://www.avon.ru/product",
        },
      },
    },
    {
      position: 16,
      page: 1,
      type: "general",
      content: {
        image:
          "https://cdn-eu.dynamicyield.com/api/9877923/images/49b94fccdddd__reviews_placeholder_asset.png",
        textBefore: "SELF CARE. SELF LOVE.",
        title: "EXPLORE OUR RANGE OF AWARD WINNING SKINCARE TODAY",
        button: {
          label: "Shop now",
          url: "https://www.avon.ru/product",
        },
      },
    },
    {
      position: 7,
      page: 2,
      type: "category",
      content: {
        image:
          "https://cdn-eu.dynamicyield.com/api/9877923/images/49b94fccdddd__reviews_placeholder_asset.png",
        title: "Product name",
        text: "“Can we use this template to highlight an excellent customer review”",
        button: {
          label: "Shop now",
          url: "https://www.avon.ru/product",
        },
      },
    },
    {
      position: 10,
      page: 2,
      type: "product",
      content: {
        image:
          "https://cdn-eu.dynamicyield.com/api/9877923/images/49b94fccdddd__reviews_placeholder_asset.png",
        priceNow: "£20.99",
        colour: {
          hex: "#A3081D",
          text: "white",
        },
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
