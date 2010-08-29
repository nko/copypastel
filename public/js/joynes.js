joynes = {
  Base : {},
  
  Master : function(nes) {
    this.initialize();
    var self = this;

    this.nes = nes;
    this.frameRate = null;
    this.lastSendTime = null;
    this.nes.ui.romSelect.unbind('change');
    
    this.nes.ui.romSelect.bind('change', function(){
      self.loadRom(self.nes.ui.romSelect.val());
      self.sendImageData();
    });
    
    this.socket.onmessage = function(evt){
      var data = JSON.parse(evt.data);
      if(data.key){ self.nes.keyboard.setKey(data.key, data.value) };
      if(data.ok){ 
        if(!self.lastSendTime){ self.lastSendTime = Date.now() }
        else{ 
          var frameRate = (Date.now() - self.lastSendTime) * 1000;
          self.setFrameRate(frameRate);
        }
        self.sendImageData();
      };
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
      self.socket.send(JSON.stringify({ok: 1}));
    };
    
    this.socket.onopen = function(evt){
      self.socket.send(JSON.stringify({ok: 1})); 
    }
  }
};