const preprocessDate = (date) => {
    if (!date) return '';

    // Match the day and month, ignoring extra parts like "Wed," and "th"
    const dateParts = date.match(/(?:\w{3},\s)?(\d{1,2})(?:st|nd|rd|th)?\s(\w+)/i);
    if (!dateParts) {
        console.error('Invalid date format:', date);
        return '';
    }

    const day = dateParts[1];
    const month = dateParts[2];

    // Convert month name to a two-digit number
    const monthMap = {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12',
    };
    const monthNumber = monthMap[month.substring(0, 3)];
    if (!monthNumber) {
        console.error('Invalid month:', month);
        return '';
    }

    // Infer the year
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-based

    // Handle year rollover logic
    let inferredYear = currentYear;
    if (parseInt(monthNumber, 10) < currentMonth) {
        // If the selected month is earlier than the current month, assume next year
        inferredYear += 1;
    }

    return `${day.padStart(2, '0')}/${monthNumber}/${inferredYear.toString().slice(-2)}`;
};

export default preprocessDate;