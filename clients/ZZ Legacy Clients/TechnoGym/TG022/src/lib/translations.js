//Italian/English Content
var pathName = window.location.pathname;
var textConfig;

if(pathName.indexOf('/it/') > -1){
  textConfig = {
    'contactMessageText': 'Hai bisogno di aiuto?',
    'businessText': 'Prodotti per il Business',
    'personalText': 'Prodotti per la casa',
    'radio1Text': 'Voglio acquistare',
    'radio2Text': 'Vorrei maggiori informazioni',
    'radio3Text': 'Ho una domanda',
    'nameLabel':'Nome',
    'lastLabel':'Cognome',
    'phoneLabel': 'Telefono',
    'email': 'e-mail',
    'message': 'commento',
    'errorBlock1':"Per favore selezionate un'opzione",
    'errorBlock2':'Si prega di compilare tutti i campi',
    'continueMessage':'Continua',
    'sendMessage':'Inviare',
    'BusinessFreeText': 'Nome della società / Settore',
    'BusinessPlaceholder': 'Nome della società / Settore *',
    'ThanksMessage' :'Grazie',
    'ThanksSubmessage':'ti contatteremo prima possibile'
  }
}else{
    textConfig = {
        'contactMessageText': 'Need advice?',
        'businessText': 'On products for the business',
        'personalText': 'On products for the home',
        'radio1Text': 'I want to buy',
        'radio2Text': 'I want more information',
        'radio3Text': 'I have a question',
        'nameLabel':'First Name',
        'lastLabel':'Last Name',
        'phoneLabel': 'Phone',
        'email': 'Email',
        'message': 'Message',
        'errorBlock1':'Please select an option',
        'errorBlock2':'Please fill in all fields',
        'continueMessage':'Continue',
        'sendMessage':'Send',
        'BusinessFreeText': 'Please let us know what industry you are in and what your company name is...',
        'BusinessPlaceholder': 'Company name / industry *',
        'ThanksMessage' :'Thank You',
        'ThanksSubmessage':'someone will be in touch soon.'
      }
}

export {textConfig}
