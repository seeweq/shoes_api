var mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/shoesapi"
mongoose.connect(mongoURL, {
  useMongoClient: true
});
exports.Stock = mongoose.model('stock', {

     brand: String,
     color: String,
     price: Number,
     size: Number,
     in_stock: Number

});
