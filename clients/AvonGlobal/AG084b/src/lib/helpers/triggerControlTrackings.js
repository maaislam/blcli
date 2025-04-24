const triggerControlTrackingss = (target, fireEvent) => {
  const userIsAttched = !!PDP_MANAGER['API_DATA']['rep_id'];
  const btnContainer = !userIsAttched
    ? '.checkout_send_to_rep_section .actions .button_wrapper'
    : '.checkout_shopping_with_section';
  const buttons = (serial) => btnContainer + `:nth-child(${serial}) button`;
  if (target.matches(buttons(1)) && userIsAttched) {
    fireEvent(
      `Attached customer clicks ${target.innerText.trim() === `Отправить Представителю` ? 'send to rep' : 'checkout online'}`
    );
  } else if (target.matches(buttons(2)) && userIsAttched) {
    fireEvent('Attached customer clicks send to rep');
  } else if (target.matches(buttons(1)) && !userIsAttched) {
    fireEvent(`Unattached customer clicks button - paid delivery`);
  } else if (target.matches(buttons(2)) && !userIsAttched) {
    fireEvent(`Unattached customer clicks share button - whatsapp`);
  } else if (target.matches(buttons(3)) && !userIsAttched) {
    fireEvent(`Unattached customer clicks share button - email`);
  } else if (target.matches(buttons(4)) && !userIsAttched) {
    fireEvent(`Unattached customer clicks share button - copy`);
  } else if (target.matches('button.btn_continue') && !userIsAttched) {
    fireEvent(`Clicks “Continue Shopping”`);
  }
};

export default triggerControlTrackingss;
