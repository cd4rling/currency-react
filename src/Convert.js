import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

class Convert extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        convert: null,
      }
    }
}

export default Convert;