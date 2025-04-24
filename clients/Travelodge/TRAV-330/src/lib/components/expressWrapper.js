import toolTip from './tooltip';

const expressWrapper = (id, buttonLink, hasUrgencyMsg) => {
  const html = `
    <div class="${id}__expressWrapper">
        <div class="${id}__expressContent">
            ${toolTip(id)}
            <div class="${id}__expressButton">
                <a href="${buttonLink}" class="${id}__button" >
                    Express booking
                </a>
               
            </div>
             ${hasUrgencyMsg ? '<span class="urgency-msg">Last few rooms</span>' : ''}
        </div>
    </div>
  `;
  return html.trim();
};
export default expressWrapper;
