/** 
 * opcodes.js
 * Implements CHIP-8 opcodes and loads
 * them into a lookup table. 
 * See https://en.wikipedia.org/wiki/CHIP-8
 * for a list of what each opcode does. 
 */

///////////////////////////////////////////
//                "Macros"               //
///////////////////////////////////////////

function X(op) {
  return (op & 0x0F00) >> 8;
}

function Y(op) {
  return (op & 0x00F0) >> 4;
}

function NN(op) {
  return op & 0x00FF;
}

function NNN(op) {
  return op & 0x0FFF;
}

////////////////////////////////////////////
//                 Opcodes                //      
////////////////////////////////////////////

function op_0NNN(op) {
  // Unused opcode
  // console.log(op.toString(16));
}

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
  pc = NNN(op);
}

function op_2NNN(op) {
  stack[sp] = pc;
  sp++;           
  pc = NNN(op);
}

function op_3XNN(op) {
  if (V[X(op)] == NN(op)) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_4XNN(op) {
  if (V[X(op)] != NN(op)) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_5XY0(op) {
  if (V[X(op)] == V[Y(op)]) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_6XNN(op) {
  V[X(op)] = NN(op);
  pc += 2;
}

function op_7XNN(op) {
  V[X(op)] += NN(op);
  pc += 2;
}

function op_8XY0(op) {
  V[X(op)] = V[Y(op)];
  pc += 2;
}

function op_8XY1(op) {
  V[X(op)] |= V[Y(op)];
  pc += 2;
}

function op_8XY2(op) {
  V[X(op)] &= V[Y(op)];
  pc += 2;
}

function op_8XY3(op) {
  V[X(op)] ^= V[Y(op)];
  pc += 2;
}

function op_8XY4(op) { 
  if (V[Y(op)] > (0xFF - V[X(op)])) { 
    V[15] = 1;
  } else {
    V[15] = 0;         
  }
  V[X(op)] += V[Y(op)];
  pc += 2;  
}

function op_8XY5(op) {
  if (V[Y(op)] > V[X(op)]) {
    V[15] = 0;
  } else { 
    V[15] = 1;         
  }
  V[X(op)] -= V[Y(op)];
  pc += 2;
}

function op_8XY6(op) {
  V[15] = V[X(op)] & 0x1;
  V[X(op)] >>= 1;
  pc += 2;
}

function op_8XY7(op) {
  if (V[X(op)] > V[Y(op)]) {
    V[15] = 0; 
  } else {
    V[15] = 1;
  }
  V[X(op)] = V[Y(op)] - V[X(op)];        
  pc += 2;
}

function op_8XYE(op) {
  V[15] = V[X(op)] >> 7;
  V[X(op)] <<= 1;
  pc += 2;
}

function op_9XY0(op) {
  if (V[X(op)] != V[Y(op)]) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_ANNN(op) {
  I = NNN(op);
  pc += 2;
}

function op_BNNN(op) {
  pc = (NNN(op)) + V[0];
}

function op_CXNN(op) {
  V[X(op)] = (Math.random() * 255) & NN(op);
  pc += 2;
}

function op_DXYN(op) {
  var Vx = V[X(op)],
      Vy = V[Y(op)],
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
  // console.log('!= : ', op.toString(16), V[X(op)], keys[V[X(op)]]);
  if (keys[V[X(op)]] != 0) {
    pc += 4;
  } else {
    pc += 2;
  }
}

function op_EXA1(op) {
  // console.log('== : ', op.toString(16), V[X(op)], keys[V[X(op)]]);
  if (keys[V[X(op)]] == 0) {
    pc += 4;
  } else {
    pc += 2;
  }  
}

function op_FX07(op) {
  V[X(op)] = delay;
  pc += 2;
}

function op_FX0A(op) {
  var key_down = false;
  for (var i = 0; i < 16; i++) {
    if (keys[i] != 0) {
      V[X(op)] = i;
      key_down = true;
    }
  }
  
  if (!key_down) {
    return;
  }
  pc += 2;
}

function op_FX15(op) {
  delay = V[X(op)];
  pc += 2;
}

function op_FX18(op) {
  sound = V[X(op)];
  pc += 2;
}

function op_FX1E(op) {
  if (I + V[X(op)] > 0xFFF) {
    V[15] = 1;
  } else {
    V[15] = 0;
  }
  I += V[X(op)];
  pc += 2;
}

function op_FX29(op) {
  I = V[X(op)] * 0x5;
  pc += 2;
}

function op_FX33(op) {
  memory[I]   =  V[X(op)] / 100;
  memory[I+1] = (V[X(op)] / 10)  % 10;
  memory[I+2] = (V[X(op)] % 100) % 10;         
  pc += 2;
}

function op_FX55(op) {
  for (var i = 0; i <= X(op); i++) {
    memory[I + i] = V[i]; 
  }
  pc += 2;
}

function op_FX65(op) {
   for (var i = 0; i <= X(op); i++) {
    V[i] = memory[I + i];
  }
  I += X(op) + 1;
  pc += 2;
}

////////////////////////////////////////////
//           Opcode lookup table          // 
////////////////////////////////////////////

var ops = [
  op_00E0, op_00EE, op_1NNN, op_2NNN, 
  op_3XNN, op_4XNN, op_5XY0, op_6XNN, 
  op_7XNN, op_8XY0, op_8XY1, op_8XY2, 
  op_8XY3, op_8XY4, op_8XY5, op_8XY6,
  op_8XY7, op_8XYE, op_9XY0, op_ANNN,
  op_BNNN, op_CXNN, op_DXYN, op_EX9E, 
  op_EXA1, op_FX07, op_FX0A, op_FX15, 
  op_FX18, op_FX1E, op_FX29, op_FX33, 
  op_FX55, op_FX65, op_0NNN          
];