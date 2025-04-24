/**
 * ME279 - Model Shots on PDP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import data from './data';

const { ID, VARIATION } = shared;

const activate = () => {
  setTimeout(() => {
    setup();
    // console.log(`${ID} is running >>>>>`);

    // Write experiment code here
    let mainProductImage = '';
    if (document.querySelectorAll('.fotorama__stage__frame.fotorama__active.fotorama_vertical_ratio.fotorama__loaded.fotorama__loaded--img').length > 1) {
      // alert('1');
      mainProductImage = document.querySelectorAll('.fotorama__stage__frame.fotorama__active.fotorama_vertical_ratio.fotorama__loaded.fotorama__loaded--img')[1];
    } else {
      // alert('2');
      mainProductImage = document.querySelector('.fotorama__stage__frame.fotorama__active.fotorama_horizontal_ratio.fotorama__loaded.fotorama__loaded--img');
      // mainProductImage = document.querySelectorAll('.fotorama__stage__frame.fotorama__active.fotorama_vertical_ratio.fotorama__loaded.fotorama__loaded--img')[0];
    }
    if (mainProductImage) {
      const imageData = mainProductImage.querySelector('img').getAttribute('href');
      mainProductImage.querySelector('img').setAttribute('src', imageData);
    }
    
    // --- GET IMAGE BY GENDER FROM DATA
    const pageID = window.location.pathname.replace('/uk/', '').replace('/', '');
    // alert(pageID);
    let maleImage = '';
    let femaleImage = '';
    if (data[`${pageID}`]) {
      maleImage = data[`${pageID}`].male_model;
      femaleImage = data[`${pageID}`].female_model;
    }
    // console.log('MALE IMAGE: ', maleImage);
    // console.log('FEMALE IMAGE: ', femaleImage);
    pollerLite(['.ME263-gender.ME263-active', '.fotorama__stage__frame.fotorama__active.fotorama_vertical_ratio.fotorama__loaded.fotorama__loaded--img img'], () => {
      mainProductImage.classList.add(`${ID}-defaultImage`);
      // -- DEFAULT IMAGE BY GENDER
      const preSelected = document.querySelector('.ME263-gender.ME263-active');
      // preSelected.setAttribute('style', 'background-color: lightcoral;');
      const selection = preSelected.getAttribute('data-target');

      if (selection == 'female-option') {
        mainProductImage.querySelector('img').src = `${femaleImage}`;
      // --- HIDE first thumbnail
        document.querySelectorAll('.fotorama__nav__frame.fotorama__nav__frame--thumb')[0].classList.add('hide');
        // document.querySelectorAll('.fotorama__nav__frame.fotorama__nav__frame--thumb')[0].setAttribute('style', 'display: none !important;');
      } else {
        mainProductImage.querySelector('img').src = `${maleImage}`;
        // --- HIDE first thumbnail
        document.querySelectorAll('.fotorama__nav__frame.fotorama__nav__frame--thumb')[0].classList.add('hide');
      }
    });

    // --- OBSERVE FOR ANY CHANGES IN GENDER AND SHOW RELEVANT IMAGE
    observer.connect(document.querySelector('.ME263-gender.ME263-her'), () => {
      // console.log('SOMETHING HAS CHANGED [FEMALE]-------');
      if (document.querySelector('.ME263-gender.ME263-her.ME263-active')) {
        mainProductImage.querySelector('img').src = `${femaleImage}`;
        // --- HIDE first thumbnail
        document.querySelectorAll('.fotorama__nav__frame.fotorama__nav__frame--thumb')[0].classList.add('hide');
      } else if (document.querySelector('.ME263-gender.ME263-him.ME263-active')) {
        mainProductImage.querySelector('img').src = `${maleImage}`;
        // --- HIDE first thumbnail
        document.querySelectorAll('.fotorama__nav__frame.fotorama__nav__frame--thumb')[0].classList.add('hide');
      }
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    });
  }, 1500);

  
};


export default activate;