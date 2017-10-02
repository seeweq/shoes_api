$(document).ready(function() {
var mytableTemplate = document.querySelector('#mytableTem').innerHTML;
var showTemplate = Handlebars.compile(mytableTemplate);

var dropDownTemplate = document.querySelector('#dropdownTemp').innerHTML;
var drop = Handlebars.compile(dropDownTemplate);



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
      console.log(getShoes);
      displayTable.innerHTML = showTemplate({
        shoe: getShoes
      });
      showDropDowns.innerHTML = drop({
        shoe: getShoes
      })
    },
    error: function(error) {
      alert('error');
    }
  })
// });

var addBtn = document.querySelector('.addingStock')
addBtn.addEventListener('click',function(){
  var inbrand = document.querySelector('.inbrand');
  var incolor = document.querySelector('.incolor');
  var insize = document.querySelector('.insize');
  var inprice = document.querySelector('.inprice');
  var instock = document.querySelector('.instock');
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3003/api/shoes',
    dataType: 'application/json',
    data :{
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
});
 function searchShoes(){

   var brandSelect = document.querySelector('.selectBrand').value;
   var colorSelect = document.querySelector('.selectColor').value;
   var sizeSelect = document.querySelector('.selectSize').value;
   mySearchBton.addEventListener('click',function(){
   function searchSize(sizeResults){
     return sizeSelect = sizeResults.size
   }
   $.ajax({
     type: 'GET',
     url: 'http://localhost:3003/api/shoes/size/'+ sizeSelect,
     success:function(getShoes){

       if(sizeSelect!==""){
         var sizeData = getShoes.filter(searchSize)
       }
     }
   })
 });
 }
