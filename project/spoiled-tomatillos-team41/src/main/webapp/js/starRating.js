function Star(props) {
  var star = (value) ? "glyphicon glyphicon-star" : "glyphicon glyphicon-star-empty";
  return (
    <button onClick={props.onClick} onMouseOver={props.onMouseOver}>
      <span className={star}/>
    </button>
  );
}

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars : Array(10).fill(false),
    };
  }

  fillAllStarsUpTo(i) {
    const stars = this.state.stars.slice();
    for (var curr = 0; curr <= i; curr++) {
      stars[curr] = true;
    }
    this.setState({stars : stars});
  }

  handleMouseOver(i) {
    this.fillAllStarsUpTo(i);
  }

  handleClick(i) {
    // TODO: check if user is logged in
    // TODO: ask if they want to submit this rating, maybe if they want to write a review
    this.fillAllStarsUpTo(i);
  }

  renderStar(i) {
    return (
      <Star
        value={this.state.stars[i]}
        onClick={()->this.handleClick(i)}
        onMouseOver={()->this.handleMouseOver(i)}
      />
    );
  }

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
}

var Star = React.createClass({
  render: function() {
    var star = (value) ? "glyphicon glyphicon-star" : "glyphicon glyphicon-star-empty";
    return (
      <button onClick={this.props.onClick} onMouseOver={this.props.onMouseOver}>
        <span className={star}/>
      </button>
    );
  }
})

var StarRating = React.createClass({
  getInitialState: function(props) {
    return  {stars : Array(10).fill(false)};
  },

  fillAllStarsUpTo: function(i) {
    const stars = this.state.stars.slice();
    for (var curr = 0; curr <= i; curr++) {
      stars[curr] = true;
    }
    this.setState({stars : stars});
  },

  handleMouseOver: function(i) {
    this.fillAllStarsUpTo(i);
  },

  handleClick: function(i) {
    // TODO: check if user is logged in
    // TODO: ask if they want to submit this rating, maybe if they want to write a review
    this.fillAllStarsUpTo(i);
  },

  renderStar: function(i) {
    return (
      <Star
        value={this.state.stars[i]}
        onClick={()->this.handleClick(i)}
        onMouseOver={()->this.handleMouseOver(i)}
      />
    );
  },

  render: function() {
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
})
