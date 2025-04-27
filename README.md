# React Assessment

A modern React application built with TypeScript, Vite, and TailwindCSS.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-assessment
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

### Development

To start the development server:
```bash
npm run dev
```
This will start the Vite development server at `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

### Testing

The project uses Jest and React Testing Library for unit testing, and Cypress for end-to-end testing.

#### Unit Tests

Run unit tests:
```bash
npm test
```

Run unit tests in watch mode:
```bash
npm run test:watch
```

Generate test coverage report:
```bash
npm run test:coverage
```

#### End-to-End Tests (Cypress)

To run Cypress tests:
```bash
npx cypress run
```

To open Cypress Test Runner:
```bash
npx cypress open
```

### Linting

To run ESLint:
```bash
npm run lint
```

## Project Structure

- `src/` - Source code
- `test/` - Unit tests
- `cypress/` - End-to-end tests
- `public/` - Static assets

## Technologies Used

- React 19
- TypeScript
- Vite
- TailwindCSS
- Jest
- Cypress
- ESLint
- Axios
- React Router
- Moment.js
- Lucide React (for icons)


