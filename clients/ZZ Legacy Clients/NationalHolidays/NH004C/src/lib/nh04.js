import { fullStory, events } from '../../../../../lib/utils';

/* eslint-disable */
const nh04 = () => {
  var trackerName,
      slideQ = false,
      $;
  $ = window.jQuery;
  function init() {
      fullStory('NH004', 'Variation 1');
      var cacheDom = function () {
          var bodyVar = $('body'),
              modal,
              modalBG,
              adultsDropdown = $('#ddlAdults'),
              singleModalShown = false;
          var modalClick = 'ontouchstart' in document.documentElement ? 'touchstart' : 'mousedown';
          bodyVar.addClass('NH004 NH002');
          return {
              bodyVar: bodyVar,
              modal: modal,
              modalBG: modalBG,
              adultsDropdown: adultsDropdown,
              modalClick: modalClick,
              singleModalShown: singleModalShown
          };
      }();
      var NH002 = {
          init: function init() {
              if ($('.right .box-with-border:first > h3:first').text().trim() !== sessionStorage.getItem('travelInfoHeader') || !sessionStorage.getItem('travelInfoHeader')) {
                  sessionStorage.clear();
              }
              $('.box-with-border.white:first').prepend('<span class="NH002_yourTripWithUs" style="display: none;">Your break with us</span>');
              sessionStorage.setItem('travelInfoHeader', $('.right .box-with-border:first > h3:first').text().trim());
              $('.container > .inner-content > h1 > span').text('Choose your rooms ');
              $('.left > .box-with-border:first-child > h2').text('1. How many are staying');
              if (sessionStorage.getItem("noAdults")) {
                  var noAdultsValue = Number(sessionStorage.getItem("noAdults"));
                  $('#ddlAdults').find(' > option:eq(' + noAdultsValue + ')').prop('selected', 'selected');
              } else {
                  $('#ddlAdults').find(' > option:first').prop('selected', 'selected');
              }
              var $selectInfants = $('select#ddlInfants');
              $selectInfants.hide();
              $selectInfants.next().hide();
              $('<div class="NH002_infantsCheckWrap"><input type="checkbox" name="NH002_infantsCheck" class="NH002_infantsCheck">' + '<span class="NH002_haveInfants">Do you have any infants travelling under 2 years old?</span></div>').insertBefore('#ddlInfants');
              var $infantsCheckbox = $('.NH002_infantsCheck');
              var $noInfants = $('#ddlInfants');
              $infantsCheckbox.on('change', function () {
                  if ($(this).is(':checked')) {
                      $selectInfants.show();
                      $selectInfants.next().show();
                      sessionStorage.setItem('checkboxInfants', true);
                  } else {
                      $selectInfants.hide();
                      $selectInfants.next().hide();
                      sessionStorage.setItem('checkboxInfants', false);
                  }
              });
              $noInfants.on('change', function () {
                  sessionStorage.setItem('noInfants', $noInfants.val());
              });
              if (sessionStorage.getItem('noInfants') && Number(sessionStorage.getItem('noInfants')) !== 0 && sessionStorage.getItem('checkboxInfants') && Boolean(sessionStorage.getItem('checkboxInfants')) === true) {
                  $infantsCheckbox.prop('checked', 'checked');
                  $noInfants.show();
                  $noInfants.next().show();
                  var noInfantsValue = Number(sessionStorage.getItem('noInfants'));
                  $noInfants.find(' > option:eq(' + noInfantsValue + ')').prop('selected', 'selected');
              } else if (sessionStorage.getItem('checkboxInfants') && Boolean(sessionStorage.getItem('checkboxInfants')) === false) {
                  $infantsCheckbox.prop('checked', '');
              }
              $('.NH002_haveInfants').on('click', function () {
                  $infantsCheckbox.trigger('click');
              });
              $('.box-with-border:first').after(['<div class="NH002_box_how_many_rooms box-with-border">', '<h2>2. How many rooms do you need?</h2>', '<select name="NH002_howManyRoomsSelect" class="NH002_howManyRoomsSelect"">', '<option selected="selected" value="0">0</option>', '<option value="1">1</option>', '<option value="2">2</option>', '<option value="3">3</option>', '<option value="4">4</option>', '<option value="5">5</option>', '<option value="6">6</option>', '<option value="7">7</option>', '<option value="8">8</option>', '<option value="9">9</option>', '<option value="10">10</option>', '</select>', '</div>'].join(''));
              $('.NH002_box_how_many_rooms').after(['<div class="NH002_box_what_type_room box-with-border">', '<h2>3. Choose your rooms</h2>',
              '<p class="NH002_type_roomText">We ask that you fill each room you book i.e. if the room sleeps 2, there must be 2 guests. Children count toward room capacity. We’re happy to help find suitable rooms for your break, call us on 0844 477 9990 (8am - 8pm, 7 days a week)</p>',
              '</div>'].join(''));
              var coachSeatingCheck = $('#ddlSeatPosition');
              if (coachSeatingCheck.length > 0) {
                  var coachSeatingParent = coachSeatingCheck.closest('.box-with-border'),
                      coachSeatingTitle = coachSeatingParent.find('h2');
                  coachSeatingTitle.text('4. ' + coachSeatingTitle.text());
              }
              var $btnContinueOriginal = $('#btnContinue');
              $btnContinueOriginal.val('Continue');
              var $noChildren = $('#ddlChildren');
              $noChildren.on('change', function () {
                  sessionStorage.setItem('noChildren', $noChildren.val());
              });
              if (sessionStorage.getItem('noChildren')) {
                  var noChildrenValue = Number(sessionStorage.getItem('noChildren'));
                  $noChildren.find(' > option:eq(' + noChildrenValue + ')').prop('selected', 'selected');
              } else {
                  $noChildren.find(' > option:first').prop('selected', 'selected');
              }
              var $errorContiner = $('.main-content > .container > .alert');
              $errorContiner.css('marginTop', '15px');
              if ($('#ReqValidation').text().indexOf('passengers to travel') > -1) {
                  $errorContiner.find('.ui-state-error-text').text('Whoops! Sorry');
                  $('#ReqValidation').text('Please select the passengers to travel.');
                  $errorContiner.insertAfter($('.left > .box-with-border:first > p:first'));
                  events.send('NH002', 'Error: Select # passengers', 'NH002 - Room Availability', true);
              } else if ($('#ReqValidation').text().indexOf('number of people vs number of rooms') > -1) {
                  $errorContiner.find('.ui-state-error-text').text('Whoops! Sorry');
                  $('#ReqValidation').html('<p>It looks like these rooms don’t match your guests. Please note we require you to fill each room.</p><p>The fastest way to find a holiday with rooms to suit your party size is to use our Advanced Search feature.</p><a class="NH004_advanced-search" href="http://www.caledoniantravel.com/advanced-search?">Search Again</a><p>Alternatively, we’re happy to help find suitable rooms for your break, call us on 0844 477 9990</p>');
                  $errorContiner.appendTo($('.NH002_type_roomText'));
                  events.send('NH002', 'Error: Number of people and room capacity not equal', 'NH002 - Room Availability', true);
              } else if ($('#ReqValidation').text().indexOf('one adult passengers') > -1) {
                  $errorContiner.find('.ui-state-error-text').text('Whoops! Sorry');
                  $('#ReqValidation').text('There must be at least one adult passenger per room');
                  $errorContiner.insertAfter($('.left > .box-with-border:first > p:first'));
                  events.send('NH002', 'Error: Less than 1 adult passenger per room', 'NH002 - Room Availability', true);
              } else if ($('#ReqValidation').text().indexOf('at least one adult') > -1) {
                  $errorContiner.find('.ui-state-error-text').text('Whoops! Sorry');
                  $('#ReqValidation').text('There must be at least one adult passenger travelling on this break');
                  $errorContiner.insertAfter($('.left > .box-with-border:first > p:first'));
                  events.send('NH002', 'Error: No adult passengers selected', 'NH002 - Room Availability', true);
              } else if ($('#ReqValidation').text().toLowerCase().indexOf('requested items not available') > -1) {
                  $errorContiner.find('.ui-state-error-text').text('Not enough seats left');
                  $('#ReqValidation').html('<p>We’re very sorry but this coach doesn’t have sufficient seats for the number of people in your party.</p><p>We recommend you Search again, entering a different date or alternatively, choose a different holiday.</p><a class="NH004_advanced-search" href="http://www.caledoniantravel.com/advanced-search?">Search Again</a><p>Alternatively, we’re happy to help find suitable rooms for your break, call us on 0844 477 9990</p>');
                  $errorContiner.insertAfter($('.left > .box-with-border:first > p:first'));
                  events.send('NH002', 'Error: No adult passengers selected', 'NH002 - Room Availability', true);
              }
              var $lastRoomSection = $('.left .box-with-border:nth-last-child(2)');
              $lastRoomSection.hide(); 
              var $roomInfoRows = $lastRoomSection.find('.sml-tbl').find('#roomList').find('.field-row:not(.sold-out)');
              var bugFixWeird = false;
              var bugFixFinally = 'Pending';
              var $howManyRooms = $('.NH002_howManyRoomsSelect');
              $howManyRooms.on('change', function () {
                  if (bugFixWeird === true) {
                      bugFixFinally = 'Pending';
                  } else if (bugFixFinally === 'Pending') {
                      sessionStorage.removeItem('roomTypesIndexesArray');
                  }
                  var $this = $(this);
                  if ($this.val() === '0') {
                      $errorContiner.hide();
                  }
                  var $thisManyRooms = parseInt($this.val());
                  $('.NH002_roomTypeWrapper').remove();
                  if ($thisManyRooms) {
                      var i;
                      for (i = 1; i <= $thisManyRooms; i++) {
                          var $thisRoomTypeSelectHtml = $(['<div class="NH002_roomTypeWrapper NH002_roomNo' + ($thisManyRooms + 1 - i) + '">', '<label for="NH002_room_type_select">Room ' + ($thisManyRooms + 1 - i) + '</label>', '<select name="NH002_room_type_select" class="NH002_room_type_select">', '<option value="select">SELECT</option>', '</select>', '</div>'].join(''));
                          var $roomType, $roomHolds, $roomPerPersonSupplement;
                          $thisRoomTypeSelectHtml.insertAfter('.NH002_type_roomText');
                          var $thisRoomSelect = $('.NH002_roomNo' + ($thisManyRooms + 1 - i)).find('select');
                          $roomInfoRows.each(function () {
                              var $cells = $(this).find(' > .cell');
                              $cells.each(function (i) {
                                  var $cell = $(this);
                                  if ($cell.hasClass('two')) {
                                      $roomType = $cell.text().trim();
                                  }
                                  if ($cell.hasClass('three')) {
                                      $roomHolds = $cell.text().trim().replace(' people', '');
                                  }
                                  if ($cell.hasClass('four')) {
                                      $roomPerPersonSupplement = $cell.text().trim();
                                  }
                                  if (i === $cells.length - 1) {
                                      if (parseInt($roomPerPersonSupplement.substring(1)) === 0) {
                                          $('<option>' + $roomType + ', Sleeps ' + $roomHolds + '</option>').appendTo($thisRoomSelect);
                                      } else {
                                          $('<option>' + $roomType + ', Sleeps ' + $roomHolds + ', +' + $roomPerPersonSupplement + '</option>').appendTo($thisRoomSelect);
                                      }
                                  }
                              });
                          });
                      } 
                      var $roomCellOneInfoSelect = $roomInfoRows.find('.cell.one > select');
                      $roomCellOneInfoSelect.find('option:first').each(function () {
                          $(this).prop('selected', 'selected');
                      });
                      $('.NH002_room_type_select').data('prev', 'select');
                      var $prevRoomTypeToDecrement = $();
                      var $currRoomTypeToIncrement = $();
                      var indexImportant = 0;
                      if (sessionStorage.getItem('roomsSelectedArray')) {
                          sessionStorage.removeItem('roomsSelectedArray');
                      }
                      var roomTypesIndexesArray = [];
                      for (var k = 0; k < $('.NH002_room_type_select').length; k++) {
                          roomTypesIndexesArray[k] = 0;
                      }
                      if (sessionStorage.getItem('roomTypesIndexesArray')) {
                          roomTypesIndexesArray = JSON.parse(sessionStorage.getItem('roomTypesIndexesArray'));
                      }
                      var originalRoomTypesIndexesArray = [];
                      $('.NH002_room_type_select').on('change', function () {
                          var $thisSelect = $(this);
                          var $prevRoomType = $thisSelect.data('prev');
                          var $myArrayIndex = $thisSelect.index('.NH002_room_type_select');
                          if (sessionStorage.getItem('roomTypesIndexesArray') && $prevRoomType !== 'CAREFUL') {
                              $prevRoomType = $thisSelect.find(' > option:eq(' + roomTypesIndexesArray[$myArrayIndex] + ')').val();
                          }
                          roomTypesIndexesArray[$myArrayIndex] = $thisSelect.prop('selectedIndex');
                          sessionStorage.setItem('roomTypesIndexesArray', JSON.stringify(roomTypesIndexesArray));
                          $prevRoomTypeToDecrement = $();
                          $currRoomTypeToIncrement = $();
                          $thisSelect.data('prev', $thisSelect.val());
                          var $currentRoomType = $thisSelect.val();
                          $roomCellOneInfoSelect.each(function (i) {
                              if ($prevRoomType.indexOf($(this).parent().next().text().trim()) > -1) {
                                  $prevRoomTypeToDecrement = $(this);
                              }
                              if ($currentRoomType.indexOf($(this).parent().next().text().trim()) > -1) {
                                  $currRoomTypeToIncrement = $(this);
                                  indexImportant = i + 1; 
                              }
                          });
                          if ($prevRoomTypeToDecrement.length) {
                              if ($prevRoomTypeToDecrement.find('option[value="' + $prevRoomTypeToDecrement.val() + '"]').prev().length) {
                                  $prevRoomTypeToDecrement.find('option[value="' + $prevRoomTypeToDecrement.val() + '"]').prev().prop('selected', 'selected');
                              }
                          }
                          if ($prevRoomTypeToDecrement.val() <= $prevRoomTypeToDecrement.find('option:last').val()) {
                              $('.NH002_room_type_select > option').each(function () {
                                  if ($(this).val().indexOf($prevRoomTypeToDecrement.parent().next().text().trim()) > -1) {
                                      $(this).removeProp('disabled');
                                  }
                              });
                              $('.NH002_noRoomsOfThisType').remove();
                          }
                          if ($currRoomTypeToIncrement.length && $currentRoomType !== 'select') {
                              if ($currRoomTypeToIncrement.find('option[value="' + $currRoomTypeToIncrement.val() + '"]').next().length) {
                                  $currRoomTypeToIncrement.find('option[value="' + $currRoomTypeToIncrement.val() + '"]').next().prop('selected', 'selected');
                                  $thisSelect.next('.NH002_noRoomsOfThisType').remove();
                              } else {
                                  $thisSelect.find('option:eq(' + indexImportant + ')').prop('disabled', 'disabled');
                                  $thisSelect.find('option:first').prop('selected', 'selected');
                                  roomTypesIndexesArray[$myArrayIndex] = $thisSelect.prop('selectedIndex');
                                  sessionStorage.setItem('roomTypesIndexesArray', JSON.stringify(roomTypesIndexesArray));
                                  if (!$thisSelect.next('.NH002_noRoomsOfThisType').length) {
                                      $('<p class="NH002_noRoomsOfThisType">We are sorry. There are no additional rooms available of your selected type</p>').insertAfter($thisSelect);
                                  }
                                  $thisSelect.data('prev', 'CAREFUL');
                              }
                          }
                          $roomCellOneInfoSelect.each(function (i) {
                              var $this = $(this);
                              originalRoomTypesIndexesArray[i] = $this.val();
                          });
                          sessionStorage.setItem('originalRoomTypesIndexesArray', JSON.stringify(originalRoomTypesIndexesArray));
                          $thisSelect.next('.NH002_supplementMsg').remove();
                          if ($thisSelect.val().indexOf('+£') > -1 && $thisSelect.val().toLowerCase().indexOf('sleeps 1') > -1) {
                              $('<p class="NH002_supplementMsg">Supplements apply from time to time. <span class="tooltip">Why?</span><span class="tooltiptext"><strong>Why do we charge a single supplement?</strong><br />Many of our selected hotels levy varying charges for single bedroom occupancy. In this case our standard supplement charges apply, which vary depending upon the duration of your holiday. <a class="NH004_supplements_close">OK</a></span></p>').insertAfter($thisSelect);
                          }
                          var $people = parseInt($('#ddlAdults').val()) + parseInt($('#ddlChildren').val());
                          var $roomCapacity = 0;
                          $('.NH002_room_type_select').each(function () {
                              var $this = $(this);
                              if ($this.val().indexOf('Sleeps ') > -1) {
                                  $roomCapacity += parseInt($this.val().substring($this.val().indexOf('Sleeps ') + 7, $this.val().indexOf('Sleeps ') + 8));
                              }
                          });
                          if ($roomCapacity && $roomCapacity === $people) {
                              $('.NH002_room_type_select').css('border', '1px solid green');
                          } else {
                              $('.NH002_room_type_select').css('border', '1px solid red');
                          }
                          $('.NH002_supplementMsg .tooltip, .NH004_supplements_close').on('click', function () {
                              var toggleTarget = $('.NH002_supplementMsg');
                              if (toggleTarget.hasClass('NH004_active')) {
                                  toggleTarget.removeClass('NH004_active');
                              } else {
                                  toggleTarget.addClass('NH004_active');
                              }
                          });
                          var el = $(this),
                              elVal = el.val(),
                              elParent = el.closest('.NH002_roomTypeWrapper');
                          if (elVal !== 'select') {
                              if (elParent.next('.NH004_room-info').length > 0) {
                                  elParent.next('.NH004_room-info').remove();
                              }
                              console.log(elVal.toLowerCase());
                              if (elVal.toLowerCase().indexOf('double + single') > -1) {
                                elParent.after('\n\t\t\t\t\t\t\t\t\t\t<div class="NH004_room-info">\n\t\t\t\t\t\t\t\t\t\t\t<img alt="Double bed" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/9ffa5f09f1e3cecec7cba9b5904085ca_double_bed.png" /><img alt="Single bed" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/0cafe1fd894c444a0debc78e3ee0ab4f_single_bed.png" />\n\t\t\t\t\t\t\t\t\t\t\t<p>This room accommodates 2 guests in 1 double and 1 guest in 1 single bed</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t');
                              }
                              else if (elVal.toLowerCase().indexOf('sleeps 3') > -1) {
                                  elParent.after('\n\t\t\t\t\t\t\t\t\t\t<div class="NH004_room-info"><p>This room accommodates 3 guests</p></div>');
                              } else if (elVal.toLowerCase().indexOf('sleeps 1') > -1) {
                                  elParent.after('\n\t\t\t\t\t\t\t\t\t\t<div class="NH004_room-info">\n\t\t\t\t\t\t\t\t\t\t\t<img alt="Single bed" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/0cafe1fd894c444a0debc78e3ee0ab4f_single_bed.png" />\n\t\t\t\t\t\t\t\t\t\t\t<p>This room accommodates 1 guest in a single bed</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t');
                              } else if (elVal.toLowerCase().indexOf('double') > -1) {
                                  elParent.after('\n\t\t\t\t\t\t\t\t\t\t<div class="NH004_room-info">\n\t\t\t\t\t\t\t\t\t\t\t<img alt="Double bed" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/9ffa5f09f1e3cecec7cba9b5904085ca_double_bed.png" />\n\t\t\t\t\t\t\t\t\t\t\t<p>This room accommodates 2 guests in a double-size bed</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t');
                              } else if (elVal.toLowerCase().indexOf('twin') > -1) {
                                  elParent.after('\n\t\t\t\t\t\t\t\t\t\t<div class="NH004_room-info">\n\t\t\t\t\t\t\t\t\t\t\t<img alt="Twin bed" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/239becbe8d6e509036b363b6f60fc10f_twin_beds.png" />\n\t\t\t\t\t\t\t\t\t\t\t<p>This room accommodates 2 guests in 2 single beds</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t');
                              } else if (elVal.toLowerCase().indexOf('quad') > -1 || elVal.toLowerCase().indexOf('family') > -1 || elVal.toLowerCase().indexOf('sleeps 4') > -1) {
                                  elParent.after('\n\t\t\t\t\t\t\t\t\t\t<div class="NH004_room-info">\n\t\t\t\t\t\t\t\t\t\t\t<p>This room accommodates 4 guests</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t');
                              }  
                              
                          } else {
                              if (elParent.next('.NH004_room-info').length > 0) {
                                  elParent.next('.NH004_room-info').remove();
                              }
                          }
                      }); 
                      if ($errorContiner.is(':visible')) {
                          $('.NH002_room_type_select').css('border', '1px solid red');
                      }
                  } 
                  if (bugFixWeird === true) {
                      bugFixWeird = false;
                  }
              }); 
              var $noAdults = $('#ddlAdults');
              var $howManyRoomsNeeded = $('.NH002_howManyRoomsSelect');
              $noAdults.on('change', function () {
                  sessionStorage.setItem('noAdults', $noAdults.val());
              });
              $howManyRoomsNeeded.on('change', function () {
                  sessionStorage.setItem('noRoomsNeeded', $howManyRoomsNeeded.val());
                  sessionStorage.setItem('roomTypes', $('.NH002_roomTypeWrapper').length);
                  $('.NH004_room-info').remove();
              });
              if (sessionStorage.getItem('noRoomsNeeded') && Number(sessionStorage.getItem('noRoomsNeeded')) !== 0) {
                  var noRoomsNeededValue = Number(sessionStorage.getItem('noRoomsNeeded'));
                  $howManyRooms.find(' > option:eq(' + noRoomsNeededValue + ')').prop('selected', 'selected');
                  bugFixWeird = true;
                  $howManyRooms.val(noRoomsNeededValue).trigger('change');
              }
              if (sessionStorage.getItem('roomTypes') && Number(sessionStorage.getItem('roomTypes')) !== 0) {
                  if (sessionStorage.getItem('roomTypesIndexesArray')) {
                      var roomTypesArray = JSON.parse(sessionStorage.getItem('roomTypesIndexesArray'));
                      $('.NH002_room_type_select').each(function (i) {
                          var $this = $(this);
                          $this.find(' > option:eq(' + roomTypesArray[i] + ')').prop('selected', 'selected');
                      });
                  }
              }
              if (sessionStorage.getItem('originalRoomTypesIndexesArray')) {
                  var originalRoomTypesArray = JSON.parse(sessionStorage.getItem('originalRoomTypesIndexesArray'));
                  var $roomCellOneInfoSelectUpdate = $roomInfoRows.find('.cell.one > select');
                  $roomCellOneInfoSelectUpdate.each(function (i) {
                      var $this = $(this);
                      $this.find(' > option:eq(' + originalRoomTypesArray[i] + ')').prop('selected', 'selected');
                  });
              }
              var $people = parseInt($('#ddlAdults').val()) + parseInt($('#ddlChildren').val());
              var $roomCapacity = 0;
              $('.NH002_room_type_select').each(function () {
                  var $this = $(this);
                  if ($this.val().indexOf('Sleeps ') > -1) {
                      $roomCapacity += parseInt($this.val().substring($this.val().indexOf('Sleeps ') + 7, $this.val().indexOf('Sleeps ') + 8));
                  }
              });
              if ($roomCapacity && $roomCapacity === $people) {
                  $('.NH002_room_type_select').css('border', '1px solid green');
                  $errorContiner.hide();
              } else {
                  $errorContiner.show();
              }
              if ($howManyRooms.val() === '0') {
                  $errorContiner.hide();
              }
              if ($errorContiner.find('.ui-state-error-text').text().indexOf('enough seats left') > -1) {
                  $errorContiner.show();
              }
          }
      };
      var modal = {
          contentBuilder: function contentBuilder() {
              cacheDom.bodyVar.append(['<div class="NH004_pop-up_modal">', '<div class="NH004_body_click"></div>', '<div class="NH004_inner_div">', '<a href="#" class="NH004_close_btn">X</a>', '<div class="NH004_overflow_fix">', '<h3>No single occupancy rooms available</h3>', '<p>We\'re very sorry but there are no more single <br />occupancy rooms on this holiday.</p>', '<p>If you are travelling on your own, the fastest way to find <br /> a holiday, is to use our Advanced Search feature.</p>', '<a class="NH004_cta" href="http://www.caledoniantravel.com/advanced-search?">Advanced Search</a>', '<span>or <a class="NH004_close-modal">Continue on this page</a></span>', '</div>', '</div>', '</div>'].join(''));
              cacheDom.modal = $(".NH004_pop-up_modal");
              cacheDom.modalBG = cacheDom.modal.find('.NH004_body_click');
          }
      };
      var singleSeatingTrigger = {
          noSingleSleeping: function noSingleSleeping() {
              var singleCheck = false;
              $('#roomList .field-row:not(.sold-out)').each(function () {
                  var el = $(this),
                      elText = el.text();
                  if (elText.indexOf('Single') > -1) {
                      singleCheck = true;
                  }
              });
              if (singleCheck === false) {
                  this.selectChange();
              }
          },
          selectChange: function selectChange() {
              cacheDom.adultsDropdown.on('change', function () {
                  if (cacheDom.adultsDropdown.val() == 1 && cacheDom.singleModalShown === false) {
                      events.send('NH004', 'Single room not available', 'Modal shown', true);
                      cacheDom.modal.fadeIn("slow", function () {
                          cacheDom.modal.addClass("active");
                          slideQ = false;
                          cacheDom.singleModalShown = true;
                      });
                      cacheDom.modalBG.on(cacheDom.modalClick, function () {
                          if (cacheDom.modal.hasClass("active")) {
                              cacheDom.modal.fadeOut("slow", function () {
                                  cacheDom.modal.removeClass("active");
                                  cacheDom.bodyVar.off("mousedown");
                              });
                          }
                      });
                  }
              });
          }
      };
      var elementBindings = {
          modalClickOn: function modalClickOn() {
              cacheDom.modal.find('.NH004_close-modal, .NH004_close_btn').on("click", function () {
                  if (slideQ === false) {
                      slideQ = true;
                      if (cacheDom.modal.hasClass("active")) {
                          cacheDom.modal.fadeOut("slow", function () {
                              cacheDom.modal.removeClass("active");
                              cacheDom.bodyVar.off(cacheDom.modalClick);
                              slideQ = false;
                          });
                      } else {
                          cacheDom.modal.fadeIn("slow", function () {
                              cacheDom.modal.addClass("active");
                              slideQ = false;
                          });
                          cacheDom.modalBG.on(cacheDom.modalClick, function () {
                              if (cacheDom.modal.hasClass("active")) {
                                  cacheDom.modal.fadeOut("slow", function () {
                                      cacheDom.modal.removeClass("active");
                                      cacheDom.bodyVar.off("mousedown");
                                  });
                              }
                          });
                      }
                  }
              });
          }
      };
      var preloadImage = {
          contentBuilder: function contentBuilder() {
              cacheDom.bodyVar.append('<img alt="Single bed" style="display: none;" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/0cafe1fd894c444a0debc78e3ee0ab4f_single_bed.png" /><img alt="Twin bed" style="display: none;" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/239becbe8d6e509036b363b6f60fc10f_twin_beds.png" /><img style="display: none;" alt="Double bed" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/9ffa5f09f1e3cecec7cba9b5904085ca_double_bed.png" />');
          }
      };
      NH002.init();
      modal.contentBuilder();
      preloadImage.contentBuilder();
      elementBindings.modalClickOn();
      singleSeatingTrigger.noSingleSleeping();
  }
  init();
};
export default nh04;