const triggerControlTrackingss = (target, fireEvent) => {
  const userIsAttched = !!PDP_MANAGER['API_DATA']['rep_id'];
  // const btnContainer = !userIsAttched ? '.checkout_send_to_rep_section .actions button' : '.checkout_shopping_with_section';
  // const buttons = (serial) => btnContainer + `:nth-child(${serial})`;

  const targetMatcher = (btnText) =>
    target.innerText.indexOf(btnText) !== -1 && (target.matches('button') || target.closest('button'));
  //console.log(targetMatcher('REP'));
  if (targetMatcher('online') && userIsAttched) {
    fireEvent('Attached customer clicks to checkout online');
  } else if (userIsAttched && (targetMatcher('rep') || targetMatcher('Rep'))) {
    fireEvent('Attached customer clicks to send to rep');
  } else if (targetMatcher('WhatsApp') && !userIsAttched) {
    fireEvent(`Unattached customer clicks share button - whatsapp`);
  } else if (targetMatcher('Copy') && !userIsAttched) {
    fireEvent(`Unattached customer clicks share button - copy`);
  } else if (targetMatcher('Email') && !userIsAttched) {
    fireEvent(`Unattached customer clicks share button - email`);
  } else if (targetMatcher('REP') && !userIsAttched) {
    fireEvent(`Unattached customer clicks share button - send to avon rep`);
  } else if (targetMatcher('Pay online') && !userIsAttched) {
    fireEvent(`Unattached customer clicks share button - Pay online now`);
  }
};

export default triggerControlTrackingss;
