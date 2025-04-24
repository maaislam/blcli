import shared from './shared';
import {addBusinessDaysToDate} from '../../../../../lib/dates';

/**
 * Date brackets are a string corresponding to the time period they entered
 * e.g. 'today', 'tomorrow', '2-7' (days), ...
 *
 * @param {String} recipient
 * @param {String} dateBracket
 */

const nextDay = () => {
  const today = new Date();

  let result = 'in 2 days';
  if([1,2,3,4,5].indexOf(today.getDay()) > -1 && today.getHours() < 18) {
    result = 'tomorrow';
  }

  return result;
};

const isAfterCutoff = () => {
  const today = new Date();

  return (today.getHours() >= 18);
}

const arriveBy = () => {
  const daysToAdd = (new Date()).getHours() < 18 ? 5 : 6;
  const daysHence = addBusinessDaysToDate(new Date(), daysToAdd);

  return `${daysHence.getDate()}/${daysHence.getMonth()}/${daysHence.getFullYear()}`;
}

const eligibleForGiftByText = () => {
  const optE = document.querySelector('.prod-opt-e');
  if(optE && optE.classList.contains('true')) {
    return true;
  }

  return false;
}

const eligibleForClickAndCollect = () => {
  const optC = document.querySelector('.prod-opt-c');
  if(optC && optC.classList.contains('true')) {
    return true;
  }

  return false;
}

const eligibleForGiftBag = () => {
  const optB = document.querySelector('.prod-opt-b');
  if(optB && optB.classList.contains('true')) {
    return true;
  }

  return false;
};

const eligibleForPersonalisedMessage = () => {
  const optA = document.querySelector('.prod-opt-a');
  if(optA && optA.classList.contains('true')) {
    return true;
  }

  return false;
};

export default (recipient, dateBracket, chosenDate) => {
  chosenDate = chosenDate.split('-').reverse().join('/');

  if(recipient == 'me' && (dateBracket == 'today' || (dateBracket == 'tomorrow' && isAfterCutoff()))) {
    return `
      <h5>We do have an option for you...</h5>

      <ul>
        ${
          eligibleForClickAndCollect() ? `
            <li>You can click and collect or visit one of our stores <a href="https://www.hotelchocolat.com/uk/chocolate-shops">here</a>.</li>
          ` : `<li>You can visit one of our stores <a href="https://www.hotelchocolat.com/uk/chocolate-shops">here</a>.</li>`
        }

        ${eligibleForGiftByText() ? `
          <li>Give yourself the gift of text. You can select and pay for a gift you wish to send; and the lucky recipient will receive the details of the gift via their phone. <a href="https://www.hotelchocolat.com/uk/about-gift-by-text.html">Read more</a></li>
        ` : ''}
      </ul>

      <h6>Finally</h6>

      <p>Don't worry, our No Excuses Guarantee means if in the rare instance you're not 100% happy with our products, we'll immediately put it right for you with a refund, replacement or gift card.</p>
    `;
  } else if(recipient == 'me' && dateBracket == 'tomorrow') {
    return `
      <h5>Fantastic - We can deliver then easily</h5>

      <ul>
        <li>
          If you order in the next <span class="${shared.ID}-countdown"></span>, your item could arrive with 
            you ${nextDay()} 
            if you select a nominated delivery date in checkout from just £4.95. If ordering on friday for the next day, select Saturday delivery at checkout.
        </li>
				<li>In the past 6 months, we delivered over 95% of all items on the day they were due to be delivered.</li>
				<li>All items are delivered and tracked by courier - you’ll receive confirmation of the delivery date via email and a text on the day.</li>
				<li>Our specially designed outer and inner packaging ensures there are no breakages or heat issues whilst being delivered.</li>
      </ul>

      <h6>Finally</h6>

      <p>Don't worry, our No Excuses Guarantee means if in the rare instance you're not 100% happy with our products, we'll immediately put it right for you with a refund, replacement or gift card.</p>
    `;
  } else if(recipient == 'me' && dateBracket == '2-7') {
    return `
      <h5>Fantastic - We can deliver then easily</h5>

      <ul>
        <li>
          If you order in the next <span class="${shared.ID}-countdown"></span>, your item could arrive with you ${nextDay()} 
            if you select a nominated delivery date in checkout from just £4.95. If ordering on friday for the next day, select Saturday delivery at checkout.
        </li>
        <li>
          Or, from just £3.95, your order will arrive by ${arriveBy(chosenDate)} using Standard Delivery at the latest (we cautiously allow up to 5 days, but over 95% of the time we deliver sooner than this).
        </li>
        <li>
          In the past 6 months, we delivered over 95% of all items on the day they were due to be delivered.
        </li>
        <li>All items are delivered and tracked by courier - you’ll receive an estimated delivery date via email and a text on the day.</li>
        <li>Our specially designed outer and inner packaging ensures there are no breakages or heat issues whilst being delivered.</li>
      </ul>

      <h6>Finally</h6>

      <p>Don't worry, our No Excuses Guarantee means if in the rare instance you're not 100% happy with our products, we'll immediately put it right for you with a refund, replacement or gift card.</p>
    `;
  } else if(recipient == 'me' && (dateBracket == '8-15' || dateBracket == '16-30' || dateBracket == '30+')) {
    return `
      <h5>Fantastic - We can deliver then easily</h5>

      <ul>
        <li>
          If you order in the next <span class="${shared.ID}-countdown"></span>, your item could arrive with you ${nextDay()} 
            if you select a nominated delivery date in checkout from just £4.95.
        </li>
        <li>Or, from just £3.95, your order will arrive by ${arriveBy(chosenDate)} using Standard Delivery at the latest (we cautiously allow up to 5 days, but over 95% of the time we deliver sooner than this)</li>
        <li>In the past 6 months, we delivered over 95% of all items on the day they were due to be delivered.</li>
        <li>All items are delivered and tracked by courier - you’ll receive an estimated delivery date via email and a text on the day.</li>
        <li>Our specially designed outer and inner packaging ensures there are no breakages or heat issues whilst being delivered</li>
      </ul>

      <h6>Finally</h6>

      <p>Don't worry, our No Excuses Guarantee means if in the rare instance you're not 100% happy with our products, we'll immediately put it right for you with a refund, replacement or gift card.</p>
    `;
  } else if(recipient == 'someone-else' && (dateBracket == 'today' || (dateBracket == 'tomorrow' && isAfterCutoff()))) {
    return `
      <h5>We do have an option for you...</h5>

      <ul>
        ${
          eligibleForClickAndCollect() ? `
            <li>You can click and collect or visit one of our stores <a href="https://www.hotelchocolat.com/uk/chocolate-shops">here</a>.</li>
          ` : `<li>You can visit one of our stores <a href="https://www.hotelchocolat.com/uk/chocolate-shops">here</a>.</li>`
        }

        ${eligibleForGiftByText() ? `
          <li>Give yourself the gift of text. You can select and pay for a gift you wish to send; and the lucky recipient will receive the details of the gift via their phone. <a href="https://www.hotelchocolat.com/uk/about-gift-by-text.html">Read more</a></li>
        ` : ''}
      </ul>

      ${eligibleForPersonalisedMessage() || eligibleForGiftBag() ? `
        <h6>Make it extra special</h6>

        <ul>
          ${eligibleForPersonalisedMessage() ? `
            <li>
              Add + Personalised gift messages complimentary with every order (add in checkout) 
            </li>
          ` : ''}

          ${eligibleForGiftBag() ? `
            <li>
              Add + gift box (+£5) or concierge gift bag (+£2.50); individually trimmed with a seasonal 
                red ribbon (add in checkout)
            </li>
          ` : ''}
        </ul>
      ` : ''}

      <h6>Finally</h6>

      <p>Don't worry, our No Excuses Guarantee means if in the rare instance you're not 100% happy with our products, we'll immediately put it right for you with a refund, replacement or gift card.</p>
    `;
  } else if(recipient == 'someone-else' && dateBracket == 'tomorrow') {
    return `
      <h5>Fantastic - We can deliver then easily</h5>

      <ul>
        <li>
          If you order in the next <span class="${shared.ID}-countdown"></span>, your item could arrive with you ${nextDay()} 
            if you select a nominated delivery date in checkout from just £4.95. If ordering on friday for the next day, select Saturday delivery at checkout.
        </li>
				<li>All items are delivered and tracked by courier - you’ll receive confirmation of the delivery date via email and a text on the day.</li>
				<li>Our specially designed outer and inner packaging ensures there are no breakages or heat issues whilst being delivered.</li>
      </ul>

      ${eligibleForPersonalisedMessage() || eligibleForGiftBag() ? `
        <h6>Make it extra special</h6>

        <ul>
          ${eligibleForPersonalisedMessage() ? `
            <li>
              Add + Personalised gift messages complimentary with every order (add in checkout) 
            </li>
          ` : ''}

          ${eligibleForGiftBag() ? `
            <li>
              Add + gift box (+£5) or concierge gift bag (+£2.50); individually trimmed with a seasonal 
                red ribbon (add in checkout)
            </li>
          ` : ''}

          ${eligibleForGiftByText() ? `
            <li>
              You can send this gift by text <strong>today!</strong> You can select and pay for a gift you wish to send; and the lucky recipient will receive the details of the gift via their phone. 
              <a href="https://www.hotelchocolat.com/uk/about-gift-by-text.html">Read more</a>
            </li>
          ` : ''}
        </ul>
      ` : ''}

      <h6>Finally</h6>

      <p>Don't worry, our No Excuses Guarantee means if in the rare instance you're not 100% happy with our products, we'll immediately put it right for you with a refund, replacement or gift card.</p>
    `;
  } else if(recipient == 'someone-else' && (dateBracket == '2-7' || dateBracket == '8-15' || dateBracket == '16-30' || dateBracket == '30+')) {
    return `
      <h5>Fantastic - We can deliver then easily</h5>

      <ul>
        <li>
          You can select ${chosenDate} as a nominated day for delivery in checkout from just £4.95.
          If selected, your item will arrive with your recipient on ${chosenDate}.
        </li>
        <li>All items are delivered and tracked by courier - you (as the gift giver) will receive an estimated delivery date via email and a text on the day to let you know when it's arriving and that it's arrived safely</li>
        <li>Our specially designed outer and inner packaging ensures there are no breakages or heat issues whilst being delivered.</li>
      </ul>

      ${eligibleForPersonalisedMessage() || eligibleForGiftBag() ? `
        <h6>Make it extra special</h6>

        <ul>
          ${eligibleForPersonalisedMessage() ? `
            <li>
              Add + Personalised gift messages complimentary with every order (add in checkout) 
            </li>
          ` : ''}

          ${eligibleForGiftBag() ? `
            <li>
              Add + gift box (+£5) or concierge gift bag (+£2.50); individually trimmed with a seasonal 
                red ribbon (add in checkout)
            </li>
          ` : ''}

          ${eligibleForGiftByText() ? `
            <li>
              You can send this gift by text <strong>today!</strong> You can select and pay for a gift you wish to send; and the lucky recipient will receive the details of the gift via their phone. 
              <a href="https://www.hotelchocolat.com/uk/about-gift-by-text.html">Read more</a>
            </li>
          ` : ''}
        </ul>
      ` : ''}

      <h6>Finally</h6>

      <p>Don't worry, our No Excuses Guarantee means if in the rare instance you're not 100% happy with our products, we'll immediately put it right for you with a refund, replacement or gift card.</p>
    `;
  }

  return ' ';
};
