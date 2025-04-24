const formatNumber = (num) => {
    return (num).toFixed(2);
}

const extractNumber = (str) => {
    const number = str?.match(/\d+/);
    return number ? number[0] : null;
}

export { formatNumber, extractNumber };