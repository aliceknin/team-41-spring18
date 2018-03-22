var CreateUser = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      fullname: '',
      email: '',
    };
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
  createUser: function() {
    self = this;
    if (this.state.username && this.state.password && this.state.fullname && this.state.email) {
      $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/user/create/' + this.state.username + '/'
          + this.state.password + '/' + this.state.email + '/' + this.state.fullname
      }).done(function(result) {
        localStorage.setItem('user', self.state.username);
        window.location.replace('http://' + window.location.hostname + ':8080/accountCreated.html');
      }).fail(function(reuslt) {
        // TODO: show error message since user creation wasn't successful
      });
    }
  },
  render: function() {
    return (
      <div className="container">
        <div className="form-horizontal" style={{padding: 40}}>
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
      </div>
    );
  }
});

ReactDOM.render(
  <CreateUser/>, document.getElementById('createUser')
);