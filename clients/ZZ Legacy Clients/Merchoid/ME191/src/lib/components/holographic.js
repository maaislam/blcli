import settings from '../../lib/settings';

const { ID } = settings;

export default class HologramBadge {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_badgeContainer`);


    element.innerHTML =
    `<div class="${ID}-innerBadge">
      <div class="${ID}-innerLogo">
        <div class="${ID}-badgeText">
          <span></span>
        </div>
      <svg id="badge" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve">
      <pattern  width="16.25" height="14.375" patternUnits="userSpaceOnUse" id="multi-dots" viewBox="12.5 -34 26 23" style="overflow:visible;">
          <g>
              <rect x="12.5" y="-34" width="26" height="23"/>
              <g>
                  <circle class="color1" cx="45" cy="-7.5" r="7.5"/>
              </g>
              <g>
                  <circle class="color1" cx="19" cy="-7.5" r="7.5"/>
                  <circle class="color2" cx="29.5" cy="-10" r="7.5"/>
              </g>
              <g>
                  <circle class="color3" cx="39.5" cy="-26" r="7.5"/>
                  <circle class="color1" cx="45" cy="-30.5" r="7.5"/>
                  <circle class="color4" cx="42.5" cy="-17" r="7.5"/>
              </g>
              <g>
                  <circle class="color3" cx="13.5" cy="-26" r="7.5"/>
                  <circle class="color1" cx="19" cy="-30.5" r="7.5"/>
                  <circle class="color1" cx="33.5" cy="-16" r="7.5"/>
                  <circle class="color2" cx="23.5" cy="-12" r="7.5"/>
                  <circle class="color2" cx="29.5" cy="-33" r="7.5"/>
                  <circle class="color4" cx="16.5" cy="-17" r="7.5"/>
                  <circle class="color5" cx="37.5" cy="-26" r="7.5"/>
                  <circle class="color3" cx="27.5" cy="-23" r="7.5"/>
              </g>
              <g>
                  <circle class="color1" cx="7.5" cy="-16" r="7.5"/>
                  <circle class="color5" cx="11.5" cy="-26" r="7.5"/>
              </g>
              <g>
                  <circle class="color4" cx="42.5" cy="-40" r="7.5"/>
              </g>
              <g>
                  <circle class="color1" cx="33.5" cy="-39" r="7.5"/>
                  <circle class="color2" cx="23.5" cy="-35" r="7.5"/>
                  <circle class="color4" cx="16.5" cy="-40" r="7.5"/>
              </g>
              <g>
                  <circle class="color1" cx="7.5" cy="-39" r="7.5"/>
              </g>
          </g>
      </pattern>
      <g id="pattern">
          <circle class="color3" cx="103.5" cy="112.5" r="7.5"/>
          <circle class="color0" cx="109" cy="108" r="7.5"/>
          <circle class="color0" cx="123.5" cy="122.5" r="7.5"/>
          <circle class="color2" cx="113.5" cy="126.5" r="7.5"/>
          <circle class="color2" cx="119.5" cy="105.5" r="7.5"/>
          <circle class="color4" cx="106.5" cy="121.5" r="7.5"/>
          <circle class="color4" cx="127.5" cy="112.5" r="7.5"/>
          <circle class="color3" cx="117.5" cy="115.5" r="7.5"/>
      </g>
      <g id="circle">
          <circle class="circle" cx="128" cy="128" r="120"/>
      </g>
      </svg>
    </div>
    `;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;

  $.getScript('//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js', function (data, textStatus, jqxhr) {

    const body = $('body');
    const badge = $('#badge');
    const color1 = $('.color1');
    const color2 = $('.color2');
    const color3 = $('.color3');
    const color4 = $('.color4');
    const color5 = $('.color5');

    setInterval((e) => {
      // cursor axis
      const sxPos = (Math.random() * window.innerWidth) / body.width() * 100 - 50;
      const syPos = (Math.random() * window.innerHeight) / body.height() * 100 - 50;

      // If cursor goes right or top
      if (sxPos >= 0 || syPos >= 0) {
        const tl1 = new TimelineMax();

      tl1.to(color1, 0.3, {
          fill: "#8EABE5"
        })
        .to(color2, 0.3, {
          fill: "#BCACF3"
        }, 0.2)
        .to(color3, 0.3, {
          fill: "#FAA9B2"
        }, 0.15)
        .to(color4, 0.3, {
          fill: "#F8FCA8"
        }, 0.1)
        .to(color5, 0.3, {
          fill: "#B5DFC8"
        }, 0.1);
      }
    
      // If cursor goes left or bottom
      if (sxPos < 0 || syPos < 0) {
        const tl2 = new TimelineMax();
        tl2.to(color1, 0.3, {
            fill: "#F8FCA8"
          })
          .to(color2, 0.3, {
            fill: "#8EABE5"
          }, 0.2)
          .to(color3, 0.3, {
            fill: "#B5DFC8"
          }, 0.15)
          .to(color4, 0.3, {
            fill: "#FAA9B2"
          }, 0.1)
          .to(color5, 0.3, {
            fill: "#BCACF3"
          }, 0.1);
      }
    }, 100);
  });
}

  render() {
    const { component } = this;
    const productImages = document.querySelector('.product-gallery');
    productImages.insertAdjacentElement('afterbegin', component);
  }
}
