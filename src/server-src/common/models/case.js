var Utils = require('../utils');
module.exports = function(Case) {
   Utils.disableAllMethods(Case, [
		"findById","upsert", "exists", "find", "findOne", 
		"__findById__owner", "__updateById__owner", 
		"__findById__facilities", "__link__facilities", 
		"__get__facilities", "__create__facilities", 
		"__update__facilities","__destroy__facilities", 
		"__unlink__facilities", "__delete__facilities",
		"__findById__connections","__get__connections",
		"__findById__comforts","__updateById__comforts",
		"__link__comforts", "__get__comforts",
		"__create__comforts","__update__comforts",
		"__destroy__comforts","__unlink__comforts",
		"__delete__comforts"
   ]);
};
