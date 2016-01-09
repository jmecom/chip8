function step() {
  // Fetch and execute
  var op = memory[pc] << 8 | memory[pc + 1];
  ops[decode(op)](op);

  // Update timers (sound unused)
  if (delay > 0) {
    delay--;
  }
  
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

function main() { 
  setInterval(function() { step() }, 0);
}

init_graphics();
