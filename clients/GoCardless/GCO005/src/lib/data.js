const paymentMethodsData = [
  {
    paymentMethod: 'DD',
    header: 'How to collect Direct Debit payments with GoCardless',
    step1: 'Create your free GoCardless account, and explore the GoCardless dashboard',
    step2:
      "Offer Direct Debit payments to your customers through GoCardless. Either via email, or as part of your website's checkout page.",
    step3: 'GoCardless automatically collects payment on the due date. Simple.',
    valueProps: [
      {
        url: '/guides/posts/bacs-payments/',
        title: 'The Complete Guide to Bacs and Bacs Payments',
        imageText:
          '... only 10 or 15 customers were paying by Direct Debit and the rest by Bacs transfer or standing order – leaving us with a lot of payments admin.',
        imageCaption:
          'Bacs payment, Direct Credit, bank transfer. Whatever you call it, late payments are inevitable. Want to ensure you get paid on time, without your customers needing to lift a finger? Try Direct Debit via GoCardless.',
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img3.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#types-of-bacs-payments',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#go-cardless-and-bacs',
        },
      },
      {
        url: '/direct-debit/introduction/',
        title: 'What is Direct Debit?',
        imageText:
          'When we heard about how easy GoCardless made the Direct Debit process we knew it was a no-brainer to start using it',
        imageCaption:
          "Wish your customers paid you on time, every time? You can make that happen with Direct Debit via GoCardless. It's super simple to get started. See why 65,000 businesses from all sorts of industries already trust us to get them paid on time.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img3.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#direct-debit-payments-are-bank-to-bank',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#direct-debit-payments-through-go-cardless',
        },
      },
      {
        url: '/direct-debit/mandates/',
        title: 'Direct Debit mandates',
        imageText:
          'When we heard about how easy GoCardless made the Direct Debit process we knew it was a no-brainer to start using it',
        imageCaption:
          "Wish your customers paid you on time, every time? You can make that happen with Direct Debit via GoCardless. It's super simple to get started. See why 65,000 businesses from all sorts of industries already trust us to get them paid on time.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img3.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#paper-direct-debits',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#direct-debit-mandates-through-go-cardless',
        },
      },
      {
        url: '/direct-debit/payments/',
        title: 'Taking payments by Direct Debit',
        imageText:
          'When we heard about how easy GoCardless made the Direct Debit process we knew it was a no-brainer to start using it <br> - Barbara Gaunt, Office Manager, FD Works',
        imageCaption:
          "Direct Debit can be tricky if you do it all yourself. That's why we created GoCardless as a super simple platform that handles everything for you. You just point your customers to a quick, one-time setup, and GoCardless ensures all your future invoices get paid on time, automatically.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img3.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#submitting-payment-requests-to-the-banks',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#taking-direct-debit-payments-through-go-cardless',
        },
      },
    ],
  },
  {
    paymentMethod: 'ACH',
    header: 'How to collect ACH debit payments with GoCardless',
    step1: 'Create your free GoCardless account, and explore the GoCardless dashboard',
    step2:
      "Offer ACH Debit payments to your customers through GoCardless. Either via email, or as part of your website's checkout page.",
    step3: 'GoCardless automatically collects payment on the due date. Simple.',

    valueProps: [
      {
        url: '/en-us/guides/ach/what-is-an-ach-payment/',
        title: 'What are ACH payments & how do they work?',
        imageText:
          'GoCardless’ ACH solution is exactly what we were looking for. It keeps costs down and gives us more control and visibility over payments.',
        imageCaption:
          "ACH debit lets you automatically collect payments you're owed on the due date. It works with any bank account, and lets you skip the high fees associated with cards. GoCardless makes it super simple to get started.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img5.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#how-long-does-an-ach-payment-take-to-process',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#key-takeaways',
        },
      },
      {
        url: '/en-us/guides/ach/types-of-ach-transfer/',
        title: 'ACH Debit vs ACH Credit: A Comparison',
        imageText:
          'GoCardless’ ACH solution is exactly what we were looking for. It keeps costs down and gives us more control and visibility over payments.',
        imageCaption:
          "ACH debit lets you automatically collect payments you're owed on the due date. It works with any bank account, and lets you skip the high fees associated with cards. GoCardless makes it super simple to get started.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img5.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#types-of-ach-debit',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#direct-deposit-vs-ach-debit',
        },
      },

      {
        url: '/guides/ach/what-is-an-ach-payment/',
        title: 'What are ACH payments & how do they work?',
        imageText:
          'GoCardless’ ACH solution is exactly what we were looking for. It keeps costs down and gives us more control and visibility over payments.',
        imageCaption:
          "ACH debit lets you automatically collect payments you're owed on the due date. It works with any bank account, and lets you skip the high fees associated with cards. GoCardless makes it super simple to get started.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img5.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#types-of-ach-transfers',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#key-takeaways',
        },
      },
      {
        url: '/en-us/guides/ach/what-is-an-ach-routing-number/',
        title: 'What is an ACH routing number?',
        imageText:
          'GoCardless’ ACH solution is exactly what we were looking for. It keeps costs down and gives us more control and visibility over payments.',
        imageCaption:
          "ACH debit lets you automatically collect payments you're owed on the due date. It works with any bank account, and lets you skip the high fees associated with cards. GoCardless makes it super simple to get started.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img1.png',
        contentPos: {
          type: 'afterEnd',
          id: '[data-module-name="articleContent"]>p',
        },
        tablePosition: {
          type: 'afterEnd',
          id: '#how-do-i-find-my-ach-routing-number ~ ul',
        },
      },
      {
        url: '/en-us/guides/posts/talking-to-customers-about-ach-debit/',
        title: 'How to talk to your customers about paying by ACH debit',
        imageText:
          'GoCardless’ ACH solution is exactly what we were looking for. It keeps costs down and gives us more control and visibility over payments.',
        imageCaption:
          "ACH debit lets you automatically collect payments you're owed on the due date. It works with any bank account, and lets you skip the high fees associated with cards. GoCardless makes it super simple to get started.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img4.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#if-you-customer-currently-pays-you-via-bank-transfer-cash-or-cheque',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#if-you-customer-currently-pays-you-via-standing-order-standing-instruction',
        },
      },
    ],
  },
  {
    paymentMethod: 'SEPA',
    header: 'How to collect SEPA Direct Debit payments with GoCardless',
    step1: 'Create your free GoCardless account, and explore the GoCardless dashboard',
    step2:
      "Offer SEPA Direct Debit payments to your customers through GoCardless. Either via email, or as part of your website's checkout page.",
    step3: 'GoCardless automatically collects payment on the due date. Simple.',
    valueProps: [
      {
        url: '/guides/sepa/introduction/',
        title: 'What is SEPA Direct Debit?',
        imageText:
          'When we tried to sell into Europe with just credit card or bank transfer as our payment options, we found it difficult, since the companies we were targeting felt more comfortable with SEPA Direct Debit.',
        imageCaption:
          'With GoCardless, getting your customers set up to pay you via SEPA Direct Debit is quick and easy. One quick online form, then neither of you has to lift a finger for all future payments to be made on time.',
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img5.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#sepa-direct-debit-refers-to-two-schemes',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#sepa-direct-debit-and-go-cardless',
        },
      },
      {
        url: '/guides/sepa/mandates/',
        title: 'SEPA Direct Debit mandates',
        imageText:
          'When we tried to sell into Europe with just credit card or bank transfer as our payment options, we found it difficult, since the companies we were targeting felt more comfortable with SEPA Direct Debit.',
        imageCaption:
          "Getting your customers set up to pay you via SEPA Direct Debit is super simple with GoCardless. Just point them towards our quick, secure online form one time, and that's the mandate complete. No clunky paper or manual record-keeping. We've got you covered.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img4.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#creating-a-mandate',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#sepa-direct-debit-mandates-through-go-cardless',
        },
      },
    ],
  },
  {
    paymentMethod: 'Online Payments',
    header: 'How to collect payments with GoCardless',
    step1: 'Create your free GoCardless account, and explore the GoCardless dashboard',
    step2:
      "Offer Direct Debit payments to your customers through GoCardless. Either via email, or as part of your website's checkout page.",
    step3: 'GoCardless automatically collects payment on the due date. Simple.',
    valueProps: [
      {
        url: '/guides/posts/top-international-payment-gateways/',
        title: 'Top 10 international payment gateways',
        imageText:
          'GoCardless has helped us streamline international payments while maintaining a consistent brand image and reducing payment queries',
        imageCaption:
          'Card payments almost seem like they\'re a default payment method that you "have" to offer to attract international customers. But with GoCardless, you can collect payments directly from your international customers\' bank accounts. Skipping the high card fees.',
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img4.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#best-payment-gateways-for-international-payments',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#we-can-help',
        },
      },
      {
        url: '/guides/posts/online-payment-options/',
        title: 'How to accept payments online',
        imageText:
          'When we heard about how easy GoCardless made the Direct Debit process we knew it was a no-brainer to start using it',
        imageCaption:
          "Wish your customers paid you on time, every time? You can make that happen with Direct Debit via GoCardless. It's super simple to get started. See why 65,000 businesses from all sorts of industries already trust us to get them paid on time.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img2.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#how-to-take-payments-online-via-direct-debit',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#sign-up-to-go-cardless-today-and-start-collecting-direct-debit-payments',
        },
      },
      {
        url: '/guides/online-payments-guide/online-payments-bank-transfer/',
        title: 'How do online payments via bank transfer work?',
        imageText:
          '... only 10 or 15 customers were paying by Direct Debit and the rest by Bacs transfer or standing order – leaving us with a lot of payments admin.',
        imageCaption:
          'Bank transfer, Bacs payment, Direct Credit. Whatever you call it, late payments are inevitable. Want to ensure you get paid on time, without your customers needing to lift a finger? Try Direct Debit via GoCardless.',
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img2.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#how-do-online-payments-via-bank-transfer-work',
        },
        tablePosition: {
          type: 'afterEnd',
          id: '#how-do-online-payments-via-bank-transfer-work ~ ol',
        },
      },
    ],
  },
  {
    paymentMethod: 'Standing Order',
    header: 'How to collect payments with GoCardless',
    step1: 'Create your free GoCardless account, and explore the GoCardless dashboard',
    step2:
      "Offer Standing Order payments to your customers through GoCardless. Either via email, or as part of your website's checkout page.",
    step3: 'GoCardless automatically collects payment on the due date. Simple.',
    valueProps: [
      {
        url: '/guides/posts/guide-to-standing-orders/',
        title: 'Standing orders: A complete guide',
        imageText:
          '... only 10 or 15 customers were paying by Direct Debit and the rest by Bacs transfer or standing order – leaving us with a lot of payments admin.',
        imageCaption:
          "Standing orders can get you paid on time when they work. But they're a hassle for your customer to set up or change. Want a flexible way to automate payment collection from your customers, that puts you in control? Try Direct Debit via GoCardless.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img2.png',
        contentPos: {
          type: 'beforeBegin',
          id: '#accessing-and-setting-up-standing-orders',
        },
        tablePosition: {
          type: 'beforeBegin',
          id: '#standing-order-templates-and-forms',
        },
      },
      {
        url: '/guides/intro-to-direct-debit/standing-order/',
        title: 'Standing Order vs. Direct Debit',
        imageText:
          '... only 10 or 15 customers were paying by Direct Debit and the rest by Bacs transfer or standing order – leaving us with a lot of payments admin.',
        imageCaption:
          "Standing orders can get you paid on time when they work. But they're a hassle for your customer to set up or change. Want a flexible way to automate payment collection from your customers, that puts you in control? Try Direct Debit via GoCardless.",
        imageSource: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCO005/payment_img4.png',
        contentPos: {
          type: 'afterEnd',
          id: '#direct-debit-and-standing-order-are-both-automatic-payment-methods-but-have-some-important-differences ~ h2 ',
        },
        tablePosition: {
          type: 'afterEnd',
          id: '#direct-debit-vs-standing-order ~ ol',
        },
      },
    ],
  },
];

export default paymentMethodsData;
