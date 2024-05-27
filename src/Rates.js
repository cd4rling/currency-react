import React from 'react';
import CurrencyDropdown from './Currency';
import { json, checkStatus } from './utils';
import { Link } from 'react-router-dom';

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
    const { data, rates, error, base } = this.state;
    const rateArray = Object.entries(rates);
  
    const column1 = rateArray.slice(0, 15); // First 15 items
    const column2 = rateArray.slice(15);
   
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!data) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='rateContainer'>
          <h3 className='text-center'>Currency Rates</h3>
          <div className='d-flex justify-content-center align-items-center'>
            <CurrencyDropdown onBaseChange={this.handleBaseChange} />
          </div>
          <h3 className='text-center'>Conversion Rates: For 1 {data.base}</h3>
          <div className='row'>
            <div className='col-lg-6 d-flex justify-content-center align-items-center'>
              <ul className=''>
                {Object.values(column1).map(([currency, rate]) => (
                  <li key={currency}>
                    <span className='spanLeft'><Link to={`/convert?base1=${base}&base2=${currency}`}>{currency}</Link></span><span className='spanCenter'>:</span><span className='spanRight'>{rate}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='col-lg-6 d-flex justify-content-center align-items-center'>
              <ul className=''>
                {Object.values(column2).map(([currency, rate]) => (
                  <li key={currency}>
                    <span className='spanLeft'><Link to={`/convert?base1=${base}&base2=${currency}`}>{currency}</Link></span><span className='spanCenter'>:</span><span className='spanRight'>{rate}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Rates;
