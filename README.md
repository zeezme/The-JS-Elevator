```diff
- File in construction
```
<details><summary> Basic Knowledge</summary>
<p>
  
It is recommend having at least basic knowledge in JavaScript or any other programing language before taking this tutorial.

Used methods:

- Api’s
- Variables
- Functions
- Objects
- Methods
- Data Types
- Arrow functions
- Conditionals and ternaries

</p>
</details>

# A JS ELEVATOR

This project consists in the creation of a miniature elevator with focus on programming. The biggest objective is to improve our programming skills as well as to get some fun doing it.
To develop this setup, I have used some few things that may or may not be expensive (it really depends on where you live).

# Required Hardware

<details><summary>List</summary>
<p>

- Arduino UNO board.
- Relay board
- Power Supply
- switching power supply
- Stepper Motor
- Pololu A4988 driver
- Stepper Motor Driver Expansion Board
- Timing Pulley
- Timing Pulley Belt
- Some carboard boxes or plywood
- Multimeter
- Soldering iron

</p>
</details>

# Assembly

# Coding
After assembling the elevator, you will need to write some code, for that I recommend using Visual Studio Code.
Essentially, when working with an Arduino you will probably use their proprietary language, which is based on C, but in this tutorial we will be using JavaScript, since the language actually doesn’t provide native support for Arduino boards the Johnny-Five API is required to make everything work properly.
<details><summary>Required Software</summary>
<p>
  
- Visual Studio Code [Click-Me](https://code.visualstudio.com/)
- NODE.JS [Click-Me](https://nodejs.org/en/download/)
-	Johnny-Five API [Click-Me](https://github.com/rwaldron/johnny-five/wiki/Getting-Started)
- KeyPress [Click-Me](https://www.npmjs.com/package/keypress)
  
</p>
</details>


After installing the J5 API, you will need to write some code lines in order to make your program run it.
```javascript

const keypress = require("keypress"); //Include keypress module in the object.
const { five, Board, Stepper } = require("johnny-five"); //Include Johnny-Five module in the object.
var board = new five.Board({
  port: "COM3" //Change COM3 with the port you Arduino is connected to.
});

```

Board Start Method:
```javascript
board.on("ready", () => {
//code here
}
```







