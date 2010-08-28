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
  
  Master : function(nes, socket) {
    this.initialize(socket);
    var self = this;

    this.nes = nes;
    this.nes.ui.romSelect.unbind('change');
    this.nes.ui.romSelect.bind('change', function(){
      $.ajax({
          url: escape(self.nes.ui.romSelect.val()),
          xhr: function() {
              var xhr = $.ajaxSettings.xhr();
              // Download as binary
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
              return xhr;
          },
          success: function(data) {
              self.nes.loadRom(data);
              self.nes.start();
              self.nes.ui.enable();
              self.socket.send({loadRom: self.nes.ui.romSelect.val()});
          }
      });
    });
  },
  
  Slave : function(nes, socket) {
    this.initialize(socket);
    this.nes = nes;
  }
};

$.include('js/joynes/base.js')
$.include('/js/joynes/master.js')
$.include('/js/joynes/slave.js')