import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function generateDiagram(text) {
  try {
    const response = await axios.post(`${API_BASE_URL}/diagram/generate`, { text });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to generate diagram');
    }
    throw new Error('Network error: Failed to connect to the server');
  }
}

export async function exportAsPNG(mermaidCode) {
  try {
    const svg = document.querySelector('#diagram-preview svg');
    if (!svg) {
      throw new Error('No diagram found to export');
    }

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Create a new image
    const img = new Image();
    
    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image to canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        // Convert to PNG
        const pngUrl = canvas.toDataURL('image/png');
        
        // Cleanup
        URL.revokeObjectURL(url);
        
        resolve(pngUrl);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to convert diagram to PNG'));
      };
      
      img.src = url;
    });
  } catch (error) {
    throw new Error('Failed to export diagram: ' + error.message);
  }
} 