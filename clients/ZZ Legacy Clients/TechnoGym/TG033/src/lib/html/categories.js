// This is hardcoded as we can't parse it out of the category structure
// on newsroom pages
const gb = `
    <tbody>
        <tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Treadmills  menu-type-custom menu-position-0 odd first" id="menu-item-1695">
        <a href="//www.technogym.com/gb/products/shopby/product_type-treadmills.html" class="">
            <span>Treadmills</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Exercise-bikes menu-type-custom menu-position-1 even" id="menu-item-1696">
        <a href="//www.technogym.com/gb/products/shopby/product_type-exercise_bikes.html" class="">
            <span>Exercise Bikes</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Elliptical-Cross-Trainers menu-type-custom menu-position-2 odd" id="menu-item-1697">
        <a href="//www.technogym.com/gb/products/shopby/product_type-elliptical_cross_trainers.html" class="TG033_tooLong">
            <span>Elliptical Cross Trainers</span>
        </a>
        </li></td></tr><tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Rowers menu-type-custom menu-position-3 even" id="menu-item-1698">
        <a href="//www.technogym.com/gb/products/shopby/product_type-rowers.html" class="">
            <span>Rowers</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Stair-Climbers menu-type-custom menu-position-4 odd" id="menu-item-1699">
        <a href="//www.technogym.com/gb/products/shopby/product_type-stair_climbers.html" class="">
            <span>Stair Climbers</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Upper-Body-trainers menu-type-custom menu-position-5 even" id="menu-item-1700">
        <a href="//www.technogym.com/gb/products/shopby/product_type-upper_body_trainers.html" class="">
            <span>Upper Body Trainers</span>
        </a>
        </li></td></tr><tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Group-Cycling menu-type-custom menu-position-6 odd" id="menu-item-1701">
        <a href="//www.technogym.com/gb/products/shopby/product_type-group_cycling.html" class="">
            <span>Group Cycling</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Selectorised menu-type-custom menu-position-7 even" id="menu-item-1702">
        <a href="//www.technogym.com/gb/products/shopby/product_type-selectorised.html" class="">
            <span>Selectorised</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Plate-Loaded menu-type-custom menu-position-8 odd" id="menu-item-1703">
        <a href="//www.technogym.com/gb/products/shopby/product_type-plate_loaded.html" class="">
            <span>Plate Loaded</span>
        </a>
        </li></td></tr><tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Multigyms-and-cable-stations menu-type-custom menu-position-9 even" id="menu-item-1704">
        <a href="//www.technogym.com/gb/products/shopby/product_type-multigyms_and_cable_stations.html" class="TG033_tooLong">
            <span>Multigyms and Cable Stations</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Benches-n-Racks menu-type-custom menu-position-10 odd" id="menu-item-1705">
        <a href="//www.technogym.com/gb/products/shopby/product_type-benches_racks.html" class="">
            <span>Benches &amp; Racks</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Free-Weights menu-type-custom menu-position-11 even" id="menu-item-1706">
        <a href="//www.technogym.com/gb/products/shopby/product_type-free_weights.html" class="">
            <span>Free Weights</span>
        </a>
        </li></td></tr><tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Functional-training-equipment menu-type-custom menu-position-12 odd" id="menu-item-1707">
        <a href="//www.technogym.com/gb/products/shopby/product_type-functional_training_equipment.html" class="TG033_tooLong">
            <span>Functional Training Equipment</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_wellness_tools menu-type-custom menu-position-13 even" id="menu-item-1708">
        <a href="//www.technogym.com/gb/products/shopby/product_type-accessories.html" class="">
            <span>Accessories</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Stretching menu-type-custom menu-position-14 odd last" id="menu-item-1709">
        <a href="//www.technogym.com/gb/products/shopby/product_type-stretching.html" class="">
            <span>Stretching</span>
        </a>
        </li></td></tr>
    </tbody>
`;

const it = `
    <tbody>
        <tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Treadmills  menu-type-custom menu-position-0 odd first" id="menu-item-1509">
        <a href="//www.technogym.com/it/products/shopby/product_type-tapis_roulant.html" class="">
            <span>Tapis roulant</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Exercise-bikes menu-type-custom menu-position-1 even" id="menu-item-1511">
        <a href="//www.technogym.com/it/products/shopby/product_type-bike.html" class="">
            <span>Bike</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Elliptical-Cross-Trainers menu-type-custom menu-position-2 odd" id="menu-item-1510">
        <a href="//www.technogym.com/it/products/shopby/product_type-cross_trainer_ellittici.html" class="">
            <span>Cross Trainer Ellittici</span>
        </a>
        </li></td></tr><tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Rowers menu-type-custom menu-position-3 even" id="menu-item-1622">
        <a href="//www.technogym.com/it/products/shopby/product_type-rowers.html" class="">
            <span>Rowers</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Stair-Climbers menu-type-custom menu-position-4 odd" id="menu-item-1512">
        <a href="//www.technogym.com/it/products/shopby/product_type-stair_climbers.html" class="">
            <span>Stair Climber</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Upper-Body-trainers menu-type-custom menu-position-5 even" id="menu-item-1541">
        <a href="//www.technogym.com/it/products/shopby/product_type-attrezzi_per_la_parte_superiore.html" class="TG033_tooLong">
            <span>Attrezzi per la Parte Superiore</span>
        </a>
        </li></td></tr><tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Group-Cycling menu-type-custom menu-position-6 odd" id="menu-item-1540">
        <a href="//www.technogym.com/it/products/shopby/product_type-group_cycling.html" class="">
            <span>Group Cycling</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Selectorised menu-type-custom menu-position-7 even" id="menu-item-1517">
        <a href="//www.technogym.com/it/products/shopby/product_type-attrezzi_isotonici.html" class="">
            <span>Attrezzi Isotonici</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Plate-Loaded menu-type-custom menu-position-8 odd" id="menu-item-1516">
        <a href="//www.technogym.com/it/products/shopby/product_type-attrezzi_a_carico_libero.html" class="TG033_tooLong">
            <span>Attrezzi a Carico Libero</span>
        </a>
        </li></td></tr><tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Multigyms-and-cable-stations menu-type-custom menu-position-9 even" id="menu-item-1542">
        <a href="//www.technogym.com/it/products/shopby/product_type-multigym_e_cable_stations.html" class="TG033_tooLong">
            <span>Multigym e Cable Stations</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Benches-n-Racks menu-type-custom menu-position-10 odd" id="menu-item-1513">
        <a href="//www.technogym.com/it/products/shopby/product_type-panche_e_rastrelliere.html" class="">
            <span>Panche e Rastrelliere</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Free-Weights menu-type-custom menu-position-11 even" id="menu-item-1623">
        <a href="//www.technogym.com/it/products/shopby/product_type-pesi_liberi.html" class="">
            <span>Pesi Liberi</span>
        </a>
        </li></td></tr><tr class="TG033_productCategoryRow"><td class="TG033_productCategoryItem" <="" td=""><li class="menu-item level-2 icon-Shape_Functional-training-equipment menu-type-custom menu-position-12 odd" id="menu-item-1515">
        <a href="//www.technogym.com/it/products/shopby/product_type-attrezzi_per_l_allenamento_funzionale.html" class="TG033_tooLong">
            <span>Attrezzi per l'Allenamento Funzionale</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_wellness_tools menu-type-custom menu-position-13 even" id="menu-item-1514">
        <a href="//www.technogym.com/it/products/shopby/product_type-accessori.html" class="">
            <span>Accessori</span>
        </a>
        </li></td><td class="TG033_productCategoryItem"><li class="menu-item level-2 icon-Shape_Stretching menu-type-custom menu-position-14 odd last" id="menu-item-1624">
        <a href="//www.technogym.com/it/products/shopby/product_type-stretching.html" class="">
            <span>Stretching</span>
        </a>
        </li></td></tr>
    </tbody>
`;

export {gb, it};
