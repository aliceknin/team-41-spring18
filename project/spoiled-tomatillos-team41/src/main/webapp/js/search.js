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

    // Populate dropdown with top movie results
    function renderMovies(result) {
        console.log(result);
    }

});