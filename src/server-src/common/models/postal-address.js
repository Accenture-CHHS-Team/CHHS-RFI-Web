module.exports = function(PostalAddress) {
  PostalAddress.afterRemote('create', function(ctx, PostalAddressInstance, next){
    var GeocodedPoint = PostalAddress.app.models.GeocodedPoint;
  });
};
