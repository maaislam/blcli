import { countryConfig } from '../data';

const banner = (id, pageData, geo) => {
  console.log('file: banner.js:4 ~ banner ~ geo:', geo);

  const { attachTo, registerPath, contactPath, utm_medium, utm_source, utm_campaign, utm_term } = pageData;
  const utmSearchParams = `?utm_medium=${utm_medium}&utm_source=${utm_source}&utm_campaign=${utm_campaign}&utm_term=${utm_term}`;
  const registerUrl = `${registerPath}${utmSearchParams}`;
  const contactUrl = `${contactPath}${utmSearchParams}`;

  const position = attachTo === 'body' ? `${id}__fixed` : '';

  const translations = countryConfig[geo];
  const { headline, signupCopy, contactCopy } = translations;
  const htmlStr = `

    <div class="${id}__webinerbanner ${position}">
        <div class="${id}__wrapper css-1gycr4w">
            <div class="${id}__webinerbanner--content">
                <div class="title">
                    ${headline}
                </div>
            </div>
            <div class="${id}__webinerbanner--btncontainer">
                <a target="_blank" href="${registerUrl}" class="webiner-register">
                    <span class="">${signupCopy}</span>
                </a>
                <a target="_blank" href="${contactUrl}" 
                class="contact-sale  ">
                    <span class="">${contactCopy}</span>
                </a>
            </div>
        </div>
    </div>`;

  return htmlStr.trim();
};

export default banner;
