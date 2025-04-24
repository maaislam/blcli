import settings from '../../lib/settings';
import { pollerLite } from '../../../../../../lib/uc-lib';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class BranchFinder {
  constructor() {
    this.create();
    this.bindEvents();
    this.getGoogleMaps();
  }

  /**
   * Create component
   */
  create() {
    const element = document.createElement('div');
    element.innerHTML = `
      <form class="${ID}_BranchFinder-form" id="locations-search" role="search" method="get" action="/locations-results/">
        <div class="row">
          <div class="col-xs-12">
            <div class="${ID}_BranchFinder">
              <input class="${ID}_BranchFinder-input" type="text" placeholder="Enter postcode or town" value="" name="loc" id="s" autocomplete="off">
              <button class="${ID}_BranchFinder-cta" type="submit">Go!</button>
            </div>
            <div class="${ID}_BranchFinder-error" style="display:none;">
              <p>Sorry, we didn’t recognise that location. Please double check the information or <a href="/about-us/contact-us/free-home-care-consultation/ ">contact us.</a></p>
            </div>
          </div>
        </div>
      </form>
    `;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    const input = component.querySelector(`.${ID}_BranchFinder-input`);

    input.addEventListener('click', () => {
      events.send(ID, 'Clicks', 'Postcode Field');
    });

    input.addEventListener('keydown', () => {
      events.send(ID, 'Type', 'Enters information in postcode field', { sendOnce: true });
    });
  }

  /**
   * Get Google Maps script URL with API key from /our-locations/
   */
  getGoogleMaps() {
    const request = new XMLHttpRequest();
    request.open('GET', '/our-locations/', true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('div');
        temp.innerHTML = request.responseText;
        const script = temp.querySelector('script[src*="https://maps.google.com/maps/api/"]');
        if (script && script.src) {
          // Wait for jQuery
          pollerLite([() => !!window.jQuery], () => {
            window.jQuery.getScript(script.src, () => {
              this.bindLocSearch.call(this);
            });
          });
        }
      }
    };

    request.send();
  }

  /**
   * This is a modified version of the locSearch function from the /our-locations/ page
   * Changes functionality of the form to redirect to closest branch
   */
  bindLocSearch() {
    const { component } = this;
    const $ = window.jQuery;
    const $input = $(component).find(`.${ID}_BranchFinder-input`);
    const $form = $(component).find(`.${ID}_BranchFinder-form`);
    const $cta = $(component).find(`.${ID}_BranchFinder-cta`);
    const $error = $(component).find(`.${ID}_BranchFinder-error`);

    const searchHandlers = {
      success: (location) => {
        let latLng;
        const request = { address: location };
        const google = window.google || {};
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(request, (response, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            latLng = response[0].geometry.location;
          } else {
            $form.animate({
              backgroundColor: '#8685aa',
              color: '#fff',
            }, 1000).addClass('err');
            $error.slideDown();
            events.send(ID, 'Error', 'Error exists with postcode');
            return;
          }

          const data = {
            action: 'store_search',
            lat: latLng.lat(),
            lng: latLng.lng(),
            max_results: 100,
            radius: 75,
          };

          // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
          // Would normally redirect to retrieved result, res[index] contains relavent information
          // In JSON format, such as branch address and phone number
          $.get('/wp-admin/admin-ajax.php', data, (res) => {
            if (res.length > 0) {
              // There are locations inside 75 miles
              $.each(res, (index) => {
                if (res[index].distance <= 20 && res[index].region !== 1) {
                  // console.log(res[index].distance + " and " +res[index].permalink);
                  console.log(res[index]);
                  // console.log(res[index].permalink);
                  events.send(ID, 'Clicks', 'Search in postcode field');
                  window.location.href = res[index].permalink;
                  return false;
                }
                // If we get here then there cannot be a branch within 20 miles
                events.send(ID, 'Clicks', 'Search in postcode field');
                $form.submit();
              });
            } else {
              events.send(ID, 'Clicks', 'Search in postcode field');
              $form.submit();
            }
          });
        });
      },
      error: () => {
        alert('please enter a postcode or town');
        $input.animate({
          backgroundColor: '#8685aa',
          color: '#fff',
        }, 1000).addClass('err');
        events.send(ID, 'Error', 'No postcode entered');
      },
    };

    $cta[0].addEventListener('click', (e) => {
      e.preventDefault();
      $error.slideUp();
      const location = $input[0].value;
      if (!location) {
        searchHandlers.error();
      } else {
        searchHandlers.success(location);
      }
    });
  }
}
