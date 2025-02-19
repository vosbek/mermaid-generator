import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'monospace'
});

function DiagramPreview({ diagram }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (diagram && containerRef.current) {
      const render = async () => {
        try {
          containerRef.current.innerHTML = '';
          const { svg } = await mermaid.render('diagram-preview', diagram.mermaidCode);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering diagram:', error);
          containerRef.current.innerHTML = `
            <div style="color: red; padding: 16px;">
              Failed to render diagram: ${error.message}
            </div>
          `;
        }
      };

      render();
    }
  }, [diagram]);

  return (
    <div className="diagram-preview">
      <div ref={containerRef} id="diagram-preview" style={{ padding: '16px' }} />
      
      {diagram && !diagram.success && (
        <div className="code-preview" style={{ marginTop: '16px' }}>
          <h3>Mermaid Code:</h3>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '16px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            <code>{diagram.mermaidCode}</code>
          </pre>
          
          {diagram.error && (
            <div style={{ marginTop: '16px' }}>
              <h4>Errors:</h4>
              <ul style={{ color: 'red' }}>
                {diagram.error.details.map((error, index) => (
                  <li key={index}>
                    Line {error.line}: {error.error}
                    <br />
                    <code>{error.content}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DiagramPreview; 