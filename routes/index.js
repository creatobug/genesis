
exports.index = function(req,res){
res.render('index');
};

exports.partials = function(req,res){
var name = req.params.name;
// var itemtype = req.params.itemtype;
res.render('partials/'+name);
};