import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

const QuickView = (productURL) => {
  const [prodData, setProdData] = useState();

  // const addToBagRequest = (prodAddSKU, prodName, metricQTY, price,) => {
  //   // IF PLP
  //   window.setCurrentId("add2CartBtn");
  //   window.setupShop5DataRedesign(
  //     window.sanitizeCoreMetricsInput("selectedVariantCatId") != "" ? window.sanitizeCoreMetricsInput("selectedVariantCatId") : "10291592.P",
  //     "Maybelline Lash Sensational Sky High Mascara 7.2ml",
  //     window.sanitizeCoreMetricsInput("quantity_2496427"),
  //     "£11.49",
  //     "undefined",
  //     "Search Lister",
  //     "N",
  //     "",
  //     "Home | Search: mascara-_--_--_--_-",
  //     "N",
  //     "N",
  //     "Y",
  //     "N",
  //     "Search Successful",
  //     "",
  //     "",
  //     "add2CartBtn_2496427",
  //     "",
  //     "1"
  //   );
  //   window.shoppingActionsJS.Add2ShopCartAjaxRedesign("entitledItem_2496427", 1, false);

  //   // IF PDP
  //   window.setCurrentId("add2CartBtn");
  //   window.setupShop5DataRedesign(
  //     "10319077.P",
  //     "REN Clean Skincare Regime Kit: Stop Being So Sensitive",
  //     window.sanitizeCoreMetricsInput("quantity_2734262"),
  //     window.parseCurrencyAsNumber("cm_productPrice"),
  //     "2764182",
  //     "PDP",
  //     window.sanitizeCoreMetricsInput("cvosClicked"),
  //     "",
  //     "-_--_--_--_-",
  //     "N",
  //     "N",
  //     "Y",
  //     "Y",
  //     "Product: REN Clean Skincare Regime Kit: Stop Being So Sensitive (10319077.P)",
  //     "",
  //     "",
  //     "add2CartBtn"
  //   );
  //   window.productDisplayRedesignJS.Add2ShopCartAjax("entitledItem_2734262", 1, false);
  // }

  useEffect(() => {
    if (productURL) {
      fetch(productURL.productURL)
        .then((response) => response.text())
        .then((text) => {
          const tempElement = document.createElement("div");
          tempElement.innerHTML = text;

          //let hasOptions = false;
          let prodDesc;

          const productSKU = tempElement.querySelector("#cvosVariantId_1").value.replace(".P", "");
          const productImage = `https://boots.scene7.com/is/image/Boots/${productSKU}?op_sharpen=1`;


   
          // // Rebuild description if it has extra tags to avoid html issue
          // if (
          //   tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:nth-child(3)") &&
          //   tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:nth-child(3)").innerText.length > 0 &&
          //   tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:nth-child(3)").innerText.trim() !== ""
          // ) {
          //   prodDesc = tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:nth-child(3)").innerText;
          // } else if(tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:nth-child(2)").innerText.trim() !== "" &&
          // tempElement.querySelector("#contentOmnipresent [dir='ltr'] ul li")) {
          //   prodDesc =  tempElement.querySelector("#contentOmnipresent [dir='ltr'] ul li").innerText.trim();
          // } else if(tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:nth-child(4)") &&
          // tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:nth-child(4)").innerText.length > 0 &&
          // tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:nth-child(4)").innerText.trim() !== "") {
          //   prodDesc = tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:nth-child(4)").innerText;
          // }
        //  if (tempElement.querySelector("#contentOmnipresent strong") && tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:not(#product_long_description)").childNodes.length > 0) {
        //     const nodesEl = tempElement.querySelector("#contentOmnipresent [dir='ltr'] p:not(#product_long_description").childNodes;
        //     let buffer = [];

        //     for (let i = 0; i < nodesEl.length; i++) {
        //       let node = nodesEl[i];

        //       if (node.nodeName === "#text" && node.nodeName !== 'span' && node.textContent.trim().length !== 0) {
        //         buffer.push(node.textContent.trim());
        //       }
        //     }

        //   prodDesc = buffer.join("");
        //   } else {
            prodDesc = tempElement.querySelector("#contentOmnipresent").innerText;
          //}

          const product = {
            productName: tempElement.querySelector("h1").innerText,
            description: prodDesc,
            pointsAmount: tempElement.querySelector(".estore_adcard_points_to_earn_widget").innerText.replace("Boots Advantage Card", ""),
            productNumber: tempElement.querySelector("#productId").innerText,
            prodImage: productImage,
            //inStock: addCTA ? true : false,
            currentPrice: tempElement.querySelector("#estore_product_price_widget .price ").innerText,
            wasPrice: tempElement.querySelector(".was_price was_price_redesign") ? tempElement.querySelector(".was_price was_price_redesign").innerText : "",
          };

          setProdData(product);
        })
        .catch((err) => {
          //
        });
    }
  }, [productURL]);

  return prodData ? (
    <div className="quick-product">
      <div className="quick-image" style={`background-image:url(${prodData.prodImage})`}>
        {window.innerWidth <= 767 ? (
          <div className="product-points">
            <span className="points-icon"></span>
            <span>{prodData.pointsAmount}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info-container">
        <div className="info">
          {window.innerWidth > 767 ? (
            <div className="product-points">
              <span className="points-icon"></span>
              <span>{prodData.pointsAmount}</span>
            </div>
          ) : (
            ""
          )}
          <h4>{prodData.productName}</h4>
          <div className="product-no">
            <span>{prodData.productNumber}</span>
          </div>
          <p className="bodyText">{prodData.description}</p>
          <div className="pricing">
            <h4>{prodData.currentPrice}</h4>
            {prodData.wasPrice !== "" ? <span className="wasPrice">{prodData.wasPrice}</span> : ""}
          </div>
          <div className="product-actions">
            <a className="cta primary" href={productURL.productURL}>
              View product
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="quickViewloader">
      <span></span>
    </div>
  );
};

export default QuickView;
