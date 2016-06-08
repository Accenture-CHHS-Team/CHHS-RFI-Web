var Bunyan = require('bunyan');

module.exports = function(app){
   console.log("Creating logger for development");
   Bunyan.createLogger({
      name : 'calhhs-app',
      streams : [
        {
          level : 'info',
          stream : process.stdout
        },
        {
          level : 'debug',
          path : '/var/tmp/calhhs-app.log'
        } 
      ]
   });

}
