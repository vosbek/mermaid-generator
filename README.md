# Mermaid Architecture Generator

A tool that generates Mermaid.js architecture diagrams from natural language descriptions using AWS Bedrock with Claude. Simply describe your system architecture in plain English, and get a professionally formatted Mermaid.js diagram.

## Features

- Natural language input to generate architecture diagrams
- Real-time diagram preview
- Export to Mermaid code and PNG
- Error handling with partial diagram display
- Powered by AWS Bedrock (Claude 3.5 Sonnet)
- Support for nested groups and rich iconography

## Prerequisites

- Node.js (v16 or higher)
- AWS Account with Bedrock access
- AWS credentials configured locally

## AWS Bedrock Configuration

### 1. Initial Setup

1. **AWS Account Setup**:
   - Sign up for an AWS account if you don't have one
   - Go to the AWS Management Console
   - Ensure you have billing set up (required for Bedrock)

2. **Create IAM Role and User**:
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": [
                   "bedrock:*",
                   "bedrock:InvokeModel",
                   "bedrock:InvokeModelWithResponseStream",
                   "bedrock:CreateKnowledgeBase",
                   "bedrock:CreateDataSource",
                   "bedrock:AssociateKnowledgeBaseWithAgent"
               ],
               "Resource": "*"
           }
       ]
   }
   ```

### 2. Enable Bedrock Models

1. Go to the [AWS Bedrock Console](https://console.aws.amazon.com/bedrock)
2. Navigate to "Model access"
3. Click "Manage model access"
4. Enable the following models:
   - Anthropic / Claude 3 Sonnet
   - Anthropic / Claude Instant
5. Click "Save changes"
6. Wait for access to be granted (usually immediate)

### 3. Create Knowledge Base

1. In the Bedrock Console, go to "Knowledge bases"
2. Click "Create knowledge base"
3. Configure the Knowledge Base:
   ```
   Name: MermaidArchitectureKB
   Description: Knowledge base for architecture diagram generation
   Vector store: Amazon OpenSearch Serverless (recommended)
   Data sources: Upload the following files in /knowledge_base directory:
   - mermaid_architecture_patterns.md
   - mermaid_icons_reference.md
   - architecture_best_practices.md
   ```

### 4. Configure Bedrock Agent

1. Go to "Agents" in Bedrock Console
2. Click "Create agent"
3. Configure the agent:
   ```
   Name: MermaidDiagramAgent
   Description: Agent for generating architecture diagrams
   Model: Claude 3 Sonnet
   Knowledge base: MermaidArchitectureKB
   ```

4. Add the following instruction set:
   ```
   You are an expert in creating Mermaid.js architecture diagrams.
   Follow these steps for each request:
   1. Analyze the natural language description
   2. Identify key components and relationships
   3. Apply appropriate architectural patterns
   4. Generate valid Mermaid architecture-beta code
   5. Include proper icons and groupings
   6. Validate the generated diagram
   ```

### 5. Environment Configuration

Create a `.env` file in the backend directory:
```env
AWS_REGION=your-region           # e.g., us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
BEDROCK_AGENT_ID=your-agent-id   # From step 4
BEDROCK_KB_ID=your-kb-id        # From step 3
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

### 6. Verify Setup

1. Test Knowledge Base:
   - Go to Knowledge base in Bedrock Console
   - Click on your knowledge base
   - Use the "Ask a question" feature
   - Try: "What are the common architecture patterns?"

2. Test Agent:
   - Go to Agents in Bedrock Console
   - Click on your agent
   - Use the "Test" tab
   - Try: "Create a simple web architecture with load balancer"

3. Test API Access:
   ```bash
   # Using AWS CLI
   aws bedrock-agent invoke-agent \
     --agent-id your-agent-id \
     --session-id test-session \
     --input-text "Create a simple web architecture"
   ```

## Application Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd mermaid-generator
```

2. Install dependencies:
```bash
npm run install:all
```

3. Create a `.env` file in the backend directory:
```env
AWS_REGION=your-region           # e.g., us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

4. Start the development servers:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

## Usage

1. Enter your architecture requirements in natural language in the text area
2. Wait for the diagram to be generated
3. View the generated diagram and any error messages
4. Export the diagram as needed

## Project Structure

```
mermaid-generator/
├── frontend/           # React frontend
│   └── src/
│       ├── components/ # React components
│       └── services/   # API and rendering services
└── backend/           # Node.js backend
    └── src/
        ├── routes/    # API routes
        └── services/  # Business logic and AWS integration
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Knowledge Base Content Structure

```
knowledge_base/
├── mermaid_architecture_patterns.md    # Common architecture patterns
├── mermaid_icons_reference.md         # Available icons and usage
└── architecture_best_practices.md     # Best practices and guidelines
```

## Troubleshooting Bedrock Setup

1. **Model Access Issues**:
   - Verify model access status in Bedrock Console
   - Check IAM permissions
   - Ensure billing is set up

2. **Knowledge Base Issues**:
   - Verify OpenSearch Serverless is properly configured
   - Check data source format and content
   - Review ingestion status

3. **Agent Issues**:
   - Check agent logs in CloudWatch
   - Verify knowledge base association
   - Test with simple queries first 