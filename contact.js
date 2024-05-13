//Estos scripts se cargarán una vez termine de cargar la página
$(document).ready(function(){
    //Permite ingresar únicamente números en la casilla de teléfono
    $('#phone').keypress(function(e){
        if(String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });
    //Habilito el picker de fechas, con la de arribo siendo la de mañana en adelante (en el día que se ejecute)
    $('#arrival').attr('min', new Date().toISOString().split("T")[0]);
    //Cuando se elija una fecha de arribo, habilito el picker de partida con una fecha mínima de la elegida en arribo
    $('#arrival').on('change', function(){
        const leave = $('#leave');
        if($('#arrival').val() == ""){
            leave.attr('disabled', true);
            leave.val('');
        }else{
            leave.attr('min', $('#arrival').val());
            leave.removeAttr('disabled');
        }
    });
    //Me aseguro que si se resetea el formulario, se vuelva a deshabilitar el picker de partida
    $('#reset').on('click', function(){
        $('#leave').attr('disabled', true);
    });
});
