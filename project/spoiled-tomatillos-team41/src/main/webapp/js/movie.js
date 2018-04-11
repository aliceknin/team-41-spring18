var hostUrl = 'http://' + window.location.hostname + ':8080';
var lastRatingIndex;

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
    var stars = Array(10);
    var fixed = false;
    if (this.props.rating) {
      for (var i = 0; i < stars.length; i++) {
        stars[i] = (i <= this.props.rating);
      }
      fixed = true;
    } else {
      stars.fill(false);
    }
    return  {stars : stars, fixedStars : stars, fixed : fixed};
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
    if (!this.state.fixed) {
      this.setFillOfAllStarsUpTo(i, true);
    }
  },

  handleMouseOut(i) {
    if (!this.state.fixed) {
      this.setFillOfAllStarsUpTo(i, false);
    } else {
      this.setState({stars :  this.state.fixedStars});
    }
  },

  handleClick(i) {
    // TODO: check if user is logged in
    lastRatingIndex = i;
    this.setState({fixed : true});
    this.setState({fixedStars : this.state.stars});
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
              <StarRating rating={lastRatingIndex} modalHandler={this.props.modalHandler}/>
              <form>
                <div className="form-group">
                  <label for="review-text" className="control-label">Write your review:</label>
                  <textarea className="form-control" id="review-text"></textarea>
                </div>
              </form>
              <h4 style={{'text-align': 'center', 'color': 'red'}}>{!localStorage.getItem('user') ? 'You must be logged in to review a movie.' : ''}</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary btn-submit"
                  onClick={this.props.modalHandler.handleSubmit} data-dismiss="modal"
                  disabled={!localStorage.getItem('user')}>Post Review</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
});

var Rec = React.createClass({
    getInitialState: function() {
          return {
            searchInput: '',
            userResults: [],
            user: localStorage.getItem('user'),
            fromUserID: '',
            toUserID: ''
          };
    },
    getFromUserID: function() {
      var self = this;
      $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/user/info/' + this.state.user
      }).then(function(data) {
        self.setState({fromUserID: data.id})
      });
    },
    updateSearchInput: function(evt) {
        this.setState({
          searchInput: evt.target.value
        });
    },
    handleKeyPress: function(evt) {
        if (evt.key === 'Enter') {
          this.searchAndRec();
          $('.dropdown-toggle').dropdown('toggle');
        }
    },
    createAPI: function(username) {
        var self = this;
        this.getFromUserID();
        $.ajax({
          url: 'http://' + window.location.hostname + ':8080/api/user/info/' + username
        }).then(function(data) {
          var id = data.id;
          var recAPI = 'http://' + window.location.hostname + ':8080/api/recommendation/add/' + self.state.fromUserID + '/' + id + '/' + self.props.movieID;
          $.ajax({
            url: recAPI
          });
        });
    },
    searchAndRec: function() {
        var self = this;
        $.ajax({
          url: 'http://' + window.location.hostname + ':8080/api/user/select/' + this.state.searchInput
        }).then(function(data) {
          var results = [];
          var length = data.length < 5 ? data.length : 5;
          for (var i = 0; i < length; i++) {
            results.push({
              text: data[i]
            });
          }
          self.setState({ userResults: results });
        });
    },
    render: function() {
      return(
        <div className="dropdown">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search for a user"
              value={this.state.searchInput} onChange={this.updateSearchInput}
              onKeyPress={this.handleKeyPress} />
          </div>
          <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="search" onClick={this.searchAndRec}>Search</button>
          <ul className="dropdown-menu">
            <li className="dropdown-item">Users:</li>
              {this.state.userResults.map(function(result, index) {
                return <li className="dropdown-item" key={index} onClick={this.createAPI.bind(this, result.text)}>{result.text}</li>;
              }, this)}
          </ul>
       </div>
      );
    }
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
              <h4>Your rating: </h4>
              <StarRating rating={this.props.data.imdbRating} modalHandler={this.props.modalHandler}/><span>({this.props.data.imdbRating} on IMDB)</span>
              <h4>Recommend to a friend: </h4>
              <Rec movieID={this.props.data.imdbID} />
              <h4><span className="label">Genre: </span>{this.props.data.Genre}</h4>
              <h4><span className="label">Rated: </span>{this.props.data.Rated}</h4>
              <h4><span className="label">Directed by: </span>{this.props.data.Director}</h4>
              <h4><span className="label">Starring: </span>{this.props.data.Actors}</h4>
              <h4><span className="label">IMDB rating: </span>{this.props.data.imdbRating}</h4>
            </div>
          </div>
        );
    }
});

var Review = React.createClass({
    getInitialState: function() {
      return {
        display: true,
        upvotes: this.props.review.upvotes
      };
    },
    componentDidMount: function() {
      if (localStorage.getItem('user') != this.props.review.username) {
        document.getElementById(this.props.review.username).style.display="none";
      }
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
                url: hostUrl + "/api/review/upvote/" + reviewId,
                type: 'PUT',
                success: function(result) {
                    self.setState({upvotes: result.upvotes })
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
            <td>{this.state.upvotes}</td>
            <td>
                <button id={this.props.review.username} className="btn btn-info" onClick={this.handleDelete}>Delete</button>
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
    $.ajax({
        url: hostUrl + "/api/review/select/" + id
    }).then(function (data) {
        self.setState({reviews: data});
    });
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
        var lastRating = lastRatingIndex + 1;
        $.ajax({
          url: hostUrl + "/api/review/add/" + self.state.imdbID +"/" + lastRating + "/" + review + "/" + localStorage.getItem('user')
        }).then(function (data) {
          var updatedReviews = self.state.reviews.slice();
          updatedReviews.push(data);
          self.setState({reviews : updatedReviews});
        });
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
