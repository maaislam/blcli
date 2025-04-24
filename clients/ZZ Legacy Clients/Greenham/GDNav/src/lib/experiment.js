/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import data from './data';
import shared from './shared';

/**
 * HTML for a 2nd+ level data object
 */
const getMenuHtml = (data) => {
  if(!data || data.length == 0) {
    return '';
  }

  let html = `<ul class="${shared.ID}-submenu__list">`;

  data.forEach((d) => {
    html += '<li>';
    html += `<a class="${shared.ID}-title" href="${d.link}">${d.name}</a>`;

    html += '<ul>';
    d.sublinks.forEach((c) => {
      html += '<li>';
      html += `<a href="${c.link}">${c.name}</a>`;
      html += '</li>';
    });
    html += '</ul>';

    html += '</li>';
  });

  html += '</ul>';

  return html;
};

/**
 * Render
 */
const render = (data, target) => {
  const megamenuArea = target.querySelector('.Lb_div > ul.Lb > li.Lb');
  if(megamenuArea) {
    const menuHtml = getMenuHtml(data);

    megamenuArea.innerHTML = `<div class="${shared.ID}-submenu">` + menuHtml + '</div>';
  }
}

/**
 * Default
 */
export default () => {
  setup();

  // -------------------------
  // Write experiment code here
  // -------------------------
  const ppeData = data['PPE'];
  const cleaningData = data['CLEANING'];
  const contractorData = data['CONTRACTOR'];

  // -------------------------
  // Render
  // -------------------------
  const nav = document.querySelector('#nav_main');
  if(nav) {
    const navLevels = nav.querySelectorAll('ul > li.La');

    // -------------------------
    // PPE Nav
    // -------------------------
    if(navLevels[1]) {
      render(ppeData, navLevels[1]);
    }
    
    // -------------------------
    // Cleaning Nav
    // -------------------------
    if(navLevels[2]) {
      render(cleaningData, navLevels[2]);
    }

    // -------------------------
    // Contractor Nav
    // -------------------------
    if(navLevels[3]) {
      render(contractorData, navLevels[3]);
    }
  }
  
};
