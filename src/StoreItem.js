import React from 'react';
import ReactDOM from 'react-dom';

export default class StoreItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.product.name,
      stock: props.product.stock,
      price: props.product.price
    }
    this.buy = this.buy.bind(this);
    this.fbref = this.props.fbref;
  }
  componentWillMount() {
    this.fbref.on("child_changed", function(dataSnapshot) {
      this.setState({
        [dataSnapshot.key()]: dataSnapshot.val()
      });
    }.bind(this));
  }
  componentWillUnmount() {
    this.props.fbref.off();
  }
  buy() {
    this.props.buy({
      name: this.state.name,
      price: this.state.price, 
      stock: this.state.stock
    }, this.fbref);
  }
  render() {
    var card = {
      float: 'left',
      width: '100%'
    }
    return(
      <div style={card}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              {this.state.name}
              <span className="label label-primary pull-right">{this.state.price}:-</span>
            </div>
          </div>
          <div className="panel-body">
            <strong>{this.state.stock}</strong> in stock
            <button className="btn btn-primary pull-right" 
              disabled={this.state.stock < 1} onClick={this.buy}>
              <span className="glyphicon glyphicon-plus-sign"></span> Add to cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}
StoreItem.propTypes = {
  product: React.PropTypes.object.isRequired,
  buy: React.PropTypes.func
}
StoreItem.defaultProps = {

}