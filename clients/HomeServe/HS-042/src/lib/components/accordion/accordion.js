import { alertIcon } from '../../assets/icons';
import accordionItem from './accordionItem';

const accordion = (id) => {
  const existingCustomerStr = `If you're an existing HomeServe customer and would like to discuss an existing claim, your policy, or anything else, feel free to reach out to us.`;
  const nonExistingCustomerStr = `If you're not an existing customer and would like to find out more about the cover HomeServe offer, or anything else, get in touch and we’ll be happy to help. `;
  const html = `
        <div class="${id}__accordionWrapper">
           <div class="${id}__accordionContainer container">
                <h1>Get in touch</h1>
                <p>
                    <span class="icon">
                        ${alertIcon}
                    </span>
                    <span class="text">If you suspect a gas leak, call the National Gas Emergency Service immediately on <a class="phone" href="tel:0800111999">0800 111 999.</a> Alternatively, if you have any other queries, select an option below.</span>
                </p>
                <div class="${id}__accordionTab">
                    <div class="${id}__accordion-link" data-attr="existing">
                        <h2>I am an existing customer</h2>
                        ${accordionItem(id, existingCustomerStr)}
                    </div>
                    <div class="${id}__accordion-link" data-attr="nonexisting">
                        <h2>I am not an existing customer</h2>
                        ${accordionItem(id, nonExistingCustomerStr)}
                    </div>
                </div>
            </div>
        </div>
    `;

  return html.trim();
};

export default accordion;
