import { NextApiRequest, NextApiResponse } from "next";

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void> | boolean | Promise<boolean> | Promise<false | undefined>;

type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;

interface App {
  use: (middleware: Middleware) => void;
  get: (handler: RequestHandler) => void;
  post: (handler: RequestHandler) => void;
  put: (handler: RequestHandler) => void;
  delete: (handler: RequestHandler) => void;
}

interface ExpressLikeNextApiHandler {
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  app: App;
}

declare function ExpressLikeNextApiHandler(): ExpressLikeNextApiHandler;

export = ExpressLikeNextApiHandler;
