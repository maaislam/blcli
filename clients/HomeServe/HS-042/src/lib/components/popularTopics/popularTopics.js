import experience from './experience';
import helpTopics from './helpTopics';
import textOne from './textOne';
import textTwo from './textTwo';

const popularTopics = (id) => {
  const html = `
         <div class="faqCard-module--accordionFullWidth--ae13d ${id}__popularTopics">
                <div class="container">
                  ${helpTopics()}
                  ${experience()}
                  ${textOne()}
                  ${textTwo()}
                </div>
         </div>
    `;
  return html.trim();
};

export default popularTopics;
