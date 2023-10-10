__path = process.cwd()

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__path + '/views/home.html')
});

/* GET Dokumentasi Page*/
router.get('/dokumentasi', function(req, res, next) {
  res.sendFile(__path + '/views/docs.html')
});

/* GET Online TikTok*/
router.get('/tiktok', function(req, res, next) {
  res.sendFile(__path + '/views/tiktok.html')
});

/* GET Online Instagram*/
router.get('/instagram', function(req, res, next) {
  
});

/* GET Online YouTube*/
router.get('/youtube', function(req, res, next) {
  
});

/* GET Online Lacak IP*/
router.get('/tracking-IP', function(req, res, next) {
  
});

/* GET Blog*/
router.get('/blog', function(req, res, next) {
  res.redirect('https://google.com');
});

/* GET About*/
router.get('/about', function(req, res, next) {
  
});

/* GET Contact*/
router.get('/contact', function(req, res, next) {
  
});

/* GET Blog*/
router.get('/tes', function(req, res, next) {
  res.sendFile(__path + '/views/tes.html')
});

module.exports = router;
