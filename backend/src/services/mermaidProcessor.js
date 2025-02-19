const { default: mermaid } = require('mermaid');

// Configure mermaid for Node.js environment
const config = {
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'default',
  flowchart: {
    htmlLabels: false
  }
};

async function processDiagram(mermaidCode) {
  try {
    // Basic syntax validation
    const lines = mermaidCode.split('\n');
    const validLines = [];
    const errorLines = [];
    
    // Validate the diagram starts with architecture-beta
    if (!lines[0].trim().startsWith('architecture-beta')) {
      throw new Error('Diagram must start with architecture-beta');
    }

    // Validate basic syntax rules
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      try {
        // Check for basic syntax rules
        if (line.startsWith('group')) {
          if (!line.includes('[') || !line.includes(']')) {
            throw new Error('Invalid group syntax - missing [] brackets');
          }
        } else if (line.startsWith('service')) {
          if (!line.includes('(') || !line.includes(')') || !line.includes('[') || !line.includes(']')) {
            throw new Error('Invalid service syntax - missing () or [] brackets');
          }
        } else if (line.includes('-->')) {
          if (!line.includes(':')) {
            throw new Error('Invalid connection syntax - missing direction (:)');
          }
        }
        
        validLines.push(line);
      } catch (e) {
        errorLines.push({
          line: i + 1,
          content: line,
          error: e.message
        });
      }
    }

    if (errorLines.length > 0) {
      return {
        success: false,
        mermaidCode: validLines.join('\n'),
        error: {
          message: 'Diagram contains syntax errors',
          details: errorLines
        }
      };
    }

    return {
      success: true,
      mermaidCode,
      error: null
    };
  } catch (error) {
    console.error('Error processing diagram:', error);
    return {
      success: false,
      mermaidCode: '',
      error: {
        message: error.message,
        details: [{
          line: 1,
          content: mermaidCode.split('\n')[0],
          error: error.message
        }]
      }
    };
  }
}

module.exports = {
  processDiagram
}; 