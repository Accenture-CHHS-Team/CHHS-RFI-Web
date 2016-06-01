module.exports = function(Case) {
  /*
   * Disable all C/D methods (we create cases automagically)
   */
  Case.disableRemoteMethod('create', true); 
  Case.disableRemoteMethod('upsert', true);
  Case.disableRemoteMethod('deleteById', true);
};
