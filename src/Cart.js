import React from 'react';
import ReactDOM from 'react-dom';

export default class Cart extends React.Component {
  render() {
    var card = {
      float: 'left',
      width: '100%'
    };
    var button = {
      outline: 'none'
    }
    return(
      <div>
        <h3><span className="glyphicon glyphicon-shopping-cart"></span> Cart</h3>
        <div style={card}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="panel-title">
                Title
                <span className="label label-primary pull-right">Total</span>
              </div>
            </div>
            <div className="panel-body">
              <p>Items</p>
              <button style={button} className="btn btn-primary pull-right" disabled={true}>
                <span className="glyphicon glyphicon-ok-sign"></span> Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}