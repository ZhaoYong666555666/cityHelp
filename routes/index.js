var lastIndex = __dirname.lastIndexOf("\\");
var abPath = __dirname.slice(0, lastIndex);
exports.index = function(req, res){
	res.sendFile(abPath + "/dist/html/index.html");
};
