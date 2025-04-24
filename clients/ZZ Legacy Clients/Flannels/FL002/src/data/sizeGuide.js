export default {
  Men: {
    'Casual Shirts': {
      metricSwitch: {
        metricOneLabel: 'Inches',
        metricTwoLabel: 'CM',
      },
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>
                  Product Size
                </th>
              </tr>
              <tr>
                <th>Chest Size</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td>Extra Small</td>
                <td>Small</td>
                <td>Medium</td>
                <td>Large</td>
                <td>Extra Large</td>
                <td>XXL</td>
                <td>3XL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>36"</td>
                <td>38"</td>
                <td>40"</td>
                <td>42"</td>
                <td>44"</td>
                <td>46"</td>
                <td>48"</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
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
      },
      countryConverter: {
        countries: [
          {
            name: 'UK',
            flagClass: 'FL002_table__flag--gb',
            sizes: ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL', '3XL'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['44', '46', '48', '50', '52', '54', '56'],
          },
          {
            name: 'Roman',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['0', '1', '2', '3', '4', '5', '6'],
          },
        ],
      },
      howToMeasure: [
        {
          title: 'Chest',
          img: 'https://ab-test-sandbox.userconversion.com/experiments/FL002-measure.png',
          text: 'Measure the fullest part of the chest under your arms and across your shoulder blades.',
        },
        {
          title: 'Step 2',
          img: 'https://ab-test-sandbox.userconversion.com/experiments/FL002-measure.png',
          text: 'Measure the fullest part of the chest under your arms and across your shoulder blades.',
        },
        {
          title: 'Step 3',
          img: 'https://ab-test-sandbox.userconversion.com/experiments/FL002-measure.png',
          text: 'Measure the fullest part of the chest under your arms and across your shoulder blades.',
        },
      ],
    },
    'Formal Shirts': {
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>
                  Product Size
                </th>
              </tr>
              <tr>
                <th>Chest Size</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td>Extra Small</td>
                <td>Small</td>
                <td>Medium</td>
                <td>Large</td>
                <td>Extra Large</td>
                <td>XXL</td>
                <td>3XL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>36"</td>
                <td>38"</td>
                <td>40"</td>
                <td>42"</td>
                <td>44"</td>
                <td>46"</td>
                <td>48"</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
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
      },
    },
    Trousers: {
      metricSwitch: {
        metricOneLabel: 'Inches',
        metricTwoLabel: 'CM',
      },
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>
                  Product Size
                </th>
              </tr>
              <tr>
                <th>Waist Size</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td colspan="2">Small</td>
                <td colspan="2">Medium</td>
                <td>Large</td>
                <td>Extra Large</td>
                <td>XXL</td>
                <td>3XL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>28"</td>
                <td>30"</td>
                <td>32"</td>
                <td>34"</td>
                <td>36"</td>
                <td>38"</td>
                <td>40"</td>
                <td>42"</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
                <td>71</td>
                <td>76</td>
                <td>81</td>
                <td>86</td>
                <td>91</td>
                <td>97</td>
                <td>102</td>
                <td>107</td>
              </tr>
            </tbody>
          </table>
        `,
      },
      countryConverter: {
        countries: [
          {
            name: 'Standard',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['Small', 'Small', 'Medium', 'Medium', 'Large', 'Extra Large', 'XXL', '3XL'],
          },
          {
            name: 'UK',
            flagClass: 'FL002_table__flag--gb',
            sizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['44', '46', '48', '50', '52', '54', '56', '58'],
          },
          {
            name: 'US',
            flagClass: 'FL002_table__flag--us',
            sizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
          },
          {
            name: 'Other',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['38', '40', '42', '44', '46', '48', '50', '52'],
          },
        ],
      },
    },
    Jeans: {
      metricSwitch: {
        metricOneLabel: 'Inches',
        metricTwoLabel: 'CM',
      },
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>
                  Product Size
                </th>
              </tr>
              <tr>
                <th>Waist Size</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td colspan="3">Small</td>
                <td colspan="3">Medium</td>
                <td colspan="3">Large</td>
                <td colspan="2">Extra Large</td>
                <td>XXL</td>
                <td>3XL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>28"</td>
                <td>29"</td>
                <td>30"</td>
                <td>31"</td>
                <td>32"</td>
                <td>33"</td>
                <td>34"</td>
                <td>35"</td>
                <td>36"</td>
                <td>37"</td>
                <td>38"</td>
                <td>39"</td>
                <td>40"</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
                <td>71</td>
                <td>74</td>
                <td>76</td>
                <td>79</td>
                <td>81</td>
                <td>84</td>
                <td>86</td>
                <td>89</td>
                <td>91</td>
                <td>94</td>
                <td>97</td>
                <td>99</td>
                <td>102</td>
              </tr>
            </tbody>
          </table>
        `,
      },
      countryConverter: {
        countries: [
          {
            name: 'Standard',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['Small', 'Small', 'Small', 'Medium', 'Medium', 'Medium', 'Large', 'Large', 'Large', 'Extra Large', 'Extra Large', 'XXL', '3XL'],
          },
          {
            name: 'UK',
            flagClass: 'FL002_table__flag--gb',
            sizes: ['28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['44', '44', '46', '46', '48', '48', '50', '50', '52', '52', '54', '54', '56'],
          },
        ],
      },
    },
    Outerwear: {
      metricSwitch: {
        metricOneLabel: 'Inches',
        metricTwoLabel: 'CM',
      },
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>
                  Product Size
                </th>
              </tr>
              <tr>
                <th>Chest Size</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td>XXS</td>
                <td>Extra Small</td>
                <td>Small</td>
                <td>Medium</td>
                <td>Large</td>
                <td>Extra Large</td>
                <td>XXL</td>
                <td>3XL</td>
                <td>4XL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>34"</td>
                <td>36"</td>
                <td>38"</td>
                <td>40"</td>
                <td>42"</td>
                <td>44"</td>
                <td>46"</td>
                <td>48"</td>
                <td>50"</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
                <td>86</td>
                <td>91</td>
                <td>97</td>
                <td>102</td>
                <td>107</td>
                <td>112</td>
                <td>117</td>
                <td>122</td>
                <td>127</td>
              </tr>
            </tbody>
          </table>
        `,
      },
      countryConverter: {
        countries: [
          {
            name: 'Standard',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['XXS', 'Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL', '3XL', '4XL'],
          },
          {
            name: 'UK',
            flagClass: 'FL002_table__flag--gb',
            sizes: ['34', '36', '38', '40', '42', '44', '46', '48', '50'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['44', '46', '48', '50', '52', '54', '56', '58', '60'],
          },
          {
            name: 'US',
            flagClass: 'FL002_table__flag--us',
            sizes: ['34', '36', '38', '40', '42', '44', '46', '48', '50'],
          },
          {
            name: 'JP',
            flagClass: 'FL002_table__flag--jp',
            sizes: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
          },
          {
            name: 'Italian Roman',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'],
          },
        ],
      },
    },
    Tailoring: {
      metricSwitch: {
        metricOneLabel: 'Inches',
        metricTwoLabel: 'CM',
      },
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>
                  Product Size
                </th>
              </tr>
              <tr>
                <th>Chest Size</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td colspan="2">Small</td>
                <td colspan="2">Medium</td>
                <td colspan="2">Large</td>
                <td colspan="2">Extra Large</td>
                <td>XXL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>34"</td>
                <td>36"</td>
                <td>38"</td>
                <td>40"</td>
                <td>42"</td>
                <td>44"</td>
                <td>46"</td>
                <td>48"</td>
                <td>50"</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
                <td>86</td>
                <td>92</td>
                <td>97</td>
                <td>102</td>
                <td>107</td>
                <td>112</td>
                <td>117</td>
                <td>122</td>
                <td>127</td>
              </tr>
            </tbody>
          </table>
        `,
      },
      countryConverter: {
        countries: [
          {
            name: 'Standard',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['Small', 'Small', 'Medium', 'Medium', 'Large', 'Large', 'Extra Large', 'XXL'],
          },
          {
            name: 'UK',
            flagClass: 'FL002_table__flag--gb',
            sizes: ['34', '36', '38', '40', '42', '44', '46', '48', '50'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['44', '46', '48', '50', '52', '54', '56', '58', '60'],
          },
        ],
      },
    },
    'Tops/Knitwear': {
      metricSwitch: {
        metricOneLabel: 'Inches',
        metricTwoLabel: 'CM',
      },
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>
                  Product Size
                </th>
              </tr>
              <tr>
                <th>Chest Size</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td>Extra Small</td>
                <td>Small</td>
                <td>Medium</td>
                <td>Large</td>
                <td>Extra Large</td>
                <td>XXL</td>
                <td>3XL</td>
                <td>4XL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>34"</td>
                <td>36"</td>
                <td>38"</td>
                <td>40"</td>
                <td>42"</td>
                <td>44"</td>
                <td>46"</td>
                <td>48"</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
                <td>86</td>
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
      },
      countryConverter: {
        countries: [
          {
            name: 'Standard',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL', '3XL', '4XL'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['44', '46', '48', '50', '52', '54', '56', '58'],
          },
          {
            name: 'JP',
            flagClass: 'FL002_table__flag--jp',
            sizes: ['3', '4', '5', '6', '7', '8', '9', '10'],
          },
          {
            name: 'Italian Roman',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
          },
        ],
      },
    },
    Footwear: {
      countryConverter: {
        countries: [
          {
            name: 'UK',
            flagClass: 'FL002_table__flag--gb',
            sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '45.5', '46'],
          },
          {
            name: 'US',
            flagClass: 'FL002_table__flag--us',
            sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'],
          },
        ],
      },
    },
    Hats: {
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>Product Size</th>
              </tr>
              <tr>
                <th>Diameter <br>(IN)</th>
              </tr>
              <tr>
                <th>Circumference <br>(CM)</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td colspan="2">Small</td>
                <td colspan="2">Medium</td>
                <td colspan="2">Large</td>
                <td colspan="2">Extra Large</td>
                <td colspan="2">XXL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion">
                <td>6¾"</td>
                <td>6⅞"</td>
                <td>7"</td>
                <td>7⅛"</td>
                <td>7¼"</td>
                <td>7⅜"</td>
                <td>7½"</td>
                <td>7⅝"</td>
                <td>7¾"</td>
                <td>7⅞"</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion">
                <td>54</td>
                <td>55</td>
                <td>56</td>
                <td>57</td>
                <td>58</td>
                <td>59</td>
                <td>60</td>
                <td>61</td>
                <td>62</td>
                <td>63</td>
              </tr>
            </tbody>
          </table>
        `,
      },
    },
    Belts: {
      metricSwitch: {
        metricOneLabel: 'Inches',
        metricTwoLabel: 'CM',
      },
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>
                  Product Size
                </th>
              </tr>
              <tr>
                <th>Belt Size</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td colspan="2">Small</td>
                <td>Medium</td>
                <td>Large</td>
                <td>Extra Large</td>
                <td colspan="2">XXL</td>
                <td colspan="2">3XL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>28"</td>
                <td>30"</td>
                <td>32"</td>
                <td>34"</td>
                <td>36"</td>
                <td>38"</td>
                <td>40"</td>
                <td>42"</td>
              </tr>
              
              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
                <td>75</td>
                <td>80</td>
                <td>85</td>
                <td>90</td>
                <td>95</td>
                <td>100</td>
                <td>105</td>
                <td>110</td>
                <td>115</td>
              </tr>
            </tbody>
          </table>
        `,
      },
      countryConverter: {
        countries: [
          {
            name: 'Standard',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL', 'XXL', '3XL'],
          },
          {
            name: 'IT',
            flagClass: 'FL002_table__flag--it',
            sizes: ['1', '2', '3', '4', '5', '6', '7', '8'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['75', '80', '85', '90', '95', '100', '105', '110', '115'],
          },
          {
            name: 'Italian Roman',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['0', 'I', 'II', 'III', 'IV', 'V', '', ''],
          },
        ],
      },
    },
    'Swim/Underwear': {
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>Standard</th>
              </tr>
              <tr>
                <th>Swim<br>/Underwear</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td>XXS</td>
                <td>Extra Small</td>
                <td>Small</td>
                <td>Medium</td>
                <td>Large</td>
                <td>Extra Large</td>
                <td colspan="2">XXL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion">
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
              </tr>
            </tbody>
          </table>
        `,
      },
    },
    Gloves: {
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>Standard</th>
              </tr>
              <tr>
                <th>UK</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td>7.5</td>
                <td>8</td>
                <td>8.5</td>
                <td>9</td>
                <td>9.5</td>
              </tr>

              <tr>
                <td>Small</td>
                <td>Medium</td>
                <td>Large</td>
                <td>Extra Large</td>
                <td>XXL</td>
              </tr>
            </tbody>
          </table>
        `,
      },
    },
    Socks: {
      countryConverter: {
        countries: [
          {
            name: 'Standard',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['S-M', 'M-L'],
          },
          {
            name: 'UK',
            flagClass: 'FL002_table__flag--gb',
            sizes: ['5.5', '8.5'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['39-42', '43-45'],
          },
        ],
      },
    },
  },

  Women: {
    Clothing: {
      countryConverter: {
        countries: [
          {
            name: 'Standard',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['3XS', 'XXS', 'Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL'],
          },
          {
            name: 'UK',
            flagClass: 'FL002_table__flag--gb',
            sizes: ['4', '6', '8', '10', '12', '14', '16', '18'],
          },
          {
            name: 'IT',
            flagClass: 'FL002_table__flag--it',
            sizes: ['36', '38', '40', '42', '44', '46', '48', '50'],
          },
          {
            name: 'FR',
            flagClass: 'FL002_table__flag--fr',
            sizes: ['32', '34', '36', '38', '40', '42', '44', '46'],
          },
          {
            name: 'US',
            flagClass: 'FL002_table__flag--us',
            sizes: ['0', '2', '4', '6', '8', '10', '12', '14'],
          },
          {
            name: 'DK',
            flagClass: 'FL002_table__flag--dk',
            sizes: ['30', '32', '34', '36', '38', '40', '42', '44'],
          },
          {
            name: 'JP',
            flagClass: 'FL002_table__flag--jp',
            sizes: ['3', '5', '7', '9', '11', '13', '15', '17'],
          },
          {
            name: 'Italian Roman',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
          },
          {
            name: 'Roman',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['0.0', '0', '1', '2', '3', '4', '5', '6'],
          },
          {
            name: 'AU',
            flagClass: 'FL002_table__flag--au',
            sizes: ['4', '6', '8', '10', '12', '14', '16', '18'],
          },
        ],
      },
    },
    Jeans: {
      metricSwitch: {
        metricOneLabel: 'Inches',
        metricTwoLabel: 'CM',
      },
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>
                  Product Size
                </th>
              </tr>
              <tr>
                <th>Waist Size</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td colspan="2">XXS</td>
                <td colspan="2">Extra Small</td>
                <td colspan="2">Small</td>
                <td colspan="2">Medium</td>
                <td colspan="2">Large</td>
                <td>Extra Large</td>
                <td colspan="2">XXL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>22"</td>
                <td>23"</td>
                <td>24"</td>
                <td>25"</td>
                <td>26"</td>
                <td>27"</td>
                <td>28"</td>
                <td>29"</td>
                <td>30"</td>
                <td>31"</td>
                <td>32"</td>
                <td>33"</td>
                <td>34"</td>
                <td>35"</td>
                <td>36"</td>                
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
                <td>56"</td>
                <td>58"</td>
                <td>60</td>
                <td>63</td>
                <td>66</td>
                <td>69</td>
                <td>71</td>
                <td>74</td>
                <td>76</td>
                <td>79</td>
                <td>81</td>
                <td>84</td>
                <td>86</td>
                <td>89</td>
                <td>91</td>
              </tr>
            </tbody>
          </table>
        `,
      },
      countryConverter: {
        countries: [
          {
            name: 'Standard',
            flagClass: 'FL002_table__flag--hide',
            sizes: ['XXS', 'Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'Extra Large', 'XXL', 'XXL'],
          },
          {
            name: 'EU',
            flagClass: 'FL002_table__flag--eu',
            sizes: ['36', '38', '40', '42', '44', '46', '48', '50'],
          },
        ],
      },
    },
    Footwear: {
      countryConverter: {
        countries: [
          {
            name: 'UK',
            flagClass: 'FL002_table__flag--gb',
            sizes: ['2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8'],
          },
          {
            name: 'IT',
            flagClass: 'FL002_table__flag--it',
            sizes: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41'],
          },
          {
            name: 'FR',
            flagClass: 'FL002_table__flag--fr',
            sizes: ['36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42'],
          },
          {
            name: 'US',
            flagClass: 'FL002_table__flag--us',
            sizes: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
          },
        ],
      },
    },
    /* Belts: {
      metricSwitch: {
        metricOneLabel: 'Inches',
        metricTwoLabel: 'CM',
      },
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>Standard</th>
              </tr>
              <tr>
                <th>Belt Length</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td colspan="2">Extra Small</td>
                <td colspan="2">Small</td>
                <td colspan="2">Medium</td>
                <td colspan="2">Large</td>
                <td>Extra Large</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">
                <td>24"</td>
                <td>26"</td>
                <td>28"</td>
                <td>30"</td>
                <td>32"</td>
                <td>34"</td>
                <td>36"</td>
                <td>38"</td>
              </tr>
              
              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">
                <td>65</td>
                <td>70</td>
                <td>75</td>
                <td>80</td>
                <td>85</td>
                <td>90</td>
                <td>95</td>
                <td>100</td>
                <td>105</td>
              </tr>
            </tbody>
          </table>
        `,
      },
    },
    Gloves: {
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>Standard</th>
              </tr>
              <tr>
                <th>UK</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td>6</td>
                <td>6.5</td>
                <td>7</td>
                <td>7.5</td>
                <td>8</td>
                <td>8.5</td>
                <td>9</td>
              </tr>

              <tr>
                <td>Extra Small</td>
                <td colspan="2">Small</td>
                <td colspan="2">Medium</td>
                <td>Large</td>
                <td>Extra Large</td>
              </tr>
            </tbody>
          </table>
        `,
      },
    }, */
  },

  /* Kids: {
    Babies: {},
    Kids: {},
  }, */

  Unisex: {
    Hats: {
      metricConverter: {
        labels: `
          <table class="FL002_MetricConverter__labels">
            <tbody>
              <tr>
                <th>Product Size</th>
              </tr>
              <tr>
                <th>Diameter <br>(IN)</th>
              </tr>
              <tr>
                <th>Circumference <br>(CM)</th>
              </tr>
            </tbody>
          </table>
        `,
        html: `
          <table class="FL002_MetricConverter__values">
            <tbody>
              <tr>
                <td colspan="2">Small</td>
                <td colspan="2">Medium</td>
                <td colspan="2">Large</td>
                <td colspan="2">Extra Large</td>
                <td colspan="2">XXL</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion">
                <td>6¾"</td>
                <td>6⅞"</td>
                <td>7"</td>
                <td>7⅛"</td>
                <td>7¼"</td>
                <td>7⅜"</td>
                <td>7½"</td>
                <td>7⅝"</td>
                <td>7¾"</td>
                <td>7⅞"</td>
              </tr>

              <tr class="FL002_MetricConverter__conversion">
                <td>54</td>
                <td>55</td>
                <td>56</td>
                <td>57</td>
                <td>58</td>
                <td>59</td>
                <td>60</td>
                <td>61</td>
                <td>62</td>
                <td>63</td>
              </tr>
            </tbody>
          </table>
        `,
      },
    },
  },
};
