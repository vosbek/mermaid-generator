import React from 'react';
import { ClipLoader } from 'react-spinners';

function LoadingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px'
      }}
    >
      <ClipLoader color="#007bff" size={50} />
      <span style={{ marginLeft: '16px' }}>Generating diagram...</span>
    </div>
  );
}

export default LoadingIndicator; 