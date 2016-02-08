import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }
  search(event) {
    event.preventDefault();
    // TODO Generalise
    this.props.search({
      name: ReactDOM.findDOMNode(this.refs.input0).value,
      minPrice: ReactDOM.findDOMNode(this.refs.input1min).value,
      maxPrice: ReactDOM.findDOMNode(this.refs.input1max).value,
      minStock: ReactDOM.findDOMNode(this.refs.input2min).value,
      maxStock: ReactDOM.findDOMNode(this.refs.input2max).value
    });
  }
  render() {
    var search = this.search;
    var title = {
      marginLeft: '-15px'
    }
    var form = {
      marginBottom: '8px'
    }
    var button = {
      marginRight: '-15px'
    }
    return(
      <div>
        <h3><span style={title} className="glyphicon glyphicon-search"></span> {this.props.title}</h3>
        <div>
          <form className="form-horizontal" action={this.props.action} method={this.props.method} acceptCharset="utf-8">
            {
              this.props.fields.map(function(field, i) {
                return (
                  <div key={i} className="form-group" style={form}>
                    <div className="input-group">
                      <span className="input-group-addon">{field.label}</span>
                      { (!field.min || !field.max) &&
                        <input className="form-control" onChange={search} ref={"input" + i} type={field.type}
                          name={field.name} placeholder={field.min} autoComplete="off" /> }
                      { field.min && field.max &&
                        <input className="form-control" onChange={search} ref={"input" + i + "min"} type={field.type}
                          name={field.name + (field.min ? "Min" : "")} placeholder={field.min} autoComplete="off" /> }
                      { field.min && field.max &&
                        <span className="input-group-addon">-</span> }
                      { field.min && field.max &&
                        <input className="form-control" onChange={search} ref={"input" + i + "max"} type={field.type}
                          name={field.name + (field.max ? "Max" : "")} placeholder={field.max} autoComplete="off" /> }
                      { field.unit &&
                        <span className="input-group-addon">{field.unit}</span> }
                    </div>
                  </div>
                )
              })
            }
            <button onClick={search} style={button} className="btn btn-primary pull-right">
              <span className="glyphicon glyphicon-search"></span> {this.props.value}
            </button>
          </form>
        </div>
      </div>
    )
  }
}
SearchForm.propTypes = {
  search: React.PropTypes.func.isRequired,
  fields: React.PropTypes.array,
  title: React.PropTypes.string,
  value: React.PropTypes.string
}
SearchForm.defaultProps = {
  title: "Search",
  value: "Search"
}