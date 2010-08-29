
joynes.Master.prototype = {
  piratePPURegisters : function() {
    // regWrite is guarenteed 0x2000-0x2007 even for mirror PPU registers (0x2000-0x3FFF)
    //In the master registry changes are still persistant
    var prisoner_regWrite = this.nes.mmap.regWrite;

    var self = this;
    this.nes.mmap.regWrite = function(address,value) {
      switch(address) {
        case 0x2000: case 0x2001: self.virtual_memory.ppuRegChange( address & 0x7);
        break;
      }
      return prisoner_regWrite.call(self.nes.mmap, address, value); 
    } 
  },
  sendImageData: function(){
    var data = this.nes.ui.screen[0].toDataURL();
    this.socket.send(data);
  }
}

$.extend(joynes.Master.prototype, joynes.Base.prototype);