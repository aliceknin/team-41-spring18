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

