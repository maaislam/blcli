var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()
function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}
function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(1000)
  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    // Updating row with extra data
    // GetRange args: starting_row, starting_col, num_rows, num_cols
    if (e.parameter['rowID']) {
      // Set 1 value only, the last column (4th col)
      var feedback =  e.parameter['free_text']; // This is what's sent in the request.
      sheet.getRange(e.parameter['rowID'], 4, 1, 1).setValues([[feedback]])
    }
    else {
      var nextRow = sheet.getLastRow() + 1
      var newRow = headers.map(function(header) {
        return header === 'date' ? new Date() : e.parameter[header]
      })
      // Append a new row
      sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
    }
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }
  finally {
    lock.releaseLock()
  }
}