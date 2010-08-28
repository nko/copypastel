joynes.Master.prototype = {
  piratePPURegisters : function() {
    // regWrite is guarenteed 0x2000-0x2007 even for mirror PPU registers (0x2000-0x3FFF)
    //In the master registry changes are still persistant
    var prisoner_regWrite = this.nes.mmap.regWrite;
    this.nes.mmap.regWrite = function(address,value) {
      switch(address) {
        case 0x2000: case 0x2001: this.virtual_memory.ppuRegChange( address & 0x7)
      }
      return prisoner_regWrite.call(this.nes.mmap, address, value); 
    }
    
  }
  
}

$.extend(joynes.Master.prototype, joynes.Base.prototype);