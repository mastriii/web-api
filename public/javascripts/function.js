document.addEventListener("DOMContentLoaded", function() {
  
  submitButton.addEventListener("click", function() {
    // Matikan input dan tombol
    urlInput.disabled = true;
    submitButton.disabled = true;
    // Tampilkan loading
    loadingDiv.style.display = "block";
    responseDiv.style.display = "none";
    videoPlay.style.display = "none";
    // Buat objek XMLHttpRequest
    const xhr = new XMLHttpRequest();
    if(urlInput.value === ""){
    	urlInput.disabled = false;
    submitButton.disabled = false;
    loadingDiv.style.display = "none";
    responseDiv.style.display = "block";
    resultDiv.textContent = "Silakan masukkan url tiktok, agar anda dapat mendownload video nya.";
    }else{
    xhr.open("GET", "http://localhost:3000/api/v1?key=download&action=tiktok&url=" + encodeURIComponent(urlInput.value), true);
    xhr.onload = function() {
      // Sembunyikan loading
      loadingDiv.style.display = "none";
      if (xhr.status === 200) {
        // Tampilkan respon
        var response = JSON.parse(xhr.responseText);
        responseDiv.style.display = "block";
        imgDiv.style.display = "block";
        
        if (!response.status === "success") {
          detail.style.display = "none";
          resultDiv.textContent = response.message;
        } else {
        	if (!response.status === true) {
        		detail.style.display = "none";
        		urlInput.disabled = false;
     	 submitButton.disabled = false;
        		resultDiv.textContent = response.message;
        	}else{
        		detail.style.display = "block";
        		videoPlay.style.display = "none";
          	showImg(response.result.dynamic_cover[0], "videothumb");
          	downButton(response.result.video[0], "videoDown");
          	downButton(response.result.music[0], "musikDown");
          	
          		textDes.textContent = response.result.author.signature;
          	playVid.addEventListener("click", function() {
  // Sembunyikan thumbnail
  imgDiv.style.display = "none";
  // Tampilkan pemutar video
  videoPlay.style.display = "block";
  // Atur sumber video
  videoSource.src = response.result.video[0];
  // Memulai pemutaran video
  videoPlayer.load();
  videoPlayer.play();
});
          }
          urlInput.disabled = false;
     	 submitButton.disabled = false;
        }
      } else {
        responseDiv.style.display = "block";
        detail.style.display = "none";
        resultDiv.textContent = "Sedang terjadi Maintance server.";
        urlInput.disabled = false;
     	 submitButton.disabled = false;
      }
      // Aktifkan kembali input dan tombol
      urlInput.disabled = false;
      submitButton.disabled = false;
    };
    xhr.onerror = function() {
      // Sembunyikan loading dan tampilkan pesan kesalahan
      loadingDiv.style.display = "none";
      detail.style.display = "none"; 
      resultDiv.textContent = "Sepertinya Ada Yang Menghalangi Kami untuk mendapatkan Videonya. Silakan Coba Lagi.";
      // Aktifkan kembali input dan tombol
      urlInput.disabled = true;
      submitButton.disabled = true;
    };
    xhr.send();
    }
  });
});