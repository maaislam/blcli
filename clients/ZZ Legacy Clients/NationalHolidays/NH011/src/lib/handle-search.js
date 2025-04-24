import * as UC from '../../../../../lib/uc-lib';
import * as utils from '../../../../../lib/utils';
import chooseDepartureHtml from './html/choose-departure';

/**
 * Handle search 
 *
 * There is code on the site referencing global variables
 * and functions so we override those to ensure that any
 * other references still work but in the context of our
 * redesigned search
 *
 * Much of this code is modified from the code taken on the site, where
 * we build our own custom 'choose your region' here
 */
const handleSearch = (eventSender) => {
    window.searchStarted = !1;

    // Build custom search as the site header search doesn't currently
    // work on the control on pages that aren't the homepage
    $('#Form2').prepend(chooseDepartureHtml);

    // Handle close departure lightbox
    $('.nh11-close').on('click', () => {
        $('.nh11-choose-departure-wrapper').removeClass('nh11-choose-departure-wrapper--active');
    });

    // Handle choosing a location
    $('#btnDeptSelect').click(function(e){
        eventSender.send(null, 'user-did-click-choose-departure-btn');

        if($('#ddlPoint').val() == ''){
            alert("Please select your town");
            return;
        }
        
        $(this).html('Loading...');
        
        var val = 'dep-region=' + $('#ddlRegion').val() + '&dep-point=' + $('#ddlPoint').val();
        
        var payload = {
            postcode: '',
            departureRegionId: $('#ddlRegion').val(),
            departurePointId: $('#ddlPoint').val(),
            multiPointCsv: ''
        };
        
        $.ajax({
            url:'/WebServices/JSONServices.asmx/SetRegionCookie',
            contentType: 'application/json',
            dataType: 'json',
            type:'POST',
            data:JSON.stringify(payload)
        })
        .success(function(data){
            if(searchStarted){
                runHeaderSearch();

                eventSender.send(null, 'did-set-departure-region-cookie-for-future-searches');
            }else{
                window.location.assign("/desktopdefault.aspx/?uk");
            }
        })
        .error(function(data){
            alert("Something went wrong, please try again");
        });
        
        
    });

    /**
     * Header search must check against whether departure location is set in cookies
     *
     * If not, we have to build the search
     */
    window.runHeaderSearch = function() {
        eventSender.send(null, 'did-run-search');

        // Parse departure info from cookie - if not set, the user has
        // not yet chosen a departure point which they need to do..
        var cookie = utils.getCookie('WEBRES_SEARCH');
        var departurePoint = null;
        if(cookie) {
            var departureInfo = {};
            var departureObject = cookie.split('&');
            for(var i = 0; i < departureObject.length; i++) {
                var s = departureObject[i].split('=');
                if(s && s[0] && s[1]) {
                    departureInfo[s[0]] = s[1];
                }
            }

            if(departureInfo && departureInfo['dep-point']) {
                departurePoint = departureInfo['dep-point'];
            }
        }

        window.searchStarted = !0;

        // Validate empty query
        var q = $('#txtHeaderSearch').val();
        if (q == '') {
            alert("Please enter a search query");
            return;
        }

        // Default functionality is to search between tomorrow to tomorrow + 14 days
        var minDate = new Date(+new Date + 86400);
        var maxDate = new Date(+new Date + 15 * 86400);
        var min = `${minDate.getFullYear()}-${('0' + (minDate.getMonth() + 1)).substr(-2)}-${('0' + minDate.getDate()).substr(-2)}`;
        var max = `${maxDate.getFullYear()}-${('0' + (maxDate.getMonth() + 1)).substr(-2)}-${('0' + maxDate.getDate()).substr(-2)}`;

        if (!departurePoint) {
            eventSender.send(null, 'search-no-departure-point-show-lightbox');

            // ----------------------------------
            // Show our popup to select stores
            // ----------------------------------
            const noCookieSelect = $('#noCookieDepSelect');
            noCookieSelect.remove(); // Remove to prevent additional form fields being submitted

            const c = $('.nh11-choose-departure-wrapper');
            c.addClass('nh11-choose-departure-wrapper--active');

            const region = c.find('.filter-item:first select'),
                town = c.find('.filter-item:last select');

            region.on('change', function() {
                const v = $(this).val();
                if(v == 5) {
                    const caledonianTraveller = window.confirm('For all departures from Scotland, visit Caledonian Travel. Do you wish to be taken there now?');
                    if(caledonianTraveller) {
                        window.location = 'http://www.caledoniantravel.com';

                        eventSender.send(null, 'left-search-to-visit-caledonian-travel');
                    } else {
                        region.val('');
                        return;
                    }
                } else if(v > 0) {
                    $.ajax({
                        url: '/WebServices/RegionService.asmx/GetRegionPickupPointsByRegionId',
                        type: 'post',
                        data: JSON.stringify({
                            regionId: parseInt(v, 10)
                        }),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: (data) => {
                            if(data.d) {
                                town.empty().html(`
                                    <option selected value="">Choose a town</option>
                                `);

                                $.each(data.d, (idx, item) => {
                                    town.append(`
                                        <option value="${item.PickupPointId}">${item.PickupPointName}</option>
                                    `);
                                });
                            }
                        }
                    });
                }
            });
        } else {
            eventSender.send(null, 'search-ok-go-to-results-page');

            var url = '/search-results';
            url += '?s=' + q;
            url += '&min=' + min;
            url += '&max=' + max;
            url += '&t3p=' + departurePoint;
            window.location.assign(url)
        }
    }

    $('#btnHeaderSearch').off('click').click(function(e) {
        runHeaderSearch()
        return false;
    });
    $('#txtHeaderSearch').off('keypress').keypress(function(e) {
        if (e.which == 13) {
            runHeaderSearch()
            return false;
        }
    });
};

export default handleSearch;
