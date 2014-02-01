"use strict";
function ModelMessage(hash) {        
    this.model = hash;   
    
    this.changeStatus = function changeStatus(hash) {
        hash.status = "Opened";      
        
        $.ajax({        
            contentType : "application/json",            
            dataType: "json",
            type: "PATCH",            
            url: hash.url,
            data: JSON.stringify({ "message":{status: "Opened"}})            
        });    
    };
    
	return this;				
};