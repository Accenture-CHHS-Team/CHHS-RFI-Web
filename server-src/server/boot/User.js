var Utils = require('../../common/utils');
module.exports = function(app) {
   var User = app.models.User;
   Utils.disableAllMethods(User, [
   ]);
};
