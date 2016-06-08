var Bunyan = require('bunyan');

if(process.env.NODE_ENV === undefined || process.env.NODE_ENV.toLowerCase() === 'development'){
  var log = Bunyan.createLogger({
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
} else {
  var log = Bunyan.createLogger({
      name : 'calhhs-app',
      streams : [
        {
          level : 'info',
          path : '/var/tmp/calhhs-app.log'
        }
      ]
   });
}

module.exports = log;
