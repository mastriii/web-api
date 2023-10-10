const { GoogleSpreadsheet } = require('google-spreadsheet');

const spreadsheetId = '1m16MYJR2AnPPxaUP0uq8LJ7WZYdWs'; // Ganti dengan ID Google Spreadsheet Anda
const credentials = require(__path + '/licence-game-8b2a4d157f44.json'); // Ganti dengan path ke berkas kredensial Anda

async function cekURLDiGoogleSheet(url) {
  const urlToCheck = url; // URL yang ingin Anda periksa

  try {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Ganti dengan indeks sheet yang sesuai

    const rows = await sheet.getRows();
    const urlFound = rows.some(row => row.D === urlToCheck);

    return urlFound;
  } catch (error) {
    console.error('Terjadi kesalahan saat memeriksa URL di Google Sheet:', error);
    return false;
  }
}

module.exports = cekURLDiGoogleSheet;
