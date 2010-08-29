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
      console.log(evt.data);
      var data = JSON.parse(evt.data);
      self.nes.keyboard.setKey(data.key, data.value);
    }
  },
  
  Slave : function() {
    this.initialize();
    var self = this;
    this.canvas = $('<canvas class="nes-screen" width="256" height="240">').appendTo('#emulator_2')[0];

    $(document).
    bind('keydown', function(evt) {
      self.sendKey(evt.keyCode, 0x41);
    }).
    bind('keyup', function(evt) {
      self.sendKey(evt.keyCode, 0x40);
    }).
    bind('keypress', function(evt) {
        evt.preventDefault()
    });

    this.socket.onmessage = function(evt){
      self.drawCanvas(evt.data);
    };
  }
};