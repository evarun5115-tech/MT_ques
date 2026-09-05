/**
 * Standalone Questionnaire Handler & Google Sheets Bridge
 * Project: From Cart to Conversion
 * Account: evarun5115@gmail.com
 */

// If you deploy google_sheets_bridge.gs as a Web App in Google Apps Script, paste your Web App URL here:
const GOOGLE_SHEETS_WEB_APP_URL = "";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('questionnaire-form');
  const successScreen = document.getElementById('success-screen');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const getRadio = (name) => {
      const el = form.querySelector(`input[name="${name}"]:checked`);
      return el ? el.value : '';
    };

    const getVal = (name) => {
      const el = form.querySelector(`[name="${name}"]`);
      return el ? el.value.trim() : '';
    };

    const payload = {
      timestamp: new Date().toISOString(),
      gender: getRadio('gender'),
      age: getRadio('age'),
      frequency: getRadio('frequency'),
      category: getRadio('category'),
      screening: getRadio('screening'),
      q6: getRadio('q6'),
      q7: getRadio('q7'),
      q8: getRadio('q8'),
      q9: getRadio('q9'),
      q10: getRadio('q10'),
      q11: getRadio('q11'),
      q12: getRadio('q12'),
      q13: getRadio('q13'),
      q14: getRadio('q14'),
      q15: getRadio('q15'),
      q16: getRadio('q16'),
      q17: getRadio('q17'),
      q18: getRadio('q18'),
      q19: getRadio('q19'),
      q20: getVal('q20'),
      q21: getVal('q21')
    };

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Saving Response...</span>';
    }

    // Send payload to Google Sheets Web App if configured
    if (GOOGLE_SHEETS_WEB_APP_URL && GOOGLE_SHEETS_WEB_APP_URL.startsWith('http')) {
      try {
        await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error('Error saving to Google Sheets:', err);
      }
    }

    // Show Thank You Success Overlay
    if (successScreen) {
      successScreen.style.display = 'flex';
    }
  });
});
