import * as utils from '../../../../../lib/utils';

// bind toProperCase to String prototype
utils.bindToProperCase();

export default {
    _cacheDom: function() {
        this._elements = {};
        this._elements.oldMenu = document.getElementById('custommenu');
        this._elements.body = document.getElementsByTagName('body')[0];
    },

    //--- Scrape page for category data and return JSON ---
    _getCategoryData: function() {
        var menu = this._elements.oldMenu,
            listItems = [].slice.call(menu.children[0].children), // Convert from HTMLCollection to array
            filterIds = ['2','3','4','5','6','7'],
            json = {'name': 'Shop by Category', 'sub': [] },
            category;
        
        // Filter LIs with subcategories
        listItems = listItems.filter(function(el) {
            return filterIds.indexOf(el.id) > -1;
        });
        
        // Iterate over each category and convert relevant data to JSON format
        for (var i = 0; i < listItems.length; i++) {
            category = listItems[i];
            json.sub.push({
                'name': _getTitle(category),
                'link': _getLink(category),
                'sub': _getSubCategories(category)
            });
        }

        function _getLink(category) {
            var href = [].slice.call(category.children).filter(function(el) {
                return el.tagName.toUpperCase() === 'A';
            })[0].href;

            return href ? href : undefined;
        }

        function _getName(category) {
            var name = [].slice.call(category.children).filter(function(el) {
                return el.tagName.toUpperCase() === 'A';
            })[0].children[0].innerText.toProperCase();

            return name ? name : undefined;
        }

        function _getTitle(category) {
            return category.children[1].children[0].innerText.toProperCase();
        }

        function _getSubCategories(category) {
            var formattedSubcategories = [], 
                formattedSubcategory,
                subcategory, 
                title, 
                links;

            var subcategories = category.children[2].children[0].children;
            for (var j = 0; j < subcategories.length; j++) {
                subcategory = subcategories[j];
                title = subcategory.children[1].children[0].innerText.toProperCase();

                formattedSubcategory = {
                    'name': _getName(subcategory),
                    'link': _getLink(subcategory),
                    'sub': []
                };

                var subsubcategories = subcategory.children[2].children[0].children;
                for (var k = 0; k < subsubcategories.length; k++) {
                    subcategory = subsubcategories[k];
                    formattedSubcategory.sub.push({
                        'name': _getName(subcategory),
                        'link': _getLink(subcategory)
                    });
                }

                formattedSubcategories.push(formattedSubcategory);
            }

            return formattedSubcategories;
        }

        return json;
    },

    //--- Scrape page for brands data and return JSON ---
    _getBrandsData: function() {
        var json = {"name":"Brands","sub":[{"name":"Academy","link":"https://www.salonsdirect.com/brands/academy"},{"name":"Acclaim","link":"https://www.salonsdirect.com/brands/acclaim"},{"name":"Acrobat","link":"https://www.salonsdirect.com/brands/acrobat"},{"name":"Affinity","link":"https://www.salonsdirect.com/brands/affinity"},{"name":"Agenda","link":"https://www.salonsdirect.com/brands/agenda"},{"name":"AMA","link":"https://www.salonsdirect.com/brands/ama"},{"name":"American Crew","link":"https://www.salonsdirect.com/brands/american-crew"},{"name":"Andis","link":"https://www.salonsdirect.com/brands/andis"},{"name":"Apraise","link":"https://www.salonsdirect.com/brands/apraise"},{"name":"Ardell","link":"https://www.salonsdirect.com/brands/ardell"},{"name":"Artistic","link":"https://www.salonsdirect.com/brands/artistic"},{"name":"Aztec","link":"https://www.salonsdirect.com/brands/aztec"},{"name":"Babyliss PRO","link":"https://www.salonsdirect.com/brands/babyliss-pro"},{"name":"Ballet","link":"https://www.salonsdirect.com/brands/ballet"},{"name":"Balmain","link":"https://www.salonsdirect.com/brands/balmain"},{"name":"Barber PRO","link":"https://www.salonsdirect.com/brands/barber-pro"},{"name":"Barbicide","link":"https://www.salonsdirect.com/brands/barbicide"},{"name":"Beauty Tools","link":"https://www.salonsdirect.com/brands/beauty-tools"},{"name":"BeautyPro","link":"https://www.salonsdirect.com/brands/beautypro"},{"name":"Belava","link":"https://www.salonsdirect.com/brands/belava"},{"name":"Biosun","link":"https://www.salonsdirect.com/brands/biosun"},{"name":"Black + White","link":"https://www.salonsdirect.com/brands/black-white"},{"name":"Black Touch","link":"https://www.salonsdirect.com/brands/black-touch"},{"name":"Bob Tuo","link":"https://www.salonsdirect.com/brands/bob-tuo"},{"name":"Brush Delite","link":"https://www.salonsdirect.com/brands/brush-delite"},{"name":"Caflon","link":"https://www.salonsdirect.com/brands/caflon"},{"name":"Caress","link":"https://www.salonsdirect.com/brands/caress"},{"name":"Carlton","link":"https://www.salonsdirect.com/brands/carlton"},{"name":"Carter and Bond","link":"https://www.salonsdirect.com/brands/carter-and-bond"},{"name":"Ceriotti","link":"https://www.salonsdirect.com/brands/ceriotti"},{"name":"Chenice","link":"https://www.salonsdirect.com/brands/chenice"},{"name":"China Glaze","link":"https://www.salonsdirect.com/brands/china-glaze"},{"name":"Clean + Easy","link":"https://www.salonsdirect.com/brands/clean-easy"},{"name":"Clippercide","link":"https://www.salonsdirect.com/brands/clippercide"},{"name":"Clynol","link":"https://www.salonsdirect.com/brands/clynol"},{"name":"Coats","link":"https://www.salonsdirect.com/brands/coats"},{"name":"Collexia","link":"https://www.salonsdirect.com/brands/collexia"},{"name":"ColorpHlex","link":"https://www.salonsdirect.com/brands/colorphlex"},{"name":"Colour Touch","link":"https://www.salonsdirect.com/brands/wella-colour-touch"},{"name":"Combinal","link":"https://www.salonsdirect.com/brands/combinal"},{"name":"Comby","link":"https://www.salonsdirect.com/brands/comby"},{"name":"Corioliss","link":"https://www.salonsdirect.com/brands/corioliss"},{"name":"Cotton Soft","link":"https://www.salonsdirect.com/brands/cotton-soft"},{"name":"Crazy Angel","link":"https://www.salonsdirect.com/brands/crazy-angel"},{"name":"Crazy Color","link":"https://www.salonsdirect.com/brands/crazy-color"},{"name":"Cricket","link":"https://www.salonsdirect.com/brands/cricket"},{"name":"Crown Brush","link":"https://www.salonsdirect.com/brands/crown-brush"},{"name":"Cuccio","link":"https://www.salonsdirect.com/brands/cuccio"},{"name":"Curlformers","link":"https://www.salonsdirect.com/brands/curlformers"},{"name":"D:FI","link":"https://www.salonsdirect.com/brands/d-fi"},{"name":"DAX","link":"https://www.salonsdirect.com/brands/dax"},{"name":"Daylight","link":"https://www.salonsdirect.com/brands/daylight"},{"name":"Denman","link":"https://www.salonsdirect.com/brands/denman"},{"name":"Deo","link":"https://www.salonsdirect.com/brands/deo"},{"name":"Dia Richesse","link":"https://www.salonsdirect.com/brands/dia-richesse"},{"name":"Diva PRO Styling","link":"https://www.salonsdirect.com/brands/diva-pro-styling"},{"name":"DMI","link":"https://www.salonsdirect.com/brands/dmi"},{"name":"Drumm","link":"https://www.salonsdirect.com/brands/drumm"},{"name":"DUO","link":"https://www.salonsdirect.com/brands/duo"},{"name":"Dy-Zoff","link":"https://www.salonsdirect.com/brands/dy-zoff"},{"name":"Ebe","link":"https://www.salonsdirect.com/brands/ebe"},{"name":"Elchim","link":"https://www.salonsdirect.com/brands/elchim"},{"name":"Emerald Bay","link":"https://www.salonsdirect.com/brands/emerald-bay"},{"name":"ETI","link":"https://www.salonsdirect.com/brands/eti"},{"name":"EzFlow","link":"https://www.salonsdirect.com/brands/ezflow"},{"name":"Feather","link":"https://www.salonsdirect.com/brands/feather"},{"name":"Fiesta Sun","link":"https://www.salonsdirect.com/brands/fiesta-sun"},{"name":"Florence Roby","link":"https://www.salonsdirect.com/brands/florence-roby"},{"name":"Focus","link":"https://www.salonsdirect.com/brands/focus"},{"name":"Footsie Bath","link":"https://www.salonsdirect.com/brands/footsie-bath"},{"name":"Framar","link":"https://www.salonsdirect.com/brands/framar"},{"name":"Fransen","link":"https://www.salonsdirect.com/brands/fransen"},{"name":"Gear UK","link":"https://www.salonsdirect.com/brands/gear-uk"},{"name":"Gelluv","link":"https://www.salonsdirect.com/brands/gelluv"},{"name":"Gellux","link":"https://www.salonsdirect.com/brands/gellux"},{"name":"GiGi","link":"https://www.salonsdirect.com/brands/gigi"},{"name":"Glamtech","link":"https://www.salonsdirect.com/brands/glamtech"},{"name":"Goldwell Professional","link":"https://www.salonsdirect.com/brands/goldwell-professional"},{"name":"Gotta","link":"https://www.salonsdirect.com/brands/gotta"},{"name":"Gripeze","link":"https://www.salonsdirect.com/brands/gripeze"},{"name":"Hair Sculptor","link":"https://www.salonsdirect.com/brands/hair-sculptor"},{"name":"Hair Tools","link":"https://www.salonsdirect.com/brands/hair-tools"},{"name":"Hairbond","link":"https://www.salonsdirect.com/brands/hairbond"},{"name":"Haito","link":"https://www.salonsdirect.com/brands/haito"},{"name":"Handirest","link":"https://www.salonsdirect.com/brands/handirest"},{"name":"Head Jog","link":"https://www.salonsdirect.com/brands/head-jog"},{"name":"Hive","link":"https://www.salonsdirect.com/brands/hive"},{"name":"Hypnot-Eyes","link":"https://www.salonsdirect.com/brands/hypnot-eyes"},{"name":"ibd","link":"https://www.salonsdirect.com/brands/ibd"},{"name":"Indola","link":"https://www.salonsdirect.com/brands/indola"},{"name":"INNOluxe","link":"https://www.salonsdirect.com/brands/innoluxe"},{"name":"INOA","link":"https://www.salonsdirect.com/brands/loreal-inoa"},{"name":"Jack Dean","link":"https://www.salonsdirect.com/brands/jack-dean"},{"name":"Jaguar","link":"https://www.salonsdirect.com/brands/jaguar"},{"name":"Jay2","link":"https://www.salonsdirect.com/brands/jay2"},{"name":"Joewell","link":"https://www.salonsdirect.com/brands/joewell"},{"name":"Kaeso","link":"https://www.salonsdirect.com/brands/kaeso"},{"name":"Kasho","link":"https://www.salonsdirect.com/brands/kasho"},{"name":"Kebelo","link":"https://www.salonsdirect.com/brands/kebelo"},{"name":"Kiehl","link":"https://www.salonsdirect.com/brands/kiehl"},{"name":"Kiepe","link":"https://www.salonsdirect.com/brands/kiepe"},{"name":"Kodo","link":"https://www.salonsdirect.com/brands/kodo"},{"name":"Koleston Perfect","link":"https://www.salonsdirect.com/brands/wella-koleston-perfect"},{"name":"Kyoto","link":"https://www.salonsdirect.com/brands/kyoto"},{"name":"L'Aroma","link":"https://www.salonsdirect.com/brands/l-aroma"},{"name":"L'Oreal Professionnel","link":"https://www.salonsdirect.com/brands/l-oreal-professionnel"},{"name":"Lash FX","link":"https://www.salonsdirect.com/brands/lash-fx"},{"name":"London Beard Company","link":"https://www.salonsdirect.com/brands/london-beard-company"},{"name":"Lotus","link":"https://www.salonsdirect.com/brands/lotus"},{"name":"Lotus Essentials","link":"https://www.salonsdirect.com/brands/lotus-essentials"},{"name":"Louise Galvin","link":"https://www.salonsdirect.com/brands/louise-galvin"},{"name":"Magicap","link":"https://www.salonsdirect.com/brands/magicap"},{"name":"Magis","link":"https://www.salonsdirect.com/brands/magis"},{"name":"Majirel","link":"https://www.salonsdirect.com/brands/loreal-majirel"},{"name":"Marvel Brow","link":"https://www.salonsdirect.com/brands/marvel-brow"},{"name":"Matador","link":"https://www.salonsdirect.com/brands/matador"},{"name":"Matty","link":"https://www.salonsdirect.com/brands/matty"},{"name":"Medic","link":"https://www.salonsdirect.com/brands/medic"},{"name":"Millennium","link":"https://www.salonsdirect.com/brands/millennium"},{"name":"MineTan","link":"https://www.salonsdirect.com/brands/minetan"},{"name":"Module","link":"https://www.salonsdirect.com/brands/module"},{"name":"Mundo","link":"https://www.salonsdirect.com/brands/mundo"},{"name":"NailFX","link":"https://www.salonsdirect.com/brands/nailfx"},{"name":"NailLux","link":"https://www.salonsdirect.com/brands/naillux"},{"name":"Nails Inc","link":"https://www.salonsdirect.com/brands/nails-inc"},{"name":"NanoKeratin","link":"https://www.salonsdirect.com/brands/nanokeratin"},{"name":"Nekeze","link":"https://www.salonsdirect.com/brands/nekeze"},{"name":"Nioxin","link":"https://www.salonsdirect.com/brands/nioxin"},{"name":"Novasonic","link":"https://www.salonsdirect.com/brands/novasonic"},{"name":"NSI","link":"https://www.salonsdirect.com/brands/nsi"},{"name":"Olivia Garden","link":"https://www.salonsdirect.com/brands/olivia-garden"},{"name":"Options Essence","link":"https://www.salonsdirect.com/brands/options-essence"},{"name":"Original Slimming","link":"https://www.salonsdirect.com/brands/original-slimming"},{"name":"Orly","link":"https://www.salonsdirect.com/brands/orly"},{"name":"Orly EPIX","link":"https://www.salonsdirect.com/brands/orly-epix"},{"name":"Orly Gel FX","link":"https://www.salonsdirect.com/brands/orly-gel-fx"},{"name":"Orofluido","link":"https://www.salonsdirect.com/brands/orofluido"},{"name":"Osaka","link":"https://www.salonsdirect.com/brands/osaka"},{"name":"Osmo","link":"https://www.salonsdirect.com/brands/osmo"},{"name":"Oster","link":"https://www.salonsdirect.com/brands/oster"},{"name":"Parlux","link":"https://www.salonsdirect.com/brands/parlux"},{"name":"Pashana","link":"https://www.salonsdirect.com/brands/pashana"},{"name":"Passion","link":"https://www.salonsdirect.com/brands/passion"},{"name":"Patrick Cameron","link":"https://www.salonsdirect.com/brands/patrick-cameron"},{"name":"Pedi Sation","link":"https://www.salonsdirect.com/brands/pedi-sation"},{"name":"Peggy Sage","link":"https://www.salonsdirect.com/brands/peggy-sage"},{"name":"Permalash","link":"https://www.salonsdirect.com/brands/permalash"},{"name":"Personna","link":"https://www.salonsdirect.com/brands/personna"},{"name":"Pivot Point","link":"https://www.salonsdirect.com/brands/pivot-point"},{"name":"Pop Shots","link":"https://www.salonsdirect.com/brands/pop-shots"},{"name":"Pro","link":"https://www.salonsdirect.com/brands/pro"},{"name":"Pro Blo","link":"https://www.salonsdirect.com/brands/pro-blo"},{"name":"Pro Impressions","link":"https://www.salonsdirect.com/brands/pro-impressions"},{"name":"Pro Tan","link":"https://www.salonsdirect.com/brands/pro-tan"},{"name":"Pro Tip","link":"https://www.salonsdirect.com/brands/pro-tip"},{"name":"Procare","link":"https://www.salonsdirect.com/brands/procare"},{"name":"Proclere","link":"https://www.salonsdirect.com/brands/proclere"},{"name":"Proraso","link":"https://www.salonsdirect.com/brands/proraso"},{"name":"Purple Flame","link":"https://www.salonsdirect.com/brands/purple-flame"},{"name":"Quick + Easy","link":"https://www.salonsdirect.com/brands/quick-easy"},{"name":"Redliners","link":"https://www.salonsdirect.com/brands/redliners"},{"name":"Refectocil","link":"https://www.salonsdirect.com/brands/refectocil"},{"name":"Rejuvacote","link":"https://www.salonsdirect.com/brands/rejuvacote"},{"name":"REM","link":"https://www.salonsdirect.com/brands/rem"},{"name":"Renbow","link":"https://www.salonsdirect.com/brands/renbow"},{"name":"Retinol","link":"https://www.salonsdirect.com/brands/retinol"},{"name":"Revitalise","link":"https://www.salonsdirect.com/brands/revitalise"},{"name":"Revlon Professional","link":"https://www.salonsdirect.com/brands/revlon-professional"},{"name":"Riley","link":"https://www.salonsdirect.com/brands/riley"},{"name":"Robbo","link":"https://www.salonsdirect.com/brands/robbo"},{"name":"Rubbernex","link":"https://www.salonsdirect.com/brands/rubbernex"},{"name":"Salon Angel","link":"https://www.salonsdirect.com/brands/salon-angel"},{"name":"Salon System","link":"https://www.salonsdirect.com/brands/salon-system"},{"name":"Satin Smooth","link":"https://www.salonsdirect.com/brands/satin-smooth"},{"name":"SBC","link":"https://www.salonsdirect.com/brands/sbc"},{"name":"Schwarzkopf Professional","link":"https://www.salonsdirect.com/brands/schwarzkopf-professional"},{"name":"Scrun","link":"https://www.salonsdirect.com/brands/scrun"},{"name":"Seche","link":"https://www.salonsdirect.com/brands/seche"},{"name":"Sensor","link":"https://www.salonsdirect.com/brands/sensor"},{"name":"Sibel","link":"https://www.salonsdirect.com/brands/sibel"},{"name":"Sienna X","link":"https://www.salonsdirect.com/brands/sienna-x"},{"name":"Simply THE","link":"https://www.salonsdirect.com/brands/simply-the"},{"name":"Skin Doctors","link":"https://www.salonsdirect.com/brands/skin-doctors"},{"name":"Skin Republic","link":"https://www.salonsdirect.com/brands/skin-republic"},{"name":"SkinMate","link":"https://www.salonsdirect.com/brands/skinmate"},{"name":"Slika","link":"https://www.salonsdirect.com/brands/slika"},{"name":"Soffio","link":"https://www.salonsdirect.com/brands/soffio"},{"name":"Solar Clean","link":"https://www.salonsdirect.com/brands/solar-clean"},{"name":"Solida","link":"https://www.salonsdirect.com/brands/solida"},{"name":"Soluclean","link":"https://www.salonsdirect.com/brands/soluclean"},{"name":"Spa Essentials","link":"https://www.salonsdirect.com/brands/spa-essentials"},{"name":"Starflite","link":"https://www.salonsdirect.com/brands/starflite"},{"name":"Stargazer","link":"https://www.salonsdirect.com/brands/stargazer"},{"name":"Sterex","link":"https://www.salonsdirect.com/brands/sterex"},{"name":"Stohr","link":"https://www.salonsdirect.com/brands/stohr"},{"name":"STR","link":"https://www.salonsdirect.com/brands/str"},{"name":"Streaker","link":"https://www.salonsdirect.com/brands/streaker"},{"name":"Strictly Professional","link":"https://www.salonsdirect.com/brands/strictly-professional"},{"name":"Stylpro","link":"https://www.salonsdirect.com/brands/stylpro"},{"name":"Su-Do","link":"https://www.salonsdirect.com/brands/su-do"},{"name":"SumUp","link":"https://www.salonsdirect.com/brands/sumup"},{"name":"Super Million","link":"https://www.salonsdirect.com/brands/super-million"},{"name":"Sweet Georgia Brown","link":"https://www.salonsdirect.com/brands/sweet-georgia-brown"},{"name":"Synergy Tan","link":"https://www.salonsdirect.com/brands/synergy-tan"},{"name":"Tanning Essentials","link":"https://www.salonsdirect.com/brands/tanning-essentials"},{"name":"The Edge","link":"https://www.salonsdirect.com/brands/the-edge"},{"name":"The Original Tansie","link":"https://www.salonsdirect.com/brands/the-original-tansie"},{"name":"The Smoother","link":"https://www.salonsdirect.com/brands/the-smoother"},{"name":"The Wet Brush","link":"https://www.salonsdirect.com/brands/the-wet-brush"},{"name":"Tie Towel","link":"https://www.salonsdirect.com/brands/tie-towel"},{"name":"TIGI","link":"https://www.salonsdirect.com/brands/tigi"},{"name":"Timeless Truth","link":"https://www.salonsdirect.com/brands/timeless-truth"},{"name":"Tondeo","link":"https://www.salonsdirect.com/brands/tondeo"},{"name":"Topchic","link":"https://www.salonsdirect.com/brands/topchic"},{"name":"Triton","link":"https://www.salonsdirect.com/brands/triton"},{"name":"Trucare","link":"https://www.salonsdirect.com/brands/trucare"},{"name":"Truzone","link":"https://www.salonsdirect.com/brands/truzone"},{"name":"Tweezerman","link":"https://www.salonsdirect.com/brands/tweezerman"},{"name":"UniqOne","link":"https://www.salonsdirect.com/brands/uniqone"},{"name":"Universal","link":"https://www.salonsdirect.com/brands/universal"},{"name":"Uppercut Deluxe","link":"https://www.salonsdirect.com/brands/uppercut-deluxe"},{"name":"Vanity","link":"https://www.salonsdirect.com/brands/vanity"},{"name":"Vines","link":"https://www.salonsdirect.com/brands/vines"},{"name":"Vines Biocrin","link":"https://www.salonsdirect.com/brands/vines-biocrin"},{"name":"Vines Vintage","link":"https://www.salonsdirect.com/brands/vines-vintage"},{"name":"Vitale","link":"https://www.salonsdirect.com/brands/vitale"},{"name":"Volupturest","link":"https://www.salonsdirect.com/brands/volupturest"},{"name":"Vulsini","link":"https://www.salonsdirect.com/brands/vulsini"},{"name":"Wahl","link":"https://www.salonsdirect.com/brands/wahl"},{"name":"Wasabi","link":"https://www.salonsdirect.com/brands/wasabi"},{"name":"Washi","link":"https://www.salonsdirect.com/brands/washi"},{"name":"Wella Professionals","link":"https://www.salonsdirect.com/brands/wella-professionals"},{"name":"Wow Brows","link":"https://www.salonsdirect.com/brands/wow-brows"},{"name":"Xen-Tan","link":"https://www.salonsdirect.com/brands/xen-tan"},{"name":"Yasaka","link":"https://www.salonsdirect.com/brands/yasaka"},{"name":"YS Park","link":"https://www.salonsdirect.com/brands/ys-park"},{"name":"Zalon","link":"https://www.salonsdirect.com/brands/zalon"},{"name":"Zeosoft","link":"https://www.salonsdirect.com/brands/zeosoft"},{"name":"Zotos","link":"https://www.salonsdirect.com/brands/zotos"}]};
        return json;
    },

    //--- JSON data for A-Z listing ---
    _getAZData: function() {
        return {"name": "Products A to Z", "data": [{"name":"Accessories & Kits","link":"https://www.salonsdirect.com/beauty/lashes-brows/accessories-kits"},
        {"name":"Acetone","link":"https://www.salonsdirect.com/nails/nail-polish/acetone"},
        {"name":"All Extensions","link":"https://www.salonsdirect.com/hair/extensions-and-hair-pieces/all-extensions"},
        {"name":"All Spray Tan Solution","link":"https://www.salonsdirect.com/beauty/tanning/all-spray-tan-solution"},
        {"name":"American Crew","link":"https://www.salonsdirect.com/brands/american-crew"},
        {"name":"American Crew Colour","link":"https://www.salonsdirect.com/american-crew-precision-blend-colour"},
        {"name":"Andis","link":"https://www.salonsdirect.com/brands/andis"},
        {"name":"Aprons","link":"https://www.salonsdirect.com/hair/salon-wear-and-towels/aprons"},
        {"name":"Aromatherapy & Holistic","link":"https://www.salonsdirect.com/beauty/face-and-body/aromatherapy-holistic"},
        {"name":"Artistic Colour Gloss Gel","link":"https://www.salonsdirect.com/brands/artistic"},
        {"name":"Babyliss PRO","link":"https://www.salonsdirect.com/brands/babyliss-pro"},
        {"name":"Back Mirrors","link":"https://www.salonsdirect.com/hair/accessories/back-mirrors"},
        {"name":"Bags & Holdalls (Beauty)","link":"https://www.salonsdirect.com/beauty/salon-extras/bags-holdalls-cases"},
        {"name":"Bags & Holdalls (Hairdressing)","link":"https://www.salonsdirect.com/hair/accessories/bags-holdalls-cases"},
        {"name":"Barber Clippers","link":"https://www.salonsdirect.com/barbering/electricals/clippers"},
        {"name":"Barber Lotus Furniture","link":"https://www.salonsdirect.com/barbering/furniture/lotus-furniture"},
        {"name":"Barber Poles","link":"https://www.salonsdirect.com/barbering/furniture/barber-poles"},
        {"name":"BARBER SCISSORS","link":"https://www.salonsdirect.com/barbering/scissors"},
        {"name":"Barber Storage Units","link":"https://www.salonsdirect.com/barbering/furniture/storage-units"},
        {"name":"Barber Styling Units","link":"https://www.salonsdirect.com/barbering/furniture/styling-units"},
        {"name":"Barber Trimmers","link":"https://www.salonsdirect.com/barbering/electricals/trimmers"},
        {"name":"Barber's Chairs","link":"https://www.salonsdirect.com/furniture/barbers/barbers-chairs"},
        {"name":"Barbering Scissors","link":"https://www.salonsdirect.com/barbering/scissors/barbering-scissors-1"},
        {"name":"Barbers REM Furniture","link":"https://www.salonsdirect.com/barbering/furniture/rem"},
        {"name":"Barbers' Chairs","link":"https://www.salonsdirect.com/barbering/furniture/barbers-chairs"},
        {"name":"Barbicide","link":"https://www.salonsdirect.com/brands/barbicide"},
        {"name":"Barbicide & Hygiene","link":"https://www.salonsdirect.com/beauty/salon-essentials/barbicide-hygiene"},
        {"name":"Barbicide Solution","link":"https://www.salonsdirect.com/beauty/bestsellers/barbicide-solution"},
        {"name":"Barrier Creams","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/barrier-creams"},
        {"name":"Basins & Plumbing","link":"https://www.salonsdirect.com/furniture/hair-salon/basins-plumbing"},
        {"name":"Beauty Couches","link":"https://www.salonsdirect.com/furniture/beauty-salon/beauty-couches"},
        {"name":"BEAUTY EQUIPMENT","link":"https://www.salonsdirect.com/beauty/equipment"},
        {"name":"BEAUTY SALON","link":"https://www.salonsdirect.com/furniture/beauty-salon"},
        {"name":"Beauty Stools","link":"https://www.salonsdirect.com/furniture/beauty-salon/beauty-stools"},
        {"name":"Beauty Tools & Implements","link":"https://www.salonsdirect.com/beauty/salon-essentials/tools-implements"},
        {"name":"Beauty Towels","link":"https://www.salonsdirect.com/beauty/salon-essentials/beauty-towels"},
        {"name":"Beauty Trolleys","link":"https://www.salonsdirect.com/furniture/beauty-salon/beauty-trolleys"},
        {"name":"Blades","link":"https://www.salonsdirect.com/hair/scissors-and-razors/blades"},
        {"name":"Blankets & Sarongs","link":"https://www.salonsdirect.com/beauty/salon-essentials/blankets-sarongs"},
        {"name":"Bleach","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/bleach"},
        {"name":"BLEACH FOIL","link":"https://www.salonsdirect.com/hair-colour/bleach-foil"},
        {"name":"Body Lotions","link":"https://www.salonsdirect.com/beauty/face-and-body/body-lotions"},
        {"name":"Brows","link":"https://www.salonsdirect.com/beauty/lashes-brows/brows"},
        {"name":"Brush & Comb Cleaner","link":"https://www.salonsdirect.com/offers/hair-offers/brush-comb-cleaner-black"},
        {"name":"BRUSHES & COMBS","link":"https://www.salonsdirect.com/hair/brushes-and-combs"},
        {"name":"Bun Rings & Hair Padding","link":"https://www.salonsdirect.com/hair/accessories/bun-rings-hair-padding"},
        {"name":"Bun Rings & Rolls","link":"https://www.salonsdirect.com/hair/extensions-and-hair-pieces/bun-rings-and-rolls"},
        {"name":"Capes & Gowns","link":"https://www.salonsdirect.com/barbering/accessories/capes-gowns"},
        {"name":"Caress Cotton Wool Pads","link":"https://www.salonsdirect.com/beauty/bestsellers/caress-cotton-wool-pads"},
        {"name":"Chenice Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/chenice"},
        {"name":"Chenice Liposome","link":"https://www.salonsdirect.com/chenice-liposome-hair-color-70ml"},
        {"name":"Chenice Permanent","link":"https://www.salonsdirect.com/chenice-liposome-hair-color-70ml"},
        {"name":"Children's Chairs","link":"https://www.salonsdirect.com/furniture/hair-salon/childrens-chairs"},
        {"name":"China Glaze Polish","link":"https://www.salonsdirect.com/nails/nail-polish/china-glaze-polish"},
        {"name":"Chip & Pin Devices","link":"https://www.salonsdirect.com/hair/salon-essentials/chip-and-pin-readers-1"},
        {"name":"Clipper Accessories","link":"https://www.salonsdirect.com/hair/electricals/clipper-accessories"},
        {"name":"Clipper Blades","link":"https://www.salonsdirect.com/barbering/electricals/clipper-blades"},
        {"name":"Clippers & Trimmers","link":"https://www.salonsdirect.com/hair/electricals/clippers-trimmers"},
        {"name":"Clips, Grips, Elastics","link":"https://www.salonsdirect.com/hair/accessories/clips-pins-elastics"},
        {"name":"Clynol","link":"https://www.salonsdirect.com/brands/clynol"},
        {"name":"Clynol Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/clynol"},
        {"name":"Clynol Viton S","link":"https://www.salonsdirect.com/clynol-viton-s-60ml"},
        {"name":"Coat Racks","link":"https://www.salonsdirect.com/furniture/reception-accessories/coat-racks"},
        {"name":"Colour Accessories","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/colour-accessories"},
        {"name":"Colour Correction","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/colour-correction"},
        {"name":"Colour Refreshers","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/colour-refreshers"},
        {"name":"Colour Strengthening Systems","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/colour-strengthening-systems"},
        {"name":"Colour Swatches","link":"https://www.salonsdirect.com/hair/extensions-and-hair-pieces/colour-swatches"},
        {"name":"Colour Touch","link":"https://www.salonsdirect.com/brands/wella-colour-touch"},
        {"name":"Conditioner","link":"https://www.salonsdirect.com/barbering/grooming-styling/conditioner"},
        {"name":"Cotton Wool & Tissues","link":"https://www.salonsdirect.com/beauty/salon-consumables/cotton-wool-tissues"},
        {"name":"Couch Covers","link":"https://www.salonsdirect.com/beauty/salon-essentials/couch-covers"},
        {"name":"Couch Roll","link":"https://www.salonsdirect.com/beauty/salon-consumables/couch-roll"},
        {"name":"Crazy Angel Solution","link":"https://www.salonsdirect.com/beauty/tanning/crazy-angel-solution"},
        {"name":"Crazy Color Hair Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/crazy-color"},
        {"name":"Crazy Color Semi Permanent","link":"https://www.salonsdirect.com/hair-colour/semi-permanent-colour/crazy-color"},
        {"name":"Curling Tools","link":"https://www.salonsdirect.com/hair/electricals/curling-tools"},
        {"name":"Cuticle Removers","link":"https://www.salonsdirect.com/nails/nail-accessories/cuticle-remover"},
        {"name":"Cuticle Treatments","link":"https://www.salonsdirect.com/nails/nail-accessories/cuticle-treatments"},
        {"name":"Cutting Collars","link":"https://www.salonsdirect.com/hair/salon-wear-and-towels/cutting-collars"},
        {"name":"DAX","link":"https://www.salonsdirect.com/brands/dax"},
        {"name":"Dia Richesse","link":"https://www.salonsdirect.com/brands/dia-richesse"},
        {"name":"Display Stands","link":"https://www.salonsdirect.com/hair/brushes-and-combs/display-stands"},
        {"name":"Disposable Gloves","link":"https://www.salonsdirect.com/beauty/bestsellers/disposable-gloves"},
        {"name":"Disposable Make Up Accessories","link":"https://www.salonsdirect.com/beauty/salon-consumables/disposable-make-up-accessories"},
        {"name":"Disposable Salon Wear","link":"https://www.salonsdirect.com/beauty/salon-consumables/disposable-salon-wear"},
        {"name":"Disposables","link":"https://www.salonsdirect.com/hair/salon-wear-and-towels/disposables"},
        {"name":"Diva PRO Styling","link":"https://www.salonsdirect.com/brands/diva-pro-styling"},
        {"name":"Ear Candles","link":"https://www.salonsdirect.com/offers/beauty-offers/ear-candles-1-off"},
        {"name":"Ear Piercing","link":"https://www.salonsdirect.com/beauty/salon-extras/ear-piercing"},
        {"name":"Education","link":"https://www.salonsdirect.com/hair/salon-essentials/education"},
        {"name":"Elchim","link":"https://www.salonsdirect.com/brands/elchim"},
        {"name":"Elchim Hairdryers","link":"https://www.salonsdirect.com/hair/bestsellers/elchim-hairdryers"},
        {"name":"ELECTRICALS","link":"https://www.salonsdirect.com/hair/electricals"},
        {"name":"Electrolysis","link":"https://www.salonsdirect.com/beauty/hair-removal/electrolysis"},
        {"name":"EXTENSIONS & HAIR PIECES","link":"https://www.salonsdirect.com/hair/extensions-and-hair-pieces"},
        {"name":"Ez Flow Acrylic","link":"https://www.salonsdirect.com/nails/nail-extensions/ez-flow-acrylic"},
        {"name":"FACE & BODY","link":"https://www.salonsdirect.com/beauty/face-and-body"},
        {"name":"Facial Steamers","link":"https://www.salonsdirect.com/beauty/equipment/facial-steamers"},
        {"name":"Files & Buffers","link":"https://www.salonsdirect.com/nails/nail-accessories/files-and-buffers"},
        {"name":"Foil & Dispensers","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/foil-and-dispensers"},
        {"name":"Foot Spas and Pedi Bowls","link":"https://www.salonsdirect.com/nails/manicure-pedicure/foot-spas-and-pedi-bowls"},
        {"name":"Footrests","link":"https://www.salonsdirect.com/furniture/hair-salon/footrests"},
        {"name":"Framar","link":"https://www.salonsdirect.com/brands/framar"},
        {"name":"FURNITURE","link":"https://www.salonsdirect.com/barbering/furniture"},
        {"name":"GEL POLISH & SOAK OFF","link":"https://www.salonsdirect.com/nails/gel-polish-soak-off"},
        {"name":"Gel Removal & Accessories","link":"https://www.salonsdirect.com/nails/gel-polish-soak-off/gel-removal-and-accessories"},
        {"name":"Gellux","link":"https://www.salonsdirect.com/brands/gellux"},
        {"name":"Gellux Polish","link":"https://www.salonsdirect.com/nails/gel-polish-soak-off/gellux"},
        {"name":"Gellux Pro Polish","link":"https://www.salonsdirect.com/nails/nail-polish/gellux-pro-polish"},
        {"name":"Gellux Profile","link":"https://www.salonsdirect.com/nails/nail-extensions/gellux-profile"},
        {"name":"Gloves","link":"https://www.salonsdirect.com/beauty/salon-consumables/gloves"},
        {"name":"Goldwell Colorance","link":"https://www.salonsdirect.com/hair-colour/semi-permanent-colour/goldwell-colorance-cans"},
        {"name":"Goldwell Oxycur Bleach","link":"https://www.salonsdirect.com/hair-colour/bestsellers/goldwell-oxycur-bleach"},
        {"name":"Goldwell Professional","link":"https://www.salonsdirect.com/brands/goldwell-professional"},
        {"name":"Goldwell Professional Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/goldwell"},
        {"name":"Goldwell Topchic","link":"https://www.salonsdirect.com/hair-colour/permanent-colour/goldwell-topchic-cans-1"},
        {"name":"GROOMING & STYLING","link":"https://www.salonsdirect.com/barbering/grooming-styling"},
        {"name":"HAIR CARE & PERMING","link":"https://www.salonsdirect.com/hair/hair-care-perming"},
        {"name":"HAIR COLOUR","link":"https://www.salonsdirect.com/hair-colour"},
        {"name":"HAIR COLOUR BRANDS","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands"},
        {"name":"Hair Extension Accessories","link":"https://www.salonsdirect.com/hair/extensions-and-hair-pieces/accessories"},
        {"name":"Hair Loss","link":"https://www.salonsdirect.com/hair/hair-care-perming/hair-loss"},
        {"name":"Hair Loss & Nioxin","link":"https://www.salonsdirect.com/hair/hair-care-perming/hair-loss-nioxin"},
        {"name":"Hair Oils & Treatments","link":"https://www.salonsdirect.com/hair/hair-care-perming/oils-and-treatments"},
        {"name":"Hair Pieces & Wefts","link":"https://www.salonsdirect.com/hair/extensions-and-hair-pieces/hair-pieces-and-wefts"},
        {"name":"HAIR REMOVAL","link":"https://www.salonsdirect.com/beauty/hair-removal"},
        {"name":"Hair Removal Pre & After Care","link":"https://www.salonsdirect.com/beauty/hair-removal/pre-after-care"},
        {"name":"Hair Rollers","link":"https://www.salonsdirect.com/hair/accessories/hair-rollers"},
        {"name":"HAIR SALON","link":"https://www.salonsdirect.com/furniture/hair-salon"},
        {"name":"Hair Salon Accessories","link":"https://www.salonsdirect.com/furniture/hair-salon/accessories"},
        {"name":"Hair Straightening","link":"https://www.salonsdirect.com/hair/hair-care-perming/straightening"},
        {"name":"Hair Tools","link":"https://www.salonsdirect.com/brands/hair-tools"},
        {"name":"Hairdressing Brushes","link":"https://www.salonsdirect.com/hair/brushes-and-combs/brushes"},
        {"name":"Hairdressing Combs","link":"https://www.salonsdirect.com/hair/brushes-and-combs/combs"},
        {"name":"Hairdressing Gowns","link":"https://www.salonsdirect.com/hair/salon-wear-and-towels/hairdressing-gowns"},
        {"name":"Hairdressing Neck Brushes","link":"https://www.salonsdirect.com/hair/brushes-and-combs/neck-brushes"},
        {"name":"Hairdressing Scissors","link":"https://www.salonsdirect.com/hair/scissors-and-razors/hairdressing-scissors"},
        {"name":"Hairdressing Towels","link":"https://www.salonsdirect.com/hair/salon-wear-and-towels/hairdressing-towels"},
        {"name":"Hairdressing Trolleys","link":"https://www.salonsdirect.com/furniture/hair-salon/hairdressing-trolleys"},
        {"name":"Hairdryers & Diffusers","link":"https://www.salonsdirect.com/hair/electricals/hairdryers-and-diffusers"},
        {"name":"Head Jog","link":"https://www.salonsdirect.com/brands/head-jog"},
        {"name":"Health & Safety","link":"https://www.salonsdirect.com/hair/salon-essentials/health-and-safety"},
        {"name":"Heated Blankets","link":"https://www.salonsdirect.com/beauty/equipment/heated-blankets"},
        {"name":"Heated Mitts & Boots","link":"https://www.salonsdirect.com/beauty/manicure-pedicure/heated-mitts-boots"},
        {"name":"Heated Rollers","link":"https://www.salonsdirect.com/hair/electricals/heated-rollers"},
        {"name":"Heaters & Kits","link":"https://www.salonsdirect.com/beauty/hair-removal/heaters-kits"},
        {"name":"Highlighting Caps","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/highlighting-caps"},
        {"name":"Hive","link":"https://www.salonsdirect.com/brands/hive"},
        {"name":"Hood Dryers & Processors","link":"https://www.salonsdirect.com/hair/electricals/hood-dryers-and-processors"},
        {"name":"Hot Stone Heaters","link":"https://www.salonsdirect.com/beauty/equipment/hot-stone-heaters"},
        {"name":"Hot Stone Therapy","link":"https://www.salonsdirect.com/beauty/face-and-body/hot-stone-therapy"},
        {"name":"Hot Towel Cabinets","link":"https://www.salonsdirect.com/beauty/equipment/hot-towel-cabinets"},
        {"name":"Hot Towel Steamers","link":"https://www.salonsdirect.com/barbering/shaving-razors/hot-towel-steamers"},
        {"name":"Hygiene","link":"https://www.salonsdirect.com/barbering/accessories/hygiene"},
        {"name":"ibd","link":"https://www.salonsdirect.com/brands/ibd"},
        {"name":"ibd Extensions","link":"https://www.salonsdirect.com/nails/nail-extensions/ibd"},
        {"name":"ibd Just Gel","link":"https://www.salonsdirect.com/nails/gel-polish-soak-off/ibd-just-gel"},
        {"name":"ibd Nail Polish","link":"https://www.salonsdirect.com/nails/nail-polish/ibd"},
        {"name":"Individual Lashes","link":"https://www.salonsdirect.com/beauty/lashes-brows/individual-lashes"},
        {"name":"Indola Bleach","link":"https://www.salonsdirect.com/hair-colour/bestsellers/indola-bleach"},
        {"name":"Indola Colour Mousse","link":"https://www.salonsdirect.com/indola-colour-mousse-200ml"},
        {"name":"Indola Hair Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/indola"},
        {"name":"Indola Profession","link":"https://www.salonsdirect.com/indola-profession-60ml"},
        {"name":"INOA","link":"https://www.salonsdirect.com/brands/loreal-inoa"},
        {"name":"Jaguar","link":"https://www.salonsdirect.com/brands/jaguar"},
        {"name":"Jaguar Scissors","link":"https://www.salonsdirect.com/hair/bestsellers/jaguar-scissors"},
        {"name":"Joewell","link":"https://www.salonsdirect.com/brands/joewell"},
        {"name":"Joewell Scissors","link":"https://www.salonsdirect.com/hair/bestsellers/joewell-scissors"},
        {"name":"Kaeso","link":"https://www.salonsdirect.com/brands/kaeso"},
        {"name":"Keratin Systems","link":"https://www.salonsdirect.com/brands/nanokeratin"},
        {"name":"Koleston Perfect","link":"https://www.salonsdirect.com/brands/wella-koleston-perfect"},
        {"name":"L'Oreal Colorful Hair","link":"https://www.salonsdirect.com/l-oreal-colorful-hair-90ml"},
        {"name":"L'Oreal Dia Light","link":"https://www.salonsdirect.com/l-oreal-dia-light-50ml"},
        {"name":"L'Oreal Dia Richesse","link":"https://www.salonsdirect.com/l-oreal-dia-richesse-50ml"},
        {"name":"L'Oreal Easi Meche","link":"https://www.salonsdirect.com/hair-colour/bestsellers/l-oreal-easi-meche"},
        {"name":"L'Oréal INOA","link":"https://www.salonsdirect.com/brands/loreal-inoa"},
        {"name":"L'Oréal Majirel","link":"https://www.salonsdirect.com/hair-colour/permanent-colour/l-oreal-majirel"},
        {"name":"L'Oreal Professionnel","link":"https://www.salonsdirect.com/brands/l-oreal-professionnel"},
        {"name":"L'Oréal Professionnel","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/l-oreal-professionnel"},
        {"name":"Lamps & Accessories","link":"https://www.salonsdirect.com/nails/nail-extensions/lamps-and-accessories"},
        {"name":"Lamps & Bulbs","link":"https://www.salonsdirect.com/beauty/equipment/lamps-bulbs"},
        {"name":"Lash & Brow Tinting","link":"https://www.salonsdirect.com/beauty/lashes-brows/lash-brow-tinting"},
        {"name":"Lash FX","link":"https://www.salonsdirect.com/brands/lash-fx"},
        {"name":"Lash Perming","link":"https://www.salonsdirect.com/beauty/lashes-brows/lash-perming"},
        {"name":"LASHES & BROWS","link":"https://www.salonsdirect.com/beauty/lashes-brows"},
        {"name":"Left Handed Scissors","link":"https://www.salonsdirect.com/barbering/scissors/left-handed-scissors"},
        {"name":"Lotus","link":"https://www.salonsdirect.com/brands/lotus"},
        {"name":"Lotus Creme Peroxide","link":"https://www.salonsdirect.com/hair-colour/bestsellers/lotus-creme-peroxide"},
        {"name":"Lotus Crème Wax","link":"https://www.salonsdirect.com/beauty/bestsellers/lotus-creme-wax"},
        {"name":"Lotus Essentials","link":"https://www.salonsdirect.com/brands/lotus-essentials"},
        {"name":"Lotus Essentials Eyelash Tint","link":"https://www.salonsdirect.com/beauty/bestsellers/lotus-essentials-eyelash-tint"},
        {"name":"Lotus Essentials Honey Wax","link":"https://www.salonsdirect.com/beauty/bestsellers/lotus-essentials-honey-wax"},
        {"name":"Lotus Foil","link":"https://www.salonsdirect.com/hair-colour/bestsellers/lotus-foil"},
        {"name":"Lotus Furniture","link":"https://www.salonsdirect.com/barbering/furniture/lotus-furniture"},
        {"name":"Lotus Low Dust Bleach","link":"https://www.salonsdirect.com/hair-colour/bestsellers/lotus-low-dust-bleach"},
        {"name":"Lotus Wax","link":"https://www.salonsdirect.com/beauty/hair-removal/lotus-wax"},
        {"name":"Lotus Waxing Strips & Spatulas","link":"https://www.salonsdirect.com/beauty/bestsellers/lotus-waxing-strips-spatulas"},
        {"name":"Magazine Racks","link":"https://www.salonsdirect.com/furniture/reception-accessories/magazine-racks"},
        {"name":"Majirel","link":"https://www.salonsdirect.com/brands/loreal-majirel"},
        {"name":"Make Up","link":"https://www.salonsdirect.com/beauty/face-and-body/make-up"},
        {"name":"MANICURE & PEDICURE","link":"https://www.salonsdirect.com/nails/manicure-pedicure"},
        {"name":"Manicure Kits","link":"https://www.salonsdirect.com/nails/manicure-pedicure/manicure-kits"},
        {"name":"Manicure Products","link":"https://www.salonsdirect.com/nails/manicure-pedicure/manicure-products"},
        {"name":"Manicure Stools","link":"https://www.salonsdirect.com/furniture/nail-salon/manicure-stools"},
        {"name":"Manicure Tables","link":"https://www.salonsdirect.com/furniture/nail-salon/manicure-tables"},
        {"name":"Massage Oils","link":"https://www.salonsdirect.com/beauty/face-and-body/massage-oils"},
        {"name":"Massage Tables","link":"https://www.salonsdirect.com/furniture/beauty-salon/massage-tables"},
        {"name":"Meche","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/meche"},
        {"name":"Meche & Foam","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/meche-foam"},
        {"name":"Men's Hair Colour","link":"https://www.salonsdirect.com/barbering/grooming-styling/hair-colour"},
        {"name":"Men's Hairdryers","link":"https://www.salonsdirect.com/barbering/electricals/hairdryers"},
        {"name":"Mens Styling Products","link":"https://www.salonsdirect.com/barbering/grooming-styling/styling-products"},
        {"name":"Millennium Nails Extensions","link":"https://www.salonsdirect.com/nails/nail-extensions/millennium-nails"},
        {"name":"MineTan","link":"https://www.salonsdirect.com/brands/minetan"},
        {"name":"Mirror Chrome Nail Powders","link":"https://www.salonsdirect.com/nails/nail-accessories/mirror-chrome-nail-powders"},
        {"name":"Moustache & Beard Care","link":"https://www.salonsdirect.com/barbering/grooming-styling/moustache-beard-care"},
        {"name":"NAIL ACCESSORIES","link":"https://www.salonsdirect.com/nails/nail-accessories"},
        {"name":"Nail Art","link":"https://www.salonsdirect.com/nails/nail-accessories/nail-art"},
        {"name":"NAIL EXTENSIONS","link":"https://www.salonsdirect.com/nails/nail-extensions"},
        {"name":"Nail FX Soak Off Gel","link":"https://www.salonsdirect.com/brands/nailfx"},
        {"name":"Nail Implements & Tools","link":"https://www.salonsdirect.com/nails/nail-accessories/implements-and-tools"},
        {"name":"NAIL POLISH","link":"https://www.salonsdirect.com/nails/nail-polish"},
        {"name":"NAIL SALON","link":"https://www.salonsdirect.com/furniture/nail-salon"},
        {"name":"Nail Salon Accessories","link":"https://www.salonsdirect.com/furniture/nail-salon/nail-salon-accessories"},
        {"name":"Nail Tips","link":"https://www.salonsdirect.com/nails/nail-extensions/nail-tips"},
        {"name":"Nail Treatments","link":"https://www.salonsdirect.com/nails/nail-accessories/nail-treatments"},
        {"name":"Nails Inc","link":"https://www.salonsdirect.com/brands/nails-inc"},
        {"name":"Nails Inc Polish","link":"https://www.salonsdirect.com/nails/nail-polish/nails-inc"},
        {"name":"NanoKeratin","link":"https://www.salonsdirect.com/brands/nanokeratin"},
        {"name":"Neck Brushes & Combs","link":"https://www.salonsdirect.com/barbering/accessories/neck-brushes-combs"},
        {"name":"Nioxin","link":"https://www.salonsdirect.com/brands/nioxin"},
        {"name":"NSI","link":"https://www.salonsdirect.com/brands/nsi"},
        {"name":"NSI Nail Extensions","link":"https://www.salonsdirect.com/nails/nail-extensions/nsi"},
        {"name":"NSI Secrets Removable Gel System","link":"https://www.salonsdirect.com/nails/gel-polish-soak-off/nsi-secrets-removable-gel-system"},
        {"name":"Orly","link":"https://www.salonsdirect.com/brands/orly"},
        {"name":"Orly Breathable","link":"https://www.salonsdirect.com/nails/nail-polish/orly-breathable"},
        {"name":"Orly Epix","link":"https://www.salonsdirect.com/brands/orly-epix"},
        {"name":"Orly Gel FX","link":"https://www.salonsdirect.com/nails/gel-polish-soak-off/orly-gel-fx"},
        {"name":"Orly Nail Polish","link":"https://www.salonsdirect.com/nails/nail-polish/orly"},
        {"name":"OSMO Hair Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/osmo"},
        {"name":"Oster","link":"https://www.salonsdirect.com/barbering/top-brands/oster"},
        {"name":"Paraffin Wax","link":"https://www.salonsdirect.com/beauty/manicure-pedicure/paraffin-wax"},
        {"name":"Parlux","link":"https://www.salonsdirect.com/brands/parlux"},
        {"name":"Parlux Hairdryers","link":"https://www.salonsdirect.com/brands/parlux"},
        {"name":"Pashana","link":"https://www.salonsdirect.com/brands/pashana"},
        {"name":"Pedicure Chairs","link":"https://www.salonsdirect.com/furniture/nail-salon/pedicure-chairs"},
        {"name":"Pedicure Kits","link":"https://www.salonsdirect.com/nails/manicure-pedicure/pedicure-kits"},
        {"name":"Pedicure Products","link":"https://www.salonsdirect.com/nails/manicure-pedicure/pedicure-products"},
        {"name":"Pedicure Stools","link":"https://www.salonsdirect.com/furniture/beauty-salon/pedicure-stools"},
        {"name":"Peggy Sage","link":"https://www.salonsdirect.com/brands/peggy-sage"},
        {"name":"PERMANENT COLOUR","link":"https://www.salonsdirect.com/hair-colour/permanent-colour"},
        {"name":"Permanent Shade Charts","link":"https://www.salonsdirect.com/hair-colour/permanent-colour/shade-charts"},
        {"name":"Perming","link":"https://www.salonsdirect.com/hair/hair-care-perming/perming"},
        {"name":"Peroxide & Developers","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/peroxide-developers"},
        {"name":"Portable Nail Tables","link":"https://www.salonsdirect.com/furniture/nail-salon/portable-manicure-tables"},
        {"name":"Post Shave","link":"https://www.salonsdirect.com/barbering/shaving-razors/post-shave"},
        {"name":"Pouches & Accessories","link":"https://www.salonsdirect.com/hair/scissors-and-razors/pouches-and-accessories"},
        {"name":"Pre Shave","link":"https://www.salonsdirect.com/barbering/shaving-razors/pre-shave"},
        {"name":"Pro Impressions Extensions","link":"https://www.salonsdirect.com/nails/nail-extensions/pro-impressions"},
        {"name":"Procare","link":"https://www.salonsdirect.com/brands/procare"},
        {"name":"Procare Foil","link":"https://www.salonsdirect.com/hair/bestsellers/procare-foil"},
        {"name":"Procare Foil Dispenser","link":"https://www.salonsdirect.com/hair-colour/bestsellers/procare-foil-dispenser"},
        {"name":"Professional Razors & Blades","link":"https://www.salonsdirect.com/barbering/shaving-razors/razors-blades"},
        {"name":"Profile","link":"https://www.salonsdirect.com/nails/nail-extensions/salon-system-profile"},
        {"name":"Proraso","link":"https://www.salonsdirect.com/brands/proraso"},
        {"name":"Razors","link":"https://www.salonsdirect.com/hair/scissors-and-razors/razors"},
        {"name":"RECEPTION & ACCESSORIES","link":"https://www.salonsdirect.com/furniture/reception-accessories"},
        {"name":"Reception Accessories","link":"https://www.salonsdirect.com/furniture/reception-accessories/accessories"},
        {"name":"Reception Chairs","link":"https://www.salonsdirect.com/furniture/reception-accessories/reception-chairs"},
        {"name":"Reception Desks","link":"https://www.salonsdirect.com/furniture/reception-accessories/reception-desks"},
        {"name":"Refectocil","link":"https://www.salonsdirect.com/brands/refectocil"},
        {"name":"Refectocil Lash & Brow Tint","link":"https://www.salonsdirect.com/beauty/bestsellers/refectocil-lash-brow-tint"},
        {"name":"REM","link":"https://www.salonsdirect.com/brands/rem"},
        {"name":"Renbow Colorissimo","link":"https://www.salonsdirect.com/renbow-colorissimo-100ml"},
        {"name":"Renbow Hair Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/renbow"},
        {"name":"Retail Ranges","link":"https://www.salonsdirect.com/hair/salon-essentials/retail-ranges"},
        {"name":"Revlon Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/revlon"},
        {"name":"Revlon Professional","link":"https://www.salonsdirect.com/brands/revlon-professional"},
        {"name":"Revlonissimo Colorsmetique","link":"https://www.salonsdirect.com/revlonissimo-colorsmetique-60ml"},
        {"name":"Robes & Slippers","link":"https://www.salonsdirect.com/beauty/salon-extras/robes-slippers"},
        {"name":"Salon Backwash Units","link":"https://www.salonsdirect.com/furniture/hair-salon/salon-backwash-units"},
        {"name":"Salon Chairs","link":"https://www.salonsdirect.com/furniture/hair-salon/salon-chairs"},
        {"name":"SALON CONSUMABLES","link":"https://www.salonsdirect.com/beauty/salon-consumables"},
        {"name":"SALON ESSENTIALS","link":"https://www.salonsdirect.com/hair/salon-essentials"},
        {"name":"SALON ESSENTIALS","link":"https://www.salonsdirect.com/beauty/salon-essentials"},
        {"name":"SALON EXTRAS","link":"https://www.salonsdirect.com/beauty/salon-extras"},
        {"name":"Salon Hygiene","link":"https://www.salonsdirect.com/hair/salon-essentials/salon-hygiene"},
        {"name":"Salon Retail Stands","link":"https://www.salonsdirect.com/furniture/reception-accessories/salon-retail-stands"},
        {"name":"Salon System","link":"https://www.salonsdirect.com/brands/salon-system"},
        {"name":"Salon System Individual Lashes","link":"https://www.salonsdirect.com/beauty/bestsellers/salon-system-individual-lashes"},
        {"name":"Salon Uniform","link":"https://www.salonsdirect.com/hair/salon-wear-and-towels/salon-uniform"},
        {"name":"SALON WEAR & TOWELS","link":"https://www.salonsdirect.com/hair/salon-wear-and-towels"},
        {"name":"Satin Smooth","link":"https://www.salonsdirect.com/brands/satin-smooth"},
        {"name":"Schwarzkopf BLONDME","link":"https://www.salonsdirect.com/hair-colour/permanent-colour/schwarzkopf-blondme"},
        {"name":"Schwarzkopf Igora Colorworx","link":"https://www.salonsdirect.com/hair-colour/semi-permanent-colour/schwarzkopf-igora-colorworx"},
        {"name":"Schwarzkopf Igora Royal","link":"https://www.salonsdirect.com/hair-colour/permanent-colour/schwarzkopf-igora-royal-1"},
        {"name":"Schwarzkopf Igora Vibrance","link":"https://www.salonsdirect.com/schwarzkopf-igora-vibrance-60ml"},
        {"name":"Schwarzkopf Professional","link":"https://www.salonsdirect.com/brands/schwarzkopf-professional"},
        {"name":"Schwarzkopf Professional Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/schwarzkopf-professional"},
        {"name":"Scissor Sets","link":"https://www.salonsdirect.com/hair/scissors-and-razors/scissor-sets"},
        {"name":"SCISSORS & RAZORS","link":"https://www.salonsdirect.com/hair/scissors-and-razors"},
        {"name":"Seche","link":"https://www.salonsdirect.com/brands/seche"},
        {"name":"Semi Permanent Lashes","link":"https://www.salonsdirect.com/beauty/lashes-brows/semi-permanent-lashes"},
        {"name":"SEMI-PERMANENT COLOUR","link":"https://www.salonsdirect.com/hair-colour/semi-permanent-colour"},
        {"name":"Semi-Permanent Shade Charts","link":"https://www.salonsdirect.com/hair-colour/semi-permanent-colour/shade-charts"},
        {"name":"Shampoo","link":"https://www.salonsdirect.com/barbering/grooming-styling/shampoo"},
        {"name":"Shampoo Conditioner & Masks","link":"https://www.salonsdirect.com/hair/hair-care-perming/shampoo-conditioner-and-masks"},
        {"name":"SHAVING & RAZORS","link":"https://www.salonsdirect.com/barbering/shaving-razors"},
        {"name":"Shaving Accessories","link":"https://www.salonsdirect.com/barbering/shaving-razors/shaving-accessories"},
        {"name":"Shaving Brushes","link":"https://www.salonsdirect.com/barbering/shaving-razors/shaving-brushes"},
        {"name":"Sienna X","link":"https://www.salonsdirect.com/brands/sienna-x"},
        {"name":"Sienna X Wax","link":"https://www.salonsdirect.com/beauty/bestsellers/sienna-x-wax"},
        {"name":"Silhouette Hairspray","link":"https://www.salonsdirect.com/hair/bestsellers/silhouette-hairspray"},
        {"name":"Skincare","link":"https://www.salonsdirect.com/beauty/face-and-body/skincare"},
        {"name":"Slimming & Body Wraps","link":"https://www.salonsdirect.com/beauty/face-and-body/slimming-body-wraps"},
        {"name":"Spatulas","link":"https://www.salonsdirect.com/beauty/bestsellers/waxing-spatulas"},
        {"name":"Specialist Machines","link":"https://www.salonsdirect.com/beauty/equipment/specialist-machines"},
        {"name":"Sponges & Mitts","link":"https://www.salonsdirect.com/beauty/salon-consumables/sponges-and-mitts"},
        {"name":"Spray Tan Machines & Tents","link":"https://www.salonsdirect.com/beauty/tanning/spray-tan-machines-tents"},
        {"name":"Spray Tanning Kits","link":"https://www.salonsdirect.com/beauty/tanning/kits"},
        {"name":"Stain Removers","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/stain-removers"},
        {"name":"Stargazer Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/stargazer"},
        {"name":"Stargazer Hair Rinse","link":"https://www.salonsdirect.com/stargazer-semi-permanent-hair-rinse-70ml"},
        {"name":"Starter Kits","link":"https://www.salonsdirect.com/hair/extensions-and-hair-pieces/starter-kits"},
        {"name":"Stationery","link":"https://www.salonsdirect.com/beauty/salon-extras/stationery"},
        {"name":"Sterilisers","link":"https://www.salonsdirect.com/beauty/equipment/sterilisers"},
        {"name":"Stools","link":"https://www.salonsdirect.com/furniture/hair-salon/stools"},
        {"name":"Storage Units","link":"https://www.salonsdirect.com/furniture/reception-accessories/storage-units"},
        {"name":"Straighteners","link":"https://www.salonsdirect.com/hair/electricals/straighteners"},
        {"name":"Strip Lashes","link":"https://www.salonsdirect.com/beauty/lashes-brows/strip-lashes"},
        {"name":"Styling Products","link":"https://www.salonsdirect.com/hair/hair-care-perming/styling-products"},
        {"name":"Styling Units","link":"https://www.salonsdirect.com/furniture/hair-salon/styling-units"},
        {"name":"Tan Accelerators","link":"https://www.salonsdirect.com/beauty/tanning/tan-accelerators"},
        {"name":"TANNING","link":"https://www.salonsdirect.com/beauty/tanning"},
        {"name":"Tanning Accessories","link":"https://www.salonsdirect.com/beauty/tanning/tanning-accessories"},
        {"name":"The Edge Nail Polish","link":"https://www.salonsdirect.com/nails/nail-polish/the-edge"},
        {"name":"The Edge Nails","link":"https://www.salonsdirect.com/nails/nail-extensions/the-edge-nails"},
        {"name":"Thinning Scissors","link":"https://www.salonsdirect.com/hair/scissors-and-razors/thinning-scissors"},
        {"name":"Threading","link":"https://www.salonsdirect.com/beauty/hair-removal/threading"},
        {"name":"TIGI","link":"https://www.salonsdirect.com/brands/tigi"},
        {"name":"TIGI Bed Head","link":"https://www.salonsdirect.com/barbering/top-brands/tigi-bed-head"},
        {"name":"TIGI Copyright Colour","link":"https://www.salonsdirect.com/hair-colour/permanent-colour/tigi-copyright-colour"},
        {"name":"TIGI Copyright Colour Gloss","link":"https://www.salonsdirect.com/tigi-copyright-colour-gloss-60ml"},
        {"name":"TIGI Hair Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/tigi"},
        {"name":"Tint Bowls & Brushes","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/tint-bowls-brushes"},
        {"name":"Tint Stands","link":"https://www.salonsdirect.com/furniture/hair-salon/tint-stands"},
        {"name":"Tinting Trolleys & Stands","link":"https://www.salonsdirect.com/hair-colour/bleach-foil/tinting-trolleys-stands"},
        {"name":"Tonics","link":"https://www.salonsdirect.com/barbering/grooming-styling/tonics"},
        {"name":"TOP BRANDS","link":"https://www.salonsdirect.com/barbering/top-brands"},
        {"name":"Topchic","link":"https://www.salonsdirect.com/brands/topchic"},
        {"name":"Topcoats & Basecoats","link":"https://www.salonsdirect.com/nails/nail-polish/topcoats-basecoats-primers"},
        {"name":"Towel Storage","link":"https://www.salonsdirect.com/furniture/beauty-salon/towel-storage"},
        {"name":"Towels","link":"https://www.salonsdirect.com/barbering/accessories/towels"},
        {"name":"Training Heads","link":"https://www.salonsdirect.com/hair/bestsellers/training-heads"},
        {"name":"Training Tools","link":"https://www.salonsdirect.com/nails/nail-accessories/training-tools"},
        {"name":"Trolleys","link":"https://www.salonsdirect.com/beauty/salon-extras/trolleys"},
        {"name":"Uniform","link":"https://www.salonsdirect.com/beauty/salon-extras/salon-uniform"},
        {"name":"UV & LED Lamps","link":"https://www.salonsdirect.com/nails/gel-polish-soak-off/uv-and-led-lamps"},
        {"name":"Vines Vintage","link":"https://www.salonsdirect.com/brands/vines-vintage"},
        {"name":"Vitale Colour Mousse","link":"https://www.salonsdirect.com/vitale-color-mousse-200ml"},
        {"name":"Vitale Hair Colour","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/vitale"},
        {"name":"Wahl","link":"https://www.salonsdirect.com/brands/wahl"},
        {"name":"Wahl Clippers","link":"https://www.salonsdirect.com/hair/bestsellers/wahl-clippers"},
        {"name":"Watersprays","link":"https://www.salonsdirect.com/hair/accessories/watersprays"},
        {"name":"Wax","link":"https://www.salonsdirect.com/beauty/hair-removal/wax"},
        {"name":"Waxing Strips & Spatulas","link":"https://www.salonsdirect.com/beauty/hair-removal/waxing-strips-spatulas"},
        {"name":"Wella Blondor Powder","link":"https://www.salonsdirect.com/hair-colour/bestsellers/wella-blondor-powder"},
        {"name":"Wella Color Fresh","link":"https://www.salonsdirect.com/wella-color-fresh-75ml"},
        {"name":"Wella Color Touch","link":"https://www.salonsdirect.com/hair-colour/semi-permanent-colour/wella-color-touch-1"},
        {"name":"Wella Koleston Perfect","link":"https://www.salonsdirect.com/brands/wella-koleston-perfect"},
        {"name":"Wella Professionals","link":"https://www.salonsdirect.com/hair-colour/hair-colour-brands/wella-professionals"},
        {"name":"Wella Welloxon Perfect","link":"https://www.salonsdirect.com/hair-colour/bestsellers/wella-welloxon-perfect"},
        {"name":"Xen Tan Solution","link":"https://www.salonsdirect.com/brands/xen-tan"},
        {"name":"YS Park","link":"https://www.salonsdirect.com/brands/ys-park"}]};
    },
    
    //--- Run menu module ---
    init: function() {
        this._cacheDom();
        
        var json = {};
        json.categories = this._getCategoryData();
        json.brands = this._getBrandsData();
        json.az = this._getAZData();

        return json;
    }
};