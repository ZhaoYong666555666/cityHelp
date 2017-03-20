exports.json2 = function(req, res){
	res.type('text/json');
    res.send(JSON.stringify({m:1,n:2}));
};