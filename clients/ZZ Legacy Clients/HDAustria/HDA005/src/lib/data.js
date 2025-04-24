const ref = 'https://ucds.ams3.digitaloceanspaces.com/HDA-005';

export const satTvPaketeSteps = [
  {
    id: 1,
    image: `${ref}/ninja_warrior_f_puls4.jpg`,
    premiumText: null, //on top of the component
    color: '#C80000',
    freeMonthsText: '3 Monate gratis',
    name: 'HD Austria',
    nameBelowText: null,
    price: '€ 10,90',
    priceBefore: null,
    priceBelowText: 'pro Monat',
    aboveDescriptionCopy: null,
    descriptions: [
      'Mehr als 80 HD-Sender inklusive UHD',
      '70+ TV-Sender unterwegs am Handy, Tablet oder Laptop',
    ],
    descriptionsBelowText:
      'Du kannst deine Empfangsgeräte im nächsten Schritt hinzufügen.',
    tvImages: [
      `${ref}/Image%205.jpg`,
      `${ref}/Image%206.jpg`,
      `${ref}/Image%207.jpg`,
      `${ref}/Image%208.jpg`,
      `${ref}/Image%209.jpg`,
    ],
    ctaText: 'Auswählen',
    ctaUrl: null,
  },
  {
    id: 2,
    image: `${ref}/ystone.jpg`,
    premiumText: 'Bestseller', //on top of the component
    color: '#FF4B00',
    freeMonthsText: '3 Monate gratis',
    name: 'HD Austria Plus',
    nameBelowText: null,
    price: '€ 14,90',
    priceBefore: null,
    priceBelowText: 'pro Monat',
    aboveDescriptionCopy: null,
    descriptions: [
      'Mehr als 80 HD-Sender inklusive UHD',
      '<b>+ 15 Premium-Sender</b> für mehr Unterhaltung, Kabel Eins CLASSICS und SAT.1 Emotions inklusive',
      'Schaue mehr als 80 TV-Sender unterwegs am Handy, Tablet oder Laptop',
    ],
    descriptionsBelowText:
      'Du kannst deine Empfangsgeräte im nächsten Schritt hinzufügen.',
    tvImages: [
      `${ref}/Image%2010.jpg`,
      `${ref}/Image%2011.jpg`,
      `${ref}/Image%2012.jpg`,
      `${ref}/Image%2013.jpg`,
      `${ref}/Image%209.jpg`,
    ],
    ctaText: 'Auswählen',
    ctaUrl: null,
  },
  {
    id: 3,
    image: `${ref}/fbi.jpg`,
    premiumText: 'Premium-Paket: die meisten Sender', //on top of the component
    color: '#140087',
    freeMonthsText: '3 Monate gratis',
    name: 'HD Austria Kombi',
    nameBelowText: null,
    price: '€ 19,90',
    priceBefore: null,
    priceBelowText: 'pro Monat',
    aboveDescriptionCopy: null,
    descriptions: [
      'HD Austria Premium-Paket mit den besten Serien, Filmen und On Demand Serien inklusive - da ist für jeden was dabei!',
      '+ 80 HD-Sender inklusive UHD',
      '<b>+ 40 Premium-Sender</b> für mehr Unterhaltung, Sony Channel und Video on Demand inklusive',
      '<b>+ 100 TV-Sender</b> unterwegs am Handy, Tablet oder Laptop',
    ],
    descriptionsBelowText:
      'Du kannst deine Empfangsgeräte im nächsten Schritt hinzufügen.',
    tvImages: [
      `${ref}/Image%2014.jpg`,
      `${ref}/Image%2015.jpg`,
      `${ref}/Image%2016.jpg`,
      `${ref}/Image%2017.jpg`,
      `${ref}/Image%209.jpg`,
    ],
    ctaText: 'Auswählen',
    ctaUrl: null,
  },
];

export const tvAppPaketeSteps = [
  {
    id: 4,
    image: `${ref}/ninja_warrior_m_puls4.jpg`,
    premiumText: 'Bestseller', //on top of the component
    color: '#FF4B00',
    freeMonthsText: '30 Tage gratis',
    name: 'HD Austria Plus',
    nameBelowText: '6 Monate lang',
    price: '€ 9,90',
    priceBefore: null,
    priceBelowText: 'pro Monat (statt € 14,90)',
    aboveDescriptionCopy: null,
    descriptions: [
      'Mehr als 80 TV-Sender in einer App',
      'Auf bis zu 5 Geräten gleichzeitig streamen',
      'Sendungen neu starten und tausende Filme abrufen',
      'Mit allen österreichischen Programmen, sowie den besten deutschen Sendern',
      'Highlights der letzten 7 Tage abrufen',
    ],
    descriptionsBelowText: '&nbsp;',
    tvImages: [
      `${ref}/Image%2010.jpg`,
      `${ref}/Image%2011.jpg`,
      `${ref}/Image%2012.jpg`,
      `${ref}/Image%2013.jpg`,
      `${ref}/Image%209.jpg`,
    ],
    ctaText: 'Auswählen',
    ctaUrl:
      'https://www.hdaustria.at/daten/producthandlerott/?plusott_30d6mpromo',
  },
  {
    id: 5,
    image: `${ref}/hstarz.jpg`,
    premiumText: 'Die meisten Sender', //on top of the component
    color: '#140087',
    freeMonthsText: '30 Tage gratis',
    name: 'HD Austria Kombi',
    nameBelowText: '6 Monate lang',
    price: '€ 14,90',
    priceBefore: null,
    priceBelowText: 'pro Monat (statt € 19,90)',
    aboveDescriptionCopy: null,
    descriptions: [
      'HD Austria Premium-Paket mit den besten Serien, Filmen und On Demand Serien inklusive - da ist für jeden was dabei!',
      'Mehr als 100 TV-Sender in einer App',
      'Auf bis zu 5 Geräten gleichzeitig streamen',
      'Sendungen neu starten und tausende Filme abrufen',
      'Mit allen österreichischen Programmen, sowie den besten deutschen Sendern',
      'Highlights der letzten 7 Tage abrufen',
    ],
    descriptionsBelowText: '&nbsp;',
    tvImages: [
      `${ref}/Image%2014.jpg`,
      `${ref}/Image%2015.jpg`,
      `${ref}/Image%2016.jpg`,
      `${ref}/Image%2017.jpg`,
      `${ref}/Image%209.jpg`,
    ],
    ctaText: 'Auswählen',
    ctaUrl:
      'https://www.hdaustria.at/daten/producthandlerott/?kombiott_30d6mpromo',
  },
];

/**
 *
 * @param {{
 * id: number;
 * satModul: {
 * before: string;
 * after: string;};
 * satReceiver: {
 * before: string;
 * after: string;
 * };
 * color: string;
 * }} settings
 */
export const getHardwareSteps = (settings) => [
  {
    id: 7,
    image: `${ref}/pakete-new-img.jpg`,
    // image: `${ref}/hd-austria_sat-modul_cam702.webp`,
    premiumText: null,
    color: settings.color,
    freeMonthsText: null,
    name: 'SAT-Modul',
    nameBelowText: null,
    price: settings.satModul.after,
    priceBefore: settings.satModul.before,
    priceBelowText: null,
    aboveDescriptionCopy:
      'Einfach in den Fernseher einstecken, ganz ohne Kabelsalat',
    descriptions: [
      'ORF-Freischaltung und mehr',
      'Mehr als 80 HD-Sender inkl. UHD genießen',
      'Einfache Installation in 60 Sekunden',
      'Kein Receiver mehr notwendig',
      'Keine ORF-Karte notwendig',
      'Einfach bedienen: Alles mit einer Fernbedienung steuern',
    ],
    descriptionsBelowText: null,
    tvImages: [],
    ctaText: 'Auswählen',
    ctaUrl: `https://www.hdaustria.at/hardware/paketauswahl/?paketeid=${settings.id}&hardware=modul`,
  },
  {
    id: 6,
    image: `${ref}/Component%202%20%E2%80%93%201.jpg`,
    premiumText: null,
    color: settings.color,
    freeMonthsText: null,
    name: 'SAT-Receiver',
    nameBelowText: null,
    price: settings.satReceiver.after,
    priceBefore: settings.satReceiver.before,
    priceBelowText: null,
    aboveDescriptionCopy:
      'Über WLAN oder LAN-Kabel mit dem Internet verbinden und zusätzliche Internet-Sender genießen',
    descriptions: [
      'Bester Empfang von ORF HD, allen HD Austria Sendern und vielem, vielem mehr',
      'Schnelle Installation und einfache Bedienung',
      'Sendungen pausieren, auf Knopfdruck wiederholen und tausende Filme abrufen',
      'HDMI-Kabel schon dabei: Receiver gleich an Fernseher anstecken',
    ],
    descriptionsBelowText: null,
    tvImages: [],
    ctaText: 'Auswählen',
    ctaUrl: `https://www.hdaustria.at/hardware/paketauswahl/?paketeid=${settings.id}&hardware=receiver`,
  },
];

export const hardwareSettings = {
  1: {
    id: 1,
    satModul: {
      before: '€ 99',
      after: '€ 39',
    },
    satReceiver: {
      before: '€ 199',
      after: '€ 129',
    },
    color: '#C80000',
  },
  2: {
    id: 2,
    satModul: {
      before: '€ 99',
      after: '€ 19',
    },
    satReceiver: {
      before: '€ 199',
      after: '€ 99',
    },
    color: '#FF4B00',
  },
  3: {
    id: 3,
    satModul: {
      before: '€ 99',
      after: '€ 0',
    },
    satReceiver: {
      before: '€ 199',
      after: '€ 79',
    },
    color: '#140087',
  },
};
