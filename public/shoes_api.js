
  var mytableTemplate = document.querySelector('#mytableTem').innerHTML;
  var showTemplate = Handlebars.compile(mytableTemplate);

  var dropDownTemplate = document.querySelector('#dropdownTemp').innerHTML;
  var drop = Handlebars.compile(dropDownTemplate);



  var addBtn = document.querySelector('.addingStock')
  var mySearchBton = document.querySelector('.searchBton');
  var myStockBton = document.querySelector('.stockshow');
  var displayTable = document.querySelector('#displayTable')
  var showDropDowns = document.querySelector('#myDrop')


  console.log('ready');

  // myStockBton.addEventListener('click', function(){
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3003/api/shoes',
    dataType: 'json',
    success: function(getShoes) {
      // console.log(getShoes);
      displayTable.innerHTML = showTemplate({
        shoe: getShoes.results
      });
      showDropDowns.innerHTML = drop({
        shoe: getShoes.results
      })
    },
    error: function(error) {
      alert('error');
    }
  })
  // });

  addBtn.addEventListener('click', function() {
    var inbrand = document.querySelector('.inbrand');
    var incolor = document.querySelector('.incolor');
    var insize = document.querySelector('.insize');
    var inprice = document.querySelector('.inprice');
    var instock = document.querySelector('.instock');
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3003/api/shoes',
      dataType: 'json',
      data: {
        brand: inbrand.value,
        color: incolor.value,
        price: inprice.value,
        size: insize.value,
        in_stock: instock.value
      },
      success: function(addStock) {
        displayTable.innerHTML = showTemplate({
          shoe: addStock
        })
      },
      error: function(error) {
        alert('error')
      }
    })
  });




  mySearchBton.addEventListener('click', function(){
    var brandSelect = document.querySelector('.selectBrand').value;
    console.log(brandSelect);
   $.ajax({
     url : 'http://localhost:3003/api/shoes/brand/'+ brandSelect ,
     type: 'GET',
     success: function(data){
        displayTable.innerHTML = showTemplate({
         shoe: data.shoeBrand
       })
  console.log(data.shoeBrand);
     },
     error:function(error){
       alert(error)
     }
   });
   });
    mySearchBton.addEventListener('click', function(){
    var sizeSelect = document.querySelector('.selectSize').value;
      $.ajax({
        url : 'http://localhost:3003/api/shoes/size/'+ sizeSelect,
        type: 'GET',
        success: function(sizeResults){
          displayTable.innerHTML = showTemplate({
            shoe: sizeResults.shoeSize
          })
           // console.log(sizeResults.shoeSize);
        },
        error:function(error){
          alert(error)
        }
      })
});
//  mySearchBton.addEventListener('click', function(){
// });
// mySearchBton.addEventListener('click', function(){
//   var sizeSelect = document.querySelector('.selectSize').value;
//   var brandSelect = document.querySelector('.selectBrand').value;
//   var colorSelect = document.querySelector('.selectColor').value;
//    $.ajax({
//      url : 'http://localhost:3003/api/shoes/brand/'+ brandSelect + '/size/'+ sizeSelect + '/color/' + colorSelect,
//      type: 'GET',
//      success: function(allResults){
//        displayTable.innerHTML = showTemplate({
//          shoe: allResults.shoeDetails
//        })
//     console.log(allResults.shoeDetails);
//      },
//      error:function(error){
//        alert(error)
//      }
//    })
// });
//
// var takenShoe = document.querySelector('#takenShoe');
// takenShoe.addEventListener('click', function(evt){
var stockAvailible = [];
function takenShoe(id){
  console.log(typeof  id);
  // alert('i work!')
  // var id = document.getElementById("shoePurchase")
  // console.log("---------", id);
  // if (document.getElementById('shoePurchase') != null) {
  //     id = document.getElementById("shoePurchase").value;
  // }
  // var shoeId = id.value;
// $("#takenShoe").on("click", function(){
  // var id = evt.target.value
  // console.log(id);
  $.ajax({
    url : 'http://localhost:3003/api/shoes/sold/' + id,
    type: 'POST',
    dataType:'json',
    success: function(purchase){
      stockAvailible.forEach(function(buyingAShoe){
        if(buyingAShoe._id == purchase.data._id){
          buyingAshoe.in_stock = purchase.data.in_stock;
        }
      })

      // displayTable.innerHTML = showTemplate({
      //   shoe :purchase.results
      //  })
       // console.log(sizeResults.shoeSize);
    },
    error:function(error){
      alert("error")
    }
  })
}
takenShoe();
