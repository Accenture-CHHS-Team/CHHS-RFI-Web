var Utils = require('../utils');
var Request = require('request');



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
                console.log(facerr.message);
                return cb(null, {OK : false, message: 'Error with facilities list', reifd:'6f1c0984-cbec-4c42-9c89-014c3c02e7f9'});
              }
              if (facresponse.statusCode !== 200) {
                return cb(null, {OK : false, message : "Received HTTP status " + facresponse.statusCode + " from facility API: " + facbody, refid:'e8107a29-75eb-4d72-bc09-3d094c653811'});
              }

              if(facbody[0] !== '['){
                return cb(null, {OK : false, message : facbody, refid:'bb83d2fb-6cfa-4b0d-a32b-ff5f73205511'});
              }

              
              return cb(null, {OK: true, facilities: facbody});
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
