var Faker = require('faker');
var Utils = require('../utils');
var log = require('../log');


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
        log.error("User creation failed with error:");
        log.error(err);
        return cb({OK : false, message: "User creation failed", Reason : err});
      }
      log.debug("User created for email:" + email + ", case " + caseId);
      identityInstance.FirstName = firstName;
      identityInstance.LastName = lastName;
      identityInstance.CurrentCaseNumber = caseId;
      identityInstance.save(
        {},
        function(err, obj){
          if(err !== null){
            log.error("Error saving Identity");
            log.error(err);
            return cb("Identity update failed: " + err);
          }
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
   * Model hooks are deprecated, but this is a quick way to test triggered
   * functionality. Operation hooks aren't fully-baked yet, despite the
   * eager deprecation of mhooks.
   */
  console.log("CALHHS: Identity.afterCreate: Continuing to use model hooks until ophooks are more reliable across all event hooks.");
  console.log("(Loopback *will* complain)");
  Identity.afterCreate =  function(next){
    log.debug("Mocking case data with new Identity:");
    log.debug(this);
    // create new case
    var Case = Identity.app.models.Case;
    var newCase = Case.create({
      CaseNumber : this.CurrentCaseNumber,
      ownerId : this.id,
      clientIdentityId : this.id,
      CreatedOn : new Date()
    }, function(err, CaseInstance){
      if(err !== null){
        log.error("Error reported when mocking case data: " + err);
        return next(err);
      }
      
      var caseId = CaseInstance.CaseNumber;
      
      CaseInstance.dependents.create({
        FirstName : Faker.name.firstName()
      }, function(err, DepInstance){
        if(err !== null){
          log.error("Error creating dependent: " + err);
        }
      });
      
      CaseInstance.caseworkers.create({
        FirstName : Faker.name.firstName(),
        LastName : Faker.name.lastName()
      }, function(err, DepInstance){
        if(err !== null){
          log.error("Error creating caseworker: " + err);
        }
      });
      
      log.debug("Case successfully mocked.");
      if(next && typeof next === 'function'){
        return next(null, "ok");
      } 
    });
    
  };
};
