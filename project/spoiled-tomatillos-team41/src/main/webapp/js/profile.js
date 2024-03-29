var Profile = React.createClass({
  getInitialState: function () {
    return {
      currentUser: '',
      fullName: '',
      userID: '',
      bio: '',
      loggedInUser: localStorage.getItem('user'),
      loggedInUserID: '',
      reviews: [],
      followers: [],
      following: [],
      joined: '',
      showModal: false,
      modalType: '',
    };
  },
  componentDidMount: function () {
    const user = this.getUsernameFromUrl();
    this.setState({currentUser : user});
    this.loadUserData(user);
    this.hideElement("bioForm");
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
  loadUserData: function(username) {
    var self = this;
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/user/info/' + username
    }).then(function (data) {
        self.setState({
          fullName: data.fullName,
          userID: data.id,
          bio: data.bio,
          joined: new Date(data.joined).toLocaleDateString()
        });
        self.loadLoggedInData(data.id)
        self.loadReviews(username);
        self.loadFollowers(data.id);
        self.loadFollowing(data.id);
    });
  },
  loadReviews: function(username) {
    var self = this;
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/review/select/user/' + username
    }).then(function(data) {
        self.setState({reviews: data});
    });
  },
  loadFollowers: function(id) {
    var self = this;
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/friend/select/followers/' + id
    }).then(function (data) {
        self.setState({followers: data});
    });
  },
  loadFollowing: function(id) {
    var self = this;
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/friend/select/following/' + id
    }).then(function (data) {
        self.setState({following: data});
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
      this.hideElement("editProfile");
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
        url: 'http://' + window.location.hostname + ':8080/api/friend/select/following/' + myID
      }).then(function (data) {
        if (data.includes(profileID)) {
          self.hideElement("addFriend");
        }
        else {
          self.hideElement("removeFriend");
        }
      });
  },
  edit: function() {
    if (this.state.bio == null) {
      document.getElementById("bioInput").value = "Write your bio here!";
    }
    else {
      document.getElementById("bioInput").value = this.state.bio;
    }
    this.showElement("bioForm");
    this.hideElement("bioDisplay");
  },
  saveEdit: function() {
    var newBio = document.getElementById("bioInput").value;
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/user/edit/bio/' + this.state.loggedInUser + "/" + newBio
      });
    this.setState({bio: newBio});
    this.hideElement("bioForm");
    this.showElement("bioDisplay");
  },
  handleFriendsClick: function(type) {
    this.setState({showModal: true, modalType: type});
  },
  friendsModalHandler: function () {
    var self = this;
    return {
      handleShowModal : function () {
        self.setState({showModal : true});
      },
      handleHideModal : function () {
        self.setState({showModal : false});
      },
    }
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
        </div>
        <br />
        <div className="row">
          <div className="col-sm-3">
            {/*left col*/}
            <ul className="list-group">
              <li className="list-group-item text-muted">Profile</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className>Joined</strong></span> {this.state.joined}</li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className>Real name</strong></span>{this.state.fullName}</li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x" />
              </li>
              <li className="list-group-item text-right"><span className="pull-left"><strong className>Reviews</strong></span>{this.state.reviews.length}</li>
              <li className="list-group-item text-right" onClick={()=>this.handleFriendsClick('Followers')} style={{'cursor': 'pointer'}}>
                <span className="pull-left"><strong className>Followers</strong></span>{this.state.followers.length}
              </li>
              <li className="list-group-item text-right" onClick={()=>this.handleFriendsClick('Following')} style={{'cursor': 'pointer'}}>
                <span className="pull-left"><strong className>Following</strong></span>{this.state.following.length}
              </li>
            </ul>
          </div>
          {/*/col-3*/}
          <div className="col-sm-9">
            <div className="panel panel-default">
              <div id='bio' className="panel-heading">Bio
              <button className="btn btn-primary pull-right btn-xs" type='button' id='editProfile' onClick={this.edit}><span className="glyphicon glyphicon-edit" /> Edit</button>
              </div>
              <div className="panel-body" id="bioDisplay">{this.state.bio}</div>
              <div className="panel-body" id="bioForm">
                <form>
                  <input id="bioInput" type="text" name="profile bio" />
                  <input id="bioSubmit" type="button" value="Submit" onClick={this.saveEdit} />
                </form>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Reviews</div>
              <div className="panel-body">
                {this.state.reviews.map(function(reviewData) {
                    return <Review key={reviewData.id} data={reviewData}/>;
                })}
              </div>
            </div>
          </div>
        </div>
        {this.state.showModal ?
            <FriendsModal modalHandler={this.friendsModalHandler()}
                          type={this.state.modalType}
                          data={this.state.modalType == 'Followers' ? this.state.followers : this.state.following}/>
            : null}
      </div>
    );
  }
});

var Review = React.createClass({
  getInitialState: function() {
    return {title: '', poster: ''};
  },
  componentDidMount: function() {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=55cab600&i=' + this.props.data.imdbID,
        success: function(movieData) {
          this.setState({title: String(movieData.Title), poster: String(movieData.Poster)});
        }.bind(this)
    });
  },
  render: function() {
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <img src={this.state.poster} alt={this.state.title} style={{width: '100%'}} />
        </div>
        <div className='col-sm-9'>
          <h2><a href={'movie.html?id=' + this.props.data.imdbID}>{this.state.title}</a></h2>
          <StarRating rating={this.props.data.rating}/>
          <p>{this.props.data.comment}</p>
        </div>
      </div>
    );
  }
});

var Star = React.createClass({
  render: function() {
    var star = (this.props.value) ? "glyphicon glyphicon-star" : "glyphicon glyphicon-star-empty";
    return (
        <span style={{fontSize: '30px'}} className={star}/>
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
  renderStar: function(i) {
    return (
      <Star
        value={this.state.stars[i]}
      />
    );
  },
  render() {
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

var FriendsModal = React.createClass({
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
                <h4 className="modal-title">{this.props.type}: </h4>
              </div>
              <div className="modal-body">
                <ul style={{'list-style-type': 'none'}}>
                  {this.props.data.map(function(id, index) {
                    return <User id={id} key={index}/>;
                  })}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      )
    },
});

var User = React.createClass({
  getInitialState: function() {
      return {username: ''};
  },
  componentDidMount: function() {
    $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/user/get/username/' + this.props.id,
        success: function(username) {
          this.setState({username: username});
        }.bind(this)
    });
  },
  render: function() {
    var style = {
      'text-decoration': 'none',
      'fontSize': '20px'
    }
    return (
      <li><a href={'profile.html?username=' + this.state.username} style={style}>{this.state.username}</a></li>
    )
  }
});

ReactDOM.render(
  <Profile/>, document.getElementById('profile')
);
