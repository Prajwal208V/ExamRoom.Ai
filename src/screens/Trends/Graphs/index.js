import React from 'react';
import CryptoGraph from './CryptoGraph';
import ForexGraph from './ForexGraph';
import StackGraph from './StackGraph';

const MarketGraph = props => {
  switch (props.type) {
    case 'Cryptocurrency':
      return <CryptoGraph {...props} />;
    case 'Forex':
      return <ForexGraph {...props} />;
    default:
      return <StackGraph {...props} />;
  }
};

export default MarketGraph;
