import {__, getLanguage} from '../../lib/helpers';

const $ = window.jQuery;

const allProductsSlider = $(`
    <div class="tg23-all-products-slider">
        <div class="tg23-all-products-toggle">
          <span class="tg23-toggle tg23-toggle--cats tg23-toggle--active">
            ${__('Product Categories')}
          </span>
          <span class="tg23-toggle tg23-toggle--ranges">
            ${__('Product Ranges')}
          </span>
        </div>

        <div class="tg23-all-products-slider__inner">
          <ul class="tg23-all-products-slider__categories">
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-treadmills.html')}">
                                  <span class="icon-Shape_Treadmills"></span>
                                  <span>${__('Treadmills')}</span>
                              </a>
                          </li>
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-exercise_bikes.html')}">
                                  <span class="icon-Shape_Exercise-bikes"></span>
                                  <span>${__('Exercise bikes')}</span>
                              </a>
                          </li>
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-elliptical_cross_trainers.html')}">
                                  <span class="icon-Shape_Elliptical-Cross-Trainers"></span>
                                  <span>${__('Elliptical Cross Trainers')}</span>
                              </a>
                          </li>
              <li class="">
                          <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-rowers.html')}">
                              <span class="icon-Shape_Rowers"></span>
                              <span>${__('Rowers')}</span>
                          </a>
                      </li>
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-stair_climbers.html')}">
                                  <span class="icon-Shape_Stair-Climbers"></span>
                                  <span>${__('Stair Climbers')}</span>
                              </a>
                          </li>
              <li class="">
                          <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-upper_body_trainers.html')}">
                              <span class="icon-Shape_Upper-Body-trainers"></span>
                              <span>${__('Upper Body trainers')}</span>
                          </a>
                      </li>    
              <li class="">
                      <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-group_cycling.html')}">
                          <span class="icon-Shape_Group-Cycling"></span>
                          <span>${__('Group Cycling')}</span>
                      </a>
                  </li>      
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-selectorised.html')}">
                                  <span class="icon-Shape_Selectorised"></span>
                                  <span>${__('Selectorised')}</span>
                              </a>
                          </li>
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-plate_loaded.html')}">
                                  <span class="icon-Shape_Plate-Loaded"></span>
                                  <span>${__('Plate Loaded')}</span>
                              </a>
                          </li>  
              <li class="">
                          <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-multigyms_and_cable_stations.html')}">
                              <span class="icon-Shape_Multigyms-and-cable-stations"></span>
                              <span>${__('Multigyms and cable stations')}</span>
                          </a>
                      </li>       
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-benches_racks.html')}">
                                  <span class="icon-Shape_Benches-n-Racks"></span>
                                  <span>${__('Benches &amp; Racks')}</span>
                              </a>
                          </li>
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-free_weights.html')}">
                                  <span class="icon-Shape_Free-Weights"></span>
                                  <span>${__('Free Weights')}</span>
                              </a>
                          </li>
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-functional_training_equipment.html')}">
                                  <span class="icon-Shape_Functional-training-equipment"></span>
                                  <span>${__('Functional training equipment')}</span>
                              </a>
                          </li>
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-stretching.html')}">
                                  <span class="icon-Shape_Stretching"></span>
                                  <span>${__('Stretching')}</span>
                              </a>
                          </li>
              <li class="">
                              <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-accessories.html')}">
                                  <span class="icon-Shape_wellness_tools"></span>
                                  <span>${__('Accessories')}</span>
                              </a>
                          </li>
          </ul>

          <ul class="tg23-all-products-slider__ranges tg23-hide">
              <span><a href="${__('https://www.technogym.com/gb/line/the-arke-range/')}">${__('ARKE')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/artis/')}">${__('ARTIS')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/cable-stations-range/')}">${__('Cable Stations')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/the-element-range/')}">${__('Element+')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/excite-range/')}">${__('Excite')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/the-flexability-range/')}">${__('FLEXability')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/formanew-release/')}">${__('Forma')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/the-group-cycle-range/')}">${__('Group Cycle')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/the-kinesis-stations-range/')}">${__('Kinesis')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/the-omnia-range/')}">${__('OMNIA')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/the-personal-range/')}">${__('Personal')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/the-plurima-range/')}">${__('Plurima')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/the-pure-strength-range/')}">${__('Pure Strength')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/selection-pro/')}">${__('Selection Pro')}</a></span>
              <span><a href="${__('https://www.technogym.com/gb/line/the-wellness-tools-range/')}">${__('Wellness Tools')}</a></span>
          </ul>
        </div>

        <p class="tg23-all-products-slider__view-all">
            <a class="button btn-default" href="/products.html">
                ${__('View all products')}
                &gt;
            </a>
        </p>
    </div>
`);

export default allProductsSlider;
