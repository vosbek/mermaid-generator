const { BedrockAgentRuntimeClient, InvokeAgentCommand } = require('@aws-sdk/client-bedrock-agent-runtime');

const client = new BedrockAgentRuntimeClient({
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
      agentId: process.env.BEDROCK_AGENT_ID,
      agentAliasId: 'LATEST',
      sessionId: Date.now().toString(),
      inputText: text
    };

    const command = new InvokeAgentCommand(payload);
    const response = await client.send(command);
    
    // Extract the Mermaid code from the agent's response
    const completion = response.completion;
    
    // The agent's response will be formatted with the Mermaid code
    // and potentially additional explanations. We need to extract just the code.
    const mermaidCode = extractMermaidCode(completion);
    
    return mermaidCode;
  } catch (error) {
    console.error('Error generating diagram:', error);
    throw new Error('Failed to generate diagram: ' + error.message);
  }
}

function extractMermaidCode(completion) {
  // Look for Mermaid code block in the response
  const mermaidMatch = completion.match(/```mermaid\n([\s\S]*?)```/);
  if (mermaidMatch && mermaidMatch[1]) {
    return mermaidMatch[1].trim();
  }
  
  // If no code block found, assume the entire response is Mermaid code
  // after removing any potential markdown formatting
  return completion.replace(/```/g, '').trim();
}

module.exports = {
  generateDiagram
}; 