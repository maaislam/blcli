import shared from '../../../../../../core-files/shared';
const { ID } = shared;

const deliveryMsg = (deleiveryDateParsed) => {
  const htmlStr = `<div class="${ID}__delivery_availability_msg">${deleiveryDateParsed[0].parsedDate}</div>`;

  return htmlStr.trim();
};
export default deliveryMsg;
