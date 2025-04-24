/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services'
import shared from '../../../../../core-files/shared'
import { events, pollerLite, observer } from '../../../../../lib/utils'
import { fetchBrands } from './fetchAffinity'

// Force set analytics reference
events.analyticsReference = '_gaUAT'
const { ID } = shared
let dyPromises = [];
let nameVal = "You";

const getPageData = () => {
	let dataObject
	for (let i = 0; i < window.dataLayer.length; i += 1) {
		const data = window.dataLayer[i]
		if (typeof data === 'object' && data.event && data.event === 'HOF_onLoad') {
			dataObject = data
			break
		}
	}
	return dataObject
}

const initiateSlider = (sectionName) => {
	// Run slick
	let slider = document.querySelector(`#${ID}-${sectionName}-carouselcontainer`)

	slider.classList.add('swiper-active')

	let mySwiper = new window.Swiper(slider, {
		// Optional parameters
		preloadImages: true,
		updateOnImagesReady: true,
		freeMode: true,
		touchReleaseOnEdges: true,
		rewind: false,
		loop: false,

		// Responsive breakpoints

		pagination: {
			el: `.${ID}-carousel-pagination`,
			clickable: true
		},
		navigation: {
			nextEl: `#${ID}-${sectionName}-right-button`,
			prevEl: `#${ID}-${sectionName}-left-button`
		},

		slidesOffsetBefore: 0,
		slidesPerView: 1.5,
		slidesPerGroup: 1,
		spaceBetween: 10,
		breakpoints: {
			480: {
				slidesPerView: 2.5,
				slidesPerGroup: 2,
				spaceBetween: 10
			},
			768: {
				slidesPerView: 4,
				slidesPerGroup: 4,
				spaceBetween: 20
			},
			1024: {
				slidesPerView: 5,
				slidesPerGroup: 5,
				spaceBetween: 20
			}
		},
		threshold: 20
	})

	setTimeout(function () {
		mySwiper.updateSize()
	}, 2000)
}

const startExperiment = () => {
	// LOAD HTML

	let contentWrapper = document.querySelector('.ContentWrapper')

	let pageHTML = `
    
      <div class="${ID}-personalised">
      
        <div class="${ID}-personalised--header">
        
          <h1>
          
            <span class="${ID}-personalised--headerline1">Just for</span>
            <span class="${ID}-personalised--headerline2 ${getPageData().visitorLoginState == 'logged+in' ? 'pii-item' : ''}">You</span>
          
          </h1>
        
        </div>

        <div class="${ID}-personalised--products">

          <div class="${ID}-personalised--productscarousel" id="${ID}-deep-learning-carousel">

          </div>

          <div class="${ID}-personalised--productscarousel ${ID}-rvbrands-carousel" id="${ID}-rvbrands-carousel">

          </div>

          <div class="${ID}-personalised--productscarousel ${ID}-affinity-carousel" id="${ID}-affinity-carousel">

          </div>
      
        </div>

      </div>
      
      <div class="${ID}-personalised">
        <div class="${ID}-personalised--products">
          <div class="${ID}-personalised--productscarousel ${ID}-itemsinbasket-carousel" id="${ID}-itemsinbasket-carousel">

          </div>
        </div>
      </div>
  `

	contentWrapper.classList.add(`${ID}-personalised-page`)
	contentWrapper.insertAdjacentHTML('afterbegin', pageHTML)

	// Call DY Affinity API
	let brandsPromise = fetchBrands()
	dyPromises.push(brandsPromise)

	Promise.all(dyPromises).then((values) => {
		addBasketCarousel()

		let brands = values[0]
		if (brands.length > 3) {
			let brandsHTML = `

        <div class="${ID}-personalised--carousel ${ID}-personalised--carousel--brands">
        
          <h3> Recently viewed brands </h3>
          <div class="${ID}-personalised--carouselbrandholder">
            <div id="${ID}-rvbrands-carouselcontainer" class="${ID}-rvbrands-carouselcontainer">

                ${brands
					.map((brand, iterator) => {
						let brandname = brand[0].toLowerCase()
						let brandPageUrl = `https://www.houseoffraser.co.uk/brand/${brandname.replaceAll(' ', '-')}`

						if (iterator < 5) {
							return `
                  
                      <a href="${brandPageUrl}" data-brand="${brandname}" class="${ID}-personalised--carouselbranditem">
                      
                        ${brand[0]}              
                      
                      </a>
                    
                    `
						}
					})
					.join('')}
                  

              
            </div>
            
          </div>
        
        </div>
      
      
      `

			let brandsInsertion = document.getElementById(`${ID}-rvbrands-carousel`)
			brandsInsertion.insertAdjacentHTML('afterbegin', brandsHTML)
		}

		fireEvent('Visible - page has completed loading', true);

		// Event Listeners
		document.body.addEventListener('click', (e) => {
			if (e.target.closest('.dy-tabs__head')) {
				fireEvent(`Click - user has clicked on the tab with title: ${e.target.closest('.dy-tabs__head a').innerText}`, true)
			} else if (e.target.closest(`.quickview-button`)) {
				fireEvent(`Click - user has clicked on the quickview button to open the modal`, true)
			} else if (e.target.closest(`.addToBasketContainer`)) {
				fireEvent(`Click - user has clicked on the atb button in the modal`, true)
			} else if (e.target.closest('.dy-tabs__content') && !e.target.closest('.dy-recommendations-slider-arrows') && !e.target.classList.contains('dy-recommendations__slider-container')) {
				fireEvent(`Click - user has clicked on an item in ${e.target.closest(`.${ID}-personalised--productscarousel`).querySelector('a.active').innerText} carousel - item href: ${e.target.closest('.dy-recommendation-product').querySelector('.product').href}`, true)
			} else if (e.target.closest(`.${ID}-personalised--carouselbranditem`)) {
				fireEvent(`Click - user has clicked on the ${e.target.closest(`.${ID}-personalised--carouselbranditem`).getAttribute('data-brand')} icon, taking them to href: ${e.target.closest(`.${ID}-personalised--carouselbranditem`).href}`, true)
			} else if (e.target.closest(`#${ID}-itemsinbasket-carouselcontainer .${ID}-product-link`)) {
				fireEvent(`Click - user has clicked on item href: ${e.target.closest(`#${ID}-itemsinbasket-carouselcontainer .${ID}-product-link`).href} to go to the item`, true)
			} else if (e.target.closest(`#${ID}-itemsinbasket-carouselcontainer .${ID}-checkout-button`)) {
				fireEvent(`Click - user has clicked on item href: ${e.target.closest(`#${ID}-itemsinbasket-carouselcontainer .${ID}-checkout-button`).href} to go to checkout`, true)
			}
		})
	})
}

const addBasketCarousel = () => {
	if (document.querySelector(`#${ID}-itemsinbasket-carousel`)) {
		document.querySelector(`#${ID}-itemsinbasket-carousel`).innerHTML = ''
	}

	pollerLite(['#divBagItems'], () => {
		let bagItems = JSON.parse(document.getElementById('divBagItems').getAttribute('data-basket'))

		if (bagItems.quantity > 0 || bagItems.Quantity > 0) {
			pollerLite(['#ulBag'], () => {
				// Get basket data
				let bagOuter = document.getElementById('ulBag')
				let prodsToBeDisplayed = []

				let allBagItems = [].slice.call(bagOuter.querySelectorAll('li'))
				prodsToBeDisplayed = allBagItems.map((item) => {
					let itemImageSrc = item.querySelector('img').src.replace('_s.jpg', '_h.jpg')
					let itemName = item.querySelector('.BaskName').innerText
					let itemPrice = item.querySelector('.BaskPrice').innerText
					let itemURL = item.getAttribute('data-prdurl')

					let itemData = {
						imageSrc: itemImageSrc,
						name: itemName,
						price: itemPrice,
						url: itemURL
					}

					return itemData
				})

				let itemsInBasketCarouselHTML = `

          <div class="${ID}-personalised--carousel">
          
            <h3> Your basket </h3>
            <div class="${ID}-personalised--carouselholder">
              <div id="${ID}-itemsinbasket-carouselcontainer" class="swiper-container">
                <div class="swiper-wrapper">
                  ${prodsToBeDisplayed
						.map((product) => {
							if (product.imageSrc !== null && product.imageSrc !== '') {
								return `
                        <div class="${ID}-personalised--carouselitem swiper-slide">
                          <a href="${product.url}" class="${ID}-product-link">
                          
                            <img src="${product.imageSrc}" alt="${product.name} image" />

                            <div class="${ID}-item-info">

                              <p class="${ID}-personalised--carouselitem--name"> ${product.name} </p>
                              <p class="${ID}-personalised--carouselitem--price"> ${product.price} </p>
                            
                              

                            </div>
                      
                          </a>
                          
                        </div>
                      
                      `
							} else {
								return ``
							}
						})
						.join('')}
                </div>
                
              </div>
              <a href="/cart" class="${ID}-checkout-button"><span class="${ID}-checkout-button--text">View Bag</span></a>
                ${prodsToBeDisplayed.length >= 5 ? `<div class="${ID}-carousel-pagination" id="${ID}-itemsinbasket-pagination"></div>` : ``}
              ${
					prodsToBeDisplayed.length >= 5
						? `<button id="${ID}-itemsinbasket-left-button" class="${ID}-carousel-button left"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="32" viewBox="0 0 18 32"><defs><clipPath id="clip-Chevron-left"><rect width="18" height="32"/></clipPath></defs><g id="Chevron-left" clip-path="url(#clip-Chevron-left)"><path id="right-arrow-black" d="M27.5,22.1l15,15-15,15" transform="translate(44.002 53.1) rotate(180)" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="1.75"/></g></svg></button>
                 <button id="${ID}-itemsinbasket-right-button" class="${ID}-carousel-button right"><svg xmlns=http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="32" viewBox="0 0 18 32"><defs><clipPath id="clip-Chevron-right"><rect width="18" height="32"/></clipPath></defs><g id="Chevron-right" clip-path="url(#clip-Chevron-right)"><path id="right-arrow-black" d="M27.5,22.1l15,15-15,15" transform="translate(-26.002 -21.1)" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="1.75"/></g></svg></button>
                `
						: ``
				}
            </div>
          
          </div>
        
        
        
        `

				let basketInsertion = document.getElementById(`${ID}-itemsinbasket-carousel`)
				basketInsertion.insertAdjacentHTML('afterbegin', itemsInBasketCarouselHTML)
				initiateSlider('itemsinbasket')
			})
		}
	})
}

const applyATBTracking = () => {
	if (localStorage.getItem(`${ID}-ATB-tracking-enabled`) !== 'true') {
		document.querySelector('#topMenu').addEventListener('click', (e) => {
			if ((e.target.closest('#topMenu') || e.target.closest('.MobileMenuContentWrap')) && localStorage.getItem(`${ID}-ATB-tracking-enabled`) !== 'true') {
				fireEvent(`Interaction - user has interacted with the menu so ATB tracking will be applied`)
				localStorage.setItem(`${ID}-ATB-tracking-enabled`, true)
			}
		})
	} else if (localStorage.getItem(`${ID}-ATB-tracking-enabled`) == 'true' && document.body.classList.contains('ProdDetails')) {
		document.querySelector('#aAddToBag').addEventListener('click', () => {
			fireEvent(`Click - user has clicked on the ATB button on product: ${window.location.href}`, true);
		})
	}
}

export default () => {
	setup()

	fireEvent('Conditions Met')

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == 'control') {
		fireEvent('Visible - JFY link would have been shown to users', true)
		applyATBTracking()

		return
	}

	// Write experiment code here
	// ...

	if (getPageData().visitorLoginState == 'logged+in') {
		let requestURL = 'https://www.houseoffraser.co.uk/accountinformation/editpersonaldetails'

		const request = new XMLHttpRequest()
		request.open('GET', requestURL, true)
		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				// Success!
				const data = request.responseText
				// const sizeVariantId = request.responseURL;
				if (data) {
					let brandPage = document.createElement('div')

					brandPage.classList.add('hidden')
					brandPage.id = 'no-visual'
					brandPage.innerHTML = data;
					nameVal = brandPage.querySelector('#txtFirstName').value;
					
					pollerLite([`#${ID}-jfy-link`], () => {
						let jfyLink = document.querySelector(`.${ID}-jfy-link`)
						jfyLink.innerHTML = `For ${brandPage.querySelector('#txtFirstName').value.length <= 10 && brandPage.querySelector('#txtFirstName').value.length > 1 ? brandPage.querySelector('#txtFirstName').value : `YOU`}</span><span class="${ID}-jfy-link--pill">NEW</span>`
						if (jfyLink.classList.contains(`${ID}-hidden`)) {
							jfyLink.classList.remove(`${ID}-hidden`)
						}
					})

					pollerLite([`.${ID}-personalised--headerline2`], () => {
						let nameLink = document.querySelector(`.${ID}-personalised--headerline2`);
						nameLink.innerHTML = brandPage.querySelector('#txtFirstName').value;

					});
				}
			}
		}
		request.onerror = () => {
			// There was a connection error of some sort
		}
		request.send()
	}

	if (window.location.href.indexOf('/just-for-you') > -1) {
		document.documentElement.classList.add(`${ID}-personalised-page-shown`)

		startExperiment()
		applyATBTracking();
		pollerLite(['#ulBag'], () => {
			let basketCount = document.getElementById('ulBag').childElementCount
			observer.connect(
				document.getElementById('ulBag'),
				() => {
					if (document.getElementById('ulBag').childElementCount !== basketCount) {
						addBasketCarousel()
						basketCount = document.getElementById('ulBag').childElementCount
					}
				},
				{
					config: {
						attributes: false,
						childList: true,
						subtree: false
					}
				}
			)
		})
	} else {
		pollerLite(
			[
				'#topMenu ul',
				'.mobMenuGroup',
				() => {
					return document.readyState == 'complete'
				}
			],
			() => {
				let insertionPoint = ''
				if (window.outerWidth > 1020) {
					insertionPoint = document.querySelector('#topMenu ul')
					insertionPoint.insertAdjacentHTML(
						'afterend',
						`

          <li data-id="000001" id="${ID}-jfy-link" class=" mmHasChild root multicolumn MenuGroupOutlet fourCol onePromo"><a href="/just-for-you" id="lnkTopLevelMenu_3019665" class="${ID}-jfy-link lnkLevel2 ${getPageData().visitorLoginState == 'logged+in' ? 'pii-item' : ''}" href="/clearancehome">FOR YOU <span class="${ID}-jfy-link--pill">NEW</span></a></li>

        `
					)
					observer.connect(
						document.getElementById('topMenuWrapper'),
						() => {
							if (!document.getElementById(`${ID}-jfy-link`)) {
								document.querySelector('#topMenu ul').insertAdjacentHTML(
									'afterend',
									`

              <li data-id="000001" id="${ID}-jfy-link" class=" mmHasChild root multicolumn MenuGroupOutlet fourCol onePromo"><a href="/just-for-you" id="lnkTopLevelMenu_3019665" class="${ID}-jfy-link lnkLevel2 ${getPageData().visitorLoginState == 'logged+in' ? 'pii-item' : ''}" href="/clearancehome">FOR ${nameVal} <span class="${ID}-jfy-link--pill">NEW</span></a></li>

            `
								)
							}
						},
						{
							config: {
								attributes: true,
								childList: true,
								subtree: false
							}
						}
					)
				} else {
					let trigger = document.getElementById('trigger')
					trigger.classList.add(`${ID}-jfy-dot`)

					insertionPoint = document.querySelector('.mobMenuGroup')
					insertionPoint.insertAdjacentHTML(
						'afterbegin',
						`
        
          <li><a href="/just-for-you" id="${ID}-jfy-link" class="${ID}-jfy-link ${getPageData().visitorLoginState == 'logged+in' ? 'pii-item' : ''}">For YOU <span class="${ID}-jfy-link--pill">NEW</span></a></li>

        `
					)
				}
				fireEvent('Visible - JFY link added to the page', true);
				let jfyLink = document.getElementById(`${ID}-jfy-link`)
				jfyLink.addEventListener('click', () => {
					fireEvent(`Click - user has clicked on JFY link from page: ${window.location.href} to go to the Just For You page`)
				})
			}
		)
	}
}
