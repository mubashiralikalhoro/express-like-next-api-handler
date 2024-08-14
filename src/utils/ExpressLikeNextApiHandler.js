///  <reference path="../types/express-like-next-api-handler.d.ts" />
const RequestMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const ExpressLikeNextApiHandler = () => {
  const middlewares = [];

  const funs = {
    delete(req, res) {},
    get(req, res) {},
    post(req, res) {},
    put(req, res) {},
  };

  // this is a init file if no method is declared
  const app = {
    use(newMiddleware) {
      middlewares.push(newMiddleware);
    },
    get(handler) {
      funs.get = handler;
    },
    post(handler) {
      funs.post = handler;
    },
    put(handler) {
      funs.put = handler;
    },
    delete(handler) {
      funs.delete = handler;
    },
  };

  const internalHandler = async (req, res) => {
    // running middlewares
    for (let i = 0; i < middlewares.length; i++) {
      const r = await middlewares[i](req, res);
      //   @ts-ignore
      if (r === false) {
        return;
      }
    }

    // running method
    if (req.method === RequestMethods.GET && funs.get) {
      funs.get(req, res);
    }
    if (req.method === RequestMethods.PUT && funs.put) {
      funs.put(req, res);
    }
    if (req.method === RequestMethods.POST && funs.post) {
      funs.post(req, res);
    }
    if (req.method === RequestMethods.DELETE && funs.delete) {
      funs.delete(req, res);
    }
  };

  // this will return as default from the api page
  const handler = async (req, res) => {
    try {
      await internalHandler(req, res);
    } catch (e) {
      res.status(500).json({ error: e?.message || "Something went wrong!" });
    }
  };

  return { handler, app };
};

module.exports = ExpressLikeNextApiHandler;
