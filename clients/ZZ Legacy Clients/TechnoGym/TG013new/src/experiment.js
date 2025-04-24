/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import { __, getLanguage } from './lib/helpers';

// ID - Experiment Title
const TG013 = (() => {

	// Experiment code
	const activate = () => {
        var $ = window.jQuery;

        var $body = $('body');
        console.log(getLanguage());
        if ($body.hasClass('TG013')) {
          return;
        }
        
        if (window.location.href.indexOf('/onestepcheckout/') > -1) {
          return;
        }
        
        // console.log('body is' + $body);
        $body.addClass('TG013');
        $body.addClass('TG013new');
      
      	utils.events.send('TG013', 'Page View', 'TG013 - Navigation Redesign (Desktop)');

        // Check min-width>= 1025
        var resizedRequiredWidth;
        if (window.matchMedia('(min-width: 1025px)').matches) {
            resizedRequiredWidth = true;
            wholeExperiment(true);
        } else {
            resizedRequiredWidth = false;
            $('#TG013_navbar-bottom').hide();
        }
        $(window).on('resize', function(){
            if (window.matchMedia('(min-width: 1025px)').matches && !resizedRequiredWidth) {
                resizedRequiredWidth = true;
                wholeExperiment(true);
            } else if (window.matchMedia('(max-width: 1024px)').matches) {
                $('#TG013_navbar-bottom').hide();
                $('#ct-menu-top_menu').show();
            } else {
                $('#TG013_navbar-bottom').show();
                $('#ct-menu-top_menu').hide();
            }
        });

        function wholeExperiment (runIt) {
            if (!runIt) {
                return;
            }

            // hide original navbar
            $('#ct-menu-top_menu').hide();

            // Initially do most work on (>1025px) (will try to work as if on desktop version (>=768px)) --------
            // --------------------------------------------------------------------------------------------------
            // Cache vars
            var $headerContainer = $('.header-container'); // this is the wrapper of the whole header -> everything in this test happens inside
            var $container = $headerContainer.children('.container'); // next level wrap
            var $headerRoleBanner = $container.children('header[role="banner"]'); // next level wrap
            // The navbar container (will extract all info. I need from here)
            var $navbarDefault = $headerRoleBanner.children('nav.navbar.navbar-default'); // their navbar container
            var $navbarHeader = $navbarDefault.find('.navbar-header'); // navbar header
            // top of navbar (contains brand search bar login, cart etc first line) -> Will be changed slightly but will structurally remain the same
            var $navbarTop = $navbarHeader.find('#navbar-top');
            // bottom of navbar (from which all the info needed will be extracted and used into the recreated navbar)
            var $navbarBottom = $navbarHeader.find('#navbar-bottom');
            var $navbarBottomInside = $navbarBottom.find('.inside:first'); // contains an 'ul' of 'li' elements (each of these 'li' els. are sections in the nav)

            // --------------------------------------------------------------------------------------------------
            // Insert the search form after the 'TechnoGym' logo ('TechnoGym' logo to the 'Cart' logo must form the first line on the page)
            // (for <1025px need to set its display to !important) (choose exact path)
            $navbarBottom.find('.tool-search').insertAfter($navbarTop.find('.logo.navbar-brand'));

            // --------------------------------------------------------------------------------------------------
            // ------------------------------------------IT------------------------------------------------------
            // --------------------------------------------------------------------------------------------------
            /* if (window.location.href.indexOf('technogym.com/it/') > -1) { */
                // Start creating the navbar
                /*
                var $myNavbarHTML = $([
                    '<div id="TG013_navbar-bottom">',
                    '<div class="TG013_inside">',
                    '<ul class="TG013_ul_navbar_Wrapper">',
                    '<li class="TG013_navbar_section TG013_products_section"><a class="TG013_section_noLinkTo" href="#"><span class="TG013_section_spanText">I NOSTRI PRODOTTI</span></a>',
                    '<div class="TG013_children TG013_product_children">',
                    '<div class="TG013_children_LEFT">',
                    '<div class="TG013_product_categories">Per Categorie</div>',
                    '<table id="TG013_categories_table">',
                    '<tbody>',
                    '</tbody>',
                    '</table>',
                    '<div class="TG013_product_ranges">Per Gamme</div>',
                    '<div class="TG013_product_ranges_row">',
                    '<span><a href="https://www.technogym.com/it/line/linea-arke/">ARKE</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-artis/">ARTIS</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-cable-stations/">Cable Stations</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-element/">Element+</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/excite-range/">Excite</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-flexability/">FLEXability</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/formanew-release/">Forma</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-group-cycle/">Group Cycle</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-kinesis/">Kinesis</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-omnia/">OMNIA</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-personal/">Personal</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-plurima/">Plurima</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-pure-strength/">Pure Strength</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/selection-pro/">Selection Pro</a></span>',
                    '<span><a href="https://www.technogym.com/it/line/linea-wellness-tools/">Wellness Tools</a></span>',
                    '</div>',
                    '</div>',
                    '<div class="TG013_children_RIGHT">',
                    '<div class="TG013_product_workout">Per allenamento</div>',
                    '<a href="https://www.technogym.com/it/products/cardio.html"><div class="TG013_workout_category"><span>CARDIO</span></div></a>',
                    '<a href="https://www.technogym.com/it/products/forza.html"><div class="TG013_workout_category"><span>FORZA</span></div></a>',
                    '<a href="https://www.technogym.com/it/products/functional-flexibility.html"><div class="TG013_workout_category"><span>Funzionale e flessibilità</span></div></a>',
                    '<a href="https://www.technogym.com/it/products/group-activities.html"><div class="TG013_workout_category"><span>Attività di gruppo</span></div></a>',
                    '<div class="TG013_viewAll"><a href="https://www.technogym.com/it/products.html" class="TG013_product_button"><button>TUTTI I PRODOTTI</button></a></div>',
                    '</div>',
                    '</div>',
                    '</li>',
                    '<li class="TG013_navbar_section TG013_home_section"><a class="TG013_section_noLinkTo" href="#"><span class="TG013_section_spanText">PER CASA TUA</span></a>',
                    '<div class="TG013_children TG013_home_children">',
                    '<a href="https://www.technogym.com/it/products/shopby/product_type-tapis_roulant.html"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_RUNNING.jpg"><span class="TG013_home_subText">RUNNING</span></div></a>',
                    '<a href="https://www.technogym.com/it/products/shopby/product_type-bike.html"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_CYCLING.jpg"><span class="TG013_home_subText">CYCLING</span></div></a>',
                    '<a href="https://www.technogym.com/it/products/shopby/product_type-rowers.html"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_ROWING.jpg"><span class="TG013_home_subText">ROWING</span></div></a>',
                    '<a href="https://www.technogym.com/it/products/shopby/product_type-attrezzi_per_l_allenamento_funzionale.html"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_functional_flexability.jpg"><span class="TG013_home_subText">Allenamento funzionale</span></div></a>',
                    '<a href="https://www.technogym.com/it/products/forza.html"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_STRENGTH_TRAINING.jpg"><span class="TG013_home_subText">Allenamento forza</span></div></a>',
                    '</div>',
                    '</li>',
                    '<li class="TG013_navbar_section TG013_business_section"><a class="TG013_section_noLinkTo" href="#"><span class="TG013_section_spanText">PER IL TUO BUSINESS</span></a>',
                    '<div class="TG013_children TG013_business_children">',
                    '<div class="TG013_business_TOP_tabs">',
                    '<span class="TG013_business_tab"><a href="#TG013_business_clubs">CENTRO FITNESS</a></span><span class="TG013_business_tab"><a href="#TG013_business_hospitality">HOSPITALITY</a></span><span class="TG013_business_tab"><a href="#TG013_business_residential">RESIDENTIAL</a></span><span class="TG013_business_tab"><a href="#TG013_business_health">HEALTH</a></span><span class="TG013_business_tab"><a href="#TG013_business_corporate">CORPORATE</a></span><span class="TG013_business_tab"><a href="#TG013_business_performance">PERFORMANCE</a></span>',
                    '</div>',
                    '<div id="TG013_business_clubs" class="TG013_business_subsection TG013_business_clubs">',
                    '<div class="TG013_business_subsection_HEADER">CENTRO FITNESS</div>',
                    '<div class="TG013_business_clubs_LEFT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Premium_Solution.jpg" alt="Premium" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/centri-fitness/"><span>PREMIUM SOLUTION</span></a></div>',
                    '<div class="TG013_business_text_Content">Prodotti cardio, forza e funzionale integrati nella piattaforma mywellness per un\'esperienza di allenamento interattiva, personalizzata e estremamente coinvolgente.</div>',
                    '</div>',
                    '</div>',
                    '<div class="TG013_business_clubs_RIGHT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Prestige_Solution.jpg" alt="Prestige" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/centri-fitness/"><span>PRESTIGE SOLUTION</span></a></div>',
                    '<div class="TG013_business_text_Content">Forme progettate attorno alla persona, un design che cattura i sensi e consente movimenti naturali in qualsiasi ambiente: un\'unica linea top di gamma nata dall\'esperienza Technogym.</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '<div id ="TG013_business_hospitality" class="TG013_business_subsection TG013_business_hospitality">',
                    '<div class="TG013_business_subsection_HEADER">HOSPITALITY</div>',
                    '<div class="TG013_business_hospitality_LEFT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Hotel.jpg" alt="Hotel" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/hotel-e-navi-da-crociera/"><span>HOTEL</span></a></div>',
                    '<div class="TG013_business_text_Content">Il wellness rappresenta il nuovo lusso per chi si mette in viaggio, per lavoro o per piacere senza perdere la possibilità di allenarsi ovunque. \n' +
                    'Le soluzioni Technogym rendono esclusivo il soggiorno di ogni ospite in hotel.</div>',
                    '</div>',
                    '</div>',
                    '<div class="TG013_business_hospitality_RIGHT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Cruise.jpg" alt="Cruises" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/hotel-e-navi-da-crociera/"><span>CROCIERE</span></a></div>',
                    '<div class="TG013_business_text_Content">Il wellness a portata di mano, ovunque e su qualsiasi mezzo. Technogym offre la soluzione perfetta per tutta la vacanza, armonizzando spazi e funzionalità, ricreando sensazioni uniche di allenamento anche sul ponte di una nave da crociera.</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '<div id="TG013_business_residential" class="TG013_business_subsection TG013_business_residential">',
                    '<div class="TG013_business_subsection_HEADER">RESIDENTIAL</div>',
                    '<div class="TG013_business_residential_LEFT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Wellness_Facilities.jpg" alt="Wellness Facilities" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/complessi-residenziali/"><span>CENTRI WELLNESS</span></a></div>',
                    '<div class="TG013_business_text_Content">Centri esclusivi dove i residenti possono allenarsi con tecnologie all’avanguardia dal design innovativo e con esclusivi programmi personalizzati.</div>',
                    '</div>',
                    '</div>',
                    '<div class="TG013_business_residential_CENTER">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Wellness_Rooms.jpg" alt="Wellness Rooms" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/complessi-residenziali/"><span>AREE WELLNESS</span></a></div>',
                    '<div class="TG013_business_text_Content">Aree comuni in complessi residenziali con soluzioni wellness che i residenti possono utilizzare per rilassarsi, recuperare energie e socializzare.</div>',
                    '</div>',
                    '</div>',
                    '<div class="TG013_business_residential_RIGHT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_In-home_Wellness.jpg" alt="In-Home Wellness" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/complessi-residenziali/"><span>RESIDENTIAL</span></a></div>',
                    '<div class="TG013_business_text_Content">Spazi wellness completi nella privacy di ogni casa che incrementano valore ed esclusività delle proprietà.</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '<div id="TG013_business_health" class="TG013_business_subsection TG013_business_health">',
                    '<div class="TG013_business_subsection_HEADER">HEALTH</div>',
                    '<a href="https://www.technogym.com/it/business-solution/patologie-metaboliche/"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_RUNNING.jpg"><span class="TG013_home_subText">Trattamento delle disfunzioni metaboliche</span></div></a>',
                    '<a href="https://www.technogym.com/it/business-solution/patologie-cardiorespiratorie/"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_CYCLING.jpg"><span class="TG013_home_subText">Riabilitazione cardio-respiratoria</span></div></a>',
                    '<a href="https://www.technogym.com/it/business-solution/patologie-ortopediche/"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_ROWING.jpg"><span class="TG013_home_subText">Rieducazione funzionale</span></div></a>',
                    '<a href="https://www.technogym.com/it/business-solution/medicina-sportiva/"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_functional_flexability.jpg"><span class="TG013_home_subText">Medicina sportiva</span></div></a>',
                    '<a href="https://www.technogym.com/it/business-solution/soluzioni-per-linvecchiamento/"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_STRENGTH_TRAINING.jpg"><span class="TG013_home_subText">Qualità dell\'invecchiamento</span></div></a>',
                    '</div>',
                    '<div id="TG013_business_corporate" class="TG013_business_subsection TG013_business_corporate">',
                    '<div class="TG013_business_subsection_HEADER">CORPORATE</div>',
                    '<div class="TG013_business_corporate_LEFT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_No_Space_Solution.jpg" alt="No space solution" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/piccoli-spazi/"><span>SPAZI RIDOTTI</span></a></div>',
                    '<div class="TG013_business_text_Content">Uffici, sale riunioni o spazi comuni possono essere attrezzati per diventare spazi attivi, supportati da programmi di allenamento personalizzati attraverso l’app mywellness.</div>',
                    '</div>',
                    '</div>',
                    '<div class="TG013_business_corporate_RIGHT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Space_Solution.jpg" alt="Space solution" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/grandi-spazi/"><span>GRANDI SPAZI</span></a></div>',
                    '<div class="TG013_business_text_Content">Un’area dell’azienda progettata e dedicata al wellness con la giusta combinazione di attrezzi e programmi di allenamento. Uno spazio semplice da gestire e facile da utilizzare.</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '<div id="TG013_business_performance" class="TG013_business_subsection TG013_business_performance">',
                    '<div class="TG013_business_subsection_HEADER">PERFORMANCE</div>',
                    '<div class="TG013_business_performance_LEFT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Sport_Teams.jpg" alt="Sport Teams" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/who-we-are/partnership/#sports"><span>TEAM SPORTIVI</span></a></div>',
                    '<div class="TG013_business_text_Content">La pluriennale esperienza Technogym al servizio di Olimpiadi e team sportivi.<br/>Le migliori soluzioni per incrementare le prestazioni agonistiche di ogni atleta.</div>',
                    '</div>',
                    '</div>',
                    '<div class="TG013_business_performance_CENTER">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Schools_Universities.jpg" alt="Schools and Universities" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/scuole-e-universita/"><span>Scuole e Università</span></a></div>',
                    '<div class="TG013_business_text_Content">L’educazione ai valori dello sport come incentivo al miglioramento costante di rendimento scolastico e prestazioni sportive.<br/>L’esercizio fisico offre innumerevoli benefici agli studenti di ogni età.</div>',
                    '</div>',
                    '</div>',
                    '<div class="TG013_business_performance_RIGHT">',
                    '<div class="TG013_business_imgWrapper">',
                    '<img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Armed_Forces.jpg" alt="Armed Forces" class="TG013_bussiness_image">',
                    '</div>',
                    '<div class="TG013_business_textWrapper">',
                    '<div class="TG013_business_text_Header"><a href="https://www.technogym.com/it/business-solution/caserme/"><span>FORZE ARMATE</span></a></div>',
                    '<div class="TG013_business_text_Content">Attrezzature affidabili nel tempo, unite a programmi fitness dedicati per elevati standard di allenamento in ambiente militare.</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>',
					'</li>',
					'<li class="TG013_navbar_section TG013_newsroomsection"><a class="TG013_section_noLinkTo" href="/it/newsroom">NEWSROOM</a></li>',
                    '</ul>',
                    '</div>',
                    '</div>'
                ].join(''));

                */ 

            /* } else {  */
                // ---------------------------------------------------------------------------------------------
                // ------------------------------------------UK------------------------------------------------------
                // --------------------------------------------------------------------------------------------------

                // Insert the newsroom section in the top navbar menu
               var $newsRoomContainer = $('#ct-menu-navtop_menu').find(' > .inside > ul > li:eq(0)');
                $newsRoomContainer.after(`<li style="padding-right: 0;"><a href="${__('https://www.technogym.com/newsroom/')}">${__('Newsroom')}</a></li>`);

                // Start creating the navbar
                var $myNavbarHTML = $(`
                    <div id="TG013_navbar-bottom">
                    <div class="TG013_inside">
                    <ul class="TG013_ul_navbar_Wrapper">
                    <li class="TG013_navbar_section TG013_products_section"><a class="TG013_section_noLinkTo" href="#"><span class="TG013_section_spanText">${__('Our Products')}</span></a>
                    <div class="TG013_children TG013_product_children">
                    <div class="TG013_children_LEFT">
                    <div class="TG013_product_categories">${__('BY CATEGORIES')}</div>
                    <table id="TG013_categories_table">
                    <tbody>
                    </tbody>
                    </table>
                    <div class="TG013_product_ranges">${__('BY RANGES')}</div>
                    <div class="TG013_product_ranges_row">
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
                    </div>
                    </div>
                    <div class="TG013_children_RIGHT">
                    <div class="TG013_product_workout">${__('BY WORKOUT')}</div>
                    <a href="${__('https://www.technogym.com/gb/products/cardio.html')}"><div class="TG013_workout_category"><span>${__('CARDIO')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/strength.html')}"><div class="TG013_workout_category"><span>${__('STRENGTH')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/functional-flexibility.html')}"><div class="TG013_workout_category"><span>${__('FUNCTIONAL & FLEXIBILITY')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/group-activities.html')}"><div class="TG013_workout_category"><span>${__('GROUP ACTIVITIES')}</span></div></a>
                    <div class="TG013_viewAll"><a href="${__('https://www.technogym.com/gb/products.html')}" class="TG013_product_button"><button>${__('VIEW ALL PRODUCTS')}</button></a></div>
                    </div>
                    </div>
                    </li>
                    <li class="TG013_navbar_section TG013_home_section"><a class="TG013_section_noLinkTo" href="#"><span class="TG013_section_spanText">${__('For Your Home')}</span></a>
                    <div class="TG013_children TG013_home_children">
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-treadmills.html')}"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_RUNNING.jpg"><span class="TG013_home_subText">${__('RUNNING')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-exercise_bikes-group_cycling.html')}"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_CYCLING.jpg"><span class="TG013_home_subText">${__('CYCLING')}</span></div></a>
                    <a href="https://www.technogym.com/gb/products/shopby/product_type-rowers.html"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_ROWING.jpg"><span class="TG013_home_subText">${__('ROWING')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/functional-flexibility.html')}"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_functional_flexability.jpg"><span class="TG013_home_subText">${__('FUNCTIONAL MOVEMENT')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/strength.html')}"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_STRENGTH_TRAINING.jpg"><span class="TG013_home_subText">${__('STRENGTH TRAINING')}</span></div></a>
                    </div>
                    </li>
                    <li class="TG013_navbar_section TG013_business_section"><a class="TG013_section_noLinkTo" href="#"><span class="TG013_section_spanText">${__('For Your Business')}</span></a>
                    <div class="TG013_children TG013_business_children">
                    <div class="TG013_business_TOP_tabs">
                         <span class="TG013_business_tab"><a href="#TG013_business_clubs">${__('FITNESS FACILITIES')}</a></span><span class="TG013_business_tab"><a href="#TG013_business_hospitality">${__('HOSPITALITY')}</a></span><span class="TG013_business_tab"><a href="#TG013_business_residential">${__('RESIDENTIAL')}</a></span><span class="TG013_business_tab"><a href="#TG013_business_health">HEALTH</a></span><span class="TG013_business_tab"><a href="#TG013_business_corporate">${__('CORPORATE')}</a></span><span class="TG013_business_tab"><a href="#TG013_business_performance">${__('PERFORMANCE')}</a></span>
                    </div>
                    <div id="TG013_business_clubs" class="TG013_business_subsection TG013_business_clubs">
                    <div class="TG013_business_subsection_HEADER">${__('FITNESS FACILITIES')}</div>
                    <div class="TG013_business_clubs_LEFT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Premium_Solution.jpg" alt="${__('Premium')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/fitness-facilities-premium-solution/')}"><span>${__('PREMIUM')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Cardio, strength and functional products are integrated into the mywellness platform for an interactive workout that is both customised and highly engaging.')}</div>
                    </div>
                    </div>
                    <div class="TG013_business_clubs_RIGHT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Prestige_Solution.jpg" alt="${__('Prestige')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/fitness-facilities-prestige-solution/')}"><span>${__('PRESTIGE')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Structures created with people in mind featuring a design that engages the senses and enables natural movement in any environment. A single top-of the-range product line stemming from the experience of Technogym.')}</div>
                    </div>
                    </div>
                    </div>
                    <div id="TG013_business_hospitality" class="TG013_business_subsection TG013_business_hospitality">
                    <div class="TG013_business_subsection_HEADER">${__('HOSPITALITY')}</div>
                    <div class="TG013_business_hospitality_LEFT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Hotel.jpg" alt="${__('Hotel')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/business-solution/hotels-cruise-liners/')}"><span>${__('HOTEL')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Wellness is the new luxury for people who travel for work or pleasure and want to be able to workout anywhere. The Technogym solutions make hotel stays exclusive for every guest.')}</div>
                    </div>
                    </div>
                    <div class="TG013_business_hospitality_RIGHT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Cruise.jpg" alt="${__('Cruises')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/business-solution/hotels-cruise-liners/')}"><span>${__('CRUISES')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Wellness data always at hand, everywhere and on any means. Technogym offers the ideal solution for the entire holiday with the perfect balance of space and functionality. Singular emotions can be recreated even on the deck of a cruise ship.')}</div>
                    </div>
                    </div>
                    </div>
                    <div id="TG013_business_residential" class="TG013_business_subsection TG013_business_residential">
                    <div class="TG013_business_subsection_HEADER">${__('RESIDENTIAL')}</div>
                    <div class="TG013_business_residential_LEFT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Wellness_Facilities.jpg" alt="${__('Wellness Facilities')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/business-solution/residential/')}"><span>${__('WELLNESS FACILITIES')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Exclusive facilities where residents can enjoy state-of-the-art design and technology and experience personalised training programmes.')}</div>
                    </div>
                    </div>
                    <div class="TG013_business_residential_CENTER">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Wellness_Rooms.jpg" alt="${__('Wellness Rooms')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="https://www.technogym.com/gb/business-solution/residential/"><span>${__('WELLNESS ROOMS')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Common areas in residential environments with Wellness solutions that residents can use to rela, recharge and socialise.')}</div>
                    </div>
                    </div>
                    <div class="TG013_business_residential_RIGHT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_In-home_Wellness.jpg" alt="${__('In-Home Wellness')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/business-solution/residential/')}"><span>${__('IN-HOME WELLNESS')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Fully equipped Wellness havens in the privacy of the home adds value and exclusivity to the property.')}</div>
                    </div>
                    </div>
                    </div>
                    <div id="TG013_business_health" class="TG013_business_subsection TG013_business_health">
                    <div class="TG013_business_subsection_HEADER">${__('HEALTH')}</div>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-treadmills.html')}"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_RUNNING.jpg"><span class="TG013_home_subText">${__('Treatment of metabolic disorders')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-exercise_bikes-group_cycling.html')}"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_CYCLING.jpg"><span class="TG013_home_subText">${__('Cardio - respiratory rehabilitation')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/shopby/product_type-rowers.html')}"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_ROWING.jpg"><span class="TG013_home_subText">${__('Functional assessment ')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/functional-flexibility.html')}"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_functional_flexability.jpg"><span class="TG013_home_subText">${__('Sports Medicine')}</span></div></a>
                    <a href="${__('https://www.technogym.com/gb/products/strength.html')}"><div class="TG013_home_subcategory"><img class="homeImgSubcategory" src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_STRENGTH_TRAINING.jpg"><span class="TG013_home_subText">${__('Quality ageing')}</span></div></a>
                    </div>
                    <div id="TG013_business_corporate" class="TG013_business_subsection TG013_business_corporate">
                    <div class="TG013_business_subsection_HEADER">${__('CORPORATE')}</div>
                    <div class="TG013_business_corporate_LEFT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_No_Space_Solution.jpg" alt="${__('No space solution')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/business-solution/no-space/')}"><span>${__('NO SPACE SOLUTION')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Office, meeting rooms and common areas can be outfitted to become active spaces supported by custom training programmes through the mywellness app.')}</div>
                    </div>
                    </div>
                    <div class="TG013_business_corporate_RIGHT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Space_Solution.jpg" alt="${__('Space solution')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/business-solution/space/')}"><span>${__('SPACE SOLUTION')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('An area in the company designed for and dedicated to Wellness with the proper combination of equipment and training programmes. A space that is simple to manage and easy to use.')}</div>
                    </div>
                    </div>
                    </div>
                    <div id="TG013_business_performance" class="TG013_business_subsection TG013_business_performance">
                    <div class="TG013_business_subsection_HEADER">${__('PERFORMANCE')}</div>
                    <div class="TG013_business_performance_LEFT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Sport_Teams.jpg" alt="${__('Sport Teams')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/who-we-are/partnership/#sports')}"><span>${__('SPORT TEAMS')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Exclusive facilities where residents can enjoy state-of-the-art design and technology and experience personalised training programmes.')}</div>
                    </div>
                    </div>
                    <div class="TG013_business_performance_CENTER">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Schools_Universities.jpg" alt="${__('Schools and Universities')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/business-solution/universities/')}"><span>${__('SCHOOLS AND UNIVERSITIES')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Common areas in residential environments with Wellness solutions that residents can use to rela, recharge and socialise.')}</div>
                    </div>
                    </div>
                    <div class="TG013_business_performance_RIGHT">
                    <div class="TG013_business_imgWrapper">
                    <img src="https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Armed_Forces.jpg" alt="${__('Armed Forces')}" class="TG013_bussiness_image">
                    </div>
                    <div class="TG013_business_textWrapper">
                    <div class="TG013_business_text_Header"><a href="${__('https://www.technogym.com/gb/business-solution/military/')}"><span>${__('ARMED FORCES')}</span></a></div>
                    <div class="TG013_business_text_Content">${__('Fully equipped Wellness havens in the privacy of the home adds value and exclusivity to the property.')}</div>
                    </div>
                    </div>
                    </div>
                    </div>
					</li>
					<li class="TG013_navbar_section TG013_newsroomsection"><a class="TG013_section_noLinkTo" href="${__('/gb/newsroom-home')}">${__('NEWSROOM')}</a></li>
                    </ul>
                    </div>
                    </div>
                `);

            /* } // else */

            // ------------------------------------------UK------------------------------------------------------
            // --------------------------------------------------------------------------------------------------

            $myNavbarHTML.insertAfter($navbarTop);

            var $myNavbarWrapper = $('.TG013_ul_navbar_Wrapper');
            // Get the main sections
            var $myNavbarSections = $('.TG013_navbar_section');
            // Event listener for the nav main sections (hover)
            $myNavbarSections.on({
                mouseenter: function () {
                    $(this).addClass('TG013_sectionMain_ACTIVE');
                    $(this).children().eq(0).addClass('TG013_sectionLink_ACTIVE');
                    var $childrenReveal = $(this).children().eq(1); // first child is the 'a'
                    $childrenReveal.addClass('TG013_sectionContent_ACTIVE');
                    utils.events.send('TG013', $(this).children().eq(0).text() + ' category viewed', 'TG013 - Navigation Redesign (Desktop)');
                },
                mouseleave: function () {
                    $(this).removeClass('TG013_sectionMain_ACTIVE');
                    $(this).children().eq(0).addClass('TG013_sectionLink_ACTIVE');
                    var $childrenReveal = $(this).children().eq(1); // first child is the 'a'
                    $childrenReveal.removeClass('TG013_sectionContent_ACTIVE');
                }
            });

            // --------------------------------------------------------------------------------------------------
            // Store the 'CATEGORIES' subsection of the 'PRODUCTS' section
            var $categoryListItems = $navbarBottomInside.find(' > ul > li:eq(0) .children:eq(0) .level-0.tab-content > li:eq(0)' +
                ' .children:eq(0) > .level-1 > li');
            var $categoryTableBody = $('#TG013_categories_table tbody');
            var $globalCategoryIndex = -1;
            $categoryListItems.each(function (i) {
                if (i % 3 === 0) {
                    $globalCategoryIndex++;
                    $('<tr class="TG013_productCategoryRow"><td class="TG013_productCategoryItem"</td></tr>').appendTo($categoryTableBody);
                    $(this).clone().appendTo('.TG013_productCategoryRow:eq(' + $globalCategoryIndex + ') td');
                } else {
                    $('<td class="TG013_productCategoryItem"></td>').appendTo('.TG013_productCategoryRow:eq(' + $globalCategoryIndex + ')');
                    $(this).clone().appendTo('.TG013_productCategoryRow:eq(' + $globalCategoryIndex + ') .TG013_productCategoryItem:last');
                }
            });
            $('.TG013_productCategoryItem > li > a > span').each(function() {
                if ($(this).text().trim().length > 23) {
                    $(this).parent().addClass('TG013_tooLong');
                }
            });
            // --------------------------------------------------------------------------------------------------
            // Add images to the workout subcategory
            $('.TG013_workout_category:eq(0)').css('background-image', 'url(https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Cardio-1.jpg)');
            $('.TG013_workout_category:eq(1)').css('background-image', 'url(https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Strength-1.jpg)');
            $('.TG013_workout_category:eq(2)').css('background-image', 'url(https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Functional_Flexability-1.jpg)');
            $('.TG013_workout_category:eq(3)').css('background-image', 'url(https://www.technogym.com/wpress/wp-content/uploads/2017/08/Technogym_Group_activity.jpg)');
            // --------------------------------------------------------------------------------------------------
            // Enlarge the background images on mouseenter (note: needs a wrapper for the image)
            var $homeSubCategories = $('.homeImgSubcategory, .TG013_home_subText, .TG013_bussiness_image');
            $homeSubCategories.on({
                mouseenter: function () {
                    $(this).addClass('homeImgTransition');
                    $(this).prev().addClass('homeImgTransition');
                },
                mouseleave: function () {
                    $(this).removeClass('homeImgTransition');
                    $(this).prev().removeClass('homeImgTransition');

                }
            });
            // --------------------------------------------------------------------------------------------------
            // New stuff
           /* var $businessSectionWhole = $('.TG013_business_children');
            var $businessTab = $('.TG013_business_tab');
            var $businessSubsectionHeader = $('.TG013_business_subsection_HEADER');
            function scrollBusinessTab(i) {
                $businessTab.eq(i).on('click', function () {
                    var offsetTopHm = $businessSubsectionHeader.eq(i).offset().top;
                    $businessSectionWhole.scrollTop(offsetTopHm - 122);
                });
            } // scrollBusinessTab
            scrollBusinessTab(0);
            scrollBusinessTab(1);
            scrollBusinessTab(2);
            scrollBusinessTab(3);
            scrollBusinessTab(4);
            scrollBusinessTab(5);*/
          
          
          $('.TG013_business_TOP_tabs span a').on('click', function(e) {
            e.preventDefault();
            var thisTarget = $(this).attr('href');
            var targetOffset = $(thisTarget).offset().top - 100;
            $('.TG013_children.TG013_business_children').animate({
              scrollTop: targetOffset
            }, 600);
           });

           // trackerName = ga.getAll()[0].get('name');
            $('span[class="TG013_section_spanText"]').click(function () {
                var topLevNav = $(this).text().trim();
                // ga(trackerName + '.send', 'event', 'Navigation', 'Navigation: ' + topLevNav, {nonInteraction: 1});
                utils.events.send('TG013', 'Navigation: ' + topLevNav);
            });

            $('td[class="TG013_productCategoryItem"] li a').click(function(){
                var productSelect = $(this).text().trim();
                var categoryHeader = $(this).closest('.TG013_children_LEFT').find('.TG013_product_categories').text().trim();
                var productHeader = $(this).closest('.TG013_ul_navbar_Wrapper').find('li a span:first').text().trim();
                // ga(trackerName + '.send', 'event', 'Navigation', 'Navigation: ' + productHeader, 'Navigation: ' + productHeader + ' : ' + categoryHeader + ' : ' + productSelect, {nonInteraction: 1});
                utils.events.send('TG013', 'Navigation: ' + productHeader + ' : ' + categoryHeader + ' : ' + productSelect);
            });

            $('div[class="TG013_product_ranges_row"] span a').click(function(){
                var rangeSelect = $(this).text().trim();
                var rangeHeader = $(this).closest('.TG013_children_LEFT').find('.TG013_product_ranges').text().trim();
                var productHeader2 = $(this).closest('.TG013_ul_navbar_Wrapper').find('li a span:first').text().trim();
                // ga(trackerName + '.send', 'event', 'Navigation', 'Navigation: ' + productHeader2, 'Navigation: ' + productHeader2 + ' : ' + rangeHeader + ' : ' + rangeSelect, {nonInteraction: 1});
                utils.events.send('TG013', 'Navigation: ' + productHeader2 + ' : ' + rangeHeader + ' : ' + rangeSelect);
            });

            $('div[class="TG013_workout_category"]').click(function(){
                var workoutSelect = $(this).find('span:first').text().trim();
                var workoutHeader = $(this).closest('.TG013_children_RIGHT').find('.TG013_product_workout').text().trim();
                var productHeader3 = $(this).closest('.TG013_ul_navbar_Wrapper').find('li a span:first').text().trim();
                // ga(trackerName + '.send', 'event', 'Navigation', 'Navigation: ' + productHeader3, 'Navigation: ' + productHeader3 + ' : ' + workoutHeader + ' : ' + workoutSelect, {nonInteraction: 1});
                utils.events.send('TG013', 'Navigation: ' + productHeader3 + ' : ' + workoutHeader + ' : ' + workoutSelect);
            });

            $('div[class="TG013_viewAll"]').click(function(){
                var viewAllProducts = $(this).find('button:first').text().trim();
                var productHeader4 = $(this).closest('.TG013_ul_navbar_Wrapper').find('li a span:first').text().trim();
                // ga(trackerName + '.send', 'event', 'Navigation', 'Navigation: ' + productHeader4, 'Navigation: ' + productHeader4 + ' : ' + viewAllProducts, {nonInteraction: 1});
                utils.events.send('TG013', 'Navigation: ' + productHeader4 + ' : ' + viewAllProducts);
            });

            $('.TG013_children.TG013_home_children a div > img, .TG013_children.TG013_home_children a div > span').click(function(){
                var homeSelect = $(this).closest('.TG013_home_subcategory').find('span:first').text().trim();
                var homeHeader = $(this).closest('.TG013_navbar_section.TG013_home_section.TG013_sectionMain_ACTIVE').find('.TG013_section_spanText').text().trim();
                // ga(trackerName + '.send', 'event', 'Navigation', 'Navigation: ' + homeHeader, 'Navigation: ' + homeHeader + ' : ' + homeSelect, {nonInteraction: 1});
                utils.events.send('TG013', 'Navigation: ' + homeHeader + ' : ' + homeSelect);
            });

            $('div[class="TG013_business_TOP_tabs"] > span').click(function(){
                var businessAnchorLink = $(this).text().trim();
                var anchorHeader = $(this).closest('.TG013_children.TG013_business_children').siblings('.TG013_section_noLinkTo.TG013_sectionLink_ACTIVE').find('span').text().trim();
                // ga(trackerName + '.send', 'event', 'Navigation', 'Navigation: ' + anchorHeader, 'Navigation: ' + anchorHeader + ' : Anchor Link: ' + businessAnchorLink, {nonInteraction: 1});
                utils.events.send('TG013', 'Navigation: ' + anchorHeader + ' : Anchor Link: ' + businessAnchorLink);
            });

            $('div[class="TG013_business_text_Header"] > a span').click(function(){
                var businessSelect = $(this).text().trim();
                var businessSubHeader = $(this).closest('.TG013_business_subsection').find('.TG013_business_subsection_HEADER').text().trim();
                var businessHeader = $(this).closest('.TG013_children.TG013_business_children').siblings('.TG013_section_noLinkTo.TG013_sectionLink_ACTIVE').find('span').text().trim();
                // ga(trackerName + '.send', 'event', 'Navigation', 'Navigation: ' + businessHeader, 'Navigation: ' + businessSubHeader + ' : ' + businessSelect, {nonInteraction: 1});
                utils.events.send('TG013', 'Navigation: ' + businessSubHeader + ' : ' + businessSelect);
            });

            $('div[class="TG013_business_subsection TG013_business_health"] a div > img, div[class="TG013_business_subsection TG013_business_health"] a div > span').click(function(){
                var businessHealth = $(this).closest('.TG013_home_subcategory').find('span').text().trim();
                var businessHealthHeader = $(this).closest('.TG013_business_subsection.TG013_business_health').find('div:first').text().trim();
                var businessHeader2 = $(this).closest('.TG013_children.TG013_business_children').siblings('.TG013_section_noLinkTo.TG013_sectionLink_ACTIVE').find('span').text().trim();
                // ga(trackerName + '.send', 'event', 'Navigation', 'Navigation: ' + businessHeader2, 'Navigation: ' + businessHealthHeader + ' : ' + businessHealth, {nonInteraction: 1});
                utils.events.send('TG013', 'Navigation: ' + businessHeader2, 'Navigation: ' + businessHealthHeader + ' : ' + businessHealth);
            });

        } // wholeExperiment

    } // activate

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('ID', 'Variation 1');
    
    UC.poller([
      () => !!window.jQuery,
      'body',
    ], () => {
      activate();
    });
		
	})();

})();
