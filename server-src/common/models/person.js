var Utils = require("../utils");

module.exports = function(Person) {
   Utils.disableAllMethods(Person, [
                "findById", "exists", "find", "findOne",
   ]);
};
