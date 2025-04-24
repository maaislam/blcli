import { closeBtn } from '../assets';
import { formHeadlines } from '../data';

const modalContent = (id, pageData, formType) => {
  const { registerPath, contactPath, utm_medium, utm_source, utm_campaign, utm_term } = pageData;
  const utmSearchParams = `?utm_medium=${utm_medium}&utm_source=${utm_source}&utm_campaign=${utm_campaign}&utm_term=${utm_term}`;
  const registerIframeUrl = `${registerPath}${utmSearchParams}`;
  const contactIframeUrl = `${contactPath}${utmSearchParams}`;
  const iframeUrl = formType === 'register' ? registerIframeUrl : contactIframeUrl;
  const formHeadline = formHeadlines[formType];
  const { title, subtitle } = formHeadline;
  const htmlStr = `
    <div class="${id}__modalcontainer ${id}__${formType}">
        <div class="${id}__modalcontainer--close">${closeBtn}</div>
        <div class="${id}__modalcontainer--headline">
            <h1>${title}</h1>
            <p>${subtitle}</p>
        </div>
        <div class="${id}__modalcontainer--iframe">
            <iframe title="iframe" 
                src="${iframeUrl}" style="width: 100%; border: none; overflow: hidden; height: ${
    formType === 'register' ? '800' : '1000'
  }px;" 
                id="iFrameResizer0"
                scrolling="no">
            </iframe>
        </div>
    </div>`;

  return htmlStr.trim();
};

export default modalContent;
