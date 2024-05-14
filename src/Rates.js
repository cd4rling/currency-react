import React from 'react';
import CurrencyDropdown from './Currency';
import { json, checkStatus } from './utils';

class Rates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      rates: [],
      error: null,
      base: 'USD'
    };
  }

  componentDidMount() {
    this.fetchData(this.state.base);
  }

  fetchData(base) {
    fetch(`https://api.frankfurter.app/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        this.setState({ data: data, rates: data.rates })
        console.log(data.base);
        console.log(data.rates);
      })
      .catch((error) => {
        this.setState({ error: error.message });
      })
  }

  handleBaseChange = (newBase) => {
    this.setState({ base: newBase }, () => {
      this.fetchData(newBase);
    });
  }

  render() {
    const { data, rates, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!data) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Currency Rates</h1>
          <CurrencyDropdown onBaseChange={this.handleBaseChange} />
          <h2>Conversion Rates: For 1 {data.base}</h2>
          <ul>
            {Object.keys(rates).map(currency => (
              <li key={currency}>
                {currency}: {rates[currency]}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Rates;
