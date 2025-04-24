/**
 * Install as an Apps Script  against a given sheet
 *
 * n.b. calls to the API are slow, and you need a pagespeed API key
 */

var pageSpeedApiKey = '<API KEY>';

/**
 * The name of the sheet tab
 */
var sheetName = 'FreeSoul'

/**
 * URLs to get CWV data for
 */
var pageSpeedMonitorUrls = [
  'https://herfreesoul.com/',
  'https://herfreesoul.com/products/marine-liquid-collagen-drink-for-women',
  'https://herfreesoul.com/products/ashwagandha-gummies',
  'https://herfreesoul.com/products/vegan-dual-use-complete-meal-shake',
  'https://herfreesoul.com/products/hair-skin-nails-gummies',
  'https://herfreesoul.com/products/3x-protein-bars-bundle',
  'https://herfreesoul.com/collections/shop',
  'https://herfreesoul.com/collections/bars',
  'https://herfreesoul.com/collections/supplements',
  'https://herfreesoul.com/blogs/blog/the-ultimate-beauty-bowl',
  'https://herfreesoul.com/blogs/blog/whey-protein-is-it-suitable-for-vegans',
  'https://herfreesoul.com/blogs/blog/5-fake-facts-youve-heard-about-protein-powder',
  'https://herfreesoul.com/account/login',
];

function monitor() {
  for (var i = 0; i < pageSpeedMonitorUrls.length; i++) {
    (function() {
      try {
        var url = encodeURIComponent(pageSpeedMonitorUrls[i]);

        var desktop = callPageSpeed(url, 'desktop');
        var mobile = callPageSpeed(url, 'mobile');

        addRow(url, desktop, mobile);
      } catch(e) {
        console.log(e);
      }
    })(i);
  }
}

function callPageSpeed(url, strategy) {
  var pageSpeedUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + url + '&key=' + pageSpeedApiKey + '&strategy=' + strategy;
  console.log(pageSpeedUrl);

  var response = UrlFetchApp.fetch(pageSpeedUrl);
  var json = response.getContentText();
  return JSON.parse(json);
}

function addRow(url, desktop, mobile) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  var result = [
    Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd'),
    decodeURIComponent(url),
  ];

  result = result.concat(getData(mobile))
  result = result.concat(getData(desktop));

  sheet.appendRow(result);
}

function getData(data) {
  // Field Data per metric values: percentile value / FAST / AVERAGE / SLOW

  var result = [];

  var fid = data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS;

  if(fid && fid.distributions && fid.distributions[2] && fid.distributions[2].proportion) {
    result = result.concat([
      fid.percentile,
      fid.distributions[0].proportion,
      fid.distributions[1].proportion,
      fid.distributions[2].proportion,
    ])
  } else {
    result = result.concat(['','','','']);
  }

  var lcp = data.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS;

  if(lcp && lcp.distributions && lcp.distributions[2] && lcp.distributions[2].proportion) {
    result = result.concat([
      lcp.percentile,
      lcp.distributions[0].proportion,
      lcp.distributions[1].proportion,
      lcp.distributions[2].proportion,
    ]);
  } else {
    result = result.concat(['','','','']);
  }

  var cls = data.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE;

  if(cls && cls.distributions && cls.distributions[2] && cls.distributions[2].proportion) {
    result = result.concat([
      cls.percentile,
      cls.distributions[0].proportion,
      cls.distributions[1].proportion,
      cls.distributions[2].proportion,
    ]);
  } else {
    result = result.concat(['','','','']);
  }

  var fcp = data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS;

  if(fcp && fcp.distributions && fcp.distributions[2] && fcp.distributions[2].proportion) {
    result = result.concat([
      fcp.percentile,
      fcp.distributions[0].proportion,
      fcp.distributions[1].proportion,
      fcp.distributions[2].proportion,
    ]);
  } else {
    result = result.concat(['','','','']);
  }

  if(data.lighthouseResult.audits) {
    result = result.concat([
      data.lighthouseResult.audits['first-contentful-paint'].displayValue,
      data.lighthouseResult.audits['largest-contentful-paint'].displayValue,
      data.lighthouseResult.audits['total-blocking-time'].displayValue,
      data.lighthouseResult.audits['speed-index'].displayValue,
      data.lighthouseResult.audits['interactive'].displayValue,
      data.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
      data.lighthouseResult.audits['first-meaningful-paint'].displayValue,
      data.lighthouseResult.audits['server-response-time'].displayValue,
      data.lighthouseResult.audits['dom-size'].displayValue,
    ]);
  } else {
    result = result.concat(['','','','', '', '', '', '', '']);
  }

  return result;
}

