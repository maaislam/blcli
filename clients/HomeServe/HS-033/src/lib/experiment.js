import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const cDD = new Date('July 4, 2024 23:59:59').getTime();
console.log('🚀 ~ cDD:', cDD);
const now = new Date().getTime();
let td = cDD - now;

let pt = window.location.pathname;

const init = () => {
  let $ = window.jQuery;
  let coundownTimerHtml = `
			<div class="day-wrapper">
				<div id="coundown-day">
					<span id="f-digit"/>
					<span id="s-digit"/>
					<span class="colon">:</span>
				</div>
				<div class="c-white">
				Days
				</div>
			</div>
			<div class="hour-wrapper">
				<div id="coundown-hour">
					<span id="f-digit"/>
					<span id="s-digit"/>
					<span class="colon">:</span>
				</div>
				<div class="c-white">
				Hours
				</div>
			</div>
			<div class="minutes-wrapper">
				<div id="coundown-min">
					<span id="f-digit"/>
					<span id="s-digit"/>
					<span class="colon">: </span>
				</div>
				<div class="c-white">
					Minutes
				</div>
			</div>
			<div class="seconds-wrapper">
				<div id="coundown-sec">
					<span id="f-digit"/>
					<span id="s-digit"/>
				</div>
				<div class="c-white">
					Seconds
				</div>
			</div>
			
			`;

  if (pt === '/') {
    let html = `<div class="banner-enhanced-wrapper">
					<h1>
					Expert plumbing cover
					for just 50p a month*
					</h1>
					<div id="coundown-timer">
						<div class="header">
							Limited offer ends in
						</div>
						<div class="condown-timer-inner">
							${coundownTimerHtml}
						</div>
						</div>

				</div>`;
    $('#heroBannerContent #heroBannerCopy').prepend(html);
    $('#heroBannerContent #heroBannerCopy #heroBannerCta a').text('View offer');
  } else if (pt === '/insurance/plumbing-drainage-cover' || pt === '/insurance/landlords-plumbing-drainage') {
    let html = `<div class="banner-enhanced-wrapper v2">
					<div id="coundown-timer">
						<div class="header">
							Limited offer ends in
						</div>
						<div class="condown-timer-inner">
							${coundownTimerHtml}
						</div>
					</div>
				</div>`;

    let limitedOffer = `<div class="limited-offer-top">
					Limited offer
				</div>`;

    pt === '/insurance/plumbing-drainage-cover'
      ? $('#feature-area .hero-wrapper .hero-content-wrapper').append(html)
      : $('.container .page--product .hero-banner__content').append(html);

    $('.page--product .hero-banner__side .bubble.bubble--left').prepend(limitedOffer);
  } else if (pt === '/insurance-cover/plumbing-and-drainage-comparison' || pt === '/insurance-cover/landlords-comparison') {
    let redirectUrl =
      pt === '/insurance-cover/plumbing-and-drainage-comparison'
        ? '/insurance/plumbing-drainage-cover?aboutyou=true'
        : '/insurance/landlords-plumbing-drainage';
    let html = `<div class="banner-enhanced-wrapper-v3">
						<div id="coundown-timer">
							<div class="h3">
								Expert plumbing and drainage cover from 50p a month*
							</div>
							<div>
								<div class="header">
									Limited offer ends in
								</div>
								<div class="condown-timer-inner">
									${coundownTimerHtml}
								</div>
							</div>
							<div class="banner__link-wrapper">
								<a href=${redirectUrl} class="btn-solid">
									View offer
								</a>
							</div>
						</div>
						<ul class="ticks small">
						*Offer ends 4 July 2024. New customer offer. T&Cs apply.
						</ul>
					</div>`;

    $('.row.category-items > .h3').after(html);
  }

  function updateTimerDom(selector, value) {
    document.querySelectorAll(selector).forEach((elem) => {
      //console.log('🚀 ~ document.querySelectorAll ~ elem:', elem);
      elem.innerHTML = value;
    });
  }

  function updateTimer() {
    const cDD = new Date('July 4, 2024 23:59:59').getTime();
    const now = new Date().getTime();
    let td = cDD - now;

    const days = Math.floor(td / (1000 * 60 * 60 * 24));
    const hours = Math.floor((td % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((td % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((td % (1000 * 60)) / 1000);

    //console.log('🚀 ~ updateTimer ~:', days, hours, minutes, seconds);

    if (td < 0) {
      clearInterval(x);
    } else {
      document.querySelectorAll('#coundown-day #f-digit').forEach((elem) => {
        elem.innerHTML = parseInt(hours / 10);
      });
      //console.log('🚀 ~ updateTimer ~ td:', td);
      if (days > 0) {
        updateTimerDom('#coundown-day #f-digit', parseInt(days / 10));
        updateTimerDom('#coundown-day #s-digit', days % 10);
      }
      updateTimerDom('#coundown-hour #f-digit', parseInt(hours / 10));
      updateTimerDom('#coundown-hour #s-digit', hours % 10);
      updateTimerDom('#coundown-min #f-digit', parseInt(minutes / 10));
      updateTimerDom('#coundown-min #s-digit', minutes % 10);
      updateTimerDom('#coundown-sec #f-digit', parseInt(seconds / 10));
      updateTimerDom('#coundown-sec #s-digit', seconds % 10);

      //hide days placeholder if days are 0
      if (days == 0) {
        document.querySelectorAll('.day-wrapper').forEach((elem) => {
          elem.style.display = 'none';
        });
      }
    }
  }
  updateTimer();
  var x = setInterval(updateTimer, 1000);
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  //init();

  if (td > 0) {
    if (
      pt === '/' ||
      pt === '/insurance/plumbing-drainage-cover' ||
      pt === '/insurance-cover/plumbing-and-drainage-comparison' ||
      pt === '/insurance-cover/landlords-comparison' ||
      pt === '/insurance/landlords-plumbing-drainage'
    ) {
      document.body.classList.add('var-283-wrapper');
      init();
    }
  }
};
