function magnificationHandler(event) {
    let element = $(this);
    let entering = event.type == "mouseenter";
    var blurRadius = entering ? 4.0 : 0.0;
    
    let blurInterval = setInterval(function() {
        element.css("text-shadow", `0 0 ${blurRadius}px rgba(255,255,255,1)`);
        
        if (entering) {
            blurRadius -= 0.1;
            if (blurRadius <= 0.0) {
                element.css("color", "");
                clearInterval(blurInterval);
            }
        } else {
            blurRadius += 0.1;
            if (blurRadius >= 4.0) {
                element.css("color", "transparent");
                clearInterval(blurInterval);
            }
        }
    }, 4);
}