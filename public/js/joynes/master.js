joynes.Master.prototype = {
   
  piratePPU : function() {
    var prisoner_regLoad = this.nes.mmap.regLoad;
    
    this.nes.mmap.regLoad = function(address) {
      // if address is in the 0x2000 or 0x3000 range and if reading 1st or second reg
      if (address & 0x2000 || address & 0x3000) { 
        if( address & 0x1  || address & 0x2 ) { return ppu_extractor(address); }
      }
      return prisoner_regLoad.call(this.nes.mmap,address); }
    }
  },
  
  // Address will be 0xX000 or 0xX001
  ppu_extractor : function(address)  {
    var regv = this.nes.cup.mem[address & 0x2007 | 0x2000]
    this.client.pushRegister(regv);
    return regv;
  }
  
  
}

$.extend(joynes.Master.prototype, joynes.Base.prototype);