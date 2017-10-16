const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
var models = require('./models')
var ObjectId = require('mongodb').ObjectId



app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '"Origin,X-Requested-With, Content-Type, Accepet"')
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
      res.json({
        results
      })
    }
  })
})
// GET	/api/shoes/brand/:brandname
app.get('/api/shoes/brand/:brandname', function(req, res, next) {
  var brandname = req.params.brandname;

  models.Stock.find({
    brand: brandname
  }, function(err, shoeBrand) {
    if (err) {
      return next(err)
    } else {
      res.json({
        shoeBrand
      })
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
      res.json({
        shoeSize
      })
    }
  })
});
app.get('/api/shoes/color/:color', function(req, res, next) {
  var color = req.params.color;
  models.Stock.find({
    color: color
  }, function(err, shoeColor) {
    if (err) {
      return next(err)
    } else {
      res.json({
        shoeColor
      })
    }
  })
});
// GET	/api/shoes/brand/:brandname/size/:size
app.get('/api/shoes/brand/:brandname/size/:size/color/:color', function(req, res, next) {
  var brandname = req.params.brandname;
  var size =  req.params.size;
  var color = req.params.color;

  models.Stock.find({
    brand: brandname,
    size: size,
    color: color
  }, function(err, shoeDetails) {
    if (err) {
      return next(err)
    } else {
      res.json({
        shoeDetails
      })
    }
  })
});
app.get('/api/shoes/brand/:brandname/size/:size', function(req, res, next) {
  var brandname = req.params.brandname;
  var size =  req.params.size;


  models.Stock.find({
    brand: brandname,
    size: size

  }, function(err, shoeDetail) {
    if (err) {
      return next(err)
    } else {
      res.json({
        shoeDetail
      })
    }
  })
});

app.get('/api/shoes/brand/:brandname/color/:color', function(req, res, next) {
  var brandname = req.params.brandname;
  var color =  req.params.color;


  models.Stock.find({
    brand: brandname,
    color: color

  }, function(err, shoeBrandandcolor) {
    if (err) {
      return next(err)
    } else {
      res.json({
        shoeBrandandcolor
      })
    }
  })
});
app.get('/api/shoes/size/:size/color/:color', function(req, res, next) {
  var color = req.params.color;
  var size =  req.params.size;


  models.Stock.find({
    size: size,
    color: color

  }, function(err, shoesizeandcolor) {
    if (err) {
      return next(err)
    } else {
      res.json({
        shoesizeandcolor
      })
    }
  })
});

app.get('/api/shoes/brand', function(req, res, next) {
  models.Stock.find({}, function(err, theBrand) {
    var myBrands = [];
    var mapBrand = {}

    for (var i = 0; i < theBrand.length; i++) {
      var newBrands = theBrand[i];
      if (mapBrand[newBrands.brand] === undefined) {
        mapBrand[newBrands.brand] = newBrands.brand;
        myBrands.push(newBrands.brand)
      }
    }
    if (err) {
      return next(err)
    }
    res.json({
      myBrands
    })
  })
})


app.get('/api/shoes/size', function(req, res, next) {
  models.Stock.find({}, function(err, theSize) {
    var mySize = [];
    var mapSize = {}

    for (var i = 0; i < theSize.length; i++) {
      var newSize = theSize[i];
      if (mapSize[newSize.size] === undefined) {
        mapSize[newSize.size] = newSize.size;
        mySize.push(newSize.size)
      }
    }
    if (err) {
      return next(err)
    }
    res.json({
      mySize
    })
  })
})
app.get('/api/shoes/color', function(req, res, next) {
  models.Stock.find({}, function(err, theColor) {
    var myColors = [];
    var mapColors = {}

    for (var i = 0; i < theColor.length; i++) {
      var newColor = theColor[i];
      if (mapColors[newColor.color] === undefined) {
        mapColors[newColor.color] = newColor.color;
        myColors.push(newColor.color)
      }
    }
    if (err) {
      return next(err)
    }
    res.json({
      myColors
    })
  })
});


function updateOrAddShoe(shoeData, in_stock, cb){

  models.Stock.findOneAndUpdate(shoeData, {
    $inc: {
      in_stock: in_stock
    }
  }, function(err, result) {
    if (err) {
      console.log(err);
    } else if (!result) {
      models.Stock.create({
        brand: shoeData.brand,
        color: shoeData.color,
        price: shoeData.price,
        size: shoeData.size,
        in_stock: in_stock
      }, cb);
    }
    else{
      cb(null, result);
    }

  });

}

// console.log("--------------");
app.post('/api/shoes', function(req, res, next) {

  var brand = req.body.brand;
  var color = req.body.color;
  var price = req.body.price;
  var size = req.body.size;
  var in_stock = req.body.in_stock;

  updateOrAddShoe({
    brand: brand,
    color: color,
    price: price,
    size: size
  }, in_stock, function(err, results){
    res.json({
      results
    });
  });

});

// console.log('=====================');
// POST	/api/shoes/sold/:id
app.post('/api/shoes/sold/:id', function(req, res, next) {
  console.log(req.params.id);
  var id = req.params.id;
  models.Stock.findOneAndUpdate({
      _id: ObjectId(id)
    }, {
      $inc: {
        "in_stock": -1
      }
    }, {
      upsert: false,
      // new: true
    },
    function(err, results) {
      if (err) {
        return res.json({
          status: "error",
          error: err,
          results: []
        })
      }
      if (results.in_stock <= 1) {
        results.remove()
      }
      res.json({
        status: "successful",
        results: results
      })

    })
});



var port = 3003;
app.listen(process.env.PORT || port, function() {
  console.log('app is now listening :' + port);
});
