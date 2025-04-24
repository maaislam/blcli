import shared from "../../../../../core-files/shared";
import productData from "./data";

const { ID, VARIATION } = shared;

export default class Markup {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }
  create() {

    let url = window.location.pathname;
    const data = productData[url];
    const adPoints = document.querySelector(".estore_adcard_points_to_earn_widget").innerText.replace("Boots Advantage Card", "");
    const currentProductName = document.querySelector("#estore_product_title h1").textContent;

    /**
     * Manual video
     * <video width="100%" height="100%" poster="${data.video.videoPoster}" controls preload="none" muted>
			 <source src="${data.video.videomp4}" type="video/mp4">	
      
	    </video>

     *  <video width="100%" height="100%" controls" preload="auto">
      //   <source src="${data.video}" type="video/mp4"/>
      //   <source src="${data.video}" type="video/webm">
      //   <source src="${data.video}"  type="video/ogg">
      // </video>
     */

    const element = document.createElement("div");
    element.classList.add(`${ID}-heroPDP`);
    element.innerHTML = `
    <div class="${ID}-aboveFold">
      <div class="${ID}-container">
        <div class="${ID}-mainImageCarousel"></div>
        <div class="${ID}-addSection">
          <div class="${ID}-product-points">
            <span class="points-icon"></span>
            <span>${adPoints}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="${ID}-details">
      <div class="${ID}-container">
        <h4>${data.details.title}</h4>
        <div class="${ID}-row">
          <div class="${ID}-image">
            <div class="${ID}-imgBg" style="background-image: url(${data.details.image})"></div>
          </div>
          <div class="${ID}-description">
            <h3>The details</h3>
            <p>${data.details.content}</p>
            ${data.details.bullets ? `
            <ul>
            ${data.details.bullets.map(
              (bullet) =>
              `<li>${bullet}</li>`
              ).join('')}
            </ul>
            ` : ''}
          </div>
        </div>
      </div>
    </div>

    <div class="${ID}-uspSection">
      <div class="${ID}-container">
        <h4>${data.uspSection.title}</h4>
        <div class="${ID}-usps">
        ${data.uspSection.usps.map(
          (item) =>
          `<div class="${ID}-productUSP">
            <div class="${ID}-image"><div class="${ID}-imgBg" style="background-image: url(${item.image})"></div></div>
            <h3>${item.title}</h3>
            ${item.text ? `
            <div class="${ID}-content">
              <p>${item.text}</p>
            </div>` : ''}
          </div>`
          ).join('')}
        </div>
        </div>
    </div>
    <div class="${ID}-video" style="background-image:url(${data.video.videoPoster})"><span></span></div>
    <div class="${ID}-video-container">
      <div class="${ID}-close"></div>
      <video width="100%" height="100%" controls preload="none" muted>
        <source src="${data.video.videomp4}" type="video/mp4">	
      </video>
    </div>
    <div class="${ID}-fullWidthBanner">
      <div class="${ID}-container">
        <div class="${ID}-row">
          <div class="${ID}-image"><div class="${ID}-imgBg" style="background-image: url(${data.fullWidth.image})"></div></div>
          <div class="${ID}-content">
            <h4>${data.fullWidth.title}</h4>
            ${data.fullWidth.content}
          </div>
        </div>
      </div>
    </div>
    <div class="${ID}-tabSection">
      <div class="${ID}-container">
        <div class="${ID}-tabsContainer">
          <div class="${ID}-tabList">
            <div class="${ID}-tab active" type="details"><span>Product Summary</span></div>
            <div class="${ID}-tab" type="delivery"><span>Delivery & Returns</span></div>
            <span class="${ID}-tabs-active-marker"></span>
          </div>
        </div>
        <div class="${ID}-tabContentContainer">
            <div class="${ID}-tabContent open" type="details">
            <div class="${ID}-description">
            </div>
            ${data.description.extraInfo ? `<div class="${ID}-sideNote">${data.description.extraInfo}</div>` : ''}
            </div>
            <div class="${ID}-tabContent" type="delivery"></div>
        </div>
      </div>
    </div>
`;
    this.component = element;

    const productCarousel = document.querySelector('#estore_pdp_image');
    if(productCarousel) {
      element.querySelector(`.${ID}-mainImageCarousel`).appendChild(productCarousel);
    }

    const productAdd = document.querySelector('#estore_pdp_trcol');
    if(productAdd) {
      element.querySelector(`.${ID}-addSection`).appendChild(productAdd);
    }


    // Change styling of product name
    element.querySelector("#estore_product_title h1").innerHTML = `<span>${data.brand}</span>${currentProductName.replace(/(Marc Jacobs|GUCCI|Hugo Boss)/g, '')}`;

    // move find in store
    const findInStore = element.querySelector('.findStore');
    if(findInStore) {
      element.querySelector('#in_stock_actions').insertAdjacentElement('afterbegin', findInStore);
    }

    // Move delivery & description
    if(data.introDesc) {
      const intro = data.introDesc;
      element.querySelector('#estore_product_price_widget').insertAdjacentHTML('beforebegin', `<div class="${ID}-intro"><p>${intro}</p></div>`);
    }

    const delivery = document.querySelector('#estore_pdp_brcol_1 .contentRecommendationWidget .left_espot');
    if(delivery) {
      element.querySelector(`.${ID}-tabContent[type="delivery"]`).appendChild(delivery);
    }

    const prodDesc = document.getElementById('estore_product_longdesc'); 
    if(prodDesc) {
      element.querySelector(`.${ID}-tabContent[type="details"]`).insertAdjacentElement('afterbegin', prodDesc);

      let ingredientsInnerHTML = element.querySelector(`.${ID}-tabContent[type="details"] #product_ingredients`).closest('.product_long_description_subsection').innerHTML;
      ingredientsInnerHTML = ingredientsInnerHTML.replaceAll(' • ', ', ');
      ingredientsInnerHTML = ingredientsInnerHTML.replaceAll('<br>', ', ');
      element.querySelector(`.${ID}-tabContent[type="details"] #product_ingredients`).closest('.product_long_description_subsection').innerHTML = ingredientsInnerHTML;

      if (element.querySelector(`.${ID}-tabContent[type="details"] #product_how_to_use`) && window.location.href.indexOf('redken-one-united-multi-benefit-treatment-spray-increases-manageability-and-protection-150ml-10332825') > -1) {
        element.querySelector(`.${ID}-tabContent[type="details"] #product_how_to_use`).closest('.product_long_description_subsection').querySelector('p:nth-of-type(2)').innerHTML = `
        
          <ul style="padding-left: 20px;">
            <li>Alone: Apply after cleansing to refresh hair between washes.  </li>
            <li>With a rinse-out treatment: Apply after cleansing and before rinse-out treatment. </li>
            <li>With a leave-in treatment: Layered after cleansing.  </li>
            <li>With a styling product: Apply before or after styling.</li>
          </ul>
        
        `;
      }
    }

    if(VARIATION === '2') {
      element.querySelector(`.${ID}-details`).insertAdjacentElement('beforebegin',  element.querySelector(`.${ID}-tabSection`));
    }

  }
  bindEvents() {
    const { component } = this;


    const tabList = component.querySelector(`.${ID}-tabList`);
    const tabs = tabList.querySelectorAll(`.${ID}-tab`);
    const allTabContent = component.querySelectorAll(`.${ID}-tabContent`);

    const resizeTabMarker = () => {
      const activeTabEl = tabList.querySelector(`.${ID}-tab.active`);
      const activeMarker = tabList.querySelector(`.${ID}-tabs-active-marker`);

      activeMarker.style.width = `${activeTabEl.getBoundingClientRect().width}px`;
      activeMarker.style.transform = `translateX(${
        activeTabEl.getBoundingClientRect().left -
        tabList.getBoundingClientRect().left
      }px)`;
    };
 
    resizeTabMarker();
     

      const setActiveClass = (evt) => {
        Array.prototype.forEach.call(tabs, function(tab) {
          tab.classList.remove('active');
        });

        Array.prototype.forEach.call(allTabContent, function(content) {
          content.classList.remove('open');
        });
        
        evt.currentTarget.classList.add('active');

        const matchingAttr = evt.currentTarget.getAttribute('type');
        const matchingContent = document.querySelector(`.${ID}-tabContent[type="${matchingAttr}"]`);

        matchingContent.classList.add('open');

        resizeTabMarker();

      }

      Array.prototype.forEach.call(tabs, function(tab) {
        tab.addEventListener('click', setActiveClass);
      });

      new ResizeObserver(() => resizeTabMarker()).observe(tabList);


      // Video
      const video = component.querySelector(`.${ID}-video`);
      const overlay = document.querySelector(`.${ID}-overlay`);
      const videoContainer = component.querySelector(`.${ID}-video-container`);
      video.addEventListener('click', () => {
        overlay.classList.add('show');
        videoContainer.classList.add('show');
        videoContainer.querySelector('video').pause();
        videoContainer.querySelector('video').currentTime = 0;
        videoContainer.querySelector('video').play();
      });

      videoContainer.querySelector(`.${ID}-close`).addEventListener('click', () => {
        videoContainer.querySelector('video').pause();
        overlay.classList.remove('show');
        videoContainer.classList.remove('show');
      });
      overlay.addEventListener('click', () => {
        videoContainer.querySelector('video').pause();
        overlay.classList.remove('show');
        videoContainer.classList.remove('show');
      });
  }
  render() {
    const { component } = this;
    document.querySelector('#estore_productpage_template_container').insertAdjacentElement('afterbegin', component);
  }
}