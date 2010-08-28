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
$.include('js/joynes/base.js')
$.include('/js/joynes/master.js')
$.include('/js/joynes/slave.js')

joynes = {
  Base : {},
  
  Master : function(nes) {
    this.initialize();
    this.nes = nes;
  },
  
  Slave : function(nes) {
    this.nes = nes;
  }
};
