console.log('UPDATED');

$(function () {

    var $ = jQuery;

    $('body').addClass('UC093');

    $('<div class="UC93-livefeed-wrap"></div>').prependTo('body');



    var liveSales = {
        ucSale: {
            SALE1: {
                id: 'salesbox1',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester'
            },
            SALE2: {
                id: 'salesbox2',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester'
            },
            SALE3: {
                id: 'salesbox3',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester'
            },
            SALE4: {
                id: 'salesbox4',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester'
            },
            SALE5: {
                id: 'salesbox5',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester'
            },
            SALE6: {
                id: 'salesbox6',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester'
            },
            SALE7: {
                id: 'salesbox7',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester'
            },
            SALE8: {
                id: 'salesbox8',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester',
            },
            SALE9: {
                id: 'salesbox9',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester'
            },
            SALE10: {
                id: 'salesbox10',
                productname: 'Zelda: Legendary Link Hoodie',
                productlink: '#',
                productimage: '//cdn.optimizely.com/img/6087172626/bcb1266859f74d6da8c0657bf7d0cdfb.jpg',
                buyer: 'John Doe',
                buyerlocation: 'Manchester'
            }
        }
    }


    var expObj = liveSales.ucSale;

    $.each(expObj, function () {
        $(['<div id ="' + this.id + '" class="uc93liveSales">',
            '<div class="uc93exit">X</div>',
            '<div class="uc93livesales_left">',
                '<img src="' + this.productimage + '"/>',
            '</div>',
            '<div class="uc93livesales_right">',
                '<div class="uc93_product"><a href="' + this.productlink + '">' + this.productname + '</a></div>',
                '<div class="uc93_buyer">Bought by <span>' + this.buyer + '</span></div>',
                '<div class="uc93_buyerlocation"> from<span> ' + this.buyerlocation + '</span></div>',
            '</div>',
        '</div>'
   ].join('')).appendTo('.UC93-livefeed-wrap');

    });

    if (!localStorage.getItem('uc93_disabled')) {
        var currentTime = localStorage.getItem('uc93_time');
        var currentSalesBox = localStorage.getItem('uc93_sales_box_id');
        var nowTime = (new Date()).getTime();

        if (!currentTime) {
            currentTime = (new Date()).getTime();
            localStorage.setItem('uc93_time', currentTime);
        }

        if (!currentSalesBox) {
            currentSalesBox = $('.uc93liveSales:first').attr('id');
            localStorage.setItem('uc93_sales_box_id', currentSalesBox);
        }

        if ((nowTime - currentTime) / 1000 > 120) {

            var nextSalesBoxId = $('#' + currentSalesBox).next().attr('id');

            if (!nextSalesBoxId) {
                localStorage.setItem('uc93_disabled', '1');
            }

            localStorage.setItem('uc93_sales_box_id', nextSalesBoxId);

           
            localStorage.setItem('uc93_time', (new Date()).getTime());
        } else {
            //$('#' + currentSalesBox).addClass('active');
        }

        function showBox() {
            setTimeout(function () {

                var nextSalesBoxId = $('#' + currentSalesBox).next().attr('id');
                $('.uc93liveSales.active').removeClass('active');


                
                $('#' + nextSalesBoxId).addClass('active');

                setTimeout(function () {
                    $('#' + nextSalesBoxId).removeClass('active');
                }, 5000);

                currentSalesBox = (nextSalesBoxId);

                if (!nextSalesBoxId) {
                    localStorage.setItem('uc93_disabled', '1');
                }

               
                localStorage.setItem('uc93_sales_box_id', nextSalesBoxId);

                
                localStorage.setItem('uc93_time', (new Date()).getTime());

                showBox();

            }, 30000);


        }

        showBox();
    }


    $('.uc93exit').click(function () {
        $('.uc93liveSales.active').removeClass('active');
        localStorage.setItem('uc93_disabled', '1');
    });

});