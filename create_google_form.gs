/**
 * Google Apps Script to Automatically Create Google Form & Link to Google Sheets
 * Project: From Cart to Conversion Academic Research
 * Account: evarun5115@gmail.com
 * 
 * HOW TO USE:
 * 1. Log into your Google account (evarun5115@gmail.com) and go to https://script.google.com/
 * 2. Click "+ New Project"
 * 3. Delete any code in Code.gs and paste this entire script.
 * 4. Click the "Run ▶" button at the top.
 * 5. Grant permissions when prompted.
 * 6. View the Execution Log to get your Form Edit Link, Public Share Link, and linked Google Sheet Link!
 */

function createCartAbandonmentFormAndSheet() {
  var formTitle = "From Cart to Conversion: An Integrated Orange, JASP and SmartPLS-SEM Approach to Understanding and Reducing E-Commerce Cart Abandonment";
  
  // 1. Create Google Form
  var form = FormApp.create(formTitle);
  
  var formIntro = 
    "This questionnaire is completely anonymous and is being conducted for academic purposes as part of a Marketing Technology project.\n\n" +
    "The purpose of this study is to understand the factors that influence customers' decisions to complete or abandon online shopping carts.\n\n" +
    "Your responses will be used only for academic analysis. No name, phone number, email address, or other personally identifiable information is required.\n\n" +
    "Estimated time: 3–5 minutes.";
    
  form.setDescription(formIntro);
  form.setAllowResponseEdits(false);
  form.setAcceptingResponses(true);
  form.setTitle(formTitle);

  // 2. Create Linked Google Sheet automatically in Google Drive
  var ss = SpreadsheetApp.create("Cart Abandonment Survey Responses (Live Data Sheet)");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ==========================================
  // SECTION A: BASIC INFORMATION
  // ==========================================
  var secAHeader = form.addSectionHeaderItem();
  secAHeader.setTitle("Section A — Basic Information");
  secAHeader.setHelpText("Please provide general demographic and online shopping background information.");
  
  form.addMultipleChoiceItem()
    .setTitle("1. Gender")
    .setChoiceValues(["Male", "Female", "Prefer not to say", "Other"])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("2. Age")
    .setChoiceValues(["Below 18", "18–24", "25–34", "35–44", "45–54", "55 or above"])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("3. How frequently do you shop online?")
    .setChoiceValues([
      "Less than once a month",
      "1–2 times a month",
      "3–5 times a month",
      "6–10 times a month",
      "More than 10 times a month"
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("4. Which online shopping category do you purchase most frequently?")
    .setChoiceValues([
      "Clothing/Fashion",
      "Electronics",
      "Beauty/Personal Care",
      "Food/Grocery",
      "Home & Lifestyle",
      "Other"
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("5. Have you ever added a product to an online shopping cart but not completed the purchase?")
    .setHelpText("This is an important screening question. It establishes whether respondents have actually experienced cart abandonment.")
    .setChoiceValues(["Yes", "No", "Not sure"])
    .setRequired(true);

  // ==========================================
  // SECTION B: MAIN QUESTIONNAIRE (Likert 1-5)
  // ==========================================
  form.addPageBreakItem()
    .setTitle("Section B — Main Questionnaire")
    .setHelpText("For Questions 6–19, please indicate your level of agreement using the 5-point scale:\n1 = Strongly Disagree | 2 = Disagree | 3 = Neither Agree nor Disagree | 4 = Agree | 5 = Strongly Agree");

  function addLikert(title, construct) {
    form.addScaleItem()
      .setTitle(title)
      .setBounds(1, 5)
      .setLabels("Strongly Disagree", "Strongly Agree")
      .setHelpText("Construct: " + construct)
      .setRequired(true);
  }

  // --- Price & Cost Perception ---
  form.addSectionHeaderItem().setTitle("Price & Cost Perception (PCP)");
  addLikert("6. Unexpected delivery charges or additional costs make me reconsider completing an online purchase.", "Price & Cost Perception");
  addLikert("7. I compare prices on other shopping platforms before completing an online purchase.", "Price & Cost Perception");
  addLikert("8. Finding a better price elsewhere can make me abandon my shopping cart.", "Price & Cost Perception");

  // --- Trust & Perceived Risk ---
  form.addSectionHeaderItem().setTitle("Trust & Perceived Risk (TPR)");
  addLikert("9. I feel confident providing my personal and payment information to online shopping platforms.", "Trust & Perceived Risk");
  addLikert("10. I am more likely to complete a purchase when the platform clearly communicates its return and refund policies.", "Trust & Perceived Risk");
  addLikert("11. Concerns about payment security can make me abandon my shopping cart.", "Trust & Perceived Risk");

  // --- Website/App Experience ---
  form.addSectionHeaderItem().setTitle("Website/App Experience (WAE)");
  addLikert("12. I find online shopping websites/apps easy to navigate.", "Website/App Experience");
  addLikert("13. A complicated or lengthy checkout process can make me abandon my cart.", "Website/App Experience");
  addLikert("14. A smooth and convenient checkout experience makes me more likely to complete my purchase.", "Website/App Experience");

  // --- Promotions & Personalization ---
  form.addSectionHeaderItem().setTitle("Promotions & Personalization (PRP)");
  addLikert("15. Discounts or promotional offers encourage me to complete an online purchase.", "Promotions & Personalization");
  addLikert("16. Personalized offers based on my shopping behaviour would make me more likely to complete my purchase.", "Promotions & Personalization");

  // --- Purchase Intention ---
  form.addSectionHeaderItem().setTitle("Purchase Intention (PI)");
  addLikert("17. When I add a product to my cart, I generally intend to purchase it.", "Purchase Intention");
  addLikert("18. I am likely to complete an online purchase when the product, price and checkout experience meet my expectations.", "Purchase Intention");

  // --- Cart Abandonment ---
  form.addSectionHeaderItem().setTitle("Cart Abandonment (CA)");
  addLikert("19. I often postpone or abandon an online purchase even after adding the product to my cart.", "Cart Abandonment");

  // ==========================================
  // SECTION C: OPEN-ENDED QUESTIONS
  // ==========================================
  form.addPageBreakItem()
    .setTitle("Section C — Open-Ended Questions")
    .setHelpText("Please provide brief descriptive feedback for the following qualitative questions.");

  form.addParagraphTextItem().setTitle("20. What is the main reason that would make you abandon an online shopping cart?").setRequired(false);
  form.addParagraphTextItem().setTitle("21. What could an online shopping platform do to encourage you to complete your purchase?").setRequired(false);

  Logger.log("====================================================");
  Logger.log("SUCCESS! Form & Google Sheet Created for evarun5115@gmail.com");
  Logger.log("Form Title: " + form.getTitle());
  Logger.log("Form Edit URL: " + form.getEditUrl());
  Logger.log("Public Share URL (Send to respondents): " + form.getPublishedUrl());
  Logger.log("Linked Google Sheet URL (View responses live): " + ss.getUrl());
  Logger.log("====================================================");
}
