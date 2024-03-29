var CreateUser = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      fullname: '',
      email: '',
    };
  },
  componentDidMount: function () {
     this.hideElement("fail");
  },
  updateUsername: function(evt) {
    this.setState({
      username: evt.target.value
    });
  },
  updatePassword: function(evt) {
    this.setState({
      password: evt.target.value
    });
  },
  updateFullname: function(evt) {
    this.setState({
      fullname: evt.target.value
    });
  },
  updateEmail: function(evt) {
    this.setState({
      email: evt.target.value
    });
  },
  hideElement: function(elementID) {
          var x = document.getElementById(elementID);
          x.style.display="none";
  },
  showElement: function(elementID) {
          var x = document.getElementById(elementID);
          x.style.display="block";
  },
  createUser: function() {
    self = this;
    if (this.state.username && this.state.password && this.state.fullname && this.state.email) {
      $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/user/create/' + this.state.username + '/'
          + this.state.password + '/' + this.state.email + '/' + this.state.fullname,
        type: 'PUT',
        success: function(result) {
            localStorage.setItem('user', self.state.username);
            window.location.replace('http://' + window.location.hostname + ':8080/accountCreated.html');
        },
        error: function(result) {
          window.location.replace('http://' + window.location.hostname + ':8080/accountCreationError.html');
        }
      });
    }
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
                    <img src="../images/Logo_1.png"
                          height="300" width="300"/>
          </div>
          <div className="col-sm-8">
            <div className="form-horizontal">
              <h2>Create a new user</h2>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Username:</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={this.updateUsername} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="pwd" placeholder="Enter password" onChange={this.updatePassword} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Full name:</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="fullname" placeholder="Enter full name" onChange={this.updateFullname} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                <div className="col-sm-10">
                  <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={this.updateEmail} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button className="btn btn-default" onClick={this.createUser}>Submit</button>
                </div>
              </div>
            </div>
            <div className="alert alert-danger alert-dismissible" id="fail">
                          <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                          <strong>A new user could not be created. </strong>Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <CreateUser/>, document.getElementById('createUser')
);
