module.export = function(){
  if(process.env.NODE_ENV === undefined){
     process.env.NODE_ENV = 'development';
     require('config.development')();
  }
}
