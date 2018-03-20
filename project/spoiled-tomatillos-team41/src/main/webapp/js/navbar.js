var NavBar = React.createClass({
  getInitialState: function() {
    return {
      searchInput: '',
      searchResults: []
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
      self.setState({ searchResults: results });
    });
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
            <a className="navbar-brand" href="index.html">Spoiled Tomatillos</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <div className="navbar-form navbar-left">
              <div className="dropdown">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" value={this.state.searchInput} onChange={this.updateSearchInput} />
                </div>
                <button className="btn btn-default" data-toggle="dropdown" id="search" onClick={this.search}>Submit</button>
                <ul className="dropdown-menu">
                  {this.state.searchResults.map(function(result, index) {
                    return <li className="dropdown-item" key={index}><a href={result.href}>{result.text}</a></li>;
                  })}
                </ul>
              </div>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="explore.html"><span className="glyphicon glyphicon-search" /> Explore</a></li>
              <li><a href="createUser.html"><span className="glyphicon glyphicon-user" /> Sign Up</a></li>
              <li><a href="#"><span className="glyphicon glyphicon-log-in" /> Login</a></li>
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