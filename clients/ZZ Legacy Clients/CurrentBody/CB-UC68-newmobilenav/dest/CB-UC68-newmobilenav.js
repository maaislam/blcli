

var $ = jQuery;

(function () {

    $('body').addClass('UC068');

    $('.topheader #nav').remove();
    var navContainer = $('<div class="UC68_mobileWrap"><div class="UC68-MainContent"></div>');
    navContainer.prependTo('body');

    /*----------------------------------------
                Slide out function
    ----------------------------------------*/
    $('#show-main-nav').click(function () {
        var left = 97;
        if ($('.UC68_mobileWrap').hasClass('active')) {
            left = -500;
        }

        $('.UC68_mobileWrap').animate({
            left: left
        }, function () {
            $(this).addClass('active');
        });
    });

    /*----------------------------------------
               Main Nav Content
    ----------------------------------------*/

    var $mainNav = $('.UC68-MainContent');

    var $navHtml = $([
    '<div class="uc68_logo">',
      '<img src="//cdn.optimizely.com/img/3584273092/3a9a6810da67418884edda2ff6b257cb.png"/>',
    '</div>',
     '<div class="UC68_topBar">',
        '<h3>Menu</h3>',
        '<div class="UC68-exit">X</div>',
    '</div>',
   '<div class="UC68-mainLinks"><ul class="uc68-newnavlinks"></ul></div>'
   ].join('')).prependTo($mainNav);


    $('.UC68-exit').click(function () {
        console.log('exit click');
        var left = -500;
        $('.UC68_mobileWrap').animate({
            left: left
        }, function () {
            $(this).removeClass('active');
        });
    });

    // JSON
var nav_item = [
    
    /****************  
    FACIAL CLEANSING
    ****************/
    {
        title: 'Facial Cleansing',
        content: {
            lvl2: [
                {
                    title: 'View All Facial Cleansing',
                    url: 'http://'
                },
                
                {
                    title: 'Top Brands',
                    content: {
                        links: [
                            {
                                title: 'Clarisonic',
                                url: 'http://'
                            },
                            {
                                title: 'Foreo',
                                url: 'http://'
                            },
                            {
                                title: 'Magnitone',
                                url: 'http://'
                            },
                            {
                                title: 'PMD',
                                url: 'http://'
                            },
                            {
                            title: 'View All Brands',
                            url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Category',
                    content: {
                        links: [
                            {
                                title: 'Facial Cleansers',
                                url: 'http://'
                            },
                            {
                                title: 'Body',
                                url: 'http://'
                            },
                            {
                                title: 'For Men',
                                url: 'http://'
                            },
                            {
                                title: 'Accessories',
                                url: 'http://'
                            },
                            {
                                title: 'Gels & Creams',
                                url: 'http://'
                            },
                        ]
                    }
                },
                {
                    title: 'Best Sellers',
                    content: {
                        products: [
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            },
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                 price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Concern',
                    content: {
                        links: [
                            {
                                title: 'Pores/Blackheads',
                                url: 'http://'
                            },
                            {
                                title: 'Pigmentation',
                                url: 'http://'
                            },
                            {
                                title: 'Lines/Wrinkles',
                                url: 'http://'
                            },
                            {
                                title: 'Oily Skin',
                                url: 'http://'
                            },
                            {
                                title: 'Dull Skin',
                                url: 'http://'
                            }
                        ]
                    }
                }
            ]
        }
    },
    
    
    /****************  
    HAIR REMOVAL
    ****************/
    {
         title: 'Hair Removal',
        content: {
            lvl2: [
                {
                    title: 'View All Facial Cleansing',
                    url: 'http://'
                },
                
                {
                    title: 'Top Brands',
                    content: {
                        links: [
                            {
                                title: 'Clarisonic',
                                url: 'http://'
                            },
                            {
                                title: 'Foreo',
                                url: 'http://'
                            },
                            {
                                title: 'Magnitone',
                                url: 'http://'
                            },
                            {
                                title: 'PMD',
                                url: 'http://'
                            },
                            {
                            title: 'View All Brands',
                            url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Category',
                    content: {
                        links: [
                            {
                                title: 'Facial Cleansers',
                                url: 'http://'
                            },
                            {
                                title: 'Body',
                                url: 'http://'
                            },
                            {
                                title: 'For Men',
                                url: 'http://'
                            },
                            {
                                title: 'Accessories',
                                url: 'http://'
                            },
                            {
                                title: 'Gels & Creams',
                                url: 'http://'
                            },
                        ]
                    }
                },
                {
                    title: 'Best Sellers',
                    content: {
                        products: [
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            },
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                 price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Concern',
                    content: {
                        links: [
                            {
                                title: 'Pores/Blackheads',
                                url: 'http://'
                            },
                            {
                                title: 'Pigmentation',
                                url: 'http://'
                            },
                            {
                                title: 'Lines/Wrinkles',
                                url: 'http://'
                            },
                            {
                                title: 'Oily Skin',
                                url: 'http://'
                            },
                            {
                                title: 'Dull Skin',
                                url: 'http://'
                            }
                        ]
                    }
                }
            ]
        }
    },
    /****************  
    Anti -Ageing 
    ****************/
    {
         title: 'Anti-Ageing',
        content: {
            lvl2: [
                {
                    title: 'View All Facial Cleansing',
                    url: 'http://'
                },
                
                {
                    title: 'Top Brands',
                    content: {
                        links: [
                            {
                                title: 'Clarisonic',
                                url: 'http://'
                            },
                            {
                                title: 'Foreo',
                                url: 'http://'
                            },
                            {
                                title: 'Magnitone',
                                url: 'http://'
                            },
                            {
                                title: 'PMD',
                                url: 'http://'
                            },
                            {
                            title: 'View All Brands',
                            url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Category',
                    content: {
                        links: [
                            {
                                title: 'Facial Cleansers',
                                url: 'http://'
                            },
                            {
                                title: 'Body',
                                url: 'http://'
                            },
                            {
                                title: 'For Men',
                                url: 'http://'
                            },
                            {
                                title: 'Accessories',
                                url: 'http://'
                            },
                            {
                                title: 'Gels & Creams',
                                url: 'http://'
                            },
                        ]
                    }
                },
                {
                    title: 'Best Sellers',
                    content: {
                        products: [
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            },
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                 price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Concern',
                    content: {
                        links: [
                            {
                                title: 'Pores/Blackheads',
                                url: 'http://'
                            },
                            {
                                title: 'Pigmentation',
                                url: 'http://'
                            },
                            {
                                title: 'Lines/Wrinkles',
                                url: 'http://'
                            },
                            {
                                title: 'Oily Skin',
                                url: 'http://'
                            },
                            {
                                title: 'Dull Skin',
                                url: 'http://'
                            }
                        ]
                    }
                }
            ]
        }
    },
     /****************  
    Acne
    ****************/
    {
         title: 'Acne',
        content: {
            lvl2: [
                {
                    title: 'View All Facial Cleansing',
                    url: 'http://'
                },
                
                {
                    title: 'Top Brands',
                    content: {
                        links: [
                            {
                                title: 'Clarisonic',
                                url: 'http://'
                            },
                            {
                                title: 'Foreo',
                                url: 'http://'
                            },
                            {
                                title: 'Magnitone',
                                url: 'http://'
                            },
                            {
                                title: 'PMD',
                                url: 'http://'
                            },
                            {
                            title: 'View All Brands',
                            url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Category',
                    content: {
                        links: [
                            {
                                title: 'Facial Cleansers',
                                url: 'http://'
                            },
                            {
                                title: 'Body',
                                url: 'http://'
                            },
                            {
                                title: 'For Men',
                                url: 'http://'
                            },
                            {
                                title: 'Accessories',
                                url: 'http://'
                            },
                            {
                                title: 'Gels & Creams',
                                url: 'http://'
                            },
                        ]
                    }
                },
                {
                    title: 'Best Sellers',
                    content: {
                        products: [
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            },
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                 price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Concern',
                    content: {
                        links: [
                            {
                                title: 'Pores/Blackheads',
                                url: 'http://'
                            },
                            {
                                title: 'Pigmentation',
                                url: 'http://'
                            },
                            {
                                title: 'Lines/Wrinkles',
                                url: 'http://'
                            },
                            {
                                title: 'Oily Skin',
                                url: 'http://'
                            },
                            {
                                title: 'Dull Skin',
                                url: 'http://'
                            }
                        ]
                    }
                }
            ]
        }
    },
    
    /****************  
    OUTLET (THIS IS JUST A LINK)
    ****************/
    {
        title: 'Outlet',
        url: 'http://'
    },
    /****************  
    All Beauty Technology
    ****************/
    {
        title: 'All Beauty Technology',
        content: {
            lvl2: [
                {
                    title: 'View All Facial Cleansing',
                    url: 'http://'
                },
                
                {
                    title: 'Top Brands',
                    content: {
                        links: [
                            {
                                title: 'Clarisonic',
                                url: 'http://'
                            },
                            {
                                title: 'Foreo',
                                url: 'http://'
                            },
                            {
                                title: 'Magnitone',
                                url: 'http://'
                            },
                            {
                                title: 'PMD',
                                url: 'http://'
                            },
                            {
                            title: 'View All Brands',
                            url: 'http://'
                            },
                        ]
                    }
                },
                {
                    title: 'By Category',
                    content: {
                        links: [
                            {
                                title: 'Facial Cleansers',
                                url: 'http://'
                            },
                            {
                                title: 'Body',
                                url: 'http://'
                            },
                            {
                                title: 'For Men',
                                url: 'http://'
                            },
                            {
                                title: 'Accessories',
                                url: 'http://'
                            },
                            {
                                title: 'Gels & Creams',
                                url: 'http://'
                            },
                        ]
                    }
                },
                {
                    title: 'Best Sellers',
                    content: {
                        products: [
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            },
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                 price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Concern',
                    content: {
                        links: [
                            {
                                title: 'Pores/Blackheads',
                                url: 'http://'
                            },
                            {
                                title: 'Pigmentation',
                                url: 'http://'
                            },
                            {
                                title: 'Lines/Wrinkles',
                                url: 'http://'
                            },
                            {
                                title: 'Oily Skin',
                                url: 'http://'
                            },
                            {
                                title: 'Dull Skin',
                                url: 'http://'
                            }
                        ]
                    }
                }
            ]
        }
    },
    /****************  
    All Brands
    ****************/
    {
        title: 'All Brands',
        content: {
            lvl2: [
                {
                    title: 'View All Brands',
                    url: 'http://'
                },
                
                {
                    title: 'Top Brands',
                    content: {
                        links: [
                            {
                                title: 'Clarisonic',
                                url: 'http://'
                            },
                            {
                                title: 'Foreo',
                                url: 'http://'
                            },
                            {
                                title: 'Magnitone',
                                url: 'http://'
                            },
                            {
                                title: 'PMD',
                                url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Category',
                    content: {
                        links: [
                            {
                                title: 'Facial Cleansers',
                                url: 'http://'
                            },
                            {
                                title: 'Body',
                                url: 'http://'
                            },
                            {
                                title: 'For Men',
                                url: 'http://'
                            },
                            {
                                title: 'Accessories',
                                url: 'http://'
                            },
                            {
                                title: 'Gels & Creams',
                                url: 'http://'
                            },
                        ]
                    }
                },
                {
                    title: 'Best Sellers',
                    content: {
                        products: [
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            },
                            {
                                title: 'Clarisonic Aria Facial Cleanser',
                                 price: '£93.00',
                                img: '//cdn.optimizely.com/img/3584273092/3d4c80f6fbec44459415cce18a30ee20.jpg',
                                url: 'http://'
                            }
                        ]
                    }
                },
                {
                    title: 'By Concern',
                    content: {
                        links: [
                            {
                                title: 'Pores/Blackheads',
                                url: 'http://'
                            },
                            {
                                title: 'Pigmentation',
                                url: 'http://'
                            },
                            {
                                title: 'Lines/Wrinkles',
                                url: 'http://'
                            },
                            {
                                title: 'Oily Skin',
                                url: 'http://'
                            },
                            {
                                title: 'Dull Skin',
                                url: 'http://'
                            }
                        ]
                    }
                }
            ]
        }
    }
];





var $nav = $('<ul class="nav-lvl1-wrap"></ul>');

// Loop through level 1 list
$.each(nav_item, function () {
    var $lvl1_link = $('<li class="uc68-Mainlink"><div class="ucwrapperlvl1 uc68_catnavlink"><span class="nav-title nav-lvl1">' + this.title + '</span><div class="uc68imgmain"></div></div></li>');
    
    if (this.content) {
        var content = this.content;

        if (content.lvl2) {
            var $lvl2 = $('<ul class="nav-lvl2-wrap"></ul>');

            
            // Loop through level 2 list
            $.each(content.lvl2, function () {
                var $lvl2_link = $('<li class="uc68-level2link"><div class="ucwrapperlvl2"><span class="nav-title nav-lvl2 uc68-secondarylinks">' + this.title + '</span><div class="uc68imgmain midlinks"></div></div></li>');
                
                if (this.content) {
                    if (this.content.products) {
                        var $products = $('<ul class="nav-links uc68secondlevelLinks bestsellers"></ul>');

                        // Loop through level 2 products
                        $.each(this.content.products, function () { 
                            $([
                                '<li class="nav-product">',
                                    '<a href="' + this.url + '">',
                                        '<img src="' + this.img + '"/>',
                                        '<div class="uc68_producttitle">' + this.title + '</div>',
                                        '<div class="uc68_prodprice">'+ this.price +'</div>',
                                        '<a class="uc68-view" href="' + this.url + '">View Product</a>',
                                    '</a>',
                                '</li>'
                            ].join('')).appendTo($products);
                        });

                         $lvl2_link.children('.ucwrapperlvl2').click(function (e) {
                            e.stopPropagation();
                            var $parentLi = $(this).parent('li');
                
                            if ($parentLi.hasClass('active')) {
                                $products.slideUp(500, function () {
                                    $parentLi.removeClass('active');
                                    $parentLi.find('.ucwrapperlvl2 .uc68imgmain').removeClass('active');
                                });
                            } else {
                                $lvl1_link.find('.uc68-level2link.active')
                                    .removeClass('active')
                                    .find('.uc68secondlevelLinks')
                                    .slideUp();
                                
                                $lvl1_link.find('.uc68-level2link.active .ucwrapperlvl2 img').removeClass('active');
                                   
                                $products.slideDown(500, function () {
                                    $parentLi.addClass('active');
                                    $parentLi.find('.ucwrapperlvl2 .uc68imgmain').addClass('active');
                                });
                            }
                      });
                        
                        
                        $products.appendTo($lvl2_link);
                    }

                    if (this.content.links) {
                        var $links = $('<ul class="nav-links uc68secondlevelLinks"></ul>');

                        // Loop through level 2 links
                        $.each(this.content.links, function () {
                            $('<li><a href="' + this.url + '">' + this.title + '</a><img class="uc68-smallestarrow" src="//cdn.optimizely.com/img/3584273092/2b5899e8d0e145f7a40daaa480e13797.png"/></li>').appendTo($links);
                        });

                        $links.appendTo($lvl2_link);
                        
                        
                        $lvl2_link.children('.ucwrapperlvl2').click(function (e) {
                        e.stopPropagation();
                        var $parentLi = $(this).parent('li');
                
                        if ($parentLi.hasClass('active')) {
                            $links.slideUp(500, function () {
                                $parentLi.removeClass('active');
                                $parentLi.find('.ucwrapperlvl2 .uc68imgmain').removeClass('active');
                            });
                        } else {
                           $lvl1_link.find('.uc68-level2link.active')
                                    .removeClass('active')
                                    .find('.uc68secondlevelLinks')
                                    .slideUp();
                                
                            $lvl1_link.find('.uc68-level2link.active .ucwrapperlvl2 .uc68imgmain').removeClass('active');
                            
                            $links.slideDown(500, function () {
                                $parentLi.addClass('active');
                                $parentLi.find('.ucwrapperlvl2 .uc68imgmain').addClass('active');
                            });
                        }
                      });
                        
                        
                    }
                    
                    
                } else if (this.url) {
                    $lvl2_link.contents().wrapAll('<a href="' + this.url + '"></a>');
                }
                
                $lvl2_link.appendTo($lvl2);
                
               
            }); 
            $lvl2.appendTo($lvl1_link);
            
            
            $lvl1_link.children('.ucwrapperlvl1').click(function (e) {
                e.stopPropagation();
                var $parentLi = $(this).parent('li');
                
                if ($parentLi.hasClass('active')) {
                    $lvl2.slideUp(500, function () {
                        $parentLi.removeClass('active');
                        $parentLi.find('.ucwrapperlvl1 .uc68imgmain').removeClass('active');
                        //.attr('src','//cdn.optimizely.com/img/3584273092/b2587e0d804a42a3bf8baba7412db35f.png');
                        
                        
                    });
                } else {
                    $nav.find('li.active .nav-lvl2-wrap').slideUp(500, function () {
                       $(this).closest('.active').removeClass('active');
                        $(this).closest('.active').find('.ucwrapperlvl1 img').removeClass('active');
                     });
                    $lvl2.slideDown(500, function () {
                        $parentLi.addClass('active');
                        $parentLi.find('.ucwrapperlvl1 .uc68imgmain').addClass('active');
                            //.attr('src','//cdn.optimizely.com/img/3584273092/9bb1e8b7efa74ea9a591d1f1590c4ded.png');
                    });
                    $parentLi.find('.nav-lvl2-wrap .uc68-level2link:eq(1) .uc68secondlevelLinks').slideDown(500, function() {
                        $(this).closest('.uc68-level2link').addClass('active');
                         $(this).parent().find('.ucwrapperlvl2 .uc68imgmain').addClass('active');
                    });
                }
            });
        }
        
    } else if (this.url) {
        $lvl1_link.contents().wrapAll('<a href="' + this.url + '"></a>');
    }
    
    
    $lvl1_link.appendTo($nav);
    
 });
    
    $nav.appendTo('.uc68-newnavlinks');
    
    $('.uc68-level2link:nth-child(1)').css({'text-decoration':'underline'});



})();