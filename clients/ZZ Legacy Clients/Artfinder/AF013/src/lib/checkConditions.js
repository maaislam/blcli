const checkjQuery = () => {
    return !!window.$ && typeof window.$ == 'function';
};

const checkSlick = () => {
    let slick = !!window.$.fn.slick;
    return slick;
}

const checkConditions = () => {
    return (checkjQuery() && checkSlick());
};

export default checkConditions;