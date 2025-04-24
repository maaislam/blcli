import { fullStory, events } from '../../../../lib/utils';
import { poller, throttle } from '../../../../lib/uc-lib';
import RC010 from './lib/RC010';

/**
 * {{RC032}} - {{Course Details optimisation - Mobile}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC032',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    if (window.innerWidth < 768) {
      RC010();
      // Setup
      const { settings, services } = Experiment;
      services.tracking();
      /* eslint-disable no-trailing-spaces */
      if (settings.VARIATION === '1') {
        // Changes selected option on Course Search Form
        poller(['.course-search-form  .form-course-type select'], () => {
          const courseTitle = document.querySelector('h1').textContent.trim();
          const selectOptions = document.querySelector('.course-search-form  .form-course-type select');
          let opt;
          for (let i = 0; i < selectOptions.length; i += 1) {
            opt = selectOptions.options[i];
            if (opt.innerHTML === courseTitle) {
              selectOptions.selectedIndex = i;
              break;
            }
          }
        });
        
        poller(['.slick-slide'], () => {
          document.body.classList.add(settings.ID);
          const url = window.location.href;
          const pageHeading = document.querySelector('h1');
          if (/First-aid-for-baby-and-child.aspx/.test(url) || /Paediatric-first-aid.aspx/.test(url) || /First-aid-for-adult.aspx/.test(url)) {
            const learnAndShareBanner = `<div class='RC032-learnAndShareWrapper'>
            <div class='RC032-learnAndShareImgContainer'><div id='RC032-learnAndShare__img'></div></div>
            <a id='RC032-learnAndShare__link' href='https://twitter.com/hashtag/learnandshare'>Championing the #LearnAndShare initiative</a>
            </div>`;
            pageHeading.insertAdjacentHTML('beforebegin', learnAndShareBanner);
          } else if (/Emergency-first-aid-at-work.aspx/.test(url) || /First-aid-at-work.aspx/.test(url)) {
            const trustPilotReviewWidget = document.querySelector('.trustpilot-widget');
            pageHeading.insertAdjacentElement('beforebegin', trustPilotReviewWidget);
          }
  
          // Booking content
          const bookingWrapper = document.querySelector('.booking_inner-wrap');
          const findCourseButton = bookingWrapper.querySelector('a');
          findCourseButton.id = 'RC032-findCourse';
          const informationList = bookingWrapper.querySelector('ul');
          const bookingDetailsText = bookingWrapper.querySelector('p');
          const courseTitleHeader = document.querySelector('h1');
          const courseTitle = courseTitleHeader.innerText;
          bookingDetailsText.insertAdjacentElement('beforebegin', informationList);
  
          bookingDetailsText.innerHTML = `<div class='RC032-searchForCourse'><h2>Search for </h2><div id='RC032-courseTitle'>${courseTitle}</div> courses near</div>`;// eslint-disable-line quotes
          bookingDetailsText.insertAdjacentHTML('afterend', `<div class='RC032-searchForCourse RC032-searchForCourse__sticky-nav' style='display: none;'><p>Search for <span id='RC032-courseTitle'>${courseTitle}</span> courses near</p></div>`);// eslint-disable-line quotes
          const postCodeInput = document.querySelector('#main_0_contentlastitem_0_searchInputContainer');
          bookingWrapper.querySelector('.RC032-searchForCourse').insertAdjacentElement('beforeend', postCodeInput);
          bookingWrapper.querySelector('#RC032-findCourse').insertAdjacentHTML('beforebegin', `<div class='RC032-changeDateRange'><p>We'll search for the soonest available courses in the next 30 days <span id='RC032-changeDateRange__link'>Change date range</span></p></div>`);// eslint-disable-line quotes
          // Moves small text below price
          const smallText = bookingWrapper.querySelector('.rc010-smallText');
          informationList.insertAdjacentElement('afterend', smallText);
  
          /**
           * @desc Click on change date range
           */
          bookingWrapper.querySelector('#RC032-changeDateRange__link').addEventListener('click', (e) => {
            e.preventDefault();
            const dateChangeForm = document.querySelector('.form-daterange');
            bookingWrapper.querySelector('.RC032-changeDateRange').insertAdjacentElement('afterend', dateChangeForm);
          });
          /**
           * @desc Click on Find Courses
           */
          bookingWrapper.querySelector('#RC032-findCourse').addEventListener('click', (e) => {
            e.preventDefault();
            bookingWrapper.querySelector('#main_0_contentlastitem_0_TownOrPostCodeFormField_Button_DoSearch').click();
          });
          // Changes CTA button text
          bookingWrapper.querySelector('a').innerHTML = 'Find your course';
          // CTA - GA Event
          bookingWrapper.querySelector('a').addEventListener('click', () => {
            events.send('RC032', 'Clicked on Find Your Course', url);
          });
  
          // Adds Related Courses link below contact information
          const bookingContactInfo = document.querySelector('.RC010_course_information>strong');
          const relatedCoursesLink = `<p class='RC032-relatedCourses'>Not what you need? <a class='RC032-relatedCourses__link'>See these alternative courses</a><p>`;// eslint-disable-line quotes
          bookingContactInfo.insertAdjacentHTML('afterend', relatedCoursesLink);
  
          // Moves 'It's Perfect For' block first on the list
          const perfectForBlock = document.querySelectorAll('.RC010_info_block')[3];
          const relatedCoursesLineLink = document.querySelector('.RC032-relatedCourses');
          relatedCoursesLineLink.insertAdjacentElement('afterend', perfectForBlock);
          perfectForBlock.insertAdjacentHTML('beforeend', `<p class='RC032-relatedCourses'>Not what you need?<a class='RC032-relatedCourses__link'>See these alternative courses</a></p>`);// eslint-disable-line quotes
          perfectForBlock.classList.add('RC032-firstBlock');
  
          // Sticky Nav Event Listener
          let waypoint = services.getPosition(document.querySelector('.RC010_course_information > strong')).y;
          setTimeout(() => {
            // Redefine slider height
            waypoint = services.getPosition(document.querySelector('.RC010_course_information > strong')).y;
          }, 3000);
          services.detectScroll(waypoint, bookingWrapper, postCodeInput);
  
  
          // Builds info block accordion
          const infoBlocks = document.querySelectorAll('.RC010_info_block');
          if (infoBlocks) {
            for (let i = 0; i < infoBlocks.length - 1; i++) { // eslint-disable-line no-plusplus
              let blockTitleHeader = infoBlocks[i].querySelector('h2');
              blockTitleHeader.remove();
              const blockTitle = blockTitleHeader.innerHTML;
              const blockContent = infoBlocks[i].innerHTML;
              if (i === 0) {
                infoBlocks[i].innerHTML = `<div class='RC032-infoBlock__panel' style='display: block;'>${blockContent}</div>`;// eslint-disable-line quotes
                blockTitleHeader = `<div class='RC032-infoBlock__accordion active'><h2>${blockTitle}<i class='RC032-blockTitle up'></i></h2></div>`;// eslint-disable-line quotes
              } else {
                infoBlocks[i].innerHTML = `<div class='RC032-infoBlock__panel' style='display: none;'>${blockContent}</div>`;// eslint-disable-line quotes
                blockTitleHeader = `<div class='RC032-infoBlock__accordion'><h2>${blockTitle}<i class='RC032-blockTitle down'></i></h2></div>`;// eslint-disable-line quotes
              }
              infoBlocks[i].insertAdjacentHTML('afterbegin', blockTitleHeader);
            }
          }
  
          // Accordion
          /* eslint-disable */
          const accordion = document.querySelectorAll('.RC032-infoBlock__accordion');
          for (let i = 0; i < accordion.length; i++) { // eslint-disable-line no-plusplus
            accordion[i].addEventListener('click', function() { // eslint-disable-line func-names
              this.classList.toggle('active');
              var panel = this.nextElementSibling;
              if (panel.style.display === 'block') {
                panel.style.display = 'none';
                this.querySelector('h2>i').className = 'RC032-blockTitle down';
              } else {
                panel.style.display = 'block';
                this.querySelector('h2>i').className = 'RC032-blockTitle up';
              }
            });
          }
          /* eslint-enable */
          // Star Reviews
          /* eslint-disable */
          const reviews = document.querySelectorAll('.RC010_review_slide');
          for (let i = 0; i < reviews.length; i++) {
            const starsString = reviews[i].querySelector('span').innerHTML.replace(/[^0-9]/g,'');
            const stars = parseInt(starsString);
            reviews[i].querySelector('span').innerHTML = reviews[i].querySelector('span').innerHTML.replace(/ *\([^)]*\) */g, '');
            let star = '';
            for (let i = 0; i < stars; i++) {
              star = star + `<div class='star-${i+1}'>
              <img src='//images-static.trustpilot.com/community/shared/sprite_star.png' class='star-image' alt=''>
              </div>`;
            }
            reviews[i].insertAdjacentHTML('beforeend', star);
          }
          /* eslint-enable */
          // New block content for 'Why train with Bristish Red Cross'
          const accordionBlocks = document.querySelectorAll('.RC010_info_block');
          const lastInfoBlock = accordionBlocks[accordionBlocks.length - 1];
          const whyTrainBlock = `<div class='RC032-whyTrainWrapper'>
          <h2 class='RC032-whyTrain__title'>Why train with British Red Cross?</h2>
          <img src='//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/80f0bf76d33a1200781b8232db09be75_training_page_cropped.jpg'>
          <p class='RC032-whyTrain__content'>Learn in a friendly environment where you'll have the chance to ask questions and practice your skills. Our goal is to build confidence and ensure you remember what you've learned.</p>
          <ul>
          <li>No more than <strong>15 people</strong> per group</li>
          <li>Up-to-date teaching from externally <strong>accredited trainers</strong></li>
          </ul>
          </div>`;
          lastInfoBlock.insertAdjacentHTML('beforebegin', whyTrainBlock);
          lastInfoBlock.classList.add('RC032-oneLiner');
          // Related Courses amend title and content
          const relatedCoursesBlock = document.querySelector('.RC010_snippet_block');
          relatedCoursesBlock.querySelector('h3').innerHTML = 'Alternative Courses';
          relatedCoursesBlock.insertAdjacentHTML('beforeend', `<div class='RC032-relatedCourses__link'><a href='https://www.redcrossfirstaidtraining.co.uk/Courses.aspx'>Or see all first aid courses</a></div>`);// eslint-disable-line quotes
          // Lightbox
          const relatedCoursesContent = relatedCoursesBlock.innerHTML;
          const lightBoxWrapper = `<div class='RC032-lightBox'>${relatedCoursesContent}<span id='RC032-lightBox__close'></span></div>`;// eslint-disable-line quotes
          relatedCoursesBlock.insertAdjacentHTML('afterend', lightBoxWrapper);
          const lightBox = document.querySelector('.RC032-lightBox');
          document.querySelector('.RC032-relatedCourses__link').addEventListener('click', () => {
            lightBox.style.display = 'block';
            events.send('RC032', 'Clicked on Alternative Courses link', url);
          });
          perfectForBlock.querySelector('.RC032-relatedCourses__link').addEventListener('click', () => {
            lightBox.style.display = 'block';
            events.send('RC032', 'Clicked on Alternative Courses link', url);
          });
          lightBox.querySelector('#RC032-lightBox__close').addEventListener('click', () => {
            lightBox.style.display = 'none';
          });
          // Replaces Slider with Video
          if (/First-aid-for-baby-and-child.aspx/.test(url) || /Paediatric-first-aid.aspx/.test(url)) {
            const slickSlider = document.querySelector('.RC010_course_slider.slick-initialized.slick-slider');
            slickSlider.style.display = 'none';
            const courseInformation = document.querySelector('.RC010_course_information');
            const courseVideoContainer = `<div class='RC032-courseVideo'><iframe id='ytplayer' width='560' height='315' src='https://www.youtube.com/embed/HZiY9zU2dhE?enablejsapi=1' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen=''></iframe></div>`;// eslint-disable-line quotes
            courseInformation.insertAdjacentHTML('afterend', courseVideoContainer);
          } else if (/First-aid-for-adult.aspx/.test(url)) {
            const slickSlider = document.querySelector('.RC010_course_slider.slick-initialized.slick-slider');
            slickSlider.style.display = 'none';
            const courseInformation = document.querySelector('.RC010_course_information');
            const courseVideoContainer = `<div class='RC032-courseVideo'><iframe id='ytplayer' width='560' height='315' src='https://www.youtube.com/embed/ZTs4p0NrLN4?enablejsapi=1' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe></div>`;// eslint-disable-line quotes
            courseInformation.insertAdjacentHTML('afterend', courseVideoContainer);
          }
          // Course video - GA event
          /* eslint-disable */
          const courseVideo = document.querySelector('#ytplayer');
          if (courseVideo) {
            const tag = document.createElement('script');
            tag.id = 'iframe-demo';
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
            let player;
            window.onYouTubeIframeAPIReady = function() {
              player = new YT.Player('ytplayer', {
                  events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                  }
              });
            }
            
            function onPlayerReady(event) {
              document.getElementById('ytplayer').style.borderColor = '#FF6D00';
            }
            function onPlayerStateChange(event) {
              if(event.data == YT.PlayerState.PLAYING) {
                events.send('RC032', 'Clicked on Video Course', url);
              }
            }
          }
          /* eslint-enable */
          // Carousel Slide - GA Event
          const carouselSlider = document.querySelector('.RC010_course_slider');
          if (carouselSlider) {
            carouselSlider.addEventListener('click', () => {
              events.send('RC032', 'Clicked on Carousel Slider', url);
            });
          }
          // Concertinaed Sections - GA event
          const concertinaedSections = document.querySelectorAll('.RC032-infoBlock__accordion');
          [].forEach.call(concertinaedSections, (section) => {
            section.addEventListener('click', () => {
              const sectionTitle = section.querySelector('h2').textContent;
              events.send('RC032', 'Clicked on Concertinaed Section', sectionTitle);
            });
          });
          // Alternative Courses link - GA Event
          const alternativeCoursesNames = document.querySelectorAll('.RC010_other_courses .RC010_course_name>a');
          if (alternativeCoursesNames) {
            [].forEach.call(alternativeCoursesNames, (course) => {
              course.addEventListener('click', () => {
                const courseName = course.textContent.slice(0, -1);
                events.send('RC032', 'Clicked on Alternative Course Name', courseName);
              });
            });
          }
          // 'Or see all first aid courses' link - GA Event
          const alternativeCoursesBottomLink = document.querySelector('.RC010_snippet_block .RC032-relatedCourses__link>a');
          if (alternativeCoursesBottomLink) {
            alternativeCoursesBottomLink.addEventListener('click', () => {
              events.send('RC032', 'Clicked on Or See All First Aid Courses', url);
            });
          }
        });
      }
      // Experiment - GA Event
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    }
    /* eslint-enable */
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    /* eslint-disable */
    detectScroll: function detectScroll(waypoint, bookingWrapper, postCodeInput) {
      let stuck = false;
      const siteContainer = document.querySelector('.site-container');
      const bookingWrap = document.querySelector('.booking_inner-wrap');
      const scrollFunc = throttle(() => {
        const scrollAmount = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollAmount > waypoint && !stuck){
          stuck = true;
          //  add class here
          siteContainer.style.paddingTop = `${bookingWrap.offsetHeight}px`;
          bookingWrap.classList.add('RC032-searchForCourse__sticky-nav');
          const stickyEl = document.querySelector('.RC032-searchForCourse.RC032-searchForCourse__sticky-nav');
          stickyEl.style.display = 'block';
          bookingWrapper.querySelector('.RC032-searchForCourse__sticky-nav').insertAdjacentElement('beforeend', postCodeInput);
          siteContainer.style.paddingBottom = `${stickyEl.offsetHeight}px`;
        } else if (scrollAmount < waypoint && stuck) {
          stuck = false;
          // remove class here
          siteContainer.style.paddingTop = '0';
          bookingWrap.classList.remove('RC032-searchForCourse__sticky-nav');
          document.querySelector('.RC032-searchForCourse.RC032-searchForCourse__sticky-nav').style.display = 'none';
          bookingWrapper.querySelector('.RC032-searchForCourse').insertAdjacentElement('beforeend', postCodeInput);
          siteContainer.style.paddingBottom = '0';
          
        }
      }, 250);
      window.addEventListener('scroll', scrollFunc, false);
    },
    getPosition: function getPosition(element) {
      let xPosition = 0;
      let yPosition = 0;
      while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
      }
      return { x: xPosition, y: yPosition };
    },
    /* eslint-enable */
  },

  components: {},
};

export default Experiment;
