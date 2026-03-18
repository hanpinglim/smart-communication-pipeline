# Smart Communication Pipeline

A mini TypeScript project that simulates a SmartCOMM-style customer communication pipeline.

## Features

- XML + XSD validation
- XML to business object mapping
- API-driven JSON input via mock Express service
- Shared communication generation layer
- HTML output generation for policy and claim communications
- Configurable template setup

## Architecture

XML/XSD -> Parser -> Models -> Template -> HTML Output  
API/JSON -> Models -> Template -> HTML Output

## Run the project

Install dependencies:

```bash
npm install

## Start the mock API in one terminal:
npx ts-node src/api/mockApi.ts

## Run the main application in another terminal:
npm start

## Output
## Generated files are saved in the output/ folder.