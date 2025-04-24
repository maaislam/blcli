import {__, getLanguage} from '../../lib/helpers';

const $ = window.jQuery;

const allProductsColumnar = $(`
    <div class="tg23-all-products-columnar row">
        <div class="col-xs-4 tg23-strength">
            <h2>${__('Strength')}</h2>
            <ul>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-plate_loaded.html')}">
                        <span class="icon-Shape_Plate-Loaded"></span>
                        <span>${__('Plate Loaded')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-multigyms_and_cable_stations.html')}">
                        <span class="icon-Shape_Multigyms-and-cable-stations"></span>
                        <span>${__('Multigyms and cable stations')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-benches_racks.html')}">
                        <span class="icon-Shape_Benches-n-Racks"></span>
                        <span>${__('Benches &amp; Racks')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-upper_body_trainers.html')}">
                        <span class="icon-Shape_Upper-Body-trainers"></span>
                        <span>${__('Upper Body trainers')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-selectorised.html')}">
                        <span class="icon-Shape_Selectorised"></span>
                        <span>${__('Selectorised')}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-xs-4 tg23-cardio">
            <h2>${__('Cardio')}</h2>
            <ul>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-treadmills.html')}">
                        <span class="icon-Shape_Treadmills"></span>
                        <span>${__('Treadmills')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-exercise_bikes.html')}">
                        <span class="icon-Shape_Exercise-bikes"></span>
                        <span>${__('Exercise bikes')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-elliptical_cross_trainers.html')}">
                        <span class="icon-Shape_Elliptical-Cross-Trainers"></span>
                        <span>${__('Elliptical Cross Trainers')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-stair_climbers.html')}">
                        <span class="icon-Shape_Stair-Climbers"></span>
                        <span>${__('Stair Climbers')}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-xs-4 tg23-functional">
            <h2>${__('Functional / Flexibility')}</h2>
            <ul>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-rowers.html')}">
                        <span class="icon-Shape_Rowers"></span>
                        <span>${__('Rowers')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-free_weights.html')}">
                        <span class="icon-Shape_Free-Weights"></span>
                        <span>${__('Free Weights')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-stretching.html')}">
                        <span class="icon-Shape_Stretching"></span>
                        <span>${__('Stretching')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-accessories.html')}">
                        <span class="icon-Shape_wellness_tools"></span>
                        <span>${__('Accessories')}</span>
                    </a>
                </li>
                <li>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-functional_training_equipment.html')}">
                        <span class="icon-Shape_Functional-training-equipment"></span>
                        <span>${__('Functional training equipment')}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
`);

export default allProductsColumnar;
