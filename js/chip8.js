function step() {
  // Fetch and execute
  var op = memory[pc] << 8 | memory[pc + 1];
  ops[decode(op)](op);
  // console.log(decode(op));

  // Update timers (sound unused for now)
  if (delay > 0) {
    delay--;
  }
}

function main() { 
  setInterval(function() { step() }, 0);
}

init_graphics(); // To give an initial black screen
