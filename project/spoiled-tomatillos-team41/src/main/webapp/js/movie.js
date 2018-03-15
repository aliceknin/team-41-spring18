var Movie = React.createClass({
    render: function() {
        return(
            <div>
                <h2>{this.props.data.Title}</h2>
                <div className="row">
                    <h3>Year: {this.props.data.Year}</h3>
                </div>
                <div className="row">
                    <h3>Genre: {this.props.data.Genre}</h3>
                </div>
                <div className="row">
                    <h3>Rated: {this.props.data.Rated}</h3>
                </div>
                <div className="row">
                    <h3>Director: {this.props.data.Director}</h3>
                </div>
                <div className="row">
                    <h3>Actors: {this.props.data.Actors}</h3>
                </div>
                <div className="row">
                    <h3>IMDB Rating: {this.props.data.imdbRating}</h3>
                </div>
            </div>
        );
    }
})

var Review = React.createClass({
    getInitialState: function() {
      return {display: true };
    },
    handleDelete() {
        var self = this;
        var reviewId = this.props.review.id;
        $.ajax({
            url: "http://ec2-13-58-155-176.us-east-2.compute.amazonaws.com:8080/api/review/delete/" + reviewId,
            type: 'DELETE',
            success: function(result) {
                self.setState({display: false});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.responseJSON.message);
            }
        });
    },
    handleUpvote() {
            var self = this;
            var reviewId = this.props.review.id;
            $.ajax({
                url: "http://ec2-13-58-155-176.us-east-2.compute.amazonaws.com:8080/api/review/upvote/" + reviewId,
                type: 'PUT',
                success: function(result) {
                    console.log("upvote added");
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.responseJSON.message);
                }
            });
     },
    render: function() {
        if (this.state.display==false) return null;
        else return (
          <tr>
            <td>{this.props.review.username}</td>
            <td>{this.props.review.rating}</td>
            <td>{this.props.review.comment}</td>
            <td>{this.props.review.upvotes}</td>
            <td>
                <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
            </td>
            <td>
                <button className="btn btn-info" onClick={this.handleUpvote}>Upvote</button>
            </td>
          </tr>);
    }
});
var ReviewTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.reviews.forEach(function(review) {
            rows.push(<Review review={review} />);
        });
        return (
          <div className='row'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Username</th><th>Rating</th><th>Comment</th><th>Upvotes</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        );
    }
});
var REVIEWS = [
  {username: 'nicolepristin', rating: 5, comment: 'Very good movie'},
  {username: 'npristin', rating: 2, comment: 'This movie was very bad'},
];
var App = React.createClass({
  getInitialState: function () {
    return {reviews: [], movieData: {}};
  },
  componentDidMount: function () {
    var id = this.getIdFromUrl();
    this.loadMovieData(id);
    this.loadReviewsFromServer(id);
  },
  getIdFromUrl: function() {
      var queryString = window.location.search.slice(1);
      var array = queryString.split('&');
      for (var i = 0; i < array.length; i++) {
          var pair = array[i].split('=');
          if (pair[0] === 'id') {
              var id = pair[1];
              return id;
          }
      }
  },
  loadMovieData: function(id) {
    var self = this;
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=55cab600&i=' + id
    }).then(function (data) {
        self.setState({movieData: data});
    });
  },
  loadReviewsFromServer: function (id) {
    var self = this;
    $.ajax({
        url: "http://ec2-13-58-155-176.us-east-2.compute.amazonaws.com:8080/api/review/select/" + id
    }).then(function (data) {
        self.setState({reviews: data});
    });
  },
  render() {
    return (
        <div className='container'>
            {this.state.imdbID}
            <Movie data={this.state.movieData}/>
            <ReviewTable reviews={this.state.reviews}/>
        </div>
    );
  }
});
ReactDOM.render(
    <App/>, document.getElementById('root')
);

