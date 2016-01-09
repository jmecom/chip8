/** 
 * opcodes.js
 * Implements CHIP-8 opcodes and loads
 * them into a lookup table. 
 * See https://en.wikipedia.org/wiki/CHIP-8
 * for a list of what each opcode does. 
 */

function op_00E0(op) {
  display.fill(0);
  draw();
  pc += 2;
}

function op_00EE(op) {
  sp--;
  pc = stack[sp];
  pc += 2;
}

function op_1NNN(op) {
  pc = op & 0x0FFF;
}

function op_2NNN(op) {
  stack[sp] = pc;
  sp++;           
  pc = op & 0x0FFF;
}

function op_3XNN(op) {
  if (V[(op & 0x0F00) >> 8] == (op & 0x00FF)) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_4XNN(op) {
  if (V[(op & 0x0F00) >> 8] != (op & 0x00FF)) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_5XY0(op) {
  if (V[(op & 0x0F00) >> 8] == V[(op & 0x00F0) >> 4]) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_6XNN(op) {
  V[(op & 0x0F00) >> 8] = op & 0x00FF;
  pc += 2;
}

function op_7XNN(op) {
  V[(op & 0x0F00) >> 8] += op & 0x00FF;
  pc += 2;
}

function op_8XY0(op) {
  V[(op & 0x0F00) >> 8] = V[(op & 0x00F0) >> 4];
  pc += 2;
}

function op_8XY1(op) {
  V[(op & 0x0F00) >> 8] |= V[(op & 0x00F0) >> 4];
  pc += 2;
}

function op_8XY2(op) {
  V[(op & 0x0F00) >> 8] &= V[(op & 0x00F0) >> 4];
  pc += 2;
}

function op_8XY3(op) {
  V[(op & 0x0F00) >> 8] ^= V[(op & 0x00F0) >> 4];
  pc += 2;
}

function op_8XY4(op) { 
  if (V[(op & 0x00F0) >> 4] > (0xFF - V[(op & 0x0F00) >> 8])) { 
    V[15] = 1;
  } else {
    V[15] = 0;         
  }
  V[(op & 0x0F00) >> 8] += V[(op & 0x00F0) >> 4];
  pc += 2;  
}

function op_8XY5(op) {
  if (V[(op & 0x00F0) >> 4] > V[(op & 0x0F00) >> 8]) {
    V[15] = 0;
  } else { 
    V[15] = 1;         
  }
  V[(op & 0x0F00) >> 8] -= V[(op & 0x00F0) >> 4];
  pc += 2;
}

function op_8XY6(op) {
  V[15] = V[(op & 0x0F00) >> 8] & 0x1;
  V[(op & 0x0F00) >> 8] >>= 1;
  pc += 2;
}

function op_8XY7(op) {
  if (V[(op & 0x0F00) >> 8] > V[(op & 0x00F0) >> 4]) {
    V[15] = 0; 
  } else {
    V[15] = 1;
  }
  V[(op & 0x0F00) >> 8] = V[(op & 0x00F0) >> 4] - V[(op & 0x0F00) >> 8];        
  pc += 2;
}

function op_8XYE(op) {
  V[15] = V[(op & 0x0F00) >> 8] >> 7;
  V[(op & 0x0F00) >> 8] <<= 1;
  pc += 2;
}

function op_9XY0(op) {
  if (V[(op & 0x0F00) >> 8] != V[(op & 0x00F0) >> 4]) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_ANNN(op) {
  I = op & 0x0FFF;
  pc += 2;
}

function op_BNNN(op) {
  pc = (op & 0x0FFF) + V[0];
}

function op_CXNN(op) {
  V[(op & 0x0F00) >> 8] = (Math.random() * 255) & (op & 0x00FF);
  pc += 2;
}

function op_DXYN(op) {
  var Vx = V[(op & 0x0F00) >> 8],
      Vy = V[(op & 0x00F0) >> 4],
      h  = op & 0x000F,
      pixel;

  V[15] = 0;
  for (var y = 0; y < h; y++) {
    pixel = memory[I + y];
    for (var x = 0; x < 8; x++) {
      if ((pixel & (128 >> x)) != 0) {
        if (display[(Vx + x + ((Vy + y) * 64))] == 1) {
          V[15] = 1;
        }
        display[(Vx + x + ((Vy + y) * 64))] ^= 1;
      }
    }
  }
  draw();
  pc += 2;
}

function op_EX9E(op) {
  if (keys[V[(op & 0x0F00) >> 8]] != 0) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_EXA1(op) {
  if (keys[V[(op & 0x0F00) >> 8]] == 0) {
    pc += 4;
  } else {
    pc += 2;
  }  
}

function op_FX07(op) {
  V[(op & 0x0F00) >> 8] = delay;
  pc += 2;
}

function op_FX0A(op) {
  var key_down = false;

  for (var i = 0; i < 16; i++) {
    if (keys[i] == 1) {
      key_down = true;
      V[(op & 0x0F00) >> 8] = i;
    }
  }
  
  if (key_down) {
    pc += 2;
  }
}

function op_FX15(op) {
  delay = V[(op & 0x0F00) >> 8];
  pc += 2;
}

function op_FX18(op) {
  sound = V[(op & 0x0F00) >> 8];
  pc += 2;
}

function op_FX1E(op) {
  I += V[(op & 0x0F00) >> 8];
  if (I + V[(op & 0x0F00) >> 8] > 0xFFF) {
    V[15] = 1;
  } else {
    V[15] = 0;
  }
  pc += 2;
}

function op_FX29(op) {
  I = V[(op & 0x0F00) >> 8] * 0x5;
  pc += 2;
}

function op_FX33(op) {
  memory[I]   =  V[(op & 0x0F00) >> 8] / 100;
  memory[I+1] = (V[(op & 0x0F00) >> 8] / 10)  % 10;
  memory[I+2] = (V[(op & 0x0F00) >> 8] % 100) % 10;         
  pc += 2;
}

function op_FX55(op) {
  for (var i = 0; i <= ((op & 0x0F00) >> 8); i++) {
    memory[I+i] = V[i]; 
  }
}

function op_FX65(op) {
   for (var i = 0; i <= ((op & 0x0F00) >> 8); i++) {
    V[i] = memory[I+i];
  }
}

// Opcode lookup table
var ops = [
  op_00E0, op_00EE, op_1NNN, op_2NNN, // 0  - 3
  op_3XNN, op_4XNN, op_5XY0, op_6XNN, // 4  - 7
  op_7XNN, op_8XY0, op_8XY1, op_8XY2, // 8  - 11
  op_8XY3, op_8XY4, op_8XY5, op_8XY6, // 12 - 15
  op_8XY7, op_8XYE, op_9XY0, op_ANNN, // 16 - 19
  op_BNNN, op_CXNN, op_DXYN, op_EX9E, // 20 - 23
  op_EXA1, op_FX07, op_FX0A, op_FX15, // 24 - 27
  op_FX18, op_FX1E, op_FX29, op_FX33, // 28 - 31
  op_FX55, op_FX65                    // 32 - 33
];
