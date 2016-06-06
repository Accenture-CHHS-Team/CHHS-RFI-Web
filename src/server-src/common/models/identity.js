var Faker = require('faker');
var Utils = require('../utils');



module.exports = function(Identity) {
  Utils.disableAllMethods(Identity, ["findById", "login", "logout", "confirm", "resetPassword"]);

  Identity.register = function(email, pass, firstName, lastName, caseId, cb){
    Identity.app.models.Case.count({CaseNumber : caseId, IsDeleted : false}, function(err, count){
    if(err !== null){
      return cb({OK : false, Reason : err, message : "User creation failed"});
    }
    if(count > 0){
      return cb({OK : false, message: "User creation failed", Reason : "Case ID " + caseId + " already exists."});
    }
    Identity.create({email:email, password:pass}, function (err, identityInstance){
      if(err !== null){
        console.log("User creation failed with error:");
        console.log(err);
        return cb({OK : false, message: "User creation failed", Reason : err});
      }
      console.log("User created for email:" + email + ", case " + caseId);
      identityInstance.FirstName = firstName;
      identityInstance.LastName = lastName;
      identityInstance.CurrentCaseNumber = caseId;
      identityInstance.save(
        {},
        function(err, obj){
          if(err !== null){
            console.log("Error saving Identity");
            console.log(err);
            return cb("Identity update failed: " + err);
          }
          console.log(obj);
          // create child person
          
          return cb(null, {OK : true, Email : email, CaseID : caseId, ID: obj.id}, "application/json");
        }
      );
    });
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
      returns : {arg:'result', type:'string'}
    }
  );


  /*
   * Note that remote method hooks consume the output of the remote method -- in this case, the object
   * returned from the /Identities/register call, which is not an actual Identity instance. Hence, the
   * use of the "response" key, which is the key of the response data defined in the /register
   * remoteMethod() invocation above.
   */
  Identity.afterRemote('register', function(ctx, IdentityInstance, next){
    console.log("Mocking case data with new Identity:");
    console.log(IdentityInstance);
    // create new case
    var Case = Identity.app.models.Case;
    var newCase = Case.create({
      CaseNumber : IdentityInstance.result.CaseID,
      ownerId : IdentityInstance.result.ID,
      clientIdentityId : IdentityInstance.result.ID,
      CreatedOn : new Date()
    }, function(err, CaseInstance){
      if(err !== null){
        console.log("Error reported when mocking case data: " + err);
        return next(err);
      }
      console.log("Case successfully mocked.");
      // add child
      // add caseworker
      if(next && typeof next === 'function'){
        return next(null, "ok");
      } 
    });
    
  });
};
