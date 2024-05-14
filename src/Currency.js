import React from 'react';

class CurrencyDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: 'USD', // Default to USD
      currencies: [], // Array to store fetched currencies
    };
  }

  componentDidMount() {
    // Fetch currency options when the component mounts
    fetch('https://api.frankfurter.app/currencies')
      .then(response => response.json())
      .then(data => {
        // Store fetched currencies in the component state
        this.setState({ currencies: Object.keys(data) });
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }

  handleChange = (event) => {
    const newBase = event.target.value;
    this.props.onBaseChange(newBase);
    this.setState({ selectedCurrency: newBase });
  }

  render() {
    const { selectedCurrency, currencies } = this.state;

    return (
      <div>
        <label htmlFor="currency">Choose a currency:</label>
        <select id="currency" value={selectedCurrency} onChange={this.handleChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default CurrencyDropdown;
