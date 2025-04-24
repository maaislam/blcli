import { closeBtn } from '../assets';
import { formHeadlines } from '../data';

const modalContent = (id, pageData) => {
    const { registerPath, utm_medium, utm_source, utm_campaign, utm_term } = pageData;
    const utmSearchParams = `?utm_medium=${utm_medium}&utm_source=${utm_source}&utm_campaign=${utm_campaign}&utm_term=${utm_term}`;
    const registerIframeUrl = `${registerPath}${utmSearchParams}`;
    //const contactIframeUrl = `${contactPath}${utmSearchParams}`;
    const iframeUrl = registerIframeUrl;
    const formHeadline = formHeadlines['register'];
    const { title, subtitle } = formHeadline;
    const htmlStr = `
      <div class="${id}__modalcontainer">
          <div class="${id}__modalcontainer--close">${closeBtn}</div>
          <div class="${id}__modalcontainer--headline">
              <h1>${title}</h1>
              <p>${subtitle}</p>
          </div>
          <div class="${id}__modalcontainer--iframe">
              <iframe title="iframe" 
                  src="${iframeUrl}" style="width: 100%; border: none; overflow: hidden; height:800px;" 
                  id="iFrameResizer0"
                  scrolling="no">
              </iframe>
          </div>
      </div>`;

    return htmlStr.trim();
};

export default modalContent;