import { fireEvent } from '../../../../../core-files/services';

export const onFormPage = () => {
  const paramsToObject = (entries) => {
    const result = {};
    for (const [key, value] of entries) result[key] = value;
    return result;
  };
  const urlParams = new URLSearchParams(window.location.search);
  const entries = urlParams.entries();
  const params = paramsToObject(entries);

  if (!params.paketeid || !params.hardware) return;

  const titleElement = document.querySelector(
    '#configure > section.py-4.py-md-5.checkout-main-header.bg-blue2 > div > div > div > h1'
  );

  if (titleElement)
    titleElement.textContent =
      'Bitte bestätige deine Paket- und Hardware-Auswahl.';

  setTimeout(() => {
    if (Number(params.paketeid) === 3) {
      document
        .querySelector(
          '#PropositionOfferMainProduct > div.col > div:nth-child(1)'
        )
        ?.children?.[0]?.click?.();
      fireEvent('Interaction - user redirected with selected HD Austria Kombi');
    }

    if (Number(params.paketeid) === 2) {
      document
        .querySelector(
          '#PropositionOfferMainProduct > div.col > div:nth-child(2)'
        )
        ?.children?.[0]?.click?.();
      fireEvent('Interaction - user redirected with selected HD Austria Plus');
    }

    if (Number(params.paketeid) === 1) {
      document
        .querySelector(
          '#PropositionOfferMainProduct > div.col > div:nth-child(3)'
        )
        ?.children?.[0]?.click?.();
      fireEvent('Interaction - user redirected with selected HD Austria');
    }
  }, 1000);

  setTimeout(() => {
    if (params.hardware === 'modul') {
      document
        .querySelector('#PropositionOfferHardware > div.col > div:nth-child(1)')
        ?.children?.[0]?.click?.();
      fireEvent(
        'Interaction - user redirected with selected hardware HD Austria SAT-Modul'
      );
    }

    if (params.hardware === 'receiver') {
      document
        .querySelector('#PropositionOfferHardware > div.col > div:nth-child(2)')
        ?.children?.[0]?.click?.();
      fireEvent(
        'Interaction - user redirected with selected hardware HD Austria SAT-Receiver'
      );
    }
  }, 2000);
};
