import React from 'react';

class CurrencyDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: props.defaultValue || 'USD',
      currencies: [],
    };
  }

  componentDidMount() {
    fetch('https://api.frankfurter.app/currencies')
      .then(response => response.json())
      .then(data => {
        this.setState({ currencies: Object.keys(data) });
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.defaultValue !== prevProps.defaultValue) {
      this.setState({ selectedCurrency: this.props.defaultValue });
    }
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
