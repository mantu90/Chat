window.onload = function() {

    var messages = [];
    var socket = io.connect("54.93.32.54:80");
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
 
// Send chat message    

// add zero to time
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

socket.on('message', function (data) {
	if(data.message) {
        // add time to message    
	var d = new Date(); // for now
	data.message = addZero(d.getHours())+":"+addZero(d.getMinutes())+":"+addZero(d.getSeconds())+": " + data.message;
	messages.push(data.message);
	var html = '';
	
	for(var i=0; i<messages.length; i++) {
		html +=  messages[i] + '<br />';
        }
	content.innerHTML = html;
        
	} else {
            console.log("There is a problem:", data);
        }
});

sendButton.onclick = function() {
	var text = field.value;
        socket.emit('send', { message: text });
	field.value = "";
    };

}
