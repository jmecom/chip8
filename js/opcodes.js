function op_00E0(op) {
  pc = stack[sp];
  sp--;
}

function op_00EE(op) {
  display.fill(0);
}

function op_1NNN(op) {
  pc = op & 0x0FFF;
}

function op_2NNN(op) {
  stack[sp] = pc;
  sp++;           // TODO switched?
  pc = op & 0x0FFF;
}

function op_3XNN(op) {
  if (V[op & 0x0F00] == (op & 0x00FF)) {
    pc += 2;
  } 
}

function op_4XNN(op) {
  if (V[op & 0x0F00] != (op & 0x00FF)) {
    pc += 2;
  } 
}

function op_5XY0(op) {
  if (V[op & 0x0F00] == (V[op & 0x00F0])) {
    pc += 2;
  }
}

function op_6XNN(op) {
  V[op & 0x0F00] = (op & 0x00FF);
}

function op_7XNN(op) {
  V[op & 0x0F00] = V[op & 0x0F00] + (op & 0x00FF);
}

function op_8XY0(op) {
  V[op & 0x0F00] = V[op & 0x00F0];
}

function op_8XY1(op) {
  V[op & 0x0F00] = V[op & 0x0F00] | V[op & 0x00F0];
}

function op_8XY2(op) {
  V[op & 0x0F00] = V[op & 0x0F00] & V[op & 0x00F0]; 
}

function op_8XY3(op) {
  V[op & 0x0F00] = V[op & 0x0F00] ^ V[op & 0x00F0]; 
}

function op_8XY4(op) { // TODO make sure this is right
  var res = V[op & 0x0F00] + V[op & 0x00F0];
  V[op & 0x0F00] = res; 
  if (res > 255) {
    V[15] = 1;
  } else {
    V[15] = 0;
  }
}

function op_8XY5(op) {
  var Vx = V[op & 0x0F00],
      Vy = V[op & 0x00F0];
  Vx = Vx - Vy;
  V[15] = Vx > Vy ? 1 : 0;
}

function op_8XY6(op) {
  var Vx = V[op & 0x0F00];
  V[15] = (Vx = Vx >> 1) == 1 ? 1 : 0;
}

function op_8XY7(op) {
  var Vx = V[op & 0x0F00],
      Vy = V[op & 0x00F0];
  Vx = Vy - Vx;
  V[15] = Vy > VX ? 1 : 0;
}

function op_8XYE(op) {
  var Vx = V[op & 0x0F00];
  V[15] = (Vx = Vx << 1) == 1 ? 1 : 0;
}

function op_9XY0(op) {
  var Vx = V[op & 0x0F00],
      Vy = V[op & 0x00F0];
  if (Vx != Vy) {
    pc += 2;
  }
}

function op_ANNN(op) {
  I = op & 0x0FFF;
}

function op_BNNN(op) {
  pc = (op & 0x0FFF) + V[0];
}

function op_CXNN(op) {
  var Vx = V[op & 0x0F00];
  Vx = (Math.random() * 255) & (op * 0x00FF);
}

function op_DXYN(op) {

}

function op_EX9E(op) {}
function op_EXA1(op) {}
function op_FX07(op) {}
function op_FX0A(op) {}
function op_FX15(op) {}
function op_FX18(op) {}
function op_FX1E(op) {}
function op_FX29(op) {}
function op_FX33(op) {}
function op_FX55(op) {}
function op_FX65(op) {}

var ops = [
  op_00E0, op_00EE, op_1NNN, op_2NNN,
  op_3XNN, op_4XNN, op_5XY0, op_6XNN,
  op_7XNN, op_8XY0, op_8XY1, op_8XY2,
  op_8XY3, op_8XY4, op_8XY5, op_8XY6,
  op_8XY7, op_8XYE, op_9XY0, op_ANNN,
  op_BNNN, op_CXNN, op_DXYN, op_EX9E,
  op_EXA1, op_FX07, op_FX0A, op_FX15,
  op_FX18, op_FX1E, op_FX29, op_FX33,
  op_FX55, op_FX65
];
