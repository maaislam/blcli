/* eslint-disable */
import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC011',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    events.send('RC011', 'Page View', 'Experiment triggered - V1');
    var $ = window.jQuery;
          
    $('body').addClass('RC011');
        
  
    $('.form-item.form-course-type > label').text('Select a course');
    $('.RC011 .trustpilot-container').remove();
    $('<span class="text-menu">MENU</span>').appendTo('.RC011 .flyout-tab');
        
    $('.RC011 .flyout-inner').addClass('altered');
        $('.RC011 .flyout-tab').detach().appendTo('.RC011 .flyout-inner.altered');
    $('<a href="#" class="flyout-tab-altered"><i class="icon-hamburger"></i><span class="text-menu">MENU</span></a>').insertBefore('.RC011 .flyout');
    
    $('<a class="nav-button-tel" style="text-decoration:none" id="search-button"><i class="icon-search"></i></a>').insertBefore('.RC011 .nav-button-tel');
    var courseH2 = $('.RC011 .flyout-inner .course-search-header:first').html();
    courseH2 = courseH2.replace('Find a', 'Select a');
    $('.RC011 .flyout-inner .course-search-header').html(courseH2);
    $('.RC011 .flyout-inner .ui-selectmenu-text').append(' courses');
    $('.RC011 .navigation .nav-item-cen').remove();
    $('.RC011 .nav-buttons .icon-arrow-right').parents('.nav-button-expand').remove();
    $('.RC011 .flyout-close').html('<i class="fa fa-close close-rct-nav"></i>').detach().insertBefore('.RC011 #OffCanvasNavCtl_ctl00_RegisterLogin');
    $('.RC011 #OffCanvasNavCtl_ctl00_RegisterLogin').addClass('logintab').detach().prependTo('.RC011 .flyout-inner.altered .subnav-mobile .js-subnav');
      
    $('.RC011 .js-subnav').find('.subnav-level-1 a:contains("First aid courses")').parents('li').addClass('first-aid-courses-subnav').detach().prependTo('.RC011 .subnav-mobile > .js-subnav');
      
      
    //Arrows amend - do not rotate on click as they have no content
    $('.subnav-haschildren.subnav-level-1').not(':first').each(function(){
      var $this = $(this);
      $this.click(function(){
        $this.find('.icon-arrow-down').removeClass('icon-arrow-down').addClass('icon-arrow-right');
      });
    });
          
    $('.RC011 .flyout-inner .course-search-internal').parents('.component').detach().appendTo('.RC011 .subnav-mobile .first-aid-courses-subnav ul');
  
    $('.RC011 #OffCanvasNavCtl_ctl02_TownOrPostCodeFormField_Button_DoSearch').addClass('component-search-button').detach().insertAfter('.RC011 #OffCanvasNavCtl_ctl02_TownOrPostCodeFormField_ctl00');
  
    $('.RC011 .flyout-inner.altered').find('a:contains("Choose the right course")').html('First aid finder <span class="faf">New</span>');
    $(document).on('click', '.RC011 .course-search-switcher a', function() {
        setTimeout(function() {
            $('.RC011 .flyout-inner .ui-selectmenu-text').append(' courses');
        }, 100);
        return true;
    });
      $(document).on('click', '.RC011 .flyout-tab-altered', function(e) {
        e.preventDefault();
        $('.RC011 .flyout-tab').trigger('click');
      });
      var siteSearchButton = $('#search-button');
      siteSearchButton.click(function(e) {
        e.preventDefault();
        var sitesearch = $('.RC011 .site-search');
        if(sitesearch.hasClass('open')) {
          sitesearch.removeClass('open');
        } else {
          sitesearch.addClass('open');
        }
      });
            
        setFarDate();
          
        $(function() {
          setTimeout(function(){
            $('.RC011 .first-aid-courses-subnav').find('ul').css('display','block');
            $('.RC011 .first-aid-courses-subnav').find('i').attr('class', 'icon-arrow-down');
          }, 1000);
        });
        
      
      function setFarDate() {
        var dateInput = $('.RC011 #OffCanvasNavCtl_ctl02_SelectToDate');
        var dateval = dateInput.val();
        var parts = dateval.split('/');
        //please put attention to the month (parts[0]), Javascript counts months from 0:
        // January - 0, February - 1, etc
        var year = parseInt(parts[2]) + 2000;
        var month = parseInt(parts[1]) - 1;
        var day = parseInt(parts[0]);
        var mydate = new Date(year, month, day); 
        var newDate = mydate;
        newDate.setMonth(newDate.getMonth() + 1);
        var dateStringVal = ('0' + newDate.getDate()).slice(-2) + '/' + ('0' + (newDate.getMonth()+1)).slice(-2) + '/' + newDate.getFullYear().toString().substr(-2);
            var oddDateStringVal = (newDate.getFullYear() + '0' + '-' + ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + newDate.getDate()).slice(-2);
        dateInput.val(dateStringVal);
        dateInput.attr('data-date', oddDateStringVal);
      }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
