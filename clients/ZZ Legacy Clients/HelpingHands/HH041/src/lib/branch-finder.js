/**
 * This is a modified version of the locSearch function from the /our-locations/ page
 * Changes functionality of the form to redirect to closest branch
 */
export const bindLocSearch = () => {
  const ID = 'HH027';

  const component = document;
  const $ = window.jQuery;
  const $input = $(component).find(`.${ID}_BranchFinder-input`);
  const $form = $(component).find(`.${ID}_BranchFinder-form`);
  const $cta = $(component).find(`.${ID}_BranchFinder-cta`);
  const $error = $(component).find(`.${ID}_BranchFinder-error`);

  const searchHandlers = {
    success: (location) => {
      let latLng;
      const request = { address: `${location}, UK` };
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
                window.location.href = res[index].permalink;
                return false;
              } else {
                // If we get here then there cannot be a branch within 20 miles
              $form.submit();
              }
            });
          } else {
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
};

/**
 * Get Google Maps script URL with API key from /our-locations/
 * @param {Function} cb Callback
 */
export const getGoogleMaps = (cb) => {
  const request = new XMLHttpRequest();
  request.open('GET', '/our-locations/', true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const temp = document.createElement('div');
      temp.innerHTML = request.responseText;
      const script = temp.querySelector('script[src*="https://maps.google.com/maps/api/"]');
      if (script && script.src) {
        window.jQuery.getScript(script.src, cb);
      }
    }
  };

  request.send();
};
