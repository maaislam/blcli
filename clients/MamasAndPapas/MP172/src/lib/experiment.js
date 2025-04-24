/**
 * MP172 - Mattress Banner and Link
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;
  
  const banner = () => {
    return `
      <div class="MP172-banner">
        <h2>Compare Mattresses</h2>

        <p>Not sure which mattress is best for you? Check out our handy comparison chart.</p>

        <a href="https://www.mamasandpapas.com/en-gb/mattress-compare">Compare Now</a>
      </div>
    `;
  };


  if (window.location.href == 'https://www.mamasandpapas.com/en-gb/mattress-compare') { // Comparison page
    pollerLite(['.cd-products-columns .product', '.getting-started p'], () => {
      
      const title = document.querySelector('.getting-started > h2');
      title.textContent = 'Compare our Mattresses';

      const ref = document.querySelector('#cd-products-table');
      ref.innerHTML = '';
      ref.insertAdjacentHTML('beforeend', `
        <div class="features">
          <div class="top-info">
              <div class="scroll-prompt">
                  <span class="hidden-sm hidden-xs">Scroll</span>
                  <span class="hidden-lg hidden-md">Swipe</span> to
                  <br class="hidden-sm hidden-xs"> view more mattreses
              </div>
              <div class="bounce lnr-scroll">
                  &nbsp;
              </div>

              <p>See below for the key features included with each mattress</p>

              <div class="MP172-key">
                  <div class="ib">
                      <p>Suitable for:</p>
                  </div>
                  <div class="ib">
                      <div><strong><span>Suitable for </span>Cotbeds</strong></div>
                      <div><strong><span>Suitable for </span>Cots</strong></div>
                  </div>
              </div>
          </div>
          <ul class="cd-features-list">
              <li>
                  <p>Intelligent Fabric</p>
              </li>
              <li>
                  <p>Waterproof</p>
              </li>
              <li>
                  <p>Adaptable dual spring support</p>
              </li>
              <li>
                  <p>Higher count mini pocket springs</p>
              </li>
              <li>
                  <p>Dual Core</p>
              </li>
              <li>
                  <p>Extra support layer</p>
              </li>
              <li>
                  <p>Purotex Technology</p>
              </li>
              <li>
                  <p>Temperature Regulating</p>
              </li>
              <li>
                  <p>Perspiration Control</p>
              </li>
              <li>
                  <p>Anti-allergy</p>
              </li>
              <li>
                  <p>Pocket Spring</p>
              </li>
              <li>
                  <p>Inner Protector</p>
              </li>
              <li>
                  <p>Wipe clean inner</p>
              </li>
              <li>
                  <p>Airflow</p>
              </li>
              <li>
                  <p>Hypoallergenic</p>
              </li>
              <li>
                <p>Fully-washable inner core</p>
            </li>
          </ul>
        </div>

        <div class="cd-products-wrapper open">
          <ul class="cd-products-columns">

              <li class="product">
                  <div class="top-info">

                      <div class="mobile-height">
                          <h3><strong>Luxury</strong> <br>Twin Spring</h3>
                      </div>
                      <a id="Premium Twin Spring link" href="/p/prdsmcb00"><img alt="Premium Twin Spring" class=" lazyloaded" data-src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-premium-twin-spring" src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-premium-twin-spring"></a>
                      <div class="price-wrap">
                        <p class="price">£229.00</p>
                        <div class="shop-now-btn">
                            <a id="Premium Twin Spring btn" href="/p/prdsmcb00">View</a>
                        </div>
                      </div>
                  </div>
                  <ul class="cd-features-list">
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li><span style="font-size: 15px;font-weight: 400;color:#b79baa; top: -7px; position: relative;">Natural<br>Coir</span></li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li><span style="font-size: 15px;font-weight: 400;color:#91cabf; top: -7px; position: relative;"><div class="purple-mark">&nbsp;</div></span></li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="purple-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                      </li>
                  </ul>
              </li>

              <li class="product">
                  <div class="top-info">

                      <div class="mobile-height">
                          <h3><strong>Premium</strong> <br>Dual Core</h3>
                      </div>
                      <a id="Premium Dual Core link" href="/premium-dual-core-mattress/p/prdnmcb01"><img alt="Premium Dual Core" class=" lazyloaded" data-src="https://storage.googleapis.com/ucimagehost/mp172/premiumdualcore.jpg" src="https://storage.googleapis.com/ucimagehost/mp172/premiumdualcore.jpg"></a>
                      <div class="price-wrap">
                        <p class="price">£199.00</p>
                        <div class="shop-now-btn">
                            <a id="Premium Dual Core btn" href="/premium-dual-core-mattress/p/prdnmcb01">View</a>
                        </div>
                      </div>
                  </div>
                  <ul class="cd-features-list">
                    <li>
                        
                    </li>
                    <li></li>
                    <li></li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li><span style="font-size: 15px;font-weight: 400;color:#91cabf; top: -7px; position: relative;">Natural<br>Coir</span></li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li><span style="font-size: 15px;font-weight: 400;color:#91cabf; top: -7px; position: relative;"><div class="green-mark">&nbsp;</div></span></li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>

                    </li>
                </ul>
              </li>

              <li class="product">
                  <div class="top-info">

                      <div class="mobile-height">
                          <h3><strong>Premium</strong> <br>Pocket Spring</h3>
                      </div>
                      <a id="Premium Pocket Spring link" href="/p/prpsmcb00"><img alt="Premium Pocket Spring" class=" lazyloaded" data-src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-premium-pocket-spring" src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-premium-pocket-spring"></a>
                      <div class="price-wrap">
                        <p class="price">
                          £149
                        </p>
                        <div class="shop-now-btn">
                            <a id="Premium Pocket Spring btn" href="/premium-pocket-spring-cotbed-mattress/p/prpsmcb01">View</a>
                        </div>
                      </div>

                      <div class="price-wrap">
                        <p class="price">£99</p>

                        <div class="shop-now-btn">
                            <a href="/premium-pocket-spring-cot-mattress/p/prpsmmc01">View</a>
                        </div>
                      </div>
                  </div>
                  <ul class="cd-features-list">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li><span style="font-size: 15px;font-weight: 400;color:#91cabf; top: -7px; position: relative;">Recycled<br /> Eco-pad</span></li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li><span style="font-size: 15px;font-weight: 400;color:undefined; top: -7px; position: relative;"><div class="green-mark">&nbsp;</div></span></li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>
                        <div class="green-mark">
                            &nbsp;
                        </div>
                    </li>
                    <li>

                    </li>
                  </ul>
              </li>

              <li class="product">
                  <div class="top-info">

                      <div class="mobile-height">
                          <h3><strong>Essential</strong> <br>Pocket Spring</h3>
                      </div>
                      <a id="Essential Pocket Spring Link" href="/essential-pocket-spring-cotbed/p/espsmcb01"><img alt="Essential Pocket Spring" class=" lazyloaded" data-src="https://storage.googleapis.com/ucimagehost/mp172/esspocketSpring.jpg" src="https://storage.googleapis.com/ucimagehost/mp172/esspocketSpring.jpg"></a>
                      <div class="price-wrap">
                        <p class="price">
                            £ 99
                        </p>
                        <div class="shop-now-btn">
                            <a id="Essential Pocket Spring btn" href="/essential-pocket-spring-cot-mattress/p/espsmmc01">View</a>
                        </div>
                      </div>

                      <div class="price-wrap">
                        <p class="price">£69</p>

                        <div class="shop-now-btn">
                            <a href="/essential-pocket-spring-cotbed/p/espsmcb01">View</a>
                        </div>
                      </div>
                  </div>
                  <ul class="cd-features-list">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li>
                          
                      </li>
                      <li>
                          
                      </li>
                      <li>
                          
                      </li>
                      <li>
                          
                      </li>
                      <li>
                          <div class="yellow-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="yellow-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="yellow-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="yellow-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="yellow-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li></li>
                  </ul>
              </li>

              <li class="product">
                  <div class="top-info">

                      <div class="mobile-height">
                          <h3><strong>Essential</strong> <br>Fibre</h3>
                      </div>
                      <a id="Essential Foam Link" href="/p/esfomcb00"><img alt="Essential Foam" class=" lazyloaded" data-src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-essential-foam" src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-essential-foam"></a>
                      <div class="price-wrap">
                        <p class="price">
                            £49
                        </p>
                        <div class="shop-now-btn">
                            <a id="Essential Foam btn" href="/essential-fibre-mattress/p/esfbmcb01">View</a>
                        </div>
                      </div>

                      <div class="price-wrap">
                        <p class="price">£35</p>

                        <div class="shop-now-btn">
                            <a href="/essential-fibre-cot-mattress/p/esfbmmc01">View</a>
                        </div>
                      </div>
                  </div>
                  <ul class="cd-features-list">
                      <li>&nbsp;</li>
                      <li>&nbsp;</li>
                      <li>&nbsp;</li>
                      <li>&nbsp;</li>
                      <li>&nbsp;</li>
                      <li>&nbsp;</li>
                      <li>&nbsp;</li>
                      <li>&nbsp;</li>
                      <li>&nbsp;</li>
                      <li>
                          
                      </li>
                      <li>

                      </li>
                      <li>
                        
                          
                      </li>
                      <li>
                          
                      </li>
                      <li>
                          <div class="yellow-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="yellow-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="yellow-mark">
                              &nbsp;
                          </div>
                      </li>
                  </ul>
              </li>

              <li class="product">
                  <div class="top-info">

                      <div class="mobile-height">
                          <h3><strong>Comfort</strong> <br>Air </h3>
                      </div>
                      <a id="Comfort Air link" href="/p/sncamcb00"><img alt="Comfort Air" class=" lazyloaded" data-src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-comfort-air" src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-comfort-air"></a>
                      <div class="price-wrap">
                        <p class="price">£149</p>
                        <div class="shop-now-btn">
                            <a id="Comfort Air btn" href="/p/sncamcb00">View</a>
                        </div>
                      </div>
                  </div>
                  <ul class="cd-features-list">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li>
                          
                      </li>
                      <li></li>
                      <li>
                          
                      </li>
                      <li>
                          <div class="lime-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                        <div class="lime-mark">
                            &nbsp;
                        </div>
                      </li>
                      <li>
                          
                      </li>
                      <li>
                        <div class="lime-mark">
                            &nbsp;
                        </div>
                      </li>
                      <li>

                      </li>
                      <li>
                          
                      </li>
                      <li>
                          <div class="lime-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="lime-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="lime-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="lime-mark">
                              &nbsp;
                          </div>
                      </li>
                  </ul>
              </li>

              <li class="product">
                  <div class="top-info">

                      <div class="mobile-height">
                          <h3><strong>Luxury</strong> <br>Wool </h3>
                      </div>
                      <a id="Luxury Wool link" href="p/snlwmcb01"><img alt="Luxury Wool" class=" lazyloaded" data-src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-luxury-wool" src="https://i1.adis.ws/i/mamasandpapas/mattress-compare-luxury-wool"></a>
                      <div class="price-wrap">
                        <p class="price">£249</p>
                        <div class="shop-now-btn">
                            <a id="Luxury Wool btn" href="p/snlwmcb01">View</a>
                        </div>
                      </div>
                  </div>
                  <ul class="cd-features-list">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li>
                          
                      </li>
                      <li></li>
                      <li>
                          
                      </li>
                      <li>
                          <div class="olive-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="olive-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          
                      </li>
                      <li>
                          <div class="olive-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="olive-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          
                      </li>
                      <li>
                          
                      </li>
                      <li>
                          <div class="olive-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li>
                          <div class="olive-mark">
                              &nbsp;
                          </div>
                      </li>
                      <li></li>
                  </ul>
              </li>

              
          </ul>
        </div>

        <ul class="cd-table-navigation hidden-sm hidden-xs">
          <li><a href="#0" class="prev" style="">Prev</a></li>
          <li><a href="#0" class="next" style="">Next</a></li>
        </ul>
      `);
    });
  } else { // Banner addition
    let bannerRef = null;
    let bannerRefPosition = 'beforeend';

    pollerLite([
      () => {
        let run = false;
        const { breadcrumb } = window.universal_variable.page;
        const { type } = window.universal_variable.page;
        if (breadcrumb && type) {
          run = true;
        }
        return run;
      },
    ], () => {
      const { breadcrumb } = window.universal_variable.page;
      const { type } = window.universal_variable.page;
      
      if (breadcrumb && type) {
        if (breadcrumb.indexOf('Mattresses') > -1) { // Ensure we are on some kind of Mattress related page
          if (type == 'Product') { // PDP
            pollerLite(['.pdp.pdp__key_details .call_to_action'], () => {
              bannerRef = document.querySelector('.pdp.pdp__key_details .call_to_action');
              bannerRefPosition = 'afterend';
            });
          } else if (type == 'Category') { // PLP
            pollerLite(['.productFilter_filterSelectors'], () => {
              bannerRef = document.querySelector('.productFilter_filterSelectors');
            });
          }
        }
      }
    
      // If we have a bannerRef now, we're on the right pages
      
      pollerLite([() => {
        let run = false;
        if (bannerRef !== null) {
          run = true;
        }
        return run;
      }], () => {
        bannerRef.insertAdjacentHTML(bannerRefPosition, banner());
      })
    });
  
  }


};

export default activate;
