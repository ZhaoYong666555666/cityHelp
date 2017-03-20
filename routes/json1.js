var fs = require("fs");
exports.json1 = function(req, res){
	res.type('text/json');

	var infoStr = fs.readFile("data/test.json", function(err, data){
		console.log(data);
		res.send(JSON.stringify({x:1,y:2}));
	});
};