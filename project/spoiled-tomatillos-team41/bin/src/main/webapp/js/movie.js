$(function() {
    var id = getUrlParam('id');

    if (id) {
        $.ajax({
            url: 'http://www.omdbapi.com/?apikey=55cab600&i=' + id,
            success: render
        });
    }

    function render(result) {
        console.log(result);
        $('#title').text(result.Title);
        $('#year').text(result.Year);
        $('#genre').text(result.Genre);
        $('#rated').text(result.Rated);
        $('#director').text(result.Director);
        $('#actors').text(result.Actors);
        $('#imdbRating').text(result.imdbRating);
    }

});

function getUrlParam(param) {
    var queryString = window.location.search.slice(1);
    var array = queryString.split('&');

    for (var i = 0; i < array.length; i++) {
        var pair = array[i].split('=');
        if (pair[0] === param) {
            return pair[1];
        }
    }
    return '';
}

