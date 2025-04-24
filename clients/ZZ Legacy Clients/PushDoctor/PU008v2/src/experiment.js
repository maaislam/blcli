/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as PU8content from './lib/PU008-content.js';

const PU008 = (() => {
	const activate = () => {
    const $ = window.jQuery;
    const $body = $('body');
		$body.addClass('PU008v2');


		//add markup to the body
		const newLayout = () => {
			const mainPage = $('.three-col-howItWorks.custom-background-module.whiteBG');
			const bodyHtml = PU8content.bodyMarkup;
			mainPage.prepend(bodyHtml);

			//--------------------------------
			//Change H2 to a scrolling message
			//--------------------------------
			const scollingHeadermessage = () => {
				const headerMessages = PU8content.headerMessages,
				$headerSlider = $('.PU8-header_slider');

				headerMessages.forEach(message => {
					$(`<div class="PU8-headermessage"><h2>${message[0]}</h2></div>`).appendTo($headerSlider);
				});

				$headerSlider.slick({
					mobileFirst: true,
          arrows: false,
          draggable: true,
					autoplay: true,
					autoplaySpeed: '5000',
					dots: true,
				});
			}

			//--------------------------------
			//step by step slider
			//--------------------------------
			const stagesSlider = () => {
				const stagesObj = PU8content.stages,
				$stagesliderWrap = $('.PU8-stages_slider');

				$.each(stagesObj,function(){
					$(`<div class="PU8-stage">
						<img src="${this.image}"/>
						<div class="PU8-sectionHeader">${this.title}</div>
						<p>${this.message}</p>
					</div>`).appendTo($stagesliderWrap);
				});
				$stagesliderWrap.slick({
					mobileFirst: true,
					responsive: [
            {
              breakpoint: 760,
              settings: "unslick"
						}
					]
        });
        $stagesliderWrap.find('.slick-prev').text('','');
        // On before slide change
        $stagesliderWrap.on('beforeChange', function(event, slick, currentSlide, nextSlide){
          if(nextSlide > 0){
            $stagesliderWrap.find('.slick-prev').addClass('PU8-prev_showing');
          }else{
            $stagesliderWrap.find('.slick-prev').removeClass('PU8-prev_showing');
          }
        });
     
			}

			//--------------------------------
			//USPs with the video
			//--------------------------------
			const videoUsps = () => {
				const videoUsp = $('<div class="PU8-videoUsp_wrap"/>');
				videoUsp.insertAfter('.PU8-cta_wrapper');

				const videoWrap = PU8content.videoArea,
				videoMessages = PU8content.videoUsps;
				videoUsp.html(videoWrap);

				//Video lightbox
				const videobox = PU8content.videoLightbox;
				const videobox_wrapper = $('<div class="PU8-videoLightbox_overlay"/><div class="PU8-videoLightbox"/>');

				//lightbox functions
				const imageLightbox = $('.PU8-video_container');
				
				imageLightbox.click(function(){
					if(videobox_wrapper.hasClass('PU8-lightbox_showing')){
						lightBoxClose();
					}else{
            lightBoxOpen();
            //close lightbox
            UC.poller([
              '.PU8-exit',
            ], () => {
              $('.PU8-exit').click(function(){
                lightBoxClose();
              });
              $('.PU8-videoLightbox_overlay').click(function(){
                lightBoxClose();
              });
            });
					}

				});
				const lightBoxOpen = () =>{
          videobox_wrapper.prependTo($body);
          $('.PU8-videoLightbox').html(videobox);
					videobox_wrapper.addClass('PU8-lightbox_showing');
					utils.events.send('PU008', 'Video click','PU008 clicked on video', {
              sendOnce: true
          });
				}
				const lightBoxClose = () => {
          videobox_wrapper.removeClass('PU8-lightbox_showing');
          videobox_wrapper.remove();
				}
			}

			const sideUsps = () => {
				const sideUspText = PU8content.videoUsps;
				sideUspText.forEach(element => {
					$(`<div class="PU8-side_usp"><span>${element[0]}</span></div>`).appendTo('.PU8-leftUsps');
				});

				const arrangeUsps = () => {
					if (window.innerWidth >= 760) { 
						const otherUsps = $('.PU8-side_usp').slice(-3);
						otherUsps.appendTo('.PU8-rightUsps');
					}
				}
				window.onresize = function() {
					if (window.innerWidth >= 760) { 
						arrangeUsps();
					}else{
						return;
					}
				}
				arrangeUsps();
			}

			
			//Content blocks
			const contentBlocks = () => {
				const copySection = $(`<div class="PU8-blockContent"/>`);
				const contentCopy = PU8content.bottomTextBlocks;
				$('.PU8-videoUsp_wrap').after(copySection);

				//loop through each content block and add to the page
				$.each(contentCopy,function(){
					const copyBlock = $(
						`<div class="PU8-copyBlock">
							<h2 class="PU8-copyTitle">${this.contentTitle}</h2>
							<div class="PU8-content"><p>${this.contentText}</p>
							<a class="PU8-book btn_seeadoctor_black" href="https://patient.pushdoctor.co.uk/see-a-doctor-2/select-time">Book appointment now</a>
							</div>
						</div>`
					);
					copyBlock.appendTo(copySection);
				});
				$('.PU8-copyBlock:first').attr('id','PU8-pricing');
				$('.PU8-copyBlock:eq(1)').attr('id','PU8-prescription');

				//--------------------------------
				//put the pricing section in to the content blocks
				//--------------------------------
				const pricingSection = () => {
					const pricingContent = PU8content.pricingArea;
					$('.PU8-blockContent .PU8-content:first').html(pricingContent);

					const pricingURL = 'https://www.pushdoctor.co.uk/pricing';

					//pull the pricing section in from the pricing page
					$.ajax({
						url: pricingURL,
						success: function (data) {
							const d = document.createElement('div');
							d.innerHTML = data;

							const pricingBox = $(d).find('.custom-background-module .ppc_price-list-container');
              $('.PU8-pricingInfo').prepend(pricingBox);
              $('.PU8-pricingInfo .ppc_price-list-item:last .btn_solidgreen').attr('href','https://www.pushdoctor.co.uk/pricing#go-premium');
						}
					});
				}
				pricingSection();

				//--------------------------------
				//Add the 'what we treat list'
				//--------------------------------
				const whatWeTreat = () => {
					const treatment = PU8content.conditions;

					treatment.forEach(elm => {
						const treatmentName = elm[0],
						treatmentLink = elm[1];
						$(`<li><a href="${treatmentLink}">${treatmentName}</a></li>`).appendTo('.PU8-treatment_links');
							  
					});
				}
				whatWeTreat();

				//--------------------------------
				//Put all the content blocks in an accordion
				//--------------------------------
				const accordion = () => {
					const pricingBlock = $('.PU8-copyBlock:first');
					const contentBlock = $('.PU8-copyBlock');
					const treatBlock = $('.PU8-copyBlock:eq(2)'),
					blockTitle = contentBlock.find('.PU8-copyTitle');


					blockTitle.each(function(){
						$(this).prepend('<i class="fa fa-chevron-down c-tabcordion__chevron" aria-hidden="true"></i>');
					});

					$(blockTitle).click(function(e){
						const $thisTitle = $(this);
						if (!$thisTitle.hasClass('PU8-contentOpen')) {
              $thisTitle.addClass('PU8-contentOpen');
							$thisTitle.next('.PU8-content').addClass('PU8-content_showing');
				
							/*if ($(blockTitle).not($thisTitle).hasClass('PU8-contentOpen')) {
								$(blockTitle).not($thisTitle).removeClass('PU8-contentOpen')
								$(blockTitle).not($thisTitle).next('.PU8-content').removeClass('PU8-content_showing');
							}*/
						}else {
							if ($($thisTitle).hasClass('PU8-contentOpen')) {
								$($thisTitle).removeClass('PU8-contentOpen');
								$thisTitle.next('.PU8-content').removeClass('PU8-content_showing');
							}
						}
					});
          
          const prescriptionLink = $('.PU8-anchor-pres');
          prescriptionLink.click(function(e){
						$('#PU8-prescription h2').click();
						e.preventDefault();
						let target = e.target;
						let thisTarget = target.getAttribute("href");
						let targetOffset = $(thisTarget).offset().top - 200;
            
           //  scrollTo(0, targetOffset);
						$('body,html').animate({
							scrollTop: targetOffset
						}, 100);
					});

					/*open accordion on what we treat click*/
					const treatlink = $('.PU8-link.PU8-sectionHeader .PU8-anchor-treat');

					treatlink.click(function(e) {
						treatBlock.find('.PU8-copyTitle').click();
						e.preventDefault();
						let target = e.target;
						let thisTarget = target.getAttribute("href");
						let targetOffset = $(thisTarget).offset().top - 200;
            
           //  scrollTo(0, targetOffset);
						$('body,html').animate({
							scrollTop: targetOffset
						}, 100);
					});
				}
				accordion();

				const reviewSlider = () => {
					const tpReviews = $('<iframe frameborder="0" scrolling="no" title="Customer reviews powered by Trustpilot" src="https://widget.trustpilot.com/trustboxes/54ad5defc6454f065c28af8b/index.html?locale=en-GB&amp;templateId=54ad5defc6454f065c28af8b&amp;businessunitId=5596856f0000ff000580ae50&amp;styleHeight=220px&amp;styleWidth=100%25&amp;theme=light&amp;stars=5" style="position: relative; height: 220px; width: 100%; border-style: none; display: block; overflow: hidden;"></iframe>'); 
					tpReviews.appendTo('.PU8-wrapper');
	
				}
				reviewSlider();

			}

			//--------------------------------
			//Add the smooth scroll on link clicks
			//--------------------------------
			const smoothScroll = () => {
				//add ids to the sections
				const doctorsSection = $('#hs_cos_wrapper_widget_1469185071725');
        const uspAnchors = $('.PU8-anchor');

				uspAnchors.each(function(){
					const $this = $(this);
					$this.on('click', function(e) {
						e.preventDefault();
            const thisTarget = $this.attr('href');
            let targetOffset;

            if(thisTarget === '#hs_cos_wrapper_widget_1469185071725'){
              targetOffset = $(thisTarget).offset().top - 100;
            } else {
              targetOffset = $(thisTarget).offset().top - 720;
            }
  
						$('html,body').animate({
							scrollTop: targetOffset
				   		}, 2000);
				  	});
				});
      }
      
			//Add the doctor text
			const doctorsMessage = () => {
				const doctorWrapper = $('.custom-background-module.whiteBG.pdr6Circles.twoCol6').find('.page-center.content-wrapper > div:first');

				const doctorsMessage = $(`<p class="PU8-doctorText">a smart network of NHS-trained GPs across the UK</p>`);
				doctorsMessage.appendTo(doctorWrapper);
			}

			//--------------------------------
			//Events
			//--------------------------------
			const events = () => {
        const bookNow = $('.PU8-book');
        const learnMore = $('.PU8-anchor:first');
				const getAppLink = $('.PU8-applink');
				const meetDoctorsLink = $('.PU8-doctorLink');
				const videoPlay = $('.PU8-video_container');
				const whatWeTreatLink = $('.PU8-link.PU8-sectionHeader a');
				const pricingLink = $('.PU8-pricingLink');
				const accordionTabs = $('.PU8-copyBlock');
				const treatmentInnerLink = $('.PU8-treatment_links');
				const childLink = $('.PU8-childLink');
				
				learnMore.click(function(){
					utils.events.send('PU008 v2', 'Learn more click','PU008 clicked Need a prescription? Learn More link', {
            sendOnce: true
          });
        });
        
				bookNow.click(function(){
					utils.events.send('PU008 v2', 'Book appointment click','PU008 clicked book an appointment', {
            sendOnce: true
          });
        });
        
				getAppLink.click(function(){
					utils.events.send('PU008 v2', 'get app click','PU008 clicked get the app link', {
            sendOnce: true
          });
        });
        
				meetDoctorsLink.click(function(){
					utils.events.send('PU008 v2', 'meet doctors click','PU008 clicked meet our doctors anchor', {
            sendOnce: true
          });
        });
        
				whatWeTreatLink.click(function(){
					utils.events.send('PU008 v2', 'what we treat click','PU008 clicked on what we treat link', {
            sendOnce: true
          });
        });
        
				pricingLink.click(function(){
					utils.events.send('PU008 v2', 'learn more about pricing click','PU008 clicked on find out about pricing link', {
            sendOnce: true
          });
        });
        
				accordionTabs.click(function(){
					utils.events.send('PU008 v2', 'Opened the tabs','PU008 opened the Concertina tabs', {
            sendOnce: true
          });
        });
        
				treatmentInnerLink.click(function(){
					utils.events.send('PU008 v2', 'what we treat click','PU008 Inner what we treat links clicked in the tabs', {
            sendOnce: true
          });
        });
        
				childLink.click(function(){
					utils.events.send('PU008 v2', 'child consultations','PU008 learn more about child consultations link', {
            sendOnce: true
          });
				});
			}

			//run all the functions
			scollingHeadermessage();
			stagesSlider();
			videoUsps();
			sideUsps();
			contentBlocks();
			smoothScroll();
			doctorsMessage();
			events();
		}

		//do the pricing accordion now
		$.getScript('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', function() { 
			newLayout();
		});
	};

  // Audience conditions
	const triggers = (() => {
		UC.poller([
			'#hs_cos_wrapper_widget_1469185071725',
			'.three-col-howItWorks.custom-background-module.whiteBG',
			'.custom-background-module.whiteBG.pdr6Circles.twoCol6',
			() => !!window.jQuery,
			() => !!window.ga,
		], () => {
			$ = window.jQuery;
			utils.fullStory('PU008', 'Variation 2');
			activate();
		});
	})();
})();
