/* Mengambil URL Base */
var baseUrl = window.location.protocol + "//" + window.location.host;
var baseUrlInput = document.getElementById("copY");
baseUrlInput.value = `${baseUrl}/api/v1`;
