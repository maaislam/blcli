// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let _TG025 = (function() {

    /*--------------------------------------
    Run against TG021 variations
    ---------------------------------------*/
    let _activate = function() {

        // Namespace CSS
        let $ = window.jQuery;
        $('body').addClass('TG025');

        // Text below the first btn
        var addTocartButton =  $('.add-to-cart:first'),
            requestButton = $('.request-quote'),
            requestCatalouge = $('.product-other-social');


        var URL = window.location.pathname;


        var learnMorebeginning,
            learnMoreLast,
            wellnessDelivery,
            productDelivery,
            orText,
            quoteText;


        if(URL.indexOf('/it/') > -1){
            learnMorebeginning = 'Scopri di più su';
            learnMoreLast = '<br>Inviato direttamente al tuo indirizzo email';
            wellnessDelivery = 'Consegnato entro 5 giorni lavorativi';
            productDelivery = 'Sarai contattato per concordare la data e gli orari di consegna';
            orText = 'O';
            quoteText = 'Sarai contattato per preparare una proposta su misura per te';

        }else{
            learnMorebeginning = 'Learn More About';
            learnMoreLast = '<br>Delivered Straight To Your Inbox';
            wellnessDelivery = 'Delivered in a maximum of 5 working days';
            productDelivery = 'You will be contacted to arrange a convenient delivery date and time';
            orText = 'OR';
            quoteText = 'You will be contacted to prepare a quotation tailored on your needs';
        }


        var testHtml = $(['<div class="TG025_smallWrapper">',
        '<span class="TG025_underFirstBtn"></span>',
        '<span class="TG025_middleOR">- '+orText+' -</span>',
        '</div>']
        .join(''));

        
        if(addTocartButton.length){
            testHtml.insertAfter(addTocartButton);
        }else{
            testHtml.insertAfter(requestButton);
        }

        let productBrand  = $('.product-name > h1[itemprop="name"]').text(); 


        //text after request catlouge
        requestCatalouge.after('<div class="TG025_underSecondBtn">'+learnMorebeginning+' '+productBrand+' '+learnMoreLast+'</div>');

        var URL = window.location.pathname;
        var underButtontext = $('.TG025_underFirstBtn');

        if(URL.indexOf('wellness-ball-training.html') > -1 || URL.indexOf('wellness-ball-55-cm.html') > -1 || URL.indexOf('wellness-pad.html') > -1 || URL.indexOf('wellness-bag.html') > -1 || URL.indexOf('wellness-rack.html') > -1 || URL.indexOf('wellness-weights.html') > -1){ //if wellness product
            underButtontext.text(productDelivery);
        }else if(addTocartButton.length > 0){ //if add to cart button
            underButtontext.text(productDelivery);
        }
        else if(requestButton.length > 0){ //if request quote button
            underButtontext.text(quoteText);
        }
        utils.events.send('TG025', 'Page View', `TG025 - Product Page CTA's`, true);
}; 

/*--------------------------------------
 Run against tg021 control
---------------------------------------*/
const runDefault = () => {
  // Namespace CSS
  let $ = window.jQuery;
  $('body').addClass('TG025 TG025--rundef');

  // Remove empty product descriptions
  if($('#new-additional-info-attribute .product-description-wrapper').text().trim() == 'Read more') {
      $('#new-additional-info-attribute').remove();
  }

  // Text below the first btn
  var addTocartButton =  $('.add-to-cart:first'),
      requestButton = $('.request-quote');

  var URL = window.location.pathname;

  var learnMorebeginning,
      learnMoreLast,
      productDelivery,
      orText,
      quoteText;


  if(URL.indexOf('/it/') > -1){
      learnMorebeginning = 'Scopri di più su';
      learnMoreLast = '<br>Inviato direttamente al tuo indirizzo email';
      productDelivery = 'Sarai contattato per concordare la data e gli orari di consegna';
      orText = 'O';
      quoteText = 'Sarai contattato per preparare una proposta su misura per te';
  }else{
      learnMorebeginning = 'Learn More About';
      learnMoreLast = '<br>Delivered Straight To Your Inbox',
      productDelivery = 'You will be contacted to arrange a convenient delivery date and time';
      orText = 'OR';
      quoteText = 'You will be contacted to prepare a quotation tailored on your needs';
  }

  let productBrand  = $('.product-name > h1[itemprop="name"]').text(); 

  if(document.querySelector('.TG025_smallWrapper')) {
    return;
  }

  var testHtml = $(['<span class="TG025_underFirstBtn"></span>',
  '<div class="TG025_smallWrapper">',
  '<span class="TG025_middleOR">- '+orText+' -</span>',
  '<div class="TG025_underSecondBtn">'+learnMorebeginning+' '+productBrand+' '+learnMoreLast+'</div>',
  '</div>']
  .join(''));
  
  $('.product-main-info:first .addition-info:first').append(testHtml);

  requestButton.insertBefore($('.TG025_underFirstBtn'));

  var requestCatalogLink = $('.product-main-info .addition-info figcaption div a');
  var requestCatalogLinkHref = requestCatalogLink.attr('href');

  if(URL.indexOf('/it/') > -1) {
      var socialButton = $('<div class="tg25-product-other-social"><a class="button tg21-request-cat btn-default" href="' + requestCatalogLinkHref + '">Richiedi catalogo</a></div>');
  } else {
      var socialButton = $('<div class="tg25-product-other-social"><a class="button tg21-request-cat btn-default" href="' + requestCatalogLinkHref + '">Request a catalogue</a></div>');
  }

  socialButton.insertBefore($('.TG025_underSecondBtn'));
  
  var URL = window.location.pathname;
  var underButtontext = $('.TG025_underFirstBtn');

  if(URL.indexOf('wellness-ball-training.html') > -1 || URL.indexOf('wellness-ball-55-cm.html') > -1 || URL.indexOf('wellness-pad.html') > -1 || URL.indexOf('wellness-bag.html') > -1 || URL.indexOf('wellness-rack.html') > -1 || URL.indexOf('wellness-weights.html') > -1){ //if wellness product
      document.querySelector('.TG025_underFirstBtn').style.display = "none";
  }else if(addTocartButton.length > 0){ //if add to cart button
      underButtontext.text(productDelivery);
  }
  else if(requestButton.length > 0){ //if request quote button
      underButtontext.text(quoteText);
  }
  utils.events.send('TG025', 'Page View', `TG025 - Product Page CTA's`, true);

  // amend show the description after the CTAs
  const url = window.location.href;
  if (url.indexOf('skillrow.html') > -1 || url.indexOf('treadmill-myrun.html') > -1 || url.indexOf('unica.html') > -1 || url.indexOf('mycycling.html') > -1 || url.indexOf('skillbike.html') > -1 || url.indexOf('tapis-roulant-myrun.html') > -1 || url.indexOf('tapis-roulant-myrun.html') > -1) {
    document.body.classList.add('TG025-showFinance');
    const financeCopy = document.querySelector('.addition-info #new-additional-info-attribute');
    const mainInfo = document.querySelector('.product-main-info');
    mainInfo.appendChild(financeCopy); 
  } else {
    document.body.classList.remove('TG025-showFinance');
  }
};

/*--------------------------------------
Activation
---------------------------------------*/
    let _triggers = function _triggers(options) {
        // Product other social
        UC.poller([
            '.product-other-social',
            function () {
                return !!window.jQuery;
            },
            function () {
                return !!window.ga;
            }
        ], _activate);
        
        // When product other social doesn't exist
        UC.poller([
            '.product-main-info .addition-info',
            function () {
              return !document.querySelector('.product-other-social');
            },
            function () {
                return !!window.jQuery;
            },
            function () {
                return !!window.ga;
            }
        ], runDefault);

        utils.fullStory('TG025', 'Variation 1 Desktop/Tablet');
    };

// Run experiment
_triggers();

})(); // _TG025
