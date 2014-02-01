"use strict";
function ViewApp() {   
    var my_window = window.parent.document.documentElement || document.body,    
        my_document = document.getElementById("app-container"),
        loaded_messages;
 
    $("#app-container").css("height", my_window.clientHeight);  
    
    $(window).resize(function(){      
        $("#app-container").css("height", my_window.clientHeight); 
    });
    
    $("#app-container").on("scroll", scroll);   
      
    this.init = function() {
        loaded_messages = 0;
        loadPart(loaded_messages);        
	};    
    
    function loadPart(point) {                
        $.ajax({        
            dataType: "json",
            type: "GET",            
            url: "/messages.json",
            data: {checkpoint: 10 + point},            
            success: successLoad             
        });
    };
     
    function scroll() { 
        var length_to_bot = my_document.scrollHeight - my_document.scrollTop - my_document.clientHeight;
        
        if (length_to_bot <= 10) {
            loadPart(loaded_messages)
        }         
    };
    
    function successLoad(data) {
        $.each(data, function(key, message) {
            var model, view;
            message.created_at = message.created_at.replace("T", " | ");       
            message.created_at = message.created_at.substring(0, (message.created_at.length-5)); 
            
            model = new ModelMessage(message);
            view = new ViewMessage(model);
            view.render(my_document);
        });
        loaded_messages += 10;
    };
    
	return this;				
};