
joynes.Slave.prototype = {
  piratePPURegisters : function() {
    // regWrite is aborted 0x2000-0x2007 even for mirror PPU registers (0x2000-0x3FFF)
    //In the master registry changes are still persistant
    this.prisoner_regWrite = this.nes.mmap.regWrite;
    var self = this;
    this.nes.mmap.regWrite = function(address,value) {
      switch(address) {
        case 0x2000: case 0x2001: return;
      }
      return this.prisoner_regWrite.call(self.nes.mmap, address, value); 
    }
  },
  
  prisoner_regWrite : null
  
  
  //   var prisoner_regLoad = this.nes.mmap.regLoad;
  //   
  //   this.nes.mmap.regLoad = function(address) {
  //     // if address is in the 0x2000 or 0x3000 range and if reading 1st or second reg
  //     if (address & 0x2000 || address & 0x3000) { 
  //       if( address & 0x1  || address & 0x2 ) { return ppu_extractor(address); }
  //     }
  //     return prisoner_regLoad.call(this.nes.mmap,address); }
  //   }
  // },
  // 
  // // Address will be 0xX000 or 0xX001
  // ppu_extractor : function(address)  {
  //   var regv = this.nes.cup.mem[address & 0x2007 | 0x2000]
  //   return regv;
  // }  
}

$.extend(joynes.Slave.prototype,  joynes.Base.prototype);
