import settings from '../settings';

export default () => {
  const id = settings.ID;

  const learnMoreArea = document.querySelector('#seo');

  const learnMorewrapper = document.createElement('div');
  learnMorewrapper.classList.add(`${id}-learnMore_wrapper`);
  learnMorewrapper.innerHTML =
  `<div class="${id}-howItWorks ${id}-more_section">
    <h2>How it works</h2>
    <p>4 easy steps to find the <span class="faith">right match</span></p>
    <div class="${id}-slider"></div>
    <a href="/tour" class="${id}-button">Find out more</a>
  </div>
  <div class="${id}-why ${id}-more_section">
    <h2>Why eharmony</h2>
    <p>A decade of decoding <span class="faith">love</span></p>
    <div class="${id}-icons"></div>
  </div>
  <div class="${id}-success ${id}-more_section">
    <div class="${id}-hearts">
      <h2>success stories</h2>
      <p>People who <span class="faith">found love</span></p>
    </div>
    <div class="${id}-content"></div>
    <a href="/dating-advice/using-eharmony/nick-and-sarah" class="${id}-button">View success stories</a>
  </div>
  <div class="${id}-safety ${id}-more_section">
    <h2>safety</h2>
    <p>You're in<span class="faith">good hands</span></p>
    <div class="${id}-safety_content"></div>
  </div>
  <div class="${id}-people ${id}-more_section">
    <h2>people</h2>
    <p><span class="faith">Meet singles</span> from every walk of life across the uk</p>
    <a class="${id}-button">sign up for free now</a>
  </div>`;

  learnMoreArea.insertAdjacentElement('beforebegin', learnMorewrapper);
};
