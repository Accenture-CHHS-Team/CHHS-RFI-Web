var Utils = require('../utils');
module.exports = function(Case) {
   Utils.disableAllMethods(Case, [
		"findById","upsert", "exists", "find", "findOne", 
		"__findById__owner", "__updateById__owner", 

		"__findById__facilities", "__link__facilities", 
		"__get__facilities", "__create__facilities", 
		"__update__facilities","__destroy__facilities", 
		"__unlink__facilities", "__delete__facilities",
		"__updateById__facilities",
		
		"__findById__comforts","__updateById__comforts",
		"__link__comforts", "__get__comforts",
		"__create__comforts","__update__comforts",
		"__destroy__comforts","__unlink__comforts",
		"__delete__comforts",
		
		"__findById__dependents", "__updateById__dependents",  
		"__link__dependents", "__get__dependents", "__create__dependents", 
		"__update__dependents", "__destroy__dependents", "__unlink__dependents", 
		"__delete__dependents", 
		
		"__findById__caseworkers", "__updateById__caseworkers", "__link__caseworkers", 
		"__get__caseworkers", "__create__caseworkers", "__update__caseworkers", 
		"__destroy__caseworkers", "__unlink__caseworkers", "__delete__caseworkers",
		
		"__findById__messages", "__updateById__messages", "__link__messages", 
		"__get__messages", "__create__messages", "__update__messages", 
		"__destroy__messages", "__unlink__messages", "__delete__messages"

   ]);
};
