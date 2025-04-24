const getChildrenValues = () => {
    const { search } = window.location;
    const searchParams = new URLSearchParams(search);
    const childrenValues = [];

    searchParams.forEach((value, key) => {
        if (key.includes('children')) {
            childrenValues.push(Number(value));
        }
    });

    return childrenValues;
};

export default getChildrenValues;