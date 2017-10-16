var mytableTemplate = document.querySelector('#mytableTem').innerHTML;
var showTemplate = Handlebars.compile(mytableTemplate);

var brandTemplate = document.querySelector('#brandTemp').innerHTML;
var dropForBrand = Handlebars.compile(brandTemplate);
var colorTemplate = document.querySelector('#colorTemp').innerHTML;
var dropForColor = Handlebars.compile(colorTemplate)
var sizeTemplate = document.querySelector('#sizeTemp').innerHTML;
var dropForSize = Handlebars.compile(sizeTemplate)

var addBtn = document.querySelector('#addingStock')
var mySearchBton = document.querySelector('#searchBton');
var displayTable = document.querySelector('#displayTable')
var showColorDrop = document.querySelector('#myColorDrop')
var showBrandDrop = document.querySelector('#myBrandDrop')
var showSizeDrop = document.querySelector('#mySizeDrop')



function errorHandler(xhr, error, message){

    alert(error + " - " + message);

}
// console.log('ready');
function showAllShoes() {

  $.ajax({
    type: 'GET',
    url: '/api/shoes',
    dataType: 'json',
    success: function(getShoes) {

      displayTable.innerHTML = showTemplate({
        shoe: getShoes.results
      });

    },
    error: errorHandler
  })

}

showAllShoes();

$(document).ready(function() {
  $("#myAddButton").click(function() {
    $("#inputsToAddStock").modal();
  });
});

function setupAddNewShoe() {

  addBtn.addEventListener('click', function() {
    var inbrand = document.querySelector('.inbrand');
    var incolor = document.querySelector('.incolor');
    var insize = document.querySelector('.insize');
    var inprice = document.querySelector('.inprice');
    var instock = document.querySelector('.instock');

    $.ajax({
      type: 'POST',
      url: '/api/shoes',
      dataType: 'json',
      data: {
        brand: inbrand.value,
        color: incolor.value,
        price: inprice.value,
        size: insize.value,
        in_stock: instock.value
      },
      success: function(addStock) {


        showDropDowns();

        showAllShoes();

        clearInputs();
      },
      error: errorHandler
    })
  });

}

setupAddNewShoe();


function clearInputs() {
   $('.inbrand').val(""),
    $('.incolor').val(""),
    $('.insize').val(""),
    $('.inprice').val(""),
    $('.instock').val("")
}
clearInputs();



function filterData() {
  mySearchBton.addEventListener('click', function() {

    var brandSelect = document.querySelector('#selectBrand').value;
    var colorSelect = document.querySelector('#selectColor').value;
    var sizeSelect = document.querySelector('#selectSize').value;

    if (brandSelect !== "" && colorSelect == "" && sizeSelect == "") {
      $.ajax({
        url: '/api/shoes/brand/' + brandSelect,
        type: 'GET',
        success: function(data) {
          displayTable.innerHTML = showTemplate({
            shoe: data.shoeBrand
          })
          // console.log(data.shoeBrand);
        },
        error: errorHandler
      });

    } else if (colorSelect !== "" && brandSelect == "" && sizeSelect == "") {
      //  console.log(brandSelect);
      $.ajax({
        url: '/api/shoes/color/' + colorSelect,
        type: 'GET',
        success: function(colorResults) {
          displayTable.innerHTML = showTemplate({
            shoe: colorResults.shoeColor
          })
          console.log(colorResults.shoeColor);
        },
        error: errorHandler
      });
    } else if (sizeSelect !== "" && brandSelect == "" && colorSelect == "") {
      $.ajax({
        url: '/api/shoes/size/' + sizeSelect,
        type: 'GET',
        success: function(sizeResults) {
          displayTable.innerHTML = showTemplate({
            shoe: sizeResults.shoeSize
          })
          // console.log(sizeResults.shoeSize);
        },
        error: errorHandler
      });
    } else {
      filterByAll();
      filterByTwo();
    }
  })
}
filterData();

function filterByAll() {
  var sizeSelect = document.querySelector('#selectSize').value;
  var brandSelect = document.querySelector('#selectBrand').value;
  var colorSelect = document.querySelector('#selectColor').value;
  if (sizeSelect !== "" && brandSelect !== "" && colorSelect !== "") {
    $.ajax({
      url: '/api/shoes/brand/' + brandSelect + '/size/' + sizeSelect + '/color/' + colorSelect,
      type: 'GET',
      success: function(allResults) {
        displayTable.innerHTML = showTemplate({
          shoe: allResults.shoeDetails
        })

      },
      error: errorHandler
    })

  } else {
    showAllShoes();
  }
}



function filterByTwo() {
  var sizeSelect = document.querySelector('#selectSize').value;
  var brandSelect = document.querySelector('#selectBrand').value;
  var colorSelect = document.querySelector('#selectColor').value;
  if (sizeSelect !== "" && brandSelect !== "" && colorSelect == "") {
    $.ajax({
      url: '/api/shoes/brand/' + brandSelect + '/size/' + sizeSelect,
      type: 'GET',
      success: function(allResults) {
        displayTable.innerHTML = showTemplate({
          shoe: allResults.shoeDetail
        })

      },
      error: errorHandler

    })
  } else if (sizeSelect == "" && brandSelect !== "" && colorSelect !== "") {
    $.ajax({
      url: '/api/shoes/brand/' + brandSelect + '/color/' + colorSelect,
      type: 'GET',
      success: function(Reslts) {
        displayTable.innerHTML = showTemplate({
          shoe: Reslts.shoeBrandandcolor
        })

      },
      error: errorHandler
    })
  } else if (sizeSelect !== "" && brandSelect == "" && colorSelect !== ""){
    $.ajax({
      url: '/api/shoes/size/' + sizeSelect + '/color/' + colorSelect,
      type: 'GET',
      success: function(showResults) {
        displayTable.innerHTML = showTemplate({
          shoe: showResults.shoeSizeandcolor
        })

      },
      error: errorHandler
    })
  }
}
filterByTwo();
function takenShoe(id) {
  console.log(id);

  $.ajax({
    url: '/api/shoes/sold/' + id,
    type: 'POST',
    dataType: 'json',
    success: function(purchase) {
      showAllShoes();
    },
    error: errorHandler
  })
}

function renderBrandDropdown() {
  $.ajax({
    url: '/api/shoes/brand',
    type: 'GET',
    dataType: 'json',
    success: function(responds) {
      showBrandDrop.innerHTML = dropForBrand({
        brand: responds.myBrands.sort()
      });

      $('.selectpicker').selectpicker({
        style: 'btn-default',
        size: 4
      });

    },
    error: errorHandler
  })
}


function renderSizeDropdown() {
  $.ajax({
    url: '/api/shoes/size',
    type: 'GET',
    dataType: 'json',
    success: function(responds) {
      showSizeDrop.innerHTML = dropForSize({
        size: responds.mySize.sort()
      });

      $('.selectpicker').selectpicker({
        style: 'btn-default',
        size: 4
      });

    },
    error: errorHandler
  })
}

function renderColorDropdown() {
  $.ajax({
    url: '/api/shoes/color',
    type: 'GET',
    dataType: 'json',
    success: function(responds) {
      showColorDrop.innerHTML = dropForColor({
        color: responds.myColors.sort()
      });

      $('.selectpicker').selectpicker({
        style: 'btn-default',
        size: 4
      });

    },
    error: errorHandler
  })
}

function showDropDowns() {

  renderBrandDropdown();
  renderSizeDropdown();
  renderColorDropdown();

}
showDropDowns();
