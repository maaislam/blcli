const formatDateForDisplay = (date) => {
    if (!date) return '';
    const [day, month, year] = date.split('/');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day.padStart(2, '0')} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
};
export default formatDateForDisplay;