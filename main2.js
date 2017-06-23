var path = "https://api.myjson.com/bins/gzmrv";

$.getJSON(path, function(data){

    fillGrid(data);

});

function fillGrid(data){

    var bookList = data.books;

    $.each(bookList, function(index, book){
        var container = $("<div/>").addClass("flip-container");
        var flipper = $('<div/>').addClass("flipper");
        var front = $('<div/>').addClass("front");
        var back = $('<div/>').addClass("back");
        var cover = $("<img/>");

        var title = $("<span/>").html(book.titulo);
        var buttonFlip = $("<button>My button</button>")
            .addClass("btn-lg btn-danger")
            .attr("href", book.detalle)
            .attr('data-fancybox', 'grupo');


        cover.attr("src", book.portada);
        front.append(cover);
        
        back.append(title)
            .append(buttonFlip);

        flipper.append(front, back);

        container.append(flipper);


        $(".grid2").append(container);
    })

}

