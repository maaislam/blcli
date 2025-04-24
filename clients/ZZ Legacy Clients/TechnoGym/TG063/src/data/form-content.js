export const formContent = {
  questions_EN: [
    {
      title: 'What\'s your name? ',
      desc: 'Please provide your full name ',
    },
    {
      title: 'Thanks <span class="x-name">[name]</span> <span class="x-surname">[surname]</span>, please provide your email address',
      desc: 'We\'ll only use this to contact you about your quote request',
    },
    {
      title: 'send us a message',
    },
    {
      title: 'Please provide the best number to contact you on.',
      desc: 'Our Wellness Experts will use this to follow up about your quote',
    },
    {
      title: 'Lastly, please tell us a little more about yourself',
    },
    {
      title: 'Thanks <span class="x-name">[name]</span> <span class="x-surname">[surname]</span>, please provide the best number to contact you on',
    },
  ],
  text_EN: [
    'Request a Callback',
    'Send an Email',
    'Request a Quote',
  ],
  choices_EN: [
    'Home use',
    'Business use',
    'Freelance professional',
  ],
  questions_IT: [
    {
      title: 'Qual è il tuo nome?',
      desc: 'Inserisci il nome completo',
    },
    {
      title: 'Grazie <span class="x-name">[name]</span> <span class="x-surname">[surname]</span>, puoi fornirci il tuo indirizzo email?',
      desc: 'Utilizzeremo questi dati per la richiesta preventivo',
    },
    {
      title: 'Inviaci un messaggio',
      desc: 'Fornisci informazioni aggiuntive per il tuo preventivo',
    },
    {
      title: 'Potresti fornirci il tuo numero di telefono?',
      desc: 'I nostri Wellness Expert utilizzeranno questi dati per preparare il tuo preventivo',
      hint: 'Inserire solo numeri',
    },
    {
      title: 'Infine ti chiediamo qualche informazione in più',
    },
    {
      title: 'Qual è il tuo indirizzo email?',
    },
  ],
  text_IT: [
    'Richiedi una Consulenza',
    'Richiedi un preventivo',
    'Inviaci un messaggio',
  ],
  choices_IT: [
    'Per la mia Casa',
    'Per il mio Business',
    'Come Freelance',
  ],
};

export const TabFormData = {
  EN: {
    call: {
      tabLabel: 'Request a Callback',
      tabIcon: 'fa fa-phone',
      formFields: [
        {
          label: 'First Name',
          type: 'text',
          name: 'name',
          id: 'name--call',
          title: 'Name',
          required: true,
          hint: 'Please, provide your Name.',
        },
        {
          label: 'Last Name',
          type: 'text',
          name: 'last-name',
          id: 'surname--call',
          title: 'Last Name',
          required: true,
          hint: 'Please, provide your Last Name.',
        },
        {
          label: 'Phone Number',
          type: 'tel',
          name: 'telephone',
          id: 'telephone--call',
          title: 'Phone',
          required: true,
          hint: 'Please, provide a valid number',
        },
        {
          label: 'About You',
          required: true,
          id: 'use--call',
          select: `
          <div class="TG063_tab-form__inputSelectWrap">
            <select class="TG063_tab-form__inputSelect use--call" required>
              <option value="" disabled selected>---</option>
              <option value="private_individual">Home use</option>
              <option value="business">Business use</option>
              <option value="freelance_professional">Freelance, Professional</option>
            </select>
          </div>
          `,
        },
      ],
      submitButton: 'Call me back',
    },
    mail: {
      tabLabel: 'Send an Email',
      tabIcon: 'fa fa-envelope',
      formFields: [
        {
          label: 'First Name',
          type: 'text',
          name: 'name',
          title: 'First Name',
          id: 'name--mail',
          required: true,
          hint: 'Please, provide your Name.',
        },
        {
          label: 'Last Name',
          type: 'text',
          name: 'last-name',
          id: 'surname--mail',
          title: 'Last Name',
          required: true,
          hint: 'Please, provide your Last Name.',
        },
        {
          label: 'Email Address',
          type: 'email',
          name: 'email',
          id: 'email--mail',
          title: 'Email',
          required: true,
          hint: 'Please, provide a valid email.',
        },
        {
          label: 'Your Message',
          type: 'textarea',
          required: true,
          name: 'content',
          id: 'content--mail',
          title: 'Message',
          hint: 'Write us a message.',
        },
        {
          label: 'About You',
          required: true,
          id: 'use--mail',
          select: `
          <div class="TG063_tab-form__inputSelectWrap">
            <select class="TG063_tab-form__inputSelect use--mail" required>
              <option value="" disabled selected>---</option>
              <option value="private_individual">Home use</option>
              <option value="business">Business use</option>
              <option value="freelance_professional">Freelance, Professional</option>
            </select>
          </div>
          `,
        },
      ],
      submitButton: 'Send message',
    },
    quote: {
      tabLabel: 'Request a Quote',
      tabIcon: 'fa fa-file-text',
      formFields: [
        {
          label: 'First Name',
          type: 'text',
          name: 'name',
          id: 'name--quote',
          title: 'Name',
          required: true,
          hint: 'Please, provide your Name.',
        },
        {
          label: 'Last Name',
          type: 'text',
          name: 'last-name',
          id: 'surname--quote',
          title: 'Last Name',
          required: true,
          hint: 'Please, provide your Last Name.',
        },
        {
          label: 'Phone Number',
          type: 'tel',
          name: 'telephone',
          id: 'telephone--quote',
          title: 'Phone',
          required: true,
          hint: 'Please, provide a valid number',
        },
        {
          label: 'Email Address<br><small>(not mandatory)</small>',
          type: 'email',
          name: 'email',
          id: 'email--quote',
          title: 'Email',
          required: false,
          hint: 'Please, provide a valid email.',
        },
        {
          label: 'Your Message',
          type: 'textarea',
          required: true,
          name: 'content',
          id: 'content--quote',
          title: 'Message',
          hint: 'Write us a message.',
        },
        {
          label: 'About You',
          required: true,
          id: 'use--quote',
          select: `
          <div class="TG063_tab-form__inputSelectWrap">
            <select class="TG063_tab-form__inputSelect use--quote" required>
              <option value="" disabled selected>---</option>
              <option value="private_individual">Home use</option>
              <option value="business">Business use</option>
              <option value="freelance_professional">Freelance, Professional</option>
            </select>
          </div>
          `,
        },
      ],
      submitButton: 'Send request',
    },
  },
  IT: {
    call: {
      tabLabel: 'Richiedi una Consulenza',
      tabIcon: 'fa fa-phone',
      formFields: [
        {
          label: 'Nome',
          type: 'text',
          name: 'name',
          id: 'name--call',
          title: 'Nome',
          required: true,
          hint: 'Inserisci il tuo Nome.',
        },
        {
          label: 'Cognome',
          type: 'text',
          name: 'last-name',
          id: 'surname--call',
          title: 'Cognome',
          required: true,
          hint: 'Inserisci il tuo Cognome.',
        },
        {
          label: 'Telefono',
          type: 'tel',
          name: 'telephone',
          id: 'telephone--call',
          title: 'Telefono',
          required: true,
          hint: 'Inserisci un numero valido.',
        },
        {
          label: 'Sono interessato',
          required: true,
          select: `
          <div class="TG063_tab-form__inputSelectWrap">
            <select class="TG063_tab-form__inputSelect use--call" required>
              <option value="" disabled selected>---</option>
              <option value="private_individual">Per la mia casa</option>
              <option value="business">Per il mio business</option>
              <option value="freelance_professional">Come freelance</option>
            </select>
          </div>
          <div class="TG063_tab-form__inputSelectWrap hid need-business">
            <select class="TG063_tab-form__inputSelect--it business" name="need-business"> 
              <option value="" disabled selected>Settore *</option> 
              <option value="military">Forze Armate</option> 
              <option value="community">Comunità</option> 
              <option value="medical_rehab">Centro Medicale</option> 
              <option value="education">Formazione scolastica</option> 
              <option value="sports">Società Sportive</option> 
              <option value="residential">Immobiliare</option> 
              <option value="corporate">Aziendale</option> 
              <option value="hotels_spas">Hotel e Spa</option> 
              <option value="fitness_club">Fitness Club</option> 
            </select>
          </div>
          <div class="TG063_tab-form__inputBlock hid business-name">

            <input class="TG063_tab-form__input companyName" type="text" name="company" placeholder="Nome dell'azienda">
            
            <i class="fa fa-check-circle TG063_tab-form__validate"></i>
            <i class="fa fa-times-circle TG063_tab-form__error"></i>
            <span class="TG063_tab-form__errorHint">Inserisci il nome della tua Azienda.</span> 
          </div>
          <div class="TG063_tab-form__inputSelectWrap hid need-freelance">
            <select class="TG063_tab-form__inputSelect--it freelance" name="need-freelance"> 
              <option value="">Professione *</option> 
              <option value="architect">Architetto</option> 
              <option value="personal_trainer">Personal Trainer</option> 
              <option value="doctor">Dottore</option> 
              <option value="journalist">Giornalista</option> 
              <option value="other">Altre professioni</option> 
            </select>
          </div>
          `,
        },
      ],
      submitButton: 'Richiamatemi',
    },
    mail: {
      tabLabel: 'Inviaci un messaggio',
      tabIcon: 'fa fa-envelope',
      formFields: [
        {
          label: 'Nome',
          type: 'text',
          name: 'name',
          id: 'name--mail',
          title: 'Nome',
          required: true,
          hint: 'Inserisci il tuo Nome.',
        },
        {
          label: 'Cognome',
          type: 'text',
          name: 'last-name',
          title: 'Last Name',
          id: 'surname--mail',
          required: true,
          hint: 'Inserisci il tuo Cognome.',
        },
        {
          label: 'Email',
          type: 'email',
          name: 'email',
          id: 'email--mail',
          title: 'Email',
          required: true,
          hint: 'Inserisci una Email valida.',
        },
        {
          label: 'Messaggio',
          type: 'textarea',
          required: true,
          name: 'content',
          id: 'content--mail',
          title: 'Messaggio',
          hint: 'Scrivici un messaggio.',
        },
        {
          label: 'Sono interessato:',
          required: true,
          select: `
          <div class="TG063_tab-form__inputSelectWrap">
            <select class="TG063_tab-form__inputSelect use--mail" required>
              <option value="" disabled selected>---</option>
              <option value="private_individual">Per la mia casa</option>
              <option value="business">Per il mio business</option>
              <option value="freelance_professional">Come freelance</option>
            </select>
          </div>
          <div class="TG063_tab-form__inputSelectWrap hid need-business">
            <select class="TG063_tab-form__inputSelect--it business" name="need-business"> 
              <option value="" disabled selected>Settore *</option> 
              <option value="military">Forze Armate</option> 
              <option value="community">Comunità</option> 
              <option value="medical_rehab">Centro Medicale</option> 
              <option value="education">Formazione scolastica</option> 
              <option value="sports">Società Sportive</option> 
              <option value="residential">Immobiliare</option> 
              <option value="corporate">Aziendale</option> 
              <option value="hotels_spas">Hotel e Spa</option> 
              <option value="fitness_club">Fitness Club</option> 
            </select>
          </div>
          <div class="TG063_tab-form__inputBlock hid business-name">

            <input class="TG063_tab-form__input companyName" type="text" name="company" placeholder="Nome dell'azienda">
            
            <i class="fa fa-check-circle TG063_tab-form__validate"></i>
            <i class="fa fa-times-circle TG063_tab-form__error"></i>
            <span class="TG063_tab-form__errorHint">Inserisci il nome della tua Azienda.</span> 
          </div>
          <div class="TG063_tab-form__inputSelectWrap hid need-freelance">
            <select class="TG063_tab-form__inputSelect--it freelance" name="need-freelance"> 
              <option value="">Professione *</option> 
              <option value="architect">Architetto</option> 
              <option value="personal_trainer">Personal Trainer</option> 
              <option value="doctor">Dottore</option> 
              <option value="journalist">Giornalista</option> 
              <option value="other">Altre professioni</option> 
            </select>
          </div>
          `,
        },
      ],
      submitButton: 'Invia Messaggio',
    },
    quote: {
      tabLabel: 'Richiedi un preventivo',
      tabIcon: 'fa fa-file-text',
      formFields: [
        {
          label: 'Nome',
          type: 'text',
          name: 'name',
          id: 'name--quote',
          title: 'Nome',
          required: true,
          hint: 'Inserisci il tuo Nome.',
        },
        {
          label: 'Cognome',
          type: 'text',
          name: 'last-name',
          id: 'surname--quote',
          title: 'Last Name',
          required: true,
          hint: 'Inserisci il tuo Cognome.',
        },
        {
          label: 'Telefono',
          type: 'tel',
          name: 'telephone',
          id: 'telephone--quote',
          title: 'Telefono',
          required: true,
          hint: 'Inserisci un numero valido.',
        },
        {
          label: 'Email<br><small>(opzionale)</small>',
          type: 'email',
          name: 'email',
          id: 'email--quote',
          title: 'Email',
          required: false,
          hint: 'Inserisci una Email valida.',
        },
        {
          label: 'Messaggio',
          type: 'textarea',
          required: true,
          name: 'content',
          id: 'content--quote',
          title: 'Messaggio',
          hint: 'Scrivici un messaggio.',
        },
        {
          label: 'Sono interessato',
          required: true,
          select: `
          <div class="TG063_tab-form__inputSelectWrap">
            <select class="TG063_tab-form__inputSelect use--quote" required>
              <option value="" disabled selected>---</option>
              <option value="private_individual">Per la mia casa</option>
              <option value="business">Per il mio business</option>
              <option value="freelance_professional">Come freelance</option>
            </select>
          </div>
          <div class="TG063_tab-form__inputSelectWrap hid need-business">
            <select class="TG063_tab-form__inputSelect--it business" name="need-business"> 
              <option value="" disabled selected>Settore *</option> 
              <option value="military">Forze Armate</option> 
              <option value="community">Comunità</option> 
              <option value="medical_rehab">Centro Medicale</option> 
              <option value="education">Formazione scolastica</option> 
              <option value="sports">Società Sportive</option> 
              <option value="residential">Immobiliare</option> 
              <option value="corporate">Aziendale</option> 
              <option value="hotels_spas">Hotel e Spa</option> 
              <option value="fitness_club">Fitness Club</option> 
            </select>
          </div>
          <div class="TG063_tab-form__inputBlock hid business-name">

            <input class="TG063_tab-form__input companyName" type="text" name="company" placeholder="Nome dell'azienda">
            
            <i class="fa fa-check-circle TG063_tab-form__validate"></i>
            <i class="fa fa-times-circle TG063_tab-form__error"></i>
            <span class="TG063_tab-form__errorHint">Inserisci il nome della tua Azienda.</span> 
          </div>
          <div class="TG063_tab-form__inputSelectWrap hid need-freelance">
            <select class="TG063_tab-form__inputSelect--it freelance" name="need-freelance"> 
              <option value="">Professione *</option> 
              <option value="architect">Architetto</option> 
              <option value="personal_trainer">Personal Trainer</option> 
              <option value="doctor">Dottore</option> 
              <option value="journalist">Giornalista</option> 
              <option value="other">Altre professioni</option> 
            </select>
          </div>
          `,
        },
      ],
      submitButton: 'Invia richiesta',
    },
  },
};
