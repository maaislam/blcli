import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { trendingSearches } from "../data";
import { closeNav, hideSearch } from "./helpers";

const { ID } = shared;

export default class Search {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-search`);
      element.innerHTML = `
        <div class="${ID}-searchbar">
            <div class="${ID}-logo"></div>
            <div class="${ID}-searchBox"></div>
            <div class="${ID}-seeSimilar"></div>
            <div class="${ID}-close"></div>
        </div>
        <div class="${ID}-trending">
          <div class="${ID}-container">
            <h3 class="headerThree">Trending searches</h3>
            <div class="${ID}-trends"></div>
          </div>
        </div>
        <div class="${ID}-results"></div>
      `;
      this.component = element;

      // add trending
      const trendData = trendingSearches;
      trendData.forEach(trend => {
        const trendEl = document.createElement('div');
        trendEl.classList.add(`${ID}-trendBlock`);
        trendEl.innerHTML = `
        <a href="${trend.link}"></a>
        <div class="${ID}-image" style="background-image:url(${trend.image})"></div>
        <p class="normalText">${trend.text}</p>`;

        element.querySelector(`.${ID}-trending .${ID}-trends`).appendChild(trendEl);
      });


      const search = document.querySelector('.site-search');
      element.querySelector(`.${ID}-searchBox`).appendChild(search);

     
      search.shadowRoot.querySelector('form').addEventListener('submit', () => {
        const value = search.shadowRoot.querySelector('input').value;
        fireEvent('searched '+value);
      });

      // change styling of search
      var style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = `
        .c-search { border: 2px solid #9E9E9E; }
        .c-search .c-syte {
          display: none;
        }
        form {
          padding-left: 10px;
          padding-right: 10px;
        }
        .c-search__btn { 
          height: 24px;
          width: 24px;
          background: url('https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/0072c84c-e7f7-11ec-af35-4e1187544fc7') no-repeat center;
          background-size: contain;
        }
        .c-search-section__heading {
          font-size: 14px;
          color: #101820;
        }
        .c-search__btn svg { display: none; } 
        .c-site-search__clear-history { display: none; }
        .c-site-search__recent-searches { display : none; }

        .c-site-search__drop-down {
          background: #f6f6f4;
          box-sizing: border-box;
          max-width: 100%;
          top: 100%;
          position: absolute;
          width: 100%;
          margin-top: 20px;
          height: calc(100vh - 145px);
          padding: 0px;
          z-index: 999;
        }

        @media(min-width: 568px) {
          .c-site-search__drop-down {
            height: calc(100vh - 135px);
          }
        }
        .c-site-search__close-btn {
          display: none;
        }

        .c-search-section {
          padding: 10px;
        }
        .c-site-search__section-container>div>section {
          margin-bottom: 0px;
        }

        @media(min-width: 568px) {
          .c-site-search__section-container {
            overflow-y: auto;
          }
        }

        @media(min-width: 767px) {
          .c-site-search__section-container {
            display:flex;
            flex-direction: row;
            align-items: flex-start;
          }
        }
        .c-search-section__content li a {
          color: #484849;
          font-size: 14px;
        }

        .c-site-search__products {
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          flex-direction: row;
          justify-content: flex-start;
          padding-bottom: 10px;
          flex-wrap: nowrap;
          gap: 10px;
          padding: 10px;
          align-items: stretch;
        }

        @media(min-width: 568px) {
          .c-site-search__drop-down--product-column .c-site-search__products {
            overflow: visible;
            flex-wrap: wrap;
            padding: 10px;
          }
        }

        .c-site-search__products .c-search-product-card {
          flex-shrink: 0;
          padding: 10px;
          background: white;
          box-sizing: border-box;
          width: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          grid-gap: unset;
          border: 0px;
        }

        @media(min-width: 568px) {
          .c-site-search__products .c-search-product-card {
            width: 32%;
            flex-shrink: 0;
          }
        }

        .c-site-search__products .c-search-product-card .c-search-product-card__name {
          font-size: 16px;
          color: #101820;
          font-family: Oxygen, Arial, Helvetica, sans-serif;
          line-height: 23px;
          display: block;
        }
        .c-site-search__products .c-search-product-card .c-product__per-month {
          display: none;
        }
        .c-search-product-card__image {
          grid-row: unset;
          margin-right: 0;
          height: 100%;
          width: 115px;
        }
        .c-site-search__products .c-search-product-card .c-product__price {
          font-size: 16px;
          font-weight: 500;
          color: #484849;
        }

        @media(min-width: 1024px) {
          .c-search {
            padding: 10px 10px;
            height: 50px;
            box-sizing: border-box;
          }
          .search-container {
            position: unset;
          }
          .c-site-search__drop-down {
            min-height: 400px;
            height: auto;
            left: 0;
            transform: translate(0);
            justify-content: flex-start;
          }
          .c-site-search__section-container {
            justify-content: center;
          }
          .c-site-search__drop-down--product-column .c-site-search__products {
            flex-grow: 1;
            border: 0px;
            justify-content: center;
          }
          .c-site-search__products .c-search-product-card {
            flex-shrink: 0;
            width: auto;
            max-width: 32%;
          }
          .c-search-section__heading {
            font-size: 18px;
          }
          .c-search-section__content li {
            margin-bottom: 10px;
          }
          .c-search-section__content li a {
            font-size: 16px 
          }
          .c-search-product-card__image {
            width: 100%;
          }
          .c-site-search__products .c-search-product-card .c-product__price {
            border: 0px;
            margin-top: 0px;
          }
          .c-site-search__products .c-search-product-card .c-product__price {
            font-size: 18px
          }
          .--syte-start-camera-upload.c-syte.c-site-search__syte-container {
            display:none;
          }
        }
        `;
      search.shadowRoot.appendChild(style)

      
    }
  
    bindEvents() {
      const { component } = this;


      const overlay = document.querySelector(`.${ID}-searchoverlay`);

      const showSearch = () => {

        document.documentElement.classList.add(`${ID}-noScroll`);
        component.classList.add(`${ID}-open`);
        component.classList.remove(`${ID}-closed`);
        overlay.classList.add(`${ID}-visible`);
      }


      const allSearchToggles = document.querySelectorAll(`.${ID}-searchToggle`);
      for (let index = 0; index < allSearchToggles.length; index += 1) {
        const element = allSearchToggles[index];
        element.addEventListener('click', () => {
          fireEvent('Clicked search');
          showSearch();
          closeNav();
        });
      }

      const allTrending = component.querySelectorAll(`.${ID}-trending .${ID}-trend`);
      for (let index = 0; index < allTrending.length; index++) {
        const element = allTrending[index];
        element.addEventListener('click', () => {
          fireEvent('Clicked trending search');
        });
      }
    

      component.querySelector(`.${ID}-close`).addEventListener('click', () => {
        hideSearch();
      });
      overlay.addEventListener('click', () => {
        hideSearch();
      });


      // // if input empty - hide search
      const searchEl = component.querySelector(`.${ID}-searchBox .site-search`).shadowRoot;
      const input = searchEl.querySelector('#labelledby-site-search');
      input.addEventListener('keyup', () => {
        if(input.value === '') {
          searchEl.querySelector('.c-site-search__drop-down').classList.remove('c-site-search__drop-down--open');
        }
      });

      input.addEventListener('click', () => {
        fireEvent('clicked search box');
      });

      const seeSimilar = component.querySelector(`.${ID}-seeSimilar`);
      seeSimilar.addEventListener('click', () => {
        component.querySelector(`.${ID}-searchBox .site-search`).shadowRoot.querySelector('.--syte-start-camera-upload.c-syte.syte').click();
        hideSearch();
      });

    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);     
    }
  }
