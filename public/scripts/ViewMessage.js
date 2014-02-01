"use strict";
function ViewMessage(message) {   
    var template = _.template($("#message-tpl").html()),
        template2 = _.template($("#messageshow-tpl").html()),        
        elem;
    
    this.model = message.model;    
    
    this.render = function(my_document) {  
        var content = template(message.model);
        
        elem = document.createElement("div");
        elem.innerHTML = content;           
        my_document.appendChild(elem);
        
        if(message.model.status === "New") {
            $(elem).addClass("new-message-box");
        } else {
            $(elem).addClass("opened-message-box");
        }
        
        $(elem).on("click", openMessage);        
    };    
    
    function openMessage(event) {         
        
        $("body").addClass("overflow-none");
                
        if(message.model.status === "New") {
            message.changeStatus(message.model)            
        }
        
        $("#app-container").css("visibility", "hidden");
        var mesopen = $("body").append(template2(message.model));        
        $("#btn-close-message").on("click", closeMessage);
    };   
    
    function closeMessage(event) {        
        $(elem).removeClass("new-message-box").addClass("opened-message-box");
        $(".open-message").remove();
        $("#app-container").css("visibility", "visible");
    
    };   
    
	return this;				
};