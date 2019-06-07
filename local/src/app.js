'use strict';
const Gpio = require('onoff').Gpio; // Import the onoff library
var remote = require('electron').remote;

var LED = new Gpio(27, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

var process = remote.process;

//remote.getCurrentWindow().closeDevTools();

var obtains = [
  'µ/components/camera.js',
];

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  LED.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
});

function unexportOnClose() { //function to run when exiting program
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
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
