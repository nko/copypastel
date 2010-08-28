var socket = new WebSocket('ws://localhost:8080/'); 

socket.onopen = function(event){
  socket.send("Hello, WebSocket");
}
socket.onmessage = function(event) { alert(event.data); }
socket.onclose = function(event) { alert("closed"); }

onmessage = function(event){
  var msg = event.data;

  socket.send(msg);
};