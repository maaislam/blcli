import { fullStory, getCookie, setCookie } from '../../../../lib/utils';
import exitIntent from './lib/exit';

/**
 * {{HD007}} - {{Exit Intent}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HD007',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    if (document.body.classList.contains('HD002')) {
      return;
    }
    if (document.body.classList.contains('HD007M')) {
      return;
    }

    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Running experiment event
    _gaq.push(['_trackEvent', 'HD007', 'Active Experiment', 'HD007 is active', null, true]); // eslint-disable-line
    // Line below for testing on mobile
    // const restrictionCookie = getCookie('ucRestricted'); // eslint-disable-line
    // if (restrictionCookie) {
    // Controls for the popups
    const controlPopup = () => {
      /* eslint-disable */
      const closeBtn = document.querySelector('.hd07-popup .hd07-close');
      const popup = document.querySelector('.hd07-popup');
      const popupWrap = document.querySelector('.hd07-popup--container');
      const button = document.querySelector('.hd07-popup button');

      // Close X
      if (popup) {
        closeBtn.addEventListener('click', function() {
          popup.parentNode.removeChild(popup);
          _gaq.push(['_trackEvent', 'HD007', 'Popup Closed', 'User has closed the popup', null, true]); // eslint-disable-line
        });
        // Continue shopping
        button.addEventListener('click', function() {
          popup.parentNode.removeChild(popup);
          _gaq.push(['_trackEvent', 'HD007', 'Popup Closed', 'User has closed the popup', null, true]); // eslint-disable-line
        });
        // Outside of box
        popup.addEventListener('click', function() {
          popup.parentNode.removeChild(popup);
          _gaq.push(['_trackEvent', 'HD007', 'Popup Closed', 'User has closed the popup', null, true]); // eslint-disable-line
        });
        popupWrap.addEventListener('click', function(e) {
          e.stopPropagation();
        }); 
        // Escape key
        document.onkeydown = function(evt) {
          evt = evt || window.event;
          if (evt.keyCode == 27) {
            popup.parentNode.removeChild(popup);
            _gaq.push(['_trackEvent', 'HD007', 'Popup Closed', 'User has closed the popup', null, true]); // eslint-disable-line
          }
        };
      }
      /* eslint-enable */
    };
    // New user?
    // const visited = services.newUsers();
    // } End of Restricted Cookie
    /*
      * User should be new and NOT on a mobile
      * or tablet device at this point
      */
    const onExit = exitIntent();
    /* eslint-disable */
    onExit.init(function(){
      // // Append popup
      const appendPopup = () => {
        const popupHTML = services.popup();
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        // event tracking
        _gaq.push(['_trackEvent', 'HD007', 'Popup Shown', 'User has seen the popup', null, true]); // eslint-disable-line
      };
      appendPopup();  
      controlPopup();
  
    }, 'popupShown', 'hearingdirect.com');
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
    newUsers: function newUsers() {
      const returningUser = getCookie('returningUser');
      return returningUser;
    },
    mobileAndTabletcheck: function mobileAndTabletcheck() {
      let check = false;
      ((a => {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;}))(navigator.userAgent||navigator.vendor||window.opera); // eslint-disable-line
      return check;
    },
    popup: function popup() {
      const { settings } = Experiment;
      let html = null;
      if (settings.VARIATION === '1') {
        html = `
          <div class="hd07-popup">
            <div class="hd07-popup--wrap">
              <div class="hd07-popup--container">
                <div class="hd07-close">
                  <span></span>
                  <span></span>
                </div>

                <h2>A little something before you go...</h2>

                <p>As a new user to Hearing Direct, let us give you 10% off your first order</p>

                <div class="hd07-wrap--box">
                  <p></strong>HDWEL10</strong></p>
                </div>

                <p>Enter your code at the checkout at the bottom of the page</p>

                <button>Continue Shopping</button>
              </div>
            </div>
          </div>
        `;
      } else if (settings.VARIATION === '2') {
        html = `
        <div class="hd07-popup hd07-popup2">
          <div class="hd07-popup--wrap">
            <div class="hd07-popup--container">
              <div class="hd07-close">
                <span></span>
                <span></span>
              </div>

              <h2>Before you go...</h2>

              <p>We’re here to help and offer support. We’ve been working in the industry for over 25 years and have nearly 80 years collective experience of providing products and services for the hard of hearing</p>

              <ul class="hd07-wrap--ticklist">
                <li>Team of qualified audiologists available to answer your questions</li>
                <li>30 Day No Quibble Money Back Guarantee</li>
                <li>24/7 Live chat support</li>
              </ul>

              <p>Call the 0800 number and speak with one of our qualified audiologists or email.</p>

              <button>Continue Shopping</button>

              <div class="hd07-google-banner">
                <img src="data:image/png;base64,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">
                <p>92% Positive (2,409 reviews)</p>
                <a href="https://www.google.com/shopping/ratings/account/metrics?q=hearingdirect.com&c=GLOBAL&v=1&hl=en_GB">Read more</a>
              </div>
            </div>
          </div>
        </div>
        `;
      }
      return html;
    },
  },

  components: {},
};

export default Experiment;
