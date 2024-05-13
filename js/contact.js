//Setteo el calendario en español
$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '<Ant',
    nextText: 'Sig>',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
    dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['es']);

//Estos scripts se cargarán una vez termine de cargar la página
$(document).ready(function(){
    //Permite ingresar únicamente números en la casilla de teléfono
    $('#phone').keypress(function(e){
        if(String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });
    $('.datepicker').datepicker({
        dateFormat: "dd/mm/yy",
        showOn: 'both',
        buttonImage: 'img/icons/calendar-icon.png',
        buttonImageOnly: true,
        buttonText: 'Seleccione una fecha',
    });
    //Deshabilito el calendario de partida hasta que se elija fecha de arribo
    $('#leave').datepicker('option', 'disabled', true);
    //Habilito el picker de fechas, con la de arribo siendo la de hoy en adelante (en el día que se ejecute)
    $('#arrival').datepicker('option', 'minDate', 0);
    $('#arrival').datepicker('option', 'onSelect', function(date){
        $('#leave').datepicker('option', 'disabled', false);
        $('#leave').datepicker('option', 'minDate', date);
    });
    //Me aseguro que si se resetea el formulario, se vuelva a deshabilitar el picker de partida
    $('#reset').on('click', function(){
        $('#leave').datepicker('option', 'disabled', true);
    });
    //Cuando se envíe el formulario, deshabilito la recarga de la página, borro los datos cargados, reproduzco la animación de carga por 2 segundos y muestro el div dando gracias
    $('#form').submit(function(e){
        e.preventDefault();
        $('#reset').click();
        $('#overlay-test').removeClass('hidden');
        $('#loading').addClass('loader');
        $('#loading').removeClass('hidden');
        setTimeout(function(){
            $('#loading').removeClass('loader');
            $('#loading').addClass('hidden');
            $('#thanksmodal').removeClass('hidden');
            $('#accept').on('click', function(e){
                console.log('works');
                $('#thanksmodal').addClass('hidden');
                $('#overlay-test').addClass('hidden');
                return false;
            });
        }, 2000);
        
    });
});


