import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const data = {
  Delivery: {
    title: 'Delivery',
    subTitle: '',
    icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12C22 11.7 21.9 11.45 21.75 11.2L19.35 7.44995C19.1 7.04995 18.7 6.79995 18.2 6.79995H15.25V4.79995C15.25 4.29995 14.85 3.94995 14.4 3.94995H2.85C2.4 3.94995 2 4.34995 2 4.79995V17.2999C2 17.7999 2.4 18.1499 2.85 18.1499H4.5C4.5 18.2999 4.5 18.45 4.5 18.5999C4.5 19.95 5.6 21.0499 6.95 21.0499C8.3 21.0499 9.4 19.95 9.4 18.5999C9.4 18.45 9.4 18.3 9.35 18.2H14.5C14.5 18.35 14.45 18.5 14.45 18.5999C14.45 19.95 15.55 21.0499 16.9 21.0499C18.25 21.0499 19.35 19.95 19.35 18.5999C19.35 18.45 19.35 18.3 19.3 18.2H21.05C21.55 18.2 21.9 17.7999 21.9 17.3499L22 12ZM6.95 20.2999C6 20.2999 5.25 19.5499 5.25 18.5999C5.25 18.3499 5.3 18.15 5.4 17.95C5.65 17.35 6.25 16.95 6.95 16.95C7.65 16.95 8.25 17.35 8.5 17.95C8.6 18.15 8.65 18.4 8.65 18.5999C8.65 19.4999 7.9 20.2999 6.95 20.2999ZM16.95 20.2999C16 20.2999 15.25 19.5499 15.25 18.5999C15.25 18.3499 15.3 18.15 15.4 17.95C15.65 17.35 16.25 16.95 16.95 16.95C17.65 16.95 18.25 17.35 18.5 17.95C18.6 18.15 18.65 18.4 18.65 18.5999C18.65 19.4999 17.9 20.2999 16.95 20.2999ZM21.2 17.2999C21.2 17.3499 21.15 17.3999 21.1 17.3999H19.05C18.6 16.6499 17.8 16.1499 16.9 16.1499C16 16.1499 15.2 16.6499 14.75 17.3999H9.1C8.65 16.6499 7.85 16.1499 6.95 16.1499C6.05 16.1499 5.25 16.6499 4.8 17.3999H2.85C2.8 17.3999 2.75 17.3499 2.75 17.2999V4.79995C2.75 4.74995 2.8 4.69995 2.85 4.69995H14.4C14.45 4.69995 14.5 4.74995 14.5 4.79995V7.59995H18.2C18.4 7.59995 18.6 7.69995 18.7 7.84995L21.1 11.65V11.7C21.15 11.8 21.2 11.9 21.2 12.05V17.2999Z" fill="black"/>
    <path d="M14.8999 8.35034V11.9503H20.4999L18.1999 8.35034H14.8999ZM15.5999 11.2503V9.05034H17.8499L19.2499 11.2503H15.5999Z" fill="black"/>
    </svg>`,
    additionalInfo: '*All items will be delivered to 1 address.',
    details: [
      {
        deliveryType: 'UK Standard Delivery',
        deliveryDescription: '<b>3-5 working days</b> (Please allow an extra day for deliveries to NI, Highlands and Islands).',
        priceOne: '<b>£3.95</b> for 1 item',
        priceTwo: '<b>£4.95*</b> for 2 or more items'
      },
      {
        deliveryType: 'UK Next Day Delivery',
        deliveryDescription: '<b>Order by 6pm</b> (Excludes NI, Highlands and Channel Islands).',
        priceOne: '<b>£4.95</b> for 1 item',
        priceTwo: '<b>£5.95*</b> for 2 or more items'
      },
      {
        deliveryType: 'UK Saturday Delivery',
        deliveryDescription: '<b>Order by 4pm Friday</b> (Excludes Bank Holiday Friday; excludes NI, Highlands and Channel Islands).',
        priceOne: '<b>£4.95</b> for 1 item',
        priceTwo: '<b>£5.95</b>* for 2 or more items'
      },
      {
        deliveryType: 'UK Nominated Day Delivery',
        deliveryDescription: 'Select a preferred delivery date by using the <span>"Change Date"</span> calendar at the checkout. This will adjust based on your chosen delivery option.',
        priceOne: '<b>Depending on the selected delivery option</b>',
        priceTwo: ''
      }
    ]
  },

  ClickAndCollect: {
    title: 'Click & Collect',
    subTitle: '',
    icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5 11.0091L19.3 5.00906C19.1 4.70906 18.7 4.40906 18.3 4.40906H5.69998C5.29998 4.40906 4.89998 4.70906 4.79998 5.10906L2.59998 11.1091C2.29998 11.7091 2.69998 12.4091 3.39998 12.4091H3.99998V19.4091C3.99998 19.9091 4.39998 20.4091 4.99998 20.4091H15V13.9091C15 13.6091 15.2 13.4091 15.5 13.4091H18.5C18.8 13.4091 19 13.6091 19 13.9091V20.4091C19.5 20.4091 20 19.9091 20 19.4091V12.4091H20.6C21.3 12.4091 21.7 11.7091 21.5 11.0091ZM14 17.9091C14 18.2091 13.8 18.4091 13.5 18.4091H5.49998C5.19998 18.4091 4.99998 18.2091 4.99998 17.9091V13.9091C4.99998 13.6091 5.19998 13.4091 5.49998 13.4091H13.5C13.8 13.4091 14 13.6091 14 13.9091V17.9091ZM20 11.4091H3.99998H3.39998L5.59998 5.40906H18.2L20.4 11.4091H20Z" fill="black"/>
    </svg>`,
    additionalInfo: '',
    details: [
      {
        deliveryType: 'Items From Store Stock',
        deliveryDescription: 'Available for collection within 2 hours of the order being placed.',
        priceOne: '<b>FREE</b> on orders over £20',
        priceTwo: '<b>£0.95</b> on orders under £20'
      },
      {
        deliveryType: 'Items From Warehouse Stock',
        deliveryDescription: 'If your Click & Collect item(s) are not in store stock, we can deliver them from our warehouse to your chosen store for collection.',
        priceOne: '<b>FREE</b> on orders over £20',
        priceTwo: '<b>£0.95</b> on orders under £20'
      }
    ]
  },

  WhooshInstantGift: {
    title: 'WHOOSH Instant Gift By Text',
    subTitle: 'The gift recipient will receive a beautiful image of their gift and can choose when and where they’d like it delivered — with delivery costs covered by the sender.',
    icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.6 23.0499H6.40001C5.04901 23.0499 3.95001 21.951 3.95001 20.6V4.39995C3.95001 3.04895 5.04901 1.94995 6.40001 1.94995H13.6C14.952 1.94995 16.05 3.04895 16.05 4.39995V8.09995H14.95V4.39995C14.95 3.75095 14.433 3.04995 13.599 3.04995H6.40001C5.56601 3.04995 5.05001 3.75095 5.05001 4.39995V20.6C5.05001 21.249 5.56601 21.951 6.40001 21.951H13.6C14.249 21.951 14.951 21.434 14.951 20.6V14.1H16.051V20.6C16.05 21.951 14.951 23.0499 13.6 23.0499Z" fill="black"/>
    <path d="M11.4 4.60034H8.70001C8.42401 4.60034 8.20001 4.37634 8.20001 4.10034C8.20001 3.82434 8.42401 3.60034 8.70001 3.60034H11.4C11.676 3.60034 11.9 3.82434 11.9 4.10034C11.9 4.37634 11.676 4.60034 11.4 4.60034Z" fill="black"/>
    <path d="M12.6168 16.7326C12.4788 16.7326 12.3538 16.6956 12.2428 16.6276C12.0278 16.4936 11.8998 16.2596 11.8998 15.9996V14.7996H11.4998C10.6728 14.7996 9.99982 14.1266 9.99982 13.2996V9.29956C9.99982 8.47256 10.6728 7.79956 11.4998 7.79956H18.4998C18.9608 7.79956 19.3818 7.99956 19.6528 8.34656C19.8658 8.61856 19.9538 8.94356 19.8998 9.25056V13.1996C19.8998 14.0266 19.2268 14.6996 18.3998 14.6996H15.5998C15.5968 14.6996 15.5958 14.6976 15.5958 14.6976L13.1028 16.5976C12.9268 16.6896 12.7648 16.7326 12.6168 16.7326ZM11.4998 8.79956C11.2598 8.79956 10.9998 8.99056 10.9998 9.29956V13.2996C10.9998 13.5396 11.1908 13.7996 11.4998 13.7996H12.1998C12.5728 13.7996 12.8998 14.1266 12.8998 14.4996V15.5056L14.9968 13.9016C15.1938 13.6996 15.4678 13.6996 15.5998 13.6996H18.3998C18.6398 13.6996 18.8998 13.5086 18.8998 13.1996L18.9148 9.07856C18.9178 9.06756 18.9108 9.01956 18.8658 8.96256C18.7858 8.86056 18.6488 8.79956 18.4998 8.79956H11.4998ZM15.6508 14.6546L15.6178 14.6796C15.6298 14.6726 15.6428 14.6636 15.6508 14.6546Z" fill="black"/>
    </svg>`,
    additionalInfo: 'For more information, please <a href="/uk/gift-by-text-faq.html">click here.</a>',
    details: [
      {
        deliveryType: 'UK Standard Delivery',
        deliveryDescription: 'Delivered onto the recipient’s smartphone within minutes, with delivery costs pre-paid by the sender.',
        priceOne: '<b>£3.95</b> per gift',
        priceTwo: ''
      },
      {
        deliveryType: 'Delivery Option Upgrades',
        deliveryDescription: 'If the gift recipient chooses Nominated, Next-Day, or Saturday Delivery, £3.95 will be deducted from the total cost of their upgraded delivery option.',
        priceOne: '<b>Depending on the selected delivery option</b>',
        priceTwo: ''
      }
    ]
  }
};

const faqData = [
  {
    question: "How can I include delivery instructions with my order?",
    answer: "At the time of ordering you can also provide us with a contact telephone number and delivery instructions that may help our carrier once your order has been despatched. Typically, this could include leaving an order with a neighbour or perhaps in a safe place if you are not home. We will pass your contact telephone number and delivery instructions on to our carrier to aid delivery – who will then either call the contact number provided or leave a card to let you know where to find your order if it has been left, or what to do next if we have missed you. Please note the contact number you provide will not be used for marketing purposes.Also, any Delivery Instruction you give will not be read by our team prior to your order being despatched, and should only be intended to aid our carrier once they are in receipt of your order. Please note we would recommend that you do not send your order to a PO Box (larger or multiple item orders sent to a PO Box address may not be delivered)."
  },
  {
    question: "Do you deliver to BFPO addresses?",
    answer: "We will make every effort to deliver your order to any given BFPO address.The British Forces Post Office (or British Field Post Office) (BFPO) is an agency that provides a postal service to HM Forces, separate from that provided by Royal Mail. BFPO addresses are used for the delivery of mail in the UK and around the world.When sending mail from the UK to a member of HM Forces serving overseas, the sender must address it to the appropriate BFPO number and not to the country in which that person is based."
  },
  {
    question: "How will my order be packed, and what gifting options do you offer?",
    answer: `Gift Box orders: Every gift box / hamper will be delivered in our protective, specially printed packaging to ensure it arrives in the best possible condition. Our gift boxes / hampers are made to order by our dedicated team, and may take slightly longer to prepare during our peak trading times. Whilst we make every effort to despatch all gift boxes/hampers when requested, we cannot guarantee Next Day Delivery if ordered after 14:00, or if the quantity is over fifteen. For Corporate gift box/hamper enquiries please contact the corporate team on 03444 93 10 10.<br><br>
    We make every effort to ensure your order arrives in perfect condition. This may include the use of Ecoflo; a unique packing material designed to protect your goods whilst in transit. Afterwards, you can re-use, compost or recycle it in accordance with current environmental regulations.`
  },
  {
    question: "How can I track my order?",
    answer: `To track the progress of your order please visit your Order History under My Account and view the order details. We will also tell you of any changes or important delivery details affecting your order. Alternatively, our team are ready to help.`
  },
  {
    question: "Adverse Weather Conditions",
    answer: `We will always make every effort to deliver your order on time. Occasionally, we are affected by factors that are beyond our control, such as bad weather. Should this happen, we will update our website with details of any delays we are experiencing.`
  },
  {
    question: "My question isn’t listed",
    answer: "We are here to help. For general enquiries, please visit our <a href='/uk/help/FAQs.html'>Help Centre FAQs</a>. If you have an urgent enquiry, please visit the <a href='/uk/help/contact-us'>Contact Us</a> page or talk to us using the Live Chat."
  }
];

const accordionHTML = `
  <div class="${ID}__accordion-container" id="accordion">
    <div class="${ID}__accordion-title">Additional Information</div>
    ${faqData.map((item, index) => `
      <div class="accordion-item">
        <div class="accordion-header" data-index="${index}">
          ${item.question}
          <span class="accordion-icon">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4.5L16 12.5L8 20.5" stroke="black" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
          </span>
        </div>
        <div class="accordion-content" id="content-${index}">
          ${item.answer}
        </div>
      </div>
    `).join("")}
  </div>
`;

const deliveryContainer = () => {
  const htmlStr = Object.keys(data).map(sectionKey => {
    const section = data[sectionKey];

    return `
      <div class="delivery-wrapper" data-section="${section.title}">
        <div class="delivery-header">
          <div class="icon">${section.icon}</div>
          <div class="delivery-title">${section.title}</div>
        </div>
        <div class="delivery-subtitle">${section.subTitle}</div>
        <div class="grid-container">
          ${section.details.map(detail => `
            <div class="grid-title">${detail.deliveryType}</div>
            <div class="grid-description">${detail.deliveryDescription}</div>
            <div class="grid-price">${detail.priceOne}<br>${detail.priceTwo}</div>
          `).join('')}
        </div>
        <div class="additional-info">${section.additionalInfo}</div>
      </div>
    `;
  }).join('');

  return htmlStr;
};

const init = () => {
  const container = `<div class="${ID}__delivery-container">
    <div class="${ID}__delivery-info">Delivery Information</div>
    ${deliveryContainer()}
    ${accordionHTML}
  </div>`;

  document.querySelector('.content-container').insertAdjacentHTML('afterbegin', container);
};

export default () => {

  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener("click", (e) => {
    const header = e.target.closest(".accordion-header");
    if (!header) return;

    const index = header.dataset.index;
    const content = document.getElementById(`content-${index}`);
    const icon = header.querySelector(".accordion-icon");

    content.classList.toggle("open");
    icon.classList.toggle("rotate");
  });

  if (VARIATION == 'control') {
    return;
  }

  init();
};
