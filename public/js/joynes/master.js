joynes.Master.prototype = {
  // Should send something like "you already have latest"
  // if nes isn't running.
  sendImageData: function(){
    var data = this.nes.ui.screen[0].toDataURL();
    this.socket.send(data);
  },
  setFrameRate: function(rate){
    this.nes.setFramerate(rate);
  }
}

$.extend(joynes.Master.prototype, joynes.Base.prototype);