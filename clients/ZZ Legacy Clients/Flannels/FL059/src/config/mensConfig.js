export default {
    // TEST - Options length should equal values length.
    casualShirts: {
        options: ['XS', 'S', 'S/M', 'M', 'L', 'XL', '2XL', '2XL/3XL', '3XL', '4XL', '5XL'], // 11 / 13
        type: [{
                name: 'Inches',
                values: ['36', '38', null, '40', '42', '44', '46', null, '48', null, null],
            },
            {
                name: 'CM',
                values: ['92', '97', null, '102', '107', '112', '117', null, '122', null, null],
            },
            {
                name: 'European',
                values: ['44', '46', null, '48', '50', '52', '54', null, '56', null, null],
            },
            {
                name: 'Roman',
                values: ['0', '1', null, '2', '3', '4', '5', null, '6', null, null],
            },
            {
                name: 'Inches (Collar)',
                values: ['14.5', '15', '15.5', '15.75', '16', '16.5', '17', '17.5', '17.75', '18', '18.5'],
            },
            {
                name: 'CM (Collar)',
                values: ['37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47'],
            },
        ],
    },
    trousers: {
        options: ['S', 'S/M', 'M', 'M/L', 'L', 'XL', '2XL', '3XL'], // 8 / 13
        type: [{
                name: 'British',
                values: ['28', '30', '32', '34', '36', '38', '40', '42'],
            },
            {
                name: 'European',
                values: ['44', '46', '48', '50', '52', '54', '56', '58'],
            },
            {
                name: 'American',
                values: ['28', '30', '32', '34', '36', '38', '40', '42'],
            },
            {
                name: 'Other',
                values: ['38', '40', '42', '44', '46', '48', '50', '52'],
            },
        ],
    },
    jeans: {
        options: ['2XS', 'XS', 'S', 'S/M', 'M', 'M/L', 'L', 'L/XL', 'XL', '2XL', '3XL', '4XL'], // 12 / 13
        type: [{
                name: 'British (Inches)',
                values: ['28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'],
            },
            {
                name: 'Continental',
                values: ['44', null, '46', null, '48', null, '50', null, '52', null, '54', null, '56'],
            },
        ],
    },
    outerwear: {
        options: ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'], // 9 / 13
        type: [{
                name: 'British',
                values: ['34', '36', '38', '40', '42', '44', '46', '48', '50'],
            },
            {
                name: 'European',
                values: ['44', '46', '48', '50', '52', '54', '56', '58', '60'],
            },
            {
                name: 'American',
                values: ['34', '36', '38', '40', '42', '44', '46', '48', '50'],
            },
            {
                name: 'Japanese',
                values: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
            },
            {
                name: 'Italian Roman',
                values: [null, 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'],
            },
        ],
    },
    tailoring: {
        options: ['XS', 'S', 'S/M', 'M', 'M/L', 'L', 'L/XL', 'XL', '2XL'], // 9 / 13
        type: [{
                name: 'British',
                values: ['34', '36', '38', '40', '42', '44', '46', '48', '50'],
            },
            {
                name: 'European',
                values: ['44', '46', '48', '50', '52', '54', '56', '58', '60'],
            },
            {
                name: 'Chest',
                values: ['34', '36', '38', '40', '42', '44', '46', '48', '50'],
            },
            {
                name: 'Waist',
                values: ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
            },
        ],
    },
    topsAndKnitwear: {
        options: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'], // 8 / 13
        type: [{
                name: 'European',
                values: ['44', '46', '48', '50', '52', '54', '56', '58'],
            },
            {
                name: 'Japanese',
                values: ['3', '4', '5', '6', '7', '8', '9', '10'],
            },
            {
                name: 'Italian Roman',
                values: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
            },
        ]
    },
    // Footwear is slightly different. Explained within.
    footwear: {
        // Main type as 'British'. Options are the British sizes. Match other types against this.
        options: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'], // 15
        type: [{
                name: 'European',
                values: ['39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '45.5', '46'],
            },
            {
                name: 'American',
                values: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'],
            },
        ]
    },
    // Hats is also different...
    hats: {
        // Hat sizes usually show 6 1/4 so will need to either add it as HTML or change it in the code.
        options: ['XS', 'S', 'S/M', 'M', 'M/L', 'L', 'XL', '2XL'], // 8
        type: [{
                name: 'IN (Diameter)',
                values: ['6.75', '6.75', '7', '7', '7.25', '7.25', '7.5', '7.75'],
            },
            {
                name: 'CM (Circumference)',
                values: ['54', '55', '56', '57', '58', '59', '61', '63'],
            },
        ]
    },
    belts: {
        options: ['S', 'S/M', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
        type: [{
                name: 'Inches',
                values: ['28', '30', '32', '34', '36', '38', '40', '42'],
            },
            {
                name: 'Italian',
                values: ['1', '2', '3', '4', '5', '6', '7', '8'],
            },
            {
                name: 'European',
                values: ['75', '80', '85', '90', '95', '100', '105', '110', '115'],
            },
            {
                name: 'Italian Roman',
                values: ['0', 'I', 'II', 'III', 'IV', 'V'],
            },
        ],
    },
    swimAndUnderwear: {
        options: ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '2XL/3XL'],
        type: [{
            name: 'Swim / Underwear',
            values: ['2', '3', '4', '5', '5', '6', '7', '8']
        }]
    },
    gloves: {
        options: ['S', 'M', 'L', 'XL', '2XL'],
        type: [{
            name: 'British',
            values: ['7.5', '8', '8.5', '9', '9.5'],
        }, ],
    },
    socks: {
        options: ['S/M', 'M/L'],
        type: [{
                name: 'European',
                values: ['39-42', '43-45'],
            },
            {
                name: 'Hugo Boss',
                values: ['5.5', '8.5'],
            },
        ],
    },
};