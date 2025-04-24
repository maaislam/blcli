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
                    '<a href="/PPE~c~LBA" title="PPE" class="">PPE</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Janitorial-and-Canteen~c~LBB" title="Janitorial & Canteen" class="">Janitorial & Canteen</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Tools~c~LBC" title="Tools" class="">Tools</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Traffic-Management~c~LBD" title="Traffic Management" class="">Traffic Management</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Electrical~c~LBE" title="Electrical" class="">Electrical</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Health-and-Safety~c~LBF" title="Health & Safety" class="">Health & Safety</a></div>',
                '<div class="pd1_navigation__item">',
                    '<a href="/Stationery~c~LBG" title="Stationery" class="">Stationery</a></div>',
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
        headerLinks.find('.ui-block-c .btn-contactus em').text('0121 567 4111');

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

    // Don't need to rebuild catalogues and accounts section

    // $('.ui-grid-solo').after(`
    //   <section class="PD001-nav-wrap">
    //   </section>
    // `);

    // $('.ui-grid-solo > ul > li').each(function(){
    //   var markup = $(this).html();
    //   var markupSlide = `
    //     <div class="PD001_nav-link">${markup}</div>
    //   `;

    //   $('.PD001-nav-wrap').append(markupSlide);
    // });

    // var slickInit = {
    //   landingSliderInit: function () {
    //     var $landingWrap = $(".PD001-nav-wrap");
    //     var landingSlider = $landingWrap.find(".PD001-nav-slider");
    //     landingSlider.slick({
    //       dots: false,
    //       //slidesToShow: 1,
    //       slidesToScroll: 1,
    //       //autoplay: true,
    //       autoplaySpeed: 3000,
    //       variableWidth: true,
    //       infinite: false
    //     });
    //   }
    // };


    // $.getScript('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', function () {
    //   slickInit.landingSliderInit();
    // });
        
    }
})();
