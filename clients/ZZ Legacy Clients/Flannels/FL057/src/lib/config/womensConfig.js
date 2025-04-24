export default {
  jeans: {
    options: ['3XS', '2XS', 'XS', 'S', 'S/M', 'M', 'M/L', 'L', 'L/XL', 'XL', '2XL', '2XL/3XL', '3XL', '4XL', '5XL'], // 12 / 13
    type: [
      {
        name: 'Waist (Inches)',
        values: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'],
      },
      {
        name: 'Continental',
        values: ['36', null, '38', null, '40', null, '42', null, '44', null, '46', null, '48', null, '50'],
      },
    ],
  },
  // Footwear is slightly different. Explained within.
  footwear: {
    // Main type as 'British'. Options are the British sizes. Match other types against this.
    options: ['2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8'], // 13
    type: [
      {
        name: 'Italian',
        values: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41'],
      },
      {
        name: 'American',
        values: ['4',	'4.5', '5',	'5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
      },
      {
        name: 'French',
        values: ['36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42'],
      },
    ]
  },
  belts: {
    options: ['2XS', 'XS', 'S',	'S/M', 'M', 'M/L', 'L', 'L/XL'],
    type: [
      {
        name: 'Length (CM)',
        values: ['65', '70', '80', '85', '90', '95', '100', '105'],
      },
    ],
  },
  gloves: {
    options: ['XS', 'S', 'S/M', 'M', 'M/L', 'L', 'XL'],
    type: [
      {
        name: 'British',
        values: ['6', '6.5', '7', '7.5', '8', '8.5', '9'],
      },
    ],
  },
  all: {
    options: ['3XS', '2XS',	'XS',	'S',	'S/M',	'M',	'M/L',	'L'], // 8
    type: [
      {
        name: 'British',
        values: ['4', '6', '8', '10', '12', '14', '16', '16'], // 8
      },
      {
        name: 'Italian',
        values: ['36', '38', '40', '42', '44', '46', '48', '50'], // 8
      },
      {
        name: 'French',
        values: ['32', '34', '36', '38', '40', '42', '44', '46'], // 8
      },
      {
        name: 'American',
        values: ['0', '2', '4', '6', '8', '10', '12', '14'], // 8
      },
      {
        name: 'Danish',
        values: ['30', '32', '34', '36', '38', '40', '42', '44'], // 8
      },
      {
        name: 'Japanese',
        values: ['3', '5', '7', '9', '11', '13', '15', '17'], // 8
      },
      {
        name: 'Italian Roman',
        values: [null, 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'], // 8
      },
      {
        name: 'Roman',
        values: ['0', '0', '1', '2', '3', '4', '5', '6'], // 8
      },
      {
        name: 'Australian',
        values: ['4', '6', '8', '10', '12', '14', '16', '16'], // 8
      },
    ],
  },
};
