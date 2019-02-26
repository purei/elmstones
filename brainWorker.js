
// Compiled elm simulator
importScripts('brain.js?' + Date.now())

simulator = Elm.MCTS.init()

var busy = false
var began_at = null

// Listen for simulator results
simulator.ports.simulationStats.subscribe(function(data) {
  busy = false

  // push results and time upwards
  self.postMessage({results: data, elapsed_time: Date.now() - began_at})
  began_at = null
})


// Listen for simulation requests
self.addEventListener('message', function(e) {
  var data = e.data

  // give requested matchup to simulator
  simulator.ports.initSim.send(data)
  busy = true
  began_at = Date.now()

}, false);
