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
//h2000-h2007
PPU_STATE = []

joynes = {
  Base : {},
  
  Master : function(nes) {
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
  }
};

joynes.Master.prototype = {
  
  piratePPU : function() {
    var prisoner_regLoad = this.nes.mmap.regLoad;
    this.nes.mmap.regLoad = function(address) {
      switch (address >> 12) { // use fourth nibble (0xF000)
      case 2: case 3: //h2000-h3000
        ppu_extractor(address);
        break;
      default: prisoner_regLoad.call(this.nes.mmap,address);
      }
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
