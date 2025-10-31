import React from 'react';

const MultiSelectCounter = ({ selectedCount }) => {
  return (
    <div className="multi-select-counter">
      Selected Images: {selectedCount}
    </div>
  );
};

export default MultiSelectCounter;