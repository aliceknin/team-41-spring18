var Profile = React.createClass({
  render: function() {
    return(
      <div style={{padding: 50}}>
        <h1> {localStorage.getItem('user')} </h1>

      </div>
    );
  }
});

ReactDOM.render(
  <Profile/>, document.getElementById('profile')
);