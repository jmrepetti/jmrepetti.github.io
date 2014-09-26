---
layout: default
title:  "Screen cheatsheet"
date:   2014-02-01
categories: howtos
---
# {{page.title}}
[Chuck](http://chuck.cs.princeton.edu/) is a concurrent, strongly-typed, 
strongly-timed, programming language for real-time sound synthesis and 
music creation. What? strongly-timed? Yes, time is really important in Chuck. 
You will need to advance time in order to play music in Chuck.  

For example, this is a typical Chuck expression:

    1::second => now;

That is, let the time pass by 1 second. If you execute this program, it will run for 
1 second and finish. Is not "sleep 1 second". Take a look at this example:

    SinOsc s;
    0.6 => s.gain; 
    440 => s.freq; 
    s => dac;
    2::second => now;

This code instantiate a **_SinOsc_**(Sine Oscillator) object **_s_**, sets the 
parameters **_gain_** and **_freq_**, connect the output of **_s_** to the
audio output **_dac_** (digital/analog converter), normally your speakers or headphones, 
and then, let the time run for 2 seconds. Now you can tune your guitar. 


## Download and Installation

Visit [http://chuck.cs.princeton.edu/release/](http://chuck.cs.princeton.edu/release/) to select your platform and installation method.

MiniAudicle, is a nice IDE to program in Chuck. I recommend to install it, it comes with 
a lot of code examples that yuo can learn from. 


## Running Chuck code

If you are in MiniAudicle, you can paste the previos example in MiniAudicle editor windows, start the Virtual Machine and press the "Add Shred"
button to execute the program. 
To load examples that came with MiniAudicle,  go to File > Open Example, or browse to /Applications/miniAudicle.app/Contents/Resources/examples
if you are in OSX.

To run from command line, copy the code into a file, let say _sample.ck_, and run the program like this:

    $ chuck sample.ck

Check command line options for Chuck here: [http://chuck.cs.princeton.edu/doc/program/otfp.html](http://chuck.cs.princeton.edu/doc/program/otfp.html)

## Connecting you guitar


With Chuck you can generate, process and analyse audio signals using [Unit Generators](http://chuck.cs.princeton.edu/doc/language/ugen.html)(Ugen)
and [Unit Analyzers](http://chuck.cs.princeton.edu/doc/language/uana.html)(UAnae). 
Also, you can use different devices like Midi Controllers, Joysticks, Keyboard, 
Mouse, to control parameters or trigger Chucks programs in real time. 

In this simple example I'll show you how to apply some effects to the audio input, and change
parameters while playing using the keyboard.

I used my guitar connected through USB audio interface, but you can scream 
to the mic of the computer and listen the chain of effects using
headphones. Using the arrows keys, UP and DOWN, you can control the input gain.


    //HID devices
    HidMsg msg;
    Hid hiKb;
    
    //UGens
    Echo echo;
    JCRev reverb;
    Gain adcGain;
    
    // Set Gain .gain parameter
    1.0 => adcGain.gain;
    
    // Set Delay parameters .max and .delay
    .45::second => echo.max => echo.delay;
    
    // Open the device
    0 => int device;
    if( !hiKb.openKeyboard( device ) ) me.exit();
    
    // Patch
    adc => adcGain => echo => reverb => dac; 
    
    // Define function gainController
    fun void gainController(Gain g) {
      
      while(true) {
        // Event from the keyboard received
        hiKb => now;
    
        if (hiKb.recv(msg)) {
          if( msg.isButtonDown() ) {
        
            // Down Arrow Key
            if (msg.which == 81) {
                adcGain.gain() - 0.5 => adcGain.gain;     
            }
        
            // Up Arrow Key
            if (msg.which == 82) {
                adcGain.gain() + 0.5 => adcGain.gain;     
            }
          }
        }
      }
    }
    
    //spawn gainController function.
    spork ~ gainController(adcGain);
    
    // infinite time loop
    while( true ) {
      1::second => now;
    }
    

Ejecute this example from command line or Miniaudicle, play your guitar and rock!


## Other Examples

I'll try to update this [repo](https://github.com/jmrepetti/chuck_examples) with more examples.

- Play random notes using the Oscillator: [Example Code](https://github.com/jmrepetti/chuck_examples/blob/master/mi_minor_random.ck)



Have fun with Chuck.
