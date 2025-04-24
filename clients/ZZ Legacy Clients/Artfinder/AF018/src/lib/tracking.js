import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { elementIsInView } from "../../../../../lib/utils";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const viewedTracking = () => {
    const section = document.querySelector(`.${ID}-section`);
    let sectionViewed = false;
    window.addEventListener('scroll', () => {
        if (elementIsInView(section) && !sectionViewed) {
            fireEvent('Attraqt Widget in View');
            sectionViewed = true;
        }
    }); 
};

const elementClickTracking = () => {
    const productLinks = document.querySelectorAll(`.${ID}-card a`);
    productLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            fireEvent('Product Click');
        });
    });
};

const tracking = () => {
    viewedTracking();
    elementClickTracking();
};

export default tracking;