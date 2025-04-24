import updateClasses from './updateClasses';

export default (options) => {
    const removeClasses = options.currentBox?.classes?.remove;
    const addClasses = options.currentBox?.classes?.add;
    updateClasses(removeClasses, addClasses, options.parent);
};