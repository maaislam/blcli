import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as content from './lib/PU005-content';

// eslint-disable-next-line no-unused-vars
const PU005 = (() => {
  let $ = null;
  const activate = () => {
    const $body = $('body');
    $body.addClass('PU005');

    const $bodySection = $('.body-container-wrapper');

    //-------------------------
    // Top header
    //-------------------------
    const topHeader = () => {
      const URL = window.location.pathname;

      // revert the logo to black
      const header = $('.header-group .header');
      header.find('.PDR-logo-white.w-logo-img')
        .removeClass('PDR-logo-white')
        .addClass('PDR-logo-black');

      const topContent = content.topHeader;
      const topWrapper = $('<div class="PU005-top_content"/>');
      topWrapper.prependTo($bodySection);
      topWrapper.html(topContent);

      // add the ticks
      const topTicks = content.ticks;
      topTicks.forEach((element) => {
        $(`<li class="PU005-tickText">${element}</li>`).appendTo('.PU005-ticks');
      });

      const headerTitle = $('.PU005-top_content h1');
      if (URL.indexOf('antibiotics-online') > -1) {
        headerTitle.text('Antibiotics');
      } else {
        headerTitle.text('Online prescriptions');
      }
    };

    topHeader();

    const mainContent = () => {
      //-------------------------
      // Main content wrapper
      //-------------------------
      const contentInner = content.pageMarkup;
      // const prescriptionsMarkup = content.prescriptionContent;
      // const aboutMarkup = content.aboutContent;
      // const trustPilotMarkup = content.trustpilotContent;

      const mainWrap = $('<div class="PU5-main_section"/>');
      mainWrap.insertAfter('.PU005-top_content');
      mainWrap.html(contentInner);
      mainWrap.find('.PU5-prescriptions').html(content.prescriptionContent);
      mainWrap.find('.PU5-about').html(content.aboutContent);
      mainWrap.find('.PU5-trustpilot').html(content.trustpilotContent);

      //-------------------------
      // Prescription types section
      //-------------------------
      const prescriptionWrap = $('.PU5-prescriptions');

      const prescriptionTypes = () => {
        const header = $('.header-group');
        header.append('<div class="PU5-headerTypes"><p>Prescription Types:</p></div>');

        const types = content.prescriptionTypes;
        types.forEach((element) => {
          const presType = $(`<div class="PU5-type"><a href="${element[1]}">${element[0]}</a></div>`);
          prescriptionWrap.find('.PU5-types_wrap').append(presType);
        });

        prescriptionWrap.find('.PU5-prescriptions_inner').clone().appendTo('.PU5-headerTypes');
      };

      prescriptionTypes();

      //-------------------------
      // About Us section
      //-------------------------
      const aboutSection = () => {
        //-------------------------
        // Add logos
        //-------------------------
        // const aboutURL = 'https://www.pushdoctor.co.uk/about';
        const logoBlock = $('.PU5-logos');
        const { logoImages } = content;

        logoImages.forEach((image) => {
          $(`<img src="${image}"/>`).appendTo(logoBlock);
        });

        logoBlock.slick({
          autoplay: true,
          arrows: false,
        });

        // add the boxes of content
        const aboutUsBoxes = content.aboutBlocks;

        // loop through the object for the content
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in aboutUsBoxes) {
          const blockObj = aboutUsBoxes[key];

          $('.PU5-twoBlocks').append(`
            <div class="PU5-block">
              <div class="PU5-head">
                <h2>${blockObj.title}</h2>
              </div>
              <div class="PU5-block_text">
                ${blockObj.content}
              </div>
              <div class="PU5-blocktext-image"/>
              ${blockObj.link}
            </div>
          `);
        }
      };

      aboutSection();

      //-------------------------
      // Add trustpilot content
      //-------------------------
      const trustPilot = () => {
        const trustPilotWrapper = $('.PU5-wrap.PU5-trustpilot');
        trustPilotWrapper.find('.PU5-trustpilot_total').append(`
          <div class="PU5-rating">
            <div class="PU5-stars"/>
            <p>7.4 out of 10</p>
            <a href="https://uk.trustpilot.com/review/pushdoctor.co.uk">See all 1,256 reviews on</a>
            <div class="PU5-logo"/>
          </div>
        `);
      };

      trustPilot();

      //-------------------------
      // Add the accordion
      //-------------------------
      const accordion = () => {
        // loop through all the content
        const accordionContent = content.accordion; // this is the object

        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in accordionContent) {
          const accObj = accordionContent[key];

          const accordionBlock = $(`
          <div class="PU5-accordionSection" id="${accObj.type}">
            <h3>${accObj.title}<i class="fa fa-chevron-down c-tabcordion__chevron" aria-hidden="true"></i></h3>
            <div class="PU5-acc_section">
              <div class="PU5-acc_points"/>
              <div class="PU5-cta_wrap">
                <span>Speak to a doctor and get your <span class="PU5-acc_title">${accObj.title}</span></span>
                <a class="PU5-book btn_seeadoctor_black" href="https://patient.pushdoctor.co.uk/see-a-doctor-2/select-time">Book your appointment</a>
                <a class="PU5-faq_link" href="#PU5-faq">Frequently asked questions about prescriptions</a>
              </div>
              <div class="PU5-tp_reviews"/>
            </div>
          </div>`).appendTo('.PU5-available_prescriptions');

          // add the bullet points for each one
          const acordBullets = accObj.content;
          // eslint-disable-next-line no-loop-func
          acordBullets.forEach((item) => {
            $(`<li>${item}</li>`).appendTo(accordionBlock.find('.PU5-acc_points'));
          });
        }

        // Accordion functionality
        const accordionHeading = document.querySelectorAll('.PU5-accordionSection h3');

        // loop through each section, on click add the class to the content
        accordionHeading.forEach((item) => {
          item.addEventListener('click', () => {
            if (item.nextElementSibling.classList.contains('PU5-section_active')) {
              item.nextElementSibling.classList.remove('PU5-section_active');
              item.parentElement.classList.remove('PU5-title_active');
            } else {
              item.nextElementSibling.classList.add('PU5-section_active');
              item.parentElement.classList.add('PU5-title_active');
            }
          });
        });
      };

      accordion();

      //-------------------------
      // Add the existing reviews to accordion content
      //-------------------------
      // const reviewSlider = () => {
      //   const tpReviews = $('<iframe frameborder="0" scrolling="no" title="Customer reviews powered by Trustpilot" src="https://widget.trustpilot.com/trustboxes/54ad5defc6454f065c28af8b/index.html?locale=en-GB&amp;templateId=54ad5defc6454f065c28af8b&amp;businessunitId=5596856f0000ff000580ae50&amp;styleHeight=220px&amp;styleWidth=100%25&amp;theme=light&amp;stars=5" style="position: relative; height: 220px; width: 100%; border-style: none; display: block; overflow: hidden;"></iframe>');
      //   tpReviews.appendTo('.PU5-tp_reviews');
      // }


      //-------------------------
      // Anchor the links
      //-------------------------
      const anchorScroll = () => {
        const typeLinks = $('.PU5-type a');
        typeLinks.on('click', (e) => {
          e.preventDefault();
          const { target } = e;
          const thisTarget = target.getAttribute('href');
          const targetOffset = $(thisTarget).offset().top - 200;

          $('body,html').animate({
            scrollTop: targetOffset,
          }, 600);

          // open the accordion based on the link clicked
          $(`.PU5-accordionSection${thisTarget} h3`).click();
          utils.events.send('PU005 Prescription / Antibiotics Redesign', 'Type Click', 'PU005 type of prescription clicked', {
            sendOnce: true,
          });
        });
      };

      anchorScroll();


      //-------------------------
      // Add the exact minute to next appointment
      //-------------------------
      const nextAppointment = () => {
        function ajaxRequest(url, successCb) {
          const request = new XMLHttpRequest();
          request.open('POST', url, true);
          request.setRequestHeader('Content-Type', 'application/json');
          request.setRequestHeader('Accept', 'application/json');
          request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
              if (successCb) {
                successCb(request.responseText);
              }
            }
          };

          request.send();
        }

        const appointmentTimeEl = document.querySelector('.PU005-time');
        const accordionTimeEl = document.querySelector('.PU005-acc_time');
        if (appointmentTimeEl) {
          ajaxRequest('https://svcs.pushsvcs.com/general.svc/generalW/GetHomeMessage', (response) => {
            const json = JSON.parse(response);
            const { strTop } = json.GetHomeMessageResult;
            const mins = strTop.match(/\d+/);
            // eslint-disable-next-line no-shadow
            let content;
            if (mins) {
              content = `in the next <span class="PU5-time">${mins[0]} minutes</span>`;
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
            accordionTimeEl.innerHTML = content;
          });
        }
      };
      nextAppointment();

      //-------------------------
      // Add the faqs
      //-------------------------
      const questions = () => {
        const faqWrap = $('.PU5-faq_content');
        faqWrap.html(content.faqContent);

        const questionContent = content.faqs;

        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in questionContent) {
          const faqObj = questionContent[key];

          const faq = $(`
            <div class="PU5-question_block">
              <h3 class="PU5-question">
                ${faqObj.question}
              </h3>
              <p>${faqObj.answer}</p>
            </div>
          `);
          faq.appendTo('.PU5-faq_slider');
        }
        $('.PU5-faq_slider').slick();

        // FAQ smooth scroll
        const faqLink = $('.PU5-faq_link');
        if (faqLink.length) {
          $(faqLink).on('click', (e) => {
            e.preventDefault();
            $('body,html').animate({
              scrollTop: $('.PU5-wrap.PU5-faq_content').offset().top - 100,
            }, 600);
          });
        }

        // Click through FAQ event
        faqWrap.find('.PU5-faq_slider').on('swipe', () => {
          utils.events.send('PU005 Prescription / Antibiotics Redesign', 'Faq Swipe', 'PU005 Swiped through Faqs', {
            sendOnce: true,
          });
        });
      };
      questions();
    };
    $.getScript('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', mainContent);
  };

  // Audience conditions
  const triggers = () => {
    UC.poller([
      '.body-container-wrapper',
      () => !!window.jQuery,
    ], () => {
      $ = window.jQuery;
      utils.fullStory('PU005', 'Variation 1');
      activate();
    });
  };
  triggers();
})();
