var Utils = require('../utils');

module.exports = function(PostalAddress) {

   Utils.disableAllMethods(PostalAddress, [
                "findById", "exists", "find", "findOne","create","upsert","deleteById"
   ]);

  PostalAddress.afterRemote('create', function(ctx, PostalAddressInstance, next){
    var GeocodedPoint = PostalAddress.app.models.GeocodedPoint;
  });
};
