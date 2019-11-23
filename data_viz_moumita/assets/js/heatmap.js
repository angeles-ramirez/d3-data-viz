var selectv = []
d3.select("#keyInputs")
 .on("change",function(d){ 
    var values = [];
    
    selected = d3.select(this) // select the select
      .selectAll("option:checked")  // select the selected values
      .each(function() { values.push(this.value) 
        }); // for each of those, get its value
      
    console.log(values)
    selectv = values
})   
console.log(selectv)


function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  
console.log(selectv)
console.log(selectv[0]);
console.log(selectv[1]);
  // Build the plot with the new stock

 filterdata(selectv[0],selectv[1]);
  

};

function filterdata(hashtag1,hashtag2) {

var hashdata =[]
var url1 = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";
console.log(url1);

d3.json(url1).then(function(response) {
   
  var hashdata1 =  response.filter(function(record) {
        return record.category == hashtag1;
  });
  var hashdata2 =  response.filter(function(record) {
    return record.category == hashtag2;
});
 console.log(hashdata1);
 console.log(hashdata2);
 updatemap(hashdata1,hashdata2)
});

};

function buildmap() {
  
  
  
  
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});
// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};




var myMap = L.map("map", {
  center: [37.77, -122.43],
  zoom: 10,
  layers: [streetmap]
  
});


L.control.layers(baseMaps).addTo(myMap);



};
buildmap()

function updatemap(oneData,twoData) {
  //document.getElementById('map').innerHTML = "";

  
  
 var container = L.DomUtil.get('map');

if(container != null){

container._leaflet_id = null;


}

  
  
    var heatMarkers1 = [];
    var heatMarkers2 = [];
   
    
    
  
    for (var i = 0; i < oneData.length; i++) {
      
      var location = oneData[i].location;
      var category1 = oneData[i].category;
      console.log(location.coordinates)
      
      heatMarkers1.push(
        L.circle(([location.coordinates[1], location.coordinates[0]]), {
          stroke: false,
          fillOpacity: 0.75,
          color: "red",
          fillColor: "red",
          radius: 200
        })
      );
    }
    var heatmap1 = new L.layerGroup(heatMarkers1);
    

    for (var i = 0; i < twoData.length; i++) {
      
      var location = twoData[i].location;
      var category2 = twoData[i].category;
      console.log(location.coordinates)
      
      heatMarkers2.push(
        L.circle(([location.coordinates[1], location.coordinates[0]]), {
          stroke: false,
          fillOpacity: 0.75,
          color: "blue",
          fillColor: "blue",
          radius: 200
        })
      );
    }
    var heatmap2 = new L.layerGroup(heatMarkers2);
    
    
  
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  //var layers = {
   // hashtag: new L.LayerGroup(),
    
  //};
  
  var overlayMaps = {
    "heat layer1": heatmap1,
    "heat layer2": heatmap2
  };
  
  
  //if(myMap!= undefined) {myMap.remove()};
  var myMap =  L.map("map", {
    center: [37.77, -122.43],
    zoom: 10,
    layers: [streetmap,heatmap1,heatmap2]
    
  });

  
  
  L.control.layers(baseMaps,overlayMaps).addTo(myMap);
  
  //L.control.layers(null, overlayMaps).addTo(map);
  
  
 // });

//  var container = L.DomUtil.get('map');

//  if(container != null){
 
//  container._leaflet_id = null;
 
 
 }
// var legend =  new L.control({position: 'topright'});
// legend.onAdd = function (map) {

//  var div = L.DomUtil.create('div', 'info legend');
//  labels = ['<strong>Categories</strong>'],
//  categories = [category1, category2];
//  colors = ["#FF0000", "#0000FF"]
//  console.log(categories)

//  for (var i = 0; i < categories.length; i++) {

//          div.innerHTML += 
//          labels.push(
//           '<span style="background:' + colors[i]+ '"></span> ' +
//          (categories[i] ? categories[i] : '+'));

//      }
//      div.innerHTML = labels.join('<br>');
//  return div;
//  };
//  legend.addTo(myMap); 
 

  
};

// function refreashsubmit()
// {
//   window.location.reload();
// }

d3.select("#button").on("click", handleSubmit);
//d3.select("#refreashbutton").on("click", refreashsubmit);