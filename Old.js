var five = require("johnny-five");
const keypress = require("keypress");
const { Board, Stepper } = require("johnny-five");
var board = new five.Board({
  port: "COM3"
});

board.on("ready", function () {
  var informar = {
    up: function () { lcd.print("SUBINDO"); }
    , down: function () { lcd.print("Descendo"); }
    , quit: function () { lcd.print("Desconectando"); }
  }

  var lcd = new five.LCD({
    controller: "PCF8574T"
  });

  keypress(process.stdin);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);

  var r1 = new five.Relay(10);
  var r2 = new five.Relay(11);

  var joints = new five.Relays([r1, r2]);

  r1.toggle();


  const stepper = new Stepper({
    type: Stepper.TYPE.DRIVER,
    stepsPerRev: 200,
    pins: {
      step: 2,
      dir: 6
    }
  });
  console.log("\n");
  console.log("|---------------------------------|");
  console.log("|              INFO               |");
  console.log("|---------------------------------|");
  console.log("|                                 |");
  console.log("| P ->          SUBIR             |");
  console.log("| O ->          DESCER            |");
  console.log("| E ->   PARADA DE MERGÊNCIA      |");
  console.log("| Q ->           SAIR             |");
  console.log("|---------------------------------|");




  var apertadoP = new Boolean(false);
  var apertadoO = new Boolean(true);


  stepper.rpm(180).ccw().accel(1600).decel(1600);
  process.stdin.on("keypress", (ch, key) => {

    if (!key) {
      return;
    }

    //------------------BOOLS--------------------------
    if (key.name === "p") { apertadoP = !apertadoP }
    if (key.name === "o") { apertadoO = !apertadoO }
    //-------------------------------------------------


    if (apertadoP == true) {
      console.log("\n");
      console.log("SUBINDO #3");


      stepper.step({
        steps: 6500,
        direction: Stepper.DIRECTION.CW //CW SOBE CCW DESCE
      }, () => console.log("PRONTO #1"));

      apertadoP = !apertadoP
    }
    if (apertadoO == false) {
      //informar();
      console.log("\n");
      console.log("DESCENDO #2");
      stepper.step({
        steps: 6500,
        direction: Stepper.DIRECTION.CCW //CW SOBE CCW DESCE
      }, () => console.log("PRONTO #1"));

      apertadoO = !apertadoO
    }

    //BOTÃO PARADA DE EMERGÊNCIA

    var eP = new Boolean(0);  //botão foi apertado? | 0 = Não | 1 = SIM |

    if (key.name === "e" && eP == 0) { 
      lcd.home().print("ELEVADOR PARADO");
      r1.open();//para IGBT
      eP = 1    //diz que botão foi apertado

    } else { 
      eP = 0 //já que o botão está com o status de apertado, muda o bool para 0. 
      r1.close();//volta a IGBT"
      lcd.clear();//limpa LCD
    }
    if (key.name === "o") {
      informar.down();
    }
    if (key.name === "p") {
      informar.up();
    }
    if (key.name === "q") {
      informar.quit();
      r1.open()                                    //tempo para desconectar\/
      setTimeout(() => { lcd.clear(); setTimeout(() => { process.exit(); }, 1000); }, 5000);//tempo da mensagem
      //melhorar /\ utilizando função para dar o delay

    }

  });

});



