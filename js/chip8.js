// TODO: be able to load from file, or from 
//       user input
function load_program() {
  for (var i = 0; i < program.length; i++) {
    memory[i + 512] = program[i];
  }
}

function main() { 
  init_graphics();
  load_program();

  // while(true) {
  var op = memory[pc] << 8 | memory[pc + 1];
  ops[decode(op)](op);
  // }
}

/* Start the emulator */
main();