import shared from '../../../../../core-files/shared';
import getFormSection from '../html/getFormSection';
import getElements from './getElements';
import getButton from '../html/getButton';
import getOverlay from '../html/getOverlay';
import handleVariation1 from './handleVariation1';
import handleVariation2 from './handleVariation2';
const { ID, VARIATION } = shared;

export default () => {
    const html = {
        button: getButton(),
        overlay: getOverlay(),
        formSection: getFormSection()
    };
    const elements = getElements();
    // Add initial button underneath cta
    elements.cta.insertAdjacentHTML('afterend', html.button);
    // Handle variations
    if (VARIATION == '1') {
        handleVariation1(html);
    }
    if (VARIATION == '2') {
        handleVariation2(html);
    }
};