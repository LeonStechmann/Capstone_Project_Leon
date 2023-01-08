import connectDB from "../_db/connect-db";
import {Route} from "../_db/models/Route";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const routes = await Route.find();
        res.status(200).json(routes);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    case "POST":
      try {
        const newRoute = new Route({
          start: req.body.start,
          destination: req.body.destination,
          selected: req.body.selected,
          selectedDest: req.body.selectedDest,
          stops: req.body.stops,
          radius: req.body.radius,
          bars: req.body.bars,
        });
        await newRoute.save();
        res.status(200).json(newRoute);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;

    default:
      return res.status(400).json({error: "method not supported"});
  }
}

export default connectDB(handler);
