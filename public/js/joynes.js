joynes = {
  Base : {},
  
  Master : function(nes) {
    this.initialize();
    var self = this;

    this.nes = nes;
    this.nes.ui.romSelect.unbind('change');
    
    this.nes.ui.romSelect.bind('change', function(){
      self.loadRom(self.nes.ui.romSelect.val())
      setInterval( function(){self.sendImageData.call(self)}, 150);
    });
    
    this.socket.onmessage = function(evt){
      // handle keypresses
    }
  },
  
  Slave : function() {
    this.initialize();
    var self = this;
    this.canvas = $('<canvas class="nes-screen" width="256" height="240">').appendTo('#emulator_2')[0];

    this.socket.onmessage = function(evt){
      self.drawCanvas(evt.data);
    };
  }
};