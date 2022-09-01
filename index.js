require("dotenv").config();

const { connect, Schema, model, Types } = require("mongoose");
const { createServer } = require("http");
// Connet to MongoDB
connect(process.env.MONGO_URI, function (err) {
  if (err) {
    console.error("Error connecting to MongoDB");
    console.error(err);
    process.exit(1);
  } else {
    console.log("Connected to MongoDB");
  }
});
// Create schemas
const MxnUsd = new Schema({
  mxn: { type: Number, required: true },
  usd: { type: Number, required: true },
});

const MxnJyp = new Schema({
  mxn: { type: Number, required: true },
  jyp: { type: Number, required: true },
});

const MxnBrl = new Schema({
  mxn: { type: Number, required: true },
  brl: { type: Number, required: true },
});

// Create models
const MxnUsdModel = model("MxnUsd", MxnUsd);
const MxnJypModel = model("MxnJyp", MxnJyp);
const MxnBrlModel = model("MxnBrl", MxnBrl);

// adding values to DB
// var mxntousd = new MxnUsdModel({ mxn: 1, usd: 0.049 }).save();
// var mxntojyp = new MxnJypModel({ mxn: 1, jyp: 7 }).save();
// var mxntobrl = new MxnBrlModel({ mxn: 1, brl: 0.26 }).save();

// Create server
const server = createServer(function (request, response) {
  if (request.url === "/mxn-usd") {
    MxnUsdModel.find(function (err, docs) {
      if (err) {
        console.error(err);
        response.write("Error");
        response.end();
      } else {
        response.write(JSON.stringify(docs));
        response.end();
      }
    });
  } else if (request.url === "/mxn-jyp") {
    MxnJypModel.find(function (err, docs) {
      if (err) {
        console.error(err);
        response.write("Error");
        response.end();
      } else {
        response.write(JSON.stringify(docs));
        response.end();
      }
    });
  } else if (request.url === "/mxn-brl") {
    MxnBrlModel.find(function (err, docs) {
      if (err) {
        console.error(err);
        response.write("Error");
        response.end();
      } else {
        response.write(JSON.stringify(docs));
        response.end();
      }
    });
  }
});
// Listen
server.listen(process.env.PORT || 8080, function () {
  console.log("Server listening on port 8080");
});
