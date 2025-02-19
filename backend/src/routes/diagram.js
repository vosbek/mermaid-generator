const express = require('express');
const router = express.Router();
const bedrockService = require('../services/bedrock');
const mermaidProcessor = require('../services/mermaidProcessor');

router.post('/generate', async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    // Generate Mermaid diagram code using Bedrock
    const mermaidCode = await bedrockService.generateDiagram(text);
    
    // Validate and process the Mermaid code
    const result = await mermaidProcessor.processDiagram(mermaidCode);
    
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 