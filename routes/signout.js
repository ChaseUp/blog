var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.send('signout');
});

module.exports = router;