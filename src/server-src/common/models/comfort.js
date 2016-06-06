var Utils = require('../utils');
module.exports = function(Comfort) {
   Utils.disableAllMethods(Comfort, [
                "findById", "exists", "find", "findOne",
   ]);
};
