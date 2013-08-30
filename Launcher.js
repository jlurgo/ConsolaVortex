var onDeviceReady = function() {          
    var pantalla_consola = $("#pantalla_consola");
    $.mobile.changePage(pantalla_consola, {transition:"flip", allowSamePageTransition:true});
    var consola = new Consola(pantalla_consola);    
};

$(document).ready(function() {  
    // are we running in native app or in browser?
    window.isphone = false;
    if(document.URL.indexOf("file://") == -1 && document.URL.indexOf("http://") == -1) {
        window.isphone = true;
    }

    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});
