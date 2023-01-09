import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  selected: {
    type: Object,
    required: ["lat", "lng"],
    properties: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  selectedDest: {
    type: Object,
    required: ["lat", "lng"],
    properties: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  stops: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
    required: true,
  },
  bars: {
    type: Array,
    required: true,
    items: {
      type: String,
    },
  },
});

export const Route =
  mongoose.models.Route || mongoose.model("Route", RouteSchema, "routes");
