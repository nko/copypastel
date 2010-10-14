joynes = {
  Base : {},
  
  Master : function(nes) {
    var self = this;
    
    this.initialize();
    this.socket = new WebSocket('ws://' + document.location.hostname + ':8080/');
    this.socket.onopen = function(evt){
      self.socket.send(0);
    }

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
      var now = Date.now();
      if(data.key){ self.nes.keyboard.setKey(data.key, data.value) };
      if(data.ok){ 
        if(!self.lastSendTime){ self.lastSendTime = Date.now() }
        else{ 
          var frameRate = 1/(now - self.lastSendTime) * 1000;
          if(frameRate < 15){ frameRate = 15 }
          else if(frameRate > 60){ frameRate = 60 };
          // Set to frameRate + 1 so we can increase until reaching limit.
          self.setFrameRate(frameRate + 1);
        }
        self.sendImageData();
        self.lastSendTime = now;
      };
      if(data.id){ 
        // Update the interface to let the user know their own id
        document.getElementById('tag').innerHTML = data.id; 
      }
      if(data.close){
        // We're back to playing alone, so pump that framerate!
        self.setFrameRate(60);
      }
    }
  },
  
  Slave : function() {
    var self = this;
    var static = function(){
      $("#tv").css("background", "url(/img/static.gif)");      
  		$($("canvas").first()).css("opacity", "0");
    };
    var static_timeout = 3000;

    this.tv = $("#tv");
    this.initialize();
    this.socket.onopen = function(evt){
      var partner = document.location.pathname;
      partner = partner.substring(1, partner.length);
      // Pair up and let partner know we're
      // good to receive.
      self.socket.send(partner);
      self.timeout = setTimeout(static, static_timeout);
    }
    this.socket.onmessage = function(evt){
  		$($("canvas").first()).css("opacity", "1");
      self.tv.css("background", "black"); // How to run this only once?
      // Reset timeout for static background appearance
      clearTimeout(self.timeout);
      self.timeout = setTimeout(static, static_timeout);
      self.drawCanvas(evt.data);
      self.socket.send(JSON.stringify({ok: 1}));
    };

    this.canvas = $('<canvas class="nes-screen" width="256" height="240">').appendTo('#emulator')[0];

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
  }
};