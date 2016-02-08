import React from 'react';
import ReactDOM from 'react-dom';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
  }
  checkout() {
    let button = ReactDOM.findDOMNode(this.refs.button);
    let checkout = this.props.checkout;
    let className = button.className;
    let text = button.innerHTML;
    button.disabled = true; 
    button.innerHTML = "Checking out...";
    setTimeout(function() {
      button.innerHTML = text;
      checkout();
    }, 2000);
  }
  render() {
    var total = 0;
    var card = {
      float: 'left',
      width: '100%'
    }
    return(
      <div>
        <h3><span className="glyphicon glyphicon-shopping-cart"></span> Cart</h3>
        <div style={card}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="panel-title">
                Total
                {
                  this.props.products.map(function(product) {
                    total += product.price * product.amount;
                  })
                }
                <span className="label label-primary pull-right">{total}:-</span>
              </div>
            </div>
            <div className="panel-body">
              {
                this.props.products.map(function(product, i) {
                  return (
                    <div key={i}>
                      <strong>{product.amount} {product.name + (product.name.slice(-1) != "s" && product.amount > 1 ? "s" : "")}</strong>
                      <span className="label label-primary pull-right">{product.amount * product.price}:-</span>
                    </div>
                  )
                })
              }
              { !this.props.products.length &&
                <span>No items in your cart</span> }
              <p></p>
              <button onClick={this.checkout} ref="button"
                className="btn btn-success pull-right" disabled={!this.props.products.length}>
                <span className="glyphicon glyphicon-ok-sign"></span> Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Cart.propTypes = {
  products: React.PropTypes.array.isRequired,
  checkout: React.PropTypes.func.isRequired
}