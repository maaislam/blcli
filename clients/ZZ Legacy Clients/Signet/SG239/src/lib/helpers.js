import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const openSlideTab = (content) => {
  const tab = document.querySelector(`.${ID}-slideOutTab`);
  const overlay = document.querySelector(`.${ID}-overlay`);


  overlay.classList.add("active");
  tab.classList.add("active");
  tab.classList.remove("closed");
  content.classList.add("active");
  fireEvent('Clicked link ' + content);
  document.documentElement.classList.add("noScroll");
};

export const closeSlideTab = (content) => {
  const tab = document.querySelector(`.${ID}-slideOutTab`);
  const overlay = document.querySelector(`.${ID}-overlay`);

  overlay.classList.remove("active");
  tab.classList.remove("active");
  tab.classList.add("closed");
  content.classList.remove("active");
  document.documentElement.classList.remove("noScroll");
};

export const scrollToElement = (element) => {
  window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 150,
  });
}
export const stockRestyle = () => {
  const storeCheck = document.querySelector("collect-in-store");
  // change styling of shadow root on the stock
  const stockStyle = document.createElement("style");
  stockStyle.innerHTML = `
       .cis { 
        background: white; 
        padding: 0px;
        font-family: Oxygen, Arial, Helvetica, sans-serif;
      } 
       .cis-section-title { display: none }
       .cis-postcode-search__nearby input {
          border: 2px solid #9E9E9E;
          border-right: 0px;
          height: 48px;
          padding: 10px;
          box-sizing: border-box;
       }
       .cis-postcode-search .cis-postcode-search__nearby button { 
          background: #101820;
          border-radius: 0px;
          background-image: url('https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/2ae3ffea-08dd-11ed-841e-4a166223d03e');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 20px;
          width: 50px;
          height: 48px;
          margin-left: -5px;
       }
       .cis-postcode-search .cis-postcode-search__nearby button.t-red-btn {
        border:0px;
       }

       .cis {
         font-family: inherit;
       }
       .cis-bottom-wrapper__title {
         font-size: 12px;
       }
       .cis-bottom-wrapper__title strong {
         font-weight: 300;

       }
       .cis-bottom-section {
         margin-top: 15px;
       }
       .cis-postcode-search__my-location {
         margin-top: 15px;
       }
       .cis-postcode-search__my-location span svg {
         display: none
       }
       .cis-postcode-search__my-location span {
         background: url(https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5044B38A56E6C441402BB7D8743EC0A7DC46CBD647FF0EDB55C21B72C21B1187.png?meta=/SG080---In-Grid-Content-PLP-New/noun_Location_3639309.png) no-repeat center;
         background-size: contain;
         height: 20px;
         width: 20px;
         display: inline-block;
       }
       .cis-postcode-search__my-location button {
         font-family: inherit;
         margin-left: 0;
       }
       .cis-postcode-search .cis-postcode-search__nearby button:disabled {
         background-color: #D9D9D6;
       }
       .cis-postcode-search .cis-postcode-search__nearby button strong {
         display: none;
       }
       .cis-bottom-wrapper {
        display: none;
       }
       .cis-postcode-search__header p {
        font-size: 14px;
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        color: #484849;
       }
       .cis-postcode-search__subheader b {
        font-size: 14px;
        font-weight: 300;
        font-family: Oxygen, Arial, Helvetica, sans-serif;
       }
       .cis-store-view--header svg {
        display: none;
       }
       .cis .cis-store-view--header h2 {
          margin-bottom: 10px;
          margin-left: 0px;
       }
       .cis-postcode {
        background: #f7f6f6;
        padding: 10px;
        margin-top: 10px;
       }
       .cis-postcode button { 
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #212721;
       }
       .cis-store-view__store-details {
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #212721;
       }
       .cis-store-view-address p {
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #484849;
       }
       .cis .cis-store-view {
        background: white;
        margin-bottom: 20px;
        padding: 0px;
       }
       .cis-store-view td {
        background: #F7F6F6;
        padding: 10px;
       }

       .cis-store-view__parent-table {
        border-collapse:separate; 
        border-spacing: 0 1em;
       }
       .cis .cis-store-view__select-store {
        width: auto;
        background: unset;
        border: unset;
        padding: 0px;
        text-align: right;
        display: block;
        margin-right: 0;
        margin-left: auto;
        color: #37A703;
       }
       .cis-store-view-address p:nth-child(3) {
        width: auto;
       }
       .cis-store-view-footer__more-stores {
        height: 50px;
        text-align: center;
        line-height: 26px;
        margin: 0 auto;
        border: 2px solid #101820;
        text-transform: uppercase;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        font-weight: 900;
        display: block;
        text-decoration: none;
        max-width: 250px;
        cursor: pointer;
        background: white;
        color: #101820;
       }
       .cis-store-view-footer__more-stores button {
        font-family: Oxygen, Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: #101820;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: 700;
        transition: all 0.3s ease-in-out;
       }

       .cis-store-view-footer__more-stores:hover {
        background-color: #101820;
      }
      .cis-store-view-footer__more-stores:hover button{
        color: white;
      }
      @media(max-width: 1024px) {
        .cis .cis-store-view__inner-table tr td:last-child {
          display: flex;
          flex-direction: column;
          align-items: baseline;
          justify-content: flex-start;
          margin-left: 0;
        }
        .cis-store-view__inner-table tr td:last-child p {
          margin-top: 0px;
        }
      }
     `;

  storeCheck.shadowRoot.appendChild(stockStyle);
};

export const keyFeatures = () => {
  let features = [];

  const specs = document.querySelectorAll('.product-specification tr');
  for (let index = 0; index < specs.length; index += 1) {
    const element = specs[index];
    if(element.querySelector('td')){
      if(element.querySelector('td').textContent === 'Stone setting') {
        features.push(element.querySelector('td').nextElementSibling.textContent + ' stone setting');
      }
      if(element.querySelector('td').textContent === 'Stone shape') {
        features.push(element.querySelector('td').nextElementSibling.textContent + ' stone shape');
      }
      if(element.querySelector('td').textContent === 'Stone style') {
        features.push(element.querySelector('td').nextElementSibling.textContent + 'style');
      }
      if(element.querySelector('td').textContent === 'Stone type') {
        features.push(element.querySelector('td').nextElementSibling.textContent + ' stone');
      }
    }
  }

  return features;

}

export const switchQuestion = (event, answerType) => {

  let allTabLinks;
  let allTabContent;
  

  allTabContent = document.querySelectorAll(`.${ID}-answer`);
  for (let i = 0; i < allTabContent.length; i += 1) {
      allTabContent[i].classList.remove('active');
  }
 
  allTabLinks = document.querySelectorAll(`.${ID}-question`);
  for (let j = 0; j < allTabLinks.length; j++) {
      allTabLinks[j].classList.remove('active');
  }

  document.querySelector(`.${ID}-answer.${answerType}`).classList.add('active');
  event.currentTarget.classList.add('active');
}

export const addWarranty = () => {
  const warrantyOptions = document.querySelector("warranty-options");
  document.body.appendChild(warrantyOptions);
  const price = document.querySelector("warranty-options").shadowRoot.querySelector(".c-product-warranty-summary__starting-price").textContent;

  const warrantyHTML = `<section class="${ID}-insurance">
  <div class="${ID}__sectionContainer">
      <div class="${ID}__row">
          <div class="${ID}-image"></div>
          <div class="${ID}-textBlock">
              <div class="inner">
                  <h2>H.Samuel Premier Care</h2>
                  <p>Few possessions mean as much to us as a watch or a special piece of jewellery. That’s why peace of mind is so important. With H.Samuel Premier Care, you’ll know that your valuable item is protected wherever you are in the world (limits and exclusions apply).</p>
                  <p>Choose a 2,3 or 5 year Platinum Care policy which includes theft & accidental cover from only <b>${price}</b></p>
                  <div class="${ID}-ctas">
                      <a class="${ID}__button secondary">Learn More</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>
`;

  document.querySelector(`.${ID}-appointment`).insertAdjacentHTML("beforebegin", warrantyHTML);

  document.querySelector(`.${ID}-insurance .${ID}__button`).addEventListener("click", () => {
    warrantyOptions.shadowRoot.querySelector(".c-product-warranty-summary__button-prompt").click();
  });

  // styling
  warrantyOptions.shadowRoot.querySelector(".c-product-warranty-summary").style = "display: none";
};
