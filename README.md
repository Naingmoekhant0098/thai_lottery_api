# Production-Level Node.js API

A production-ready Node.js API built with Express and TypeScript, following industry best practices with a modular folder structure.

## Project Structure

```
src/
├── config/              # Application configuration (env, database, etc.)
├── modules/             # Feature-based modules (organized by domain)
│   ├── health/
│   │   ├── health.controller.ts
│   │   └── health.route.ts
│   └── index.ts         # Module router aggregator
├── middlewares/         # Global middleware (error handling, validation, etc.)
├── utils/               # Shared utilities (logger, response helpers, etc.)
├── app.ts              # Express app configuration
└── server.ts           # Server entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```
PORT=3000
NODE_ENV=development
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
```

### Development

```bash
npm run dev
```

The server will start at `http://localhost:3000` with hot-reload enabled.

### Production Build

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Check TypeScript compilation

## API Endpoints

### Health Check
- `GET /api/health` - Check server health status

## Adding New Modules

1. Create a new folder in `src/modules/[moduleName]`
2. Create the following files:
   - `[moduleName].controller.ts` - Route handlers
   - `[moduleName].service.ts` - Business logic
   - `[moduleName].repository.ts` - Data access (if needed)
   - `[moduleName].route.ts` - Route definitions

3. Export the router in `src/modules/[moduleName]/index.ts`
4. Import and use in `src/modules/index.ts`

Example:

```typescript
// src/modules/user/user.controller.ts
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userService.getAllUsers();
  sendResponse(res, 200, 'Users fetched successfully', users);
};

// src/modules/user/user.route.ts
const router = Router();
router.get('/', getUsers);
export default router;

// src/modules/index.ts
import userRoutes from './user/user.route';
router.use('/users', userRoutes);
```

## Error Handling

All errors are caught and formatted consistently using the `errorMiddleware`. Errors should follow this interface:

```typescript
interface CustomError extends Error {
  statusCode?: number;
  message: string;
}
```

## Logging

The application uses Pino for logging with pretty-printing in development mode.

```typescript
import logger from '@utils/logger';

logger.info('This is an info message');
logger.error('This is an error message');
logger.debug('This is a debug message');
```

## License

ISC
