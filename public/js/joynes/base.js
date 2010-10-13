joynes.Base.prototype = {
  loadRom : function(url) {
    var self = this;
    
    $.ajax( {
      url: escape(url),
      xhr: function() {
        var xhr = $.ajaxSettings.xhr();
        // Download as binary
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
        return xhr;
      },
      success: function(data) { self.loadRomData(data); }
    })
  },
  
  loadRomData: function(data) {
    this.nes.loadRom(data);
    this.nes.start();
    this.nes.ui.enable();
  },
  
  initialize : function() {
    this.socket = new WebSocket('ws://' + document.location.hostname + ':8080/123');
  }
};

