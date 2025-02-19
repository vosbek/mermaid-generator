import React from 'react';
import { exportAsPNG } from '../services/api';

function ExportButtons({ diagram }) {
  const handleExportMermaid = () => {
    const blob = new Blob([diagram.mermaidCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.mmd';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPNG = async () => {
    try {
      const pngUrl = await exportAsPNG(diagram.mermaidCode);
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'diagram.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export PNG:', error);
      alert('Failed to export as PNG: ' + error.message);
    }
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <button
        onClick={handleExportMermaid}
        style={{
          marginRight: '8px',
          padding: '8px 16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Export Mermaid Code
      </button>
      
      <button
        onClick={handleExportPNG}
        style={{
          padding: '8px 16px',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Export as PNG
      </button>
    </div>
  );
}

export default ExportButtons; 