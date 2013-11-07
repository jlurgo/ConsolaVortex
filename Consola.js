var Consola = function(ui){
    this.ui = ui||$("#plantilla_consola").clone();
    this.start();
};

Consola.prototype.start = function(){
    //var clienteHTTP = new NodoClienteHTTP('http://localhost:3000', 100);         
    //var socket = io.connect('http://localhost:3000');    
    //var socket = io.connect('http://router-vortex.herokuapp.com');
    //var conector_socket = new NodoConectorSocket(socket);    
    //this.cliente_HTTP = new NodoClienteHTTP('http://router-vortex.herokuapp.com', 500);      
    
    var socket = io.connect('https://router-vortex.herokuapp.com');
    this.cliente_sck = new NodoConectorSocket(socket);    
       
    this.portal = new NodoPortalBidiMonoFiltro();
    
    this.portal.conectarCon(this.cliente_sck);
    this.cliente_sck.conectarCon(this.portal);
    
    this.div_filtro_entrada = this.ui.find("#div_filtro_entrada");
    
    this.btn_actualizar_filtro_entrada = this.ui.find("#btn_actualizar_filtro_entrada");
    var _this = this;
    this.btn_actualizar_filtro_entrada.click(function(){
        try{
            var filtro = DesSerializadorDeFiltros.desSerializarFiltro(JSON.parse(_this.div_filtro_entrada.val()));
            _this.portal.pedirMensajes(filtro, function(mensaje){
                _this.alRecibirMensaje(mensaje);
            });
            _this.div_filtro_entrada.removeClass("textarea_con_error");
        }
        catch(e){
            _this.div_filtro_entrada.addClass("textarea_con_error");
        }
    });
    
    this.div_mensajes_entrantes = this.ui.find("#div_mensajes_entrantes");
    this.editor_mensajes_entrantes = new jsoneditor.JSONEditor(this.div_mensajes_entrantes[0],
                                                           {
                                                               mode: 'view',
                                                               name:"Mensajes Recibidos",
                                                               search: true
                                                           });
    this.div_mensaje_para_enviar = this.ui.find("#div_mensaje_para_enviar");
    this.editor_mensaje_para_enviar = new jsoneditor.JSONEditor(this.div_mensaje_para_enviar[0],
                                                           {
                                                               mode: 'tree',
                                                               name: "Mensaje a Enviar",
                                                               search: false
                                                           });
    
    this.btn_enviar_mensaje = this.ui.find("#btn_enviar_mensaje");
    this.btn_enviar_mensaje.click(function(){
        var mensaje = _this.editor_mensaje_para_enviar.get();
        _this.portal.enviarMensaje(mensaje);
    });
    
    this.div_filtro_salida = this.ui.find("#div_filtro_salida");
    this.editor_filtro_salida = new jsoneditor.JSONEditor(this.div_filtro_salida[0],
                                                           {
                                                               mode: 'view',
                                                               name:"Filtro de Salida Recibido",
                                                               search: true
                                                           });
    this.editor_filtro_salida.set(this.portal.filtroDeSalida().serializar());
    this.portal.onFiltroRecibidoModificado = function(filtro){
         _this.editor_filtro_salida.set(filtro.serializar());
    };
    this.mensajes_recibidos = [];
};

Consola.prototype.alRecibirMensaje = function(un_mensaje){
    this.mensajes_recibidos.push(un_mensaje);
    this.editor_mensajes_entrantes.set(this.mensajes_recibidos);
    this.editor_mensajes_entrantes.expandAll();
};

Consola.prototype.dibujarEn = function(un_panel){
    un_panel.append(this.ui);
};
