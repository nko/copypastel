$.include = function(url){
  $.ajax({
    'url': url,
    'dataType': 'script',
    'type': 'GET',
    'async': false
  })
}

$.include('/js/dynamicaudio-min.js');
$.include('/js/jquery.dimensions.min.js');
$.include('/js/jsnes.js');
$.include('/js/messages.js');

joynes = {
  Base : {},
  
  Master : function(nes) {
    this.initialize();
    this.nes = nes;
  },
  
  Slave : function(nes) {
    this.nes = nes;
  }
};

joynes.Base.prototype = {
  loadRom : function(url) {
    $.ajax( {
      url: escape(url),
      xhr: function() {
        var xhr = $.ajaxSettings.xhr();
        // Download as binary
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
        return xhr;
      },
    
      success: function(data) {
        this.nes.loadRom(data);
        this.nes.start();
        this.nes.ui.enable();
      }
    })
  },
  
  ppu_registers : new Array(8),
  
  initialize : function() {
    for( i = 0; i < 0x8; i++ ) { this.ppu_registers[i] = 0xFF}
  }
};

//joyness.Master.ppu_registers[0] = Math.rand();
//joyness.Master.ppu_registers[0];

joynes.Master.prototype = {
   
  piratePPU : function() {
    var prisoner_regLoad = this.nes.mmap.regLoad;
    
    this.nes.mmap.regLoad = function(address) {
      // if address is in the 0x2000 or 0x3000 range and if reading 1st or second reg
      if (address & 0x2000 || address & 0x3000) { 
        if( address & 0x1  || address & 0x2 ) { ppu_extractor(address); }
      }
      else { prisoner_regLoad.call(this.nes.mmap,address); }
    }
  },
  
  ppu_extractor : function(address)  {
    // PPU Registers
    switch (address & 0x7) {
    case 0x0:
      // 0x2000:
      // PPU Control Register 1.
      // (the value is stored both
      // in main memory and in the
      // PPU as flags):
      // (not in the real NES)
      return this.nes.cpu.mem[0x2000];
         
    case 0x1:
        // 0x2001:
        // PPU Control Register 2.
        // (the value is stored both
        // in main memory and in the
        // PPU as flags):
        // (not in the real NES)
        return this.nes.cpu.mem[0x2001];
         
    case 0x2:
        // 0x2002:
        // PPU Status Register.
        // The value is stored in
        // main memory in addition
        // to as flags in the PPU.
        // (not in the real NES)
        return this.nes.ppu.readStatusRegister();
         
    case 0x3:
      return 0;
         
    case 0x4:
      // 0x2004:
      // Sprite Memory read.
      return this.nes.ppu.sramLoad();
    case 0x5:
      return 0; 
    case 0x6:
      return 0; 
    case 0x7:
      // 0x2007:
      // VRAM read:
    return this.nes.ppu.vramLoad();
    }
  }
}

$.extend(joynes.Master.prototype, joynes.Base.prototype);
$.extend(joynes.Slave.prototype,  joynes.Base.prototype);
