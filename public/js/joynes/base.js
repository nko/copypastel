
joynes.Base.prototype = {
  loadRom : function(url) {
    var self = this;
    
    $.ajax( {
      url: escape(url),
      xhr: function() {
        var xhr = $.ajaxSettings.xhr();
        // Download as binary
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
        return xhr;
      },
      success: function(data) { console.log(self); self.loadRomData(data); }
    })
  },
  
  loadRomData: function(data) {
    this.nes.loadRom(data);
    this.nes.start();
    this.nes.ui.enable();
    this.piratePPURegisters();
  },
  
  ppu_registers : new Array(8),
  
  initialize : function() {
    for( i = 0; i < 0x8; i++ ) { this.ppu_registers[i] = 0xFF; }    
    this.socket = new Worker('/js/worker.js');
    this.virtual_memory = new joynes.VirtualMemory(this);
  }
};

