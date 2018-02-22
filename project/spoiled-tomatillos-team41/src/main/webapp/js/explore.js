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

$("#recommendedCarousel").on("slide.bs.carousel", function(e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 6;
    var totalItems = $(".carousel-item").length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
                $(".carousel-item")
                  .eq(i)
                  .appendTo(".carousel-inner");
            } else {
                $(".carousel-item")
                  .eq(0)
                  .appendTo(".carousel-inner");
            }
        }
    }
});


