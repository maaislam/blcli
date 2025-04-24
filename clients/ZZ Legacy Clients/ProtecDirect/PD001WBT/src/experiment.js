/* eslint-disable */
(function() {
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    var trackerName;
    function sendEvent(action, label, nonInteractionValue) {
        var category = 'PD1---MOBILENAV';
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
                    '<a href="/Special-Hazard-Clothing~c~W_AA" title="Hazard Workwear" class="">Hazard Workwear</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Workwear~c~W_AB" title="Clothing & Workwear" class="">Clothing & Workwear</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Hand-Protection~c~W_AE" title="Hand Protection" class="">Hand Protection</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Safety-Footwear~c~W_AF" title="Safety Footwear" class="">Safety Footwear</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Respiratory-Protection~c~W_AG" title="Respiratory Protection" class="">Respiratory Protection</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Eye-and-Face-Protection~c~W_AH" title="Eye & Face Protection" class="">Eye & Face Protection</a></div>',
                '<div class="pd1_navigation__item">',
                  '<a href="/Head-Protection~c~W_AI" title="Head Protection" class="">Head Protection</a></div>',
                '<div class="pd1_navigation__item">',
                  '<a href="/Hearing-Protection~c~W_AJ" title="Hearing Protection" class="">Hearing Protection</a></div>',
                '<div class="pd1_navigation__item">',
                  '<a href="/Harness-and-Safety-Equipment~c~W_AK" title="Harness & Safety Equipment" class="">Harness & Safety Equipment</a></div>',
                '<div class="pd1_navigation__item">',
                  '<a href="/Washroom~c~W_AL" title="Washroom" class="">Washroom</a></div>',
                '<div class="pd1_navigation__item">',
                  '<a href="/First-Aid~c~W_AM" title="First Aid" class="">First Aid</a></div>',
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
        
        // -----------------------------------------------
        // PD1 AMENDS
        // -----------------------------------------------
        
            //change search
            var searchForm = $('#header form');
            searchForm.find('label').removeClass('ui-hidden-accessible').addClass('pd1-searchLabel').text('Search');
            searchForm.find('.searchButton.ui-btn').prepend('<img src="//www.sitegainer.com/fu/up/20dmw9f3om9h2xq.png"/>');
            
            //change buttons to links
            var headerLinks = $('#header .ui-collapsible-content.ui-body-inherit');
            headerLinks.find('.ui-block-c .btn-contactus em').text('0870 900 7560');

            // Login check for acount specific menu, check for manage account
            var manageAcc = document.querySelectorAll('.ui-grid-solo.catalogues ul li a');
            if (manageAcc.length > 0) {
              for (let i = 0; i < manageAcc.length; i += 1 ){
                if (manageAcc[i].href.indexOf('/my-account') > -1) {
                  $('.ui-collapsible .ui-block-b').append('<a href="/my-account" class="ui-link">Manage Account</a>');
                  break;
                }
              }
            }
        
    }
})();
