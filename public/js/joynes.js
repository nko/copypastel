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
    });
  },
  
  Slave : function(nes) {
    this.initialize();
    this.nes = nes;
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