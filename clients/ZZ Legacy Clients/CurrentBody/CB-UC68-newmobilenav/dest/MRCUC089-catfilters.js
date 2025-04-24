console.log('UPDATED');

var $ = jQuery;

(function () {

    $('body').addClass('UC089');

    $('<div class="uc-refine-button">Refine Search<img src="//cdn.optimizely.com/img/6087172626/861aeffb5afa47fdb0325917ef10dfa6.png"/></div>').insertAfter('.large-12.columns .breadcrumb-row .woocommerce-ordering.custom');

    var slideoutmenu = $([
        '<div class="ucfiltermenu">',
         '<div class="uc-menutitle">',
            '<p>REFINE</p>',
           '<div class="uc-exit">X</div>',
         '</div>',
        '</div>'
    ].join('')).appendTo('body');

    $('.uc-refine-button').click(function () {
        $('.ucfiltermenu').addClass('menushow');
    });
    $('.uc-exit').click(function () {
        $('.ucfiltermenu').removeClass('menushow');
    });

    var categories = $([
        '<div class="uc-catfilters">',
            '<div class="uc-cat gender"><p>Gender</p>',
                '<div class="uc-option-choice"></div>',
            '</div>',
            '<div class="uc-cat size"><p>Size</p>',
                '<div class="uc-option-choice"></div>',
            '</div>',
            '<div class="uc-cat brand"><p>Brand</p>',
                '<div class="uc-option-choice"></div>',
            '</div>',
        '</div>'
    ].join('')).appendTo('.ucfiltermenu');

    var catOptions = {
        gender: [
            {
                name: 'MALE',
                slug: 'pa_gender=male'

            },
            {
                name: 'FEMALE',
                slug: 'pa_gender=female'
            }
          ],
        size: [
            {
                name: 'SMALL',
                slug: 'pa_size=s'
            },
            {
                name: 'MEDIUM',
                slug: 'pa_size=m'
            },
            {
                name: 'LARGE',
                slug: 'pa_size=l'
            },
            {
                name: 'XL',
                slug: 'pa_size=xl'
            },
            {
                name: 'XXL',
                slug: 'pa_size=xxl'
            },
        ],
        brand: [
            {
                name: 'BATMAN',
                slug: 'pa_brand=batman'
            },
            {
                name: 'DOCTOR WHO',
                slug: 'pa_brand=doctor-who'
            },
            {
                name: 'DEADPOOL',
                slug: 'pa_brand=deadpool'
            },
            {
                name: 'HARRY POTTER',
                slug: 'pa_brand=harry-potter'
            },
            {
                name: 'CAPTAIN AMERICA',
                slug: 'pa_brand=captain-america'
            },
            {
                name: 'ZELDA',
                slug: 'pa_brand=zelda'
            },
            {
                name: 'STAR TREK',
                slug: 'pa_brand=star-trek'
            },
            {
                name: 'STAR WARS',
                slug: 'pa_brand=star-wars'
            },
            {
                name: 'SUICIDE SQUAD',
                slug: 'pa_brand=suicide-squad'
            },
            {
                name: 'SUPERMAN',
                slug: 'pa_brand=superman'
            },
            {
                name: 'WONDER WOMAN',
                slug: 'pa_brand=wonder-woman'
            }
        ]
    };

    var expObj;

    $('.uc-cat').each(function () {
        var $el = $(this);

        if ($(this).hasClass('gender')) {
            expObj = catOptions.gender;
        } else if ($(this).hasClass('size')) {
            expObj = catOptions.size;
        } else if ($(this).hasClass('brand')) {
            expObj = catOptions.brand;
        }

        $.each(expObj, function () {
            var $options = $([
                '<div class="uc-options-wrap">',
                    '<div class="ucoption" data-slug="' + this.slug + '"><p class="uc89name">' + this.name + '</p></div>',
                '</div>'
            ].join(''));

            $options.click(function () {
                $el.find('.uc-option-choice').children().removeClass('UC89_active');
                if($(this).hasClass('UC89_active')){
                     $(this).removeClass('UC89_active');
                    }
                else{
                    $(this).addClass('UC89_active');
                }
            });

            $options.appendTo($el.find('.uc-option-choice'));

        });
    });


    var $applyBtn = $('<div class="UC89_btn">Apply filters</div>');

    $applyBtn.click(function () {
        var $activeFilters = slideoutmenu.find('.uc-options-wrap.UC89_active');
        var filtersString = '';

        if ($activeFilters.length === 0) {
            console.log('bit for error message');// error message saying select filters
        } else {
            $activeFilters.each(function (i) {
               // var slug = $(this).data('data-slug');
                var slug = $(this).find('.ucoption').attr('data-slug');
                console.log(slug);
                var prefix = i === 0 ? '?' : '&';

                filtersString = filtersString + prefix + slug;
            });
            window.location.href = window.location.href + filtersString;
        }
    });

    $applyBtn.appendTo(slideoutmenu);
})();