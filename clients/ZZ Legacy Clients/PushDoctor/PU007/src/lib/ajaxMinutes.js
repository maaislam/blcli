import { events} from '../../../../../lib/utils';

// Get time to next appointment if minutes element is on page
export default () => {
  /*
   * If minutes ID exists, make request to Push Doctor API and update
   * element to include minutes to appointment
   */
  function ajaxRequest(url, successCb) {
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        if (successCb) {
          successCb(request.responseText);
        }
      }
    };

    request.send();
  }

  const appointmentTimeEl = document.getElementById('PU007_appointmentTime');
  if (appointmentTimeEl) {
    ajaxRequest('https://svcs.pushsvcs.com/general.svc/generalW/GetHomeMessage', (response) => {
      const json = JSON.parse(response);
      const strTop = json.GetHomeMessageResult.strTop;
      const mins = strTop.match(/\d+/);
      let content;
      if (mins) {
        content = `in the next ${mins[0]} minute` + (mins[0] > 1 ? 's' : '');
      } else {
        switch (strTop) {
          case 'Book an appointment today':
          content = 'today';
          break;
          
          case 'We’re open at 6am, book now':
          content = 'from 6am';
          break;

          default:
          /*
           * String response was unexpected. 
           * Change to a generic tagline and report error to GA
           */
          event.send('PU007', 'error', 'Change to generic tagline - AJAX response was unexpected.');
          appointmentTimeEl.innerHTML = 'Why wait? See a doctor online';
          break;
        }
      }
      
      appointmentTimeEl.innerHTML = content;
    });
  }
};