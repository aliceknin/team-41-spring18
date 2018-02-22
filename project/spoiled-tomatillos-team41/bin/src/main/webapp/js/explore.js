$(function() {
    var results;
    var currentPage = 1;
    var numberOfPages;

    // Responsible for Explore page search
    $('#explore').click(function() {
        var query = $('#exploreInput').val();
        $.ajax({
            url: 'http://www.omdbapi.com/?apikey=55cab600&s=' + query + '&page=' + currentPage,
            success: render
        })
    });

    // Render movie results on Explore page
    function render(result) {
        results = result.Search;
        numberOfPages = Math.ceil(result.totalResults / 10);
        console.log(results);
        console.log(numberOfPages);
    }

});

