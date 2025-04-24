import { tickIcon } from '../assets/icons';

const getStarted = (id, data) => {
  const htmlStr = `<section class='${id}__getStarted row' data-sticky="stickyClone">
        <h2 class='${id}__title'>Apply for cover today</h2>
        <div class='${id}__content'>
            <p class='${id}__info'>You are eligible for this cover if...</p>
            ${data.ticks
              .map(
                (item) =>
                  `${
                    item
                      ? `<p class='${id}__eligibility'>
                <span class='${id}__tickIcon'>${tickIcon}</span> <span class='${id}__text'>${item}</span></p>`
                      : ''
                  }`
              )
              .join('\n')}
            <a class='${id}__eligibilityBtn'>See the full eligibility list</a>
            <p class='${id}__termsConditions'>
                Before taking out the policy, It’s important that you read the <span>Insurance Product Information Document</span> and the <span>Terms & Conditions
            </p>
        </div>
        <div class='${id}__btnWrapper'>
            <p class="mt20-xs mb10-xs">
                <a 
                class="btn secondary-btn apply-now-btn" 
                tabindex="0" 
                aria-label="Apply now"
                >Apply now</a>
            </p>
        </div>
    </section>`;

  return htmlStr;
};
export default getStarted;
