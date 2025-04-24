import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

export default () => {
    return {
        form: document.querySelector(`.${ID}-form`),
        cta: document.querySelector('.course-info .cta')
    };
};