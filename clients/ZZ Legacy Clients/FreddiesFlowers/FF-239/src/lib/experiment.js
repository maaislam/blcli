/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

    setup();

    if (location.pathname === '/') {
        fireEvent('Conditions Met');
    } else if (sessionStorage.getItem(`${ID}-shown`) && sessionStorage.getItem(`${ID}-shown`) == 'true') {
        fireEvent('Conditions Met');
    }

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...
    document.body.classList.add(`${ID}`)
    const config = { attributes: false, childList: true, subtree: true };
    pollerLite(['div.main section button[type="submit"]'], () => {
        let nextStepButton = document.querySelector('div.main section button[type="submit"]')
        if (nextStepButton) {
            nextStepButton.addEventListener('click', (e) => {
                const isValueAvailable = sessionStorage.getItem(`${ID}-shown`);
                if (isValueAvailable && isValueAvailable == 'true') {
                    const section = e.target.closest('section');
                    const sectionId = section ? section.getAttribute('id') : ''
                    const loc = location.pathname
                    if (sectionId === 'introductions') {
                        setTimeout(function() {
                            if (loc !== location.pathname) {
                                fireEvent('Customer completes checkout step 1 (your details)')
                                    //console.log('Customer completes checkout step 1 (your details)')
                            }
                        }, 1500)
                    } else if (sectionId === 'delivery') {
                        setTimeout(function() {
                            if (loc !== location.pathname) {
                                fireEvent('Customer completes checkout step 2 (delivery)')
                                    //console.log('Customer completes checkout step 2 (delivery)')
                            }
                        }, 1500)
                    }

                    if (loc.indexOf('card-details') > -1) {
                        sessionStorage.setItem(`${ID}-payment-done`, true)
                        const triggerEvent = setInterval(() => {
                            if (location.pathname.indexOf('account/confirmation') > -1 && sessionStorage.getItem(`${ID}-payment-done`) && sessionStorage.getItem(`${ID}-payment-done`) === 'true') {
                                fireEvent('Customer completes checkout step 3 (payment)')
                                sessionStorage.removeItem(`${ID}-payment-done`)
                                clearInterval(triggerEvent);
                            }
                        }, 1000)

                        const totalProductsObserver = new MutationObserver((mutationsList, observer) => {
                            if ((e.target.innerText.trim()).toLowerCase() === 'sign me up') {
                                sessionStorage.removeItem(`${ID}-payment-done`)
                                clearInterval(triggerEvent);
                            }
                        });
                        totalProductsObserver.observe(e.target, config);
                    }
                }
            })
        }
    })

    pollerLite(['div.main'], () => {
        if (location.pathname === '/') {
            document.addEventListener('click', (e) => {
                const isValueAvailable = sessionStorage.getItem(`${ID}-shown`);
                if (isValueAvailable && isValueAvailable == 'true') {
                    const target = e.target
                    if (target.matches('button.button[type="button"]') || target.closest('button.button[type="button"]')) {
                        fireEvent(`Customer clicks "${e.target.innerText.trim()}" CTA to start checkout`)
                    }
                }
            })
        }
    })


    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control' && location.pathname === '/') {
        pollerLite(['div.main.homepage-layout', 'div.multi-teaser'], () => {

            const multiTeaser = document.querySelector('div.multi-teaser');
            const multiTeaserWrapper = multiTeaser.parentNode

            let shouldSetToStorage = true
            document.addEventListener('scroll', (e) => {
                var position = multiTeaserWrapper.getBoundingClientRect();
                var midHeight = window.innerHeight / 2
                if (position.top < midHeight && shouldSetToStorage) {
                    sessionStorage.setItem(`${ID}-shown`, true);
                    fireEvent("Customer visits the home page and scrolls to the point that they see the how it works element whilst in the variation")
                        //console.log("Customer visits the home page and scrolls to the point that they see the how it works element whilst in the variation")
                    shouldSetToStorage = false
                }
            })

        })
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...
    if (VARIATION == 1 && location.pathname === '/') {
        pollerLite(['div.main.homepage-layout', 'div[type="trustpilot"]'], function() {
            const trustPilot = document.querySelector('div[type="trustpilot"]');
            const trustPilotWrapper = trustPilot.parentNode
            const expWrapper = document.createElement('div')
            expWrapper.classList.add(`${ID}-wrapper`)
            expWrapper.setAttribute('id', `${ID}-wrapper-desktop`)
            const newExperiment = `
                    <div class="${ID}-value-prop__title">
                      <h1 class="heading">Brighten your life with better flowers</h1>
                    </div>
                    <div class="${ID}-item--container">
                      <div class="${ID}-items-row">
                          <div class="${ID}-item">
                              <div class="${ID}-item-image-container">
                                  <img src="https://blcro.fra1.digitaloceanspaces.com/FF-239/beautiful_blooms.png" alt="Better Flowers Image" class="image-tab-desktop"/>
                                  <img src="https://blcro.fra1.digitaloceanspaces.com/FF-239/beautiful_blooms_mobile.png" alt="Better Flowers Image" class="image-tab-mobile"/>
                              </div>
                              <div class="${ID}-description-container">
                                <h1 type="heading" class="heading heading--small">Beautiful blooms</h1>
                                <p type="paragraph" class="paragraph paragraph--medium">Perfectly curated, seasonal arrangements, picked and packed with care, just for you.</p>
                              </div>
                          </div>
        
                          <div class="${ID}-item">
                              <div class="${ID}-item-image-container">
                                  <img src="https://blcro.fra1.digitaloceanspaces.com/FF-239/your_new_hobby.png" alt="Better Flowers Image" class="image-tab-desktop"/>
                                  <img src="https://blcro.fra1.digitaloceanspaces.com/FF-239/your_new_hobby_mobile.png" alt="Better Flowers Image" class="image-tab-mobile"/>
                              </div>
                              <div class="${ID}-description-container">
                                <h1 type="heading" class="heading heading--small">Your newest hobby</h1>
                                <p type="paragraph" class="paragraph paragraph--medium">Each box comes with illustrated arranging guides that’ll make you a pro in no time.</p>
                              </div>
                          </div>
        
                          <div class="${ID}-item">
                              <div class="${ID}-item-image-container">
                                  <img src="https://blcro.fra1.digitaloceanspaces.com/FF-239/flowers_that_last.png" alt="Better Flowers Image" class="image-tab-desktop"/>
                                  <img src="https://blcro.fra1.digitaloceanspaces.com/FF-239/flowers_that_last_mobile.png" alt="Better Flowers Image" class="image-tab-mobile"/>
                              </div>
                              <div class="${ID}-description-container">
                                <h1 type="heading" class="heading heading--small">Flowers that last</h1>
                                <p type="paragraph" class="paragraph paragraph--medium">Super fresh flowers that last for weeks, straight from the grower to your door - no middlemen!</p>
                              </div>
                          </div>
        
                          <div class="${ID}-item">
                              <div class="${ID}-item-image-container">
                                  <img src="https://blcro.fra1.digitaloceanspaces.com/FF-239/kinder_to_the_planet.png" alt="Better Flowers Image" class="image-tab-desktop"/>
                                  <img src="https://blcro.fra1.digitaloceanspaces.com/FF-239/kinder_to_the_planet_mobile.png" alt="Better Flowers Image" class="image-tab-mobile"/>
                              </div>
                              <div class="${ID}-description-container">
                                <h1 type="heading" class="heading heading--small">Kinder to the planet</h1>
                                <p type="paragraph" class="paragraph paragraph--medium">Carbon neutral deliveries, recyclable packaging and a grow-to-order model.</p>
                              </div>
                          </div>
                      </div>
                    </div>
                `

            expWrapper.insertAdjacentHTML('afterbegin', newExperiment)
            trustPilotWrapper.insertAdjacentElement("afterend", expWrapper)

            const mobileExp = expWrapper.cloneNode(true)
            mobileExp.classList.add('mobile-only')
            mobileExp.setAttribute('id', `${ID}-wrapper-mobile`)
            trustPilotWrapper.insertAdjacentElement("beforebegin", mobileExp)

            let shouldSetToStorage = true;
            document.addEventListener('scroll', (e) => {
                const isMobile = window.innerWidth < 768 ? true : false

                if (isMobile) {
                    const targetDom = document.getElementById(`${ID}-wrapper-mobile`);
                    var position = targetDom.getBoundingClientRect();
                    if (position.top < 180) {
                        if (shouldSetToStorage) {
                            fireEvent("Customer sees Value proposition section")
                                //console.log("Customer sees Value proposition section")
                            sessionStorage.setItem(`${ID}-shown`, true);
                            shouldSetToStorage = false
                        }
                    }
                } else {
                    const targetDom = document.getElementById(`${ID}-wrapper-desktop`);
                    var position = targetDom.getBoundingClientRect();

                    if ((targetDom.offsetHeight + 100) > window.innerHeight) {
                        if (position.top < 120) {
                            if (shouldSetToStorage) {
                                fireEvent("Customer sees Value proposition section")
                                    //console.log("Customer sees Value proposition section")
                                sessionStorage.setItem(`${ID}-shown`, true);
                                shouldSetToStorage = false
                            }
                        }
                    } else {
                        if (position.bottom <= window.innerHeight) {
                            if (shouldSetToStorage) {
                                fireEvent("Customer sees Value proposition section")
                                    //console.log("Customer sees Value proposition section")
                                sessionStorage.setItem(`${ID}-shown`, true);
                                shouldSetToStorage = false
                            }
                        }
                    }
                }
            })
        })
    }
};