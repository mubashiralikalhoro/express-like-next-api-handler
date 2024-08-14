# Express-Like Next.js API Handler

**ExpressLikeNextApiHandler** is a lightweight (1.3KB) utility that brings Express-like syntax to Next.js API routes. This tool makes it easy to handle requests, manage middleware, and create clean and organized API routes, just like in Express.js.

## Features

- **Lightweight**: Just 1.3KB in size.
- **Express-like Syntax**: Use familiar methods like `get`, `post`, `put`, and `delete`.
- **Middleware Support**: Easily add middleware functions to your API routes.
- **Middleware Flow Control**: If middleware returns `false`, the request processing will stop immediately.

## Installation

To install the package, run:

```bash
npm install express-like-next-api-handler
```

## Usage

Here’s how you can use the `ExpressLikeNextApiHandler` in your Next.js API routes:

### 1. Basic Setup

Create a new API route in your Next.js project (e.g., `pages/api/example.ts`):

```typescript
// pages/api/example.ts

import ExpressLikeNextApiHandler from "express-like-next-api-handler";

const { handler, app } = ExpressLikeNextApiHandler();

app.get((req, res) => {
  res.status(200).json({ message: "GET request handled!" });
});

app.post((req, res) => {
  res.status(200).json({ message: "POST request handled!" });
});

export default handler;
```

### 2. Adding Middleware

You can add middleware functions using the `use` method. If a middleware function returns `false`, it will stop the execution of further middleware and request handlers:

```typescript
// pages/api/example.ts

import ExpressLikeNextApiHandler from "express-like-next-api-handler";

const { handler, app } = ExpressLikeNextApiHandler();

app.use((req, res) => {
  console.log("Middleware 1");
  // Continue to the next middleware/handler
});

app.use((req, res) => {
  console.log("Middleware 2");
  // Stop further execution if a condition is met
  if (someCondition) {
    res.status(403).json({ error: "Forbidden" });
    return false; // Stops further middleware and handler execution
  }
});

app.get((req, res) => {
  res.status(200).json({ message: "GET request after middleware!" });
});

export default handler;
```

### 3. Handling Different Request Methods

You can define handlers for different HTTP methods (`GET`, `POST`, `PUT`, `DELETE`):

```typescript
// pages/api/example.ts

import ExpressLikeNextApiHandler from "express-like-next-api-handler";

const { handler, app } = ExpressLikeNextApiHandler();

app.get((req, res) => {
  res.status(200).json({ message: "GET request!" });
});

app.post((req, res) => {
  res.status(200).json({ message: "POST request!" });
});

app.put((req, res) => {
  res.status(200).json({ message: "PUT request!" });
});

app.delete((req, res) => {
  res.status(200).json({ message: "DELETE request!" });
});

export default handler;
```

## API Reference

### `use(middleware: Middleware)`

- **Description**: Adds a middleware function to the API handler. If the middleware returns `false`, further execution stops.
- **Parameters**:
  - `middleware` (`(req: NextApiRequest, res: NextApiResponse) => void | Promise<void> | boolean | Promise<boolean>`): Middleware function.

### `get(handler: RequestHandler)`

- **Description**: Defines a handler for `GET` requests.
- **Parameters**:
  - `handler` (`(req: NextApiRequest, res: NextApiResponse) => void | Promise<void>`): Request handler function.

### `post(handler: RequestHandler)`

- **Description**: Defines a handler for `POST` requests.
- **Parameters**:
  - `handler` (`(req: NextApiRequest, res: NextApiResponse) => void | Promise<void>`): Request handler function.

### `put(handler: RequestHandler)`

- **Description**: Defines a handler for `PUT` requests.
- **Parameters**:
  - `handler` (`(req: NextApiRequest, res: NextApiResponse) => void | Promise<void>`): Request handler function.

### `delete(handler: RequestHandler)`

- **Description**: Defines a handler for `DELETE` requests.
- **Parameters**:
  - `handler` (`(req: NextApiRequest, res: NextApiResponse) => void | Promise<void>`): Request handler function.

## Contributing

If you encounter any issues or have suggestions for new features, feel free to create an issue or submit a pull request.

## License

This project is licensed under the MIT License.
