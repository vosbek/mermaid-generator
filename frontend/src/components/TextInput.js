import React from 'react';

function TextInput({ value, onChange, onSubmit, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
    }
  };

  return (
    <div className="text-input-container">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Describe your architecture here... (Press Ctrl+Enter to generate)"
        rows={10}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontFamily: 'monospace'
        }}
      />
      <button
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer',
          opacity: disabled || !value.trim() ? 0.7 : 1
        }}
      >
        Generate Diagram
      </button>
    </div>
  );
}

export default TextInput; 