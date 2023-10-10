arrBulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
arrBulans = ["Jan","Feb","Maret","April","Mei","Juni","Juli","Agus","Sep","Okto","Nov","Des"];
arrHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

/* Date */
var d = new Date();
const jam = d.getHours();
const menit = d.getMinutes();
const detik = d.getSeconds();
const har = d.getDay();
const tgl = d.getDate();
const bln = d.getMonth();
const thn = d.getFullYear();
const bulan = arrBulan[bln] 
const hari = arrHari[har]

/* Browser */
var teks ="";
teks += "<p><b>Browser CodeName</b>: " + navigator.appCodeName + "</p>";
teks += "<p><b>Browser Name</b>: " + navigator.appName + "</p>";
teks += "<p><b>Cookies Enabled</b>: " + navigator.cookieEnabled + "</p>";
teks += "<p><b>Browser Online</b>: " + navigator.onLine + "</p>";
teks += "<p><b>Platform</b>: " + navigator.platform + "</p>";
teks += "<p><b>User-agent header</b>: <br><code>" + navigator.userAgent + "</code></p>";
teks += "<p><b>Versi Browser</b>: <br><code>" + navigator.appVersion + "</code></p>";

document.getElementById("browser").innerHTML= `${teks}`;

function tampilkanJam() {
    const sekarang = new Date();
    const jam = sekarang.getHours();
    const menit = sekarang.getMinutes();
    const detik = sekarang.getSeconds();

    const jamElement = document.getElementById("times");
    
    jamElement.innerHTML = `${jam} : ${menit} : ${detik}`;
    
}

// Panggil fungsi tampilkanJam() setiap detik
setInterval(tampilkanJam, 1000);

document.getElementById("hari").innerHTML= `${hari}, ${tgl} ${bulan} ${thn}`;

/* Ip Address */
// Mengambil data dari API
fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        // Memasukkan data ke dalam elemen HTML
        document.getElementById("ip").textContent = data.ip;
    })
    .catch(error => {
        document.getElementById("ip").textContent = `${error}`;
    });
 
 
/* Visitor Count*/
// Memeriksa apakah 'visitorCount' sudah ada di localStorage
if (localStorage.getItem('visitorCount') === null) {
    // Jika belum ada, inisialisasi dengan 1
    localStorage.setItem('visitorCount', '1');
}

// Mendapatkan jumlah pengunjung dari localStorage
const visitorCount = parseInt(localStorage.getItem('visitorCount'));

// Menampilkan jumlah pengunjung ke dalam elemen HTML
document.getElementById('visitor').textContent = visitorCount;

// Menambahkan 1 ke jumlah pengunjung dan menyimpannya kembali di localStorage
localStorage.setItem('visitorCount', (visitorCount + 1).toString());

