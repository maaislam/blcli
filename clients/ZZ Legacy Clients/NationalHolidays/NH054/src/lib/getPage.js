export default () => {
  const pathname = window.location.pathname;
  let pageIs = '';
  if (pathname.indexOf('Availability.aspx') > -1) {
    pageIs = 'availability';
  } else if (pathname.indexOf('Passengers.aspx') > -1) {
    pageIs = 'passengers';
  } else if (pathname.indexOf('SeatPlan.aspx') > -1) {
    pageIs = 'seating';
  } else if (pathname.indexOf('Payment.aspx') > -1) {
    pageIs = 'payment';
  }

  return pageIs;
};