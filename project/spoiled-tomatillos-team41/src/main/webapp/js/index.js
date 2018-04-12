var RecCard = React.createClass({
  getInitialState: function() {
    return {movieData : {}};
  },
  componentDidMount: function() {
    var self = this;
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=55cab600&i=' + this.props.id
    }).then(function (data) {
        self.setState({movieData: data});
    });
  },
  render: function() {
    if (!this.state.movieData) {
      return <p>Loading...</p>;
    }
    return (
      <div class="carousel-item col-md-2">
        <div class="card">
          <img class="card-img-top img-fluid" src={this.state.movieData.Poster} height="300"/>
          <div class="card-body">
            <h4 class="card-title"><a href={'movie.html?id=' + this.props.id}>{this.state.movieData.Title}</a></h4>
            <p class="card-text">{this.props.text}</p>
          </div>
        </div>
      </div>
    )
  }
});

var RecList = React.createClass({
  getInitialState: function(props) {
    return {
      recs: [],
      user: localStorage.getItem('user')
    }
  },
  componentDidMount: function() {
    var self = this;
    $.ajax({
      url: 'http://' + window.location.hostname + ':8080' + self.props.url
    }).then(function(data) {
      self.setState({recs: data});
    });
  },
  render: function() {
    var self = this;
    return (
      <div id="recommendedCarousel" class="carousel slide" data-ride="carousel">
        <h1>{this.props.title}</h1>
        <div class="carousel-inner row w-100 mx-auto">
          {this.state.recs.map(function(rec) {
            return self.props.renderRec(rec);
          })}
        </div>
        <a class="carousel-control-prev" href="#recommendedCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#recommendedCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    )
  }
});

var SystemAndUserRecLists = React.createClass({
  getInitialState: function(props) {
    return {
      userID: "",
      user: localStorage.getItem('user')
    }
  },
  componentDidMount: function() {
    var self = this;
    $.ajax({
      url: 'http://' + window.location.hostname + ':8080' + "/api/user/info/" + self.state.user
    }).then(function(data) {
      self.setState({userID: data.id});
    })
  },
  renderSystemRec: function(id) {
    return <RecCard id={id} key={id}/>;
  },
  renderUserRec: function (rec) {
    /*$.ajax({
      url: 'http://' + window.location.hostname + ':8080' + "/api/user/get/username/" + rec.recFromUserId
    }).then(function(data) {
      var text = "Recommended by " + data;
      return <RecCard id={rec.imdbmovieId} key={rec.imdbmovieId} text={text}/>
    });*/
    var text = "Recommended by " + rec.recFromUserId;
    return <RecCard id={rec.imdbmovieId} key={rec.imdbmovieId} text={text}/>
  },
  render: function() {
    if (!this.state.userID) {
      return <p>Loading...</p>;
    }
    var userRecURL = "/api/recommendation/" + this.state.userID + "/select";
    var systemRecURL = "/api/system/recommendations/" + this.state.user
    return (
      <div class="container-fluid">
        <RecList url={systemRecURL} renderRec={this.renderSystemRec} title="We think you'll like..."/>
        <RecList url={userRecURL} renderRec={this.renderUserRec} title="Your friends think you'll like..."/>
      </div>
    )
  }
});

ReactDOM.render(
    <SystemAndUserRecLists/>, document.getElementById('rec-lists')
);
