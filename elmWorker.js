importScripts('workerpool.js?' + Date.now())
// This is a (workerpool)[https://github.com/josdejong/workerpool] worker

importScripts('sim.js?' + Date.now())
// This is the compiled elm simulator

simulator = Elm.Simulator.init()

function initSim(sim, stamps) {
  return sendPort(simulator.ports.initSim, sim, stamps)
}

function sendPort(the_port, sim, stamps) {

  return new Promise(function (resolve, reject) {

    stamps.time_begun = Date.now()
    var port = simulator.ports.simulationStats.subscribe(function(data) {
      stamps.time_finished = Date.now()
      resolve( {result: data, stamps: stamps } )
    })
    the_port.send(sim)
  })

}

workerpool.worker({
  initSim: initSim
});
