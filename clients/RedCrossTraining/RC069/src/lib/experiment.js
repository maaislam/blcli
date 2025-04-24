/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { setCookie, getCookie, pollerLite, deleteCookie } from '../../../../../lib/utils';

export default () => {
  setup();

  // Write experiment code here
  const formHtml = `
    <form action="/where-we-train/course-search/?location=" method="get" id="form-course-finder RC069-form" novalidate="novalidate" class="RC069-form">
    <h1>Ready to book a <span>course</span>?</h1>
    <p>Book a course with us today and join the hundreds of thousands that train with us every year.</p>
    <div class="course-finder-wrapper">
        <div class="course-finder-fields">

            <div class="course-finder-input course-type-input">
                <label for="productId">Course Type</label>
                <select id="productId" name="productId" type="select" required="" aria-required="true">
                    <option value="" disabled="" selected="">Select course type</option>
                        <option value="226-ct">AED with life support</option>
                        <option value="CT-AE2">Automated external defibrillators (AED)</option>
                        <option value="305-ct">Emergency first aid at work</option>
                        <option value="607-ct">Emergency paediatric first aid</option>
                        <option value="591-ct">Fire marshal training</option>
                        <option value="327-ct">First aid annual skills update</option>
                        <option value="306-ct">First aid at work</option>
                        <option value="308-ct">First aid at work (1 day a week)</option>
                        <option value="307-ct">First aid at work requalification</option>
                        <option value="382-ct">First aid for adult</option>
                        <option value="383-ct">First aid for adult (evenings)</option>
                        <option value="594-ct">First aid for appointed persons</option>
                        <option value="358-ct">First aid for baby and child</option>
                        <option value="359-ct">First aid for baby and child (evenings)</option>
                        <option value="CT-EFS">First aid for sports</option>
                        <option value="CT-BFT">First aid for teachers</option>
                        <option value="CT-MH2">Introduction to moving and handling</option>
                        <option value="713-ct">Leading a resilient team</option>
                        <option value="540-ct">Paediatric first aid</option>
                        <option value="539-ct">Paediatric first aid (2 days in 2 weeks)</option>
                        <option value="CT-SHO">Use of oxygen</option>
                </select>
            </div>
           
            <div class="course-finder-input location-input">
                <label for="location">Enter town or postcode</label>
                <input id="location" name="location" type="text" placeholder="Town or postcode" autocomplete="off" required="" aria-required="true" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfBJREFUWAntVk1OwkAUZkoDKza4Utm61iP0AqyIDXahN2BjwiHYGU+gizap4QDuegWN7lyCbMSlCQjU7yO0TOlAi6GwgJc0fT/fzPfmzet0crmD7HsFBAvQbrcrw+Gw5fu+AfOYvgylJ4TwCoVCs1ardYTruqfj8fgV5OUMSVVT93VdP9dAzpVvm5wJHZFbg2LQ2pEYOlZ/oiDvwNcsFoseY4PBwMCrhaeCJyKWZU37KOJcYdi27QdhcuuBIb073BvTNL8ln4NeeR6NRi/wxZKQcGurQs5oNhqLshzVTMBewW/LMU3TTNlO0ieTiStjYhUIyi6DAp0xbEdgTt+LE0aCKQw24U4llsCs4ZRJrYopB6RwqnpA1YQ5NGFZ1YQ41Z5S8IQQdP5laEBRJcD4Vj5DEsW2gE6s6g3d/YP/g+BDnT7GNi2qCjTwGd6riBzHaaCEd3Js01vwCPIbmWBRx1nwAN/1ov+/drgFWIlfKpVukyYihtgkXNp4mABK+1GtVr+SBhJDbBIubVw+Cd/TDgKO2DPiN3YUo6y/nDCNEIsqTKH1en2tcwA9FKEItyDi3aIh8Gl1sRrVnSDzNFDJT1bAy5xpOYGn5fP5JuL95ZjMIn1ya7j5dPGfv0A5eAnpZUY3n5jXcoec5J67D9q+VuAPM47D3XaSeL4AAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;">
            </div>
        </div>
        <div class="location-search-button">
            <button type="submit" class="cta" data-text="Search" data-filter-text="Search"><span class="icon-menu-arrow" style="background-image: none;"><svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Arrow icon</title><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-281 -169)" fill="#262626"><g transform="translate(0 60)"><g transform="translate(20 91)"><path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" transform="rotate(135 263.071 25.071)"></path></g></g></g></g></svg></span><span>Check Availability</span></button>
        </div>
    </div>
  </form>
  `;

  
  const addHTML = (ref, pos, el) => {
      if (ref && pos && el) {
          ref.insertAdjacentHTML(pos, el);
      }
  };


  const heroComponent = document.querySelector('.content-page-hero');


  if (window.location.href.indexOf('/courses/') > -1) {
    let posit = 'beforeend';
    if (window.location.href == 'https://www.redcrossfirstaidtraining.co.uk/courses/') {
      posit = 'afterend';
    }

    addHTML(heroComponent, posit, formHtml);
  }


  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const todaysDate = () => {
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = month  + '\n'+ day  + ',' + year;

    return output;
  }

  const endDateString = () => { // todays date plus 14 days.
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + 40);
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = month  + '\n'+ day  + ',' + year;

    return output;
  }


  const controls = {
      submit: () => {
        const courseType = document.querySelector('select#productId').value;
        const location = document.querySelector('input#location').value;

        if (!courseType || !location) {
          window.alert('Please fill in the fields.');
          return;
        }

        setCookie('RC069', JSON.stringify({
            courseType,
            location
        }));


        // Delete Submitted Cookie
        deleteCookie('RC069-submittedForm');

        window.location.href = 'https://www.redcrossfirstaidtraining.co.uk/where-we-train/course-search/';
      },
      fetchAndAdd: () => {
          if (getCookie('RC069-submittedForm')) return;

          const origCourseType = document.querySelector('.location-search select#productId');
          
          const cookieObject = JSON.parse(getCookie('RC069'));
        
          console.log({origCourseType});
          console.log({cookieObject})
          origCourseType.value = cookieObject?.courseType;

          const origLocation = document.querySelector('.location-search input#location');
          origLocation.value = cookieObject?.location;


          const startDate = document.querySelector('.location-search #fromdate');
          const endDate = document.querySelector('.location-search #todate');

          startDate.value = todaysDate();
          endDate.value = endDateString();

          setCookie('RC069-submittedForm', true);

          const origSubmit = document.querySelector('.location-search button[type="submit"]');
          origSubmit?.click();

      }
  };


  pollerLite(['.RC069-form'], () => {
      // New form controls
    const addedForm = document.querySelector('.RC069-form');
    console.log({addedForm})
  
    if (addedForm) {
        const addedSubmit = addedForm.querySelector('button[type="submit"]');
        console.log({addedSubmit})
        addedSubmit.addEventListener('click', (e) => {
            console.log('click')
            e.preventDefault();
            controls.submit();
        });
    }
  });


  pollerLite(['.location-search input#location'], () => {  // Book now page
    controls.fetchAndAdd();
  });

};
