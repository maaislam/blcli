import shared from "../../../../../../core-files/shared";


const { ID } = shared;

export default class QuickViewBox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-quickView`);
      element.innerHTML = `
        <div class="${ID}-quickViewContent">
            <div class="${ID}-close"></div>
            <div class="${ID}-productInfo">
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
      
    }
  }




/**
 *  useEffect(() => {
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
 */