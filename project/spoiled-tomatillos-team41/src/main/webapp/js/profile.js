var Profile = React.createClass({
  getInitialState: function () {
    return {
      currentUser: '',
      fullName: '',
      userID: '',
      loggedInUser: localStorage.getItem('user'),
      loggedInUserID: '',
      following: ''
    };
  },
  componentDidMount: function () {
    const user = this.getUsernameFromUrl();
    this.setState({currentUser : user});
    this.loadUserData(user);
  },
  getUsernameFromUrl: function() {
      var queryString = window.location.search.slice(1);
      var array = queryString.split('&');
      for (var i = 0; i < array.length; i++) {
          var pair = array[i].split('=');
          if (pair[0] === 'username') {
              var username = pair[1];
              return username;
          }
      }
  },
  loadUserData: function(id) {
    var self = this;
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/user/info/' + id
    }).then(function (data) {
        self.setState({fullName: data.fullName});
        self.setState({userID: data.id});
        self.loadLoggedInData(data.id)
    });
  },
  follow: function() {
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/friend/add/' + this.state.loggedInUserID + '/' + this.state.userID
    });
    this.hideElement("addFriend");
    this.showElement("removeFriend");
  },
  unfollow: function() {
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/friend/delete/' + this.state.loggedInUserID + '/' + this.state.userID
    });
    this.hideElement("removeFriend");
    this.showElement("addFriend");
  },
  loadLoggedInData: function(profileID) {
    var self = this;
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/user/info/' + this.state.loggedInUser
    }).then(function (data) {
        self.setState({loggedInUserID: data.id});
        self.followControls(profileID, data.id)
    });
  },
  followControls: function (profileID, myID) {
    if (myID == profileID) {
      this.hideElement("addFriend");
      this.hideElement("removeFriend");
    }
    else {
      this.alreadyFollowing(profileID, myID);
    }
  },
  hideElement: function(elementID) {
    var x = document.getElementById(elementID);
    x.style.display="none";
  },
  showElement: function(elementID) {
    var x = document.getElementById(elementID);
    x.style.display="block";
  },
  alreadyFollowing: function(profileID, myID) {
    var following = false;
    var self = this;
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/friend/select/' + myID
      }).then(function (data) {
        if (data.includes(profileID)) {
          self.hideElement("addFriend");
        }
        else {
          self.hideElement("removeFriend");
        }
      });
  },
  render: function() {
    return(
      <div className="container target">
        <div className="row">
          <div className="col-sm-10">
            <h1 className>{this.state.currentUser}</h1>
            <div>
              <button className="btn btn-default" type='button' id='addFriend' onClick={this.follow}>Follow</button>
              <button className="btn btn-default" type='button' id='removeFriend' onClick={this.unfollow}>Unfollow</button>
            </div>
            <br />
          </div>
          <div className="col-sm-2"><a href="/users" className="pull-right"><img title="profile image" className="img-circle img-responsive" src /></a>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-3">
            {/*left col*/}
            <ul className="list-group">
              <li className="list-group-item text-muted">Profile</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className>Joined</strong></span> ?????</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className>Last seen</strong></span> ?????</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className>Real name</strong></span>{this.state.fullName}</li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x" />
              </li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className>Reviews</strong></span> ???</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className>Friends</strong></span> ???</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className>Shelves</strong></span> ???</li>
            </ul>
          </div>
          {/*/col-3*/}
          <div className="col-sm-9">
            <div className="panel panel-default">
              <div className="panel-heading">Bio</div>
              <div className="panel-body"> stuff
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Shelves</div>
              <div className="panel-body">
                <div id="recommendedCarousel" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner row w-100 mx-auto">
                    <div className="carousel-item col-md-2 active">
                      <div className="card">
                        <img className="card-img-top img-fluid" src="http://placehold.it/200x300/f44242/fff" alt="Card image cap" />
                        <div className="card-body">
                          <h4 className="card-title">Title of Movie</h4>
                          <p className="card-text">maybe a description or something, possibly a snippet of the plot or actors or critic reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item col-md-2">
                      <div className="card">
                        <img className="card-img-top img-fluid" src="http://placehold.it/200x300/418cf4/fff" alt="Card image cap" />
                        <div className="card-body">
                          <h4 className="card-title">Title of Movie</h4>
                          <p className="card-text">maybe a description or something, possibly a snippet of the plot or actors or critic reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item col-md-2">
                      <div className="card">
                        <img className="card-img-top img-fluid" src="http://placehold.it/200x300/3ed846/fff" alt="Card image cap" />
                        <div className="card-body">
                          <h4 className="card-title">Title of Movie</h4>
                          <p className="card-text">maybe a description or something, possibly a snippet of the plot or actors or critic reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item col-md-2">
                      <div className="card">
                        <img className="card-img-top img-fluid" src="http://placehold.it/200x300/42ebf4/fff" alt="Card image cap" />
                        <div className="card-body">
                          <h4 className="card-title">Title of Movie</h4>
                          <p className="card-text">maybe a description or something, possibly a snippet of the plot or actors or critic reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item col-md-2">
                      <div className="card">
                        <img className="card-img-top img-fluid" src="http://placehold.it/200x300/f49b41/fff" alt="Card image cap" />
                        <div className="card-body">
                          <h4 className="card-title">Title of Movie</h4>
                          <p className="card-text">maybe a description or something, possibly a snippet of the plot or actors or critic reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item col-md-2">
                      <div className="card">
                        <img className="card-img-top img-fluid" src="http://placehold.it/200x300/f4f141/fff" alt="Card image cap" />
                        <div className="card-body">
                          <h4 className="card-title">Title of Movie</h4>
                          <p className="card-text">maybe a description or something, possibly a snippet of the plot or actors or critic reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item col-md-2">
                      <div className="card">
                        <img className="card-img-top img-fluid" src="http://placehold.it/200x300/8e41f4/fff" alt="Card image cap" />
                        <div className="card-body">
                          <h4 className="card-title">Title of Movie</h4>
                          <p className="card-text">maybe a description or something, possibly a snippet of the plot or actors or critic reviews</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#recommendedCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#recommendedCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Reviews</div>
              <div className="panel-body"> reviews here
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Profile/>, document.getElementById('profile')
);
