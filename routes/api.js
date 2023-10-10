__path = process.cwd()

const axios = require('axios');
var express = require('express');

var router = express.Router();
const { TiktokDL, TiktokStalk } = require("@tobyg74/tiktok-api-dl");
const creator = "@triosihn"
var { ttUrl }= require(__path+'/lib/function.js');
const trek = require('api-trekkers');
var loghandler = {
	notparam : {
		status : false,
		message : "Tidak ada paramater action. Silakan baca dokumentasi terlebih dahulu.",
		creator : creator
	},
	notparamid : {
		status : false,
		message : "Tidak ada paramater id. Silakan masukkan parameter id",
		creator : creator
	},
	noturl : {
		status : false,
		message : "Ini bukan url !!!",
		creator : creator
	},
	notparamurl : {
		status : false,
		message : "Tidak ada paramater url. Silakan baca dokumentasi terlebih dahulu.",
		creator : creator
	},
	notparamgame : {
		status : false,
		message : "Tidak ada paramater game. hanya terdapat game freefire, mobilelegend, higgs",
		creator : creator
	},
	cekurl : {
		status : false,
		message : "Cek kembali url yang anda masukkan !!!",
		creator : creator
	},
	maintance : {
		status : false,
		message : "Sangat di sayangkan server kami sedang Maintance. ini tidak akan lama",
		creator : creator
	},
	username : {
		status : false,
		message : "tidak ada paramater username, silakan baca dokumentasi terlebih dahulu.",
		creator : creator
	},
	creator : {
		status : false,
		message : "Subscribe channel nya mas tri",
		creator : creator
	},
}

/*API CEK GAME WITH API */
const baseURLGame = "https://api-cek-id-game.vercel.app/api/game/"
const arrayGame = [{"slug":"8-ball-pool","hasZoneId":false},{"slug":"au2-mobile","hasZoneId":false},{"slug":"angel-squad","hasZoneId":false},{"slug":"aov","hasZoneId":false},{"slug":"arena-mania-magic-heroes","hasZoneId":true},{"slug":"arena-of-valor","hasZoneId":false},{"slug":"asphalt-9-legends","hasZoneId":true},{"slug":"astral-guardians-cyber-fantasy","hasZoneId":true},{"slug":"atlantica-online","hasZoneId":false},{"slug":"auto-chess","hasZoneId":false},{"slug":"azur-lane","hasZoneId":true},{"slug":"badlanders","hasZoneId":true},{"slug":"barbarq","hasZoneId":true},{"slug":"basketrio","hasZoneId":true},{"slug":"battlenet","hasZoneId":false},{"slug":"be-the-king-judge-destiny","hasZoneId":true},{"slug":"bermuda","hasZoneId":false},{"slug":"bigo-live","hasZoneId":false},{"slug":"bigo-live-voucher","hasZoneId":false},{"slug":"bioskop-online","hasZoneId":false},{"slug":"bleach-mobile-3d","hasZoneId":true},{"slug":"boxing-star","hasZoneId":false},{"slug":"call-of-duty-mobile","hasZoneId":false},{"slug":"captain-tsubasa-dream-team","hasZoneId":false},{"slug":"cave-shooter","hasZoneId":true},{"slug":"chaos-crisis","hasZoneId":true},{"slug":"city-of-crime-gang-wars","hasZoneId":false},{"slug":"cloud-song-saga-of-skywalkers","hasZoneId":false},{"slug":"club-vegas","hasZoneId":false},{"slug":"cooking-adventure","hasZoneId":false},{"slug":"crasher-origin","hasZoneId":true},{"slug":"crisis-action","hasZoneId":true},{"slug":"crusader-kings-iii-royal-court","hasZoneId":false},{"slug":"dead-target-zombie-games-3d","hasZoneId":false},{"slug":"dark-continent-mist","hasZoneId":true},{"slug":"diablo-immortal","hasZoneId":false},{"slug":"disorder","hasZoneId":true},{"slug":"domino-qiuqiu-topfun","hasZoneId":false},{"slug":"dragon-city","hasZoneId":false},{"slug":"dragon-hunters-heroes-legends","hasZoneId":true},{"slug":"dragon-raja","hasZoneId":false},{"slug":"dreadout","hasZoneId":false},{"slug":"dynasty-warriors-overlords","hasZoneId":false},{"slug":"eos-red","hasZoneId":true},{"slug":"echocalypse","hasZoneId":true},{"slug":"elemental-titans-3d-idle-arena","hasZoneId":false},{"slug":"embers-last-duel","hasZoneId":false},{"slug":"entropy-2099","hasZoneId":false},{"slug":"era-of-celestials","hasZoneId":true},{"slug":"esports_king","hasZoneId":false},{"slug":"fifa-mobile","hasZoneId":false},{"slug":"farlight84","hasZoneId":false},{"slug":"food-fantasy-crystal","hasZoneId":true},{"slug":"football-master-2","hasZoneId":false},{"slug":"fortnite-us","hasZoneId":false},{"slug":"free-fire","hasZoneId":false},{"slug":"freefire","hasZoneId":false},{"slug":"free-fire-max","hasZoneId":false},{"slug":"game-on-credits","hasZoneId":false},{"slug":"game-speed-up","hasZoneId":false},{"slug":"game-speed-up-bundling","hasZoneId":false},{"slug":"game-of-sultans","hasZoneId":false},{"slug":"gameqoo_bundling","hasZoneId":false},{"slug":"gamesmax-booster","hasZoneId":false},{"slug":"garena-shells-voucher","hasZoneId":false},{"slug":"genshin-impact","hasZoneId":true},{"slug":"girls-connect-idle-rpg","hasZoneId":true},{"slug":"google-play","hasZoneId":false},{"slug":"growtopia","hasZoneId":false},{"slug":"hago","hasZoneId":false},{"slug":"heroes-evolved","hasZoneId":true},{"slug":"higgs-domino","hasZoneId":false},{"slug":"hogwarts-legacy","hasZoneId":false},{"slug":"honkai-impact-3","hasZoneId":false},{"slug":"honkai-star-rail-voucher-code","hasZoneId":false},{"slug":"identity-v","hasZoneId":true},{"slug":"idle-dynasty","hasZoneId":true},{"slug":"idle-legends","hasZoneId":true},{"slug":"idol-party","hasZoneId":false},{"slug":"indoplay","hasZoneId":false},{"slug":"island-king","hasZoneId":false},{"slug":"jade-dynasty-new-fantasy","hasZoneId":true},{"slug":"jade-legends-immortal-realm","hasZoneId":true},{"slug":"king-of-avalon","hasZoneId":false},{"slug":"kode-voucher-google-play","hasZoneId":false},{"slug":"luxy-domino-and-poker","hasZoneId":false},{"slug":"langit-musik","hasZoneId":false},{"slug":"laplace-m","hasZoneId":false},{"slug":"league-of-legends","hasZoneId":false},{"slug":"league-of-legends-wild-rift","hasZoneId":false},{"slug":"legacy-of-discord-furiouswings","hasZoneId":true},{"slug":"legends-of-runeterra","hasZoneId":false},{"slug":"life-makeover","hasZoneId":false},{"slug":"lifeafter","hasZoneId":true},{"slug":"life-after","hasZoneId":true},{"slug":"lita","hasZoneId":false},{"slug":"lokapala","hasZoneId":false},{"slug":"lords-mobile","hasZoneId":false},{"slug":"lost-saga","hasZoneId":true},{"slug":"love-nikki","hasZoneId":false},{"slug":"ludo-club","hasZoneId":false},{"slug":"marvel-duel","hasZoneId":false},{"slug":"marvel-snap","hasZoneId":false},{"slug":"mu-archangel","hasZoneId":true},{"slug":"mu-origin-3","hasZoneId":false},{"slug":"mu-origin-2","hasZoneId":true},{"slug":"mahjong-soul","hasZoneId":false},{"slug":"marvel-super-war","hasZoneId":false},{"slug":"meyo","hasZoneId":false},{"slug":"memories","hasZoneId":false},{"slug":"mi-cash","hasZoneId":false},{"slug":"miko-era-twelve-myths","hasZoneId":true},{"slug":"minecraft","hasZoneId":false},{"slug":"mirage-perfect-skyline","hasZoneId":true},{"slug":"mobile-legends","hasZoneId":true},{"slug":"mobile-legends-adventure","hasZoneId":true},{"slug":"modern-combat-5-blackout","hasZoneId":false},{"slug":"modern-strike-online","hasZoneId":false},{"slug":"musicmax","hasZoneId":false},{"slug":"need-for-speed-no-limits","hasZoneId":false},{"slug":"netease-pay","hasZoneId":false},{"slug":"never-after","hasZoneId":true},{"slug":"neverland-era","hasZoneId":true},{"slug":"new-tales-from-the-borderlands","hasZoneId":false},{"slug":"one-punch-man-the-strongest","hasZoneId":true},{"slug":"omega-legends","hasZoneId":true},{"slug":"one-punch-man","hasZoneId":true},{"slug":"onmyoji-arena","hasZoneId":false},{"slug":"psn-playstation-card","hasZoneId":false},{"slug":"panggil-aku-kaisar","hasZoneId":false},{"slug":"path-of-immortals","hasZoneId":false},{"slug":"path-to-nowhere","hasZoneId":false},{"slug":"perfect-world","hasZoneId":true},{"slug":"phantom-blade-executioners","hasZoneId":false},{"slug":"point-blank","hasZoneId":false},{"slug":"pokemon-go","hasZoneId":false},{"slug":"punishing-gray-raven","hasZoneId":true},{"slug":"rf-classic","hasZoneId":true},{"slug":"rf-remastered","hasZoneId":true},{"slug":"ragnarok-forever-love","hasZoneId":true},{"slug":"ragnarok-m-eternal-love-big-cat-coin","hasZoneId":true},{"slug":"ragnarok-origin","hasZoneId":true},{"slug":"ragnarok-retro","hasZoneId":false},{"slug":"ragnarok-x-next-generation","hasZoneId":true},{"slug":"razer-gold","hasZoneId":false},{"slug":"realm-of-spirit","hasZoneId":false},{"slug":"roch","hasZoneId":true},{"slug":"revelation-infinite-journey","hasZoneId":false},{"slug":"roblox","hasZoneId":false},{"slug":"saint-seiya-awakening","hasZoneId":true},{"slug":"sausage-man","hasZoneId":true},{"slug":"scroll-of-onmyoji-sakura-and-sword","hasZoneId":true},{"slug":"shellfire","hasZoneId":true},{"slug":"shining-nikki","hasZoneId":false},{"slug":"sky-children-of-the-light","hasZoneId":false},{"slug":"speed-drifters","hasZoneId":false},{"slug":"sprite-fantasia","hasZoneId":true},{"slug":"state-of-survival","hasZoneId":false},{"slug":"steam-wallet-code-indonesia","hasZoneId":false},{"slug":"stumble-guys","hasZoneId":false},{"slug":"super-mecha-champions","hasZoneId":false},{"slug":"super-sus","hasZoneId":false},{"slug":"tamashi-rise-of-yokai","hasZoneId":true},{"slug":"teen-patti-gold","hasZoneId":false},{"slug":"the-lord-of-the-rings-rise-to-war","hasZoneId":true},{"slug":"the-quarry","hasZoneId":false},{"slug":"the-return-of-condor-heroes","hasZoneId":true},{"slug":"thetan-arena","hasZoneId":false},{"slug":"time-raiders","hasZoneId":true},{"slug":"tinder","hasZoneId":false},{"slug":"tom-and-jerry-chase","hasZoneId":true},{"slug":"top-eleven","hasZoneId":false},{"slug":"dg-rings","hasZoneId":false},{"slug":"garena","hasZoneId":false},{"slug":"unipin","hasZoneId":false},{"slug":"valorant","hasZoneId":false},{"slug":"vidio","hasZoneId":false},{"slug":"vision-plus","hasZoneId":false},{"slug":"viu-premium","hasZoneId":false},{"slug":"voucher-steam","hasZoneId":false},{"slug":"wwe-2k22-steam","hasZoneId":false},{"slug":"war-planet-online","hasZoneId":false},{"slug":"wetv-vip","hasZoneId":false},{"slug":"webnovel","hasZoneId":false},{"slug":"westward-adventure","hasZoneId":false},{"slug":"wild-hunter-goddess","hasZoneId":true},{"slug":"world-war-heroes","hasZoneId":false},{"slug":"xbox-live","hasZoneId":false},{"slug":"ys-6-mobile-vng","hasZoneId":false},{"slug":"yong-heroes","hasZoneId":true},{"slug":"zepeto","hasZoneId":false},{"slug":"test35","hasZoneId":false},{"slug":"test138","hasZoneId":false}]


/*cek url */
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/tes', function(req, res, next) {
//try {
  	cekURLDiGoogleSheet(req.hostname)
  	.then( result =>{
  		//Eksekusi data di sini
  console.log(result)
  	})
  	.catch(error => {
  		//data error
  console.log(error)
  	})
});

router.get('/v1', function(req, res, next) {
  var key = req.query.key;
  var  action = req.query.action;
  
  if(!action) return res.redirect("/dokumentasi")
  switch (key) {
  	case "download" :
  		switch (action){
  				case "tiktok" :
  						var url = req.query.url;
  						var ttur = isValidURL(url);
  						if(!url) return res.json(loghandler.notparamurl)
  						if(!ttur) return res.json(loghandler.noturl)
  						if(!url.includes("tiktok.com")) return res.json(loghandler.cekurl)
  						TiktokDL(url)
  							.then(data => {
  								if(!data.status === "success") res.json(loghandler.maintance)
  								res.json(data);
  							});
  				break;
  				case "instagram" :
  					var url = req.query.url;
  						var ttur = isValidURL(url);
  						if(!url) return res.json(loghandler.notparamurl)
  						if(!ttur) return res.json(loghandler.noturl)
  						if(!url.includes("instagram")) return res.json(loghandler.cekurl)
  						trek.igdl(url)
  							.then(data => {
  								console.log(data)
  								//if(!data.status === "success") res.json(loghandler.maintance)
  								res.json(data);
  							});
  				break;
  			default :
  				res.status(405).send("Metode HTTP tidak didukung");
  		}
  		break;
  	case "stalking" :
  		switch (action){
  				case "tiktok":
  					var username = req.query.username;
  					if(!username) return res.json(loghandler.notusername)
  					TiktokStalk(username)
 						.then(data => {
							if(!data.status === "success") res.json(loghandler.maintance)
							res.json(data);
						}); 		
  				break;
  				case "instagram":
  				break;
  			default :
  				res.status(405).send("Metode HTTP tidak didukung");
  		}
  		break;
  	default:
  		res.status(405).send("Metode HTTP tidak didukung");
  }
});

router.get('/cek-game', async (req, res) => {
  const { game, id, zone } = req.query;

  if (!game) {
    return res.json({ "status": false, "message": "Parameter game tidak ditemukan !!!", "creator": creator });
  }
  
  if (!id) {
    return res.json({ "status": false, "message": "Parameter id tidak ditemukan !!!", "creator": creator });
  }

  const games = arrayGame.find(item => item.slug === game);

  if (!games) {
    return res.json({ "status": false, "message": `Game ${game} tidak terdaftar di API, Silakan baca dokumentasi terlebih dahulu. `, "creator": creator });
  }

  let fullUrl;
  
  if (games.hasZoneId) {
    if (!zone) {
      return res.json({ "status": false, "message": "Parameter zone tidak ditemukan !!!", "creator": creator });
    }
    fullUrl = `${baseURLGame}${games.slug}?id=${id}&&zone=${zone}`;
  } else {
    fullUrl = `${baseURLGame}${games.slug}?id=${id}`;
  }

  try {
    const response = await fetch(encodeURI(fullUrl));
    const data = await response.json();
    console.log(data);
    if(data.status){
		result = {"status" : true, "username" : data.data.username, "id":data.data.user_id}
		if(data.data.zone !== null){
			result.zone = data.data.zone;
		}
		result.creator = creator;
		res.json(result)
	}else{
		res.json({ "status": false, "message": "Terjadi kesalahan saat mengambil data dari server", "creator": creator });
	}
  } catch (error) {
    res.json({ "status": false, "message": "Terjadi kesalahan saat mengambil data dari server", "creator": creator });
  }
});
module.exports = router;
