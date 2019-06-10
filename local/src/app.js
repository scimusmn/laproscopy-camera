'use strict';
var demoStr = "Put the things on the hooks! todo demo vid below";
var liveFeed = "*Live Feed*";
var camTimeoutID;

const Gpio = require('onoff').Gpio; // Import the onoff library
var remote = require('electron').remote;

var LED = new Gpio(27, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'falling', {debounceTimeout: 20}); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

LED.writeSync(1); //turn LED on or off depending on the button state (0 or 1)
var process = remote.process;

//remote.getCurrentWindow().closeDevTools();

var obtains = [
  'µ/components/camera.js',
];

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  clearTimeout(camTimeoutID);
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  console.log('button pressed'); //indicate press
  LED.writeSync(0); //turn LED on or off depending on the button state (0 or 1)
  document.getElementById("LaproCam").style.visibility = "visible";
  document.getElementById("topText").innerHTML = liveFeed;
  camTimeoutID = setTimeout(camStandby, 10000);
});

function unexportOnClose() { //function to run when exiting program
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
};


function camStandby() {
  LED.writeSync(1);
  document.getElementById("LaproCam").style.visibility = "hidden";
  document.getElementById("topText").innerHTML = demoStr;
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c

obtain(obtains, ()=> {

  exports.app = {};

  exports.app.start = ()=> {

    console.log('started');

    document.onkeypress = (e)=> {

    };

    document.onkeyup = (e)=> {
      if (e.which == 73 && e.getModifierState('Control') &&  e.getModifierState('Shift')) {
        remote.getCurrentWindow().toggleDevTools();
      }
    };

    process.on('SIGINT', ()=> {
      process.nextTick(function () { process.exit(0); });
    });
  };

  provide(exports);
});
