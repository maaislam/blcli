import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import tp036002 from './lib/tp036-tp002';
/* eslint-disable */
/**
 * PDP Tests
 *
 * TP002 runs before TP036
 */
window._TP072 = (function () {
    // ----------------------------------------------------------------
    // Entry point for app
    // ----------------------------------------------------------------
    const run = () => {
        const $ = window.jQuery;

        $('body').addClass('tp072d');
        const textTarget = $.trim($('#ProductDetail .span-14 .tpInfoWrapper .tpProductItem > span').text());
        const arraySku = [226020, 
          226012, 
          226025, 
          957064, 
          957189, 
          957135, 
          957005, 
          957149, 
          957146, 
          963235, 
          963190, 
          963221, 
          187269, 
          226515, 
          226560, 
          226533, 
          810459, 
          810455, 
          810460, 
          216772, 
          216777, 
          957252, 
          628521, 
          628515, 
          963990, 
          187323, 
          187278, 
          766607, 
          894780, 
          766604, 
          766605, 
          964902, 
          961993, 
          767922, 
          961986, 
          767916, 
          961985, 
          961990, 
          188011, 
          961994, 
          962579, 
          962908, 
          961995, 
          562496, 
          945995, 
          228496, 
          228503, 
          228508, 
          228533, 
          228494, 
          228510, 
          568537, 
          816346, 
          943426, 
          816347, 
          568536, 
          816344, 
          943427, 
          816345, 
          228495, 
          228522, 
          228516, 
          228492, 
          228498, 
          228506, 
          906543, 
          240383, 
          822589, 
          628520, 
          957296, 
          628519, 
          822586, 
          628517, 
          347937, 
          786513, 
          816368, 
          767784, 
          767782, 
          767783, 
          767755, 
          767753, 
          767756, 
          767757, 
          129527, 
          129523, 
          129521, 
          129520, 
          628524, 
          240384, 
          628510, 
          240372, 
          240370, 
          240369, 
          118521, 
          118507, 
          118505, 
          118504, 
          493467, 
          493468, 
          493469, 
          142749, 
          864995, 
          303297, 
          303295, 
          303293, 
          303292, 
          216817, 
          303290, 
          303289, 
          303288, 
          216806, 
          216822, 
          216819, 
          216818, 
          216825, 
          303285, 
          303284, 
          216811, 
          700711, 
          767781, 
          767780, 
          767779, 
          174315, 
          174313, 
          568532, 
          568531, 
          568530, 
          174311, 
          810435, 
          810434, 
          810433, 
          174314, 
          767778, 
          767777, 
          767776, 
          961302, 
          767907, 
          558313, 
          805262, 
          558336, 
          559016, 
          558339, 
          559017, 
          559019, 
          529064, 
          529066, 
          529063, 
          809542, 
          558322, 
          966996, 
          842081, 
          984511, 
          842077, 
          842078, 
          842079, 
          816356, 
          816354, 
          816355, 
          808935, 
          558311, 
          558303, 
          558302, 
          558297, 
          558295, 
          809541, 
          984513, 
          752961, 
          809539, 
          752960, 
          808934, 
          984551, 
          842080, 
          809540, 
          743008, 
          769541, 
          743017, 
          228871, 
          228899, 
          228928, 
          767787, 
          568581, 
          106072, 
          688295, 
          794295, 
          841616, 
          794294, 
          841595, 
          794296, 
          118523, 
          700730, 
          819000, 
          819003, 
          118522, 
          700729, 
          818998, 
          819001, 
          509694, 
          509693, 
          509691, 
          797688, 
          797691, 
          797687, 
          797690, 
          797689, 
          559043, 
          559038, 
          559036, 
          559035, 
          229547, 
          229525, 
          229522, 
          229550, 
          229539, 
          229524, 
          303283, 
          754220, 
          559014, 
          559015, 
          568539, 
          568538, 
          984531, 
          819014, 
          838014, 
          752941, 
          554023, 
          819011, 
          805198, 
          819007, 
          554022, 
          299258, 
          303302, 
          303300, 
          303301, 
          303299, 
          819012, 
          752939, 
          838013, 
          819009, 
          805196, 
          819005, 
          554018, 
          363948, 
          946150, 
          169846, 
          946100, 
          946065, 
          946186, 
          557939, 
          946074, 
          129534, 
          129535, 
          240391, 
          822597, 
          628529, 
          240389, 
          628527, 
          628528, 
          288624, 
          870833, 
          870834, 
          870832, 
          763100, 
          957170, 
          957171, 
          957172, 
          957181, 
          763112, 
          957184, 
          763116, 
          957190, 
          957191, 
          957192, 
          957168, 
          957185, 
          763117, 
          957202, 
          763160, 
          169959, 
          364028, 
          169958, 
          763093, 
          957193, 
          957208, 
          957180, 
          957188, 
          742163, 
          936233, 
          936234, 
          742165, 
          936229, 
          936232, 
          558551, 
          169966, 
          169965, 
          169956, 
          562476, 
          169954, 
          226562, 
          226532, 
          226596, 
          957164, 
          957165, 
          957166, 
          957174, 
          957204, 
          957205, 
          763136, 
          957194, 
          946235, 
          932674, 
          652707, 
          957162, 
          957179, 
          226525, 
          226529, 
          766598, 
          182583, 
          766600, 
          766599, 
          766603, 
          226538, 
          226539, 
          936226, 
          559041, 
          559056, 
          559053, 
          559050, 
          559042, 
          559049, 
          559048, 
          559045, 
          559044, 
          559037, 
          559052, 
          226579, 
          226484, 
          226568, 
          226528, 
          226546, 
          752083, 
          557986, 
          751997, 
          946187, 
          169800, 
          946078, 
          557976, 
          957736, 
          558012, 
          169814, 
          752038, 
          957569, 
          946071, 
          752087, 
          169806, 
          169801, 
          363936, 
          946192, 
          946151, 
          557969, 
          557981, 
          957620, 
          946172, 
          169909, 
          226517, 
          226500, 
          226570, 
          226486, 
          226573, 
          952457, 
          952507, 
          952422, 
          532970, 
          338899, 
          338901, 
          952248, 
          952253, 
          952295, 
          952211, 
          561498, 
          173361, 
          561492, 
          150244, 
          343945, 
          538833, 
          538834, 
          538823, 
          538831, 
          538798, 
          538825, 
          952588, 
          952659, 
          952745, 
          952584, 
          950180, 
          950181, 
          175189, 
          175194, 
          926663, 
          561490, 
          538396, 
          538387, 
          538048, 
          561485, 
          951913, 
          955917, 
          952889, 
          952891, 
          952918, 
          952879, 
          538181, 
          149843, 
          561494, 
          755564, 
          755557, 
          752382, 
          752384, 
          946358, 
          170087, 
          946399, 
          170125, 
          752438, 
          946518, 
          946382, 
          752321, 
          946418, 
          170145, 
          364466, 
          926765, 
          952077, 
          956003, 
          538132, 
          538178, 
          537948, 
          225943, 
          226058, 
          742147, 
          742148, 
          742150, 
          742151, 
          742152, 
          742153, 
          742156, 
          159950, 
          742157, 
          226007, 
          225855, 
          225871, 
          225651, 
          225714, 
          924471, 
          700731, 
          531297, 
          531298, 
          531299, 
          531302, 
          531260, 
          531253, 
          531254, 
          531255, 
          531256, 
          531257, 
          531258, 
          531259, 
          531266, 
          957352, 
          957360, 
          957397, 
          957410, 
          838118, 
          216828, 
          216827, 
          957258, 
          957257, 
          763189, 
          957254, 
          169653, 
          363724, 
          363740, 
          363725, 
          628536, 
          960831, 
          568571, 
          568575, 
          303330, 
          956794, 
          956799, 
          956809, 
          899699, 
          786529, 
          786526, 
          786525, 
          786530, 
          879332, 
          303310, 
          850337, 
          806564, 
          818175, 
          818174, 
          816353, 
          806563, 
          786523, 
          786527, 
          786532, 
          303311, 
          786531, 
          767797, 
          767798, 
          767796, 
          786522, 
          786521, 
          786520, 
          786519, 
          786518, 
          786517, 
          863845, 
          863892, 
          850378, 
          129505, 
          129504, 
          129502, 
          115482, 
          129507, 
          309551, 
          697690, 
          628541, 
          240402, 
          822608, 
          628539, 
          240401, 
          822607, 
          628538, 
          240400, 
          628540, 
          750331, 
          944400, 
          309549, 
          309550, 
          115481, 
          697689, 
          558247, 
          558252, 
          168123, 
          863837, 
          850377, 
          558244, 
          400523, 
          400524, 
          400555, 
          943428, 
          943429, 
          879307, 
          816375, 
          400418, 
          400350, 
          400347, 
          558290, 
          697688, 
          558281, 
          558256, 
          529078, 
          400522, 
          400487, 
          400479, 
          558251, 
          303326, 
          303329, 
          303323, 
          303325, 
          303328, 
          303324, 
          303327, 
          303322, 
          303321, 
          129514, 
          129512, 
          967007, 
          967006, 
          813177, 
          879394, 
          924110, 
          753025, 
          809369, 
          924123, 
          753029, 
          924126, 
          753026, 
          800515, 
          753031, 
          843575, 
          873803, 
          694639, 
          694637, 
          694636, 
          694635, 
          694633, 
          694632, 
          694630, 
          694625, 
          694623, 
          694626, 
          694665, 
          694667, 
          694669, 
          694663, 
          694668, 
          694662, 
          879336, 
          879335, 
          805274, 
          694646, 
          694648, 
          694642, 
          694649, 
          694643, 
          694641, 
          694647, 
          694658, 
          694659, 
          694656, 
          694652, 
          694653, 
          694657, 
          694739, 
          694733, 
          694737, 
          694740, 
          694734, 
          694738, 
          694722, 
          694716, 
          694723, 
          694717, 
          694713, 
          694707, 
          694705, 
          694711, 
          694712, 
          694706, 
          694704, 
          694710, 
          694697, 
          694696, 
          694728, 
          694725, 
          694724, 
          694727, 
          694695, 
          694703, 
          694700, 
          879339, 
          879338, 
          838110, 
          805276, 
          694694, 
          694690, 
          694686, 
          694692, 
          694693, 
          694689, 
          694687, 
          694691, 
          694684, 
          694682, 
          694683, 
          838109, 
          838107, 
          694629, 
          838108, 
          873798, 
          303317, 
          303318, 
          303316, 
          303320, 
          303319, 
          303315, 
          647823, 
          647816, 
          228910, 
          679086, 
          166383, 
          348019, 
          537764, 
          348021, 
          348020, 
          536363, 
          536359, 
          536362, 
          536361, 
          681845, 
          553472, 
          838045, 
          957240, 
          957233, 
          957235, 
          957237, 
          344321, 
          956314, 
          354015, 
          562474, 
          926528, 
          538391, 
          957242, 
          956736, 
          956738, 
          956675, 
          303333, 
          303340, 
          303334, 
          303331, 
          303337, 
          303338, 
          303332, 
          765927, 
          568576, 
          562486, 
          558361, 
          558418, 
          558446, 
          558507, 
          984539, 
          558343, 
          509695, 
          984549, 
          303352, 
          303353, 
          303356, 
          303357, 
          303358, 
          786537, 
          786536, 
          347942, 
          568567, 
          816384, 
          816383, 
          816380, 
          816377, 
          786535, 
          786534, 
          786533, 
          894790, 
          118515, 
          700724, 
          118514, 
          568573, 
          568578, 
          568577, 
          786502, 
          786503, 
          786508, 
          786510, 
          786511, 
          786499, 
          786500, 
          786501, 
          786505, 
          786506, 
          786507, 
          129517, 
          558363, 
          751993, 
          363852, 
          751979, 
          363848, 
          509677, 
          509676, 
          509680, 
          984534, 
          956674, 
          562487, 
          169771
          ];

        
        
        
        // Run PDP tests
        
        let trigger = false;
        arraySku.forEach((item) => {
          if(item == textTarget){
            trigger = true;
          }
        });

        UC.poller([
            function() {
                return $('body.page-productDetails').length;
            }
        ], function() {
            tp036002();
            if($.trim($('.prices_holder .product_price_section .price_value').text()) == $.trim($('.prices_holder .price_inc_vat_section .includedVAT').text())){
                $('.price_info_holder .price_inc_vat').text('(ex VAT)');
            }
             if(textTarget == '182005' 
             || textTarget == '181004'
             || textTarget == '815899'
             || textTarget == '180027'
             || textTarget == '795297'
             || textTarget == '795299'
             || textTarget == '795296'
             || textTarget == '806973'
             || textTarget == '806971'
             || textTarget == '815897'
             || textTarget == '815891'
             || textTarget == '815867'
             || textTarget == '819442'
             || textTarget == '819440'
             || textTarget == '158003'
             || textTarget == '158008'
             || textTarget == '158004'
             || textTarget == '158005'
             || textTarget == '158007'
             || textTarget == '815896'
             || textTarget == '151206'
             || textTarget == '151305'
             || textTarget == '151308'
             || textTarget == '151204'
             || textTarget == '151104'
             || textTarget == '151103'
             || textTarget == '151102'
             || textTarget == '819516'
             || textTarget == '815888'
             || textTarget == '815887'
             || textTarget == '850382'
             || textTarget == '107053'
             ){
                $('body').addClass('TP072d_measure-fix');
            } else if (trigger === true) {
              $('body').addClass('TP072d_pack-fix');
            }
        });
    };
    
    // ----------------------------------------------------------------
    // Triggers
    // ----------------------------------------------------------------
    const _triggers = (options) => {
        utils.fullStory('TP072', 'Variation 1');

        UC.poller([
            () => {
                return window.jQuery
            },
            () => {
                return window.ga
            }
        ], run);
    };

    // Run experiment
    _triggers();

    return {
    };

})();
