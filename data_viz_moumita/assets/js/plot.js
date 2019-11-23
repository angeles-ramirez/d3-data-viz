console.log("hello plot");
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
  
  
  var url1 = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";
  console.log(url1);
  
  d3.json(url1).then(function(response) {
    var hashdata = response
     
    var hashdata1 =  response.filter(function(record) {
          return record.category == hashtag1;
    });
    var hashdata2 =  response.filter(function(record) {
      return record.category == hashtag2;
  });
   console.log(hashdata1);
   console.log(hashdata2);
   buildPlot(hashdata1,hashdata2)
  });
  
  };
  
  function buildPlot(oneData,twoData) {
      
      // Grab values from the response json object to build the plots
      
      //var dates = unpack(hashdata1.date1, 0);
      // var dates1 =[]
      // for  (var i = 0; i < oneData.length; i++) {
      //     dates1.push(oneData[i].date)
      // }
      // console.log(dates1);
      // var trace1 = {
      //   type: "scatter",
      //   mode: "lines",
      //   name: name,
      //   x: dates1,
      //   y: closingPrices,
      //   line: {
      //     color: "#17BECF"
      //   }
      // };
  
      // var data = [trace1];
  
      // var layout = {
      //   title: `${stock} closing prices`,
      //   xaxis: {
      //     range: [startDate, endDate],
      //     type: "date"
      //   },
      //   yaxis: {
      //     autorange: true,
      //     type: "linear"
      //   }
      // };
  
      //Plotly.newPlot("plot", data, layout);
      var trace1 = {
        x: ["beer", "wine", "martini", "margarita",
          "ice tea", "rum & coke", "mai tai", "gin & tonic"],
        y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
        type: "bar"
      };
      
      var data = [trace1];
      
      var layout = {
        title: "'Bar' Chart"
      };
      
      Plotly.newPlot("plot", data, layout);
  
    };
  
  
  // Add event listener for submit button
  d3.select("#submit").on("click", handleSubmit);
 
