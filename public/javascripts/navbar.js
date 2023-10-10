
const dataList = document.getElementById('nyt');

// Menggunakan fetch untuk mengambil data JSON
fetch('https://raw.githubusercontent.com/triosihn1/rest-full-api/main/json/navbar.json')
  .then(response => response.json())
  .then(data => {
    let html = ''; // Buat variabel html di luar loop for
    for (const item of data) {
      if (item.key) {
        html += `<li class="nav-header">${item.key}</li>`;
      } else {
        const badge = item.hasOwnProperty('badge');
        html += `<li class="nav-item"><a href="${item.href}" class="nav-link"><i class="${item.icon}"></i><p>${item.title} ${badge ? `<span class="right badge ${item.class}">${item.badge}</span>` : ''}</p></a></li>`;
      }
    }
    dataList.innerHTML = html;
  })
  .catch(error => {
    // Penanganan kesalahan jika terjadi
    console.error('Terjadi kesalahan:', error);
  });
