/**
 * Google Apps Script Web App Bridge to receive Web App submissions directly into Google Sheets
 * Target Account: evarun5115@gmail.com
 * Repository: https://github.com/evarun5115-tech/MT_questionnaire
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com/ while logged into evarun5115@gmail.com
 * 2. Create a new Google Sheet named "Website Survey Responses" in Google Drive.
 * 3. Open https://script.google.com/, paste this code into Code.gs.
 * 4. Replace `SPREADSHEET_ID_HERE` with your Google Sheet ID (from the sheet URL).
 * 5. Click "Deploy" > "New Deployment" > Select type "Web App".
 * 6. Set "Execute as": "Me (evarun5115@gmail.com)".
 * 7. Set "Who has access": "Anyone".
 * 8. Copy the Web App URL and paste it into app.js `GOOGLE_SHEET_WEB_APP_URL` variable.
 */

var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // Replace with your Sheet ID

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Create header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Gender", "Age", "Shopping_Frequency", "Primary_Category", 
        "Ever_Abandoned_Screening", "PCP1", "PCP2", "PCP3", "TPR1", "TPR2", 
        "TPR3", "WAE1", "WAE2", "WAE3", "PRP1", "PRP2", "PI1", "PI2", "CA1", 
        "Q20_Abandonment_Reason", "Q21_Platform_Incentive"
      ]);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.gender || "",
      data.age || "",
      data.frequency || "",
      data.category || "",
      data.screening || "",
      data.q6 || "",
      data.q7 || "",
      data.q8 || "",
      data.q9 || "",
      data.q10 || "",
      data.q11 || "",
      data.q12 || "",
      data.q13 || "",
      data.q14 || "",
      data.q15 || "",
      data.q16 || "",
      data.q17 || "",
      data.q18 || "",
      data.q19 || "",
      data.q20 || "",
      data.q21 || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
