var Utils = require('../utils');
module.exports = function(CaseWorker) {
   Utils.disableAllMethods(CaseWorker, [
                "findById", "exists", "find", "findOne",
   ]);
};
