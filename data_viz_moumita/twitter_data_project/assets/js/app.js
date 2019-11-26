console.log("print this")
// Time Slider
var width = 960;

var dataTime = d3.range(0, 7).map(function(d) {
  return new Date(2019, 10, 19 + d);
});

var sliderTime = d3
  .sliderBottom()
  .min(d3.min(dataTime))
  .max(d3.max(dataTime))
  .step(1000 * 60 * 60 * 24)
  .width(width - 50)
  .tickFormat(d3.timeFormat("%b %d"))
  .tickValues(dataTime)
  .default(new Date(2019, 11, 19))
  .fill('#2196f3')
  .on('onchange', val => {
    d3.select('p#value-time').text(d3.timeFormat('%d')(val));
  });

var gTime = d3
  .select('div#slider-time')
  .append('svg')
  .attr('width', width)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');

gTime.call(sliderTime);

d3.select('p#value-time').text(d3.timeFormat("%b %d")(sliderTime.value()));

sliderTime .on("slide", function(evt, value) {
  console.log("slider is working!")
})

//-------------------------------------------------------
// Scrollytelling
//-------------------------------------------------------
// using d3 for convenience

var main = d3.select('main')
var scrolly = main.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step.style('height', stepH + 'px');

  var figureHeight = window.innerHeight / 2
  var figureMarginTop = (window.innerHeight - figureHeight) / 2

  figure
    .style('height', figureHeight + 'px')
    .style('top', figureMarginTop + 'px');


  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  console.log(response)
  // response = { element, direction, index }

  // add color to current step only
  step.classed('is-active', function (d, i) {
    return i === response.index;
  })

  // update graphic based on step
  figure.select('p').text(response.index + 1);
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
  scroller.setup({
    step: '#scrolly article .step',
    offset: 0.33,

    // set to true to see debug horizontal line
    debug: true,
  })
    .onStepEnter(handleStepEnter)


  // setup resize event
  window.addEventListener('resize', handleResize);
}


init();