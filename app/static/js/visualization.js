// var selectv = []
// d3.select("#keyInputs")
//  .on("change",function(d){ 
//     var values = [];
    
//     selected = d3.select(this) // select the select
//       .selectAll("option:checked")  // select the selected values
//       .each(function() { values.push(this.value) 
//         }); // for each of those, get its value
      
//     console.log(values)
//     selectv = values
// })   
// console.log(selectv)


// function handleSubmit() {
//   // Prevent the page from refreshing
//   d3.event.preventDefault();

//   // Select the input value from the form
  
// console.log(selectv)
// console.log(selectv[0]);
// console.log(selectv[1]);
// d3.select("#keyInputs").remove()
//   // Build the plot with the new stock

//  filterdata(selectv[0],selectv[1]);
  

// };

// function filterdata(hashtag1,hashtag2) {

// var hashdata =[]
// var url1 = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";
// console.log(url1);

// d3.json(url1).then(function(response) {
   
//   var hashdata1 =  response.filter(function(record) {
//         return record.category == hashtag1;
//   });
//   var hashdata2 =  response.filter(function(record) {
//     return record.category == hashtag2;
// });
//  console.log(hashdata1);
//  console.log(hashdata2);
//  updatemap(hashdata1,hashdata2)
// });

// };

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


trace1 = {
    type: 'scatter',
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'lines',
    name: 'Trump',
    line: {
      color: 'rgb(219, 64, 82)',
      width: 1
    }
  };
  
trace2 = {
    type: 'scatter',
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines',
    name: 'sanders',
    line: {
      color: 'rgb(55, 128, 191)',
      width: 1
    }
  };
  
var layout = {
    width: 620,
    height: 650
  };
  
var data = [trace1, trace2];
  
Plotly.newPlot('lineplot', data, layout);

// function updatemap(oneData,twoData) {
//   //document.getElementById('map').innerHTML = "";
  
  
//  var container = L.DomUtil.get('map');

// if(container != null){

// container._leaflet_id = null;

// }

  
  
//     var heatMarkers1 = [];
//     var heatMarkers2 = [];
    
//     var heatArray1 =[];
//     var heatArray2 =[];
  
//     for (var i = 0; i < oneData.length; i++) {
      
//       var location = oneData[i].location;
//       var category1 = oneData[i].category;
//       var date1 = oneData[i].date;
//       //console.log(location.coordinates)
//       if (location) {
//       heatArray1.push([location.coordinates[1], location.coordinates[0]]);
  
//       }
//       heatMarkers1.push(
//         L.circle(([location.coordinates[1], location.coordinates[0]]), {
//           stroke: false,
//           fillOpacity: 0.75,
//           color: "red",
//           fillColor: "red",
//           radius: 200
//         })
//       );
     
//     }
//     console.log(heatArray1)
//     //var heatmark1 = new L.layerGroup(heatMarkers1);
//     var heatmap1 = new L.HeatLayer(heatArray1, {
//       radius: 20,
//       blur: 20
//     });
  
    

//     for (var i = 0; i < twoData.length; i++) {
      
//       var location = twoData[i].location;
//       var category2 = twoData[i].category;
//       var date2 = twoData[i].date;
//       console.log(location.coordinates)
//       //if (location) {
//         heatArray2.push([location.coordinates[1], location.coordinates[0]]);
  
//       //}
//       heatMarkers2.push(
//         L.circle(([location.coordinates[1], location.coordinates[0]]), {
//           stroke: false,
//           fillOpacity: 0.75,
//           color: "blue",
//           fillColor: "blue",
//           radius: 200
//         })
//       );
//       console.log(heatArray2)
//     }
//     //var heatmark2 = new L.layerGroup(heatMarkers2);
//     var heatmap2 = new L.HeatLayer(heatArray2, {
//       radius: 10,
//       blur: 10
//     });
      
//     var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   });
  
//   var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.dark",
//     accessToken: API_KEY
//   });
//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   };
  
//     var overlayMaps = {
//     "heat layer1": heatmap1,
//     "heat layer2": heatmap2
//   };
  
  
//   //if(myMap!= undefined) {myMap.remove()};
//   var myMap =  L.map("map", {
//     center: [37.77, -122.43],
//     zoom: 10,
//     layers: [streetmap,heatmap1,heatmap2]
    
//   });

  
  
//  L.control.layers(baseMaps,overlayMaps).addTo(myMap);
 
// //  var legend = L.control({position: 'topright'});
// //  legend.onAdd = function (map) {

// //  var div = L.DomUtil.create('div', 'info legend');
// //  labels = ['<strong>Categories</strong>'],
// //  categories = [category1, category2];
// //  colors = ["#FF0000", "#0000FF"]
// //  console.log(categories)

// //  for (var i = 0; i < categories.length; i++) {

// //          div.innerHTML += 
// //          labels.push(
// //           '<span style="background:' + colors[i]+ '"></span> ' +
// //          (categories[i] ? categories[i] : '+'));

// //      }
// //      div.innerHTML = labels.join('<br>');
// //  return div;
// //  };
// //  legend.addTo(myMap);
// var trace1 = {
//   x: ["beer", "wine", "martini", "margarita",
//     "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//   y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//   type: "bar"
// };

// var data = [trace1];

// var layout = {
//   title: "'Bar' Chart"
// };

// Plotly.newPlot("plot", data, layout);


//   };

  
// d3.select("#button").on("click", handleSubmit);