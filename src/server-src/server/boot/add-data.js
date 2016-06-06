
function createComforts(Comfort){
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
      Name:"600PM",
      ImagePath:"/static/images/comforts/BEDTIME600.png"
    });
}

module.exports = function(app) {
    var Identity = app.models.Identity;
    var Case = app.models.Case;
    var Comfort = app.models.Comfort;
    createComforts(Comfort);
};
