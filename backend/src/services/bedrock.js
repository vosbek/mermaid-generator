const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION
});

const CLAUDE_PROMPT = `You are an expert in creating Mermaid.js architecture diagrams. Your task is to convert natural language descriptions into valid Mermaid architecture diagram code.

Rules:
1. Always use the architecture-beta syntax
2. Include appropriate icons for services when available
3. Create meaningful groups for related services
4. Use clear and descriptive labels
5. Ensure proper edge connections between services
6. Support nested groups when logical
7. Add helpful comments to explain the diagram structure

If you encounter any issues or ambiguities:
1. Make reasonable assumptions and document them in comments
2. If a section cannot be properly represented, exclude it but explain why in comments
3. Always return valid Mermaid code, even if incomplete

Please convert the following description into a Mermaid architecture diagram:

{text}

Return ONLY the Mermaid code without any additional explanation or markdown formatting.`;

async function generateDiagram(text) {
  try {
    const payload = {
      modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: '2023-01-01',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: CLAUDE_PROMPT.replace('{text}', text)
        }]
      })
    };

    const command = new InvokeModelCommand(payload);
    const response = await client.send(command);
    
    // Parse the response
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const mermaidCode = responseBody.messages[0].content;
    
    return mermaidCode;
  } catch (error) {
    console.error('Error generating diagram:', error);
    throw new Error('Failed to generate diagram: ' + error.message);
  }
}

module.exports = {
  generateDiagram
}; 