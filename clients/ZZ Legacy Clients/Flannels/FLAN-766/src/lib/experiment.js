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
let dyPromises = []

const getPageData = () => {
	let dataObject
	for (let i = 0; i < window.dataLayer.length; i += 1) {
		const data = window.dataLayer[i]
		if (typeof data === 'object' && data.event && data.event === 'FLAN_onLoad') {
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

	let mySwiper = new Swiper(slider, {
		// Optional parameters
		init: true,
		loop: false,
		// If we need pagination
		slidesPerView: 4,
		slidesPerGroup: 4,
		spaceBetween: 25,

		// Responsive breakpoints
		breakpoints: {
			200: {
				slidesPerView: 1,
				slidesPerGroup: 1
			},
			480: {
				slidesPerView: 1,
				slidesPerGroup: 1
			},
			767: {
				slidesPerView: 2,
				slidesPerGroup: 1
			},
			992: {
				slidesPerView: 3,
				slidesPerGroup: 3
			},
			1800: {
				slidesPerView: 4,
				slidesPerGroup: 4
			}
		},
		scrollbar: {
			el: `#${ID}-${sectionName}-scrollbar`,
			draggable: true,
			hide: false,
			snapOnRelease: true
		},
		navigation: {
			nextEl: `#${ID}-${sectionName}-right-button`,
			prevEl: `#${ID}-${sectionName}-left-button`
		}
	})

	if (window.outerWidth < 600) {
		let currSlides = mySwiper.slides.length
		let carouselCount = document.querySelector(`.${ID}-carousel-count`)
		carouselCount.innerHTML = `${mySwiper.activeIndex + 1} / ${currSlides}`
		carouselCount.classList.remove('loading')
		mySwiper.on('slideChange', () => {
			carouselCount.innerHTML = `${mySwiper.activeIndex + 1} / ${currSlides}`
		})
	}
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
          
          <div class="${ID}-personalised--productscarousel ${ID}-vwrv-carousel" id="${ID}-vwrv-carousel">

          </div>

          <div class="${ID}-personalised--productscarousel ${ID}-affinity-carousel" id="${ID}-affinity-carousel">

          </div>

          <div class="${ID}-personalised--productscarousel ${ID}-recentlyviewed-carousel" id="${ID}-recentlyviewed-carousel">

          </div>
          
          <div class="${ID}-personalised--productscarousel ${ID}-itemsinbasket-carousel" id="${ID}-itemsinbasket-carousel">

          </div>

          <!-- BRANDS CAROUSEL -->

          <div class="${ID}-personalised--productscarousel ${ID}-rvbrands-carousel" id="${ID}-rvbrands-carousel">

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
        
          <h3> Your Favourite Designers </h3>
          <div class="${ID}-personalised--carouselbrandholder">
            <div id="${ID}-rvbrands-carouselcontainer" class="${ID}-rvbrands-carouselcontainer">

                ${brands
					.map((brand, iterator) => {
						let brandname = brand[0].toLowerCase()
						let brandPageUrl = `https://www.flannels.com/${brandname.replaceAll(' ', '-')}`

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

		setTimeout(() => {
			fireEvent('Visible - page has completed loading')

			// adding tracking
			pollerLite(
				[
					'#divBagItems',
					() => {
						return document.querySelectorAll('#dy-recommendations-100860077 .dy-recommendation-product').length > 15
					},
					() => {
						return document.querySelectorAll('#dy-recommendations-100860081 .dy-recommendation-product').length > 15
					},
					() => {
						return document.querySelectorAll('#dy-recommendations-100860087 .dy-recommendation-product').length > 15
					}
				],
				() => {
					let carouselItems = [].slice.call(document.querySelectorAll('#dy-recommendations-100860077 a, #dy-recommendations-100860081 a, #dy-recommendations-100860087 a, #dy-recommendations-100860089 a'))
					carouselItems.forEach((item) => {
						item.addEventListener('click', (e) => {
							if (e.target.classList.contains('quickview-button')) {
								fireEvent(`Click - user has clicked on a quickview ATB in ${e.currentTarget.closest(`.${ID}-personalised--productscarousel`).querySelector('.dy-recommendations__title').innerText} carousel - item is ${e.currentTarget.closest('.dy-recommendation-product').querySelector('.product').href}`, true)
							} else if (e.target.classList.contains('quickwish')) {
								fireEvent(`Click - user has clicked on the wishlist icon in ${e.currentTarget.closest(`.${ID}-personalised--productscarousel`).querySelector('.dy-recommendations__title').innerText} carousel - item href: ${e.currentTarget.closest('.dy-recommendation-product').querySelector('.product').href}`, true)
							} else {
								fireEvent(`Click - user has clicked on an item in ${e.currentTarget.closest(`.${ID}-personalised--productscarousel`).querySelector('.dy-recommendations__title').innerText} carousel - item href: ${e.currentTarget.href}`, true)
							}
						})
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
          
            <h3> Your Bag </h3>
            <div class="${ID}-personalised--carouselholder">
              <div id="${ID}-itemsinbasket-carouselcontainer" class="swiper-container">
                <div class="swiper-wrapper">
                  ${prodsToBeDisplayed
						.map((product) => {
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
						})
						.join('')}
                </div>
                <div class="${ID}-carousel-scrollbar" id="${ID}-itemsinbasket-scrollbar"></div>
                <div class="${ID}-carousel-count"></div>
              </div>
              <div class="${ID}-checkout-button-holder"><a href="/cart" class="${ID}-checkout-button">View your bag</a></div>
              <button id="${ID}-itemsinbasket-left-button" class="${ID}-carousel-button left"><svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 1L10 9L1 1" stroke="black" stroke-width="2"/></svg></button>              
              <button id="${ID}-itemsinbasket-right-button" class="${ID}-carousel-button right"><svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 1L10 9L1 1" stroke="black" stroke-width="2"/></svg></button>
            </div>
          
          </div>
        
        
        
        `

				let basketInsertion = document.getElementById(`${ID}-itemsinbasket-carousel`)
				basketInsertion.insertAdjacentHTML('afterbegin', itemsInBasketCarouselHTML)

				document.querySelector(`.${ID}-checkout-button`).addEventListener('click', (e) => {
					fireEvent(`Click - user has clicked on item href: ${e.currentTarget.href} to go to the cart`, true)
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

	if (getPageData().visitorLoginState == 'logged+in') {
		let requestURL = 'https://www.flannels.com/accountinformation/editpersonaldetails'

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

					pollerLite([`.${ID}-personalised--headerline2`], () => {
						let nameLink = document.querySelector(`.${ID}-personalised--headerline2`)
						nameLink.innerHTML = brandPage.querySelector('#txtFirstName').value
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
		pollerLite(['#topMenu ul', '.mobMenuGroup', '#topMenuWrapper'], () => {
			let insertionPoint = ''
			if (window.outerWidth > 1020) {
				insertionPoint = document.querySelector('#topMenuWrapper')
				insertionPoint.classList.add(`${ID}-jfy-button-added`)

				insertionPoint.insertAdjacentHTML(
					'beforeend',
					`

          <li data-id="000001" id="${ID}-jfy-link" class=" mmHasChild root multicolumn MenuGroupOutlet fourCol onePromo"><a href="/just-for-you" id="lnkTopLevelMenu_3019665" class="${ID}-jfy-link lnkLevel2 ${getPageData().visitorLoginState == 'logged+in' ? 'pii-item' : ''}" href="/clearancehome">For YOU <span class="${ID}-jfy-link--pill">NEW</span></a></li>

        `
				)
			} else {
				let trigger = document.getElementById('trigger')
				trigger.classList.add(`${ID}-jfy-dot`)

				insertionPoint = document.querySelector('.mobMenuGroup')
				insertionPoint.insertAdjacentHTML(
					'afterbegin',
					`
        
          <li class="root mmHasChild has-dropdown  AppTab AppSplash multicolumn MenuGroupDesigners threeCol twoPromo"><a href="/just-for-you" id="${ID}-jfy-link" class="${ID}-jfy-link ${getPageData().visitorLoginState == 'logged+in' ? 'pii-item' : ''} menuitemtext MobMenChevron">For YOU <span class="${ID}-jfy-link--pill">NEW</span></a></li>

        `
				)

				let triggerClick = document.getElementById('trigger')
				triggerClick.addEventListener('click', () => {
					if (document.getElementById('mp-menu').classList.contains('menu-open')) {
						trigger.classList.add(`${ID}-jfy-dot`)
					} else {
						trigger.classList.remove(`${ID}-jfy-dot`)
					}
				})
			}

			let jfyLink = document.getElementById(`${ID}-jfy-link`)
			jfyLink.addEventListener('click', () => {
				fireEvent(`Click - user has clicked on JFY link from page: ${window.location.href} to go to the Just For You page`)
			})
		})
	}
}
