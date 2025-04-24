// Images to be used instead of smaller ones used in basket
var hardcodedImages = {
    "MYRUN": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/m/y/myrun_related_25.jpg"
    },
    "SKILLMILL™ CONNECT": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/k/skillmill_connect__related.jpg"
    },
    "UNICA": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/unica_related.jpg"
    },
    "RUN PERSONAL": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/D/9/D947EVF_run_personal_related_01.jpg"
    },
    "RECLINE PERSONAL": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/D/9/D9673VF_recline_personal_related_01_2.jpg"
    },
    "CROSS PERSONAL": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/D/9/D9573VF_cross_personal_related_01_2.jpg"
    },
    "SPAZIO FORMA": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/p/spazio_forma_related_1.jpg"
    },
    "JOG FORMA": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/j/o/jog_forma_related_3.jpg"
    },
    "SYNCHRO FORMA": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/y/synchro_forma_related_1.jpg"
    },
    "RECLINE FORMA": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/e/recline_forma_related_2.jpg"
    },
    "BIKE FORMA": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/b/i/bike_forma_related_1.jpg"
    },
    "Excite® Climb UNITY™": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_climb_unity_related_2.jpg"
    },
    "WELLNESS BALL ACTIVE SITTING 55 cm": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/w/e/wellness_ball_active_sitting_related_5_3.jpg"
    },
    "GROUP CYCLE™ CONNECT": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/g/r/group_cycle_connect_related_2.jpg"
    },
    "MYCYCLING": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/m/y/mycycling_related_1_2.jpg"
    },
    "GROUP CYCLE™ RIDE": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/g/r/group_cycle_ride_related_2.jpg"
    },
    "Kinesis PERSONAL VISION": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/D/MD052_kinesis_personal_vision_related_1.jpg"
    },
    "Kinesis PERSONAL HERITAGE LEATHER": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/D/MD053_kinesis_personal_leather_related_1.jpg"
    },
    "Kinesis PERSONAL HERITAGE BLACK": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/D/MD051_kinesispersonal_personal_related_01_2.jpg"
    },
    "ARTIS® - CLIMB": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_climb_artis_related.jpg"
    },
    "ARTIS® RUN": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/u/run_artis_related_9.jpg"
    },
    "ARTIS® - VARIO": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/v/a/vario_artis_related_9.jpg"
    },
    "EXCITE TOP MED": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/t/o/top_excite_medical_related_1.jpg"
    },
    "PURE STRENGTH – STANDING LEG CURL ": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG7000_purestrength_standinglegcurl_related_01_1.jpg"
    },
    "PURE STRENGTH – LEG EXTENSION": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG6500_purestrength_legextension_related_01_1.jpg"
    },
    "PURE STRENGTH - REAR KICK": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG4000_purestrength_rearkick_related_01_20.jpg"
    },
    "PURE STRENGTH - LEG PRESS": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG5000_legpress_purestrenght_related_01_9.jpg"
    },
    "PURE STRENGTH - CHEST PRESS": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG0500_purestrength_widechestpress_related_01_18.jpg"
    },
    "PURE STRENGTH - INCLINE CHEST PRESS": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG1500_purestrength_inclinechestpress_related_01_22.jpg"
    },
    "PURE STRENGTH - ADJUSTABLE BENCH": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG04_purestrength_adjustablebench_related_01_6.jpg"
    },
    "PURE STRENGTH - SCOTT BENCH": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG06_purestrength_scottbench_related_01_4.jpg"
    },
    "PURE STRENGTH – BICEPS": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG6000_purestrength_biceps_related_01_1.jpg"
    },
    "PURE STRENGTH - FLAT BENCH": {
        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG14_purestrength_flatbench_related_01_2.jpg"
    },
    "PURE STRENGTH - LOWER BACK BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG05_purestrength_lowerbackbench_related_01_5.jpg"
    },
    "PURE STRENGTH - ADJUSTABLE DECLINE/AB CRUNCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG03_purestrength_adjustabledeclineabcrunch_related_01_5.jpg"
    },
    "PURE STRENGTH - CALF": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG4500_purestrength_calf_related_01_22.jpg"
    },
    "PURE STRENGTH - PULLDOWN": {

        "img": "https://www.technogym.com/skin/frontend/technogym/default/images/loading.gif"
    },
    "PURE STRENGTH - ROW": {

        "img": "https://www.technogym.com/skin/frontend/technogym/default/images/loading.gif"
    },
    "PURE STRENGTH - OLYMPIC INCLINE BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG01_purestrength_olympicinclinebench_related_01_5.jpg"
    },
    "OLYMPIC POWER RACK": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/o/l/olympic_power_rack_pure_benches_related.jpg"
    },
    "PURE STRENGTH - OLYMPIC HALF RACK": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG10_purestrength_olympichalfrack_related_01_3.jpg"
    },
    "PURE STRENGTH - OLYMPIC DECLINE BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG23_purestrength_olympicdeclinebench_related_01_5.jpg"
    },
    "PURE STRENGTH - WIDE CHEST PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG1000_purestrength_widechestpress_related_01_19.jpg"
    },
    "PURE STRENGTH - SHOULDER PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG3500_purestrength_shoulderpress_related_01_26.jpg"
    },
    "PURE STRENGTH - OLYMPIC MILITARY BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG08_purestrength_olympicmilitarybench_related_01_4.jpg"
    },
    "PURE STRENGTH - LOW ROW": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG2500_purestrength_lowrow_related_01_18.jpg"
    },
    "PURE STRENGTH - OLYMPIC FLAT BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/G/PG07_purestrength_olympicflatbench_related_01_4.jpg"
    },
    "SELECTION - LEG PRESS MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C994_legpressmed_selectionmed_related_01.jpg"
    },
    "SELECTION - LEG EXTENSION MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C996_legextension_selectionmed_related_01_2.jpg"
    },
    "SELECTION - LEG CURL MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C995_legcurlmed_selectionmed_related_01.jpg"
    },
    "SKILLMILL™ CONSOLE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/o/console_related_1.jpg"
    },
    "ARKE™": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/A/0/A0000598_arkesetholderwall_accessories_related_01_1.jpg"
    },
    "LEG RAISE DIP": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/e/leg_raise_benches_related_1.jpg"
    },
    "ARKE™ - FOAM MAT": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/o/foam_mat_related_1.jpg"
    },
    "ARKE™ - FOAM ROLLER": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/o/foam_roller_related_1.jpg"
    },
    "SELECTION PRO - VERTICAL TRACTION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_vertical_traction_related_2.jpg"
    },
    "Kinesis® - CORE STATION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH65E_core_kinesisstations_related_01_1.jpg"
    },
    "Kinesis®  - STEP-SQUAT STATION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH67E_stepsquat_kinesisstations_related_01_1.jpg"
    },
    "Kinesis® - PRESS STATION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH20E_press_kinesisstations_related_01.jpg"
    },
    "Kinesis® - LOW PULL STATION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH95E_lowpull_kinesisstations_related_01.jpg"
    },
    "Kinesis® - OVERHEAD PRESS STATION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH15E_overheadpress_kinesisstations_related_01.jpg"
    },
    "Kinesis® - HIGH PULL STATION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/H/MH30E_highpull_kinesisstations_related_01.jpg"
    },
    "OLYMPIC POWER BAR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/o/l/olympic_power_bar_related_1.jpg"
    },
    "OLYMPIC TRAINING PLATES SET": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/l/plates_kit_related_2.jpg"
    },
    "SELECTION PRO - LOW ROW": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_low_row_related_1_1.jpg"
    },
    "SELECTION PRO - TOTAL ABDOMINAL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_total_abdominal_related_2.jpg"
    },
    "SELECTION PRO - PRONE LEG CURL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_prone_leg_curl_related_2.jpg"
    },
    "SELECTION PRO - REVERSE FLY": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_reverse_fly_related_2.jpg"
    },
    "ELEMENT+ CRUNCH BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA03_crunchbench_element_related_01_7.jpg"
    },
    "CHROMED DUMBBELLS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/K/A/KA01_related_01_2.jpg"
    },
    "CHROMED DUMBBELL RACK": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/h/chromed_dumbbell_rack_related_1.jpg"
    },
    "UNIVERSAL STORAGE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/universal_storage_related_1.jpg"
    },
    "DUMBBELL RACK": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/d/u/dumbbell_rack_related.jpg"
    },
    "PLURIMA MULTISTATION - WALL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/F/MF30_wall_plurimamultistation_related_01_1.jpg"
    },
    "ELEMENT+ LOWER BACK BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA05_lowerbackbench_element_related_01_1.jpg"
    },
    "SELECTION – UPPER BACK MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C946_upperbackmed_selectionmed_related_01.jpg"
    },
    "SELECTION – LAT MACHINE MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C912_latmachinemed_selectionmed_related_01.jpg"
    },
    "SELECTION - ABDUCTOR MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C918_abductormed_selectionmed_related_01.jpg"
    },
    "SELECTION – LOW ROW MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C980_lowrowmed_selectionmed_related_01.jpg"
    },
    "ELEMENT+ LEG EXTENSION INCLUSIVE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB30_legextensioninclusive_elementinclusive_related_01.jpg"
    },
    "ELEMENT+ LEG CURL INCLUSIVE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB35_legcurlinclusive_elementinclusive_related_01.jpg"
    },
    "SELECTION - MULTI HIP MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C967_multihipmed_selectionmed_related_01.jpg"
    },
    "SELECTION - ROTARY TORSO MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C950_rotarytorsomed_selectionmed_related_01.jpg"
    },
    "SELECTION - ADDUCTOR MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C917_adductormed_selectionmed_related_01.jpg"
    },
    "ELEMENT+ ABDOMINAL CRUNCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB65_abdominalcrunch_element_related_01.jpg"
    },
    "ELEMENT+ VERTICAL TRACTION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB25_verticaltraction_element_related_01.jpg"
    },
    "SELECTION - LOWER BACK MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C958_lowerbackmed_selectionmed_related_01.jpg"
    },
    "SELECTION – ABDOMINAL CRUNCH MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C957_abdominalcrunchmed_selectionmed_related_01.jpg"
    },
    "SELECTION – SHOULDER PRESS MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C969_shoulderpressmed_selectionmed_related_01.jpg"
    },
    "SELECTION - CHEST PRESS MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C970_chestpressmed_selectionmed_related_01.jpg"
    },
    "EXCITE® STEP": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_step_related_2.jpg"
    },
    "ELEMENT+ GLUTE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB75_glute_element_related_01.jpg"
    },
    "ELEMENT+ LOWER BACK": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB45_lowerback_element_related_01_2.jpg"
    },
    "ELEMENT+ VERTICAL BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA02_verticalbench_element_related_01_1.jpg"
    },
    "PLURIMA MULTISTATION - SOLO": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/F/MF20_solo_plurimamultistation_related_01_1.jpg"
    },
    "PLURIMA MULTISTATION - TOWER": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/l/plurimatower_related.jpg"
    },
    "ELEMENT+ SCOTT BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA06_scottbench_element_related_01_7.jpg"
    },
    "ELEMENT+ HORIZONTAL BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/h/o/horizontal_bench_related_1.jpg"
    },
    "ELEMENT+ ADJUSTABLE BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA04_adjustablebench_element_related_01_1.jpg"
    },
    "ELEMENT+ INCLINED BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA01_inclinedbench_element_related_01_2.jpg"
    },
    "ELEMENT+ AB CRUNCH BENCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/P/A/PA10_abcrunchbench_element_related_01_1.jpg"
    },
    "ELEMENT+ LOW ROW": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB95_lowrow_element_related_01.jpg"
    },
    "PLURIMA MULTISTATION - TWIN": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/F/MF65_pressoverheadcore_plurimamultistation_related_01_1.jpg"
    },
    "ELEMENT+ CHEST PRESS INCLUSIVE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB20_chestpressinclusive_elementinclusive_related_01.jpg"
    },
    "ELEMENT+ LEG PRESS INCLUSIVE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB50_legpress_element_related_01.jpg"
    },
    "ELEMENT+ LOW ROW INCLUSIVE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB95_lowrowinclusive_elementinclusive_related_01.jpg"
    },
    "ELEMENT+ SHOULDER PRESS INCLUSIVE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/B/CB15_shoulderpressinclusive_elementinclusive_related_01.jpg"
    },
    "FLEXABILITY™ ANTERIOR - WOOD VERSION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/E/ME15_flexability-woodant_antrancite-black_related_1.jpg"
    },
    "PLURIMA MULTISTATION - TWIN WITH LEG PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/F/MF70_wallwithlegpress_plurimamultistation_related_01_1.jpg"
    },
    "FLEXABILITY™ POSTERIOR - WOOD VERSION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/E/ME20_flexability-woodpost_antrancite-black_related_1.jpg"
    },
    "WELLNESS BAG": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/w/e/wellnessbag_wellnesstools_related_1_1.jpg"
    },
    "SELECTION PRO - ARM CURL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_arm_curl_related_1_1.jpg"
    },
    "BENCH PERSONAL ": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_bench_related_1.jpg"
    },
    "RACK PERSONAL ": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_rack_related_1.jpg"
    },
    "POWER PERSONAL EXCELLENCE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_kit_excellence_related_1.jpg"
    },
    "POWER PERSONAL SUPERIOR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_kit_superior_related_1.jpg"
    },
    "SELECTION PRO - DELTS MACHINE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_delts_machine_related_1_1.jpg"
    },
    "SELECTION PRO - LEG EXTENSION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_leg_extension_related_1_1.jpg"
    },
    "Excite® Climb LED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_climb_advanced_led_related_2.jpg"
    },
    "Excite® Climb TV": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_climb_tv_related_3.jpg"
    },
    "WELLNESS WEIGHTS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/w/e/wellness_weights_related_2.jpg"
    },
    "FREE WEIGHTS - KETTLEBELLS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/v/i/vinyl_coated_kettlebell_related_1.jpg"
    },
    "Kinesis® - ONE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/5/M5800_kinesisone_kinesis_related_01_1.jpg"
    },
    "WELLNESS BALL™ TRAINING": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/i/fitness_ball_related_2.jpg"
    },
    "POWER PERSONAL ESSENTIAL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/o/power_personal_kit_essential_related_1.jpg"
    },
    "Kinesis Class": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/k/i/kinesis_class_related.jpg"
    },
    "WELLNESS PAD": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/A/0/A0000163AA_wellnesspad_wellnesstools_related_01_3_1.jpg"
    },
    "WELLNESS RACK": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/A/0/A0000125AA_wellnessrack_wellnesstools_related_01_1.jpg"
    },
    "SELECTION PRO - LEG CURL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_leg_curl_related_1_1.jpg"
    },
    "ELEMENT+ LEG EXTENSION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB30_legextension_element_related_01.jpg"
    },
    "FREE WEIGHTS - URETHANE DUMBBELLS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/d/u/dumbbellsracks_freeweights_related_01.jpg"
    },
    "SELECTION - VERTICAL TRACTION MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/C/9/C971_verticaltractionmed_selectionmed_related_01.jpg"
    },
    "SELECTION PRO - ADDUCTOR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_adductor_related_1_1.jpg"
    },
    "SELECTION PRO - PULLEY": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_pulley_related_1_1.jpg"
    },
    "SELECTION PRO - PULLDOWN": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_pulldown_related_2.jpg"
    },
    "SELECTION PRO - UPPER BACK": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_upper_back_related_1_1.jpg"
    },
    "SELECTION PRO - ARM EXTENSION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_arm_extention_related_1.jpg"
    },
    "SELECTION PRO - ABDUCTOR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_abductor_related_1_1.jpg"
    },
    "SELECTION PRO - PECTORAL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_pectoral_related_2.jpg"
    },
    "EXCITE VARIO MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/v/a/vario_excite_medical_related_1.jpg"
    },
    "SELECTION PRO - LAT MACHINE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_lat_machine_related_2.jpg"
    },
    "SELECTION PRO - MULTIPOWER": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_multipower_related_2.jpg"
    },
    "EXCITE® RUN 1000": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_run_1000_related_2.jpg"
    },
    "EXCITE® VARIO": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_vario_related_2.jpg"
    },
    "EXCITE® RUN 600": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_run_600_related_2.jpg"
    },
    "EXCITE RUN 600 MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/t/r/treadmill_excite_600_medical_related_1.jpg"
    },
    "SELECTION PRO - ROTARY TORSO": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_rotary_torso_related_2.jpg"
    },
    "EXCITE RECLINE MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/e/recline_excite_medical_related_1.jpg"
    },
    "ELEMENT+ ADDUCTOR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/d/adductor_element_related_01.jpg"
    },
    "EXCITE BIKE MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/b/i/bike_excite_medical_related_1.jpg"
    },
    "SELECTION PRO - LOWER BACK": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_lower_back_related_1_1.jpg"
    },
    "SELECTION PRO - ABDOMINAL CRUNCH": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_abdominal_crunch_related_2.jpg"
    },
    "SELECTION PRO - LEG PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_leg_press_related_1_1.jpg"
    },
    "SELECTION PRO - MULTI HIP": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_multi_hip_related_1_1.jpg"
    },
    "ARTIS® - LOW ROW": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/o/lowrow_artis_related_9.jpg"
    },
    "ARTIS® - TOTAL ABDOMINAL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/t/o/totalabdominal_artis_related_9.jpg"
    },
    "ARTIS® - LEG CURL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/e/leg_curl_artis_related_9.jpg"
    },
    "ARTIS® - LEG EXTENSION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/e/leg_ext_artis_related_9.jpg"
    },
    "ARTIS® - VERTICAL TRACTION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/v/e/vertical_artis_related_9.jpg"
    },
    "ARTIS® - CHEST PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/h/chest_artis_related_9.jpg"
    },
    "ARTIS® - LEG PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/e/legpress_artis_related_9.jpg"
    },
    "ARTIS® - LOWER BACK": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/o/lowerback_artis_related_9.jpg"
    },
    "ARTIS® - MULTI HIP": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/m/u/multihip_artis_related_9.jpg"
    },
    "ARTIS® - SHOULDER PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/h/shoulder_artis_related_9.jpg"
    },
    "ARTIS® - ARM CURL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/r/arm_curl_artis_related_9.jpg"
    },
    "EXCITE® SYNCHRO": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_synchro_related_2.jpg"
    },
    "UNITY™ SELF - GROUP CYCLE APP": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/unity-self-intero-gc-ok2_hero_ok.jpg"
    },
    "PURE STRENGTH – LINEAR LEG PRESS ": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG7500_purestrength_linearlegpress_related_01_1.jpg"
    },
    "EXCITE® RECLINE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_recline_related_2.jpg"
    },
    "EXCITE® TOP": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_top_related_2.jpg"
    },
    "EXCITE® BIKE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/e/x/excite_bike_related_2.jpg"
    },
    "ARTIS® - ROTARY TORSO": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/o/rotary_artis_related_9.jpg"
    },
    "ARTIS® - REAR DELT ROW": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/e/reardeltrow_artis_related_9.jpg"
    },
    "ARTIS® - SQUAT": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/q/squat_artis_related_9.jpg"
    },
    "ARTIS® - ADDUCTOR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/d/adductor_artis_related_1.jpg"
    },
    "ARTIS® - ABDUCTOR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/b/abductor_artis_related_9.jpg"
    },
    "ARTIS® - ARM EXTENSION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/r/arm_ext_artis_related_9.jpg"
    },
    "ARTIS® - PECTORAL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/p/e/pectoral_artis_related_9.jpg"
    },
    "ARTIS® LAT MACHINE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/l/a/latmachine_artis_related_9.jpg"
    },
    "ELEMENT+ ABDUCTOR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/a/b/abductor_element_related_01_1.jpg"
    },
    "ELEMENT+ PECTORAL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB70_pectoral_element_related_01.jpg"
    },
    "CABLE STATIONS - DUAL ADJUSTABLE PULLEY": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB430_dualadjustablepulley_cablestation_related_01_3.jpg"
    },
    "ELEMENT+ LEG PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB50_legpress_element_related_01.jpg"
    },
    "ELEMENT+ ARM CURL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB55_armcurl_element_related_01.jpg"
    },
    "ELEMENT+ LEG CURL": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB35_legcurl_element_related_01.jpg"
    },
    "ELEMENT+ SHOULDER PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB15_shoulderpress_element_related_01.jpg"
    },
    "ELEMENT+ CHEST PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB20_chestpress_element_related_01.jpg"
    },
    "ELEMENT+ ARM EXTENSION": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB60_armextension_element_related_01.jpg"
    },
    "CABLE STATIONS – ERCOLINA  ": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB80_ercolina_element_related_01_3.jpg"
    },
    "CABLE STATIONS - ERCOLINA REHAB": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB90_ercolinarehab_element_related_01.jpg"
    },
    "PURE STRENGTH – SEATED DIP": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/G/MG5500_purestrength_seateddip_related_01_1.jpg"
    },
    "ELEMENT+ LAT MACHINE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB40_latmachine_element_related_01.jpg"
    },
    "ELEMENT+ MULTIPOWER": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/B/MB83_multipower_element_related_01_2.jpg"
    },
    "SELECTION PRO - CHEST PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_chest_press_related_2.jpg"
    },
    "SELECTION PRO - SHOULDER PRESS": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/e/selection_pro_shoulder_press_related_2.jpg"
    },
    "EXCITE SYNCHRO MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/y/synchro_excite_medical_related_1.jpg"
    },
    "SKILLMILL™ GO": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/g/o/go_related_1.jpg"
    },
    "FLEXABILITY™ POSTERIOR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/l/flexability_posterior_black_related.jpg"
    },
    "EXCITE RUN 1000 MED": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/t/r/treadmill_excite_1000_medical_related_1.jpg"
    },
    "FLEXABILITY™ ANTERIOR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/f/l/flexability_anterior_black_related.jpg"
    },
    "ARTIS® - RECLINE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/r/e/recline_artis_related_9.jpg"
    },
    "ARTIS® - SYNCHRO": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/y/synchro_artis_related_9.jpg"
    },
    "OMNIA™ - OMNIA⁸": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/J/MJ05E_omnia8_omnia_related_1.jpg"
    },
    "OMNIA™ - OMNIA³ STRAIGHT PULL UP BAR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/J/MJ15E_artis_omnia_an.440_related_1.jpg"
    },
    "OMNIA™ - OMNIA³ DUAL LIFT BAR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/J/MJ20E_artis_omnia_an.442_related_1.jpg"
    },
    "OMNIA™ - OMNIA³ MULTIANGLE PULL UP BAR": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/M/J/MJ10E_omnia3_omnia_multiang_related_1.jpg"
    },
    "UNITY™ SELF - SKILLMILL™ APP": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/unity_related_ok.jpg"
    },
    "SKILLROW™": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/k/skillrow_related_8.jpg"
    },
    "SKILLROW": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/s/k/skillrow_related_8.jpg"
    },
    "SKILLROW™ Professional App": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/u/n/unity_self_skillrow_related_1.jpg"
    },
    "ARTIS® - BIKE": {

        "img": "https://www.technogym.com/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/b/i/bike_artis_related_9.jpg"
    }
};

export default hardcodedImages;