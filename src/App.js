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
      products: []
    };
    this.products = this.state.products;
    this.search = this.search.bind(this);
  };
  componentWillMount() {
    this.firebaseRef = new Firebase("https://react-grocery-store.firebaseio.com/products");
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.products.push(dataSnapshot.val());
      this.setState({
        products: this.products
      });
    }.bind(this));
  };
  componentWillUnmount() {
    this.firebaseRef.off();
  };
  search(filter) {
    this.setState({
      filter: filter
    });
  };
  render() {
    var filter = this.state.filter;
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
                            return <StoreItem fbref={new Firebase(firebase + product.name)} key={i} product={product} />
                          }
                        }
                      }
                    }
                  }
                })
              }
            </div>
            <div id="cart">
              <Cart />
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));