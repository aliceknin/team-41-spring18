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
    if (this.state.user) {
      var self = this;
      $.ajax({
        url: 'http://' + window.location.hostname + ':8080' + "/api/user/info/" + self.state.user
      }).then(function(data) {
        self.setState({userID: data.id});
      })
    }
  },
  renderSystemRec: function(id) {
    return <RecCard id={id} key={id}/>;
  },
  renderUserRec: function (rec) {
    var text = "Recommended by " + rec.recFromUserId;
    /*$.ajax({
      url: 'http://' + window.location.hostname + ':8080' + "/api/user/get/username/" + rec.recFromUserId
    }).then(function(data) {
      var text = "Recommended by " + data;
    });*/
    return <RecCard id={rec.imdbmovieId} key={rec.imdbmovieId} text={text}/>
  },
  render: function() {
    if (!this.state.user) {
      return (
        <div className="container text-center">
          <h1>Like movies?</h1>
          <h4>Join us to start receiving recommendations based on your taste! Make friends, read reviews, blah blah blah</h4>
          <a href="createUser.html" className="btn btn-primary btn-lg">SIGN UP</a>
          <h4>Already have an account?</h4>
          <a href="login.html" className="btn btn-default btn-lg">Log In</a>
        </div>
      )
    }
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

var Explore = React.createClass({
  getInitialState: function() {
    return {
      searchInput: '',
      movieResults: [],
      userResults: []
    };
  },
  updateSearchInput: function(evt) {
    this.setState({
      searchInput: evt.target.value
    });
  },
  search: function() {
    var self = this;
    $.ajax({
      url: 'http://www.omdbapi.com/?apikey=55cab600&page=1&s=' + this.state.searchInput
    }).then(function(data) {
      var results = [];
      var movies = data.Search;
      var length = movies.length < 5 ? movies.length : 5;
      for (var i = 0; i < length; i++) {
        results.push({
          text: movies[i].Title + ' (' + movies[i].Year + ')',
          href: 'movie.html?id=' + movies[i].imdbID
        });
      }
      self.setState({ movieResults: results });
    });
    $.ajax({
      url: 'http://' + window.location.hostname + ':8080/api/user/select/' + this.state.searchInput
    }).then(function(data) {
      var results = [];
      var length = data.length < 5 ? data.length : 5;
      for (var i = 0; i < length; i++) {
        results.push({
          text: data[i],
          href: 'profile.html?username=' + data[i]
        });
      }
      self.setState({ userResults: results });
    });
  },
  handleKeyPress: function(evt) {
    if (evt.key === 'Enter') {
      this.search();
      $('.dropdown-toggle').dropdown('toggle');
    }
  },
  render: function() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search"
            value={this.state.searchInput} onChange={this.updateSearchInput}
            onKeyPress={this.handleKeyPress}/>
        <div className="input-group-btn dropdown">
          <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="search" onClick={this.search}><span className="glyphicon glyphicon-search"></span></button>
          <ul className="dropdown-menu">
            <li className="dropdown-item">Movies:</li>
            {this.state.movieResults.map(function(result, index) {
              return <li className="dropdown-item" key={index}><a href={result.href}>{result.text}</a></li>;
            })}
            <li className="dropdown-item">Users:</li>
            {this.state.userResults.map(function(result, index) {
              return <li className="dropdown-item" key={index}><a href={result.href}>{result.text}</a></li>;
            })}
          </ul>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
    <SystemAndUserRecLists/>, document.getElementById('rec-lists')
);
