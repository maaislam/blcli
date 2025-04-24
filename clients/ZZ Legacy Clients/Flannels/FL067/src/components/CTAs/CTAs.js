import settings from '../../lib/settings';
const {
    ID
} = settings;
//Check if female or male and adds the right link
const gender = window.dataLayer[1].productGender;
let linksArray;
switch (gender) {
    case 'Women':
        linksArray = [
            'https://www.flannels.com/women/clothing/tops',
            'https://www.flannels.com/women/Shoes/view-all',
            'https://www.flannels.com/women/clothing/swimwear',
        ];
        break;
    case 'Men':
        linksArray = [
            'https://www.flannels.com/men/clothing/t-shirts',
            'https://www.flannels.com/men/shoes',
            'https://www.flannels.com/men/clothing/underwear',
        ];
        break;
    default:
        break;
}

function CTAs() {
    return `
    <div class="${ID}_ctasWrap">
        <div class="${ID}_ctas">
            <div class="${ID}_buttonWrap">
                <a href="${linksArray[0]}" class="${ID}_button">
                Tops
                </a>
            </div>
            <!--End button-->
            <div class="${ID}_buttonWrap">
                <a href="${linksArray[1]}" class="${ID}_button">
                Footwear
                </a>
            </div>
            <!--End button-->
            <div class="${ID}_buttonWrap">
                <a href="${linksArray[2]}" class="${ID}_button">
                ${linksArray[2] == 'https://www.flannels.com/men/clothing/underwear' ? 'Underwear' : 'Lingerie'}
                </a>
            </div>
            <!--End button-->
        </div>
    </div>
    <!--End CTAs-->
    `;
}

export default CTAs;