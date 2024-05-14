import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

class Chart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        chart: null,
      }
    }
}

export default Chart;