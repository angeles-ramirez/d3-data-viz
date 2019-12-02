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


function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  
console.log(selectv)
console.log(selectv[0]);
console.log(selectv[1]);
var politicianDict = {
  "Bernie Sanders" :"BernieSanders",
  "Donald Trump":"realDonaldTrump",
  "Joe Biden":"JoeBiden",
  "Elizabeth Warren":"ewarren",
  "Pete Buttigieg":"Chas10Buttigieg",
  "Kamala Harris":"KamalaHarris",
  "Andrew Yang":"AndrewYang",
  "Ted Cruz":"tedcruz",
  "Ben Carson": "SecretaryCarson",
  "Mike Pence":"Mike_Pence"

}
var sel1= selectv[0];
var sel2 = selectv[1];
console.log(sel1)
var tag1 = politicianDict[sel1];
var queryurl1 = window.location.href + 'api/hashtag/' + tag1;
var tag2 = politicianDict[sel2];
var queryurl2 = window.location.href + 'api/hashtag/'+tag2;
var queryurlplot1 = window.location.href + 'api/historical/'+tag1;
var queryurlplot2 = window.location.href + 'api/historical/'+tag2;
console.log(tag1);
console.log(tag2);
console.log(queryurl1);
console.log(queryurl2);
d3.select("#keyInputs").remove()
  // Build the plot with the new hastag



 //filterdata(queryurl1,queryurl2);
 updatemap(queryurl1,queryurl2,tag1,tag2,queryurlplot1,queryurlplot2);

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
  center: [41.49, -99.90],
  zoom: 5,
  layers: [darkmap]});
// test ---
var turl = window.location.href + "api/historical/realDonaldTrump";
console.log(turl);
d3.json(turl).then(function(data)
{
  console.log(data);
});


//L.control.layers(baseMaps).addTo(myMap);

//});

// var date_array =[];
// var fav_twtcnt =[];
// var trace = {
//   x: date_array,
//   y: fav_twtcnt,
//   mode: "markers",
//   type: "scatter",
//   name: "trump",
//   marker: {
//     color: "orange",
//     symbol: "diamond-x"
//   }
// };

// var data = [trace];

// var layout = {
// title: "Fav Count Analysis",
// xaxis: { title: "Date" },
// yaxis: { title: "fav cnt" }
// };



// Plotly.newPlot("plot", data, layout);


};
buildmap()

function updatemap(queryurl1,queryurl2,tag1,tag2,queryurlplot1,queryurlplot2) {
  //document.getElementById('map').innerHTML = "";
  
  
 var container = L.DomUtil.get('map');

if(container != null){

container._leaflet_id = null;

}



d3.json(queryurl1).then(function(data1){ 
  console.log(data1);
 //var layername1 = ((furl1.substring(0, furl1.length - 4)).split("/"))[2];
  var heatArray1 = [];
    for (var i = 0; i < data1.length; i++) {
      var lat = data1[i].lat;
      var long = data1[i].long;
      //keyword1.push((data1[i].keyword).slice(1));
      console.log((data1[i].keyword).slice(1));
        heatArray1.push([lat, long]);
      
    }
    var layername1 = tag1;
    console.log(layername1);
  console.log(heatArray1)
    var heatmap1 = L.heatLayer(heatArray1, {
      radius: 15,
      blur: 1,
      gradient : {1: 'FUCHSIA'},
      max: 2000
    });
    
    d3.json(queryurl2).then(function(data2){ 
      console.log(data2);
      //var layername2 = ((furl2.substring(0, furl2.length - 4)).split("/"))[2];
      
      var heatArray2 = [];
     
        for (var i = 0; i < data2.length; i++) {
          var lat2 = data2[i].lat;
          var long2 = data2[i].long;
          // keyword2.push((data2[i].keyword).slice(1));
          console.log((data2[i].keyword).slice(1));
          console.log(lat2,long2);
            heatArray2.push([lat2, long2]);
          
        }
        var layername2 = tag2;
        console.log(layername2);
      console.log(heatArray2)
        var heatmap2 = L.heatLayer(heatArray2, {
          radius: 15,
          blur: 1,
          gradient : {1: 'Yellow'},
          max: 2000
        });  

    
      
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
  
    var overlayMaps = {
     // layername1: heatmap1,
      //layername1: heatmap2
  };
  overlayMaps[layername1] = heatmap1;
  overlayMaps[layername2] = heatmap2;
  //if(myMap!= undefined) {myMap.remove()};
  var myMap =  L.map("map", {
    center: [41.49, -99.90],
    zoom: 5,
    layers: [darkmap,heatmap1,heatmap2]
    
  });

  
  
 L.control.layers(baseMaps,overlayMaps).addTo(myMap);
});
});
 
function fDate(s) {
  var d = new Date();
  s = s.split('/');
  d.setFullYear(s[2]);
  d.setMonth(s[1]);
  d.setDate(s[0]);
  return d;
}

//d3.csv(furl1).then(function(data1){
   
  //console.log(data1);
d3.json(queryurlplot1).then(function(data1){  
  console.log(data1) 
  var date_array1 =[];
  var avg_twtcnt1 =[];
  for (var i = 0; i < data1.length; i++) {
    var date1 = data1[i].Tweet_Created_At;
    var ftwtcnt1 = data1[i].Favorite_Count;
    var retwtcnt1 = data1[i].Retweet_Count;
    var tottwtcnt1 = (ftwtcnt1+retwtcnt1)/2;
    console.log(data1[i]);
     //var keyword = (data[i].keyword).slice(1);
    //console.log((data[i].keyword).slice(1));
    date_array1.push(date1);
    avg_twtcnt1.push(tottwtcnt1);
    
  };
  console.log(date_array1.length);
  

 
  
  d3.json(queryurlplot2).then(function(data2){   
    console.log(data2)  
    var date_array2 =[];
    var avg_twtcnt2 =[];
    for (var j = 0; j < data2.length; j++) {
      var date2 = data2[j].Tweet_Created_At;
      var ftwtcnt2 = data2[j].Favorite_Count;
      var retwtcnt2 = data2[j].Retweet_Count;
      var tottwtcnt2 = (ftwtcnt2+retwtcnt2)/2;
      console.log(data2[j]);
       //var keyword = (data[i].keyword).slice(1);
      //console.log((data[i].keyword).slice(1));
      date_array2.push(date2);
      avg_twtcnt2.push(tottwtcnt2);
      
    };
   console.log(date_array2.length);
   console.log(avg_twtcnt1.length);
   console.log(avg_twtcnt2.length);

var max1 = date_array1[0],
  min1 = date_array1[0];

// iterate over array values and update min & max
date_array1.forEach(function(v) {
  max1 = new Date(v) > new Date(max1)? v: max1;
  min1 = new Date(v) < new Date(min1)? v: min1;
});

console.log('max1 :', max1, 'min1 :', min1);


  var max2 = date_array2[0],
  min2 = date_array2[0];

// iterate over array values and update min & max
date_array2.forEach(function(v) {
  max2 = new Date(v) > new Date(max2)? v: max2;
  min2 = new Date(v) < new Date(min2)? v: min2;
});

console.log('max2 :', max2, 'min2 :', min2);

  var set_date =[];
  var earliest_date =[];
  
  if (new Date(min1) < new Date(min2))
    {set_date = date_array2;
      earliest_date = new Date(min2);
  

    console.log("2")}
  else {set_date = date_array1;  
    earliest_date = new Date(min1);
  console.log("1")

}
  console.log(set_date);

  console.log(earliest_date);
  var date_test1=[];
  var avg_testcnt1 =[];
  for (var j = 0; j < data1.length; j++) {
    var date1 = data1[j].Tweet_Created_At;
    if ((new Date(date1)) >= (new Date(earliest_date))){
    var ftwtcnt1 = data1[j].Favorite_Count;
    var retwtcnt1 = data1[j].Retweet_Count;
    var tottwtcnt1 = (ftwtcnt1+retwtcnt1)/2; 
    date_test1.push(date1);
    avg_testcnt1.push(tottwtcnt1);
    }};
    console.log(avg_testcnt1.length);
    console.log(date_test1.length);
    var date_test2=[];
    var avg_testcnt2 =[];
    for (var j = 0; j < data2.length; j++) {
      var date2 = data2[j].Tweet_Created_At;
      if ((new Date(date2)) >= (new Date(earliest_date))){
      var ftwtcnt2 = data2[j].Favorite_Count;
      var retwtcnt2 = data2[j].Retweet_Count;
      var tottwtcnt2 = (ftwtcnt2+retwtcnt2)/2; 
      date_test2.push(date2);
      avg_testcnt2.push(tottwtcnt2);
      }};
      console.log(avg_testcnt2.length);
      console.log(date_test2.length);
     



  var trace1 = {
    x: date_test1,
    y: avg_testcnt1,
    mode: "lines",
    type: "scatter",
    name: tag1,
    color: "blue"
    // marker: {
    //  color: "blue",
    //   symbol: "cross"
    // }
  };
   var trace2 = {
        x: date_test2,
        y: avg_testcnt2,
        mode: "lines",
        type: "scatter",
        name: tag2,
        color: "orange"
        // marker: {
        // color: "orange",
        //  symbol: "diamond-x"
        // }
      };
  
var data = [trace1, trace2];


var layout = {
  title: tag1+" Vs. "+tag2,
  xaxis: { title: "Date"},
  yaxis: { title: "Tweet Count" }
};



Plotly.newPlot("lineplot", data, layout);
 

});
});

  };

  
d3.select("#button").on("click", handleSubmit);