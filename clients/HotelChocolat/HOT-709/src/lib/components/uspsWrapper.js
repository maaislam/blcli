import { rightArrow } from '../assets/icons';

const uspsWrapper = (id, data) => {
  const html = `
        <div class="${id}__uspsWrapper">
            <div class="${id}__uspsContainer">
                ${data
                  .map((item) => {
                    return `
                         <div class="${id}__uspsItem" data-model="${item.id}">
                            <div class="${id}__uspsContent">
                                <h2>${item.title}</h2>
                                <p>${item.subtitle}</p>
                            </div>
                            <div class="${id}__uspsIcon">${rightArrow}</div>
                        </div>
                    `;
                  })
                  .join('\n')}
            </div>
        </div>
    `;

  return html.trim();
};

export default uspsWrapper;
