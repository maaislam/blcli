import accordion from './accordion/accordion';
import { banner } from './banner/banner';
import boxt from './boxtSection/boxt';
import claimComponent from './claim/claimComponent';
import popularTopics from './popularTopics/popularTopics';
import { signposting } from './signPosting/signposting';

const mainWrapper = (id) => {
  const html = `
        <div class="${id}__mainWrapper">
            ${banner(id)}     
            ${claimComponent(id)}
             ${accordion(id)}
            ${signposting(id)}
            ${boxt(id)}
            ${popularTopics(id)}
        </div>
    `;

  return html.trim();
};

export default mainWrapper;
