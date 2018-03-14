/*var hostUrl = "http://ec2-13-58-155-176.us-east-2.compute.amazonaws.com:8080";*/
var hostUrl = "http://localhost:8080";

var Star = React.createClass({
  render: function() {
    var star = (this.props.value) ? "glyphicon glyphicon-star" : "glyphicon glyphicon-star-empty";
    return (
      <button
        className="star"
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}>
        <span className={star}/>
      </button>
    );
  }
});

var StarRating = React.createClass({
  getInitialState: function(props) {
    return  {stars : Array(10).fill(false)};
  },

  setFillOfAllStarsUpTo: function(i, fill) {
    const stars = this.state.stars.slice();
    for (var curr = 0; curr <= i; curr++) {
      stars[curr] = fill;
    }
    this.setState({stars : stars});
  },

  numberRating: function() {
    let rating = 0;
    for (let star of this.props.stars) {
      if (star) {
        rating++;
      }
    }
    return rating;
  },

  handleMouseOver(i) {
    this.setFillOfAllStarsUpTo(i, true);
  },

  handleMouseOut(i) {
    this.setFillOfAllStarsUpTo(i, false);
  },

  handleClick(i) {
    // TODO: check if user is logged in
    this.props.modalHandler.handleShowModal();
  },

  renderStar: function(i) {
    return (
      <Star
        value={this.state.stars[i]}
        onClick={()=>this.handleClick(i)}
        onMouseOver={()=>this.handleMouseOver(i)}
        onMouseOut={()=>this.handleMouseOut(i)}
      />
    );
  },

  render() {
  /*  console.log(this.props.rating);
    var ratingInd = Math.round(this.props.rating) - 1;
    if (ratingInd) {
      this.setFillOfAllStarsUpTo(ratingInd, true);
    }*/
    return (
      <div className="starRating">
        {this.renderStar(0)}
        {this.renderStar(1)}
        {this.renderStar(2)}
        {this.renderStar(3)}
        {this.renderStar(4)}
        {this.renderStar(5)}
        {this.renderStar(6)}
        {this.renderStar(7)}
        {this.renderStar(8)}
        {this.renderStar(9)}
      </div>
    );
  }
});

var ReviewModal = React.createClass({
  componentDidMount(){
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.modalHandler.handleHideModal);
  },

  render() {
    return (
      <div className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Write your review: </h4>
            </div>
            <div className="modal-body">
              <StarRating />
              <form>
                <div className="form-group">
                  <label for="review-text" className="control-label">Write your review:</label>
                  <textarea className="form-control" id="review-text"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary btn-submit" onClick={this.props.modalHandler.handleSubmit} data-dismiss="modal">Post Review</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
});

var Movie = React.createClass({
    render: function() {
        return(
          <div className="row">
            <div className="col-md-4">
              <img src={this.props.data.Poster} alt={this.props.data.Title}/>
            </div>
            <div className="col-md-8">
              <h2>{this.props.data.Title}<small> ({this.props.data.Year})</small></h2>
              <StarRating rating={this.props.data.imdbRating} modalHandler={this.props.modalHandler}/><span>({this.props.data.imdbRating} on IMDB)</span>
              <h4>{this.props.data.Genre}</h4>
              <h4>{this.props.data.Rated}</h4>
              <h4>Directed by {this.props.data.Director}</h4>
              <h4>Starring {this.props.data.Actors}</h4>
              <h4>{this.props.data.imdbRating}</h4>
            </div>
          </div>
        );
    }
});

var Review = React.createClass({
    getInitialState: function() {
      return {display: true };
    },
    handleDelete() {
        var self = this;
        var reviewId = this.props.review.id;
        $.ajax({
            url: hostUrl + "/api/review/delete/" + reviewId,
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
    return {reviews: [], movieData: {}, showModal: false};
  },
  componentDidMount: function () {
    const id = this.getIdFromUrl();
    this.setState({imdbID : id});
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
    console.log(hostUrl);
    $.ajax({
        url: hostUrl + "/api/review/select/" + id
    }).then(function (data) {
        self.setState({reviews: data});
    });
    console.log("reviews loaded");
  },
  reviewModalHandler: function () {
    var self = this;
    return {
      handleShowModal : function () {
        self.setState({showModal : true});
      },
      handleHideModal : function () {
        self.setState({showModal : false});
      },
      handleSubmit : function () {
        var review = $('#review-text').val();
        $.ajax({
          url: hostUrl + "/api/review/add/" + self.state.imdbID +"/" + 5 + "/" + review + "/testUser"
        }).then(function (data) {
          console.log(self.state.reviews);
          var updatedReviews = self.state.reviews.slice();
          updatedReviews.push(data);
          self.setState({reviews : updatedReviews});
          console.log(self.state.reviews);
        });
        console.log("review submimtted and loaded");
      }
    }
  },
  render() {
    return (
        <div className='container'>
            <Movie data={this.state.movieData} modalHandler={this.reviewModalHandler()}/>
            <ReviewTable reviews={this.state.reviews}/>
            {this.state.showModal ? <ReviewModal modalHandler={this.reviewModalHandler()}/> : null}
        </div>
    );
  }
});

ReactDOM.render(
    <App/>, document.getElementById('root')
);
