module.exports = function(server) {
  if(process.env.NODE_ENV == undefined){
    process.env.NODE_ENV = 'development';
  }
};
