var Faker = require('faker');
var Utils = require('../utils');



module.exports = function(Identity) {
  Utils.disableAllMethods(Identity, ["findById", "login", "logout", "confirm", "resetPassword"]);

  Identity.register = function(email, pass, firstName, lastName, caseId, cb){
    Identity.create({email:email, password:pass}, function (err, identityInstance){
      if(err !== null){
        console.log("User creation failed with error:");
        console.log(err);
        return cb('User creation failed');
      }
      console.log("User created for email:" + email + ", case " + caseId);
      identityInstance.FirstName = firstName;
      identityInstance.LastName = lastName;
      identityInstance.CurrentCaseNumber = caseId;
      identityInstance.save();
      return cb(null, 'ok', "application/json");
    });
  };
  Identity.remoteMethod(
    'register',
    { 
      http : {path:'/register',verb:'post'},
      accepts :[
        {arg: 'email', type:'string'},
        {arg: 'pass', type:'string'},
        {arg: 'firstName', type:'string'},
        {arg: 'lastName', type:'string'},
        {arg: 'caseId', type:'string'}
      ],
      returns : {arg:'status', type:'string'}
    }
  );

  Identity.afterRemote('register', function(ctx, IdentityInstance, next){
    console.log("Mocking case data...");
    // create new case

    // attach a child 


    // attach a social worker

    if(next && typeof next === 'function'){
      next();
    }
  });
};
