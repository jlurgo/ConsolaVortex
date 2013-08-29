var Consola = function(){
    this.start();
};

Consola.prototype.start = function(){
    this.ui = $("#plantilla_consola").clone();
    
    this.cliente_HTTP = new NodoClienteHTTP('http://router-vortex.herokuapp.com', 1000);             
    this.portal = new NodoPortalBidiMonoFiltro();
    
    this.portal.conectarCon(this.cliente_HTTP);
    this.cliente_HTTP.conectarCon(this.portal);
    
    this.txt_filtro_entrada = this.ui.find("#txt_filtro_entrada");
    this.btn_actualizar_filtro_entrada = this.ui.find("#btn_actualizar_filtro_entrada");
    var _this = this;
    this.btn_actualizar_filtro_entrada.click(function(){
        try{
            var filtro = DesSerializadorDeFiltros.desSerializarFiltro(JSON.parse(_this.txt_filtro_entrada.val()));
            _this.portal.pedirMensajes(filtro, function(mensaje){
                _this.alRecibirMensaje(mensaje);
            });
            _this.txt_filtro_entrada.removeClass("textarea_con_error");
        }
        catch(e){
            _this.txt_filtro_entrada.addClass("textarea_con_error");
        }
    });
    
    this.txt_mensajes_entrantes = this.ui.find("#txt_mensajes_entrantes");
    this.txt_mensaje_para_enviar = this.ui.find("#txt_mensaje_para_enviar");
    
    this.btn_enviar_mensaje = this.ui.find("#btn_enviar_mensaje");
    this.btn_enviar_mensaje.click(function(){
        try{
            var mensaje = JSON.parse(_this.txt_mensaje_para_enviar.val());
            _this.portal.enviarMensaje(mensaje);
            _this.txt_mensaje_para_enviar.removeClass("textarea_con_error");
        }
        catch(e){
            _this.txt_mensaje_para_enviar.addClass("textarea_con_error");
        }
    });
};

Consola.prototype.alRecibirMensaje = function(un_mensaje){
    this.txt_mensajes_entrantes.text(this.txt_mensajes_entrantes.text() + "\n" + JSON.stringify(un_mensaje));
};

Consola.prototype.dibujarEn = function(un_panel){
    un_panel.append(this.ui);
    un_panel.trigger('create');
};
