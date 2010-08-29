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
      self.socket.postMessage( JSON.stringify([0,self.nes.ui.romSelect.val()]) );
    });
  },
  
  Slave : function(nes) {
    this.initialize();
    var self = this;
    
    this.nes = nes;

    this.socket.onmessage = function(evt){
      console.log(evt.data)
      var data = JSON.parse(evt.data);
      switch(data[0]){
        case 0:
          self.loadRom(data[1]);
          break;
        case 1:
          for( var key in data[1]['ppu'] ) {
            self.prisoner_regWrite.call(self.nes.mmap,0x2000 | parseInt(key), data[1]['ppu'][key])
          }
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
    //setInterval(function(){self.isr.call(self);}, 10);
  }
};

/*
$.include('/js/joynes/virtual_memory.js')
$.include('/js/joynes/base.js')
$.include('/js/joynes/master.js')
$.include('/js/joynes/slave.js')
*/