/*--------------------------------------------------------------
//Rebuild the pushchair bundles
----------------------------------------------------------------*/
export default function bundleChanges(){
    
    /*--------------------------------------------------------------
    //Desktop Version of the bundles
    ----------------------------------------------------------------*/
    if($(window).width() > 1100){
        const $desktopButtonWrapper = $('<div class="MP060-desktopbuttons"/>'),
            $bundleBlocks = $('.travel-bundle-filter-links');

        $desktopButtonWrapper.appendTo($bundleBlocks);

    //add the first image to show on default
        const $mainIconImage = $(`<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 MP060-mainIcons">
                                <h2>BUNDLES</h2>
                                <img src="/medias/sys_master/images/images/haf/h75/9083580055582.png"/>
                                <p>Pushchair, Carry Cot, Cup Holder, Adaptors, Car Seat, Isofix Base</p>
                            </div>`);
        $mainIconImage.prependTo($bundleBlocks);

    //get the links from the original buttons
        const fourLink = $('.MP060-bundle4 a').attr('href'),
              fiveLink = $('.MP060-bundle5 a').attr('href'),
              sixLink = $('.MP060-bundle6 a').attr('href')


        const newButtons = [
            [sixLink,'SEE 6 PIECE BUNDLE'],
            [fiveLink,'SEE 5 PIECE BUNDLE'],
            [fourLink,'SEE 4 PIECE BUNDLE']
        ]

        $.each(newButtons,function(i){
            const buttonItems = $(this),
            buttonLink = buttonItems[0],
            buttonText = buttonItems[1];

            const buttonDesktop = $(`<div class="MP060-desktopbutton"><a href="${buttonLink}">${buttonText}</a></div>`).prependTo($desktopButtonWrapper);
            buttonDesktop.attr('data-layer', (i + 1));
        });


    //Show hide the divs
    $(".MP060-desktopbutton").each(function () {
        $(this).hover(function () {
            const data_id = $(this).attr('data-layer');
            $mainIconImage.addClass('MP060-mainHidden');
            // Shows the hovered floorplan, hides others
            $('.travel-bundle-filter-link-element').each(function () {
                const el = $(this);
                if (el.attr('data-layer') === data_id) {
                    el.addClass('MP060-bundleShowing');

                } else {
                    el.removeClass('MP060-bundleShowing');
                }
            });
        }, function () {
            const data_id = $(this).attr('data-layer');
            $mainIconImage.removeClass('MP060-mainHidden');
            $('.travel-bundle-filter-link-element').each(function () {
                const el = $(this);
                if (el.attr('data-layer') === data_id) {
                    el.removeClass('MP060-bundleShowing');
                } else {
                    el.removeClass('MP060-bundleShowing');
                }
            });
        });
    });
}

const bundles = $('.col-lg-12.col-xs-12.travel-bundles');
      bundles.insertBefore('#PDP-Information');

    //set each bundle block - add the class for the different colours
    const $bundle4 = $('.travel-bundle-filter-link-element:eq(2)'),
          $bundle5 = $('.travel-bundle-filter-link-element:eq(1)'),
          $bundle6 = $('.travel-bundle-filter-link-element:eq(0)');

          $bundle4.addClass('MP060-bundle4');
          $bundle5.addClass('MP060-bundle5');
          $bundle6.addClass('MP060-bundle6');
          
        //Change control 4 piece text
        const fourBundle = $('.MP060-bundle4');
        const fourTextFix = fourBundle.find('h2').text().replace('4PIECE','4 PIECE');
        fourBundle.find('h2').text(fourTextFix);
        //make the options text match the bundle block titles, check if they exist then add the class
        const options = $('.variant_options.mb-3 .w-100.p-3 option'),
              bundleDivs = $('.travel-bundle-filter-link-element');

              let $bundletext = '',
                  $optionstext = '';

              bundleDivs.each(function(i){
                const bundle = $(this);
                      $bundletext = bundle.find('h2').text().trim().replace(/\s/g,"").replace(/S$/, '').toUpperCase();

                    let didMatch = false,
                        linkForDiv = null,
                        titleforDiv = null;
                    options.each(function(){
                        const eachOption = $(this);
                        let $optionsText = eachOption.text().trim().replace(/\s/g,"").replace(/s$/, '').replace(' ','').toUpperCase();
                        let optionLink = eachOption.val();
                        let optionTitle = eachOption.text();

                        if($bundletext.indexOf($optionsText) > -1){
                            bundle.addClass('MP060-bundle_available');

                            didMatch = true;
                            linkForDiv = optionLink,
                            titleforDiv = optionTitle;
                        }
                    });

                    if(didMatch === false) {
                        bundle.addClass('MP060-bundle_unavailable'); 
                    }

                    if(linkForDiv === null) {
                        $(`.travel-bundle-filter-links .MP060-desktopbutton[data-layer=${i + 1}] a`).removeAttr('href');
                    } else {
                        $(`.travel-bundle-filter-links .MP060-desktopbutton[data-layer=${i + 1}] a`).attr('href', linkForDiv);
    
                        bundle.append(`<div class="MP060-button"><a href='${linkForDiv}'>SEE ${titleforDiv}</a></div>`);
                    }

                    bundle.attr('data-layer', (i + 1));
                    //Change inc to incl
                    const incText = bundle.find('p').text().replace('Inc','Incl.');
                    bundle.find('p').text(incText);
              });

        const $unvailableBundles = $('.MP060-bundle_unavailable');

        //the ones that are out of stock add the new opaque layer and text on top to show they are unvailable
        const unavailableBlocks = () => {
            $unvailableBundles.prepend(`<div class="MP060-outofstock_bundle"><span>Sorry, bundle currently out of stock</span></div>`);

        }
        if ($unvailableBundles.length) {
            unavailableBlocks();
        }
        
}
        







        

    
        


        
         

