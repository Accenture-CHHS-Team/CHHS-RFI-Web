var Utils = require('../utils');
var Request = require('request');
var log = require('../log');


module.exports = function(Facility) {
   Utils.disableAllMethods(Facility, [
     "list", "listByRadius"
   ]);
   
   Facility.listByAddress = function(streetAddress, city, state, zip, radius, cb){
      var url = 'http://localhost:3000/api/GeocodedPoints/geocode';
      Request.get(
      {
        url : url,
        qs : {
          address : streetAddress,
          city : city,
          state : state,
          zip : zip
        }
      }, function (err, response, body) {
        if (err !== null && err !== undefined){
          log.error(err.message);
          return cb(null, {OK : false, message: err.message, refid : '0e301bc9-cd6e-45ec-8720-18b148f6a6e3'});
        }
        if (response.statusCode !== 200) {
          return cb(null, {OK : false, message : "Received HTTP status " + response.statusCode + " from geocoding API", refid:'44edb63c-1425-4368-9ec8-0aac18560d91'});
        }
        if(body[0] !== '{'){
          return cb(null, {OK : false, message : body, refid:'b5f6f3af-a2be-47f2-bb5b-6e29cfc5600f'});
        }
        var obj = JSON.parse(body);
        
        if(obj.OutputGeocodes !== undefined && obj.OutputGeocodes[0] !== undefined){
          var gc = obj.OutputGeocodes[0];
          if(gc === undefined || gc === null || gc.OutputGeocode === null || gc.OutputGeocode === undefined){
            return cb(null, {OK : false, message : 'No geocodes for given address!', refid:'046cb841-a65b-4626-a975-593560b11275'});
          } else {
            var lat = gc.OutputGeocode.Latitude;
            var long = gc.OutputGeocode.Longitude;
            var facurl = 'http://localhost:3000/api/Facilities/listByRadius';
            Request.get({
              url : facurl,
              qs : {
                long : long,
                lat : lat,
                radius : radius
              }
            }, function(facerr, facresponse, facbody){
              
              if (facerr !== null && facerr !== undefined){
                log.error(facerr.message);
                return cb(null, {OK : false, message: 'Error with facilities list', reifd:'6f1c0984-cbec-4c42-9c89-014c3c02e7f9'});
              }
              if (facresponse.statusCode !== 200) {
                return cb(null, {OK : false, message : "Received HTTP status " + facresponse.statusCode + " from facility API: " + facbody, refid:'e8107a29-75eb-4d72-bc09-3d094c653811'});
              }

              if(facbody[0] !== '['){
                return cb(null, {OK : false, message : facbody, refid:'bb83d2fb-6cfa-4b0d-a32b-ff5f73205511'});
              }
              var facs = JSON.parse(facbody);
              
              for(var x = 0; x < facs.length; x++){
                if(facs[x].location !== undefined && facs[x].location.coordinates != undefined){
                  var facility_geopoint = facs[x].location.coordinates;
                  var facility_longitude = facs[x].location.coordinates[0];
                  var facility_latitude = facs[x].location.coordinates[1];
                                    
                 
                  // Calculate distance from address, using the haversine formula             
                  // (see [http://mathforum.org/library/drmath/view/51879.html] for the short version,
                  // or the complete derivation in, e.g., Ballou and Steen's `Plane and Spherical Trigonometry`, p. 160)                                  
                  var fac_lat_rad = facility_latitude * Math.PI / 180;
                  var adr_lat_rad = lat * Math.PI / 180;                  
                  var d_lat = (lat - facility_latitude)* Math.PI / 180;
                  var d_long = (long - facility_longitude)* Math.PI / 180;
                  var a = Math.pow( Math.sin(d_lat/2),2)
                      + Math.cos(fac_lat_rad) * Math.cos(adr_lat_rad) 
                      * Math.pow(Math.sin(d_long/2),2);
                  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));                 
                  var d = 6371e3 * c; // Earth radius in meters
                  log.debug('Calculated distance from (' + facility_latitude + ',' + facility_longitude + ') to (' + lat + ',' + long +'): ' + d);
                  facs[x].location.distance = d;
                }
              }
              
              return cb(null, {OK: true, facilities: facs});
            });                                  
          }          
        }
      });
   };
   
   Facility.remoteMethod(
    'listByAddress',
    { 
      http : {path:'/listByAddress',verb:'post'},
      accepts :[
        {arg: 'streetAddress', type:'string'},
        {arg: 'city', type:'string'},
        {arg: 'state', type:'string'},
        {arg: 'zip', type:'string'},
        {arg:'radius', type:'number'}
      ],
      returns : {arg:'result', type:'string'}
    }
  );
};
