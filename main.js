getJSON();

var qsRegex;

function getJSON(){

    $.getJSON('https://api.myjson.com/bins/tar0f', function(dataBooks){

        prepareIsotope();
        createGrid(dataBooks);
    });
}

function prepareIsotope(){

    var $grid = $('.grid').isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows',
        filter: function search() {
            return qsRegex ? $(this).text().match( qsRegex ) : true;
        }
    });

    $(document).ready(debounce( function() {
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );
        $grid.isotope();
    }, 10 ));

    var $quicksearch = $('.quicksearch').keyup( debounce( function() {
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );
        $grid.isotope();
    }, 2000 ) );

}

function debounce( fn, threshold ) {
    var timeout;
    return function debounced() {
        if ( timeout ) {
            clearTimeout( timeout );
        }
        function delayed() {
            fn();
            timeout = null;
        }
        timeout = setTimeout( delayed, threshold || 100 );
    };
}

function createGrid(data) {

    var cuentos = data.books;

    $.each(cuentos, function(key, value){

        var $flipcontainer = $('<div class="flip-container item"/>');
        var $flipper = $('<div class="flipper"/>');
        var $front = $('<div class="front"/>');
        var $back = $('<div class="back"/>');
        var $portada = $('<div class="portada"/>');
        var $titulo = $('<div class="titulo"/>');
        var $desc = $('<div class="descripcion"/>');
        var $idioma = $('<div class="idioma"/>');
        var $buttonFlip = $('<button class="btn-lg btn-success moreInfo">More Info</button>');
        var $buttonFlip2 = $('<button class="price btn-lg btn-danger">Más Info</button>');

        var image = $('<img/>').addClass("portada").attr("src",value.portada);
        var title = $('<span/>').html(value.titulo);
        var desc = $('<span/>').html(value.descripcion);
        var lang = $('<span/>').html(value.idioma);
        
        $flipcontainer.attr("data-card", key);
        $buttonFlip.attr("data-key", key);
        $buttonFlip2.attr('href', value.detalle).attr('data-fancybox', 'grupo').attr('data-caption', 'Caption #' + parseInt(key));       
        $portada.append(image);
        $titulo.append(title);
        $front.append($portada);
        $desc.append(desc);
        $back
            .append($titulo)
            .append($desc)
            .append($idioma)
            .append($buttonFlip2);
        $flipper.append($front)
            .append($back);
        $flipcontainer
            .append($flipper);

        $('.grid')
            .append( $flipcontainer )
            .isotope( 'addItems', $flipcontainer );
    });
    
    listener();
}

function listener(){

    $(".moreInfo").click(function(){
        var key = $(this).attr("data-key");
        var card = $(".grid").find("[data-card='" + key + "']");
        
        $("[data-card]").removeClass("flip");
        card.toggleClass("flip");
    })
}