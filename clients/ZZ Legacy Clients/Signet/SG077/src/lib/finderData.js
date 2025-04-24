// luxury watches https://www.ernestjones.co.uk/webstore/l/watches/select%7Cluxury+watches/?icid=ej-tn-watches-coll-lux
// fashion watches https://www.ernestjones.co.uk/webstore/l/watches/select%7Cfashion%20watches/?icid=ej-tn-watches-coll-designer

// engagement https://www.ernestjones.co.uk/webstore/l/ladies-engagement-rings/price%7C%C2%A3500+-+%C2%A3999/material%7Cwhite+gold/

// Diamond > Bracelets
// https://www.ernestjones.co.uk/webstore/l/diamond-bracelets/
// Metal = stainless steel
// https://www.ernestjones.co.uk/webstore/l/diamond-bracelets/material%7Cstainless+steel/
// Price
// https://www.ernestjones.co.uk/webstore/l/diamond-bracelets/material%7Cstainless+steel/?Nf=P_Current_Price%7CBTWN+100+200

export const journeyData = {
    'Watches': {
        image: '',
        url: '',
        step3: {
            title: 'Choose a type of watch',
            options: {
                'Luxury': {
                    image: '',
                    url: 'https://www.ernestjones.co.uk/webstore/l/watches/select%7Cluxury+watches/',
                }
            }
        },
        step4: {

        },
    },  
    'Diamond': {
        image: '',
        step3Title: 'Choose a type of diamond accessory (ring / necklace / earring etc.)',
        step3: {
            'Bracelets': {
                image: '',
                url: 'https://www.ernestjones.co.uk/webstore/l/diamond-bracelets/'
            },
            'Rings': {
                image: '',
                url: 'https://www.ernestjones.co.uk/webstore/l/diamond-rings/',
            },
            'Necklaces': {
                image: '',
                url: 'https://www.ernestjones.co.uk/webstore/l/diamond-necklaces/',
            }
        },
        step4Title: 'Choose a metal type',
        step4: {
            'Stainless Steel': {
                image: '',
                url: 'material%7Cstainless+steel/',
            },
            'Platinum': {
                image: '',
                url: 'material%7Cplatinum/',
            },
        },
        step5: {
            type: 'price'
        }
    }  
}

const store = [];

// -=---=
// How do we track as we go along?
// ------------
var finalUrl = '';

// Step 2
store.push('Diamond');

// Step 3
store.push('Bracelets');
finalUrl += journeyData['Diamond']['step3']['Bracelets']['url'];

// Step 4 - user chooses 'Stainless Steel'
store.push('Stainless Steel');
finalUrl += journeyData['Diamond']['step4']['Stainless Steel']['url'];

// Step 5 - user filters 100 - 200
finalUrl += '?Nf=P_Current_Price%7CBTWN+100+200';




// -=---=
// How do we load questions as we go along
// ------------
var finalUrl = '';

// Load Step 2
Object.keys(journeyData).forEach((k) => {
    var html = `<a data-choice="${k}">${k}${journeyData[k].image}</a>`;
    secondDiv.insertAdjacentHTML('beforeend', html);
});

// Step 3 - a user chose Diamond, so load the diamonds data: 
step3Div.appendHTML(journeyData['Diamond']['step3Title'];

Object.keys(journeyData['Diamond']['step3']).forEach((k) => {
    var html = `<a data-choice="${k}">${k}${journeyData['Diamond']['step3'][k].image}</a>`;
    secondDiv.insertAdjacentHTML('beforeend', html);
});


// Step 4 
step3Div.appendHTML(journeyData['Diamond']['step4Title']);

Object.keys(journeyData['Diamond']['step4']).forEach((k) => {
    var html = `<a data-choice="${k}">${k}${journeyData['Diamond']['step4'][k].image}</a>`;
    secondDiv.insertAdjacentHTML('beforeend', html);
});


function loadStep(path, step) {
    if(step == 2) {
        Object.keys(journeyData).forEach((k) => {
            var html = `<a data-choice="${k}">${k}${journeyData[k].image}</a>`;
            secondDiv.insertAdjacentHTML('beforeend', html);
        });
    } else if(step == 3 || step == 4) {
        Object.keys(journeyData[path]['step' + step]).forEach((k) => {
            var html = `<a data-choice="${k}">${k}${journeyData[path]['step' + step][k].image}</a>`;
            secondDiv.insertAdjacentHTML('beforeend', html)
        });
    } else if (step == 5) {
        // load price step
    }
}
loadStep('Diamond', 3);