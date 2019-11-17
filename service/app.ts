import * as express from "express";
import { ControllerLoader } from "../lib/Controller";
import * as Path from "path";
import { RequestHandler } from "express-serve-static-core";

@ControllerLoader({
  filePath: Path.join(__dirname, "./controllers"),
  validator: true
})
class App {
  private _express: express.Express;
  public routes: express.Router[] = [];

  get express() {
    return this._express;
  }

  constructor() {
    this._express = express();
  }

  public use(...args: Array<RequestHandler | express.ErrorRequestHandler>) {
    this._express.use(...args);
  }
}

const app = new App();

app.routes.forEach(router => {
  app.use(router);
});

app.use((err, req, res, next) => {
  res.json(err);
});

// app.express.listen(3000);

export default app.express;
