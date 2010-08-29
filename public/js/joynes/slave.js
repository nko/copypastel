joynes.Slave.prototype = {
  drawCanvas: function(data){
    var canvas = this.canvas;
    var img = new Image();
    img.onload = function(){
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
    }
    img.src = data;
  },
  sendKey: function(key, value) {
      switch (key) {
          case 88: this.socket.send(JSON.stringify({key: 103,  value: value})); break;
          case 90: this.socket.send(JSON.stringify({key: 105,  value: value})); break;
          case 17: this.socket.send(JSON.stringify({key: 99,   value: value})); break;
          case 13: this.socket.send(JSON.stringify({key: 97,   value: value})); break;
          case 38: this.socket.send(JSON.stringify({key: 104,  value: value})); break;
          case 40: this.socket.send(JSON.stringify({key: 98,   value: value})); break;
          case 37: this.socket.send(JSON.stringify({key: 100,  value: value})); break;
          case 39: this.socket.send(JSON.stringify({key: 102,  value: value})); break;
          default: return true;
      }
      return false; // preventDefault
  }
}

$.extend(joynes.Slave.prototype,  joynes.Base.prototype);
