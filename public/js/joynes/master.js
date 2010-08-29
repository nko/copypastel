joynes.Master.prototype = {
  sendImageData: function(){
    var data = this.nes.ui.screen[0].toDataURL();
    this.socket.send(data);
  },
  setFrameRate: function(rate){
    this.nes.setFramerate(rate);
  }
}

$.extend(joynes.Master.prototype, joynes.Base.prototype);