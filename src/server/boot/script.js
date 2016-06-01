module.exports = function(server){
  var Identity = server.models.Identity;
  var Role = server.models.Role;
  var RoleMapping = server.models.RoleMapping;


  Role.create({
    name : 'admin'
  }, function(err, role){

  });

  Role.create({
    name : 'client'
  }, function(err, role){

  });

  Role.create({
    name : 'caseworker'
  }, function(err, role){

  });

}
