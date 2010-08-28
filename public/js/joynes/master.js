joynes.Master.prototype = {
  piratePPU : function() {
    // regWrite is guarenteed 0x2000-0x2007 even for mirror PPU registers (0x2000-0x3FFF)
    this.nes.mmap.regWrite = function(address,value) {
      switch(address) {
        case 0x2000: case 0x2001: this.virtual_memory.ppuWrite( address & 0x7, value)
      }
      return prisoner_regLoad.call(this.nes.mmap,address); 
    }
    
  }
  
}

$.extend(joynes.Master.prototype, joynes.Base.prototype);