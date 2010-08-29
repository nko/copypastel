$.include = function(url){
  $.ajax({
    'url': url,
    'dataType': 'script',
    'type': 'GET',
    'async': false
  })
}

/*
$.include('/js/dynamicaudio-min.js');
$.include('/js/jquery.dimensions.min.js');
$.include('/js/jsnes.js');
$.include('/js/messages.js');
*/

joynes = {
  Base : {},
  
  Master : function(nes) {
    this.initialize();
    var self = this;

    this.nes = nes;
    this.nes.ui.romSelect.unbind('change');
    
    this.nes.ui.romSelect.bind('change', function(){
      self.loadRom(self.nes.ui.romSelect.val())
      //self.socket.postMessage("[0,'" + self.nes.ui.romSelect.val() + "']");
      setInterval( function(){self.sendImageData.call(self)}, 150);
    });
  },
  
  Slave : function(nes) {
    this.initialize();
    var self = this;
    
    this.nes = nes;

    this.socket.onmessage = function(evt){
      self.drawCanvas(evt.data);
    };
  },
  
  VirtualMemory : function(emulator) { 
    this.emulator = emulator;
    var self = this;
    //setInterval(function(){self.isr.call(self);}, 10);
  }
};

/*
$.include('/js/joynes/virtual_memory.js')
$.include('/js/joynes/base.js')
$.include('/js/joynes/master.js')
$.include('/js/joynes/slave.js')
*/
