var _SO001 = (function() {
 
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Triggers
    UC.poller([
        'body',
        '.section-item-content.nav-sections-item-content .megamenu',
        '.level0.level-top',
        function () {
            if (window.jQuery) return true;
        },
        function () {
            if (window.ga) return true;
        }
    ], SO001, {
        timeout: 7000,
        multiplier: 'disable'
    });

    function SO001() {
        var $ = window.jQuery;

        UC.poller([
            function () {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'SD019',
                variation_str: 'Variation 1'
            });
        }, {
            multiplier: 1.2,
            timeout: 0
        });


        $('body').addClass('SO001');
        var navigation = $('.section-item-content.nav-sections-item-content .megamenu');


        $('.section-item-content.nav-sections-item-content').removeClass('sticky');
        $('.top-promo').removeClass('sticky');

        navigation.removeClass('megamenu').addClass('so1-navigation');
        navigation.find('.megamenu-start').removeClass('megamenu-start').addClass('so1-topnavLinks');
        navigation.find('.so1-topnavLinks .wrapper-content.level0.submenu').addClass('so1-secondLinks');
        navigation.find('.so1-secondLinks .wrapper-content.level1.submenu.subcate-no').addClass('so1-thirdLinks');


        /*Sliders*/
        var navtwo = $('.so1-topnavLinks .level0.level-top'),
            navthree = $('.so1-topnavLinks .level0.level-top .so1-secondLinks .level0 li');

        navtwo.each(function () {
            $(this).hover(function () {
                $(this).find('.so1-secondLinks').toggleClass('so1Active');
                $(this).closest('.level0.level-top').toggleClass('so1-linkActive');
            });
        });

        navthree.each(function () {
            $(this).hover(function () {
                $(this).find('.so1-thirdLinks').toggleClass('so1-thirdactive');
                $(this).closest('.level1').toggleClass('so1-thirdlinkActive');
            });
        });


        $('.so1-secondLinks .level0 > .level1').each(function () {
            $(this).append('<img src="http://www.sitegainer.com/fu/up/jv4tx1sxqf49e4k.png"/>');
        });


        /*tab images*/
        $('<div class="so1-linkImages"></div>').appendTo('.so1-secondLinks');


        var tabImages = {
            bedding: [{
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Duvets',
                    link: 'link',

                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Pillows',
                    link: 'link',
                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Bed Linen',
                    link: 'link',
                }
            ],
            bathroom: [{
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Towels',
                    link: 'link',

                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Shower Curtains',
                    link: 'link',
                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Bathrobes',
                    link: 'link',
                }
            ],
            furniture: [{
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Mattresses',
                    link: 'link',

                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Beds',
                    link: 'link',
                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Wardrobes',
                    link: 'link',
                }
            ],
            accessories: [{
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Toiletries',
                    link: 'link',

                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Rugs',
                    link: 'link',
                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Cushions',
                    link: 'link',
                }
            ],
            kids: [{
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Kids Duvets',
                    link: 'link',

                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Kids Pillows',
                    link: 'link',
                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Kids Pillows',
                    link: 'link',
                }
            ],
            gifts: [{
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Candles',
                    link: 'link',

                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Bedding',
                    link: 'link',
                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Slippers & Socks',
                    link: 'link',
                }
            ],
            sale: [{
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Duvets',
                    link: 'link',

                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Bedding',
                    link: 'link',
                },
                {
                    image: 'http://www.sitegainer.com/fu/up/wagjcyzy81aw77f.jpg',
                    text: 'Bathrobes',
                    link: 'link',
                }
            ],
        };

        var expObj;


        $('.so1-topnavLinks .level0.level-top').each(function () {
            var $el = $(this);
            var linkText = $(this).find('.level-top > span').text().trim();

            if (linkText === 'Bedding') {
                expObj = tabImages.bedding;
            } else if (linkText === 'Bathroom') {
                expObj = tabImages.bathroom;
            } else if (linkText === 'Furniture') {
                expObj = tabImages.furniture;
            } else if (linkText === 'Accessories') {
                expObj = tabImages.accessories;
            } else if (linkText === 'Kids') {
                expObj = tabImages.kids;
            } else if (linkText === 'Gifts') {
                expObj = tabImages.gifts;
            } else if (linkText === 'Sale') {
                expObj = tabImages.sale;
            }

            $.each(expObj, function () {
                var $catImage = $(
                    ['<div class="so1-catImage">',
                        '<img src="' + this.image + '"/>',
                        '<h2><a href="' + this.link + '">Shop ' + this.text + '</a></h2>',
                        '</div>'
                    ].join(''));

                $catImage.appendTo($el.find('.so1-secondLinks .so1-linkImages'));

            });

        });

        



    }
    })();