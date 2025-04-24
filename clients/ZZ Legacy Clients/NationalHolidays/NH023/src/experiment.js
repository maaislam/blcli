import { fullStory, events } from '../../../../lib/utils';

var settings = {
	ID: '{{ID}}',
	VARIATION: '{{VARIATION}}'
};

var dateObject = {
  'weekDays': ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  'month': ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  'suffixDay': ["st", "nd", "rd"]
};
var checkEvents;
var getFormattedData = function (dateString){
  var getCustomDate = new Date(dateString);
  var getTempDay = dateObject.weekDays[getCustomDate.getDay()];
  var getTempMonth = dateObject.month[getCustomDate.getMonth()];
  var getTempDate = getCustomDate.getDate().toString();
  var getTempSuffix = getCustomDate.getDate() > 3 && (getCustomDate.getDate() <= 20 || getCustomDate.getDate() > 23) ? "th" : dateObject.suffixDay[getTempDate[getTempDate.length - 1] - 1];
  return getTempDay + ' ' + getTempDate + getTempSuffix + ' ' + getTempMonth;
};
var popupOverlayHTML = [
'<div class="custom-popUp-form-wrapper">',
'    <div class="custom-popUp-form-overlay"></div>   ',
'    <div class="custom-popUp-form-group">',
'        <div class="custom-popUp-close-icon">X</div>',
'        <h3 class="custom-PopUp-form-title">Choose another date</h3>',
'        <ul class="custom-date-ul">',
'        </ul>',
'    </div>',
'</div>'
].join('');
function clickFunctionLabel(ele){
  jQuery(ele).click(function () {
    jQuery('.custom-date-ul').html('');
    var getTempValue = jQuery(this).closest('div').find('.tour-list').val();
    var getDataId = jQuery(this).closest('.result-item').attr('id');
    jQuery(this).closest('div').find('.tour-list > option').each(function () {
      var getTempOptionVale = jQuery(this).attr('value');
      if(getTempOptionVale !== ""){
        var getTempText = jQuery(this).html();
        if(getTempText.indexOf(',')!==-1){
          var getDateText = getTempText.split(',')[0];
          var getCustomDateString = getFormattedData(getDateText);
          var tempLiHtml = [
          '<li data-attribute="' + getTempOptionVale + '">',
          '  <div class="custom-popUp-left-sec">',
          '      <p>Coach Departs on</p>',
          '      <h4>' + getCustomDateString + '</h4>',
          '  </div>',
          '  <div class="custom-popUp-right-sec">',
          '      <a class="custom-select">Select</a>',
          '  </div>',
          '</li>'
          ].join('');
          jQuery('.custom-date-ul').append(tempLiHtml);
          jQuery('.custom-date-ul').attr('data-id', getDataId);
          jQuery('.custom-popUp-form-wrapper').addClass('activate');
          jQuery('.custom-select').click(function () {
            var getSelectId = jQuery(this).closest('.custom-date-ul').attr('data-id');
            var getAttributeValue = jQuery(this).closest('li').attr('data-attribute');
            jQuery('#'+ getSelectId).find('.tour-list').val(getAttributeValue).change();
            jQuery('#'+ getSelectId).find('.tour-list').addClass('activate');
            jQuery('.custom-popUp-form-wrapper').removeClass('activate');
              
            // Fire event experiment did run
            events.send(settings.ID, 'did-choose-select-in-lightbox', '', { sendOnce: true  });
          });
        }
      } 
    });
      
    // Fire event experiment did run
    events.send(settings.ID, 'did-click-label', '', { sendOnce: true  });
  });
}
function waitandApplyChanges(ele) {
  var customTempText =  jQuery(ele).text().replace(':', '');
  jQuery(ele).text(customTempText);
  jQuery(ele).addClass('customAllLabel');
  
  var checkIfLoaded = setInterval(function () {
    if(jQuery(ele).closest('div').find('.tour-list-btn').attr('style') !== undefined){
      clearInterval(checkIfLoaded);

			// Fire event experiment did run
			events.send(settings.ID, 'did-show-tour-list-amends', '', { sendOnce: true  });

      //var customTempText =  jQuery(ele).text().replace(':', '');
      //jQuery(ele).text(customTempText);
      jQuery(ele).addClass('customLabel');
      if(jQuery(ele).closest('div').find('.tour-list').children().length > 2){
        clickFunctionLabel(ele);
      }
      else if(jQuery(ele).closest('div').find('.tour-list').children().length == 2) {
        jQuery(ele).closest('div').find('.tour-list').val(jQuery(ele).closest('div').find('.tour-list').find('option').attr('value'));
        //might need to change
        var tempChangedVal = jQuery(ele).closest('div').find('.tour-list > option:last-child').attr('value');
        jQuery(ele).addClass('oneOption');
        jQuery(ele).closest('div').find('.tour-list').val(tempChangedVal);
        jQuery(ele).text(jQuery(ele).closest('div').find('.tour-list > option:selected').text());
      }
      else{
        jQuery(ele).addClass('greyedOutDisabled');
      }
    }
  }, 100);
}
jQuery(function () {
  var clickTillSelectAvailable = setInterval(function () {
    if(typeof jQuery._data(jQuery(".tour-list-btn").get(0), 'events').click == "object"){
      clearInterval(clickTillSelectAvailable);
      jQuery('.tour-list-btn').click();
    }
  }, 100);
  jQuery('body').append(popupOverlayHTML);
  jQuery('.tour-list').closest('div').find('label').each(function () {
    waitandApplyChanges(this);
  });
  jQuery('.custom-popUp-close-icon, .custom-popUp-form-overlay').click(function () {
    jQuery('.custom-popUp-form-wrapper').removeClass('activate');
  });

	fullStory(settings.ID, `Variation ${settings.VARIATION}`);
	events.setTrackerName('tracker2');

  document.body.classList.add('NH023');
});
