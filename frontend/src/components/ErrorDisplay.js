import React from 'react';

function ErrorDisplay({ error }) {
  if (!error) return null;

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#ffebee',
        color: '#c62828',
        borderRadius: '4px',
        marginBottom: '16px',
        border: '1px solid #ef9a9a'
      }}
    >
      <strong>Error:</strong> {error}
    </div>
  );
}

export default ErrorDisplay; 