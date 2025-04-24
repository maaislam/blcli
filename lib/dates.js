/**
 * Assumes the weekend days are not working days.
 *
 * @param {Date} startDate
 * @param {Number} n
 */
export const addBusinessDaysToDate = (startDate, n) => {
    const d = new Date(startDate.getTime());
    var day = d.getDay();
    d.setDate(d.getDate() + n + (day === 6 ? 2 : +!day) + (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));
    return d;
};
