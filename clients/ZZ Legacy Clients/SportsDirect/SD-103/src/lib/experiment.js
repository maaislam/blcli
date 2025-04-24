/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import settings from './shared';
import { events, getCookie, deleteCookie, setCookie, pollerLite, observer } from '../../../../../lib/utils';


events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const body = document.body;
  const initialWindowHeight = window.innerHeight;
  let resizedHeight;
  let newNavbar;

  const { ID, VARIATION } = settings;

  // need to detect height changes

  const reportWindowSize = () => {
    
    resizedHeight = window.innerHeight;

    if(resizedHeight > initialWindowHeight) {
      newNavbar.classList.add('navbar-hidden');
    } else if(resizedHeight = initialWindowHeight) {
      newNavbar.classList.remove('navbar-hidden');
    }

  }
  

  const buildNewNavBar = () => {
    
    // building the new nav bar
    document.getElementById('BodyWrap').insertAdjacentHTML('beforeend', `
      <section role="navigation" id="SD-103-navbar" class="SD-103-navbar">


        <div class="nav-section menu-section">
          <a href="#" id="trigger-menu" class="trigger-action menu">
            <svg class="menu-icon inactive-state" width="29px" height="18px" viewBox="0 0 29 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Proposed-Designs-04/11" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square"><g id="message-tooltip" transform="translate(-63.000000, -571.000000)" stroke="#333333" stroke-width="1.6"><g id="Group-5" transform="translate(63.500000, 572.000000)"><line x1="0.608695652" y1="0.5" x2="27.3913043" y2="0.5" id="Line"></line><line x1="0.608695652" y1="15.5" x2="27.3913043" y2="15.5" id="Line"></line><line x1="0.608695652" y1="8" x2="27.3913043" y2="8" id="Line"></line></g></g></g></svg>
            <svg class="close-icon active-state" width="27px" height="27px" viewBox="0 0 27 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-1" points="0 0 26.4 0 26.4 26.4 0 26.4"></polygon></defs><g id="Proposed-Designs-04/11" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="search-full-screen---no-suggestions" transform="translate(-270.000000, -27.000000)"><g id="Group-3" transform="translate(270.000000, 27.000000)"><g id="Clip-2"></g><path d="M12.4204586,13.2440897 C8.21079365,9.04697734 4.11936508,4.96790703 0,0.86094612 C0.305326279,0.553867825 0.565502646,0.292428689 0.806208113,0.050428454 C4.92641975,4.15710764 9.01502646,8.23223383 13.1132275,12.3172203 C17.2836684,8.16095786 21.3612698,4.0971006 25.4718871,0 C25.7487125,0.32595375 25.9987302,0.620636225 26.2843034,0.957295457 C22.2772487,4.9529757 18.1861023,9.03232774 14.0602469,13.14605 C18.1982363,17.2645616 22.2772487,21.3250382 26.4,25.4286184 C26.0627866,25.7230191 25.7715697,25.9771335 25.4862787,26.2264585 C21.4456437,22.196408 17.3711464,18.1331142 13.2850794,14.057988 C9.14257496,18.1925578 5.06017637,22.267684 0.92021164,26.4 C0.607266314,26.0374222 0.366843034,25.7585163 0.131499118,25.4860899 C4.18991182,21.4433619 8.27880071,17.369926 12.4204586,13.2440897" id="Fill-1" fill="#111111" mask="url(#mask-2)"></path></g></g></g></svg>
            <span class="menu-text inactive-state"> Menu </span>
            <span class="close-text active-state"> Close </span>
          </a>
        </div>

        <div class="separator">
          <span class="line redline"></span>
          <span class="line blueline"></span>
        </div>

        <div class="nav-section search-section">
          <a href="#" id="trigger-search" class="trigger-action search">
            <svg class="search-icon inactive-state" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Proposed-Designs-04/11" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="message-tooltip" transform="translate(-234.000000, -569.000000)" fill="#333333"><g id="Group-3" transform="translate(228.000000, 569.000000)"><g id="Group-24" transform="translate(6.300000, 0.000000)"><g id="Group-2" transform="translate(-0.000029, -0.000025)"><g id="Group-8" transform="translate(0.000029, 0.000025)"><path d="M15.3623302,8.54224625 C15.3675076,4.78073585 12.3164644,1.70714225 8.56609965,1.69518615 C4.78489005,1.68355505 1.68719085,4.77477425 1.7003679,8.54665265 C1.71311085,12.2954623 4.79266605,15.3672415 8.53784685,15.3667231 C12.2858788,15.3659455 15.3571396,12.2946847 15.3623302,8.54224625 M8.56661805,2.54682821e-05 C13.2887236,0.0117150511 17.0691556,3.82351025 17.0570026,8.56090865 C17.0447908,13.2817183 13.230922,17.0722591 8.50285485,17.0626868 C3.80304045,17.0533375 -0.0121243502,13.2099199 2.89555887e-05,8.49688625 C0.0122404498,3.79188785 3.84684525,-0.0113537489 8.56661805,2.54682821e-05" id="Fill-20"></path><path d="M13.8602856,15.8380783 C14.5082856,15.2279215 15.0982248,14.6724559 15.7241928,14.0835535 C18.3185256,16.8326287 20.8791624,19.5456751 23.4579432,22.2781615 C22.8257544,22.8745807 22.232964,23.4339343 21.5976648,24.0334639 C19.0204392,21.3035695 16.457988,18.5894863 13.8602856,15.8380783" id="Fill-22"></path></g></g></g></g></g></g></svg>
            <span class="search-text inactive-state"> Search </span>
          </a>
        </div>

      </section>

      <div id="FLAN-55-searchbox" class="FLAN-55-searchbox">
        
        <a href="#" id="close-searchbox" class="close-searchbox">
          <svg class="close-icon active-state" width="27px" height="27px" viewBox="0 0 27 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-1" points="0 0 26.4 0 26.4 26.4 0 26.4"></polygon></defs><g id="Proposed-Designs-04/11" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="search-full-screen---no-suggestions" transform="translate(-270.000000, -27.000000)"><g id="Group-3" transform="translate(270.000000, 27.000000)"><mask id="mask-2" fill="white"><use xlink:href="#path-1"></use></mask><g id="Clip-2"></g><path d="M12.4204586,13.2440897 C8.21079365,9.04697734 4.11936508,4.96790703 0,0.86094612 C0.305326279,0.553867825 0.565502646,0.292428689 0.806208113,0.050428454 C4.92641975,4.15710764 9.01502646,8.23223383 13.1132275,12.3172203 C17.2836684,8.16095786 21.3612698,4.0971006 25.4718871,0 C25.7487125,0.32595375 25.9987302,0.620636225 26.2843034,0.957295457 C22.2772487,4.9529757 18.1861023,9.03232774 14.0602469,13.14605 C18.1982363,17.2645616 22.2772487,21.3250382 26.4,25.4286184 C26.0627866,25.7230191 25.7715697,25.9771335 25.4862787,26.2264585 C21.4456437,22.196408 17.3711464,18.1331142 13.2850794,14.057988 C9.14257496,18.1925578 5.06017637,22.267684 0.92021164,26.4 C0.607266314,26.0374222 0.366843034,25.7585163 0.131499118,25.4860899 C4.18991182,21.4433619 8.27880071,17.369926 12.4204586,13.2440897" id="Fill-1" fill="#FEFEFE" mask="url(#mask-2)"></path></g></g></g></svg>
        </a>
        <div class="search-container">
          <h2> Search </h2>

        </div>

      </div>

    `);    

    // assigning objects to new functionality

    const menuIcon = document.getElementById('trigger-menu');
    const searchIcon = document.getElementById('trigger-search');
    const currCloseButton = document.querySelector('.MenuCloseActive');

    newNavbar = document.getElementById('SD-103-navbar');

    // menu assignations
    
    let bodywrap = document.getElementById('BodyWrap');
    let amContainer = bodywrap.querySelector('.am-container');
    let mpPusher = document.getElementById('mp-menu');
    let modalBackdrop = document.getElementById('MenuOpenContentCover');
    let menuTriggerHolder = document.getElementById('trigger-menu');

    // search assignations

    let mobSearchInput = document.getElementById('MobtxtSearch');
    let newSearchBox = document.getElementById('FLAN-55-searchbox');
    let newSearchCloseButton = document.getElementById('close-searchbox');
    let actualSearchInput = document.getElementById('MobtxtSearch');
    let newSearchBoxContainer = newSearchBox.querySelector('.search-container');
    let autoComplete = document.getElementById('ui-id-2');

    menuIcon.addEventListener('click', (e) => {
      e.preventDefault();

      // nav menu click
      if(e.target.classList.contains('active')) {
        // close the nav menu
        e.target.classList.remove('active');
        bodywrap.classList.remove('PullMenuActive');
        amContainer.classList.remove('showAccordianMenu');
        events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Closed Nav Menu using bottom nav`);  

      } else {
        // open the nav menu
        e.target.classList.add('active');
        bodywrap.classList.add('PullMenuActive');
        amContainer.classList.add('showAccordianMenu');
        events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Opened Nav Menu using bottom nav`);
        
      }
      
    });
    
    searchIcon.addEventListener('click', (e) => {
      e.preventDefault();

      // search icon click
      // close the menu if it's open.
      if(menuIcon.classList.contains('active')) {
        menuIcon.click();
      }

      window.scrollTo(0, 0);
      mobSearchInput.focus();
      setTimeout(function() {
        // focus the search bar when the user clicks on the bottom nav search icon
        events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Focused Search Input using bottom nav`);
        mobSearchInput.click();

        
      }, 500)
      

    });

    currCloseButton.addEventListener('click', (e) => {
      e.preventDefault();
      // force menu icon close
      menuIcon.click();
      events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Closed Nav Menu using menu close X`);
    })

    window.onresize = reportWindowSize;

  }

  const firstTimeMessage = () => {


    // if there's no cookie set then carry on with showing the first time message.
    if(!getCookie('SD-103-message-initial')) {
      events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, `Displayed first time message`);
      body.classList.add('SD-103-noscroll');
      body.insertAdjacentHTML('beforeend', `

        <div id="SD-103-message" class="SD-103-message">

          <div class="message-holder">
            <h2> Welcome back </h2>
            <p> We've moved the navigation to make it easier for you to reach </p>
          </div>


        </div>

      `);
      const ftMessage = document.getElementById('SD-103-message');

      setTimeout(function() {
        ftMessage.querySelector('.message-holder').classList.add('fadeout');

      }, 2000);

      setTimeout(function() {
        ftMessage.remove();
        body.classList.remove('SD-103-noscroll');
      }, 3000);

      // once the first time message has been shown, add a cookie so it's not shown again.
      setCookie('SD-103-message-initial');

    }


  }

  // initialising experiment
  firstTimeMessage();
  buildNewNavBar();

  

  

};
