import settings from '../shared';
import translations from '../translations';
const { ID } = settings;

const getLanguage = () => {
        return window.location.pathname.substring(1).match(/^it|gb|fr|de|es/) + '';
    };

function _t(str) {
        if(translations[str]) {
            var t = translations[str][getLanguage()]
            if(t) {
                return t;
            }
        }

        return str;
    }

export default class PageMarkup {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_pageContent`);
    element.innerHTML = 
    `<div class="${ID}-requestform-holder">
      <div class="row">
        <section class="col-lg-4 col-md-4 col-sm-4 col-xs-12 information-holder-col">
          <div class="information-holder-col__inner">
            <h2> ${_t('request-quote-header')} </h2>
            <p> ${_t('request-quote-text')} </p>
            <ul class="tick-list">
              <li> 
                <span> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path fill="#FAE21A" fill-rule="evenodd" d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"/>
                  </svg> 
                </span> ${_t('ticklist1')} 
              </li>
              <li> 
                <span> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path fill="#FAE21A" fill-rule="evenodd" d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"/>
                  </svg> 
                </span> ${_t('ticklist2')} 
              </li>
              <li> 
                <span> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path fill="#FAE21A" fill-rule="evenodd" d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"/>
                  </svg> 
                </span> ${_t('ticklist3')} 
              </li>
            </ul>

            <div class="call-holder desktop">
              <h3> ${_t('prefer-call-header')}  </h3>

              <p> ${_t('prefer-call-text')} <span class="telno"><a 
                href="tel:${_t('prefer-call-number').replace(/\s/g, '')}"
                >${_t('prefer-call-number')}</a></span> </p>


              ${_t('spares-text').trim() ? `
                <p> ${_t('spares-text')} <span class="telno"><a 
                  href="tel:${_t('spares-number').replace(/\s/g, '')}"
                  >${_t('spares-number')}</a></span> </p>

                <p> ${_t('tech-assistance-text')} <span class="telno"><a 
                  href="tel:${_t('tech-assistance-number').replace(/\s/g, '')}"
                  >${_t('tech-assistance-number')}</a></span> </p>
              ` : ''}

            </div>
          </div>
        </section>
        <section class="col-lg-8 col-md-8 col-sm-8 col-xs-12 request-form-col">
          <div class="form-holder-inner">
            <div class="run-personal-header">
              <h2> ${_t('run-consult-header')} ${window.TGProdName}</h2>
              <p> ${_t('consult-header')} </p>
            </div>
            <div class="${ID}-form-holder">

            </div>

            <p> ${_t('request-answered')} </p>

          </div>
        </section>

        <section>
          <div class="call-holder mobile">
            <h3> ${_t('prefer-call-header')}  </h3>

            <p> ${_t('prefer-call-text')} <span class="telno"><a 
                href="tel:${_t('prefer-call-number').replace(/\s/g, '')}"
                >${_t('prefer-call-number')}</a></span> </p>

            ${_t('spares-text').trim() ? `
              <p> ${_t('spares-text')} <span class="telno"><a 
                href="tel:${_t('spares-number').replace(/\s/g, '')}"
                >${_t('spares-number')}</a></span> </p>

              <p> ${_t('tech-assistance-text')} <span class="telno"><a 
                href="tel:${_t('tech-assistance-number').replace(/\s/g, '')}"
                >${_t('tech-assistance-number')}</a></span> </p>
            ` : ''}

          </div>
        </section>
      </div>
    </div>
            



    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const mainPage = document.querySelector('.content-container .forms');
    mainPage.appendChild(component);
  }
}

/*

element.innerHTML = 
    `<div class="${ID}-topText">
        <h1>Technogym Treadmills</h1>
        <p>Live healthier and happier</p>
        <p>Each treadmill combines scientific research, innovative technology and exquisite design.</p>
        <p>We're a 7 time Official Fitness Equipment Supplier to the Olympic and Paralympic Games. Train with the best.</p>
    </div>
    <div class="${ID}-treadmills_wrapper">
      <div class="${ID}-productSlider_wrapper"></div>
    </div>
    <div class="${ID}-contactArea">
      <h3>Not found what you were looking for?</h3>
      <p>Our Wellness consultants are on hand to help with any specifications or questions and provide advice especially tailored to your needs and goals.</p>
      <div class="${ID}-contactButton">Contact Me</div>
    </div>`;


*/
