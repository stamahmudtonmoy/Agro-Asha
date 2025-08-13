# AgroAsha - E-commerce REST API

A full-stack e-commerce application built with Node.js, Express, MongoDB, and React.

## Features

- User authentication (register/login)
- JWT-based authorization
- MongoDB database with Mongoose ODM
- React frontend with React Router
- Responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Frontend
- React
- React Router
- Bootstrap
- React Hot Toast

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## API Documentation

The API documentation is generated using JSDoc. To generate docs:

```bash
npm run docs
```

## Testing

Run tests with Jest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
├── controllers/     # Route controllers
├── models/         # Database models
├── helpers/        # Utility functions
├── middlewares/    # Express middlewares
├── routes/         # API routes
├── client/         # React frontend
└── __tests__/      # Test files
```

## License

MIT
