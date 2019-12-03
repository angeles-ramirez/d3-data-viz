//-------------------------------------------------------
// App: monitors user inputs, creates visualizations
//-------------------------------------------------------

// clear map
clearMap();

// build base map
var myMap = buildMap();

// Add an empty contorl to map
var layerControl = L.control.layers({}).addTo(myMap); // update the leaflet control with the named heatlayer

// Initialize plot
Plotly.newPlot("lineplot", 
    [], 
    {
        autosize: true,
        //width: 500,
        title: "Popularity on Twitter vs. Time",
        xaxis: { title: "Date"},
        yaxis: { title: "Retweets + Favorites" },
        height: 650,
        margin: {
        l: 50,
        r: 50,
        b: 100,
        t: 100,
        pad: 4
    }
});

// Select user choices from multi drop down
var selectv = [] // array of the selected politicians
d3.select("#keyInputs").on("change",function(d){ 
    var values = [];

    selected = d3.select(this) // select the select
      .selectAll("option:checked")  // select the selected values
      .each(function() { values.push(this.value) 
        }); // for each of those, get its value
    
    selectv = values
})

function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Table which translates form selection into twitter username
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

    // Translate dropdown selection into username
    var userName1 = politicianDict[selectv[0]];
    var userName2 = politicianDict[selectv[1]];

    // Build API endpoint urls for recent tweets related to selected politicians
    var hashtagUrl1 = window.location.href + 'api/hashtag/' + userName1;
    var hashtagUrl2 = window.location.href + 'api/hashtag/'+ userName2;

    // Build API endpoint urls for tweets made by the selected politicians
    var userUrl1 = window.location.href + 'api/historical/' + userName1;
    var userUrl2 = window.location.href + 'api/historical/' + userName2;

    //---------------------------------------
    // Make API calls and analyze responses
    //---------------------------------------

    d3.json(hashtagUrl1).then(function(data){
        heatlayer = createHeatLayer(data, "FUCHSIA", myMap) // Create a heatlayer in fuschia and add it to the map
        layerControl.addOverlay(heatlayer, selectv[0]); // add the heatlayer to the Leaflet control
    });

    // Make API calls and analyze responses
    d3.json(hashtagUrl2).then(function(data){
        heatlayer = createHeatLayer(data, "ORANGE", myMap) // Create a heatlayer in orange and add it to the map
        layerControl.addOverlay(heatlayer, selectv[1]); // add the heatlayer to the Leaflet control
    });

    // Make API calls and analyze responses
    d3.json(userUrl1).then(function(data){
        textAnalysis = analyzeTweets(data); // perform text analysis of the tweets
        tweetReachVsTime(data); // perform text analysis of the tweets
        console.log(textAnalysis)
        // Set up messages
        d3.select('#figure3')
        .html(`<p>Most Popular Tweet: <br> ${textAnalysis.mostPopular}<br><br>
                Most used (uncommon) words: <br> ${textAnalysis.vocab}<p>`)
    });

    // Make API calls and analyze responses
    d3.json(userUrl2).then(function(data){
        textAnalysis = analyzeTweets(data);
        tweetReachVsTime(data);
    });


};

// Event listener on "Compare" button
d3.select("#button").on("click", handleSubmit);
