var _MP040 = (function () {

    // PLUGINS ------------------------------------

    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Send GA Events With Tracker Name -----------
    // ---------------------------------------------
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    // Full Story Tagging --------------------------
    // ---------------------------------------------
    UC.poller([
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'MP040',
            variation_str: 'Variation 1 All'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], activate);
    })();

    // ---------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('MP040');

        // ------------------------------------------------------------------------------------------------------------
        // -------------------------------------------TRIGGERS---------------------------------------------------------
        // ------------------------------------------------------------------------------------------------------------
        var url = window.location.href, usp;
        if (/^https?:\/\/www\.mamasandpapas\.com\/en-gb\/search\/?(\?.*)?(\#.*)?$/.test(url) || window.location.href.match('https://www.mamasandpapas.com/en-gb/c/')) {
            var searchGroups = {
                beds: {
                    type: 'contains',
                    terms: ['cot', 'cots', 'cot bed', 'cot beds', 'cotbed', 'toddler bed', 'bed', 'beds'],
                    usp: 'Cot converts to a subtle sleigh-design bed.'
                },
                wardrobes: {
                    type: 'contains',
                    terms: ['wardrobe', 'wardrobes', 'clothing rail', 'clothes rail', 'storage', 'white wardrobe'],
                    usp: 'Sturdy, full-size wardrobe. Built to last.'
                },
                drawers: {
                    type: 'contains',
                    terms: ['drawers', 'changer', 'dresser', 'chest of drawers', 'check of drawers', 'mia drawers', 'white drawers', 'changing drawers', 'cot top changer', 'changer', 'dresser'],
                    usp: 'Beautiful furniture with practical features.'
                },
                bedroomFurniture: {
                    type: 'contains',
                    terms: ['bedroom', 'bedroom furniture', 'furniture', 'bedroom set', 'bedroom sets', 'oak bedroom set', '3 piece bedroom set'],
                    usp: 'Beautiful furniture with practical features.'
                },
                collections: {
                    type: 'contains',
                    terms: ['rialto', 'orchard', 'kingston', 'franklin', 'hayword', 'hayworth', 'oxford', 'lawson', 'sienna', 'mia', 'osborne', 'atlas'],
                    usp: "Customers' favourite 3 piece collection."
                }
            };

            usp = (function() {
                var searchTerm = window.universal_variable.page.subcategory.toLowerCase(),
                    searchWords = searchTerm.split(' '),
                    group, type, terms;

                for (group in searchGroups) {
                    type = searchGroups[group].type;
                    terms = searchGroups[group].terms;

                    if (type === 'contains') {
                        var i, j, word;
                        for (i = 0; i < searchWords.length; i++) {
                            word = searchWords[i];
                            if (terms.indexOf(word) > -1) {
                                return searchGroups[group].usp;
                            }
                        }
                    }
                }
            }());

        } else if (/^https?:\/\/www\.mamasandpapas\.com\/en-gb\/c\/nursery-furniture\/?(\?.*)?(\#.*)?$/.test(url)) {
            usp = 'Beautiful furniture with practical features.';
        } else if (/^https?:\/\/www\.mamasandpapas\.com\/en-gb\/c\/cots-cribs-cotbeds\/?(\?.*)?(\#.*)?$/.test(url)) {
            usp = 'Cot converts to a subtle sleigh-design bed.';
        } else if (/^https?:\/\/www\.mamasandpapas\.com\/en-gb\/c\/dressers-changers\/?(\?.*)?(\#.*)?$/.test(url)) {
            usp = 'Beautiful furniture with practical features.';
        } else if (/^https?:\/\/www\.mamasandpapas\.com\/en-gb\/c\/nursery-furniture-sets\/?(\?.*)?(\#.*)?$/.test(url)) {
            usp = 'Beautiful furniture with practical features.';
        } else if (/^https?:\/\/www\.mamasandpapas\.com\/en-gb\/c\/nursery-wardrobes\/?(\?.*)?(\#.*)?$/.test(url)) {
            usp = 'Sturdy, full-size wardrobe. Built to last.';
        }

        if (!usp) {
            return;
        }
        // ------------------------------------------------------------------------------------------------------------

        var opts = {
            title: 'MIA IVORY',
            link: 'c/mia-ivory/',
            subText: '3 Piece Bundle from £899'
        };

        opts.desc = (function() {
            var sortingBy = $('#sortOptions1').children('[selected="selected"]').text().trim(),
                desc;

            if (sortingBy === 'Price (Low - High)' || sortingBy === 'Price (High - Low)') {
                desc = "Customers' favourite 3 piece collection.";
            } else {
                desc = usp;
            }

            return desc;
        }());

        var createComponent = function() {
            var $html = $([
                '<div class="col-xs-12 MP040_no-padding">',
                '<div class="MP040_component">',
                '<div class="col-xs-6 col-sm-3 MP040_no-padding MP040_component_image_wrap">',
                '<div class="MP040_component_image MP040_img_1"></div>',
                '</div>',
                '<div class="col-sm-6 hidden-xs MP040_component_info">',
                'Meet',
                '<div><div class="MP040_component_title">' + opts.title + '</div></div>',
                '<div class="MP040_component_desc">' + opts.desc + '</div>',
                '<div class="MP040_component_subtext">' + opts.subText + '</div>',
                '<a href="' + opts.link + '" class="MP040_component_btn">Shop Now</a>',
                '</div>',
                '<div class="col-xs-6 col-sm-3 MP040_no-padding MP040_component_image_wrap">',
                '<div class="MP040_component_image MP040_img_2"></div>',
                '</div>',
                '<div class="visible-xs">',
                '<div class="col-xs-8 MP040_component_info">',
                'Meet',
                '<div><div class="MP040_component_title">' + opts.title + '</div></div>',
                '<div class="MP040_component_desc">' + opts.desc + '</div>',
                '<div class="MP040_component_subtext">' + opts.subText + '</div>',
                '</div>',
                '<div class="col-xs-4">',
                '<a href="' + opts.link + '" class="MP040_component_btn">Shop Now</a>',
                '</div>',
                '</div>',
                '</div>',
                '</div>'
            ].join(''));

            return $html;
        };

        var component = createComponent(opts);
        $('.top-hd').before(component);

		// ---------------------------

    } // activate

}()); // _MP040