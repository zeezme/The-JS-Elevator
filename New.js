var five = require("johnny-five");
const keypress = require("keypress");
const { Board, Stepper } = require("johnny-five");
var board = new five.Board({
  port: "COM3"
});

board.on("ready", function () {

    //Declaração LCD
    var lcd = new five.LCD({
        controller: "PCF8574T"
    });
    //Inicialização do Teclado como Imput
    keypress(process.stdin);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);

    //declaração dos relays
    var r1 = new five.Relay(10); //pino 10
    var r2 = new five.Relay(11);//pino 11
    var joints = new five.Relays([r1, r2]);

    //declaração do motor
    const stepper = new Stepper({
        type: Stepper.TYPE.DRIVER,
        stepsPerRev: 200,
        pins: {
            step: 2,
            dir: 6
        }
    })

    //Início do código

    r1.toggle(); 

    //Método que mostra as informações do LCD
    var informar = {
        up: function () { lcd.print("SUBINDO");},
        down: function () { lcd.print("Descendo");},
        quit: function () { lcd.print("Desconectando");}
    }

    //Informações de suporte
    console.log("\n");
    console.log("|---------------------------------|");
    console.log("|              INFO               |");
    console.log("|---------------------------------|");
    console.log("| P ->_______________________SUBIR|");
    console.log("| O ->______________________DESCER|");
    console.log("| E ->________PARADA DE EMERGÊNCIA|");
    console.log("| Q ->_________________Desconectar|");
    console.log("|---------------------------------|");
    console.log("\n");

     //Método de direcionamento do motor
    var elevador = {
        var: EP = 0,
        subir: function () {
            stepper.step({
                steps: 6500,
                direction: Stepper.DIRECTION.CW //CW SOBE CCW DESCE
            }, () => console.log("PRONTO #1"));
        },
        descer: function () {
            stepper.step({
                steps: 6500,
                direction: Stepper.DIRECTION.CCW //CW SOBE CCW DESCE
            }, () => console.log("PRONTO #1"));
        },
       parar: function Emergency () {EP===0?(r1.open(),EP=1):(r1.close(),EP=0)}
    }
    process.stdin.on("keypress", (ch, key) => {
    function buttons() {
        return key.name === 'p'?elevador.subir()
              :key.name === 'o'?elevador.descer()
              :key.name === 'e'?elevador.parar()
              :null;
    }
    stepper.rpm(240).ccw().accel(1600).decel(1600); //config do motor
    buttons();
        
    })
})
