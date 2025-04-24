/* eslint-disable */
const FL002 = () => {
  (function() {
    'use strict';
    
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
    var sizeGuideData = {
      Men: {
        'Casual Shirts': {
          metricSwitch: {
            metricOneLabel: 'Inches',
            metricTwoLabel: 'CM'
          },
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>\n                  Product Size\n                </th>\n              </tr>\n              <tr>\n                <th>Chest Size</th>\n              </tr>\n  <tr>\n                <th>CM</th>\n              </tr>\n         </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td>Extra Small</td>\n                <td>Small</td>\n                <td>Medium</td>\n                <td>Large</td>\n                <td>Extra Large</td>\n                <td>XXL</td>\n                <td>3XL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">\n                <td>36"</td>\n                <td>38"</td>\n                <td>40"</td>\n                <td>42"</td>\n                <td>44"</td>\n                <td>46"</td>\n                <td>48"</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">\n                <td>92</td>\n                <td>97</td>\n                <td>102</td>\n                <td>107</td>\n                <td>112</td>\n                <td>117</td>\n                <td>122</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          },
          countryConverter: {
            countries: [{
              name: 'UK',
              flagClass: 'FL002_table__flag--gb',
              sizes: ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL', '3XL']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['44', '46', '48', '50', '52', '54', '56']
            }, {
              name: 'Roman',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['0', '1', '2', '3', '4', '5', '6']
            }]
          },
          howToMeasure: [{
            title: 'Chest',
            img: 'https://ab-test-sandbox.userconversion.com/experiments/FL002-measure.png',
            text: 'Measure the fullest part of the chest under your arms and across your shoulder blades.'
          }, {
            title: 'Step 2',
            img: 'https://ab-test-sandbox.userconversion.com/experiments/FL002-measure.png',
            text: 'Measure the fullest part of the chest under your arms and across your shoulder blades.'
          }, {
            title: 'Step 3',
            img: 'https://ab-test-sandbox.userconversion.com/experiments/FL002-measure.png',
            text: 'Measure the fullest part of the chest under your arms and across your shoulder blades.'
          }]
        },
        'Formal Shirts': {
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>\n                  Product Size\n                </th>\n              </tr>\n              <tr>\n                <th>Chest Size</th>\n              </tr>\n  <tr>\n                <th>CM</th>\n              </tr>\n                 </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td>Extra Small</td>\n                <td>Small</td>\n                <td>Medium</td>\n                <td>Large</td>\n                <td>Extra Large</td>\n                <td>XXL</td>\n                <td>3XL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">\n                <td>36"</td>\n                <td>38"</td>\n                <td>40"</td>\n                <td>42"</td>\n                <td>44"</td>\n                <td>46"</td>\n                <td>48"</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">\n                <td>92</td>\n                <td>97</td>\n                <td>102</td>\n                <td>107</td>\n                <td>112</td>\n                <td>117</td>\n                <td>122</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          }
        },
        Trousers: {
          metricSwitch: {
            metricOneLabel: 'Inches',
            metricTwoLabel: 'CM'
          },
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>\n                  Product Size\n                </th>\n              </tr>\n              <tr>\n                <th>Waist Size</th>\n              </tr>\n            </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td colspan="2">Small</td>\n                <td colspan="2">Medium</td>\n                <td>Large</td>\n                <td>Extra Large</td>\n                <td>XXL</td>\n                <td>3XL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">\n                <td>28"</td>\n                <td>30"</td>\n                <td>32"</td>\n                <td>34"</td>\n                <td>36"</td>\n                <td>38"</td>\n                <td>40"</td>\n                <td>42"</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">\n                <td>71</td>\n                <td>76</td>\n                <td>81</td>\n                <td>86</td>\n                <td>91</td>\n                <td>97</td>\n                <td>102</td>\n                <td>107</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          },
          countryConverter: {
            countries: [{
              name: 'Standard',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['Small', 'Small', 'Medium', 'Medium', 'Large', 'Extra Large', 'XXL', '3XL']
            }, {
              name: 'UK',
              flagClass: 'FL002_table__flag--gb',
              sizes: ['28', '30', '32', '34', '36', '38', '40', '42']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['44', '46', '48', '50', '52', '54', '56', '58']
            }, {
              name: 'US',
              flagClass: 'FL002_table__flag--us',
              sizes: ['28', '30', '32', '34', '36', '38', '40', '42']
            }, {
              name: 'Other',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['38', '40', '42', '44', '46', '48', '50', '52']
            }]
          }
        },
        Jeans: {
          metricSwitch: {
            metricOneLabel: 'Inches',
            metricTwoLabel: 'CM'
          },
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>\n                  Product Size\n                </th>\n              </tr>\n              <tr>\n                <th>Waist Size</th>\n              </tr>\n            </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td colspan="3">Small</td>\n                <td colspan="3">Medium</td>\n                <td colspan="3">Large</td>\n                <td colspan="2">Extra Large</td>\n                <td>XXL</td>\n                <td>3XL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">\n                <td>28"</td>\n                <td>29"</td>\n                <td>30"</td>\n                <td>31"</td>\n                <td>32"</td>\n                <td>33"</td>\n                <td>34"</td>\n                <td>35"</td>\n                <td>36"</td>\n                <td>37"</td>\n                <td>38"</td>\n                <td>39"</td>\n                <td>40"</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">\n                <td>71</td>\n                <td>74</td>\n                <td>76</td>\n                <td>79</td>\n                <td>81</td>\n                <td>84</td>\n                <td>86</td>\n                <td>89</td>\n                <td>91</td>\n                <td>94</td>\n                <td>97</td>\n                <td>99</td>\n                <td>102</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          },
          countryConverter: {
            countries: [{
              name: 'Standard',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['Small', 'Small', 'Small', 'Medium', 'Medium', 'Medium', 'Large', 'Large', 'Large', 'Extra Large', 'Extra Large', 'XXL', '3XL']
            }, {
              name: 'UK',
              flagClass: 'FL002_table__flag--gb',
              sizes: ['28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['44', '44', '46', '46', '48', '48', '50', '50', '52', '52', '54', '54', '56']
            }]
          }
        },
        Outerwear: {
          metricSwitch: {
            metricOneLabel: 'Inches',
            metricTwoLabel: 'CM'
          },
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>\n                  Product Size\n                </th>\n              </tr>\n              <tr>\n                <th>Chest Size</th>\n              </tr>\n  <tr>\n                <th>CM</th>\n              </tr>\n                 </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td>XXS</td>\n                <td>Extra Small</td>\n                <td>Small</td>\n                <td>Medium</td>\n                <td>Large</td>\n                <td>Extra Large</td>\n                <td>XXL</td>\n                <td>3XL</td>\n                <td>4XL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">\n                <td>34"</td>\n                <td>36"</td>\n                <td>38"</td>\n                <td>40"</td>\n                <td>42"</td>\n                <td>44"</td>\n                <td>46"</td>\n                <td>48"</td>\n                <td>50"</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">\n                <td>86</td>\n                <td>91</td>\n                <td>97</td>\n                <td>102</td>\n                <td>107</td>\n                <td>112</td>\n                <td>117</td>\n                <td>122</td>\n                <td>127</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          },
          countryConverter: {
            countries: [{
              name: 'Standard',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['XXS', 'Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL', '3XL', '4XL']
            }, {
              name: 'UK',
              flagClass: 'FL002_table__flag--gb',
              sizes: ['34', '36', '38', '40', '42', '44', '46', '48', '50']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['44', '46', '48', '50', '52', '54', '56', '58', '60']
            }, {
              name: 'US',
              flagClass: 'FL002_table__flag--us',
              sizes: ['34', '36', '38', '40', '42', '44', '46', '48', '50']
            }, {
              name: 'JP',
              flagClass: 'FL002_table__flag--jp',
              sizes: ['0', '1', '2', '3', '4', '5', '6', '7', '8']
            }, {
              name: 'Italian Roman',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
            }]
          }
        },
        Tailoring: {
          metricSwitch: {
            metricOneLabel: 'Inches',
            metricTwoLabel: 'CM'
          },
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>\n                  Product Size\n                </th>\n              </tr>\n              <tr>\n                <th>Chest Size</th>\n              </tr>\n  <tr>\n                <th>CM</th>\n              </tr>\n                 </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td colspan="2">Small</td>\n                <td colspan="2">Medium</td>\n                <td colspan="2">Large</td>\n                <td colspan="2">Extra Large</td>\n                <td>XXL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">\n                <td>34"</td>\n                <td>36"</td>\n                <td>38"</td>\n                <td>40"</td>\n                <td>42"</td>\n                <td>44"</td>\n                <td>46"</td>\n                <td>48"</td>\n                <td>50"</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">\n                <td>86</td>\n                <td>92</td>\n                <td>97</td>\n                <td>102</td>\n                <td>107</td>\n                <td>112</td>\n                <td>117</td>\n                <td>122</td>\n                <td>127</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          },
          countryConverter: {
            countries: [{
              name: 'Standard',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['Small', 'Small', 'Medium', 'Medium', 'Large', 'Large', 'Extra Large', 'XXL']
            }, {
              name: 'UK',
              flagClass: 'FL002_table__flag--gb',
              sizes: ['34', '36', '38', '40', '42', '44', '46', '48', '50']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['44', '46', '48', '50', '52', '54', '56', '58', '60']
            }]
          }
        },
        'Tops/Knitwear': {
          metricSwitch: {
            metricOneLabel: 'Inches',
            metricTwoLabel: 'CM'
          },
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>\n                  Product Size\n                </th>\n              </tr>\n              <tr>\n                <th>Chest Size</th>\n              </tr>\n  <tr>\n                <th>CM</th>\n              </tr>\n                 </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td>Extra Small</td>\n                <td>Small</td>\n                <td>Medium</td>\n                <td>Large</td>\n                <td>Extra Large</td>\n                <td>XXL</td>\n                <td>3XL</td>\n                <td>4XL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">\n                <td>34"</td>\n                <td>36"</td>\n                <td>38"</td>\n                <td>40"</td>\n                <td>42"</td>\n                <td>44"</td>\n                <td>46"</td>\n                <td>48"</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">\n                <td>86</td>\n                <td>92</td>\n                <td>97</td>\n                <td>102</td>\n                <td>107</td>\n                <td>112</td>\n                <td>117</td>\n                <td>122</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          },
          countryConverter: {
            countries: [{
              name: 'Standard',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL', '3XL', '4XL']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['44', '46', '48', '50', '52', '54', '56', '58']
            }, {
              name: 'JP',
              flagClass: 'FL002_table__flag--jp',
              sizes: ['3', '4', '5', '6', '7', '8', '9', '10']
            }, {
              name: 'Italian Roman',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
            }]
          }
        },
        Footwear: {
          countryConverter: {
            countries: [{
              name: 'UK',
              flagClass: 'FL002_table__flag--gb',
              sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '45.5', '46']
            }, {
              name: 'US',
              flagClass: 'FL002_table__flag--us',
              sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13']
            }]
          }
        },
        Hats: {
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>Product Size</th>\n              </tr>\n              <tr>\n                <th>Diameter <br>(IN)</th>\n              </tr>\n              <tr>\n                <th>Circumference <br>(CM)</th>\n              </tr>\n            </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td colspan="2">Small</td>\n                <td colspan="2">Medium</td>\n                <td colspan="2">Large</td>\n                <td colspan="2">Extra Large</td>\n                <td colspan="2">XXL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion">\n                <td>6\xBE"</td>\n                <td>6\u215E"</td>\n                <td>7"</td>\n                <td>7\u215B"</td>\n                <td>7\xBC"</td>\n                <td>7\u215C"</td>\n                <td>7\xBD"</td>\n                <td>7\u215D"</td>\n                <td>7\xBE"</td>\n                <td>7\u215E"</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion">\n                <td>54</td>\n                <td>55</td>\n                <td>56</td>\n                <td>57</td>\n                <td>58</td>\n                <td>59</td>\n                <td>60</td>\n                <td>61</td>\n                <td>62</td>\n                <td>63</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          }
        },
        Belts: {
          metricSwitch: {
            metricOneLabel: 'Inches',
            metricTwoLabel: 'CM'
          },
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>\n                  Product Size\n                </th>\n              </tr>\n              <tr>\n                <th>Belt Size</th>\n              </tr>\n            </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td colspan="2">Small</td>\n                <td>Medium</td>\n                <td>Large</td>\n                <td>Extra Large</td>\n                <td colspan="2">XXL</td>\n                <td colspan="2">3XL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">\n                <td>28"</td>\n                <td>30"</td>\n                <td>32"</td>\n                <td>34"</td>\n                <td>36"</td>\n                <td>38"</td>\n                <td>40"</td>\n                <td>42"</td>\n              </tr>\n              \n              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">\n                <td>75</td>\n                <td>80</td>\n                <td>85</td>\n                <td>90</td>\n                <td>95</td>\n                <td>100</td>\n                <td>105</td>\n                <td>110</td>\n                <td>115</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          },
          countryConverter: {
            countries: [{
              name: 'Standard',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL', 'XXL', '3XL']
            }, {
              name: 'IT',
              flagClass: 'FL002_table__flag--it',
              sizes: ['1', '2', '3', '4', '5', '6', '7', '8']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['75', '80', '85', '90', '95', '100', '105', '110', '115']
            }, {
              name: 'Italian Roman',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['0', 'I', 'II', 'III', 'IV', 'V', '', '']
            }]
          }
        },
        'Swim/Underwear': {
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>Standard</th>\n              </tr>\n              <tr>\n                <th>Swim<br>/Underwear</th>\n              </tr>\n            </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td>XXS</td>\n                <td>Extra Small</td>\n                <td>Small</td>\n                <td>Medium</td>\n                <td>Large</td>\n                <td>Extra Large</td>\n                <td colspan="2">XXL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion">\n                <td>2</td>\n                <td>3</td>\n                <td>4</td>\n                <td>5</td>\n                <td>5</td>\n                <td>6</td>\n                <td>7</td>\n                <td>8</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          }
        },
        Gloves: {
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>Standard</th>\n              </tr>\n              <tr>\n                <th>UK</th>\n              </tr>\n            </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td>7.5</td>\n                <td>8</td>\n                <td>8.5</td>\n                <td>9</td>\n                <td>9.5</td>\n              </tr>\n\n              <tr>\n                <td>Small</td>\n                <td>Medium</td>\n                <td>Large</td>\n                <td>Extra Large</td>\n                <td>XXL</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          }
        },
        Socks: {
          countryConverter: {
            countries: [{
              name: 'Standard',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['S-M', 'M-L']
            }, {
              name: 'UK',
              flagClass: 'FL002_table__flag--gb',
              sizes: ['5.5', '8.5']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['39-42', '43-45']
            }]
          }
        }
      },
    
      Women: {
        Clothing: {
          countryConverter: {
            countries: [{
              name: 'Standard',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['3XS', 'XXS', 'Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'XXL']
            }, {
              name: 'UK',
              flagClass: 'FL002_table__flag--gb',
              sizes: ['4', '6', '8', '10', '12', '14', '16', '18']
            }, {
              name: 'IT',
              flagClass: 'FL002_table__flag--it',
              sizes: ['36', '38', '40', '42', '44', '46', '48', '50']
            }, {
              name: 'FR',
              flagClass: 'FL002_table__flag--fr',
              sizes: ['32', '34', '36', '38', '40', '42', '44', '46']
            }, {
              name: 'US',
              flagClass: 'FL002_table__flag--us',
              sizes: ['0', '2', '4', '6', '8', '10', '12', '14']
            }, {
              name: 'DK',
              flagClass: 'FL002_table__flag--dk',
              sizes: ['30', '32', '34', '36', '38', '40', '42', '44']
            }, {
              name: 'JP',
              flagClass: 'FL002_table__flag--jp',
              sizes: ['3', '5', '7', '9', '11', '13', '15', '17']
            }, {
              name: 'Italian Roman',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
            }, {
              name: 'Roman',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['0.0', '0', '1', '2', '3', '4', '5', '6']
            }, {
              name: 'AU',
              flagClass: 'FL002_table__flag--au',
              sizes: ['4', '6', '8', '10', '12', '14', '16', '18']
            }]
          }
        },
        Jeans: {
          metricSwitch: {
            metricOneLabel: 'Inches',
            metricTwoLabel: 'CM'
          },
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>\n                  Product Size\n                </th>\n              </tr>\n              <tr>\n                <th>Waist Size</th>\n              </tr>\n            </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td colspan="2">XXS</td>\n                <td colspan="2">Extra Small</td>\n                <td colspan="2">Small</td>\n                <td colspan="2">Medium</td>\n                <td colspan="2">Large</td>\n                <td>Extra Large</td>\n                <td colspan="2">XXL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricOne">\n                <td>22"</td>\n                <td>23"</td>\n                <td>24"</td>\n                <td>25"</td>\n                <td>26"</td>\n                <td>27"</td>\n                <td>28"</td>\n                <td>29"</td>\n                <td>30"</td>\n                <td>31"</td>\n                <td>32"</td>\n                <td>33"</td>\n                <td>34"</td>\n                <td>35"</td>\n                <td>36"</td>                \n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion" data-metric="metricTwo" style="display: none;">\n                <td>56"</td>\n                <td>58"</td>\n                <td>60</td>\n                <td>63</td>\n                <td>66</td>\n                <td>69</td>\n                <td>71</td>\n                <td>74</td>\n                <td>76</td>\n                <td>79</td>\n                <td>81</td>\n                <td>84</td>\n                <td>86</td>\n                <td>89</td>\n                <td>91</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          },
          countryConverter: {
            countries: [{
              name: 'Standard',
              flagClass: 'FL002_table__flag--hide',
              sizes: ['XXS', 'Extra Small', 'Small', 'Medium', 'Large', 'Extra Large', 'Extra Large', 'XXL', 'XXL']
            }, {
              name: 'EU',
              flagClass: 'FL002_table__flag--eu',
              sizes: ['36', '38', '40', '42', '44', '46', '48', '50']
            }]
          }
        },
        Footwear: {
          countryConverter: {
            countries: [{
              name: 'UK',
              flagClass: 'FL002_table__flag--gb',
              sizes: ['2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8']
            }, {
              name: 'IT',
              flagClass: 'FL002_table__flag--it',
              sizes: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41']
            }, {
              name: 'FR',
              flagClass: 'FL002_table__flag--fr',
              sizes: ['36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42']
            }, {
              name: 'US',
              flagClass: 'FL002_table__flag--us',
              sizes: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10']
            }]
          }
        }
      },
    
    
      Unisex: {
        Hats: {
          metricConverter: {
            labels: '\n          <table class="FL002_MetricConverter__labels">\n            <tbody>\n              <tr>\n                <th>Product Size</th>\n              </tr>\n              <tr>\n                <th>Diameter <br>(IN)</th>\n              </tr>\n              <tr>\n                <th>Circumference <br>(CM)</th>\n              </tr>\n            </tbody>\n          </table>\n        ',
            html: '\n          <table class="FL002_MetricConverter__values">\n            <tbody>\n              <tr>\n                <td colspan="2">Small</td>\n                <td colspan="2">Medium</td>\n                <td colspan="2">Large</td>\n                <td colspan="2">Extra Large</td>\n                <td colspan="2">XXL</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion">\n                <td>6\xBE"</td>\n                <td>6\u215E"</td>\n                <td>7"</td>\n                <td>7\u215B"</td>\n                <td>7\xBC"</td>\n                <td>7\u215C"</td>\n                <td>7\xBD"</td>\n                <td>7\u215D"</td>\n                <td>7\xBE"</td>\n                <td>7\u215E"</td>\n              </tr>\n\n              <tr class="FL002_MetricConverter__conversion">\n                <td>54</td>\n                <td>55</td>\n                <td>56</td>\n                <td>57</td>\n                <td>58</td>\n                <td>59</td>\n                <td>60</td>\n                <td>61</td>\n                <td>62</td>\n                <td>63</td>\n              </tr>\n            </tbody>\n          </table>\n        '
          }
        }
      }
    };
    
    var createPollingElement = function createPollingElement(_ref) {
      var elm = _ref.elm,
          maxDuration = _ref.maxDuration;
      return {
        elm: elm,
        maxDuration: maxDuration,
    
        expressionValidator: function expressionValidator(expr) {
          if (!expr) {
            throw Error('Invalid poller expression');
          }
    
          var type = typeof expr === 'undefined' ? 'undefined' : _typeof(expr);
    
          switch (type) {
            case 'function':
              return !!expr.call();
            case 'string':
              return !!document.querySelector(expr);
          }
    
          return true;
        },
    
    
        destroy: function destroy() {
          if (this.winTimeout) {
            clearTimeout(this.winTimeout);
          }
        },
    
    
        poll: function poll(delay, multiplier, successCallback, timeoutCallback) {
          var _this = this;
    
          if (!this.startedAt) {
            this.startedAt = new Date().getTime();
          }
    
          var exceedsMaxDuration = this.maxDuration ? this.startedAt + this.maxDuration < new Date().getTime() : false;
    
          if (exceedsMaxDuration) {
            if (typeof timeoutCallback === 'function') {
              timeoutCallback(this.elm);
            }
            this.destroy();
    
            return false;
          }
    
          this.winTimeout = setTimeout(function () {
            if (_this.expressionValidator(_this.elm)) {
              return successCallback(_this);
            } else {
              _this.poll(delay * multiplier, multiplier, successCallback, timeoutCallback);
            }
          }, delay);
        }
      };
    };
    
    var poller = function poller(elements, cb, options) {
      var settings = {
        wait: 50,
        multiplier: 1.1,
        timeout: 0,
        timeoutCallback: function timeoutCallback() {}
      };
    
      if (options) {
        for (var option in options) {
          settings[option] = options[option];
        }
      }
    
      var pollingElements = [],
          successfullyPolledElements = [];
    
      for (var i = 0; i < elements.length; i++) {
        var pollingElement = createPollingElement({
          elm: elements[i],
          maxDuration: settings.timeout
        });
    
        pollingElements.push(pollingElement);
    
        pollingElement.poll(settings.wait, settings.multiplier, function (pollingElement) {
          successfullyPolledElements.push(pollingElement);
    
          if (successfullyPolledElements.length === elements.length) {
            cb();
          }
        }, settings.timeoutCallback);
      }
    
      return {
        destroy: function destroy() {
          pollingElements.forEach(function (item) {
            return item.destroy();
          });
        }
      };
    };
    
    var pollerLite = function pollerLite(elements, cb, options) {
      var settings = {
        wait: 50,
        multiplier: 1.1,
        timeout: 0
      };
    
      var now = Date.now || function () {
        return new Date().getTime();
      };
    
      if (options) {
        for (var option in options) {
          settings[option] = options[option];
        }
      } else {
        options = settings;
      }
    
      var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
      var wait = settings.wait;
      var multiplier = settings.multiplier;
    
      var successful = [];
      var time;
      var pollForElement = function pollForElement(condition, time) {
        if (timeout && now() > timeout) {
          return false;
        }
        time = time || wait;
    
        var conditionIsTrue = function () {
          var type = typeof condition === 'undefined' ? 'undefined' : _typeof(condition);
          var toReturn;
    
          if (type === 'function') {
            toReturn = condition();
          } else if (type === 'string') {
            toReturn = document.querySelector(condition);
          } else {
            toReturn = true;
          }
    
          return toReturn;
        }();
    
        if (conditionIsTrue) {
          successful.push(true);
          if (successful.length === elements.length) cb();
        } else {
          setTimeout(function () {
            pollForElement(condition, time * multiplier);
          }, time);
        }
      };
    
      for (var i = 0; i < elements.length; i++) {
        pollForElement(elements[i]);
      }
    };
    
    
    
    
    
    
    
    var fullStory = function fullStory(experiment_str, variation_str) {
      pollerLite([function () {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
      }], function () {
        window.FS.setUserVars({
          experiment_str: experiment_str,
          variation_str: variation_str
        });
      }, { multiplier: 1.2, timeout: 0 });
    };
    
    var events = {
      trackerName: false,
      analyticsReference: 'ga',
      setDefaultCategory: function setDefaultCategory(category) {
        this.category = category;
    
        return this;
      },
      setTrackerName: function setTrackerName(trackerName) {
        this.trackerName = trackerName;
      },
      useLegacyTracker: function useLegacyTracker() {
        this.analyticsReference = '_gaq';
      },
      eventCache: [],
      send: function send(category, action, label, options) {
        options = options || {};
        category = category || this.category;
    
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.sendOnce) {
          var eventID = category + action + label;
          if (this.eventCache.indexOf(eventID) > -1) {
            return false;
          } else {
            this.eventCache.push(eventID);
          }
        }
    
        var self = this;
        var fire = function fire(tracker) {
          if (self.analyticsReference == '_gaq') {
            _gaq.push(['_trackEvent', category, action, label, null, typeof options.nonInteraction !== 'undefined' ? options.nonInteraction : true]);
          } else {
            window[self.analyticsReference](tracker + '.send', 'event', category, action, label, { nonInteraction: options.nonInteraction ? options.nonInteraction : true });
          }
        };
    
        if (self.trackerName) {
          fire(self.trackerName);
        } else {
          pollerLite([function () {
            try {
              if (self.analyticsReference == '_gaq') {
                return !!window._gaq;
              } else {
                var trackers = window[self.analyticsReference].getAll();
                if (trackers && trackers.length) {
                  return true;
                } else {
                  return false;
                }
              }
            } catch (err) {}
          }], function () {
            if (window[self.analyticsReference].getAll) {
              self.trackerName = window[self.analyticsReference].getAll()[0].get('name');
            }
            fire(self.trackerName);
          });
        }
      }
    };
    
    
    
    
    
    
    
    
    var eventFire = function eventFire(el, type) {
      if (el.fireEvent) {
        el.fireEvent('on' + type);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(type, true, false);
        el.dispatchEvent(evObj);
      }
    };
    
    
    
    
    
    
    
    
    
    
    
    var Experiment = {
      globals: {
        ID: 'FL002',
        variation: '1',
        pageData: null,
        productCategory: null
      },
    
      init: function init() {
        var globals = Experiment.globals,
            services = Experiment.services,
            components = Experiment.components;
    
        events.analyticsReference = '_gaUAT';
        // events.send('FL002', 'View', 'FL002 Variation 1 ran', { sendOnce: true });
    
        services.cacheDOM();
        services.tracking();
        services.populateGlobals();
    
        var pageData = globals.pageData;
        var productGender = pageData.productGender;
        var productCategory = globals.productCategory;
    
    
        if (!productCategory) {
          events.send('FL026', 'View', 'Experiment did not run - Could not determine category');
          return false;
        }
    
        globals.categoryData = sizeGuideData[productGender][productCategory];
        if (globals.categoryData) {
          var categoryClass = productCategory.replace(/[/\s]/, '');
          services.addBodyClasses([globals.ID, 'FL002--' + categoryClass]);
    
          components.SizeGuide.init(globals.categoryData);
    
          // events.send('FL002', 'View', 'Experiment ran', { sendOnce: true });
          events.send('FL026', 'Category', productCategory, { sendOnce: true });
        } else {
          // events.send('FL002', 'View', 'Experiment did not run - no size guide info for product', { sendOnce: true });
        }
    
        return true;
      },
    
    
      services: {
        populateGlobals: function populateGlobals() {
          var globals = Experiment.globals;
    
          globals.pageData = this.getPageData();
          globals.productCategory = this.getCategory();
        },
    
    
        getCategory: function getCategory() {
          var globals = Experiment.globals;
          var pageData = globals.pageData;
          var productName = pageData.productName;
    
          var category = void 0;
          var dataLayerCategory = pageData.productCategory;
          if (pageData.productGender === 'Men') {
            if (dataLayerCategory === 'Clothing') {
              switch (true) {
                case !!productName.match(/polo shirt/gi):
                  category = 'Casual Shirts';
                  break;
    
                case !!productName.match(/t shirt/gi):
                  category = 'Casual Shirts';
                  break;
    
                case !!productName.match(/t-shirt/gi):
                  category = 'Casual Shirts';
                  break;
    
                case !!productName.match(/jumpsuit/gi):
                  category = 'Clothing';
                  break;
    
                case !!productName.match(/dress/gi):
                  category = 'Clothing';
                  break;
    
                case !!productName.match(/jean/gi):
                  category = 'Jeans';
                  break;
    
                case !!productName.match(/trouser/gi):
                  category = 'Trousers';
                  break;
    
                case !!productName.match(/chino/gi):
                  category = 'Trousers';
                  break;
    
                case !!productName.match(/jogger/gi):
                  category = 'Trousers';
                  break;
    
                case !!productName.match(/pants/gi):
                  category = 'Trousers';
                  break;
    
                case !!productName.match(/boxer/gi):
                  category = 'Swim/Underwear';
                  break;
    
                case !!productName.match(/shorts/gi):
                  category = 'Trousers';
                  break;
    
                case !!productName.match(/bottoms/gi):
                  category = 'Trousers';
                  break;
    
                case !!productName.match(/coat/gi):
                  category = 'Outerwear';
                  break;
    
                case !!productName.match(/jacket/gi):
                  category = 'Outerwear';
                  break;
    
                case !!productName.match(/gilet/gi):
                  category = 'Outerwear';
                  break;
    
                case !!productName.match(/brief/gi):
                  category = 'Swim/Underwear';
                  break;
    
                case !!productName.match(/trunk/gi):
                  category = 'Swim/Underwear';
                  break;
    
                case !!productName.match(/sweatshirt/gi):
                  category = 'Tops/Knitwear';
                  break;
    
                case !!productName.match(/shirt/gi):
                  category = 'Formal Shirts';
                  break;
    
                case !!productName.match(/jumper/gi):
                  category = 'Tops/Knitwear';
                  break;
    
                case !!productName.match(/cardigan/gi):
                  category = 'Tops/Knitwear';
                  break;
    
                case !!productName.match(/kimono/gi):
                  category = 'Tops/Knitwear';
                  break;
    
                case !!productName.match(/suit/gi):
                  category = 'Tailoring';
                  break;
    
                case !!productName.match(/blazer/gi):
                  category = 'Tailoring';
                  break;
    
                case !!productName.match(/sock/gi):
                  category = 'Socks';
                  break;
    
                case !!productName.match(/cap/gi):
                  category = 'Hats';
                  break;
    
                case !!productName.match(/hat/gi):
                  category = 'Hats';
                  break;
    
                default:
                  break;
              }
            } else if (dataLayerCategory === 'Accessories') {
              switch (true) {
                case !!productName.match(/cap/gi):
                  category = 'Hats';
                  break;
    
                case !!productName.match(/hat/gi):
                  category = 'Hats';
                  break;
    
                case !!productName.match(/belt/gi):
                  category = 'Belts';
                  break;
    
                case !!productName.match(/glove/gi):
                  category = 'Gloves';
                  break;
    
                case !!productName.match(/sock/gi):
                  category = 'Socks';
                  break;
    
                default:
                  break;
              }
            } else if (dataLayerCategory === 'Footwear') {
              category = 'Footwear';
            }
          } else if (pageData.productGender === 'Women') {
            if (dataLayerCategory === 'Clothing') {
              switch (true) {
                case !!productName.match(/jean/gi):
                  category = 'Jeans';
                  break;
    
                default:
                  category = 'Clothing';
              }
            } else if (dataLayerCategory === 'Footwear') {
              category = 'Footwear';
            }
          } else if (pageData.productGender === 'Unisex') {
            if (dataLayerCategory === 'Clothing') {
              switch (true) {
                case !!productName.match(/cap/gi):
                  category = 'Hats';
                  break;
    
                case !!productName.match(/hat/gi):
                  category = 'Hats';
                  break;
    
                default:
                  break;
              }
            } else if (dataLayerCategory === 'Accessories') {
              switch (true) {
                case !!productName.match(/cap/gi):
                  category = 'Hats';
                  break;
    
                case !!productName.match(/hat/gi):
                  category = 'Hats';
                  break;
    
                default:
                  break;
              }
            }
          }
    
          return category;
        },
    
    
        getPageData: function getPageData() {
          var dataObject = void 0;
          for (var i = 0; i < window.dataLayer.length; i += 1) {
            var data = window.dataLayer[i];
            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data.event && data.event === 'FLAN_onLoad') {
              dataObject = data;
              break;
            }
          }
          return dataObject;
        },
    
    
        addBodyClasses: function addBodyClasses(classes) {
          if (typeof classes === 'string') {
            document.body.classList.add(classes);
          }
          for (var i = 0; i < classes.length; i += 1) {
            document.body.classList.add(classes[i]);
          }
        },
    
    
        tracking: function tracking() {
          var _Experiment$globals = Experiment.globals,
              ID = _Experiment$globals.ID,
              variation = _Experiment$globals.variation;
    
          fullStory(ID, 'Variation ' + variation);
        },
    
    
        cacheDOM: function cacheDOM() {
          var elements = Experiment.cache.elements;
    
          elements.sizeGuideLinks = document.querySelectorAll('.FL001_sizeGuideBtn > a');
          elements.description = document.querySelector('[itemprop="description"]');
          return elements;
        },
    
    
        getSizingType: function getSizingType() {
          var elements = Experiment.cache.elements;
    
          var listItems = elements.description.querySelectorAll('li');
          var sizingType = void 0;
          [].forEach.call(listItems, function (listItem) {
            if (listItem.innerText.match('Size selection:')) {
              var modifiedString = listItem.innerText.replace('Size selection:', '').trim();
              sizingType = modifiedString;
            }
          });
          return sizingType;
        }
      },
    
      components: {
        SizeGuide: {
          subcomponents: {
            MetricConverter: {
              create: function create(data) {
                var el = document.createElement('div');
                el.classList.add('FL002_MetricConverter');
    
                var switchData = data.metricSwitch;
                var metricSwitch = document.createElement('div');
                if (switchData) {
                  metricSwitch.classList.add('FL002_switch');
                  metricSwitch.innerHTML = '\n                <input type="checkbox" class="FL002_switch__checkbox FL002_hidden" />\n                <div class="FL002_switch__label FL002_switch__label--active" data-metric="metricOne">' + switchData.metricOneLabel + '</div>\n                <div class="FL002_switch__slider FL002_switch__slider--left">\n                  <div class="FL002_switch__slider__thumb"></div>\n                  <div class="FL002_switch__slider__track"></div>\n                </div>\n                <div class="FL002_switch__label" data-metric="metricTwo">' + switchData.metricTwoLabel + '</div>\n              ';
                }
    
                var table = document.createElement('div');
                table.classList.add('FL002_MetricConverter__table');
                table.innerHTML = '' + data.metricConverter.labels + data.metricConverter.html;
    
    
                if (switchData) {
                  el.appendChild(metricSwitch);
                }
                el.appendChild(table);
    
                return el;
              },
    
    
              bindEvents: function bindEvents(component) {
                var metricSwitch = component.querySelector('.FL002_switch');
                if (metricSwitch) {
                  var checkbox = metricSwitch.querySelector('input');
                  var slider = metricSwitch.querySelector('.FL002_switch__slider');
                  var metricOneData = component.querySelectorAll('tr[data-metric="metricOne"]');
                  var metricTwoData = component.querySelectorAll('tr[data-metric="metricTwo"]');
    
                  metricSwitch.addEventListener('click', function () {
                    checkbox.checked = !checkbox.checked;
                    eventFire(checkbox, 'change');
                  });
    
                  var changeToMetricTwo = function changeToMetricTwo() {
                    [].forEach.call(metricOneData, function (element) {
                      var el = element;
                      el.style.display = 'none';
                    });
    
                    [].forEach.call(metricTwoData, function (element) {
                      var el = element;
                      el.style.display = 'table-row';
                    });
    
                    slider.classList.remove('FL002_switch__slider--left');
                    slider.classList.add('FL002_switch__slider--right');
                  };
    
                  var changeToMetricOne = function changeToMetricOne() {
                    [].forEach.call(metricOneData, function (element) {
                      var el = element;
                      el.style.display = 'table-row';
                    });
    
                    [].forEach.call(metricTwoData, function (element) {
                      var el = element;
                      el.style.display = 'none';
                    });
    
                    slider.classList.remove('FL002_switch__slider--right');
                    slider.classList.add('FL002_switch__slider--left');
                  };
    
                  checkbox.addEventListener('change', function () {
                    if (metricOneData[0].style.display !== 'none') {
                      changeToMetricTwo();
                    } else {
                      changeToMetricOne();
                    }
                  });
                }
    
                var link = component.querySelector('#FL002_MetricConverter__convertLink');
                if (link) {
                  link.addEventListener('click', function () {
                    $('.FL002_SizeGuide').animate({
                      scrollTop: $('.FL002_CountryConverter').offset().top
                    }, 800);
                  });
                }
              },
    
    
              init: function init(data) {
                if (!data.metricConverter) return false;
                var component = this.create(data);
                this.bindEvents(component);
                return component;
              }
            },
    
            CountryConverter: {
              create: function create(data) {
                var countries = data.countryConverter.countries;
    
    
                var el = document.createElement('div');
                el.classList.add('FL002_CountryConverter');
    
                var heading = document.createElement('h3');
                heading.innerText = 'Size Converter';
    
                var table = document.createElement('div');
                table.classList.add('FL002_CountryConverter__table');
    
                var labels = document.createElement('table');
                labels.classList.add('FL002_CountryConverter__labels');
                var labelsBody = document.createElement('tbody');
                labels.appendChild(labelsBody);
    
                var values = document.createElement('table');
                values.classList.add('FL002_CountryConverter__values');
                var valuesBody = document.createElement('tbody');
                values.appendChild(valuesBody);
    
                var LIMIT = 2;
                var i = 0;
                [].forEach.call(countries, function (country) {
                  if (i === LIMIT) {
                    return false;
                  }
                  i += 1;
                  var labelRow = document.createElement('tr');
                  var labelHead = document.createElement('th');
                  labelHead.setAttribute('data-value', country.name);
                  labelHead.innerHTML = '\n              <div class="FL002_CountryConverter__label">\n                <span class="FL002_table__flag ' + country.flagClass + '"></span>' + country.name + '\n              </div>\n              ';
    
                  var select = document.createElement('div');
                  select.classList.add('FL002_CountryConverter__select');
                  var optionsWrap = document.createElement('div');
                  optionsWrap.classList.add('FL002_CountryConverter__optionsWrap');
                  [].forEach.call(countries, function (selectCountry) {
                    var option = document.createElement('div');
                    option.classList.add('FL002_CountryConverter__select__option');
                    option.setAttribute('data-newValue', selectCountry.name);
                    if (country.name === selectCountry.name) {
                      option.classList.add('FL002_CountryConverter__select__option--active');
                    }
                    option.innerHTML = '\n                <span class="FL002_table__flag ' + selectCountry.flagClass + '"></span>' + selectCountry.name + '\n                ';
                    optionsWrap.appendChild(option);
                  });
                  select.appendChild(optionsWrap);
                  labelHead.appendChild(select);
    
                  labelRow.appendChild(labelHead);
                  labelsBody.appendChild(labelRow);
    
                  var valueRow = document.createElement('tr');
                  valueRow.setAttribute('data-value', country.name);
                  [].forEach.call(country.sizes, function (size) {
                    var valueData = document.createElement('td');
                    valueData.innerHTML = size;
                    valueRow.appendChild(valueData);
                  });
                  valuesBody.appendChild(valueRow);
                });
    
                table.appendChild(labels);
                table.appendChild(values);
                el.appendChild(heading);
                el.appendChild(table);
    
                return el;
              },
    
    
              bindEvents: function bindEvents(component, data) {
                var headings = component.querySelectorAll('th');
                [].forEach.call(headings, function (heading) {
                  heading.addEventListener('click', function () {
                    var allSelects = component.querySelectorAll('.FL002_CountryConverter__select');
                    var thisSelect = heading.querySelector('.FL002_CountryConverter__select');
                    if (thisSelect.style.display === '' || thisSelect.style.display === 'none') {
                      [].forEach.call(allSelects, function (select) {
                        if (select.style.display === 'block') {
                          select.style.display = 'none';
                        }
                      });
                      thisSelect.style.display = 'block';
                    } else {
                      thisSelect.style.display = 'none';
                    }
                  });
                });
    
                var updateRow = function updateRow(index, country) {
                  events.send('FL026', 'Change', 'User interacted with size converter', { sendOnce: true });
                  var rowLabel = component.querySelectorAll('.FL002_CountryConverter__labels > tbody tr')[index];
                  var rowValue = component.querySelectorAll('.FL002_CountryConverter__values > tbody > tr')[index];
                  var countryData = function () {
                    var matchingCountryData = void 0;
                    [].forEach.call(data.countryConverter.countries, function (newCountryData) {
                      if (newCountryData.name === country) {
                        matchingCountryData = newCountryData;
                      }
                    });
                    return matchingCountryData;
                  }();
    
                  rowLabel.querySelector('.FL002_CountryConverter__label').innerHTML = '\n                <span class="FL002_table__flag ' + countryData.flagClass + '"></span>' + countryData.name + '\n              ';
                  rowValue.innerHTML = function () {
                    var html = '';
                    [].forEach.call(countryData.sizes, function (size) {
                      html += '<td>' + size + '</td>';
                    });
                    return html;
                  }();
    
                  rowLabel.setAttribute('data-value', country);
                  rowLabel.querySelector('th').setAttribute('data-value', country);
                  rowValue.setAttribute('data-value', country);
    
                  rowLabel.querySelector('.FL002_CountryConverter__select__option--active').classList.remove('FL002_CountryConverter__select__option--active');
                  rowLabel.querySelector('.FL002_CountryConverter__select__option[data-newvalue="' + country + '"]').classList.add('FL002_CountryConverter__select__option--active');
                };
    
                var options = component.querySelectorAll('.FL002_CountryConverter__select__option');
                [].forEach.call(options, function (option) {
                  option.addEventListener('click', function () {
                    var newCountry = option.getAttribute('data-newvalue');
                    var index = option.parentElement.parentElement.parentElement.parentElement.rowIndex;
                    if (typeof index === 'number' && typeof newCountry === 'string') {
                      updateRow(index, newCountry);
                    }
                  });
                });
              },
    
    
              init: function init(data) {
                if (!data.countryConverter) return false;
                var component = this.create(data);
                this.bindEvents(component, data);
                return component;
              }
            },
    
            HowToMeasure: {
              create: function create(data) {
                var stepsData = data.howToMeasure;
    
                var el = document.createElement('div');
                el.classList.add('FL002_HowToMeasure');
    
                var heading = document.createElement('h3');
                heading.innerText = 'How To Measure';
    
                var steps = document.createElement('div');
                steps.classList.add('FL002_HowToMeasure__steps');
                for (var i = 0; i < stepsData.length; i += 1) {
                  var stepData = stepsData[i];
                  var step = document.createElement('div');
                  step.classList.add('FL002_HowToMeasure__step');
                  step.innerHTML = '\n                <h3 class="FL002_heading--type2">' + stepData.title + '</h3>\n                <div class="FL002_HowToMeasure__step__img">\n                  <img src="' + stepData.img + '" />\n                </div>\n                <p>' + stepData.text + '</p>\n              ';
                  steps.appendChild(step);
                }
                var scrollTip = document.createElement('div');
                scrollTip.classList.add('FL002_scrollTip');
                scrollTip.innerText = '❮•❯ Scroll horizontally to see more.';
    
                el.appendChild(heading);
                el.appendChild(steps);
                el.appendChild(scrollTip);
    
                return el;
              },
    
    
              bindEvents: function bindEvents(component) {},
    
    
              init: function init(data) {
                var component = this.create(data);
                this.bindEvents(component);
                return component;
              }
            }
          },
    
          create: function create(data) {
            var _this2 = this;
    
            var globals = Experiment.globals;
    
    
            var el = document.createElement('div');
            el.classList.add('FL002_SizeGuide');
    
            var head = function () {
              var headEl = document.createElement('div');
              headEl.classList.add('FL002_SizeGuide__header');
    
              var heading = document.createElement('h1');
              heading.innerText = 'Size Guide';
    
              var close = document.createElement('div');
              close.classList.add('FL002_SizeGuide__close');
              close.innerText = '×';
    
              headEl.appendChild(heading);
              headEl.appendChild(close);
    
              return headEl;
            }();
    
            var body = function () {
              var bodyEl = document.createElement('div');
              bodyEl.classList.add('FL002_SizeGuide__body');
    
              var heading = document.createElement('h2');
              heading.innerText = globals.pageData.productGender + ' ' + globals.productCategory + ' Sizing';
    
              var subheading = document.createElement('h3');
              subheading.classList.add('FL002_heading--type2');
              subheading.innerText = 'Find your size';
    
              var MetricConverter = _this2.subcomponents.MetricConverter.init(data);
    
    
              var CountryConverter = _this2.subcomponents.CountryConverter.init(data);
    
    
              bodyEl.appendChild(heading);
              bodyEl.appendChild(subheading);
              if (MetricConverter) bodyEl.appendChild(MetricConverter);
              if (CountryConverter) bodyEl.appendChild(CountryConverter);
    
              var scrollTip = document.createElement('div');
              scrollTip.classList.add('FL002_scrollTip');
              scrollTip.innerText = '❮•❯ Scroll horizontally to see more sizes.';
              if (MetricConverter) {
                var table = MetricConverter.querySelector('.FL002_MetricConverter__table');
                table.parentElement.insertBefore(scrollTip, table);
                scrollTip.style.marginBottom = '10px';
                scrollTip.style.marginTop = '0';
              } else if (CountryConverter) {
                var _table = CountryConverter.querySelector('.FL002_CountryConverter__table');
                _table.parentElement.insertBefore(scrollTip, _table);
                scrollTip.style.marginBottom = '10px';
                scrollTip.style.marginTop = '0';
              }
    
              return bodyEl;
            }();
    
            el.appendChild(head);
            el.appendChild(body);
    
            return el;
          },
    
    
          bindEvents: function bindEvents(component) {
            var sizeGuideLinks = Experiment.cache.elements.sizeGuideLinks;
            // if (sizeGuideLinks.length === 0) {
            //   sizeGuideLinks = document.querySelectorAll('.s-productextras-column-3 a.sizeslink .SizeGuideText');
            // }
            sizeGuideLinks.forEach(function (el) {
              var newSizeGuideLink = function () {
                var element = document.createElement('a');
                element.classList.add('FL002_sizeGuideLink');
                element.href = 'javascript:void(0)';
                element.innerHTML = '<span>Size guide</span><span class="SizeGuideIco"></span>';
                return element;
              }();
              
              newSizeGuideLink.addEventListener('click', function (e) {
                e.preventDefault();
                component.classList.add('FL002_SizeGuide--visible');
                document.body.classList.add('FL002_scrollLock');
                document.documentElement.classList.add('FL002_scrollLock');
                // events.send('FL002', 'View', 'Size guide opened');
                window._gaUAT('send', {
                  hitType: 'pageview',
                  page: 'https://www.flannels.com/Popup_SizeGuide',
                  title: 'Flannels > Popup_SizeGuide'
                });
              });
    
              var parent = el.parentElement;
              parent.removeChild(el);
              parent.appendChild(newSizeGuideLink);
            });
    
            var close = component.querySelector('.FL002_SizeGuide__close');
            close.addEventListener('click', function () {
              component.classList.remove('FL002_SizeGuide--visible');
              document.body.classList.remove('FL002_scrollLock');
              document.documentElement.classList.remove('FL002_scrollLock');
            });
          },
    
    
          render: function render(component) {
            document.body.appendChild(component);
    
          },
    
    
          init: function init(data) {
            var component = this.create(data);
            this.bindEvents(component);
            this.render(component);
            return component;
          }
        }
      },
    
      cache: {
        elements: {}
      }
    };
    
    poller(['#productDetails'], Experiment.init);
  })();
};
export default FL002;
