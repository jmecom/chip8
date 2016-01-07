/** 
 * init: gives initial values to Chip8 internals
 */
function init() {
  init_graphics();
  load_program();
}

function load_program() {
  for (var i = 0; i < program.length; i++) {
    memory[i + 512] = program[i];
  }
}

/**
 * step: performs one step of the fetch and execute cycle
 */
function step() {
  var op = memory[pc] << 8 | memory[pc + 1];
  ops[decode(op)](op);
  pc += 2; 
}

function main() { 
  init();

  // while(true) {
    step();
  // }

  draw();

  return 0;
}

main();