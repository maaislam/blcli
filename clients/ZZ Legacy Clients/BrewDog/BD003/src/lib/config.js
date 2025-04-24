export const config = {
    welcome: "Sorry, we don't recognise that code! If you’re trying to use your WELCOME10 discount, make sure you’ve created an account and are logged in.",
    untap: "Sorry, that promotion isn't currently live. Please continue to checkout.",
    x: "If you're an Equity Punk, you'll need to login to use this code.",
    punk: "Sorry, that code isn't valid! If you're an Equity Punk you should have received your unique customer code.",
    nhs: "Sorry, this code isn't valid outside of the BrewDog Now service.",
    welTypo: "Sorry, we don't recognise that code! If you’re trying to use your WELCOME10 discount, make sure you’ve typed it correctly and logged in.",
    typo: "Sorry, we don't recognise that code - check there aren't any spaces or typos!",
    typoTwo: "Sorry, we don't recognise that code. Please check your code again, or continue to checkout.",
    space: "Sorry, we don't recognise that code - check there aren't any spaces or typos!",
};


export const matchWelcome = (string) => {
    var arr = ['WELC', 'WELCO', 'WELCOM', 'WELCOME', 'WELCOME 10','WELCOME20','WELCOME','WELCOME15','WELCOM10','WELCONE10','WELCOME TO PLANET BREWDOG','WELCOME10 ','WELCOME5','WELCOMR10','WELLCOME10','WELXOME10','WELCOMBE10','WELCOME50','WELCOMETONOW','WELCOME1','WELCOME19','YOUR WELCOME10 ','10WELCOME','WELCOME 10%','WELCOME01','WELCOME10%','WELCOME25','WELCOMETEN','AWELCOME10','AWEWELCOME10','EELCOME','I WELCOME10','WE(COME10','WEKCOME10','WEL OME10','WELCLME10','WELCO.E','WELCOLM10','WELCOLME10','WELCOM20','WELCOMB10','WELCOME 10.','WELCOME 10WELCOMBE10','WELCOME 20','WELCOME TO NOW','WELCOME,10','WELCOME!','WELCOME!)','WELCOME0','WELCOME12','WELCOME18','WELCOME1P','WELCOME30','WELCOME40','WELCOMEBK15','WELCOMECODE10','WELCOMEQP','WELCOMETEM','WELCPME+0','WELDOME10','WELL ME10','WELLCONE10','WELOCME10','WELOCOM10','WELOCOME10','WEPCOME10','WFHBEERS'];
    if (arr.includes(string.toUpperCase())) return true;
}

export const matchNHS = (string) => {
    var arr = ['NHS', 'COLLECT', 'DRIVETHRU', 'DRIVETHRU30','NHS50','NHSDELIVERY','NHSDELIVERY1948','NHSHIPA','NHS20','NHS10','COLLECTNHS','NHSGGC','NHSHEROES','DRIVETHRUNHS','NHSDOGI','NHSD0GI','NHSDRIVETHRU','NHS.NET','NHS30','NHSRMCH','NHSTR0PNEIPA','DRIVETHURNHS','NHS DISCOUNT','NHS19','NHSAF','NHSDISCOUNT1948','NHSDOG1','NHSDRIVETHRU30','NHSIPA','NHSNEIPA','THANKSNHS','THANKYOUNHS','WELOVETHENHS20','20NHS','BREWDOGNHS','C.BLOY@NHS.NET','CHODGE@NHS.NET','JENNIE.MNER@NHS.NET','JOHNNY.WELLS@NNUH.NHS.UK','JOSEPHINE.GORDON@NHS.NET','K.WELSH1@NHS.NET','NHS.UK','NHS2030','NHS40','NHS4PUNKS','NHS50HIPA','NHS5P','NHS64','NHS72','NHSAD','NHSAPRIL20','NHSCNWL','NHSD0G1','NHSDISCOUNT','NHSDRIVETHUR','NHSDROP24','NHSELV1S','NHSFY','NHSH1PA','NHSHERO','NHSHEROS','NHSHIP','NHSHIPA50','NHSLIBERT1NE','NHSLIBERTINE','NHSP4R4D0X','NHSP4R4DOX','NHSRB1C','NHSSARAH','NHSSHIPA','NHSSYLVIA','NHSTHANKS','NHSTHANKYOU','PUNKS4NHS','STUART.MCRITCHIE@NHS.NET','SUSANCHARLES@NHS.NET','TOM.WRIGHT10@NHS.NET','ZOE.NEEDHAM@ULH.NHS.UK'];
    if (arr.includes(string.toUpperCase())) return true;
}