const mongoose = require("mongoose");

const mongConnect = async function (stock) {
  mongoose.connect(`mongodb://localhost:27017/${stock}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    poolSize: 10,
  });
};

module.exports = mongConnect;

stock.map((stock) => )