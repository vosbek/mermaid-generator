# Mermaid Architecture Generator

A tool that generates Mermaid.js architecture diagrams from natural language descriptions using AWS Bedrock with Claude.

## Features

- Natural language input to generate architecture diagrams
- Real-time diagram preview
- Export to Mermaid code and PNG
- Error handling with partial diagram display
- Powered by AWS Bedrock (Claude 3.5 Sonnet)

## Prerequisites

- Node.js (v16 or higher)
- AWS Account with Bedrock access
- AWS credentials configured locally

## Setup

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
```
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
PORT=3001
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