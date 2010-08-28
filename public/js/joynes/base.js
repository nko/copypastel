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
