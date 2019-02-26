
// Compiled elm simulator
importScripts('sim.js?' + Date.now())

simulator = Elm.Simulator.init()

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

  if (busy) {
    self.postMessage({results: "error - simulator already busy"})
  }
  else {
    // give requested matchup to simulator
    simulator.ports.initSim.send(data)
    busy = true
    began_at = Date.now()
    console.log(began_at)
  }
}, false);
