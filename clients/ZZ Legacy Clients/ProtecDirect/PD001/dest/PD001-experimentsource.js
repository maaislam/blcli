(function() {
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    var trackerName;
    function sendEvent(action, label, nonInteractionValue) {
        var category = 'RC17---CourseFinder';
        label = label || '';
        nonInteractionValue = nonInteractionValue || true;
        var fire = function(tracker) {
            window.ga(tracker + '.send', 'event', category, action, label, {nonInteraction: nonInteractionValue});
        };

        if (trackerName) {
            fire(trackerName);
        } else {
            UC.poller([
                function() { return window.ga.getAll; }
            ], function() {
                trackerName = window.ga.getAll()[0].get('name');
                fire(trackerName);
            });
        }
    }

    $('body').addClass('pd001');

    UC.poller([
        '#header .top-menu',
        'body.ui-mobile-viewport',
        function() {
            return !!window.jQuery;
        }
    ], function() {
        run();
    
        // -----------------------------------------------
        // Full story integration
        // -----------------------------------------------
        UC.poller([
            function() {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'PD001',
                variation_str: 'Variation 1'
            });
        }, { multiplier: 1.2, timeout: 0 });
        
    });

    // -----------------------------------------------
    // Entry point for test...
    // -----------------------------------------------
    function run() {
        var $ = window.jQuery;

        $('body').addClass('pd001--is-running');

        // -----------------------------------------------
        // Build our own custom menu
        // -----------------------------------------------
        var menu = $([
            '<div class="pd1_navigation">',
                '<div class="pd1_navigation__item">',
                    '<a href="/Personal-Protective-Equipment-PPE-~c~A" title="PPE" class="">PPE</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Personal-Protective-Equipment-PPE-/Hand-Protection~c~AF" title="Gloves" class="">Gloves</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment~c~AE" title="Respirators" class="">Respirators</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Personal-Protective-Equipment-PPE-/Safety-Footwear~c~AG" title="Footwear" class="">Footwear</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Clothing-and-Workwear~c~B" title="Workwear" class="">Workwear</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Site-Equipment-and-Consumables~c~D" title="Consumables" class="">Consumables</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/All-Discounts/Special-Offers~c~special_offers" title="Special Offers" class="">Special Offers</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/All-Discounts/Clearance~c~clearance" title="Clearance" class="">Clearance</a>',
                '</div>',
            '</div>'
        ].join(''));

        $('#header_container .minicart').after(menu);

        // -----------------------------------------------
        // Initialise menu and modify existing broken functionality
        // -----------------------------------------------
        $('#header_container .ui-collapsible-heading-toggle').on('click', function() {
           $('.pd1_navigation').toggleClass('pd1_navigation--active');

           $(this).toggleClass('pd1-toggle--active');
           return false;
        });
    }
})();
