console.log("print this")
// Time Slider
var width = 960;

//-------------------------------------------------------
// Scrollytelling
//-------------------------------------------------------

// Step 1.1 text
var politician1 = "Bernie Sanders";
var p1State = "New Hampshire";
var politician2 = "Donald Trump";
var p2State = "Texas";
var winner = politician1;
var loser = politician2;
var p1TweetRate = 3;
var p2TweetRate = 4.4;
var tweetRange = 500;
var heavyTweeter = politician2;
var lightTweeter = politician1;
var tweetDifferential = 33;
var p1TweetVocab = ["middle", "class", "fair", "America", "Americans"];
var p2TweetVocab = ["great", 'wonderful', 'best', 'greatest', 'thanks'];
var p1TopTweet = "Bangladeshi tenants in Queens are joining together to take on the greed and abuse of landlords. I stand with them. Landlords should not be allowed to raise rents to whatever they want, whenever they want. It is time for national rent control."
var p2TopTweet = 'Daniel Cameron, who just won the A.G. race in the Great Commonwealth of Kentucky, is a young and very talented political star. You will be hearing much from Cameron in the years to come!'

var s11Text = `${politician1} is furthest ahead of ${politician2} in: ${p1State}`;
var s12Text = `${politician2} is furthest ahead of ${politician1} in: ${p2State}`;
var s13Text = `${winner} has more popularity on Twitter overall than ${loser}`;

var s21Text = `${politician1} has averaged ${p1TweetRate} tweets per day in the last ${tweetRange} days`;
var s22Text = `${politician2} has averaged ${p2TweetRate} tweets per day in the last ${tweetRange} days`;
var s23Text = `${heavyTweeter} has tweeted ${tweetDifferential}% more that ${lightTweeter} in the last ${tweetRange} days`;

var s31Text = `The five most common words in ${politician1}'s tweets are: ${p1TweetVocab[0]}, ${p1TweetVocab[1]}, ${p1TweetVocab[2]}, ${p1TweetVocab[3]}, ${p1TweetVocab[4]}`;
var s32Text = `The five most common words in ${politician2}'s tweets are: ${p2TweetVocab[0]}, ${p2TweetVocab[1]}, ${p2TweetVocab[2]}, ${p2TweetVocab[3]}, ${p2TweetVocab[4]}`;
var s33Text = `${politician1}'s most popular tweet said this: ${p1TopTweet}`;
var s34Text = `${politician2}'s most popular tweet said this: ${p2TopTweet}`;

var arr = [s11Text, s12Text, s13Text,
          s21Text, s22Text, s23Text,
          s31Text, s32Text, s33Text, s34Text];

// using d3 for convenience
var main = d3.select('main')
var scrolly1 = main.select('#scrolly1');
var figure1 = scrolly1.select('figure');
var article1 = scrolly1.select('article');
var step1 = article1.selectAll('.step');

var scrolly2 = main.select('#scrolly2');
var figure2 = scrolly2.select('figure');
var article2 = scrolly2.select('article');
var step2 = article2.selectAll('.step');

var scrolly3 = main.select('#scrolly3');
var figure3 = scrolly3.select('figure');
var article3 = scrolly3.select('article');
var step3 = article3.selectAll('.step');

// initialize the scrollama
var scroller1 = scrollama();
var scroller2 = scrollama();
var scroller3 = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step1.style('height', stepH + 'px');
  step2.style('height', stepH + 'px');
  step3.style('height', stepH + 'px');

  var figureHeight = window.innerHeight / 2
  var figureMarginTop = (window.innerHeight - figureHeight) / 2

  figure1
    .style('height', figureHeight + 'px')
    .style('top', figureMarginTop + 'px');
  
  figure2
    .style('height', figureHeight + 'px')
    .style('top', figureMarginTop + 'px');
  
  figure3
    .style('height', figureHeight + 'px')
    .style('top', figureMarginTop + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller1.resize();
}

// scrollama event handlers
function handleStepEnter1(response) {
  console.log(response)
  // response = { element, direction, index }

  // add color to current step only
  step1.classed('is-active', function (d, i) {
    return i === response.index;
  })

  // update graphic based on step
  figure1.select('p').text(response.index + 1);

}

function handleStepEnter2(response) {
  console.log(response)
  // response = { element, direction, index }

  // add color to current step only
  step2.classed('is-active', function (d, i) {
    return i === response.index;
  })

  // update graphic based on step
  figure2.select('p').text(response.index + 1);

}

function handleStepEnter3(response) {
  console.log(response)
  // response = { element, direction, index }

  // add color to current step only
  step3.classed('is-active', function (d, i) {
    return i === response.index;
  })

  // update graphic based on step
  figure3.select('p').text(response.index + 1);

}



function setupStickyfill() {
  d3.selectAll('.sticky').each(function () {
    Stickyfill.add(this);
  });
}

function init() {

  setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller1.setup({
    step: '#scrolly1 article .step',
    offset: 0.33,

    // set to true to see debug horizontal line
    debug: false,
  })
    .onStepEnter(handleStepEnter1)

  scroller2.setup({
    step: '#scrolly2 article .step',
    offset: 0.33,

    // set to true to see debug horizontal line
    debug: false,
  })
    .onStepEnter(handleStepEnter2)

  scroller3.setup({
    step: '#scrolly3 article .step',
    offset: 0.33,

    // set to true to see debug horizontal line
    debug: false,
  })
    .onStepEnter(handleStepEnter3)


  // setup resize event
  window.addEventListener('resize', handleResize);
}

// kick things off
init();

// Set up messages
d3.selectAll('.stepText')
.data(arr)
.text(function (d) {
  console.log(d);
  return d;})
