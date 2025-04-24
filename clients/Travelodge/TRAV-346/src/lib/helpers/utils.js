export const getCheckInOutDates = (input) => {
  const [checkIn, checkOut] = input.split(' - ');

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const getSuffix = (day) => (day > 3 && day < 21 ? 'th' : suffixes[day % 10] || 'th');

    const date = new Date(year, month - 1, day);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    const suffix = getSuffix(day);

    return `${dayName}, ${day}${suffix} ${monthName}`;
  };

  return {
    checkIn: formatDate(checkIn),
    checkOut: formatDate(checkOut),
  };
};

export const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getDateWithOffset = (timestamp, daysToAdd) => {
  const date = new Date(timestamp);
  date.setDate(date.getDate() + daysToAdd);

  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^|;\\s?)${name}=([^;]*)`));
  return match && match[2] ? unescape(match[2]) : undefined;
};

export const loggedIn = () => {
  return getCookie('TLUSERSIGNEDIN') === '1';
};

export const highlightSearchTerm = (text, term) => {
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, `<mark>$1</mark>`);
};