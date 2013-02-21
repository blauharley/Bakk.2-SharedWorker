var allMessages = "";
var ports = [];

onconnect = function(event){
  
  var newPort = event.ports[0];
  ports.push(newPort);
  
  newPort.onmessage = function(e){
    allMessages += e.data;
    
    for(var port =0; port < ports.length; port++)
      if( ports[port] !== this )
        ports[port].postMessage(e.data);
  };
  
  if(allMessages.length) // send messages to new script if there are any
    newPort.postMessage(allMessages);
  
};