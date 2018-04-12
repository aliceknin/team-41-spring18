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
      <div className="carousel-item col-md-2">
        <div className="card">
          <img className="card-img-top img-fluid" src={this.state.movieData.Poster} height="300"/>
          <div className="card-body">
            <h4 className="card-title"><a href={'movie.html?id=' + this.props.id}>{this.state.movieData.Title}</a></h4>
            <p className="card-text">{this.props.text}</p>
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
      <div id="recommendedCarousel" className="carousel slide" data-ride="carousel">
        <h1>{this.props.title}</h1>
        <div className="carousel-inner row w-100 mx-auto">
          {this.state.recs.map(function(rec) {
            return self.props.renderRec(rec);
          })}
        </div>
        <a className="carousel-control-prev" href="#recommendedCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#recommendedCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
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
      <div className="container-fluid">
        <RecList url={systemRecURL} renderRec={this.renderSystemRec} title="We think you'll like..."/>
        <RecList url={userRecURL} renderRec={this.renderUserRec} title="Your friends think you'll like..."/>
      </div>
    )
  }
});

ReactDOM.render(
    <SystemAndUserRecLists/>, document.getElementById('rec-lists')
);
