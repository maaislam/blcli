import { __ } from '../helpers';
/* eslint-disable */
export const mobileData = [
    {
      name: `${__('Our products')}`,
      html: `
        <div class="TG058-product_categories TG058_level2">
          <h3>${__('Cardio')}</h3>
            <ul class="TG058-level3">
            <li class="icon-Shape_Treadmills"><a href="${__('/gb/')}${__('products/shopby/product_type-treadmills.html')}">${__('Treadmills')}</a></li>
            <li class="icon-Shape_Exercise-bikes"><a href="${__('/gb/')}${__('products/shopby/product_type-exercise_bikes.html')}">${__('Exercise Bikes')}</a></li>
            <li class="icon-Shape_Elliptical-Cross-Trainers"><a href="${__('/gb/')}${__('products/shopby/product_type-elliptical_cross_trainers.html')}">${__('Elliptical Cross Trainers')}</a></li>
            <li class="icon-Shape_Rowers"><a href="${__('/gb/')}${__('products/shopby/product_type-rowers.html')}">${__('Rower')}</a></li>
            <li class="icon-Shape_Stair-Climbers"><a href="${__('/gb/')}${__('products/shopby/product_type-stair_climbers.html')}">${__('Stair Climbers')}</a></li>
            <li class="icon-Shape_Upper-Body-trainers"><a href="${__('/gb/')}${__('products/shopby/product_type-upper_body_trainers.html')}">${__('Upper Body Trainers')}</a></li>
            <li class="icon-Shape_Group-Cycling"><a href="${__('/gb/')}${__('products/shopby/product_type-group_cycling.html')}">Group Cycle</a></li>
            </ul>
        </div>
        <div class="TG058-product_line TG058_level2">
          <h3>${__('Strength')}</h3>
          <ul class="TG058-level3">
          <li class="icon-Shape_Selectorised"><a href="${__('/gb/')}${__('products/shopby/product_type-selectorised.html')}">${__('Selectorised')}</a></li>
          <li class="icon-Shape_Plate-Loaded"><a href="${__('/gb/')}${__('products/shopby/product_type-plate_loaded.html')}">${__('Plate loaded')}</a></li>
          <li class="icon-Shape_Multigyms-and-cable-stations"><a href="${__('/gb/')}${__('products/shopby/product_type-multigyms_and_cable_stations.html')}">${__('Multigyms and cable stations')}</a></li>
          <li class="icon-Shape_Benches-n-Racks"><a href="${__('/gb/')}${__('products/shopby/product_type-benches_racks.html')}">${__('Benches & Racks')}</a></li>
          <li class="icon-Shape_Free-Weights"><a href="${__('/gb/')}${__('products/shopby/product_type-free_weights.html')}">${__('Free Weights')}</a></li>
          <li class="icon-Shape_wellness_tools"><a href="${__('/gb/')}${__('products/shopby/product_type-accessories.html')}">${__('Accessories')}</a></li>
          </ul>
        </div>
        <div class="TG058-product_line TG058_level2">
          <h3>${__('Functional & Flexibility')}</h3>
          <ul class="TG058-level3">
          <li class="icon-Shape_Functional-training-equipment"><a href="${__('/gb/')}${__('products/shopby/product_type-functional_training_equipment.html')}">${__('Functional Training Equipment')}</a></li>
          <li class="icon-Shape_Stretching"><a href="${__('/gb/')}${__('products/shopby/product_type-stretching.html')}">${__('Stretching')}</a></li>
          <li class="icon-Shape_wellness_tools"><a href="${__('/gb/')}${__('products/shopby/product_type-accessories.html')}">${__('Accessories')}</a></li>
          </ul>
        </div>
        <div class="TG058-product_line TG058_level2">
          <h3>Digital</h3>
          <ul class="TG058-level3">
            <li><a class="TG058-wellness" href="${__('/gb/')}mywellness/">mywellness</a></li>
            <li><a href="${__('/gb/')}${__('unity-smart-fitness-enabler/')}/">Unity</a></li>
          </ul>
        </div>
      `,
    },
    {
      name: `${__('For your home')}`,
      html: `
        <div class="TG058-for_home"></div>
      `,
    },
    {
      name: 'Log in',
      url: `${__('/gb/')}customer/account/login/`,
    },
    {
      name: `${__('Contact us')}`,
      url: `${__('/gb/')}contacts/`,
    },
    {
      name: 'mywellness',
      url: `${__('/gb/')}mywellness/`,
    },
    {
      name: 'Newsroom',
      url: `${__('/gb/')}newsroom`,
    },
  ];
export default mobileData;

