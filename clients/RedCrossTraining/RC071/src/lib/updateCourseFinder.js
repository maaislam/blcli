import choices from './choices';
import updateChoice from './updateChoice';
import updateEvents from './updateEvents';
import getCurrentElements from './getCurrentElements';

const updateCourseFinder = () => {
    const currentElements = getCurrentElements();
    // Loop through choices and add functionality
    choices.forEach(question => {
        let relatedRadio = Array.prototype.filter.call(currentElements.choices, (radio) => {
            return radio.innerHTML.includes(question.text);
        })[0];
        if (relatedRadio) {
            updateChoice(question, relatedRadio);
        }
    });
    updateEvents();
};

export default updateCourseFinder;