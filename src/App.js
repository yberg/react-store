import React from 'react';
import ReactDOM from 'react-dom';
import StoreItem from './StoreItem';
import SearchForm from './SearchForm';
import Cart from './Cart';
import ReactCSSTransitionGroup from 'react-addons-transition-group';

var fields =
[
  {
    label: "Product",
    type: "text",
    name: "product"
  },
  {
    label: "Price",
    type: "text",
    name: "price",
    min: "From",
    max: "To",
    unit: "kr"
  },
  {
    label: "Stock",
    type: "text",
    name: "stock",
    min: "From",
    max: "To",
    unit: "st"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      products: [], 
      cart: []
    }
    this.products = this.state.products;
    this.cart = this.state.cart;
    this.search = this.search.bind(this);
    this.buy = this.buy.bind(this);
    this.checkout = this.checkout.bind(this);
  }
  componentWillMount() {
    this.firebaseRef = new Firebase("https://react-grocery-store.firebaseio.com/products");
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.products.push(dataSnapshot.val());
      this.setState({
        products: this.products
      });
    }.bind(this));
  }
  componentWillUnmount() {
    this.firebaseRef.off();
  }
  search(filter) {
    this.setState({
      filter: filter
    });
  }
  buy(product, fbref) {
    let found = false;
    this.cart.map(function(cartItem) {
      if (cartItem.name === product.name) {
        cartItem.amount = cartItem.amount + 1;
        found = true;
      }
    });
    if (!found) {
      this.cart.push({
        name: product.name,
        price: product.price,
        amount: 1
      });
    }
    this.setState({
      cart: this.cart
    });
    fbref.update({
      stock: product.stock - 1
    });
  }
  checkout() {
    this.cart = [];
    this.setState({
      cart: []
    });
  }
  render() {
    var filter = this.state.filter;
    var buy = this.buy;
    var firebase = "https://react-grocery-store.firebaseio.com/products/";
    return(
      <div>
        <ReactCSSTransitionGroup transitionName="animation">
          <div id="main">
            <div id="form">
              <SearchForm search={this.search} title="Search products" fields={fields} value="Search" />
            </div>
            <div id="results">
              <h3><span className="glyphicon glyphicon-ok"></span> Results</h3>
              {
                this.state.products.map(function(product, i) {
                  if (filter.name === undefined || product.name.toLowerCase().replace(/ /g,'').indexOf(filter.name.toLowerCase().replace(/ /g,'')) !== -1) {
                    if (filter.minPrice === undefined || filter.minPrice <= product.price) {
                      if ((filter.maxPrice === "" || filter.maxPrice === undefined) || filter.maxPrice >= product.price) {
                        if (filter.minStock === undefined || filter.minStock <= product.stock) {
                          if ((filter.maxStock === "" || filter.maxStock === undefined) || filter.maxStock >= product.stock) {
                            return <StoreItem buy={buy} fbref={new Firebase(firebase + product.name)} 
                              key={i} product={product} />
                          }
                        }
                      }
                    }
                  }
                })
              }
            </div>
            <div id="cart">
              <Cart products={this.state.cart} checkout={this.checkout} />
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));