/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, logMessage, observer } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const handleBundles = () => {
  pollerLite(['#bc-sf-filter-products .grid__item', '.grid-view-item__image', '.plp_social_proof'], () => {
    let allBundleProducts = document.querySelectorAll('#bc-sf-filter-products .grid__item');
    [].slice.call(allBundleProducts).forEach((product) => {
      product.classList.add(`${ID}-bundle-product`);
      product.querySelector('.grid-view-item__image').parentElement.remove();
      
      let toWrap = product.querySelector('.grid-view-item__image-wrapper');

      let wrapper = wrapper || document.createElement('div');
      wrapper.classList.add(`${ID}-bundle-product--imageholder`);
      toWrap.parentNode.prepend(wrapper);
      wrapper.appendChild(toWrap);

      let socialProof = product.querySelector('.plp_social_proof');
      let vendorName = product.querySelector('.grid-view-item__vendor');
      let parentItem = vendorName.parentElement;

      parentItem.insertBefore(socialProof, vendorName);

      wrapper.insertAdjacentHTML('beforeend', `<div class="${ID}-bundle-product--bundledetails"><button class="${ID}-bundle-product--bundlecontent">View Bundle Contents</button></div>`);



      let requestURL = product.querySelector('.grid-view-item__link').href;

      const request = new XMLHttpRequest();
      request.open('GET', requestURL, true);
      request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = request.responseText;
        // const sizeVariantId = request.responseURL;
        if (data) {
          let prodPage = document.createElement('div');

          prodPage.classList.add('hidden')
          prodPage.id = "no-visual";
          prodPage.innerHTML = data;       
          
          let allSlides = [].slice.call(prodPage.querySelectorAll('.media-gallery__image'));

          let imageHTML = `
          
            <div class="${ID}-bundle-products--imagecarousel">
            
              ${allSlides.map((slide, iterator) => {
                if(iterator !== 0) {
                  return `<img src="${slide.querySelector('img').getAttribute('data-lazy')}" class="slick-slide" />`;
                }
                
              }).join('')}
            
            
            </div>

          
          `;

          product.querySelector('.grid-view-item__image-wrapper').insertAdjacentHTML('afterbegin', imageHTML);

          $(`.${ID}-bundle-products--imagecarousel`).slick();

        }
      }
      };
      request.onerror = () => {
      // There was a connection error of some sort
      console.log("error");
      };
      request.send();

    });
  })

  

}

const doFilterExperiment = () => {

  pollerLite(['#bc-sf-filter-right'], () => {

    let insertionPoint = document.getElementById('bc-sf-filter-right');

    let tabHTML = `

      <div class="${ID}-pushchair-filters">
      
        <button class="${ID}-pushchair-filters--tab" id="${ID}-pushchaironly" data-url="https://www.mamasandpapas.com/collections/pushchairs?_=pf&pf_t_category=BUNDLETITLE%7CPushchair%20Only"> Pushchairs </button>
        <button class="${ID}-pushchair-filters--tab" id="${ID}-bundles" data-url="https://www.mamasandpapas.com/collections/pushchairs?_=pf&pf_t_other=DYtest:pushchairBundle"> Bundles </button>
        <button class="${ID}-pushchair-filters--tab" id="${ID}-accessories" data-url="https://www.mamasandpapas.com/collections/pushchairs?_=pf&pf_t_category=CATEGORY%7CTravel%20Accessories"> Accessories </button>
        <button class="${ID}-pushchair-filters--tab" id="${ID}-strollersbuggies" data-url="https://www.mamasandpapas.com/collections/pushchairs?_=pf&pf_t_category=SUBCAT%7CBuggies&pf_t_category=SUBCAT%7CTwin%20Buggies"> Strollers &amp; Buggies </button>
      
      </div>
    
    `;

    insertionPoint.insertAdjacentHTML('afterbegin', tabHTML);

    let allTabs = document.querySelectorAll(`.${ID}-pushchair-filters--tab`);
    [].slice.call(allTabs).forEach((tab) => {
      tab.addEventListener('click', (e) => {
        fireEvent(`Click - user has clicked on the ${e.currentTarget.innerText} button`);
        window.location.href = e.currentTarget.getAttribute('data-url');

      });
    });

    if(window.location.href.indexOf('BUNDLETITLE%7CPushchair%20Only') > -1) {
      document.getElementById(`${ID}-pushchaironly`).classList.add('active');
    } else if(window.location.href.indexOf('DYtest:pushchairBundle') > -1) {
      document.getElementById(`${ID}-bundles`).classList.add('active');

      //handleBundles();

    } else if(window.location.href.indexOf('CATEGORY%7CTravel%20Accessories') > -1) {
      document.getElementById(`${ID}-accessories`).classList.add('active');
    } else if(window.location.href.indexOf('SUBCAT%7CBuggies') > -1) {
      document.getElementById(`${ID}-strollersbuggies`).classList.add('active');
    }

  });



}


const doPushchairExperiment = () => {

  // let fullURL = `https://services.mybcapps.com/bc-sf-filter/filter?t=1646220967867&shop=mamas-papas-uk.myshopify.com&sort=manual&limit=70&&pf_t_category%5B%5D=BUNDLETITLE%7CPushchair+Only&product_available=false&variant_available=false&check_cache=true&event_type=init`;
          
  // logMessage('Full URL used: '+fullURL);

  

  // let currentGetProductsXhr = $.ajax({
  //       cache: true,
  //       type: 'GET',
  //       url: fullURL,
  //       success: function(returnedData) {
  //         console.log(returnedData);
  //       },
  //       error: function(xhr, textStatus, errorThrown) {
  //         logMessage("Error");
  //         logMessage(errorThrown);
  //           if (textStatus != "abort")
  //               console.error(textStatus + errorThrown);
  //       },
  //       complete: function(data) {
  //           currentGetProductsXhr = null;
  //       }
  //   });


  // }

  



  // get ocarro, airo, strada

  let productArray = [
    {name: "Ocarro", tagline: "Leading Adventure", secondaryTagline: "The original one hand fold", url: 'https://www.mamasandpapas.com/collections/pushchairs/products/ocarro-5775l9100', imageURL: "https://blcro.fra1.digitaloceanspaces.com/MAM-424/ocarro.png"},
    {name: "Airo", tagline: "Go Lightly", secondaryTagline: "Our lightest ever pushchair", url: 'https://www.mamasandpapas.com/products/airo-stroller-uk-959946200', imageURL: "https://blcro.fra1.digitaloceanspaces.com/MAM-424/airo.png"},
    {name: "Strada", tagline: "Streets Ahead", secondaryTagline: "Perfect for the city", url: 'https://www.mamasandpapas.com/collections/mamas-papas-strada/products/strada-9635l7700', imageURL: "https://blcro.fra1.digitaloceanspaces.com/MAM-424/strada.png"}, 
  ];

  let pageType = "outer-collections";
  console.log(window.location.pathname);
  if(window.location.pathname == "/collections/mamas-papas-ocarro" || window.location.pathname == "/collections/mamas-papas-airo" || window.location.pathname == "/collections/mamas-papas-strada") {
    pageType = "inner-collections";
  } 

  if(pageType == "outer-collections") {

      let prodHTML = `
    
      <div class="${ID}-pushchair-takeover">
      
        <div class="${ID}-pushchair-takeover--loading">
          
          <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>
          <p> Loading Products </p>
        </div>
      
        <div class="${ID}-pushchair-takeover--inner">
        

        
        
        
        
        
        </div>
      
      
      </div>
    
    `;

    let productsSection = document.getElementById('bc-sf-filter-right');

    productsSection.classList.add(`${ID}-hidden`);

    productsSection.insertAdjacentHTML('beforebegin', prodHTML);
    let urlPromises = [];

    productArray.forEach((product, iterator) => {

      let promise = new Promise((resolve, reject) => {

        let requestURL = product.url;

        const request = new XMLHttpRequest();
        request.open('GET', requestURL, true);
        request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          const data = request.responseText;
          // const sizeVariantId = request.responseURL;
          if (data) {
            let prodPage = document.createElement('div');
      
            prodPage.classList.add('hidden')
            prodPage.id = "no-visual";
            prodPage.innerHTML = data;       

            let allBundles = [].slice.call(prodPage.querySelectorAll('.product__bundleset ul li'));
            allBundles = allBundles.filter((bundle) => {
              if(bundle.querySelector('.product__bundleset-title').innerText.trim().toLowerCase() !== "pushchair only")  {
                return true;
              }

            });


            let prodTitle = product.name;
            let productFullTitle = prodPage.querySelector('.product-single__title').innerText.trim();


            let prodHTML = `

              <div class="${ID}-takeover-product">
              
                <div class="${ID}-takeover-product--header">
                
                  <div class="${ID}-takeover-product--logo">
                    <svg id="Logo_Large" data-name="Logo/Large" xmlns="http://www.w3.org/2000/svg" width="149.003" height="56" viewBox="0 0 149.003 56"> <path id="Union_6" data-name="Union 6" d="M77.111,56a.669.669,0,0,1-.671-.668V26.48c0-.027,0-.05,0-.076a.67.67,0,0,1,.671-.668h8.782c7.24,0,10.65,6.023,10.65,11.234,0,5.944-4.3,11-10.611,11H80.253l0,7.316c0,.017,0,.03,0,.045a.668.668,0,0,1-.668.668Zm3.142-11.8h5.6a7.188,7.188,0,0,0,6.626-7.342v-.04a7.165,7.165,0,0,0-6.622-7.3h-5.6ZM28.909,56a.669.669,0,0,1-.671-.668V26.4a.67.67,0,0,1,.671-.668h8.782c7.242,0,10.65,6.023,10.65,11.234,0,5.944-4.3,11-10.611,11H32.051l0,7.316v.045a.668.668,0,0,1-.67.668Zm3.142-11.8h5.6a7.188,7.188,0,0,0,6.626-7.342v-.04a7.164,7.164,0,0,0-6.621-7.3h-5.6Zm67.039-7.231c0-6.408,4.686-11.118,10.8-11.118a8.5,8.5,0,0,1,7.825,4.323V26.406a.671.671,0,0,1,.674-.667h2.684a.669.669,0,0,1,.671.667v.036h0V47.4a.669.669,0,0,1-.671.669h-2.684a.674.674,0,0,1-.674-.669V43.8a8.513,8.513,0,0,1-7.825,4.286C103.116,48.083,99.089,42.832,99.089,36.965Zm4.027.039v.039a7.222,7.222,0,0,0,7.36,7.3,6.887,6.887,0,0,0,6.544-4.17,7.823,7.823,0,0,0,.735-3.125,6.677,6.677,0,0,0-.618-3.127,7.032,7.032,0,0,0-6.74-4.324A7.2,7.2,0,0,0,103.116,37Zm-52.229-.039c0-6.408,4.687-11.118,10.806-11.118a8.5,8.5,0,0,1,7.823,4.323V26.406a.672.672,0,0,1,.674-.667h2.684a.668.668,0,0,1,.669.667v.036h0V47.4a.668.668,0,0,1-.669.669H70.191a.674.674,0,0,1-.674-.669V43.8a8.511,8.511,0,0,1-7.823,4.286C54.917,48.083,50.888,42.832,50.888,36.965ZM54.917,37v.039a7.219,7.219,0,0,0,7.358,7.3,6.885,6.885,0,0,0,6.545-4.17,7.841,7.841,0,0,0,.736-3.125,6.666,6.666,0,0,0-.619-3.127A7.032,7.032,0,0,0,62.2,29.592,7.2,7.2,0,0,0,54.917,37Zm69.224,5.117c0-.021-.011-.064-.011-.064a.728.728,0,0,1-.011-.1.669.669,0,0,1,.671-.668h2.671a.669.669,0,0,1,.659.563,3.537,3.537,0,0,0,3.648,2.835,3.248,3.248,0,0,0,3.448-3.128c-.04-2.084-1.628-2.778-5.384-4.014-2.944-.887-5.266-2.278-5.305-5.443,0-3.974,3.253-6.369,7.087-6.369,2.724,0,6.225,1.259,6.908,5.263.006.024.018.089.022.1s0,.049,0,.067a.667.667,0,0,1-.67.667h-2.623a.669.669,0,0,1-.662-.576l0-.006a2.674,2.674,0,0,0-3.013-2.234,2.733,2.733,0,0,0-3.022,2.7c.08,1.659,1.587,2.431,3.835,3.05,3.216.888,6.74,1.814,6.856,6.329.077,4.091-3.33,6.871-7.512,6.871C128.6,47.972,124.752,46.3,124.141,42.121ZM0,37.944c0-3.976,2.426-7.186,7.409-9.8l-.2-.185c-2.235-2.088-3.945-3.942-3.945-7.221A7.9,7.9,0,0,1,10.537,12.9h.041a.666.666,0,0,1,.669.666h0v2.289a.666.666,0,0,1-.575.656h-.013a4.177,4.177,0,0,0-3.522,4.133c0,2.122,1.193,3.236,2.7,4.646.11.1.223.206.333.31l.039.035,2.634,2.481.1.1,6.855,6.542L23.8,26.169l.009-.019a.636.636,0,0,1,.6-.39h.266a.668.668,0,0,1,.665.67v5.212a.652.652,0,0,1-.069.291l-2.66,5.6,2.5,2.479,0,0a.653.653,0,0,1,.222.5v3.471a.671.671,0,0,1-.671.668.644.644,0,0,1-.469-.186l-.008-.006-3.719-3.7a14.935,14.935,0,0,1-3.8,4.98,9.986,9.986,0,0,1-6.516,2.154A10.067,10.067,0,0,1,0,37.944Zm4.109-.09a6.325,6.325,0,0,0,6.282,6.353c3.993,0,5.64-2.633,7.3-6.12L10.074,30.8C7.437,32,4.109,34.019,4.109,37.854Zm135.938-9.27A2.856,2.856,0,1,1,142.9,31.43,2.811,2.811,0,0,1,140.046,28.585Zm.445,0a2.411,2.411,0,1,0,2.409-2.443A2.386,2.386,0,0,0,140.491,28.585Zm1.373,1.645V26.94h1.267c.745,0,1.075.32,1.075.908a.888.888,0,0,1-.83.92l.985,1.461h-.477l-.93-1.461h-.684l0,1.462Zm.407-2.945v1.14h.538c.5,0,.992-.015.992-.575,0-.458-.385-.566-.785-.566ZM108.847,11.229c0-6.408,4.686-11.118,10.806-11.118a8.5,8.5,0,0,1,7.824,4.323V.669A.671.671,0,0,1,128.15,0h2.684a.669.669,0,0,1,.67.668v21a.669.669,0,0,1-.67.669H128.15a.673.673,0,0,1-.673-.669V18.061a8.512,8.512,0,0,1-7.824,4.286C112.874,22.347,108.847,17.095,108.847,11.229Zm4.027.039V11.3a7.222,7.222,0,0,0,7.36,7.3,6.888,6.888,0,0,0,6.545-4.17,7.821,7.821,0,0,0,.735-3.127,6.633,6.633,0,0,0-.619-3.125,7.03,7.03,0,0,0-6.739-4.324A7.2,7.2,0,0,0,112.874,11.267ZM48.72,11.229C48.72,4.821,53.406.111,59.526.111a8.5,8.5,0,0,1,7.825,4.323V.669h0A.67.67,0,0,1,68.023,0h2.684a.668.668,0,0,1,.67.668v21a.669.669,0,0,1-.67.669H68.023a.675.675,0,0,1-.672-.669V18.061a8.514,8.514,0,0,1-7.825,4.286C52.749,22.347,48.72,17.095,48.72,11.229Zm4.029.039V11.3a7.223,7.223,0,0,0,7.357,7.3,6.89,6.89,0,0,0,6.548-4.17,7.828,7.828,0,0,0,.734-3.127,6.62,6.62,0,0,0-.618-3.125A7.029,7.029,0,0,0,60.03,3.855,7.2,7.2,0,0,0,52.749,11.267Zm50.192,11.068a.666.666,0,0,1-.669-.667V10.3a7.649,7.649,0,0,0-1.163-4.67,4.12,4.12,0,0,0-3.756-1.738A4.6,4.6,0,0,0,93.288,5.9a6.935,6.935,0,0,0-.969,4.246l0,11.509v.012a.671.671,0,0,1-.615.667H88.917a.669.669,0,0,1-.669-.667l.006-11.521A7.331,7.331,0,0,0,87.4,5.978a4.886,4.886,0,0,0-7.979-.037A7.423,7.423,0,0,0,78.3,10.225V21.667a.673.673,0,0,1-.673.667H74.942a.669.669,0,0,1-.67-.667v-21A.671.671,0,0,1,74.942,0H77.4a.668.668,0,0,1,.669.669l0,3.033A7.287,7.287,0,0,1,84.458.111a7.015,7.015,0,0,1,5.423,2.241A11.452,11.452,0,0,1,91.236,4.4a8.942,8.942,0,0,1,1.51-2.085,8.375,8.375,0,0,1,11.233-.077c1.857,1.891,2.323,3.9,2.323,7.913V21.667a.667.667,0,0,1-.645.667Zm-60.127,0a.668.668,0,0,1-.671-.667l0-.3V10.3a7.652,7.652,0,0,0-1.163-4.67,4.117,4.117,0,0,0-3.756-1.739A4.6,4.6,0,0,0,33.16,5.9a6.935,6.935,0,0,0-.967,4.246V21.667a.665.665,0,0,1-.616.661v.006H28.79a.667.667,0,0,1-.669-.667c0-.017,0-.035,0-.051V10.147a7.318,7.318,0,0,0-.853-4.169,4.451,4.451,0,0,0-3.987-2.085,4.431,4.431,0,0,0-3.991,2.048,7.441,7.441,0,0,0-1.123,4.284V21.667a.673.673,0,0,1-.672.667H14.815a.666.666,0,0,1-.67-.667v-21A.668.668,0,0,1,14.815,0h2.457a.67.67,0,0,1,.669.668l0,3.033A7.284,7.284,0,0,1,24.33.111a7.023,7.023,0,0,1,5.422,2.238A11.673,11.673,0,0,1,31.106,4.4a8.964,8.964,0,0,1,1.512-2.085,7.773,7.773,0,0,1,5.576-2.2A7.81,7.81,0,0,1,43.85,2.234c1.857,1.889,2.323,3.9,2.323,7.913V21.667a.668.668,0,0,1-.644.667ZM133.9,16.384c0-.021-.01-.064-.01-.066a.686.686,0,0,1-.011-.093.67.67,0,0,1,.67-.669h2.673a.669.669,0,0,1,.659.563,3.537,3.537,0,0,0,3.647,2.835,3.247,3.247,0,0,0,3.448-3.128c-.04-2.084-1.627-2.778-5.383-4.014-2.944-.887-5.266-2.278-5.305-5.443,0-3.974,3.254-6.369,7.087-6.369,2.724,0,6.225,1.259,6.907,5.263.006.024.02.089.022.1s0,.048,0,.067a.667.667,0,0,1-.67.668H145.01a.668.668,0,0,1-.662-.576l0-.006a2.674,2.674,0,0,0-3.014-2.234,2.733,2.733,0,0,0-3.022,2.7c.08,1.659,1.587,2.431,3.835,3.05,3.215.887,6.74,1.814,6.856,6.328.078,4.093-3.33,6.873-7.512,6.873C138.357,22.236,134.51,20.561,133.9,16.384ZM78.068.669h0Zm0,0Z" fill="#323232"></path> </svg>
                  </div>
                
                  <div class="${ID}-takeover-product--image">
                    <img src="${product.imageURL}" alt="${prodTitle} image" />
                  </div>

                  <div class="${ID}-takeover-product--information">

                    <p class="${ID}-takeover-product--brand">${prodTitle}</p>
                    <p class="${ID}-takeover-product--tagline">${product.tagline}</p>
                    <p class="${ID}-takeover-product--secondarytagline">${product.secondaryTagline}</p>

                  </div>

                </div>

                <div class="${ID}-takeover-product--bundles">
                
                  ${allBundles.map((bundle) => {

                    let bundleName = bundle.querySelector('.product__bundleset-title').innerText;
                    let bundlePrice = bundle.querySelector('.product__bundleset-price-regular').innerText;
                    let bundleColour = productFullTitle.substring(productFullTitle.indexOf('Pushchair -') + 11, productFullTitle.length).trim();
                    let bundleImage = bundle.querySelector('.product__bundleset-image img').src;
                    bundleImage = bundleImage.replace('80x@2x.jpg', '140x@2x.jpg');
                    let bundleHref = bundle.querySelector('a').href;

                    return `

                      <a href="${bundleHref}" class="${ID}-takeover-product--bundle">
                      
                        <img src="${bundleImage}" alt="${bundleName} image" />

                        <div class="${ID}-takeover-product--bundleinfo">

                          <p class="${ID}-takeover-product--bundlemanufacturer">Mamas &amp; Papas</p>
                          <p class="${ID}-takeover-product--bundlename">${product.name} ${bundleName} - ${bundleColour}</p>
                          <p class="${ID}-takeover-product--bundleprice">${bundlePrice}</p>
                        
                        </div>
                      
                      </a>
                    
                    
                    `;

                  }).join('')}
                
                </div>
              
              
              </div>
            
            
            
            `;

            resolve({name: prodTitle, html: prodHTML});
            
          }
        }
        };
        request.onerror = () => {
        // There was a connection error of some sort
        console.log("error");
        };
        request.send();


      });

      urlPromises.push(promise);



    })

    let insertionPoint = document.querySelector(`.${ID}-pushchair-takeover--inner`);

    Promise.all(urlPromises).then(returnedData => {
      
      returnedData.forEach((item) => {
        insertionPoint.insertAdjacentHTML('beforeend', item.html);
      });

      let loading = document.querySelector(`.${ID}-pushchair-takeover--loading`);
      let inner = document.querySelector(`.${ID}-pushchair-takeover--inner`);

      loading.remove();
      inner.classList.add('active');




      // observer.connect(document.getElementById(`bc-sf-filter-right`), () => {

      //   document.getElementById(`bc-sf-filter-right`).classList.remove(`${ID}-hidden`);
      //   inner.classList.remove('active');

      // }, {
      //   throttle: 200,
      //   config: {
      //     attributes: true,
      //     childList: true,
      //     subtree: true,
      //   },
      // });


    });
  } else {

    let product = productArray.filter((a) => a.name.toLowerCase() == window.location.pathname.replace('/collections/mamas-papas-', ''));
    let prodTitle = product[0].name;



    let prodHTML = `
    
      <div class="${ID}-takeover-product">
                
        <div class="${ID}-takeover-product--header">
        
          <div class="${ID}-takeover-product--logo">
            <svg id="Logo_Large" data-name="Logo/Large" xmlns="http://www.w3.org/2000/svg" width="149.003" height="56" viewBox="0 0 149.003 56"> <path id="Union_6" data-name="Union 6" d="M77.111,56a.669.669,0,0,1-.671-.668V26.48c0-.027,0-.05,0-.076a.67.67,0,0,1,.671-.668h8.782c7.24,0,10.65,6.023,10.65,11.234,0,5.944-4.3,11-10.611,11H80.253l0,7.316c0,.017,0,.03,0,.045a.668.668,0,0,1-.668.668Zm3.142-11.8h5.6a7.188,7.188,0,0,0,6.626-7.342v-.04a7.165,7.165,0,0,0-6.622-7.3h-5.6ZM28.909,56a.669.669,0,0,1-.671-.668V26.4a.67.67,0,0,1,.671-.668h8.782c7.242,0,10.65,6.023,10.65,11.234,0,5.944-4.3,11-10.611,11H32.051l0,7.316v.045a.668.668,0,0,1-.67.668Zm3.142-11.8h5.6a7.188,7.188,0,0,0,6.626-7.342v-.04a7.164,7.164,0,0,0-6.621-7.3h-5.6Zm67.039-7.231c0-6.408,4.686-11.118,10.8-11.118a8.5,8.5,0,0,1,7.825,4.323V26.406a.671.671,0,0,1,.674-.667h2.684a.669.669,0,0,1,.671.667v.036h0V47.4a.669.669,0,0,1-.671.669h-2.684a.674.674,0,0,1-.674-.669V43.8a8.513,8.513,0,0,1-7.825,4.286C103.116,48.083,99.089,42.832,99.089,36.965Zm4.027.039v.039a7.222,7.222,0,0,0,7.36,7.3,6.887,6.887,0,0,0,6.544-4.17,7.823,7.823,0,0,0,.735-3.125,6.677,6.677,0,0,0-.618-3.127,7.032,7.032,0,0,0-6.74-4.324A7.2,7.2,0,0,0,103.116,37Zm-52.229-.039c0-6.408,4.687-11.118,10.806-11.118a8.5,8.5,0,0,1,7.823,4.323V26.406a.672.672,0,0,1,.674-.667h2.684a.668.668,0,0,1,.669.667v.036h0V47.4a.668.668,0,0,1-.669.669H70.191a.674.674,0,0,1-.674-.669V43.8a8.511,8.511,0,0,1-7.823,4.286C54.917,48.083,50.888,42.832,50.888,36.965ZM54.917,37v.039a7.219,7.219,0,0,0,7.358,7.3,6.885,6.885,0,0,0,6.545-4.17,7.841,7.841,0,0,0,.736-3.125,6.666,6.666,0,0,0-.619-3.127A7.032,7.032,0,0,0,62.2,29.592,7.2,7.2,0,0,0,54.917,37Zm69.224,5.117c0-.021-.011-.064-.011-.064a.728.728,0,0,1-.011-.1.669.669,0,0,1,.671-.668h2.671a.669.669,0,0,1,.659.563,3.537,3.537,0,0,0,3.648,2.835,3.248,3.248,0,0,0,3.448-3.128c-.04-2.084-1.628-2.778-5.384-4.014-2.944-.887-5.266-2.278-5.305-5.443,0-3.974,3.253-6.369,7.087-6.369,2.724,0,6.225,1.259,6.908,5.263.006.024.018.089.022.1s0,.049,0,.067a.667.667,0,0,1-.67.667h-2.623a.669.669,0,0,1-.662-.576l0-.006a2.674,2.674,0,0,0-3.013-2.234,2.733,2.733,0,0,0-3.022,2.7c.08,1.659,1.587,2.431,3.835,3.05,3.216.888,6.74,1.814,6.856,6.329.077,4.091-3.33,6.871-7.512,6.871C128.6,47.972,124.752,46.3,124.141,42.121ZM0,37.944c0-3.976,2.426-7.186,7.409-9.8l-.2-.185c-2.235-2.088-3.945-3.942-3.945-7.221A7.9,7.9,0,0,1,10.537,12.9h.041a.666.666,0,0,1,.669.666h0v2.289a.666.666,0,0,1-.575.656h-.013a4.177,4.177,0,0,0-3.522,4.133c0,2.122,1.193,3.236,2.7,4.646.11.1.223.206.333.31l.039.035,2.634,2.481.1.1,6.855,6.542L23.8,26.169l.009-.019a.636.636,0,0,1,.6-.39h.266a.668.668,0,0,1,.665.67v5.212a.652.652,0,0,1-.069.291l-2.66,5.6,2.5,2.479,0,0a.653.653,0,0,1,.222.5v3.471a.671.671,0,0,1-.671.668.644.644,0,0,1-.469-.186l-.008-.006-3.719-3.7a14.935,14.935,0,0,1-3.8,4.98,9.986,9.986,0,0,1-6.516,2.154A10.067,10.067,0,0,1,0,37.944Zm4.109-.09a6.325,6.325,0,0,0,6.282,6.353c3.993,0,5.64-2.633,7.3-6.12L10.074,30.8C7.437,32,4.109,34.019,4.109,37.854Zm135.938-9.27A2.856,2.856,0,1,1,142.9,31.43,2.811,2.811,0,0,1,140.046,28.585Zm.445,0a2.411,2.411,0,1,0,2.409-2.443A2.386,2.386,0,0,0,140.491,28.585Zm1.373,1.645V26.94h1.267c.745,0,1.075.32,1.075.908a.888.888,0,0,1-.83.92l.985,1.461h-.477l-.93-1.461h-.684l0,1.462Zm.407-2.945v1.14h.538c.5,0,.992-.015.992-.575,0-.458-.385-.566-.785-.566ZM108.847,11.229c0-6.408,4.686-11.118,10.806-11.118a8.5,8.5,0,0,1,7.824,4.323V.669A.671.671,0,0,1,128.15,0h2.684a.669.669,0,0,1,.67.668v21a.669.669,0,0,1-.67.669H128.15a.673.673,0,0,1-.673-.669V18.061a8.512,8.512,0,0,1-7.824,4.286C112.874,22.347,108.847,17.095,108.847,11.229Zm4.027.039V11.3a7.222,7.222,0,0,0,7.36,7.3,6.888,6.888,0,0,0,6.545-4.17,7.821,7.821,0,0,0,.735-3.127,6.633,6.633,0,0,0-.619-3.125,7.03,7.03,0,0,0-6.739-4.324A7.2,7.2,0,0,0,112.874,11.267ZM48.72,11.229C48.72,4.821,53.406.111,59.526.111a8.5,8.5,0,0,1,7.825,4.323V.669h0A.67.67,0,0,1,68.023,0h2.684a.668.668,0,0,1,.67.668v21a.669.669,0,0,1-.67.669H68.023a.675.675,0,0,1-.672-.669V18.061a8.514,8.514,0,0,1-7.825,4.286C52.749,22.347,48.72,17.095,48.72,11.229Zm4.029.039V11.3a7.223,7.223,0,0,0,7.357,7.3,6.89,6.89,0,0,0,6.548-4.17,7.828,7.828,0,0,0,.734-3.127,6.62,6.62,0,0,0-.618-3.125A7.029,7.029,0,0,0,60.03,3.855,7.2,7.2,0,0,0,52.749,11.267Zm50.192,11.068a.666.666,0,0,1-.669-.667V10.3a7.649,7.649,0,0,0-1.163-4.67,4.12,4.12,0,0,0-3.756-1.738A4.6,4.6,0,0,0,93.288,5.9a6.935,6.935,0,0,0-.969,4.246l0,11.509v.012a.671.671,0,0,1-.615.667H88.917a.669.669,0,0,1-.669-.667l.006-11.521A7.331,7.331,0,0,0,87.4,5.978a4.886,4.886,0,0,0-7.979-.037A7.423,7.423,0,0,0,78.3,10.225V21.667a.673.673,0,0,1-.673.667H74.942a.669.669,0,0,1-.67-.667v-21A.671.671,0,0,1,74.942,0H77.4a.668.668,0,0,1,.669.669l0,3.033A7.287,7.287,0,0,1,84.458.111a7.015,7.015,0,0,1,5.423,2.241A11.452,11.452,0,0,1,91.236,4.4a8.942,8.942,0,0,1,1.51-2.085,8.375,8.375,0,0,1,11.233-.077c1.857,1.891,2.323,3.9,2.323,7.913V21.667a.667.667,0,0,1-.645.667Zm-60.127,0a.668.668,0,0,1-.671-.667l0-.3V10.3a7.652,7.652,0,0,0-1.163-4.67,4.117,4.117,0,0,0-3.756-1.739A4.6,4.6,0,0,0,33.16,5.9a6.935,6.935,0,0,0-.967,4.246V21.667a.665.665,0,0,1-.616.661v.006H28.79a.667.667,0,0,1-.669-.667c0-.017,0-.035,0-.051V10.147a7.318,7.318,0,0,0-.853-4.169,4.451,4.451,0,0,0-3.987-2.085,4.431,4.431,0,0,0-3.991,2.048,7.441,7.441,0,0,0-1.123,4.284V21.667a.673.673,0,0,1-.672.667H14.815a.666.666,0,0,1-.67-.667v-21A.668.668,0,0,1,14.815,0h2.457a.67.67,0,0,1,.669.668l0,3.033A7.284,7.284,0,0,1,24.33.111a7.023,7.023,0,0,1,5.422,2.238A11.673,11.673,0,0,1,31.106,4.4a8.964,8.964,0,0,1,1.512-2.085,7.773,7.773,0,0,1,5.576-2.2A7.81,7.81,0,0,1,43.85,2.234c1.857,1.889,2.323,3.9,2.323,7.913V21.667a.668.668,0,0,1-.644.667ZM133.9,16.384c0-.021-.01-.064-.01-.066a.686.686,0,0,1-.011-.093.67.67,0,0,1,.67-.669h2.673a.669.669,0,0,1,.659.563,3.537,3.537,0,0,0,3.647,2.835,3.247,3.247,0,0,0,3.448-3.128c-.04-2.084-1.627-2.778-5.383-4.014-2.944-.887-5.266-2.278-5.305-5.443,0-3.974,3.254-6.369,7.087-6.369,2.724,0,6.225,1.259,6.907,5.263.006.024.02.089.022.1s0,.048,0,.067a.667.667,0,0,1-.67.668H145.01a.668.668,0,0,1-.662-.576l0-.006a2.674,2.674,0,0,0-3.014-2.234,2.733,2.733,0,0,0-3.022,2.7c.08,1.659,1.587,2.431,3.835,3.05,3.215.887,6.74,1.814,6.856,6.328.078,4.093-3.33,6.873-7.512,6.873C138.357,22.236,134.51,20.561,133.9,16.384ZM78.068.669h0Zm0,0Z" fill="#323232"></path> </svg>
          </div>
        
          <div class="${ID}-takeover-product--image">
            <img src="${product[0].imageURL}" alt="${prodTitle} image" />
          </div>

          <div class="${ID}-takeover-product--information">

            <p class="${ID}-takeover-product--brand">${prodTitle}</p>
            <p class="${ID}-takeover-product--tagline">${product[0].tagline}</p>
            <p class="${ID}-takeover-product--secondarytagline">${product[0].secondaryTagline}</p>

          </div>

        </div>
      
      </div>
    
    `;

    let productsSection = document.getElementById('bc-sf-filter-right');

    productsSection.insertAdjacentHTML('afterbegin', prodHTML);


  }

  
  

}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  doFilterExperiment();

  //doPushchairExperiment();


};
