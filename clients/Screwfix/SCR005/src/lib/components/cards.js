import card from './card';

const cards = (id, cardData) => {
  const htmlStr = `
    <div class="${id}__relatedcategory">
        <div class="${id}__relatedcategory--title">
            COMPLETE THE JOB
        </div>
        <div class="${id}__categorycards">
            ${cardData.map((item) => card(id, item)).join('\n')}
        </div>
    </div>`;

  return htmlStr.trim();
};

export default cards;
