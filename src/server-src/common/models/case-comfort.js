var Utils = require('../utils');
module.exports = function(CaseComfort) {
   Utils.disableAllMethods(CaseComfort, [
                "findById", "exists", "find", "findOne","create","upsert","deleteById"
   ]);
};
