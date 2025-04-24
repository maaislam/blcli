import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as PU6Content from './lib/PU006-content.js';

//load in the box here

const PU006 = (() => {
    const activate = () => {
        const $ = window.jQuery,
             $body = $('body');
		$body.addClass('PU006');

		if(!utils.getCookie('PU6-boxshown')){
				setTimeout(function(){
					showdoctorsBox();
				},3000);      

		}

		
		//Create the box and add to the page
		const doctorsBox = () => {
			const boxMarkup = PU6Content.slideUpbox;
			$body.prepend(boxMarkup);

			//add the doctors content
			const doctorsInformation = PU6Content.doctorContent;

			$.each(doctorsInformation,function(){
				const $this = $(this),
					  docImage = $this[0],
					  docName = $this[1],
					  docExp = $this [2];
				const information = $(`<div id ="${docImage}" class="PU6_doctor"><div class="PU6_info"><span>${docName}</span><p>${docExp}</p></div></div>`);
				information.appendTo('.PU6_doctor-slides');

			});

			//Slick
			$.getScript('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', function() { 
				
				const $slider = $('.PU6_doctor-slides');
				$slider.slick();

				//Change the image of the doctor on the slide change
				const slickSlide = $('.PU6_box_wrap .slick-slide'),
					  doctorImage = $('.PU6-image');

				//show the correct image to match the slide showing on load
				doctorImage.eq(0).addClass('PU6_active');

				//update the image on the changing of the slide
				$slider.on('afterChange', function(event, slick, currentSlide){   
					doctorImage.removeClass('PU6_active');
					$('.PU6-image[data-id=' + (currentSlide + 1) + ']').addClass('PU6_active');
				  });

				  $('.slick-next.slick-arrow').click(function(){
					utils.events.send('PU006 V1', 'Next click', 'clicked on next slide on module', {
						sendOnce: true
					});
				  });
				 

			});

			$('.PU6_box_exit').click(function(){
				removedoctorsBox();
			});
			$('.PU6_box_wrap a').click(function(){
				utils.events.send('PU006 V1', 'Link click', 'clicked on see all GPs', {
					sendOnce: true
				});
			});

		};
		doctorsBox();

		//show box
		const showdoctorsBox = () => {
			let box = $('.PU6_box_wrap');
			box.addClass('PU6_box_show');
			utils.events.send('PU006 V1', 'Box Shown', 'Module box shown', {
				sendOnce: true
			});
			utils.setCookie('PU6-boxshown',1);
		}
		const removedoctorsBox = () => {
			let box = $('.PU6_box_wrap');
			box.removeClass('PU6_box_show');
			utils.setCookie('PU6-boxshown',1);
		}
	};

    // Audience conditions
    const triggers = ((options) => {
        UC.poller([
            'body',
            () => {
                return !!window.jQuery;
            },
            () => {
                return !!window.ga;
            }
            ], () => {
             $ = window.jQuery;
             utils.fullStory('PU006', 'Variation 1');
             activate();
            });
    })();

})();
