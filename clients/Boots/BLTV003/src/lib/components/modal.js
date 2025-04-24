import { crossIcon } from '../assets/icons';
import emailWrapper from './emailWrapper';

const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

const modal = (id, data) => {
  const html = `
          <div class="${id}__modal">
              <div class="${id}__modal-overlay"></div>
              <div class="${id}__modal-container">
                  <div class="${id}__newsletterWrapper">
                        <div class="${id}__newsletterContainer">
                            <div class="${id}__formWrapper">
                                <div class="${id}__formHeader">
                                    <h1>Let’s stay in touch</h1>
                                    <div class="${id}__closeButton">${crossIcon}</div>
                                </div>
                                
                                <h2>Millions already enjoy our free emails full of offers, exclusives & new products</h2>
                                ${
                                  window.userStatus === 'logged-out'
                                    ? emailWrapper(id, `${id}__modal-input`)
                                    : `<a href='https://www.boots.com/EmailPreferenceView' class="${id}__btn ${id}__preferenceBtn">show my preferences</a>`
                                }
                            </div>
                            <div class="${id}__formContent">
                                <div class="${id}__lists">
                                    ${data
                                      .map((item, index) => {
                                        return `
                                        <div class="${id}__item">
                                            <div class="${id}__icon">${item.icon}</div>
                                            <div class="${id}__title">${
                                          isMobile() && index === 0 ? item.mobileTitle : item.title
                                        }</div>
                                        </div>
                                        `;
                                      })
                                      .join('\n')}
                                </div>
                            </div>
                        </div>
                       
                    </div>
              </div>
          </div>
      `;
  return html;
};

export default modal;
