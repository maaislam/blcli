/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { elementIsInView, logMessage } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

let data = { 
  "Breakfast": { 
    logoSvg: "%3Csvg fill='%23000000' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='796 796 200 200' enable-background='new 796 796 200 200' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M886.471,796.396c-4.926,0-8.917,3.993-8.917,8.919v7.085v39.987c0,3.571-2.896,6.465-6.464,6.465 c-3.57,0-6.465-2.894-6.465-6.465v-45.525v-1.547c0-4.926-3.993-8.919-8.917-8.919c-4.928,0-8.92,3.993-8.92,8.919v1.547v45.525 c0,3.57-2.895,6.464-6.463,6.464c-3.57,0-6.465-2.894-6.465-6.464v-39.987v-7.085c0-4.926-3.992-8.919-8.917-8.919 c-4.927,0-8.919,3.993-8.919,8.919v44.863v10.804c0,14.122,7.382,26.515,18.495,33.546c1.73,1.096,2.777,3.002,2.777,5.049v77.617 c0,10.168,8.242,18.411,18.413,18.411c10.167,0,18.409-8.243,18.409-18.411v-77.617c0-2.044,1.05-3.954,2.778-5.048 c11.112-7.031,18.494-19.424,18.494-33.547v-10.804v-44.863C895.389,800.389,891.397,796.396,886.471,796.396z'/%3E%3Cpath d='M957.564,796.638v-0.002c-31.153,0-45.631,29.991-45.631,59.313c0,6.531,0,50.561,0,69.684 c0,4.879,3.954,8.834,8.835,8.834h18.383v42.727c0,10.168,8.241,18.411,18.413,18.411c10.167,0,18.411-8.243,18.411-18.411V815.049 C975.976,804.881,967.731,796.638,957.564,796.638z'/%3E%3C/g%3E%3C/svg%3E", 
    logoImageDesktop: "https://media.travelodge.co.uk/image/upload/c_fill,g_center,h_250,w_400/extras/BreakfastImage_RT.jpg",
    logoImageMobile: "https://media.travelodge.co.uk/image/upload/c_fill,g_center,h_100,w_400/extras/BreakfastImage_RT.jpg",
    logoImageToGoDesktop: "https://media.travelodge.co.uk/image/upload/c_crop,g_north_east,h_200,w_200,x_20,y_20/extras/22081200_F_B_Autumn_Refresh_2023_Pre_Stay_email_1000x560_DR1_Breakfast_to_go__3_1.webp",
    logoImageToGoMobile: "https://media.travelodge.co.uk/image/upload/c_crop,g_north_east,h_200,w_200,x_20,y_20/extras/22081200_F_B_Autumn_Refresh_2023_Pre_Stay_email_1000x560_DR1_Breakfast_to_go__3_1.webp",
    description: "<p>Wake up to our unlimited breakfast with <strong>delicious hot and cold options and freshly ground Lavazza coffee!</strong></p><p>Now with an even bigger range including favourites like full cooked breakfast, American pancakes, bagels, all butter croissants, fresh fruit plus lots more.</p><p>View <a href='http://travelodge.wpengine.com/wp-content/uploads/2022/10/22081200_F_B-Autumn-Refresh-2022_Breakfast-Menu_web.pdf'>breakfast menu</a> and <a href='http://travelodge.wpengine.com/wp-content/uploads/2023/03/Breakfast-Allergy-Chart-UK-V29-March-2023.pdf'>allergen chart</a>.</p>",
    buttonText: "Add Breakfast",
    extraType: "expanded",
  }, 
  "Wifi": { 
    logoSvg: "%3Csvg fill='%23000000' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Ewifi%3C/title%3E%3Cpath d='M18.091 21.12c-1.155-1.155-3.027-1.155-4.182 0s-1.155 3.027 0 4.182c1.155 1.155 3.027 1.155 4.182 0s1.155-3.027 0-4.182zM26.106 17.287l-2.962 2.962c-3.945-3.945-10.342-3.945-14.287 0l-2.962-2.962c5.581-5.581 14.63-5.581 20.211 0v0zM28.196 15.196c-6.736-6.736-17.657-6.736-24.393 0l-3.049-3.049c8.42-8.42 22.071-8.42 30.491 0l-3.049 3.049z'%3E%3C/path%3E%3C/svg%3E", 
    logoImageDesktop: "https://media.travelodge.co.uk/image/upload/extras/wifi.webp",
    logoImageMobile: "https://media.travelodge.co.uk/image/upload/extras/wifi-mobile.webp",
    description: "Save time at the hotel by pre-paying for our best ever WiFi.",
    buttonText: "Add WiFi",
    extraType: "expanded",

  }, 
  "Dinner": { 
    logoSvg: "%3Csvg fill='%23000000' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='796 796 200 200' enable-background='new 796 796 200 200' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M886.471,796.396c-4.926,0-8.917,3.993-8.917,8.919v7.085v39.987c0,3.571-2.896,6.465-6.464,6.465 c-3.57,0-6.465-2.894-6.465-6.465v-45.525v-1.547c0-4.926-3.993-8.919-8.917-8.919c-4.928,0-8.92,3.993-8.92,8.919v1.547v45.525 c0,3.57-2.895,6.464-6.463,6.464c-3.57,0-6.465-2.894-6.465-6.464v-39.987v-7.085c0-4.926-3.992-8.919-8.917-8.919 c-4.927,0-8.919,3.993-8.919,8.919v44.863v10.804c0,14.122,7.382,26.515,18.495,33.546c1.73,1.096,2.777,3.002,2.777,5.049v77.617 c0,10.168,8.242,18.411,18.413,18.411c10.167,0,18.409-8.243,18.409-18.411v-77.617c0-2.044,1.05-3.954,2.778-5.048 c11.112-7.031,18.494-19.424,18.494-33.547v-10.804v-44.863C895.389,800.389,891.397,796.396,886.471,796.396z'/%3E%3Cpath d='M957.564,796.638v-0.002c-31.153,0-45.631,29.991-45.631,59.313c0,6.531,0,50.561,0,69.684 c0,4.879,3.954,8.834,8.835,8.834h18.383v42.727c0,10.168,8.241,18.411,18.413,18.411c10.167,0,18.411-8.243,18.411-18.411V815.049 C975.976,804.881,967.731,796.638,957.564,796.638z'/%3E%3C/g%3E%3C/svg%3E", 
    logoImageDesktop: "https://media.travelodge.co.uk/image/upload/c_fill,h_250,w_400/extras/23032900_FB-Spring-Refresh-2023_Digital-Assets_Restaurants-page_300x224-2_1.jpg",
    logoImageMobile: "https://media.travelodge.co.uk/image/upload/c_fill,h_100,w_400/extras/23032900_FB-Spring-Refresh-2023_Digital-Assets_Restaurants-page_300x224-2_1.jpg",
    description: "Our dinner menu offers a range of delicious meals. Plus a great value meal deal for kids.",
    buttonText: "Add Dinner",
    extraType: "expanded",
  }, 
  "Early In": { 
    logoSvg: "%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13 11.5858V6Z' fill='%23000000'/%3E%3C/svg%3E", 
    logoImageDesktop: "https://media.travelodge.co.uk/image/upload/extras/earlycheckin.webp",
    logoImageMobile: "https://media.travelodge.co.uk/image/upload/extras/earlycheckin-mobile.webp",
    description: "Check in before 3pm",
    buttonText: "Check in early",
    extraType: "simple",
  }, 
  "Late Check Out": { 
    logoSvg: "%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13 11.5858V6Z' fill='%23000000'/%3E%3C/svg%3E", 
    logoImageDesktop: "https://media.travelodge.co.uk/image/upload/extras/latecheckout.webp",
    logoImageMobile: "https://media.travelodge.co.uk/image/upload/extras/latecheckout-mobile.webp",
    description: "Keep your room until 2pm",
    buttonText: "Check out late",
    extraType: "simple",
  }, 
  "Pets": { 
    logoSvg: "%3Csvg fill='%23000000' viewBox='0 -1 26 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m12.189 5.376v.031c0 .624-.109 1.223-.308 1.779l.012-.037c-.209.576-.546 1.063-.98 1.442l-.004.003c-.421.379-.981.61-1.595.61-.016 0-.032 0-.048 0h.002c-.843-.006-1.605-.348-2.16-.899-.624-.574-1.114-1.282-1.427-2.079l-.013-.038c-.287-.698-.458-1.507-.469-2.355v-.004c0-.009 0-.02 0-.031 0-.624.109-1.223.308-1.779l-.012.037c.209-.576.546-1.063.98-1.442l.004-.003c.421-.379.982-.611 1.596-.611.018 0 .036 0 .054.001h-.003c.843.005 1.606.347 2.16.899.617.573 1.104 1.279 1.416 2.071l.013.038c.289.7.46 1.513.469 2.364v.003zm-5.345 7.548c.001.025.001.054.001.084 0 .782-.246 1.506-.665 2.1l.008-.012c-.393.561-1.037.924-1.765.924-.033 0-.066-.001-.099-.002h.005c-.853-.011-1.628-.338-2.214-.87l.003.003c-1.264-1.089-2.073-2.677-2.117-4.454v-.008c-.001-.024-.001-.053-.001-.082 0-.785.246-1.513.665-2.11l-.008.012c.391-.566 1.036-.932 1.767-.932.032 0 .065.001.097.002h-.005c.853.011 1.628.338 2.214.87l-.003-.003c1.266 1.095 2.074 2.689 2.117 4.473v.007zm6.161-.422c1.521.087 2.896.646 3.998 1.531l-.014-.011c1.419 1.013 2.608 2.242 3.547 3.652l.032.051c.824 1.103 1.351 2.471 1.439 3.957l.001.02c.001.026.002.057.002.087 0 .404-.099.786-.274 1.121l.006-.013c-.172.311-.432.554-.748.699l-.01.004c-.291.139-.63.248-.984.309l-.024.003c-.336.055-.722.086-1.116.086-.025 0-.05 0-.075 0h.004c-1.074-.074-2.071-.326-2.988-.726l.058.023c-.835-.37-1.804-.621-2.82-.701l-.031-.002c-1.103.082-2.125.33-3.075.719l.067-.024c-.921.377-1.989.626-3.105.694l-.028.001q-2.866.002-2.866-2.279c.048-1.109.367-2.134.892-3.022l-.017.03c.617-1.149 1.341-2.138 2.184-3.012l-.004.004c.845-.881 1.808-1.639 2.868-2.249l.062-.033c.859-.54 1.893-.877 3.003-.921h.012zm3.735-3.297c-.014 0-.03 0-.046 0-.614 0-1.174-.232-1.597-.612l.002.002c-.438-.383-.776-.869-.976-1.422l-.008-.024c-.188-.519-.297-1.118-.297-1.742 0-.011 0-.022 0-.033v.002c.009-.855.18-1.667.485-2.411l-.016.044c.326-.831.812-1.536 1.426-2.106l.004-.003c.554-.551 1.317-.893 2.159-.898h.001.046c.614 0 1.174.232 1.597.612l-.002-.002c.438.383.776.869.976 1.422l.008.024c.191.522.301 1.125.301 1.753v.02-.001c-.01.852-.182 1.662-.485 2.403l.016-.044c-.326.835-.816 1.543-1.436 2.113l-.004.004c-.555.549-1.317.891-2.159.896h-.001zm6.75-1.624c.028-.001.06-.002.092-.002.731 0 1.376.366 1.762.925l.005.007c.411.586.657 1.313.657 2.099 0 .029 0 .057-.001.086v-.004c-.044 1.785-.853 3.373-2.109 4.454l-.008.007c-.583.529-1.358.856-2.209.867h-.002c-.028.001-.061.002-.094.002-.728 0-1.372-.362-1.76-.917l-.005-.007c-.411-.582-.657-1.307-.657-2.088 0-.029 0-.059.001-.088v.004c.043-1.791.851-3.385 2.109-4.474l.008-.007c.583-.527 1.356-.854 2.205-.865h.002z'/%3E%3C/svg%3E", 
    logoImageDesktop: "https://media.travelodge.co.uk/image/upload/extras/pet.webp",
    logoImageMobile: "https://media.travelodge.co.uk/image/upload/extras/pet-mobile.webp",
    description: "We’re pet friendly! Assistance dogs are exempt from this charge.",
    buttonText: "Add a pet",
    extraType: "simple",
  } 
};

const startExperiment = () => {

  let currNumRooms = window.globalDataLayer.roomCodePerRoom.split(';').length;
  let multipleRooms = currNumRooms > 1 ? true : false;

  // Add fake continue button



  // Modify all current panels

  let allCurrPanels = document.querySelectorAll('.panel');
  [].slice.call(allCurrPanels).forEach(function (panel) {

    let currPricePoint = panel.querySelector('.eachPrice').innerText;
    let currPanelName = panel.querySelector('.panel-title').innerText;
    let currPricePointText = ``;

    if(currPanelName == "Breakfast") {
      currPricePointText = `${currPricePoint} per adult per day`;
    } else if(currPanelName == "Wifi") {
      currPricePointText = `£3 per room for 24 hours`;
    } else if(currPanelName == "Early In") {
      currPricePointText = `£10 per room`;
    } else if(currPanelName == "Late Check Out") {
      currPricePointText = `£10 per room`;
    } else if(currPanelName == "Dinner") {
      currPricePointText = `${currPricePoint} per adult/night`;
    } else if(currPanelName == "Pets") {
      currPricePointText = `£20 per pet`;
    }
    
    panel.querySelector('.panel-collapse').setAttribute('data-panel-type', currPanelName);

    let imageToUse = window.outerWidth > 650 ? data[currPanelName].logoImageDesktop : data[currPanelName].logoImageMobile;

    let breakfastType = "unlimited";
    if(currPanelName == "Breakfast" && document.getElementById(`collapseExtra-breakfast`).querySelector('.extrasTitleBlock').innerText.toLowerCase().indexOf('breakfast to go') > -1) {
      breakfastType = "togo";
      imageToUse = window.outerWidth > 650 ? data[currPanelName].logoImageToGoDesktop : data[currPanelName].logoImageToGoMobile;
    }
    panel.classList.add(`${ID}-panelholder`);
    panel.closest('.panel').setAttribute('data-panel-type', currPanelName.toLowerCase().replaceAll(' ', ''));
    panel.querySelector('.panel-heading').remove();
    panel.insertAdjacentHTML('afterbegin', `
    
      <div class="${ID}-panel ${data[currPanelName].extraType == "simple" ? `${ID}-panel--simple` : `${ID}-panel--extended`}">
        <div class="${ID}-panel--icon">
          ${VARIATION == 1 ? `${decodeURIComponent(data[currPanelName].logoSvg)}` : `<img class="${breakfastType == "togo" && currPanelName == "Breakfast" ? `${ID}-breakfasttogo` : `${ID}-unlimitedbreakfast`}" src="${imageToUse}" alt="${currPanelName} image">`}
        </div>
        <div class="${ID}-panel--description">
        
          <h2>${currPanelName}</h2>
          <h3>${currPricePointText}</h3>
          <div class="${ID}-panel--descriptiontext">${data[currPanelName].description}</div>


        </div>
        <div class="${ID}-panel--button">
          <button data-type="${currPanelName.replaceAll(' ', '').toLowerCase()}" class="${ID}-button ${ID}-button--${currPanelName.replaceAll(' ', '').toLowerCase()}">${data[currPanelName].buttonText}</button>
          <div class="${ID}-success">
            <div class="${ID}-success--icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#408D89"/>
              </svg>
            </div>
            <div class="${ID}-success--modify">
              <button class="${ID}-success--modifybutton">Modify</button>
            </div>
          
          </div>
        </div>
      </div>
    
    `);

  });

  // Update all Panels with new information

  let allCurrPanelInners = document.querySelectorAll(`.${ID}-panelholder .panel-collapse`);
  [].slice.call(allCurrPanelInners).forEach(function (panel) {

    panel.insertAdjacentHTML('beforeend', `<button class="${ID}-extras--close"><svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Menu / Close_MD"><path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></button>`);
    let currPanelName = panel.getAttribute('data-panel-type');
    panel.insertAdjacentHTML('afterbegin', `<div class="${ID}-panel--icon">${VARIATION == 1 ? `${decodeURIComponent(data[currPanelName].logoSvg)}` : `<img src="${window.outerWidth > 650 ? data[currPanelName].logoImageDesktop : data[currPanelName].logoImageMobile}" alt="${currPanelName}">`}</div>`);
    if(currPanelName == "Breakfast" || currPanelName == "Dinner" || currPanelName == "Wifi") {
      panel.closest(`.${ID}-panelholder`).querySelector(`.${ID}-panel--descriptiontext`).innerHTML = '';
      let allPanelPs = panel.querySelectorAll('.panel-body > p');
      [].slice.call(allPanelPs).forEach((p) => {
        if(!p.innerText.includes(`&nbsp`) || p.innerText !== "") {
          panel.closest(`.${ID}-panelholder`).querySelector(`.${ID}-panel--descriptiontext`).insertAdjacentHTML('beforeend', `<p>${p.innerHTML}</p>`);
        }
        
      });

      let currExtraH2 = panel.querySelector('.extrasTitleBlock').innerText;
      panel.closest(`.${ID}-panelholder`).querySelector(`.${ID}-panel--description h2`).insertAdjacentHTML('afterend', `<p class="${ID}-panel--descriptionblock">${currExtraH2}</p>`);

    }




  });

  // Set up event listeners for all buttons

  let allSubmitButtons = document.querySelectorAll('.btnSubmit');

  if(document.getElementById('no-breakfast').checked) {
    [].slice.call(allSubmitButtons).forEach((button) => {
      button.value = 'Continue without breakfast';
      button.innerText = "Continue without breakfast";
    });
  } else {
    [].slice.call(allSubmitButtons).forEach((button) => {
      button.value = 'Review booking';
      button.innerText = "Review booking";
    });
  }

  let allCurrButtons = document.querySelectorAll(`.${ID}-button`);
  [].slice.call(allCurrButtons).forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      
      

      if(e.target.getAttribute('data-type') == "breakfast") {
        e.target.closest(`.${ID}-panelholder`).classList.add(`${ID}-extraadded`);
        fireEvent(`Click - user clicked on Add Breakfast`, true);
        [].slice.call(allSubmitButtons).forEach((button) => {
          button.value = 'Review booking';
          button.innerText = "Review booking";
        });
        if(multipleRooms == false) {
          document.getElementById('form_0_breakfast_choice').click();
        } else {
          document.getElementById('breakfast').click();
        }
        

      } else if(e.target.getAttribute('data-type') == "wifi") {
        
        e.target.closest(`.${ID}-panelholder`).classList.add(`${ID}-extraadded`);
        fireEvent(`Click - user clicked on Add Wifi`, true);
        if(multipleRooms == false) {
          document.querySelector('input[name="form[0][wifi][choice]"]').click();
        } else {
          document.getElementById('mixed-wifi').click();
          let allRooms = document.querySelectorAll(`.${ID}-panelholder[data-panel-type="wifi"] .multiRoom .option`);
          [].slice.call(allRooms).forEach((room, iterator) => {
            room.querySelector(`#wifi_${iterator} > .radio:first-of-type > input[type="radio"]`).click();
          });
        }


      } else if(e.target.getAttribute('data-type') == "dinner") {
        e.target.closest(`.${ID}-panelholder`).classList.add(`${ID}-extraadded`);
        fireEvent(`Click - user clicked on Add Dinner`, true)
        if(multipleRooms == false) {
          document.getElementById('form_0_dinner_choice').click();
        } else {
          document.getElementById('dinner').click();
        }

      } else if(e.target.getAttribute('data-type') == "earlyin") {
        e.target.closest(`.${ID}-panelholder`).classList.add(`${ID}-extraadded`);
        fireEvent(`Click - user clicked on Add Early Check-in`, true)
        if(multipleRooms == false) {
          document.getElementById('form_0_earlyIn_choice').click();
        } else {
          document.getElementById('earlyIn').click();
        }

      } else if(e.target.getAttribute('data-type') == "latecheckout") {
        e.target.closest(`.${ID}-panelholder`).classList.add(`${ID}-extraadded`);
        fireEvent(`Click - user clicked on Add Late Check-out`, true)
        if(multipleRooms == false) {
          document.getElementById('form_0_lateOut_choice').click();
        } else {
          document.getElementById('lateOut').click();
        }

      } else if(e.target.getAttribute('data-type') == "pets") {

        e.target.closest(`.${ID}-panelholder`).classList.add(`${ID}-extraadded`);
        fireEvent(`Click - user clicked on Add Pets`, true);
        if(multipleRooms == false) {
          document.querySelector('input[name="form[0][pets][choice]"]').click();
        } else {
          document.getElementById('mixed-pets').click();
          document.querySelector(`.${ID}-panelholder[data-panel-type="pets"] input[name="form[0][pets][choice]"]`).click();
        }
        

      }
      

    });
  });

  // Event listeners for the modify/close buttons

  document.body.addEventListener('click', (e) => {


    if(e.target.closest(`.${ID}-success--modifybutton`) || e.target.classList.contains(`.${ID}-success--modifybutton`)) {
        e.preventDefault();
        e.target.closest(`.${ID}-panelholder`).classList.add(`${ID}-optionsopen`);
        fireEvent(`Click - user has clicked to modify the ${e.target.closest(`.${ID}-panelholder`).getAttribute(`data-panel-type`)} information`, true);

    }

    if(e.target.closest(`.${ID}-extras--close`) || e.target.classList.contains(`.${ID}-extras--close`)) {
        e.preventDefault();
        e.target.closest(`.${ID}-panelholder`).classList.remove(`${ID}-optionsopen`);
        fireEvent(`Click - user has clicked to close the options on the ${e.target.closest(`.${ID}-panelholder`).getAttribute(`data-panel-type`)} panel`);
    }

  });

  // Interval listener to listen for changes to the extras being added

  if(multipleRooms == false) {

    let noBreakfast,
    noDinner,
    noEarlyIn,
    noLateOut,
    noPets,
    noWifi;
    
    

    let interval = setInterval(() => {

      if(document.getElementById('no-breakfast')) {
        noBreakfast = document.getElementById('no-breakfast').checked;
        if(noBreakfast == true && document.querySelector(`.${ID}-panelholder[data-panel-type="breakfast"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="breakfast"]`)?.classList.remove(`${ID}-extraadded`);
          [].slice.call(allSubmitButtons).forEach((button) => {
            button.value = 'Continue without breakfast';
            button.innerText = "Continue without breakfast";
          });
        } else if(noBreakfast == false && !document.querySelector(`.${ID}-panelholder[data-panel-type="breakfast"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="breakfast"]`)?.classList.add(`${ID}-extraadded`);
          [].slice.call(allSubmitButtons).forEach((button) => {
            button.value = 'Review booking';
            button.innerText = "Review booking";
          });
        }
      }
      
      if(document.getElementById('no-dinner')) {
        noDinner = document.getElementById('no-dinner').checked;
        if(noDinner == true && document.querySelector(`.${ID}-panelholder[data-panel-type="dinner"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="dinner"]`)?.classList.remove(`${ID}-extraadded`);
        } else if(noDinner == false && !document.querySelector(`.${ID}-panelholder[data-panel-type="dinner"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="dinner"]`)?.classList.add(`${ID}-extraadded`);
        }
      }
      
      if(document.getElementById('no-earlyIn')) {
        noEarlyIn = document.getElementById('no-earlyIn').checked;
        if(noEarlyIn == true && document.querySelector(`.${ID}-panelholder[data-panel-type="earlyin"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="earlyin"]`)?.classList.remove(`${ID}-extraadded`);
        } else if(noEarlyIn == false && !document.querySelector(`.${ID}-panelholder[data-panel-type="earlyin"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="earlyin"]`)?.classList.add(`${ID}-extraadded`);
        }
      }
      
      if(document.getElementById('no-lateOut')) {
        noLateOut = document.getElementById('no-lateOut').checked;
        if(noLateOut == true && document.querySelector(`.${ID}-panelholder[data-panel-type="latecheckout"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="latecheckout"]`)?.classList.remove(`${ID}-extraadded`);
        } else if(noLateOut == false && !document.querySelector(`.${ID}-panelholder[data-panel-type="latecheckout"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="latecheckout"]`)?.classList.add(`${ID}-extraadded`);
        }
      }
      
      if(document.getElementById('form[0][pets][choice]_placeholder')) {
        noPets = document.getElementById('form[0][pets][choice]_placeholder').checked;
        if(noPets == true && document.querySelector(`.${ID}-panelholder[data-panel-type="pets"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="pets"]`)?.classList.remove(`${ID}-extraadded`);
        } else if(noPets == false && !document.querySelector(`.${ID}-panelholder[data-panel-type="pets"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="pets"]`)?.classList.add(`${ID}-extraadded`);
        }
      }
      
      if(document.getElementById('form[0][wifi][choice]_placeholder')) {
        noWifi = document.getElementById('form[0][wifi][choice]_placeholder').checked;
        if(noWifi == true && document.querySelector(`.${ID}-panelholder[data-panel-type="wifi"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="wifi"]`)?.classList.remove(`${ID}-extraadded`);
        } else if(noWifi == false && !document.querySelector(`.${ID}-panelholder[data-panel-type="wifi"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="wifi"]`)?.classList.add(`${ID}-extraadded`);
        }
      }
      


    }, 20);
    
    

  } else {

    let allBreakfastOptions,
    allDinnerOptions,
    allEarlyInOptions,
    allLateOutOptions,
    allCheckedPetOptions,
    allPetOptions,
    allWifiOptions,
    allCheckedWifiOptions;
    
    let interval = setInterval(() => {

      if(document.getElementById('no-breakfast')) {
        allBreakfastOptions = document.querySelectorAll('input[type=checkbox][data-view="priceCorner-breakfast"]:checked');
        if(allBreakfastOptions.length === 0 && document.querySelector(`.${ID}-panelholder[data-panel-type="breakfast"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="breakfast"]`)?.classList.remove(`${ID}-extraadded`);
          [].slice.call(allSubmitButtons).forEach((button) => {
            button.value = 'Continue without breakfast';
            button.innerText = 'Continue without breakfast';
          });
        } else if(allBreakfastOptions.length > 0 && !document.querySelector(`.${ID}-panelholder[data-panel-type="breakfast"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="breakfast"]`)?.classList.add(`${ID}-extraadded`);
          [].slice.call(allSubmitButtons).forEach((button) => {
            button.value = 'Review booking';
            button.innerText = 'Review booking';
          });
        }
      }
      
      if(document.getElementById('no-dinner')) {
        allDinnerOptions = document.querySelectorAll('input[type=checkbox][data-view="priceCorner-dinner"]:checked');
        if(allDinnerOptions.length === 0 && document.querySelector(`.${ID}-panelholder[data-panel-type="dinner"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="dinner"]`)?.classList.remove(`${ID}-extraadded`);
        } else if(allDinnerOptions.length > 0 && !document.querySelector(`.${ID}-panelholder[data-panel-type="dinner"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="dinner"]`)?.classList.add(`${ID}-extraadded`);
        }
      }
      
      if(document.getElementById('no-earlyIn')) {
        allEarlyInOptions = document.querySelectorAll('input[type=checkbox][data-view="priceCorner-earlyIn"]:checked');
        if(allEarlyInOptions.length === 0 && document.querySelector(`.${ID}-panelholder[data-panel-type="earlyin"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="earlyin"]`)?.classList.remove(`${ID}-extraadded`);
        } else if(allEarlyInOptions.length > 0 && !document.querySelector(`.${ID}-panelholder[data-panel-type="earlyin"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="earlyin"]`)?.classList.add(`${ID}-extraadded`);
        }
      }
      
      if(document.getElementById('no-lateOut')) {
        allLateOutOptions = document.querySelectorAll('input[type=checkbox][data-view="priceCorner-lateOut"]:checked');
        if(allLateOutOptions.length === 0 && document.querySelector(`.${ID}-panelholder[data-panel-type="lateout"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="lateout"]`)?.classList.remove(`${ID}-extraadded`);
        } else if(allLateOutOptions.length > 0 && !document.querySelector(`.${ID}-panelholder[data-panel-type="lateout"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="lateout"]`)?.classList.add(`${ID}-extraadded`);
        }
      }
      
      if(document.querySelector('input.subRadio[type=radio][data-view="priceCorner-pets"][data-price="0"]')) {
        allPetOptions = document.querySelectorAll('input.subRadio[type=radio][data-view="priceCorner-pets"][data-price="0"]');
        allCheckedPetOptions = document.querySelectorAll('input.subRadio[type=radio][data-view="priceCorner-pets"][data-price="0"]:checked');
        if(allPetOptions.length !== allCheckedPetOptions.length && !document.querySelector(`.${ID}-panelholder[data-panel-type="pets"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="pets"]`)?.classList.add(`${ID}-extraadded`);
        } else if(allPetOptions.length === allCheckedPetOptions.length && document.querySelector(`.${ID}-panelholder[data-panel-type="pets"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="pets"]`)?.classList.remove(`${ID}-extraadded`);
        }
      }

      if(document.querySelector('input.subRadio[type=radio][data-view="priceCorner-wifi"][data-price="0"]')) {
        allWifiOptions = document.querySelectorAll('input.subRadio[type=radio][data-view="priceCorner-wifi"][data-price="0"]');
        allCheckedWifiOptions = document.querySelectorAll('input.subRadio[type=radio][data-view="priceCorner-wifi"][data-price="0"]:checked');
        if(allWifiOptions.length !== allCheckedWifiOptions.length && !document.querySelector(`.${ID}-panelholder[data-panel-type="wifi"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="wifi"]`)?.classList.add(`${ID}-extraadded`);
        } else if(allWifiOptions.length === allCheckedWifiOptions.length && document.querySelector(`.${ID}-panelholder[data-panel-type="wifi"]`)?.classList.contains(`${ID}-extraadded`)) {
          document.querySelector(`.${ID}-panelholder[data-panel-type="wifi"]`)?.classList.remove(`${ID}-extraadded`);
        }
      }
      
      
      
    }, 20);

  }

  // Scroll listener for the top green bar
  window.addEventListener('scroll', () => {

    if(window.scrollY > document.querySelector('.miniSearch').offsetTop + 10) {
      document.querySelector('.miniSearch').classList.add(`${ID}-sticky`);
    } else {
      document.querySelector('.miniSearch').classList.remove(`${ID}-sticky`);
    }

    if(window.scrollY > document.querySelector('.miniSearch').offsetTop + 10) {
      document.querySelector('.actions.rightAndFull').classList.add(`${ID}-stickybutton`);
    } 

    if(elementIsInView(document.querySelector('#allTotal'), 0.5)) {
      document.querySelector('.actions.rightAndFull').classList.remove(`${ID}-stickybutton`);
    }

  });

}

const addTracking = () => { 
  document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnSubmit') || e.target.closest('.btnSubmit')) {
      let ctaPosition = e.target.classList.contains('btnSaveExtraSummary') ? `bottom` : `top`;
      let buttonText = ctaPosition === `bottom` ? e.target.innerText : e.target.value;
      fireEvent(`Click - user clicked on the ${ctaPosition} CTA to go to the next page with the text: ${buttonText}`, true);
    } 
  });


}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  
  startExperiment();
  
  
};
