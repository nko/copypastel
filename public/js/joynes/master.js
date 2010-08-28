joynes.Master.prototype = {
  piratePPURegisters : function() {
    // regWrite is guarenteed 0x2000-0x2007 even for mirror PPU registers (0x2000-0x3FFF)
    //In the master registry changes are still persistant
    this.nes.mmap.regWrite = function(address,value) {
      switch(address) {
        case 0x2000: case 0x2001: this.virtual_memory.ppuRegChange( address & 0x7)
      }
      return prisoner_regLoad.call(this.nes.mmap,address); 
    }
    
  }
  
}

$.extend(joynes.Master.prototype, joynes.Base.prototype);