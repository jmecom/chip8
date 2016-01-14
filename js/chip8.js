function step() {
  var op = memory[pc] << 8 | memory[pc + 1];
  ops[decode(op)](op);
  if (delay > 0) delay--;
}

function main() { 
  setInterval(function() { step() }, 0);
}

init_graphics(); // To give an initial black screen
