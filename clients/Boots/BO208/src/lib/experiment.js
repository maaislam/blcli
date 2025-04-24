import {setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

export default () => {


  const getData = (url) => {
    return fetch(`https://optimisation-data-projects.nw.r.appspot.com/boots_recs/get_recs?url=${url}`)
    .then(r => r.json())  
  };

  const runExperiment = (data) => {
    if(data.length == 0) {
      return; // bail out
    }
  
    const { ID, VARIATION } = shared;

    setup();

    document.addEventListener("DOMContentLoaded", function () {
      if (sessionStorage.getItem(`${ID}`) !== "Fired") {
        window.cmCreateManualLinkClickTag(
          `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
        );
        sessionStorage.setItem(`${ID}`, "Fired");
      }
    });

    if (window.usabilla_live) {
      window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
    }

    fireEvent("Conditions Met");

    if(VARIATION === 'control'){
      if(window.location.href.match(/.+(BeginIndex:)[\d]{2,}.*/)) {
        fireEvent("Pagination - Conditions Met");
      }
    }

    if(VARIATION !== 'control') {
      
      if(window.location.href.indexOf('search') > -1) {
        document.documentElement.classList.add(`${ID}-search`);
      } else {
        document.documentElement.classList.add(`${ID}-plp`);
      }

      // Run test
      const recdata = data.recs;

      const listItems = document.querySelectorAll(".grid_mode.grid > li");

      //let curIndex = 0;
      const url = window.location.pathname;

      let curIndex = parseFloat(localStorage.getItem('ingridCount'+ url)) || 0;
      
      //let countNo = parseFloat(curIndex)

      const insertDataTotile = (element) => {
        
        for(let i = 0; i < 4; i += 1) {
          let data = null;
          if(recdata[curIndex + i]) {
            data = recdata[curIndex + i];
            curIndex += (i + 1) % 4 == 0 ? 4 : 0;
          } else {
            curIndex = 0;
            data = recdata[i]
          }
        
          element.insertAdjacentHTML('afterbegin', `<li class="${ID}-list-item style="width: 100% !important""><a href="${data.url}"><span>${data.name}</span></a></li>`)
        }
      }

      const createTile = () => {
        const tile = listItems[0].cloneNode();
        tile.classList.add(`${ID}-root`);
        tile.innerHTML = `
        <div class="estore_product_container">
          <div class="${ID}-container">
            <h4>Other customers viewed</h4>
            <ul></ul>
          </div>
        </div>`;

        insertDataTotile(tile.querySelector('ul'));

        return tile;
      }
  
      // Add to page
      if(!document.querySelector(`.${ID}-root`)) {
        listItems.forEach((p, idx) => {
          // insert after every 16
          if(listItems.length > 12) {
            if(idx === 11) {
              p.insertAdjacentElement('afterend', createTile());
            } 
            if(idx === 27) {
              p.insertAdjacentElement('afterend', createTile());
            } 
            if(idx === 43) {
              p.insertAdjacentElement('afterend', createTile());
            } 
            if(idx === 59) {
              p.insertAdjacentElement('afterend', createTile());
            } 
          } else if (idx === listItems.length - 1){
              p.insertAdjacentElement('afterend', createTile());
          }
        });

        localStorage.setItem('ingridCount'+ url, curIndex);
      }

      const tileLinks = document.querySelectorAll(`.${ID}-list-item a`);

      // Tracking
      tileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          fireEvent(`'${link.innerText}' tile clicked`);
        });
      });
    }
  
  };
  
  let urlPath;
  if(window.location.href.indexOf('search') > -1) {
    urlPath = window.location.href.replace('https://www.boots.com', '').split('=').map((elm, idx) =>  idx == 1 ? elm.toUpperCase() : elm  ).join('=');
  } else {
    urlPath = location.href.replace('https://www.boots.com', '');
  }
   

  getData(urlPath)
  .then(result => {
    runExperiment(result);
  })
  .catch(e => {
    // don't run
  });


};
