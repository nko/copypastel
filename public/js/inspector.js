
Inspector = {};
Inspector.Logger = null;
Inspector.prototype = {
  
  pre_inspect : {},
  
  attatch : function(base_class, name) {
    pre_inspect[name] = base_class.prototype[name];
    base_class.prototype[name] = function(args) {
      str = args;
      if(this['format']) {
        str = this.format(args);
      }
      Logger.log(args);
      pre_inspect[name]();
    }
  }
};

