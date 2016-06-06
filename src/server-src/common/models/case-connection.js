var Utils = require('../utils');
module.exports = function(CaseConnection) {
   Utils.disableAllMethods(CaseConnection, [
                "findById","upsert", "exists", "find", "findOne","create","deleteById",
                "__findById__owner", "__updateById__owner"
   ]);
};
