var server = new WebSocket('ws://localhost:8080/'); 

server.onopen = function(event){
  server.send("Hello, WebSocket");
}

server.onmessage = function(event) { postMessage(event.data);  }
server.onclose = function(event) { /*alert("closed");*/ }


onmessage = function(event){
  server.send(event.data);
}