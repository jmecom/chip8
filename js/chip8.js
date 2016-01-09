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
  for (var i = 0; i < 9000000; i++) {
    var op = memory[pc] << 8 | memory[pc + 1];
    ops[decode(op)](op);
    

    // console.log({
    //   op:op.toString(16), 
    //   pc:pc.toString(16), 
    //   I:I.toString(16), 
    //   sp:sp.toString(16),
    //   V:V,
    //   stack:stack,
    //   memory:memory,
    //   display:display,
    // });
  }
}

/* Start the emulator */
main();