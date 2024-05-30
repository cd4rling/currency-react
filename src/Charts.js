import React from 'react';
import CurrencyDropdown from './Currency';
import { json, checkStatus } from './utils';
import Chart from 'chart.js/auto';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      rates: {},
      error: null,
      base1: 'USD',
      base2: 'EUR',
      endDate: new Date().toISOString().split('T')[0],
      startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      debounceTimeout: null,
      dropdownKey: 0,
    };

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const base1 = queryParams.get('base1') || this.state.base1;
    const base2 = queryParams.get('base2') || this.state.base2;
    const { startDate, endDate } = this.state;

    this.setState({ base1, base2 }, () => {
      this.fetchData(base1, base2, startDate, endDate);
    });
  }

  fetchData(base1, base2, startDate, endDate) {
    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base1}&to=${base2}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = chartLabels.map((date) => data.rates[date][base2]);
        const chartLabel = `${base1}/${base2}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch((error) => this.setState({ error: error.message }));
  }

  buildChart = (labels, data, label) => {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Exchange Rate',
            },
          },
        },
      },
    });
  };

  handleBaseChange1 = (newBase) => {
    this.setState({ base1: newBase }, () => {
      const { base2, startDate, endDate } = this.state;
      this.fetchData(newBase, base2, startDate, endDate);
    });
  };

  handleBaseChange2 = (newBase) => {
    this.setState({ base2: newBase }, () => {
      const { base1, startDate, endDate } = this.state;
      this.fetchData(base1, newBase, startDate, endDate);
    });
  };

  render() {
    const { error, base1, base2 } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className='rateContainer'>
        <h3 className='text-center'>Historical Currency Data</h3>
        <canvas ref={this.chartRef} />

        <div className='row my-5 py-2'>
          <div className='col-lg-5 d-flex justify-content-center align-items-center'>
            <h4>From: </h4>
            <CurrencyDropdown onBaseChange={this.handleBaseChange1} defaultValue={base1} />
          </div>
          <div className='col-lg-5 d-flex justify-content-center align-items-center'>
            <h4>To: </h4>
            <CurrencyDropdown onBaseChange={this.handleBaseChange2} defaultValue={base2} />
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
