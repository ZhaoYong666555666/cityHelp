var lastIndex = __dirname.lastIndexOf("\\");
var abPath = __dirname.slice(0, lastIndex);
exports.shop = function(req, res){
	res.sendFile(abPath + "/dist/html/shop.html");
};
