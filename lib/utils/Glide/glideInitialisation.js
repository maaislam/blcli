/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';
import Glide from '@glidejs/glide';

/** ******************************
 ***** Glide Initialisation Start *****
 ****************************** */

export const generateBulletsAndMountGlide = (parentElement, config) => {
  const bullet = document.querySelectorAll(`${parentElement} .glide__bullet`);
  const bulletCount = document.querySelectorAll(`${parentElement} .glide__slide`).length;
  const bulletWrapper = document.querySelector(`${parentElement} .glide__bullets`);
  let newConfig = {};
  if (bullet.length === 0) {
    for (let index = 0; index < bulletCount; index++) {
      const button = document.createElement('button');
      button.className = 'glide__bullet';
      button.setAttribute('data-glide-dir', `=${index}`);

      bulletWrapper.appendChild(button);
    }
    if (config) {
      newConfig = config;
    } else {
      newConfig = {
        type: 'slider',
        startAt: 0,
        perView: 1,
        gap: 20,
        peek: {
          before: 20,
          after: 40,
        },
        classes: {
          bullets: 'glide__bullets',
          bullet: 'glide__bullet',
        },
      };
    }

    new Glide(`${parentElement} .glide`, newConfig).mount();
  }
};
  /** ******************************
 ***** Glide Initialisation End *****
 ****************************** */
