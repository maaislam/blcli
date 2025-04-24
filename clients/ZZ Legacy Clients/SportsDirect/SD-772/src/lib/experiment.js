/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services'
import shared from '../../../../../core-files/shared'
import { events, observer, pollerLite } from '../../../../../lib/utils'
import { fetchBrands } from './fetchAffinity'

// Force set analytics reference
events.analyticsReference = '_gaUAT'
const { ID } = shared
let dyPromises = []

const getPageData = () => {
	let dataObject
	for (let i = 0; i < window.dataLayer.length; i += 1) {
		const data = window.dataLayer[i]
		if (typeof data === 'object' && data.event && data.event === 'SD_onLoad') {
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

	new Swiper(slider, {
		// Optional parameters
		init: true,
		loop: false,
		// If we need pagination
		slidesPerView: 4.5,
		slidesPerGroup: 4,
		spaceBetween: 20,

		// Responsive breakpoints
		breakpoints: {
			200: {
				slidesPerView: 1.5,
				slidesPerGroup: 1
			},
			767: {
				slidesPerView: 2,
				slidesPerGroup: 2
			},
			992: {
				slidesPerView: 3.5,
				slidesPerGroup: 3
			},
			1800: {
				slidesPerView: 4.5,
				slidesPerGroup: 4
			}
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		navigation: {
			nextEl: `#${ID}-${sectionName}-right-button`,
			prevEl: `#${ID}-${sectionName}-left-button`
		}
	})
}

const startExperiment = () => {
	// LOAD HTML

	let contentWrapper = document.getElementById('main-content')

	let pageHTML = `
    
      <div class="${ID}-personalised">
      
        <div class="${ID}-personalised--header">
        
          <h1>
          
            <span class="${ID}-personalised--headerline1 ${getPageData().visitorLoginState == 'logged+in' ? 'pii-item' : ''}">Your</span>
            <span class="${ID}-personalised--headerline2">Collection</span>
          
          </h1>

          <h2> Sport Starts Here </h2>
        
        </div>

        <div class="${ID}-personalised--products">

          <div class="${ID}-personalised--productscarousel" id="${ID}-giftsforher-carousel">

          </div>

          <div class="${ID}-personalised--productscarousel" id="${ID}-giftsforhim-carousel">

          </div>

          <div class="${ID}-personalised--productscarousel" id="${ID}-deep-learning-carousel">

          </div>
          
          <div class="${ID}-personalised--productscarousel ${ID}-vwrv-carousel" id="${ID}-vwrv-carousel">

          </div>

          <div class="${ID}-personalised--productscarousel ${ID}-affinity-carousel" id="${ID}-affinity-carousel">

          </div>

          <!-- BRANDS CAROUSEL -->

          <div class="${ID}-personalised--productscarousel ${ID}-rvbrands-carousel" id="${ID}-rvbrands-carousel">

          </div>

          <div class="${ID}-personalised--productscarousel ${ID}-recentlyviewed-carousel" id="${ID}-recentlyviewed-carousel">

          </div>
          
          <div class="${ID}-personalised--productscarousel ${ID}-itemsinbasket-carousel" id="${ID}-itemsinbasket-carousel">

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
                
        <!-- BRANDS CAROUSEL -->

        <div class="${ID}-personalised--carousel ${ID}-personalised--carousel--brands">
        
          <h3> Recently viewed brands </h3>
          <div class="${ID}-personalised--carouselbrandholder">
            <div id="${ID}-rvbrands-carouselcontainer" class="${ID}-rvbrands-carouselcontainer">

                ${brands
					.map((brand) => {
						let brandname = brand[0].toLowerCase()
						let brandPageUrl = `https://www.sportsdirect.com/${brandname.replace(' ', '-')}`

						return `
                  
                      <a href="${brandPageUrl}" class="${ID}-personalised--carouselbranditem" data-brand="${brandname}">
                      
                        <span class="${ID}-brandname">${brand[0]}</span>           
                      
                      </a>
                    
                    `
					})
					.join('')}

              
            </div>
            
          </div>
        
        </div>
      
      
      `

			let brandsInsertion = document.getElementById(`${ID}-rvbrands-carousel`)
			brandsInsertion.insertAdjacentHTML('afterbegin', brandsHTML)
		}

		setTimeout(() => {
			fireEvent('Visible - page has completed loading')

			// adding tracking
			pollerLite(
				[
					() => {
						return document.querySelectorAll('#dy-recommendations-101215828 .dy-recommendation-product').length > 15
					},
					() => {
						return document.querySelectorAll('#dy-recommendations-101215830 .dy-recommendation-product').length > 15
					},
					() => {
						return document.querySelectorAll('#dy-recommendations-100859930 .dy-recommendation-product').length > 15
					},
					() => {
						return document.querySelectorAll('#dy-recommendations-100856778 .dy-recommendation-product').length > 15
					},
					() => {
						return document.querySelectorAll('#dy-recommendations-100859932 .dy-recommendation-product').length > 15
					},
					() => {
						return document.querySelector('#dy-recommendations-100859967 .dy-recommendation-product')
					}
				],
				() => {
					let carouselItems = [].slice.call(document.querySelectorAll('#dy-recommendations-100859930 a, #dy-recommendations-100856778 a, #dy-recommendations-100859932 a, #dy-recommendations-100859967 a, #dy-recommendations-101215830 a, #dy-recommendations-101215828 a'))
					carouselItems.forEach((item) => {
						if (!item.classList.contains('swiper-button-next') && !item.classList.contains('swiper-button-prev')) {
							item.addEventListener('click', (e) => {
								if (e.target.classList.contains('quickview-button')) {
									fireEvent(`Click - user has clicked on a quickview ATB in ${e.currentTarget.closest(`.${ID}-personalised--productscarousel`).querySelector('.dy-recommendations__title').innerText} carousel - item is ${e.currentTarget.closest('.dy-recommendation-product').querySelector('.product').href}`, true)
								} else if (e.target.classList.contains('quickwish')) {
									fireEvent(`Click - user has clicked on the wishlist icon in ${e.currentTarget.closest(`.${ID}-personalised--productscarousel`).querySelector('.dy-recommendations__title').innerText} carousel - item href: ${e.currentTarget.closest('.dy-recommendation-product').querySelector('.product').href}`, true)
								} else {
									fireEvent(`Click - user has clicked on an item in ${e.currentTarget.closest(`.${ID}-personalised--productscarousel`).querySelector('.dy-recommendations__title').innerText} carousel - item href: ${e.currentTarget.href}`, true)
								}
							})
						}
					})
				}
			)

			document.body.addEventListener('click', (e) => {
				if (e.target.closest('#addHotspotToBag')) {
					fireEvent(`Click - user clicked on the Add to Bag button on the quickbuy for product: ${e.target.closest('.hsbottom').querySelector('#hsViewProduct a').href}`)
				}
			})

			if (brands.length > 3) {
				let allBrandIcons = [].slice.call(document.querySelectorAll(`.${ID}-personalised--carouselbranditem`))
				allBrandIcons.forEach((icon) => {
					icon.addEventListener('click', (e) => {
						fireEvent(`Click - user has clicked on the ${e.currentTarget.getAttribute('data-brand')} icon, taking them to href: ${e.currentTarget.href}`, true)
					})
				})
			}

			let bagItems = JSON.parse(document.getElementById('divBagItems').getAttribute('data-basket'))
			if (bagItems.quantity > 0) {
				let allItemsInBasket = [].slice.call(document.querySelectorAll(`#${ID}-itemsinbasket-carouselcontainer .${ID}-product-link`))
				allItemsInBasket.forEach((item) => {
					item.addEventListener('click', (e) => {
						fireEvent(`Click - user has clicked on item href: ${e.currentTarget.href} to go to the item`, true)
					})
				})
			}
		}, 750)
	})
}

const addBasketCarousel = () => {
	if (document.querySelector(`#${ID}-itemsinbasket-carousel`)) {
		document.querySelector(`#${ID}-itemsinbasket-carousel`).innerHTML = ''
	}

	pollerLite(['#divBagItems'], () => {
		let bagItems = JSON.parse(document.getElementById('divBagItems').getAttribute('data-basket'))
		if (bagItems.quantity > 0) {
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
        
          <!-- ITEMS IN BASKET CAROUSEL -->

          <div class="${ID}-personalised--carousel">
          
            <h3> Don't miss out </h3>
            <div class="${ID}-personalised--carouselholder">
              <div id="${ID}-itemsinbasket-carouselcontainer" class="swiper-container">
                <div class="swiper-wrapper">
                  ${prodsToBeDisplayed
						.map((product) => {
							if (product.url !== null) {
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
							}
						})
						.join('')}
                </div>
                <div class="${ID}-carousel-pagination swiper-pagination" id="${ID}-itemsinbasket-pagination"></div>
              </div>
              <button id="${ID}-itemsinbasket-left-button" class="${ID}-carousel-button left"><svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 8.99992H1.5M12.5833 1.08325L20.5 8.99992L12.5833 1.08325ZM20.5 8.99992L12.5833 16.9166L20.5 8.99992Z" stroke="#0000ED" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>              
              <button id="${ID}-itemsinbasket-right-button" class="${ID}-carousel-button right"><svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 8.99992H1.5M12.5833 1.08325L20.5 8.99992L12.5833 1.08325ZM20.5 8.99992L12.5833 16.9166L20.5 8.99992Z" stroke="#0000ED" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            </div>
            <a href="/checkout" class="${ID}-checkout-button">Go to Checkout</a>
          </div>
        
        
        
        `

				let basketInsertion = document.getElementById(`${ID}-itemsinbasket-carousel`)
				basketInsertion.insertAdjacentHTML('afterbegin', itemsInBasketCarouselHTML)

				document.querySelector(`.${ID}-checkout-button`).addEventListener('click', () => {
					fireEvent(`Click - user has clicked on the checkout button to go to the checkout`, true)
				})

				initiateSlider('itemsinbasket')
			})
		}
	})
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
		return
	}

	// Write experiment code here
	// ...

	if (getPageData()?.visitorLoginState == 'logged+in') {
		let requestURL = 'https://www.sportsdirect.com/accountinformation/editpersonaldetails'

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
					brandPage.innerHTML = data

					pollerLite([`#${ID}-jfy-link`], () => {
						let jfyLink = document.querySelector(`.${ID}-jfy-link`)
						jfyLink.innerHTML = `For ${brandPage.querySelector('#txtFirstName').value.length <= 10 && brandPage.querySelector('#txtFirstName').value.length > 1 ? brandPage.querySelector('#txtFirstName').value : `YOU`}</span><span class="${ID}-jfy-link--pill">NEW</span>`
						if (jfyLink.classList.contains(`${ID}-hidden`)) {
							jfyLink.classList.remove(`${ID}-hidden`)
						}
					})

					pollerLite([`.${ID}-personalised--headerline1`], () => {
						let nameLink = document.querySelector(`.${ID}-personalised--headerline1`)
						nameLink.innerHTML = brandPage.querySelector('#txtFirstName').value + '\'s'
					})
				}
			}
		}
		request.onerror = () => {
			// There was a connection error of some sort
		}
		request.send()
	}

	if (window.location.href.indexOf('/just-for-you') > -1) {
		startExperiment()

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
		pollerLite(['#topMenuWrapper'], () => {
			let insertionPoint = ''
			if (window.outerWidth > 1020) {
				insertionPoint = document.querySelector('#topMenuWrapper')
				insertionPoint.insertAdjacentHTML(
					'beforeend',
					`
      
          <a href="/just-for-you" id="${ID}-jfy-link" class="${ID}-jfy-link ${getPageData().visitorLoginState == 'logged+in' ? 'pii-item' : ''}"><span class="${ID}-jfy-link--text">For You</span><span class="${ID}-jfy-link--pill">NEW</span></a>

        `
				)
			} else {
				let trigger = document.getElementById('trigger')
				trigger.classList.add(`${ID}-jfy-dot`)

				let triggerClick = document.getElementById('trigger')
				triggerClick.addEventListener('click', () => {
					if (document.getElementById('mp-menu').classList.contains('menu-open')) {
						trigger.classList.add(`${ID}-jfy-dot`)
					} else {
						trigger.classList.remove(`${ID}-jfy-dot`)
					}
				})

				insertionPoint = document.querySelector('.mobMenuGroup')
				insertionPoint.insertAdjacentHTML(
					'afterbegin',
					`
        
          <li class="root mmHasChild has-dropdown  AppTab AppSplash multicolumn MenuGroupDesigners threeCol twoPromo"><a href="/just-for-you" id="${ID}-jfy-link" class="${ID}-jfy-link ${getPageData().visitorLoginState == 'logged+in' ? 'pii-item' : ''} menuitemtext MobMenChevron"><span class="${ID}-jfy-link--text">For You</span><span class="${ID}-jfy-link--pill">NEW</span></a></li>

        `
				)
			}

			let jfyLink = document.getElementById(`${ID}-jfy-link`)
			jfyLink.addEventListener('click', () => {
				fireEvent(`Click - user has clicked on JFY link from page: ${window.location.href} to go to the Just For You page`)
			})
		})
	}
}
