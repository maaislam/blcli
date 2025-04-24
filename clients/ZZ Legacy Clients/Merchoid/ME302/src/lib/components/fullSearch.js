import shared from "../shared";

const { ID } = shared;

export default class SearchBox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-searchBox`);
      element.innerHTML = `
       <div class="${ID}-close"></div>
       <div class="${ID}-searchInner">
        <div class="${ID}-searchBar">
            <h3>What are you looking for?</h3>
        </div>
        <div class="${ID}-searchSuggestionsWrapper">
            <div class="${ID}-searchSuggestions">
                <div class="${ID}-quickLinks">
                    <h3>Popular Searches</h3>
                    <div class="${ID}-brands">
                        <a class="${ID}-block" href="/brand/dc-comics-batman">
                            <div class="${ID}-icon" style="background-image:url(https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/Batman-Dark-Knight-Logo-PNG.png)"></div><p>Batman</p>
                        </a>
                        <a class="${ID}-block" href="/brand/harry-potter">
                            <div class="${ID}-icon" style="background-image:url(https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/580b57fbd9996e24bc43bd6a.png)"></div><p>Harry potter</p>
                        </a>
                        <a class="${ID}-block" href="/brand/dc-comics-superman">
                            <div class="${ID}-icon" style="background-image:url(https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/Superman-Logo-PNG-File.png)"></div><p>Superman</p>
                        </a>
                        <a class="${ID}-block" href="/brand/star-wars">
                            <div class="${ID}-icon" style="background-image:url(https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/Star-Wars-Logo-PNG-Image.png)"></div><p>Star wars</p>
                        </a>
                        <a class="${ID}-block" href="/nintendo-legend-of-zelda">
                            <div class="${ID}-icon" style="background-image:url(https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/brand-logo-zelda.png)"></div><p>Legend of Zelda</p>
                        </a>
                        <a class="${ID}-block" href="/brand/lord-of-the-rings">
                            <div class="${ID}-icon" style="background-image:url(https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/latest-153x117-150x117.png)"></div><p>Lord of the rings</p>
                        </a>
                    </div>
                    <a class="${ID}-allBrands" href="/brands">View all brands</a>
                </div>
            </div>
       </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const hideSearchBox = () => {
          component.classList.remove(`${ID}-searchOpen`);
          document.body.classList.remove(`${ID}-noScroll`);
      }

      const openSearchBox = () => {
        component.classList.add(`${ID}-searchOpen`);
        document.body.classList.add(`${ID}-noScroll`);
      }

      component.querySelector(`.${ID}-close`).addEventListener('click', () => {
        hideSearchBox();
      });

      document.querySelector(`.${ID}-searchIcon`).addEventListener('click', () => {
        openSearchBox();
      });

    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
    }
  }