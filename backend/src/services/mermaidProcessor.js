const mermaid = require('mermaid');

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'default'
});

async function processDiagram(mermaidCode) {
  try {
    // Try to parse the Mermaid code
    await mermaid.parse(mermaidCode);
    
    return {
      success: true,
      mermaidCode,
      error: null
    };
  } catch (error) {
    console.error('Error processing diagram:', error);
    
    // Try to extract valid parts of the diagram
    const lines = mermaidCode.split('\n');
    const validLines = [];
    const errorLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      try {
        const partialDiagram = lines.slice(0, i + 1).join('\n');
        await mermaid.parse(partialDiagram);
        validLines.push(lines[i]);
      } catch (e) {
        errorLines.push({
          line: i + 1,
          content: lines[i],
          error: e.message
        });
      }
    }
    
    return {
      success: false,
      mermaidCode: validLines.join('\n'),
      error: {
        message: error.message,
        details: errorLines
      }
    };
  }
}

module.exports = {
  processDiagram
}; 