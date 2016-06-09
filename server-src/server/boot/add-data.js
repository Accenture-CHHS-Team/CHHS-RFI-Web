var log = require('../../common/log');

function createIdentity(Identity){
    Identity.create({
      FirstName : "Jane",
      LastName : "Smith",
      MiddleName : "Q",
      DateOfBirth:"1990-01-01",
      Gender:"F",
      CurrentCaseNumber:"1234567890",
      email:"jsmith@mail-box.dom",
      password:"CALHHS_USER_@ACN"      
    }, function(err, ident){
      	if(ident !== undefined && ident !== null){
          ident.postaladdresses.create({
          AddressLine1 : "291 Geary St",
          City : "San Francisco",
          State : "CA",
          PostalCode : "94102",
          AddressType : "HOME"
        }, function(err, ident){
          
        });
        }
    });
}

function createComforts(Comfort){

    Comfort.create({
      ComfortType:"FAMILY",
      Name:"SINGLE_PARENT",
      ImagePath:"/static/images/comforts/FAMILY_SINGLE.png"
    });

    Comfort.create({
      ComfortType:"FAMILY",
      Name:"TWO_PARENTS",
      ImagePath:"/static/images/comforts/FAMILY_TWO.png"
    });

    Comfort.create({
      ComfortType:"FAMILY",
      Name:"EXTENDED",
      ImagePath:"/static/images/comforts/FAMILY_EXTENDED.png"
    });

    Comfort.create({
      ComfortType:"BEDTIME",
      Name:"600PM",
      ImagePath:"/static/images/comforts/BEDTIME06.png"
    });

    Comfort.create({
      ComfortType:"BEDTIME",
      Name:"700PM",
      ImagePath:"/static/images/comforts/BEDTIME07.png"
    });

    Comfort.create({
      ComfortType:"BEDTIME",
      Name:"800PM",
      ImagePath:"/static/images/comforts/BEDTIME08.png"
    });

    Comfort.create({
      ComfortType:"BEDTIME",
      Name:"900PM",
      ImagePath:"/static/images/comforts/BEDTIME09.png"
    });

    Comfort.create({
      ComfortType:"BEDTIME",
      Name:"100PM",
      ImagePath:"/static/images/comforts/BEDTIME10.png"
    });


    Comfort.create({
      ComfortType:"HOME",
      Name:"110PM",
      ImagePath:"/static/images/comforts/BEDTIME110.png"
    });

    Comfort.create({
      ComfortType:"ROUTINES",
      Name:"BATH_MORN",
      ImagePath:"/static/images/comforts/ROUTINE_BM.png"
    });

    Comfort.create({
      ComfortType:"ROUTINES",
      Name:"SHOW_MORN",
      ImagePath:"/static/images/comforts/ROUTINE_SM.png"
    });

    Comfort.create({
      ComfortType:"ROUTINES",
      Name:"SHOW_EVE",
      ImagePath:"/static/images/comforts/ROUTINE_SE.png"
    });

    Comfort.create({
      ComfortType:"ROUTINES",
      Name:"BATH_EVE",
      ImagePath:"/static/images/comforts/ROUTINE_BE.png"
    });

    

}

module.exports = function(app) {
    log.debug("Adding initial data");
    var Identity = app.models.Identity;
    var Case = app.models.Case;
    var Comfort = app.models.Comfort;
    //createComforts(Comfort);
    createIdentity(Identity);
};
