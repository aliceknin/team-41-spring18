$(function() {
    var results;
    var currentPage = 1;
    var numberOfPages;

    $('#search').click(function() {
        var query = $('#searchInput').val();
        $.ajax({
            url: 'http://www.omdbapi.com/?apikey=55cab600&s=' + query + '&page=' + currentPage,
            success: render
        })
    });

    function render(result) {
        results = result.Search;
        numberOfPages = Math.ceil(result.totalResults / 10);
        console.log(results);
        console.log(numberOfPages);
    }

});

