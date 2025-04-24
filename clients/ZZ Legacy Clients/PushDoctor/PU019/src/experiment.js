/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as content from './lib/PU19-html.js';

const PU019 = (() => {
	let $ = null;

	const activate = () => {
		document.body.classList.add('PU019');
		utils.fullStory('PU019', 'Variation 1');

		const pageWrapper = document.querySelector('.body-container-wrapper');

		const newPage = document.createElement('div');
		newPage.classList.add('PU019-newLayout');
		pageWrapper.insertBefore(newPage, pageWrapper.firstChild);

		//add the blocks
		const contentBlocks = content.imageBlocks;
		for (const key in contentBlocks) {
			if (contentBlocks.hasOwnProperty(key)) {
				const element = contentBlocks[key];

				var newBlock = document.createElement('div');
				newBlock.classList.add('PU019-block');
				newBlock.classList.add(element.imageClass);

				const URL = window.location.pathname;
				let titleText,
				innerBannerText;

				if(element.centerinnerText){
					if(URL.indexOf('clinic') > -1){
						titleText = element.walkinClinicTitle;
						innerBannerText = element.clinicinnerText;
					}else{
						titleText = element.walkinCentreTitle;
						innerBannerText = element.centerinnerText;
					}
				}else{
					titleText = element.bannerTitle;
					innerBannerText = element.innerText;
				}

				newBlock.innerHTML = 
				`<div class="PU019-blockInner ${element.imageClass}">
					<div class="PU019-banner_text">
						<div class="PU019-title">${titleText}</div>
						${innerBannerText}
						<a href="${element.CTALink}">${element.CTAtext}</a>
					</div>
					<div class="PU019-block_image_item"></div>
				</div>
				${element.bottomElement}`;
				
			}
			newPage.appendChild(newBlock);
		}

		//add the first usps
		const firstBlockUsps = document.querySelector('.PU019-walk_in .PU019-three_usps');
		const usps = content.topUsps;
		usps.forEach(element => {
			const uspText = document.createElement('div');
			uspText.classList.add('PU019-usp_text');
			uspText.innerHTML = `<span>${element}</span>`;

			firstBlockUsps.appendChild(uspText);
		});

		// add the reviews
		const reviewSection = document.querySelectorAll('.PU019-review');
		for (let i = 0; i < reviewSection.length; i++) {
			const element = reviewSection[i];

			let reviewObj;
			if(element.classList.contains('PU019-ed_story')){
				reviewObj = content.reviews.review1;
			}
			if(element.classList.contains('PU019-steph_story')){
				reviewObj = content.reviews.review2;
			}
			element.innerHTML =
      `<div class="PU019-video_box">
        <div class="PU019-exit_video">&times;</div>
        <div class="PU019-video-iframe"></div>
      </div>
      <div class="PU019-video_overlay"></div>
      <img src="${reviewObj.image}"/>
			<div class="PU019-reviewText">
        <p>${reviewObj.review}</p>
				<div class="PU019-videoLink"><span>Watch ${reviewObj.name}'s story</span></div>
      </div>`;

      // when the video link is clicked add the iframe
      const videoIframe = reviewObj.video;
      const reviewLink = element.querySelector('.PU019-videoLink');
      const reviewVideo = element.querySelector('.PU019-video_box');
      const videoOverlay = element.querySelector('.PU019-video_overlay');

      const video = element.querySelector('.PU019-video-iframe');
      reviewLink.addEventListener('click', () => {
        video.insertAdjacentHTML('beforeend', `<div class="PU019-video">${videoIframe}</div>`);
        reviewVideo.classList.add('PU019-videoShowing');
        videoOverlay.classList.add('PU019-overlay_active');
      });

      // destroy the iframe and close box on exit click
      const exitVideo = element.querySelector('.PU019-exit_video');
      exitVideo.addEventListener('click', () => {
        const iframe = document.querySelector('.PU019-video');
        iframe.remove();
        reviewVideo.classList.remove('PU019-videoShowing');
        videoOverlay.classList.remove('PU019-overlay_active');
      });

      //destroy the iframe and close box on overlay click
      videoOverlay.addEventListener('click', () => {
        const iframe = document.querySelector('.PU019-video');
        iframe.remove();
        reviewVideo.classList.remove('PU019-videoShowing');
        videoOverlay.classList.remove('PU019-overlay_active');
      });

    }
   
		//add the time to next appointment on one of the banners
		const nextAppointment = () => {
			
			function ajaxRequest(url, successCb) {
				var request = new XMLHttpRequest();
				request.open('POST', url, true);
				request.setRequestHeader('Content-Type', 'application/json');
				request.setRequestHeader('Accept', 'application/json');
				request.onload = function() {
					if (request.status >= 200 && request.status < 400) {
						if (successCb) {
							successCb(request.responseText);
						}
					}
				};

				request.send();
			}
			const appointmentTimeEl = document.querySelector('.PU019-time');
			
			if (appointmentTimeEl) {
				ajaxRequest('https://svcs.pushsvcs.com/general.svc/generalW/GetHomeMessage', (response) => {
					var json = JSON.parse(response);
					var strTop = json.GetHomeMessageResult.strTop;
					const mins = strTop.match(/\d+/);
					let content;
					if (mins) {
						content = `in the next ${mins[0]} minutes`;
					} else {
						switch (strTop) {
							case 'Book an appointment today':
							content = 'today';
							break;
							
							case 'We’re open at 6am, book now':
							content = 'from 6am';
							break;
		
							default:
							break;
						}
					}
					
					appointmentTimeEl.innerHTML = content;
				});
			}
		}
		nextAppointment();


		//bottom USPS
		const bottomUspWrapper = document.querySelector('.PU019-bottom_usps'),
    bottomUspArray = content.bottomUSPs;
		bottomUspArray.forEach(element => {
			const usp = document.createElement('div');
			usp.classList.add('PU019_bottom_usp');
			usp.innerHTML = `<div class="PU019-bottomusp_text"><span>${element[0]}</span><p>${element[1]}</p></div>`;
			bottomUspWrapper.appendChild(usp);
		});

		//add sticky CTA
		const stickyHeader = document.querySelector('.header-group');
		/* stickyCTA = document.createElement('div');
		stickyCTA.classList.add('PU019-stickyCTA');
		stickyCTA.innerHTML = `<a href="https://patient.pushdoctor.co.uk/see-a-doctor-2/select-time">See a Doctor</a>`;
		 */
    //stickyHeader.appendChild(stickyCTA);
		//add trustpilot
		const trustpilot = document.querySelector('.PU019-trustpilot');
		trustpilot.innerHTML = 
		`<div class="PU019-mobile_tp">
			<div class="PU019-tp_image"></div>
			<p>We\'re rated as <span>great</span> on TrustPilot</p>
		</div>
		<div class="PU019-desktop_tp">
			<span>GREAT</span><div class="PU019-tp_image_desktop"></div>
			<p>Based on <span>1,400</span> reviews. See some of the reviews here. <a href="https://uk.trustpilot.com/review/pushdoctor.co.uk?utm_medium=trustboxes&utm_source=DropDown"><span class="PU019-tplogo"></span></a></p>
		</div>`;

    //move trustpilot widget to new layout if it exists
    let trustpilotWidget;
    const trustpilotWidgetFirst = document.getElementById('hs_cos_wrapper_widget_1505303337510');
    const trustpilotWidgetSecond = document.getElementById('hs_cos_wrapper_widget_1511981560088');
		if(trustpilotWidgetFirst){
      trustpilotWidget = trustpilotWidgetFirst;
		}else if(trustpilotWidgetSecond){
      trustpilotWidget = trustpilotWidgetSecond;
    }
    if(trustpilotWidget){
      newPage.appendChild(trustpilotWidget);
    }
		

		if(window.innerWidth > 1200){
			//add the new nav links
			const desktopNav = content.navLinks;
			const newNavContainer = document.createElement('div');
			newNavContainer.classList.add('PU019-newNav');

			stickyHeader.appendChild(newNavContainer);
			

			for (const key in desktopNav) {
				if (desktopNav.hasOwnProperty(key)) {
					const element = desktopNav[key];

					var newNavLink = document.createElement('li');
					newNavLink.classList.add(element.identifier);
					newNavLink.innerHTML = `<a href="${element.link}">${element.linkname}</a>`;
				}
				newNavContainer.appendChild(newNavLink);
			}
		}
	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'.body-container-wrapper',
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			activate();
		});
	})();

})();
