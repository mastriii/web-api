const axios = require('axios');

const tiktok = (url) => {
	return new Promise( async (resolve, reject) => {
		const config = {
			params: {
    			url: `${url}`,
    			token: '8Oz7BbSvJdKJpK7If78L0eD1fS6JdxtANu8LAuTh'
			},
		};
	
		axios.get('https://tikdown.org/getAjax', config)
			.then(function (response) {
				if(response.data.status == true){
					try{
						var video = response.data.html.split('<a class="button-primary w-button download-button"   href="')[1].split('"')[0];
					}catch{
						var video = undefined
					}
					try{
						var musik = response.data.html.split('<a class="button-primary w-button download-button"  href="')[1].split('"')[0];
					} catch{
						var musik = undefined
					}
					var img = response.data.html.split("<img class='preview-image' src='");
					
					data = {}
					data.status = response.data.status,
					data.creator = "@triosihn",
					data.img = img,
					
					
					resolve(data)
				}else{
					reject({
						status : false,
						creator : "@triosihn",
						msg : "Server Sedang Maintance"
					})
				}
		})//close response
		.catch(err => {
			reject(err)
		})
	})
}

module.exports = tiktok;