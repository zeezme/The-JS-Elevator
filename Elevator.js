const keypress = require("keypress");
const five = require("johnny-five");
const { Board, Stepper } = require("johnny-five");
const { Console } = require("console");
var board = new five.Board({
  port: "COM3"
});

board.on("ready", () => {

 //--------Inicialização dos módulos físicos--------

  keypress(process.stdin);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);

  const stepper = new Stepper({
    type: Stepper.TYPE.DRIVER,
    stepsPerRev: 200,
    pins: {
      step: 2,
      dir: 6
    }
  })

  //------------------------------------------------

  const spdt1 = new five.Switch(12);//1° limite.
  const spdt1 = new five.Switch(11);//2° limite.
  const spdt3 = new five.Switch(13);//3° limite.

  var limite = 0;//Andar em que a cabine está.

  //Comandos Teclado
  process.stdin.on("keypress", (ch, key) => {
    function buttons() {
      return key.name === 'p' ? elevador.subir(6500)
        : key.name === 'o' ? elevador.descer(6500)
          : key.name === 'l' ? (limite = 0, cabine.localizar())
            : key.name === 'v' ? (console.log("<<Limite = " + limite + ">>"))
              : key.name === 'a' ? (cabine.ir(1))
                : key.name === 'b' ? (cabine.ir(2))
                  : key.name === 'c' ? (cabine.ir(3))
                    : null;
    }
  })

  //Limites de andar.
  spdt1.on("open", () => null);
  spdt1.on("close", () => limite = 1);

  spdt2.on("open", () => null);
  spdt2.on("close", () => limite = 2);

  spdt3.on("open", () => null);
  spdt3.on("close", () => limite = 3);

  //Comandos básicos do motor
  var elevador = {
    subir: (valor) => {
      stepper.step({
        steps: valor,
        direction: Stepper.DIRECTION.CW //CW SOBE CCW DESCE
      }, () => (console.log("Trabalhando...")));
    },
    descer: (valor) => {
      stepper.step({
        steps: valor,
        direction: Stepper.DIRECTION.CCW //CW SOBE CCW DESCE
      }, () => (console.log("Trabalhando...")));
    },
  }

  var cabine = {
    localizar: () => {
      if (limite === 0) { (elevador.subir(300)) }
      if (limite === 0) { setTimeout(() => { cabine.localizar(); }, 1000) }
      else { console.log("\n <<A cabine está no " + limite + "° andar>>") }
      return;
    },
    ir: (andar) => {
      //Análise Combinatória
      //Sugestão: Análisar a possiblidade de utilizar Ternary.
      if (limite == 1 && andar == 2) { elevador.subir(2900) }
      if (limite == 1 && andar == 3) { elevador.subir(6400) }
      if (limite == 2 && andar == 1) { elevador.subir(2900) }
      if (limite == 2 && andar == 3) { elevador.subir(6400) }
      if (limite == 3 && andar == 1) { elevador.descer(6400) }
      if (limite == 3 && andar == 2) { elevador.descer(2900) }
      if (limite == andar) { console.log("\n <<Cabine já está no andar!>>") }
      else { null }

    }
  }

  //Inicialização botões.
  buttons();

})

