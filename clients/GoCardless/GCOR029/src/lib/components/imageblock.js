import shared from '../../../../../../core-files/shared';

const imageBlock = (id, partnerData) => {
  const { name } = partnerData;
  const imageSrc = `https://ucds.ams3.digitaloceanspaces.com/GCOR029/${name}${shared.VARIATION === '2' ? '-v2' : ''}.png`;
  const htmlStr = `
            <div class="${id}__imageblock">
                <img src="${imageSrc}" alt="${name}" />
            </div>`;
  return htmlStr.trim();
};

export default imageBlock;
