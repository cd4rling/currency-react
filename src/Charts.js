import React from 'react';

class Charts extends React.Component {
    constructor(props) {
      super(props);
      console.log('convert component constructed')
    }

    render () {
      console.log('convert component rendered')
      return (
        <div className='container'>
          <h3>Charts coming soon</h3>
          <h3>Please check back later</h3>
        </div>
      );
    }
  }


export default Charts;