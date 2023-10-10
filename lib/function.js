const axios = require('axios');

/* Cek url */
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function isTikTokURL(url) {
  return url.includes("tiktok.com");
}

exports.ttUrl = async (url) => {
  const data = {};
  
  if (isValidURL(url)) {
    if (isTikTokURL(url)) {
      data.status = true;
      data.msg = "";
      return data;
    } else {
      data.status = false;
      data.msg = "Cek kembali URL-nya !!!";
      return data;
    }
  } else {
    data.status = false;
    data.msg = "Ini bukan URL !!!";
    return data;
  }

  
};
