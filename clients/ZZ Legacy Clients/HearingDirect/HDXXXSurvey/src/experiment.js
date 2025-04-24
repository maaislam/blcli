import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let $ = null;

function run() {
    /**
     * This overrides the feedback tab 
     * as it's borrowwed from RCXXXa
     */
    $('body').addClass('hdxxx');

    var tabPosition = 'left';
    if(window.innerWidth <= 550) {
      tabPosition = 'bottom';
    }
    UC.feedbackTab.init({
      label: 'Win a £100 Amazon voucher',
      position: tabPosition,
      tabDimensions: {height: 'auto', width: '400px'},
      contentDimensions: {height: '400px', width: '600px'},
      content: [
        '<div>',
          '<img class="" src="//www.hearingdirect.com/skin/frontend/rwd/hearingdirect/images/hearing-direct-logo.png" />',
          '<p class="">',
            'We want to make our site even better to give you and others the information you need. Have your say and enter a draw to win an Amazon voucher worth £100.',
          '</p>',
          '<p>',
            '<a class="btn btn-default" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfpzNBuxKOmeL8YonOJjmCXJIZHva6Shm-FjcspWkjB6GlIPQ/viewform?usp=sf_link">Yes, I\'ll give feedback</a>',
          '</p>',
        '</div>'
      ].join(''),
      customClass: 'hdxxx-tab-init',
      dimBackground: true
    });

}

// Setup
UC.poller([
  function() {
    return !!window.jQuery;
  }
], function() {
  $ = window.jQuery;

  run();
});
