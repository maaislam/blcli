export default (removeClasses, addClasses, target) => {
    if (removeClasses) {
        removeClasses.forEach(classItem => {
            target.classList.remove(classItem);
        });
    }
    if (addClasses) {
        addClasses.forEach(classItem => {
            target.classList.add(classItem);
        });
    }
};