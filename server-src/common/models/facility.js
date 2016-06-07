var Utils = require('../utils');
module.exports = function(Facility) {
   Utils.disableAllMethods(Facility, [
     "list", "listByRadius"
   ]);
};
