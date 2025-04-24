import { closeIcon, secureIcon } from '../assets/icons';

const timerWrapper = (id, VARIATION) => {
  const html = `
    <div class="${id}__timerWrapper">
      <div class="${id}__timerContainer">
        <div class="${id}__timerContent">
            <div class="${id}__timerIcon">${secureIcon}</div>
            <div class="${id}__timerInfo">
                <div class="${id}__timerTite">${
    VARIATION === '1' ? 'Great find. Let’s secure your rate.' : 'Don’t miss out. Let’s secure your rate.'
  }</div>
                <div class="${id}__timer">Complete your booking within <span class="${id}__minutes">10 mins</span> <span class="${id}__secs">00 secs</span></div>
            </div>
        </div>
        <div class="${id}__closeContent">${closeIcon}</div>
      </div>
    </div>
  `;
  return html.trim();
};

export default timerWrapper;
