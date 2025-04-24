/* eslint-disable */
import { events } from '../../../../../lib/utils';

const nh02 = () => {

  var $ = window.jQuery;
  var $body = $('body');
  $body.addClass('NH002');

  // If user select another trip clear storage
  if ($('.right .box-with-border:first > h3:first').text().trim() !== sessionStorage.getItem('travelInfoHeader')
      || !sessionStorage.getItem('travelInfoHeader')) {
      sessionStorage.clear();
  }

  // On mobile add this small header
  $('.box-with-border.white:first').prepend('<span class="NH002_yourTripWithUs" style="display: none;">Your break with us</span>');

  sessionStorage.setItem('travelInfoHeader', $('.right .box-with-border:first > h3:first').text().trim());

  // Change text
  $('.container > .inner-content > h1 > span').text('Choose your rooms ');
  $('.left > .box-with-border > h2').text('1. How many are staying');

  // Set adults select to 0 (was set to 1 as default) (if no sessionStorage found)
  if (sessionStorage.getItem("noAdults")) {
      var noAdultsValue = Number(sessionStorage.getItem("noAdults"));
      $('#ddlAdults').find(' > option:eq(' + noAdultsValue + ')').prop('selected', 'selected');
  } else {
      $('#ddlAdults').find(' > option:first').prop('selected', 'selected');
  }

  // Change infants dropdown to a checkbox
  var $selectInfants = $('select#ddlInfants');
  $selectInfants.hide();
  $selectInfants.next().hide();
  $('<div class="NH002_infantsCheckWrap"><input type="checkbox" name="NH002_infantsCheck" class="NH002_infantsCheck">' +
      '<span class="NH002_haveInfants">Do you have any infants travelling under 2 years old?</span></div>')
      .insertBefore('#ddlInfants');
  var $infantsCheckbox = $('.NH002_infantsCheck');
  var $noInfants = $('#ddlInfants');

  // When checkbox checked release the dropdown under it
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

  // If page refreshed or whatever remember number infants as well as have the checkbox checked-----
  // -----------------------------------------------------------------------------------------------
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

  // -----------------------------------------------------------------------------------------------

  // Also trigger checbox change when clicking its corresponding text
  $('.NH002_haveInfants').on('click', function () {
      $infantsCheckbox.trigger('click');
  });

  // Add a 'How many rooms do you need?' section
  $('.box-with-border:first').after([
      '<div class="NH002_box_how_many_rooms box-with-border">',
      '<h2>2. How many rooms do you need?</h2>',
      '<select name="NH002_howManyRoomsSelect" class="NH002_howManyRoomsSelect"">',
      '<option selected="selected" value="0">0</option>',
      '<option value="1">1</option>',
      '<option value="2">2</option>',
      '<option value="3">3</option>',
      '<option value="4">4</option>',
      '<option value="5">5</option>',
      '<option value="6">6</option>',
      '<option value="7">7</option>',
      '<option value="8">8</option>',
      '<option value="9">9</option>',
      '<option value="10">10</option>',
      '</select>',
      '</div>'
  ].join(''));

  // Add a 'What type of room would you like?' which uses info from the last section 'How many are staying' (will hide this)
  $('.NH002_box_how_many_rooms').after([
      '<div class="NH002_box_what_type_room box-with-border">',
      '<h2>3. Choose your rooms</h2>',
      //'<p class="NH002_please_select">Please select your rooms below.</p>',
      '<p class="NH002_type_roomText">We ask that you fill each room you book i.e. if the room sleeps 2, there must be 2 guests. Children count toward room capacity. We’re happy to help find suitable rooms for your break, call us on 0844 477 9990 (8am - 8pm, 7 days a week)</p>',
      //'<p class="NH002_helpMsg">If you need any help please call us on 0844 477 9990 between 8am and 8m 7 days a week</p>',
      '</div>'
  ].join(''));

  // Change bottom button text
  var $btnContinueOriginal = $('#btnContinue');
  $btnContinueOriginal.val('Continue');
  // If page refreshed or whatever remember number children as well --------------------------------
  // -----------------------------------------------------------------------------------------------
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

  // Errors here
  var $errorContiner = $('.main-content > .container > .alert');
  $errorContiner.css('marginTop', '15px');
  if ($('#ReqValidation').text().indexOf('passengers to travel') > -1) {
      $errorContiner.find('.ui-state-error-text').text('Whoops! Sorry');
      $('#ReqValidation').text('Please select the passengers to travel.');
      $errorContiner.insertAfter($('.left > .box-with-border:first > p:first'));
      events.send('NH002', 'Error: Select # passengers', 'NH002 - Room Availability', true);
  } else if ($('#ReqValidation').text().indexOf('number of people vs number of rooms') > -1) {
      $errorContiner.find('.ui-state-error-text').text('Whoops! Sorry');
      $('#ReqValidation').text('It looks like these rooms don’t match your guests. Please note we require you to fill each room. We’re happy to help find suitable rooms for your break, call us on 0844 477 9990');
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
  }

  // Get room info from last section
  var $lastRoomSection = $('.left .box-with-border:nth-last-child(2)');
  // -----------------------------------
  // -------Testing purposes only-------
  // -----------------------------------
  $lastRoomSection.hide(); // hide it (when finished testing)
  // -----------------------------------
  // -----------------------------------
  // -----------------------------------

  /* Get room info rows
      1. First Row (.cell.one) @important: contains the select how many rooms of a specific room type (e.g single en-suite)
      2. Second Row (.cell.two): type of room
      3. Third Row (.cell.three): room occupancy (e.g 2 people)
      4. Fourth Row (.cell.four): supplement (per person)
   */
  var $roomInfoRows = $lastRoomSection.find('.sml-tbl').find('#roomList').find('.field-row:not(.sold-out)');

  var bugFixWeird = false;
  var bugFixFinally = 'Pending';

  // Get the number of rooms the user selects
  var $howManyRooms = $('.NH002_howManyRoomsSelect');
  $howManyRooms.on('change', function () {

      // Fix session storage problem
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
              var $thisRoomTypeSelectHtml = $([
                  '<div class="NH002_roomTypeWrapper NH002_roomNo' + ($thisManyRooms + 1 - i) + '">',
                  '<label for="NH002_room_type_select">Room ' + ($thisManyRooms + 1 - i) + '</label>',
                  '<select name="NH002_room_type_select" class="NH002_room_type_select">',
                  '<option value="select">SELECT</option>',
                  '</select>',
                  '</div>'
              ].join(''));

              // Declare some vars outside the scope of $thisRoomSelect
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
                              $('<option>' + $roomType + ', Sleeps ' + $roomHolds + '</option>')
                                  .appendTo($thisRoomSelect);
                          } else {
                              $('<option>' + $roomType + ', Sleeps ' + $roomHolds + ', +' + $roomPerPersonSupplement + '</option>')
                                  .appendTo($thisRoomSelect);
                          }
                      }

                  });
              });
          } // for

          // Need to update this correctly as this is what sends info to the server (better ways of doing the below?)
          var $roomCellOneInfoSelect = $roomInfoRows.find('.cell.one > select');
          // ---
          $roomCellOneInfoSelect.find('option:first').each(function () {
              $(this).prop('selected', 'selected');
          });
          // ---

          $('.NH002_room_type_select').data('prev', 'select');
          var $prevRoomTypeToDecrement = $();
          var $currRoomTypeToIncrement = $();
          var indexImportant = 0;
          // In order to ensure session storage works correctly for the below item removeit on 'no rooms' change
          if (sessionStorage.getItem('roomsSelectedArray')) {
              sessionStorage.removeItem('roomsSelectedArray');
          }
          // Array containing the indexes of the selected options (room types)
          // For session storage
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

              // For session storage
              var $myArrayIndex = $thisSelect.index('.NH002_room_type_select');

              if (sessionStorage.getItem('roomTypesIndexesArray') && $prevRoomType !== 'CAREFUL') {
                  $prevRoomType = $thisSelect.find(' > option:eq(' + roomTypesIndexesArray[$myArrayIndex] + ')').val();
              }

              // For Session Storage
              roomTypesIndexesArray[$myArrayIndex] = $thisSelect.prop('selectedIndex');
              sessionStorage.setItem('roomTypesIndexesArray', JSON.stringify(roomTypesIndexesArray));

              $prevRoomTypeToDecrement = $();
              $currRoomTypeToIncrement = $();

              $thisSelect.data('prev', $thisSelect.val());
              var $currentRoomType = $thisSelect.val();

              $roomCellOneInfoSelect.each(function (i) {
                  if ($prevRoomType.indexOf($(this).parent().next().text().trim()) > -1) { // decrease by 1 (if possible) in the select
                      $prevRoomTypeToDecrement = $(this);
                  }
                  if ($currentRoomType.indexOf($(this).parent().next().text().trim()) > -1) { // increase by 1 (if possible) in the select
                      $currRoomTypeToIncrement = $(this);
                      indexImportant = i + 1; // 1 to abstract the 'select' option in the.. select element
                  }
              });

              if ($prevRoomTypeToDecrement.length) {
                  if (($prevRoomTypeToDecrement.find('option[value="' + $prevRoomTypeToDecrement.val() + '"]')
                          .prev()).length) {
                      $prevRoomTypeToDecrement.find('option[value="' + $prevRoomTypeToDecrement.val() + '"]')
                          .prev().prop('selected', 'selected');
                  }
              }

              // remove 'disabled' rooms when users do stuff and the no. of rooms in that category is less then maximum
              if ($prevRoomTypeToDecrement.val() <= $prevRoomTypeToDecrement.find('option:last').val()) {
                  $('.NH002_room_type_select > option').each(function () {
                      if ($(this).val().indexOf($prevRoomTypeToDecrement.parent().next().text().trim()) > -1) {
                          $(this).removeProp('disabled');
                      }
                  });
                  $('.NH002_noRoomsOfThisType').remove();
              }

              if ($currRoomTypeToIncrement.length && $currentRoomType !== 'select') {
                  if (($currRoomTypeToIncrement.find('option[value="' + $currRoomTypeToIncrement.val() + '"]')
                          .next()).length) {
                      $currRoomTypeToIncrement.find('option[value="' + $currRoomTypeToIncrement.val() + '"]')
                          .next().prop('selected', 'selected');
                      $thisSelect.next('.NH002_noRoomsOfThisType').remove();
                  } else {
                      $thisSelect.find('option:eq(' + indexImportant + ')').prop('disabled', 'disabled');
                      $thisSelect.find('option:first').prop('selected', 'selected');
                      // For Session Storage
                      roomTypesIndexesArray[$myArrayIndex] = $thisSelect.prop('selectedIndex');
                      sessionStorage.setItem('roomTypesIndexesArray', JSON.stringify(roomTypesIndexesArray));
                      if (!$thisSelect.next('.NH002_noRoomsOfThisType').length) {
                          $('<p class="NH002_noRoomsOfThisType">We are sorry. There are no additional rooms available of your selected type</p>')
                              .insertAfter($thisSelect);
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
              if ($thisSelect.val().indexOf('+£') > -1) {
                  $('<p class="NH002_supplementMsg">Supplements apply from time to time. <span class="tooltip">Why?<span class="tooltiptext"><strong>Why do you charge a single supplement?</strong><br />Whilst many of our selected hotels levy varying charges for single bedroom occupancy Caledonian Travel has adopted a policy of spreading these charges equally across our holiday programme, thereby (subject to availability) allowing single bedroom allocation on all departures. For certain longer holidays special single room supplements may apply.</span></span></p>')
                      .insertAfter($thisSelect);
              }

              // Validation #people = room capacity
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
                  $('.NH002_room_type_select').css('border', '1px solid red');
              }
          }); // type of rooms select 'change' event listener
          if ($errorContiner.is(':visible')) {
              $('.NH002_room_type_select').css('border', '1px solid red');
          }
      } // if rooms > 0
      if (bugFixWeird === true) {
          bugFixWeird = false;
      }
  }); // 'change' event listener

  // Session Storage ------------------------------------
  // ----------------------------------------------------
  // Cache vars
  var $noAdults = $('#ddlAdults');
  var $howManyRoomsNeeded = $('.NH002_howManyRoomsSelect');
  // Evt. listeners here - more readability
  $noAdults.on('change', function () {
      sessionStorage.setItem('noAdults', $noAdults.val());
  });

  $howManyRoomsNeeded.on('change', function () {
      sessionStorage.setItem('noRoomsNeeded', $howManyRoomsNeeded.val());
      sessionStorage.setItem('roomTypes', $('.NH002_roomTypeWrapper').length);
  });

  // If e.g on page reload the number of rooms user had selected was > 0 set to number of rooms
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
      // Need to update this correctly as this is what sends info to the server
      var $roomCellOneInfoSelectUpdate = $roomInfoRows.find('.cell.one > select');
      $roomCellOneInfoSelectUpdate.each(function (i) {
          var $this = $(this);
          $this.find(' > option:eq(' + originalRoomTypesArray[i] + ')').prop('selected', 'selected');
      });
  }

  // Validation #people = room capacity (on page load too (not just in the evt. listener above))
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

  // ----------------------------------------------------

  events.send('NH002', 'Page View', 'NH002 - Room Availability', true);
};
export default nh02;