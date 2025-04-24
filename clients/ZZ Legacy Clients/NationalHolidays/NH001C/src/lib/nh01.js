/* eslint-disable */
import { events } from '../../../../../lib/utils';

const nh01 = () => {
  var $ = window.jQuery;
  var $body = $('body');

  // If page is orderprocess/registration.aspx and email address stores prepopulate the email address field on this page
  if (window.location.href.indexOf('orderprocess/registration.aspx') > -1) {
      if (sessionStorage.getItem('emailAddress')) {
          $('#txtEmail').val(sessionStorage.getItem('emailAddress'));
          return;
      } else {
          return;
      }
  }

  $body.addClass('NH001');

  $('.main-content > .container > .inner-content > h1 > span').text('Completing your booking...where shall we send your confirmation?');
  $('.main-content > .container > .inner-content > h1').css('background', 'none');

  var $contentWrapper = $('#pnlSignInDuring');
  $contentWrapper.find('.left:first > h2').hide();

  var $passwordWrapper = $contentWrapper.find('.field-row-wide:eq(1)');
  var $forgotPassWrapper = $contentWrapper.find('.field-row-wide:last');
  // hide password (and 'have you forgetten your pass.')
  $passwordWrapper.hide();
  $forgotPassWrapper.addClass('NH001_forgot_pass');
  $forgotPassWrapper.insertAfter($('#txtPassword'));
  // hide 'new customers' section
  $contentWrapper.find('.right').hide();

  $('#Booking #btnContinue').hide();

  var $html = $([
      '<div class="NH001_wrapper">',
          '<p class="NH001_headerQ">Do you have an account with Caledonian Travel</p>',
          '<form action="" id="NH001_yes_no">',
              '<input type="radio" name="answer" value="yes"><span class="NH001_inputText">Yes, I have an account with Caledonian Travel</span><br />',
              '<input type="radio" name="answer" value="no"><span class="NH001_inputText">No, this is my first time</span>',
          '</form>',
          '<div class="NH001_btn_wrap"><a href="#" class="NH001_continueBtn">Continue</a></div>',
      '</div>'
  ].join(''));

  // Insert html after the email address field
  $contentWrapper.find('.field-row-wide:first').after($html);

  // Validation
  var $textMail = $('#txtEmail');
  $textMail.prop('placeholder','Email address');
  var $textPass = $('#txtPassword');
  $textPass.prop('placeholder', 'Password');
  var $valLoginError = $('#valLogin');
  $valLoginError.insertAfter($textMail).hide();

  var $yesNoForm = $('#NH001_yes_no');

  $passwordWrapper.insertAfter($contentWrapper.find('.field-row-wide:first'));

  // When clicking text near radio buttons trigger the corresponding one
  $('.NH001_inputText').on('click', function () {
      $(this).prev().trigger('click');
  });

  // If sessionStorage: yesInputChecked it means page refereshed/show error (incorrect email/pass)
  if (sessionStorage.getItem('yesInputChecked')) {
      $yesNoForm.children('input[value="yes"]').prop('checked', 'checked');
      $passwordWrapper.show();
      $valLoginError.show();
  }

  $yesNoForm.on('change', 'input', function () {
      $('.NH001_pleaseSelect').hide();
      if ($(this).val() === 'yes') {
          $passwordWrapper.show();
          $valLoginError.show();
      } else {
          $passwordWrapper.hide();
          $valLoginError.hide();
      }
  });

  // check if email valid
  function isEmail(email){
      return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
  }

  // validation
  var $noValidEmailError = $('<p class="NH001_noEmail">Email address is invalid</p>');
  $noValidEmailError.insertAfter($textMail).hide();
  var $noEmailError = $('<p class="NH001_noEmail">Please enter an email address</p>');
  $noEmailError.insertAfter($textMail).hide();
  var $noPasswordError = $('<p class="NH001_noPass">Please enter a password</p>');
  $noPasswordError.insertAfter($textPass).hide();
  // Check if mail empty
  if ($textMail.val() && !isEmail($textMail.val())) {
      $noValidEmailError.show();
  }

  // first attempt for email validation on change
  var firstValidation = false;
      $textMail.one('change', function () {
          firstValidation = true;
          if (!$(this).val()) {
              $noEmailError.show();
              $valLoginError.hide();
              $noValidEmailError.hide();
          } else {
              $noEmailError.hide();
              $valLoginError.hide();
              if (!isEmail($(this).val()) && $(this).val()) {
                  $noValidEmailError.show();
              } else {
                  $noValidEmailError.hide();
              }
          }
      });

  // after first email validation attempt on 'change', switch to validation on 'input' event list.
      $textMail.on('input', function () {
          if (firstValidation === true) {
              if (!$(this).val()) {
                  $noEmailError.show();
                  $valLoginError.hide();
                  $noValidEmailError.hide();
              } else {
                  $noEmailError.hide();
                  $valLoginError.hide();
                  if (!isEmail($(this).val()) && $(this).val()) {
                      $noValidEmailError.show();
                  } else {
                      $noValidEmailError.hide();
                  }
              }
          }
      });

  // Check if pass empty
  $textPass.on('input', function () {
      if (!$(this).val()) {
          $noPasswordError.show();
          $valLoginError.hide();
      } else {
          $noPasswordError.hide();
      }
  });


  var $ctaButton = $('.NH001_continueBtn');
  $ctaButton.on('click', function (e) {
      e.preventDefault();
      // Clear session storage on button click (this is because it should address what's typed in the email field)
      sessionStorage.clear();

      var $checkedInput = $yesNoForm.find(' > input:checked');
      if ($checkedInput.length && $checkedInput.val() === 'yes') {
          sessionStorage.setItem('yesInputChecked', 'checked');
      }
      $valLoginError.hide();
      // On page load the radio buttons are unchecked
      if ($checkedInput.length) {
          if ($checkedInput.val() === 'yes' && $noEmailError.not(':visible') && $textMail.val() && $noPasswordError.not(':visible') && $textPass.val() && isEmail($textMail.val())) {
              $('#btnContinue').trigger('click');
          } else if ($checkedInput.val() === 'yes' && $noEmailError.not(':visible') && !$textMail.val() && $noPasswordError.not(':visible') && !$textPass.val()) {
              $noEmailError.show();
              $noPasswordError.show();
              $noValidEmailError.hide();
          }  else if ($checkedInput.val() === 'yes' && $noEmailError.not(':visible') && !$textMail.val()) {
              $noEmailError.show();
              $noValidEmailError.hide();
          }  else if ($checkedInput.val() === 'yes' && $noPasswordError.not(':visible') && !$textPass.val()) {
              $noPasswordError.show();
              $valLoginError.hide();
          } else if ($checkedInput.val() === 'yes' && $noValidEmailError.is(':visible')) {
              $noValidEmailError.show();
          } else {
              if ($checkedInput.val() === 'no' && isEmail($textMail.val()) && $textMail.val()) {
                  sessionStorage.setItem('emailAddress', $textMail.val());
              }
              window.location.href = $contentWrapper.find('.right > .orange-btn').prop('href');
          }
      } else {
          if (!$('.NH001_pleaseSelect').length) {
              $(this).parent().before('<p class="NH001_pleaseSelect">Please select one of the above options</p>');
          }
      }
  });

  $contentWrapper.find('.content-split > .left').after('<div class="NH001_right right" id="NH001_right"></div>');

  // Load booking details
  $('#NH001_right').load('https://www.caledoniantravel.com/OrderProcess/bookingOptions.aspx .right > .box-with-border.white');

  events.send('NH001C', 'Page View', 'NH001 - Login Page Improvements', { sendOnce: true });
}
export default nh01;