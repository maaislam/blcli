import shared from '../../../../../core-files/shared';
import scrollToSection from './scrollToSection';
const { ID, VARIATION } = shared;

export default (html) => {
    const breadcrumbs = document.querySelectorAll('.component.breadcrumb');
    const lastBreadCrumb = breadcrumbs[breadcrumbs.length - 1];
    const button = document.querySelector(`.${ID}-button`);
    lastBreadCrumb.insertAdjacentHTML('beforebegin', html.formSection);
    button.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(e.target.getAttribute('href'));
    });
}