import connectDB from "../_db/connect-db";
import {Route} from "../_db/models/Route";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const route = await Route.findById(req.query.routeId);
        if (route) {
          return res.status(200).json(route);
        } else {
          return res.status(404).json({error: "route not found"});
        }
      } catch (error) {
        return res.status(500).json({error: error.message});
      }

    case "DELETE":
      try {
        const route = await Route.findByIdAndDelete(req.query.routeId);
        if (route) {
          return res.status(200).json(route);
        } else {
          return res.status(404).json({error: "route not found"});
        }
      } catch (error) {
        return res.status(500).json({error: error.message});
      }
    default:
      return res.status(400).json({error: "method not supported"});
  }
}

export default connectDB(handler);
