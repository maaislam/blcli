import { chatIcon, telephoneIcon } from '../../assets/icons';
import { chatBot } from '../chatBot';

const accordionItem = (id, title) => {
  const html = `
        <div class="${id}__accordion-content">
            <div class="${id}__text">
                ${title}
            </div>
            <div class="${id}__info">
                <div class="${id}__infoWrapper">
                    <div class="chat-section">
                        <h2>
                        <span>
                            ${chatIcon}
                        </span>
                        Chat to us online
                        </h2>
                        <p>We're available:</p>
                        <div class="contact-info">
                            <h3>
                                <span>Mon - Fri</span>
                                <span>8am - 8pm</apn>
                            </h3>
                            <h3>
                                <span>Saturday</span>
                                <span>8am - 4pm</apn>
                            </h3>
                            <h3>
                                <span>Sunday</span>
                                <span>10am - 4pm</apn>
                            </h3>       
                        </div>
                        ${chatBot(id)}
                    </div>
                    <div class="speak-section">
                        <h2>
                         <span>
                            ${telephoneIcon}
                        </span>
                        Speak to us
                        </h2>
                        <p>Our lines are open 24/7, 365 days a year</p>
                        <div class="contact-info">
                            <p>By Phone <a href="tel:03300247002" class="phone">0330 0247 002*</a></p>
                            <p>By Textphone <a href="tel:1800103300247999" class="textphone">18001 0330 0247 999</a></p>        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  return html.trim();
};

export default accordionItem;
