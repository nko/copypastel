Logger = function(id){
  this.element = $(id);
}

Logger.prototype.log = function(string, color){
  this.element.append('<p style="color: ' + color +
      ';">' + string + '</p>');

  this.element.attr({ scrollTop: this.element.attr("scrollHeight") });
}
