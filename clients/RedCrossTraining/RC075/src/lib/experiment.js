/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, getUrlParameter } from '../../../../../lib/utils';

export default () => {
  setup();

  // const popupForm = `
  // <!--[if lte IE 8]><script id="RCForm" charset="utf-8" async=false defer=false type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script><![endif]--><script id="RCForm" async=false defer=false charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
  // `;

  const productId = getUrlParameter('productId');
  if(productId) {
    document.body.classList.add('xpid-' + productId);
  }
  
  var scr  = document.createElement('script'),
    head = document.head || document.getElementsByTagName('head')[0];
    scr.src = 'https://js.hsforms.net/forms/v2.js';
    scr.id = 'RCForm';
    scr.async = false; // optionally

  head.insertBefore(scr, head.firstChild);

  
  pollerLite(['#RCForm'], () => {
    const thisScript = document.querySelector('#RCForm');
    // console.log({thisScript})
    thisScript.addEventListener('load', (e) => {
      
      hbspt.forms.create({portalId: "6280206",formId: "d2d928be-dab7-4c75-8501-89df9295ad68"});

      pollerLite(['.hbspt-form'], () => { // Add form title
        const addedForm = document.querySelector('.hbspt-form');
        addedForm.insertAdjacentHTML('afterbegin', `<div class="RC-formTitle">
          <h1>Fill out this form and we will keep you up to date with what is happening regarding our public courses.</h1>

          <button class="RC-closeForm">
            <span class="navigation-buttons-icon"></span>
          </button>
        </div>`);
      });

    });

  });


  // Detect page for message copy
  let messageCopy = 'Sorry, we are temporarily not taking bookings for public training courses at the moment';
  const url = window.location.href;
  
  const isCourseSearch = (url) => {
    return url.indexOf('/where-we-train/course-search/') > -1;
  }
  const isPdp = (url) => {
    return url.match(/courses\/public-first-aid-courses\/\w+|\d+/);
  }
  const isPlp = (url) => {
    const match = url.match(/courses\/public-first-aid-courses\/$/);
    // console.log({match})
    if (match && match.length) {
      return true;
    }
  }
  const isCourseFinder = (url) => {
    return url.indexOf('/courses/choose-the-right-course/course-finder/') > -1;
  }
  const isSearchPage = (url) => {
    return url.indexOf('/search-results?q') > -1;
  }

  // console.log(isPlp(url))

  if (isSearchPage(url) || isPlp(url)) {
    messageCopy = `Sorry, we are temporarily not taking bookings for public training courses at the moment.
    <br />
    Feel free to still look at our Public courses below`;
  }

  // Add Red Banner message
  const message = `
    <div class="RC075-message" style="${isCourseFinder(url) ? 'display:none;' : ''}">
      <button class="RC-close">
        <div class="VizExIcon__IconWrapper-sc-1b5p89-0 khiQJM"><svg width="1em" height="1em" viewBox="0 0 24 24"><defs><path d="M2.276.39L12 10.115 21.724.391c.486-.486 1.254-.519 1.777-.098l.108.098c.521.52.521 1.364 0 1.885L13.886 12l9.723 9.724c.521.52.521 1.365 0 1.885-.52.521-1.364.521-1.885 0L12 13.886l-9.724 9.723c-.486.486-1.254.519-1.777.098l-.108-.098c-.521-.52-.521-1.364 0-1.885L10.114 12 .391 2.276C-.13 1.756-.13.911.39.391.91-.13 1.755-.13 2.276.39z" id="close__a"></path></defs><use xlink:href="#close__a" fill-rule="evenodd"></use></svg></div>
      </button>

      <p>${messageCopy}</p>

      <button class="RC-openForm">Keep Me Updated</button>
    </div>
  `;


  // Course Finder Page
  let messageRef = null;
  if (isCourseFinder(url)) {
    pollerLite(['input[value="For personal reasons"]', 'input[value="For work reasons"]'], () => {
      
      messageRef = document.querySelector('input[value="For personal reasons"]');
      messageRef.parentElement ? messageRef.parentElement.insertAdjacentHTML('beforebegin', message) : null;

      messageRef.addEventListener('click', () => {        
        showMessage();
      }); // Show on click of input


      const workInput = document.querySelector('input[value="For work reasons"]');
    
      workInput.addEventListener('click', () => {
        hideMessage();
      });

      const messageEl = document.querySelector('.RC075-message');
      messageEl.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('RC-openForm') ) {
          openForm();
        }
        if (e.target.classList.contains('RC-close') || e.target.closest('button') && e.target.closest('button').classList.contains('RC-close')) {
          hideMessage();
        }
      });
    });
  }


  if (isCourseSearch(url)) {
    pollerLite(['.component.location-search', '.location-search-button > button', 'input#location'], () => {
      
      messageRef = document.querySelector('.component.location-search');
      messageRef ? messageRef.insertAdjacentHTML('afterend', `<div class="wrapper">${message}</div>`) : null;

      const submitBtn = document.querySelector('.location-search-button > button');

      submitBtn.addEventListener('click', () => {        
        showMessage();
      }); // Show on click of input

      // Check if postcode has input
      const postCodeInput = document.querySelector('input#location');
      
      if (postCodeInput.value) {
        
        setTimeout(() => {
          showMessage();
        }, 1000);
      }
    
      const messageEl = document.querySelector('.RC075-message');
      messageEl.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('RC-openForm') ) {
          openForm();
        }
        if (e.target.classList.contains('RC-close') || e.target.closest('button') && e.target.closest('button').classList.contains('RC-close')) {
          hideMessage();
        }
      });
    });
  }


  if (isSearchPage(url)) {
    pollerLite(['.component.news-list', '.news-list-item h2 a'], () => {
      
      messageRef = document.querySelector('.component.news-list');
      messageRef ? messageRef.insertAdjacentHTML('afterbegin', `<div class="wrapper">${message}</div>`) : null;

      messageRef.addEventListener('click', () => {        
        showMessage();
      }); // Show on click of input
    
      const messageEl = document.querySelector('.RC075-message');
      messageEl.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('RC-openForm') ) {
          openForm();
        }
        if (e.target.classList.contains('RC-close') || e.target.closest('button') && e.target.closest('button').classList.contains('RC-close')) {
          hideMessage();
        }
      });


      // Check listing and add badge to public courses.
      const itms = document.querySelectorAll('.news-list-item h2 a')
      for (let i = 0; itms.length > i; i +=1) {
        const title = itms[i].textContent.trim();
        if (title.match(/First aid for baby and child|First aid for baby and child \(evenings\)|First aid for adult|First aid for adult \(evenings\)/gmi)) {
          console.log('match');
          const wrap = itms[i].closest('.news-list-item');
          console.log({wrap})
          wrap ? wrap.insertAdjacentHTML('beforeend', `
            <div class="RC075-notOn"><p>Not running</p></div>
          `): null;
        }
      }
    });

  }


  if (isPlp(url)) {
    
    pollerLite(['.component.course-list'], () => {
      
      messageRef = document.querySelector('.component.course-list');
      messageRef ? messageRef.insertAdjacentHTML('afterbegin', `<div class="wrapper">${message}</div>`) : null;

      messageRef.addEventListener('click', () => {        
        showMessage();
      }); // Show on click of input
    
      const messageEl = document.querySelector('.RC075-message');
      messageEl.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('RC-openForm') ) {
          openForm();
        }
        if (e.target.classList.contains('RC-close') || e.target.closest('button') && e.target.closest('button').classList.contains('RC-close')) {
          hideMessage();
        }
      });
    });
  }


  if (isPdp(url)) {
    
    pollerLite(['.component.course-info .wrapper > div:last-of-type'], () => {
      
      messageRef = document.querySelector('.component.course-info .wrapper > div:last-of-type');
      messageRef ? messageRef.insertAdjacentHTML('beforebegin', `<div class="wrapper">${message}</div>`) : null;

      messageRef.addEventListener('click', () => {        
        showMessage();
      }); // Show on click of input
      
      document.body.classList.add('RC075-noArrow');
    
      const messageEl = document.querySelector('.RC075-message');

      if (messageEl) {
        document.body.classList.add('RC075-showingMessage');
      }

      messageEl.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('RC-openForm') ) {
          openForm();
        }
        if (e.target.classList.contains('RC-close') || e.target.closest('button') && e.target.closest('button').classList.contains('RC-close')) {
          hideMessage();
        }
      });
    });
  }

  //
  // CONTROLS
  //
  const SHOWCLASS = 'RC-showForm';
  const showMessage = () => {
    if (!document.body.classList.contains('RC-showMessage')) {
      document.body.classList.add('RC-showMessage');
    }
  }
  const hideMessage = () => {
    document.body.classList.remove('RC-showMessage');
  }
  const openForm = () => {
    document.body.classList.add(SHOWCLASS);
  }
  const closeForm = () => {
    document.body.classList.remove(SHOWCLASS);
  }

  


  pollerLite(['.RC-closeForm'], () => { // Form close
    const btn = document.querySelector('button.RC-closeForm');
    btn.addEventListener('click', closeForm);
  });

};
