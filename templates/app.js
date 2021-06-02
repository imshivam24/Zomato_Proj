

function getCuisinesValue() {
    var uicuisines = document.getElementsByName("uicuisines");
    for(var i in uicuisines) {
      if(uicuisines[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }  
function getOnlineValue() {
    var uionline = document.getElementsByName("uionline");
    for(var i in uionline) {
      if(uionline[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

function getBookTableValue() {
    var uitable = document.getElementsByName("uitable");
    for(var i in uitable) {
      if(uitable[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var cost = document.getElementById("uicost");
    
    var Cuisines = getCuisinesValue();
    var Online =getOnlineValue();
    var Book_tables = getBookTableValue();
    var location = document.getElementById("uiLocations");
    var restraunt_type = document.getElementById("uirest_types");
    
    var estPrice = document.getElementById("uiEstimatedPrice");
    console.log(cost.value)
   
    console.log(Cuisines);
    console.log(Online);
    console.log(Book_tables);
    console.log(location.value);
    console.log(restraunt_type.value);
    
    
    

  
    var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards



$.post(url, {
        total_cost: parseFloat(cost.value),
        //total_sqft: parseFloat(sqft.value),
        
        Cuisines: Cuisines,
        Online: Online,
        Book_tables:Book_tables,
        //bath: bathrooms,
        location: location.value,
        restraunt_type: restraunt_type.value
        //theme: theme.value,
        //city: city.value
    
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " ";
        console.log(status);
    });
}    



function onPageLoad() {
    console.log( "document loaded" );
     var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });

    var url2 = "http://127.0.0.1:5000/get_rest_type_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url2,function(data1, status) {
        console.log("got response for get_rest_type_names request");
        if(data1) {
            var rest_types = data1.rest_types;
            var uirest_types = document.getElementById("uirest_types");
            $('#uirest_types').empty();
            for(var i in rest_types) {
                var opt1 = new Option(rest_types[i]);
                $('#uirest_types').append(opt1);
            }
        }
    });

    // var url3 = "http://127.0.0.1:5000/get_listed_in_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    // $.get(url3,function(data2, status) {
    //     console.log("got response for get_listed_in_names request");
    //     if(data2) {
    //         var listed_in = data2.listed_in;
    //         var uilisted_in = document.getElementById("uilisted_in");
    //         $('#uilisted_in').empty();
    //         for(var i in listed_in) {
    //             var opt2 = new Option(listed_in[i]);
    //             $('#uilisted_in').append(opt2);
    //         }
    //     }
    // });

    // var url4 = "http://127.0.0.1:5000/get_city_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    // $.get(url4,function(data3, status) {
    //     console.log("got response for get_city_names request");
    //     if(data3) {
    //         var cities = data3.cities;
    //         var uicities = document.getElementById("uicities");
    //         $('#uicities').empty();
    //         for(var i in cities) {
    //             var opt3 = new Option(cities[i]);
    //             $('#uicities').append(opt3);
    //         }
    //     }
    // });
  }
  
  window.onload = onPageLoad;