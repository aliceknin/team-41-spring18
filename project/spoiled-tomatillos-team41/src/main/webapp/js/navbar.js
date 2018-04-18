var NavBar = React.createClass({
  getInitialState: function() {
    return {
      searchInput: '',
      movieResults: [],
      userResults: [],
      user: localStorage.getItem('user')
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
  logout: function() {
    this.setState({user: null});
    localStorage.removeItem('user');
  },
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="index.html"><p>
              <img src="../images/Logo_2.png"
                    width="40" height="40" /></p>
            </a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <div className="navbar-form navbar-left">
              <div className="dropdown">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search"
                      value={this.state.searchInput} onChange={this.updateSearchInput}
                      onKeyPress={this.handleKeyPress} />
                </div>
                <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="search" onClick={this.search}><span className="glyphicon glyphicon-search" />Search</button>
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
            <ul className="nav navbar-nav navbar-right">
              <li><a href="index.html"><span className="glyphicon glyphicon-search" /> Explore</a></li>
              {
                this.state.user ? (
                  [
                    <li key='0'><a href={'profile.html?username=' + this.state.user}><span className="glyphicon glyphicon-user" /> {this.state.user}</a></li>,
                    <li key='1'><a href="#" onClick={this.logout}><span className="glyphicon glyphicon-log-out" /> Logout</a></li>
                  ]
                ) : (
                  [
                    <li key='0'><a href="createUser.html"><span className="glyphicon glyphicon-user" /> Sign Up</a></li>,
                    <li key='1'><a href="login.html"><span className="glyphicon glyphicon-log-in" /> Login</a></li>
                  ]
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

ReactDOM.render(
  <NavBar/>, document.getElementById('navbar')
);
