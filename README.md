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

1. **AWS Account Setup**:
   - Sign up for an AWS account if you don't have one
   - Go to the AWS Management Console
   - Ensure you have billing set up (required for Bedrock)

2. **Enable AWS Bedrock**:
   - Go to the [AWS Bedrock Console](https://console.aws.amazon.com/bedrock)
   - Click on "Model access" in the left sidebar
   - Click "Manage model access"
   - Find "Anthropic - Claude 3 Sonnet" in the model list
   - Check the box next to it
   - Click "Save changes"
   - Wait for access to be granted (usually immediate)

3. **Create IAM User and Policy**:
   ```bash
   # Create this policy in IAM
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": [
                   "bedrock:InvokeModel",
                   "bedrock:InvokeModelWithResponseStream"
               ],
               "Resource": "arn:aws:bedrock:*:*:model/anthropic.claude-3-sonnet*"
           }
       ]
   }
   ```
   - Go to IAM in AWS Console
   - Create a new user or select existing one
   - Attach the above policy
   - Create access keys and save them securely

4. **Configure AWS Credentials**:
   - Option 1: Using AWS CLI
     ```bash
     aws configure
     # Enter your AWS Access Key ID
     # Enter your AWS Secret Access Key
     # Enter your default region (e.g., us-east-1)
     ```
   - Option 2: Environment Variables
     ```bash
     export AWS_ACCESS_KEY_ID=your_access_key
     export AWS_SECRET_ACCESS_KEY=your_secret_key
     export AWS_REGION=your_region
     ```
   - Option 3: Using .env file (recommended for development)
     ```env
     AWS_REGION=your-region           # e.g., us-east-1
     AWS_ACCESS_KEY_ID=your-access-key
     AWS_SECRET_ACCESS_KEY=your-secret-key
     ```

5. **Verify Bedrock Access**:
   - Go to AWS Bedrock Console
   - Click "Playground" in the left sidebar
   - Select "Claude 3 Sonnet"
   - Try sending a test message
   - If you get a response, your setup is correct

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