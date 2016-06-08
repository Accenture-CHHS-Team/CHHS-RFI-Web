var Bunyan = require('bunyan');

module.exports = function(app){
   console.log("Creating logger for production");
   Bunyan.createLogger({
      name : 'calhhs-app',
      streams : [
        {
          level : 'info',
          path : '/var/tmp/calhhs-app.log'
        }
      ]
   });

}
~          
