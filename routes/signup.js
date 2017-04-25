var express = require('express')
var router = express.Router();

router.get('/',function(req,res){
	res.render('signup');
});

router.post('/',function(req,res,next){
	res.send('yes');
	next();
});

module.exports = router;