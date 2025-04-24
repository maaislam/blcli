import emailWrapper from './emailWrapper';

const newsletterWrapper = (id, data) => {
  const html = `
        <div class="${id}__newsletterWrapper" id="${id}__newsletterWrapper">
            <div class="${id}__newsletterContainer">
                <div class="${id}__formWrapper">
                    <h1>Let’s stay in touch</h1>
                    <h2>Millions already enjoy our free emails full of offers, exclusives & new products</h2>
                    ${
                      window.userStatus === 'logged-out'
                        ? emailWrapper(id, `${id}__newsletter-input`)
                        : `<a href='https://www.boots.com/EmailPreferenceView' class="${id}__btn ${id}__preferenceBtn">show my preferences</a>`
                    }
                </div>
                <div class="${id}__formContent">
                    <div class="${id}__lists">
                        ${data
                          .map((item) => {
                            return `
                            <div class="${id}__item">
                                <div class="${id}__icon">${item.icon}</div>
                                <div class="${id}__title">${item.title}</div>
                            </div>
                            `;
                          })
                          .join('\n')}
                    </div>
                </div>
            </div>
        </div>
    `;
  return html.trim();
};

export default newsletterWrapper;
