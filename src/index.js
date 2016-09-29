import React from 'react';
import ReactDOM from 'react-dom';
import ComparisonWidget from './comparison/ComparisonWidget';

[].forEach.call(document.querySelectorAll('.tw-comparison'), elem => {
    ReactDOM.render(
      <ComparisonWidget
        source={elem.getAttribute('data-source')}
        target={elem.getAttribute('data-target')}
        filter={elem.getAttribute('data-filter') || null}/>,
      elem
    );
  }
);
