$(function() {

    // Responsible for navbar search
    $('#search').click(function() {
        var query = $('#searchInput').val();
        // Get movie results
        $.ajax({
            url: 'http://www.omdbapi.com/?apikey=55cab600&page=1&s=' + query,
            success: renderMovies
        });
        // TODO: search for users by query
    });

    // Populate dropdown with top 5 movie results
    function renderMovies(result) {
        var movies = result.Search;
        var length = movies.length < 5 ? movies.length : 5;
        for (var i = 0; i < length; i++) {
            console.log(i);
            var movieResult = $('<a>', {
                text: movies[i].Title + ' (' + movies[i].Year + ')',
                href: 'movie.html?id=' + movies[i].imdbID
            });
            $('#searchResult' + i).html(movieResult);
        }
    }

});