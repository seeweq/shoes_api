const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
var models = require('./models')
var ObjectId = require('mongodb').ObjectId



app.use(function(req, res, next) {
     res.header('Access-Control-Allow-Origin', "*");
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
     res.header('Access-Control-Allow-Headers','"Origin,X-Requested-With, Content-Type, Accepet"')
     next();
});

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
      res.json({results})
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
      res.json({shoeBrand})
    }

  })
});
// GET	/api/shoes/size/:size
app.get('/api/shoes/size/:size', function(req, res, next) {
  var size = req.params.size;
  models.Stock.find({
    size: size
  }, function(err, shoeSize) {
    if (err) {
      return next(err)
    } else {
      res.json({shoeSize})
    }
  })
});
// GET	/api/shoes/brand/:brandname/size/:size
app.get('/api/shoes/brand/:brandname/size/:size/color/:color', function(req, res, next) {
  var brandname = req.params.brandname;
  var size = req.params.size;
  var color = req.param.color;
    models.Stock.find({
    brand: brandname,
    size: size,
    color:color
  }, function(err, shoeDetails) {
    if (err) {
      return next(err)
    } else {
      res.json({shoeDetails})
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
      res.json(results)
    }
  })
});


// POST	/api/shoes/sold/:id
app.post('/api/shoes/sold/:id', function(req, res, next) {
      console.log(req.params.id);
      var id = req.params.id;
      models.Stock.findOneAndUpdate({
          _id: ObjectId(id)
        }, {
          $inc: {
            "in_stock" : - 1
          }
          },
          {
            upsert: false,
            new:true
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
      });

      // app.post('/api/shoes/brand', function(req, res, next) {
      //
      //   models.Stock.find({},{
      //     color: 0,
      //     brand: 1,
      //     price: 0,
      //     size:0,
      //     in_stock: 0
      //   }, function(err, brands) {
      //     if (err) {
      //       return next(err);
      //     } else {
      //       res.json({brands})
      //     }
      //   })
      // });

    var port = 3003; app.listen(process.env.PORT || port, function() {
      console.log('app is now listening :' + port);
    });
