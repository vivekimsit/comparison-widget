import React from 'react';
import ReactDOM from 'react-dom';
import ComparisonWidget from './comparison/ComparisonWidget';

[].forEach.call(document.querySelectorAll('.tw-comparison'), elem => {
    ReactDOM.render(
      <ComparisonWidget
        source={elem.getAttribute('data-source')}
        target={elem.getAttribute('data-target')}
        amount={elem.getAttribute('data-amount') || 500}
        providers={elem.getAttribute('data-providers') || null}/>,
      elem
    );
  }
);
