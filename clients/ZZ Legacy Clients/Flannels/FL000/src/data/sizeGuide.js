export default {
  Men: {
    'Casual Shirts': {
      metricConverter: `
        <table>
          <tbody>
            <tr>
              <td>
                <span class="FL000_table__flag FL000_table__flag--gb"></span>
                Product Size
                <a href="javascript:void(0)" id="FL000_MetricConverter__convertLink">Convert</a>
              </td>
              <td>Extra Small</td>
              <td>Small</td>
              <td>Medium</td>
              <td>Large</td>
              <td>Extra Large</td>
              <td>XXL</td>
              <td>3XL</td>
            </tr>

            <tr class="FL000_MetricConverter__conversion" data-metric="inches">
              <td>Chest Size</td>
              <td>36"</td>
              <td>38"</td>
              <td>40"</td>
              <td>42"</td>
              <td>44"</td>
              <td>46"</td>
              <td>48"</td>
            </tr>

            <tr class="FL000_MetricConverter__conversion" data-metric="cm" style="display: none;">
              <td>Chest Size</td>
              <td>92</td>
              <td>97</td>
              <td>102</td>
              <td>107</td>
              <td>112</td>
              <td>117</td>
              <td>122</td>
            </tr>
          </tbody>
        </table>
      `,
      howToMeasure: [
        {
          title: 'Chest',
          img: 'https://ab-test-sandbox.userconversion.com/experiments/FL000-measure.png',
          text: 'Measure the fullest part of the chest under your arms and across your shoulder blades.',
        },
        {
          title: 'Step 2',
          img: 'https://ab-test-sandbox.userconversion.com/experiments/FL000-measure.png',
          text: 'Measure the fullest part of the chest under your arms and across your shoulder blades.',
        },
        {
          title: 'Step 3',
          img: 'https://ab-test-sandbox.userconversion.com/experiments/FL000-measure.png',
          text: 'Measure the fullest part of the chest under your arms and across your shoulder blades.',
        },
      ],
    },
    'Formal Shirts': {},
    Trousers: {},
    Jeans: {},
    Outerwear: {},
    Tailoring: {},
    'Tops/Knitwear': {},
    Footwear: {},
    Hats: {},
    Belts: {},
    'Swim/Underwear': {},
    Gloves: {},
    Socks: {},
  },

  Women: {
    Clothing: {},
    Jeans: {},
    Footwear: {},
    Belts: {},
    Gloves: {},
  },

  Kids: {
    Babies: {},
    Kids: {},
  },
};
