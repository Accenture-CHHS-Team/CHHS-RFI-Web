var Utils = require('../utils');
var log = require('../log');

module.exports = function(MailMessage) {
   Utils.disableAllMethods(MailMessage, [
                "findById","upsert", "exists", "find", "findOne", "create",
                "__findById__owner", "__updateById__owner",
                "__findById__facilities", "__link__facilities",
                "__get__facilities", "__create__facilities",
                "__update__facilities","__destroy__facilities",
                "__unlink__facilities", "__delete__facilities",
                "__findById__connections","__get__connections",
                "__findById__comforts","__updateById__comforts",
                "__link__comforts", "__get__comforts",
                "__create__comforts","__update__comforts",
                "__destroy__comforts","__unlink__comforts",
                "__delete__comforts"
   ]);
   
   MailMessage.sendFromClient = function(caseId, text, cb){
       console.log("Attempting to post message to case " + caseId);
       
        var Case = MailMessage.app.models.Case.findById(caseId, {}, 
            function(err, CaseInstance){
                log.debug("Checking CaseInstance");
                log.debug(CaseInstance);
                if(err !== null && err !== undefined){
                    return cb({OK : false, message: "Error adding message: " + err + "!", Reason : err});
                }     
                if(CaseInstance === undefined || CaseInstance === null){
                    return cb({OK: false, message: "No case with matching ID (" + caseId + ") found!", Reason : err});
                }
                log.debug("Identity Instance ID: " + CaseInstance.clientIdentityId);
                MailMessage.app.models.Identity.findById(CaseInstance.clientIdentityId, {},                    
                    function(err, IdentityInstance){
                        log.debug("Checking IdentityInstance");
                        log.debug(IdentityInstance);
                        if(err !== null && err !== undefined){
                            return cb({OK: false, message:"Error adding message: " + err + "!", Reason : err});
                        }     
                        if(IdentityInstance === undefined || IdentityInstance === null){
                            return cb({OK : false, message: "No identity with matching ID (" + CaseInstance.clientIdentityId + ") found!", Reason : err});
                        }
                        CaseInstance.messages.create({
                            IsFromClient : true,
                            MessageFrom : IdentityInstance.FirstName,
                            MessageBody : text,
                            CreatedOn : new Date()
                        });
                        return cb(null, {OK : true}, "application/json");
                    }
                );
            }
        );
   };
   
   MailMessage.remoteMethod(
    'sendFromClient',
    { 
      http : {path:'/send',verb:'post'},
      accepts :[
        {arg: 'caseId', type:'number'},
        {arg: 'text', type:'string'}
      ],
      returns : {arg:'result', type:'string'}
    }
  );
};

