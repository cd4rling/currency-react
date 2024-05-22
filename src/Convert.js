import React from 'react';
import CurrencyDropdown from './Currency';
import { json, checkStatus } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

class Convert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      rates: {},
      error: null,
      base1: 'USD',
      base2: 'EUR',
      value1: 1.00,
      value2: null,
      debounceTimeout: null,
      dropdownKey: 0
    };
  }

  componentDidMount() {
    this.fetchData(this.state.base1);
  }

  fetchData(base) {
    fetch(`https://api.frankfurter.app/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        this.setState({ data: data, rates: data.rates }, this.calculateValue2);
      })
      .catch((error) => {
        this.setState({ error: error.message });
      })
  }

  formatToTwoDecimalPlaces(value) {
    return parseFloat(value).toFixed(2);
  }

  calculateValue2 = () => {
    const { rates, value1, base2 } = this.state;
    const rateForBase2 = rates[base2];

    if (rateForBase2) {
      const value2 = value1 * rateForBase2;
      this.setState({ value2: value2.toFixed(2) });
    } else {
      this.setState({ value2: null });
    }
  }

  handleValueChange1 = (event) => {
    const { debounceTimeout } = this.state;
    const newValue1 = event.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      const parsedValue = parseFloat(newValue1).toFixed(2);
      this.setState({ value1: isNaN(parsedValue) ? '' : parsedValue }, this.calculateValue2);
    }, 500);

    this.setState({ value1: newValue1, debounceTimeout: newTimeout });
  }


  handleBaseChange1 = (newBase) => {
    this.setState({ base1: newBase }, () => {
      this.fetchData(newBase);
    });
  }

  handleBaseChange2 = (newBase) => {
    this.setState({ base2: newBase }, this.calculateValue2);
  }

  swapBases = () => {
    this.setState((prevState) => ({
      base1: prevState.base2,
      base2: prevState.base1,
      dropdownKey: prevState.dropdownKey + 1 // Update the key to force remount
    }), () => {
      this.fetchData(this.state.base1);
    });
  }

  render() {
    const { data, error, base1, value1, base2, value2 } = this.state;
   
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!data) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='rateContainer'>
          <h3 className='text-center'>Currency Conversion</h3>
          <div className='row my-5 py-2'>
            <div className='col-lg-5 d-flex justify-content-center align-items-center'>
            <h4>From: </h4><CurrencyDropdown onBaseChange={this.handleBaseChange1} defaultValue={base1} />
            </div>
            <div className='col-lg-2 d-flex justify-content-center align-items-center'><FontAwesomeIcon icon={faRotate} onClick={this.swapBases} style={{ cursor: 'pointer' }} /></div>
            <div className='col-lg-5 d-flex justify-content-center align-items-center'>
            <h4>To: </h4><CurrencyDropdown onBaseChange={this.handleBaseChange2} defaultValue={base2} />
            </div>
          </div>
          <div className='row my-5 py-2'>
            <div className='col-lg-5 d-flex justify-content-center align-items-center'>
            <h4> 
                <input 
                  type="number" 
                  value={value1} 
                  onChange={this.handleValueChange1}
                  className='inputField' 
                />
                {base1}
              </h4>
            </div>
            <div className='col-lg-2 d-flex justify-content-center align-items-center'>
              <h4>is</h4>
            </div>
            <div className='col-lg-5 d-flex justify-content-center align-items-center'>
            <h4>{value2 !== null ? value2 : 'N/A'} {base2}</h4>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Convert;
