/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * 
 * EMAIL POPUP
 */
import { setup } from './services';

export default () => {
  setup();

  var jQuery = window.jQuery || window.$;
  console.log('$ = ', jQuery);
  //sets cookie to expire in one month
  var now = new Date();
  now.setMonth( now.getMonth() + 1 );
  var windowURL = window.location.href;
  //Function to set cookie and display footer
  //delay popup to allow dom to load
    //Function to set cookie and display footer
    jQuery(document).ready(function () {
    //sets cookie to expire in one hour
    var now = new Date();
    now.setDate(now.getDate()+14);
    var jQuerycontentUK = jQuery([
    '<div class="email-sign-up-pop-up">',
    '<div class="popuptab"></div>',
      '<div class="email-sign-up-pop-up-text">',
        '<span class="close-icon"></span>',
        '<h4>Join our Mamas &amp; Papas Community<!--<span style="font-size: 14px; font-weight: 300;">(Minimum spend of £500. Excludes third party brands)</span>--></h4>',
        '<p>You can expect to hear about our offers and promotions, new product launches and more. Plus, enjoy <strong>&pound;25 off your next order over &pound;250<sup>*</sup></strong>. By choosing to sign up, you will join our mailing list. You can opt out at any time.</p>',
        '<div class="newsletter-here">',
        `<form id="mnpNewsLetterSubscriptionForm" action="/en-gb/subscription/email" method="post" class="new-newsletter" novalidate="novalidate"><div class="input-group">
        <div class="control-group">
        <div class="controls">
        <label class="control-label transition-position " for="subscribe.email">
        Email Address<sup class="mandatory">
        *</sup>
        </label>
        <input id="subscribe.email" name="customerEmailID" class="subscribe_email d-inline form-control pt-3 pb-3 font-weight-light subscribeEmail" placeholder="Enter your email address" type="text" required="true" value="" aria-required="true"></div>
        </div>
        <span class="input-group-btn">
        <button type="submit" class="btn-primary btn btn-fixedHeight font-weight-light subscribe_submit subscribe-register"></button>
        </span>
        </div>
        </form>`,
        '</div>',
        '<p class="small-print">By entering your personal information and clicking submit above, you agree and consent to receive marketing communications from us and confirm that you have read and agree to our<a href="/terms-and-conditions" style="text-decoration: underline;" target="_blank"> Terms &amp; Conditions</a>, <a href="/our-privacy-policy" style="text-decoration: underline;" target="_blank">Privacy Policy</a> &amp; <a href="/cookie-policy" style="text-decoration: underline;" target="_blank">Cookies Policy.</a> <a href="https://mamasandpapas.a.bigcontent.io/v1/static/New promotional terms and conditions 200520 UK  ROI" style="text-decoration: underline;" target="_blank">*Offer T&amp;C&apos;s Apply.</a></p></div>',
       '<div class="email-sign-up-pop-up-image">',
      '</div>',
    '</div>'
    ].join(''));
    var jQuerycontentIE = jQuery([
    '<div class="email-sign-up-pop-up">',
    '<div class="popuptab"></div>',
      '<div class="email-sign-up-pop-up-text">',
        '<span class="close-icon"></span>',
        '<h4>Join our Mamas &amp; Papas Community<!--<span style="font-size: 14px; font-weight: 300;">(Minimum spend of €500. Excludes third party brands)</span>--></h4>',
        '<p>You can expect to hear about our offers and promotions, new product launches and more. Plus, enjoy <strong>&euro;25 off your next order over &euro;250<sup>*</sup></strong></strong>. By choosing to sign up, you will join our mailing list. You can opt out at any time.</p>',
        '<div class="newsletter-here">',
        `<form id="mnpNewsLetterSubscriptionForm" action="/en-gb/subscription/email" method="post" class="new-newsletter" novalidate="novalidate"><div class="input-group">
        <div class="control-group">
        <div class="controls">
        <label class="control-label transition-position " for="subscribe.email">
        Email Address<sup class="mandatory">
        *</sup>
        </label>
        <input id="subscribe.email" name="customerEmailID" class="subscribe_email d-inline form-control pt-3 pb-3 font-weight-light subscribeEmail" placeholder="Enter your email address" type="text" required="true" value="" aria-required="true"></div>
        </div>
        <span class="input-group-btn">
        <button type="submit" class="btn-primary btn btn-fixedHeight font-weight-light subscribe_submit subscribe-register"></button>
        </span>
        </div>
        </form>`,
        '</div>',
        '<p class="small-print">By entering your personal information and clicking submit above, you agree and consent to receive marketing communications from us and confirm that you have read and agree to our<a href="/terms-and-conditions" style="text-decoration: underline;" target="_blank"> Terms &amp; Conditions</a>, <a href="/our-privacy-policy" style="text-decoration: underline;" target="_blank">Privacy Policy</a> &amp; <a href="/cookie-policy" style="text-decoration: underline;" target="_blank">Cookies Policy.</a> <a href="https://mamasandpapas.a.bigcontent.io/v1/static/New promotional terms and conditions 200520 UK  ROI" style="text-decoration: underline;" target="_blank">*Offer T&amp;C&apos;s Apply.</a></p></div>',
       '<div class="email-sign-up-pop-up-image">',
      '</div>',
    '</div>'
    ].join(''));
     //cookie not set = shows content
    if (document.cookie.indexOf('new-email-sign-up-pop-up') == -1){
        //content for the footer here
        // if (windowURL.indexOf('/en-gb') > -1) {
        //   jQuerycontentUK.appendTo('body');
        // }
        // if (windowURL.indexOf('/en-ie') > -1) {
        // }
        jQuerycontentIE.appendTo('body');
        jQuery("#mnpNewsLetterSubscriptionForm").detach().appendTo('.newsletter-here');
        jQuery("#mnpNewsLetterSubscriptionForm").addClass('new-newsletter');
        jQuery("#mnpNewsLetterSubscriptionForm > div > span > button").text("");
        jQuery("#mnpNewsLetterSubscriptionForm > div > span > button").removeClass('px-sm-5');
        //fire GA event when toggle clicked on mobile
        jQuery('.popuptab').one('click', function() {
          ga('send', 'event', 'newsletter-popup', 'newsletter-popup-tab', 'newsletter-popup-tab-clicked'); 
        });
        //fire GA event when submit button clicked once
        jQuery( "#mnpNewsLetterSubscriptionForm > div > span > button" ).one( "click", function() {
        document.cookie = "new-email-sign-up-pop-up=1; expires=" + now.toUTCString() + "; path=/";
          setTimeout(function(){
            if ( jQuery(".userPartialRegistration").length > 0) {
             ga('send', 'event', 'newsletter-popup', 'newsletter-popup-button', 'newsletter-popup-button-clicked'); 
            }
          },4000) 
        });
        jQuery('.email-sign-up-pop-up').hide() 
         setTimeout(function(){
          jQuery(".email-sign-up-pop-up").show(); //pop up fades in 
        },1500) // 5 seconds.
    }
    else {
        //if cookie set do not show content
        document.cookie = "=1; expires=" + now.toUTCString() + "; path=/";
    }
    //expand pop up on mobile
    if (window.matchMedia('(max-width: 560px)').matches)
      jQuery(".popuptab").click(function(){
      //jQuery(".email-sign-up-pop-up").animate({bottom: '0'});
      jQuery(".email-sign-up-pop-up").toggleClass("expand");
      jQuery(".popuptab").toggleClass("exdown");
      ga('send', 'event', 'newsletter-popup', 'newsletter-popup-toggle', 'newsletter-popup-toggle-clicked'); 
    });
    // set cookie manually by clicking close button
    jQuery( ".close-icon, #cboxClose, #cboxOverlay, #colorbox" ).click(function() {
      //apply cookie
      document.cookie = "new-email-sign-up-pop-up=1; expires=" + now.toUTCString() + "; path=/";
      //revert newsletter form back
      jQuery(".gis-circle").css("bottom", "0");
      jQuery("#mnpNewsLetterSubscriptionForm").prependTo('.userRegister');
      jQuery("#mnpNewsLetterSubscriptionForm").removeClass('new-newsletter');
      jQuery("#mnpNewsLetterSubscriptionForm > div > span > button").text("Sign Up");
      jQuery("#mnpNewsLetterSubscriptionForm > div > span > button").addClass('px-sm-5');
      if (window.matchMedia('(min-width: 561px)').matches)
      {
        jQuery(".email-sign-up-pop-up").fadeOut(500);
      }
      else if (window.matchMedia('(max-width: 560px)').matches)
      {
        jQuery(".email-sign-up-pop-up").fadeOut(500);
      }
    });
  }
);
};
