import settings from '../../lib/settings';
const {
    ID
} = settings;
//Build the actual carousel
function buildCarousel(nodeList) {

    // Remove THIS product if it exists in the nodeList
    // Array.from(nodeList).forEach((el, index) => {
    //   console.log(el);
    //   const 
    // })

    let htmlBlock = '';
    let counter = 0;
    for (let i = 0; i < nodeList.length; i += 1) {
        const prodLink = nodeList[i].querySelector('.ProductImageList').href;
        const prodImage = nodeList[i].querySelector('.MainImage').src;
        const prodBrand = nodeList[i].querySelector('.TextSizeWrap h4 .productdescriptionbrand').textContent.trim();
        const prodDesc = nodeList[i].querySelector('.TextSizeWrap h4 .productdescriptionname').textContent.trim();
        const prodPrice = nodeList[i].querySelector('.TextSizeWrap .s-producttext-price .curprice').textContent.trim();

        if (window.location.href && window.location.href.indexOf(prodLink) == -1) {
          htmlBlock += `
          <div class="${ID}_carousel__item">
              <a href="${prodLink}" class="${ID}_carousel__itemWrap">
                  <ul class="${ID}_carousel__list">
                      <li class="${ID}_carousel__listItem">
                      <img src="${prodImage}" class="${ID}_carousel__image">
                      </li>
                      <!--End Item-->
                      <li class="${ID}_carousel__listItem">
                      <span class="${ID}_carousel__brand">${prodBrand}</span>
                      </li>
                      <!--End Item-->
                      <li class="${ID}_carousel__listItem">
                      <span class="${ID}_carousel__desc">${prodDesc}</span>
                      </li>
                      <!--End Item-->
                      <li class="${ID}_carousel__listItem">
                      <span class="${ID}_carousel__price">${prodPrice}</span>
                      </li>
                      <!--End Item-->
                  </ul>
              </a>
          </div>
          <!--End item-->
          `;
          counter += 1;
          if (counter === 10) {
              break;
          }
        }

    }

    return htmlBlock;
}

function Carousel() {
    return new Promise((res, reject) => {
        const gender = window.dataLayer[1].productGender;
        const productBrand = window.dataLayer[1].productBrand.toLowerCase().replace(/\s/g, '-');

        let queryString;
        switch (gender) {
            case 'Women':
                queryString = `https://www.flannels.com/women/brands/${productBrand}#dcp=1&dppp=100&OrderBy=rank`;
                break;
            case 'Men':
                queryString = `https://www.flannels.com/men/brands/${productBrand}#dcp=1&dppp=100&OrderBy=rank`;
                break;
            default:
                break;
        }
        //Get top 5 products
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
    
            if (xhr.readyState !== 4) return;
    
            if (xhr.status >= 200 && xhr.status < 300) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xhr.responseText, "text/html");
                const elem = doc.querySelectorAll('#navlist li');
                res(elem);
            } else {
                console.log('The request failed!');
            }
        };
        xhr.open('GET', queryString);
        xhr.send();
    });
}
export {Carousel, buildCarousel};