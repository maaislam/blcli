import settings from '../../lib/settings';

const { ID } = settings;

function AccordionBlock(opts) {
  const {
    elements,
    uniqueName,
  } = opts || {};

  let blocks = '';
  const dataLength = elements.length;
  for (let i = 0; i < dataLength; i += 1) {
    blocks += `
      <div class="${ID}_accordion__elWrap">
        <input type="radio" id="${elements[i].id}" name="${uniqueName}">
        <div class="${ID}_accordion__el">
          <label for="${elements[i].id}" class="${ID}_accordion__title">
            ${elements[i].title}
          </label>
          <div class="${ID}_accordion__body">
            <div for="${elements[i].id}" class="${ID}_accordion__content">
              ${elements[i].content}
            </div>
          </div>
        </div>
      </div>
      <!--End Element-->
    `;
  }
  return blocks;
}

export default AccordionBlock;
