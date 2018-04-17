var Login = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      error: '',
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
  login: function() {
    self = this;
    if (this.state.username && this.state.password) {
      $.ajax({
        url: 'http://' + window.location.hostname + ':8080/api/user/verify/' + this.state.username + '/'
          + this.state.password
      }).done(function(result) {
        if (result) {
          localStorage.setItem('user', self.state.username);
          window.location.replace('http://' + window.location.hostname + ':8080/index.html');
        } else {
          self.setState({error: 'Invalid credentials, please try again.'});
        }
      }).fail(function(reuslt) {
        self.setState({error: 'Failed to login, please try again.'});
      });
    }
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <img src="https://github.ccs.neu.edu/CS4500/team-41-spring18/blob/master/logos/Logo_1.png?raw=true"
                  height="300" width="300"/>
          </div>
          <div className="col-sm-7">
            <div className="form-horizontal">
              <h2>Login</h2>
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
                <div className="col-sm-offset-2 col-sm-10">
                  <button className="btn btn-default" onClick={this.login}>Submit</button>
                </div>
              </div>
              <div style={{textAlign: "center"}}>
                <h4 style={{color: "red"}}>{this.state.error}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Login/>, document.getElementById('login')
);
