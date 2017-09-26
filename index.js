const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
var models = require('./models')
var ObjectId = require('mongodb').ObjectId

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(express.static('public'));

app.get('/api/shoes', function(req, res, next) {
  models.Stock.find({}, function(err, results) {
    if (err) {
      return next(err);
    } else {
      res.json(results)
    }
  })
})
// GET	/api/shoes/brand/:brandname
app.get('/api/shoes/brand/:brandname', function(req, res, next) {
  var brandname = req.params.brandname;
  // console.log('hhh');
  // console.log(brandname);
  models.Stock.find({
    brand: brandname
  }, function(err, shoeBrand) {
    if (err) {
      return next(err)
    } else {
      res.json(shoeBrand)
    }

  })
});
// GET	/api/shoes/size/:size
app.get('/api/shoes/size/:size', function(req, res, next) {
  var size = req.params.size;
  models.Stock.find({
    size: size
  }, function(err, shoesize) {
    if (err) {
      return next(err)
    } else {
      res.json(shoesize)
    }
  })
});
// GET	/api/shoes/brand/:brandname/size/:size
app.get('/api/shoes/brand/:brandname/size/:size', function(req, res, next) {
  var brandname = req.params.brandname;
  var size = req.params.size;
  models.Stock.find({
    brand: brandname,
    size: size
  }, function(err, shoedetails) {
    if (err) {
      return next(err)
    } else {
      res.json(shoedetails)
    }
  })
})



app.post('/api/shoes', function(req, res, next) {

  models.Stock.create({
    color: req.body.color,
    brand: req.body.brand,
    price: req.body.price,
    size: req.body.size,
    in_stock: req.body.in_stock
  }, function(err, results) {
    if (err) {
      return next(err);
    } else {
      res.send(results)
    }
  })
});


// POST	/api/shoes/sold/:id
app.post('/api/shoes/sold/:id', function(req, res, next) {
      var id = req.params.id;
      models.Stock.findOneAndUpdate({
          _id: ObjectId(id)
        }, {
          $inc: {
            "in_stock" : - 1
          }
          },
          {
            upsert: false
          },
          function(err, results) {
            if (err) {
              return res.json({
                status: "error",
                error: err,
                results: []
              })
            } else {
              res.json({
                status: "successful",
                results: results
              })
            }
          })
      })














    var port = 3003; app.listen(process.env.PORT || port, function() {
      console.log('app is now listening :' + port);
    });
