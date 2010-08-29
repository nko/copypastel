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
    var self = this;

    this.nes = nes;
    this.nes.ui.romSelect.unbind('change');
    
    this.nes.ui.romSelect.bind('change', function(){
      self.loadRom(self.nes.ui.romSelect.val())
      self.socket.postMessage("[0,'" + self.nes.ui.romSelect.val() + "']");
    });
  },
  
  Slave : function(nes) {
    var self = this;
    
    this.initialize();
    this.nes = nes;
    this.socket.onmessage = function(evt){
      var data = eval(evt.data);
      switch(data[0]){
        case 0:
          console.log(data);
          self.loadRom(data[1]);
          break;
        case 6:
          //alert(data[1]);
          break;
        default:
          console.log("Slave doesn't know what to do with ", evt.data, typeof(evt.data));
      };
    };
  },
  
  VirtualMemory : function(emulator) { 
    this.emulator = emulator;
    var self = this;
    setInterval(function(){self.isr.call(self);}, 500);
  }
};


$.include('/js/joynes/virtual_memory.js')
$.include('/js/joynes/base.js')
$.include('/js/joynes/master.js')
$.include('/js/joynes/slave.js')