var Utils = require('../utils');
module.exports = function(CaseFacilityFacade) {
   Utils.disableAllMethods(CaseFacilityFacade, [
                "findById","upsert", "exists", "find", "findOne", "deleteById", "create"
   ]);
};
