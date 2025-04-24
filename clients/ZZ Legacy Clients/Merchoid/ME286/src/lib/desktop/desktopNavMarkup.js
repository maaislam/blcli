/**
 * Markup for mobile nav with all logic
 */

import shared from "../shared";
import { desktopNavLinks } from "../navData";

const { ID } = shared;

export default class DesktopNavigation {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

        const links = desktopNavLinks;

        const element = document.createElement('div');
        element.classList.add(`${ID}_navigationWrapper`);
        element.innerHTML = `
            <ul class="${ID}_navLinks ${ID}_navLvl1"></ul>
        `;

        this.component = element;

        // loop through nav links
        Object.keys(links).forEach((i) => {
            const data = links[i];
            const level1Link = document.createElement('li');
            level1Link.classList.add(`${ID}_navLink`);
            if(data.navLink) {
                level1Link.innerHTML = `
                <a href="${data.navLink}">
                <div class="${ID}_linktext">
                    <span>${[i][0]}</span>
                </div>
                </a>`;

            } else {
                level1Link.innerHTML = `
                <div class="${ID}_linktext">
                    <span>${[i][0]}</span>
                </div>
                ${data.secondLevel ? `
                <div class="${ID}_navLvl2">
                    <div class="${ID}_dropdown">
                        <div class="${ID}_lvl2Links"></div>
                    </div>
                </div>` : ''}`;
            }
            
            

            if([i][0] === 'Brands') {
                level1Link.classList.add(`${ID}_brands`);
            }

            if([i][0] === 'Categories') {
                level1Link.classList.add(`${ID}_allCategories`);
            }

             if([i][0] === 'Help') {
                level1Link.classList.add(`${ID}_help`);
            }

            // add second level
            if(data.secondLevel) {
                level1Link.classList.add(`${ID}_category`);
                Object.keys(data.secondLevel).forEach((x) => {
                    const lvl2El = data.secondLevel[x];
                    const level2Link = document.createElement('li');
                    level2Link.classList.add(`${ID}_navSecondLink`);
                   
                    if([i][0] === 'Categories') {
                        level2Link.innerHTML = `
                        <a href="${lvl2El.secondlink}">
                            <div class="${ID}_icon" style="background-image:url(${lvl2El.icon})"></div>
                            <span>${[x][0]}</span>
                        </a>`;
                    } else {
                        level2Link.innerHTML = `
                        <a href="${lvl2El.secondlink}">
                            <div class="${ID}_icon" style="background-image:url(${lvl2El.icon})"></div>
                            <span>${[x][0]}</span>
                       </a>`;
                    } 
                    level1Link.querySelector(`.${ID}_lvl2Links`).appendChild(level2Link); 
                });

                if([i][0] === 'Brands') {
                    level1Link.querySelector(`.${ID}_lvl2Links`).insertAdjacentHTML('afterbegin', `<h3>Most Popular Brands</h3>`);
                }
            }

            element.querySelector(`.${ID}_navLinks`).appendChild(level1Link);
            
            
        });
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector(`.${ID}_headerContent .${ID}_navigation`).appendChild(component);
    }
  }