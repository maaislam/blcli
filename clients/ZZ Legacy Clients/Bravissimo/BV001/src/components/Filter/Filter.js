import settings from '../../lib/settings';

const {
  ID,
} = settings;

export default class Filter {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('li');
    element.classList.add('c-results-list__item', `${ID}_filterWrap`);
    element.innerHTML = `
      <div class="c-product-summary c-product-summary--block">
        <section class="c-styled-title-block">
          <header class="c-styled-title-block__header">
            <h1 class="c-styled-title-block__title"><span class="u-text-style u-text-style-drawn u-text-size-2">Filter by bra size</span></h1>
          </header>
          <div class="c-styled-title-block__main">
            <section class="c-container c-container--facet-container">
              <div class="c-container__main">
                <div class="l-grid">
                  <div class="l-grid__unit">
                    <div class="c-results-facet__enhanced c-results-facet__enhanced-disc" id="backsize">
                      <p class="c-results-facet__enhanced-title">Back size</p>
                      <ul data-filter="backSize">
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-28" value="28" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-28">
                            28
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-30" value="30" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-30">
                            30
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-32" value="32" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-32">
                            32
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-34" value="34" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-34">
                            34
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-36" value="36" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-36">
                            36
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-38" value="38" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-38">
                            38
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-40" value="40" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-40">
                            40
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="l-grid__unit">
                    <div class="c-results-facet__enhanced c-results-facet__enhanced-disc" id="cupsize">
                      <p class="c-results-facet__enhanced-title">Cup size</p>
                      <ul data-filter="cupSize">
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-d" value="d" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-d">
                            d
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-dd" value="dd" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-dd">
                            dd
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-e" value="e" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-e">
                            e
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-f" value="f" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-f">
                            f
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-ff" value="ff" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-ff">
                            ff
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-g" value="g" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-g">
                            g
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-gg" value="gg" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-gg">
                            gg
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-h" value="h" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-h">
                            h
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-hh" value="hh" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-hh">
                            hh
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-j" value="j" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-j">
                            j
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-jj" value="jj" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-jj">
                            jj
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-k" value="k" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-k">
                            k
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-kk" value="kk" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-kk">
                            kk
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" class="c-results-facet__check" id="facet-input-l" value="l" aria-checked="false">
                          <label class="c-results-facet__label" for="facet-input-l">
                            l
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="${ID}_buttonWrap">
                    <div class="c-button-link c-button-link--small c-button-link--major-filled" id="applyFilters">Apply Filter</div>
                  </div>
                </div>
              </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    `;
    this.component = element;
  }

  bindEvents() {
    /**
     * Generate a record into the localstorage for both cupSize and backSize
     * based on which filter was clicked
     */
    const filters = this.component.querySelectorAll('.c-results-facet__label');
    const backSizeArray = [];
    const cupSizeArray = [];
    Array.from(filters).forEach((filter) => {
      filter.addEventListener('click', (e) => {
        const backSize = JSON.parse(localStorage.getItem('backSize'));
        const cupSize = JSON.parse(localStorage.getItem('cupSize'));
        const dataFilter = e.target.parentNode.parentNode.getAttribute('data-filter');
        const filterValue = e.target.textContent.trim();
        switch (dataFilter) {
          case 'backSize':
            // If doesn't exist insert it
            if (backSize.indexOf(filterValue) === -1) {
              backSizeArray.push(filterValue);
              localStorage.setItem('backSize', JSON.stringify(backSizeArray));
            } else {
              // If does exist remove it
              backSizeArray.shift();
              localStorage.setItem('backSize', JSON.stringify(backSizeArray));
            }
            break;
          case 'cupSize':
            if (cupSize.indexOf(filterValue) === -1) {
              cupSizeArray.push(filterValue);
              localStorage.setItem('cupSize', JSON.stringify(cupSizeArray));
            } else {
              cupSizeArray.shift();
              localStorage.setItem('backSize', JSON.stringify(cupSizeArray));
            }
            break;
          default:
            break;
        }
      });
    });
    this.component.querySelector('#applyFilters').addEventListener('click', () => {
      const location = window.location.href;
      let queryString = location.split('?')[0];
      queryString += '?limit=48&page=1&sortBy=default';
      const backSizeList = JSON.parse(localStorage.getItem('backSize'));
      const cupSizeList = JSON.parse(localStorage.getItem('cupSize'));
      for (let i = 0; i < backSizeList.length; i += 1) {
        queryString += `&f_backsize[]=${backSizeList[i]}`;
      }
      for (let i = 0; i < cupSizeList.length; i += 1) {
        queryString += `&f_cupsize[]=${cupSizeList[i]}`;
      }
      window.location = queryString;
    });
  }

  render() {
    const ref = document.querySelector('.c-results-list .c-results-list__items');
    if (ref) {
      const isExisting = document.querySelector(`.${ID}_filterWrap`);
      if(!isExisting){
        ref.insertAdjacentElement('afterbegin', this.component);
      }
    }
  }
}
