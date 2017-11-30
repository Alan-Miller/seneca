import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    debugger;
    axios.get('/api/products')
      .then(response => { console.log('response', response); this.setState({ products: response.data }) })
      .catch(err => console.log('ERROR:', err));
  }

  render() {
    return (
      <div className="App">
        DM products:
        {
          this.state.products ? (
            <div>
              {this.state.products.products.map((product, i) => (
                <div key={product.id}>
                  <div>{product.title}</div>
                  <div>${product.price}</div>
                </div>
              ))}
              Average price: ${this.state.products.average}
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default App;
