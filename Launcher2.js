$(document).ready(function() {  
    var div_editor = $("#editor");
    this.editor_filtro_entrada = new jsoneditor.JSONEditor(div_editor[0],
                                                           {
                                                               mode: 'tree',
                                                               search: false
                                                           });
});
