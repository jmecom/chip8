function decode(op) {
  switch(op & 0xF000) { 
    case 0x0000:
      switch (op & 0x000F) {
        case 0x0000: // 00E0  Clears the screen. 
          return 0;
        break;

        case 0x000E: // 00EE  Returns from a subroutine.
          return 1;
        break;
      }
    break;

    case 0x1000: // 1NNN  Jumps to address NNN.
      return 2;
    break;

    case 0x2000: // 2NNN  Calls subroutine at NNN.
      return 3;
    break;

    case 0x3000: // 3XNN  Skips the next instruction if VX equals NN.
      return 4;
    break;

    case 0x4000: // 4XNN  Skips the next instruction if VX doesn't equal NN.
      return 5;
    break;

    case 0x5000: // 5XY0  Skips the next instruction if VX equals VY.
      return 6;
    break;

    case 0x6000: // 6XNN  Sets VX to NN.
      return 7;
    break;

    case 0x7000: // 7XNN  Adds NN to VX.
      return 8;
    break;

    case 0x8000:
      switch (op & 0x000F) {
        case 0x0000: // 8XY0  Sets VX to the value of VY.
          return 9;
        break;

        case 0x0001: // 8XY1  Sets VX to VX or VY.
          return 10;
        break;

        case 0x0002: // 8XY2  Sets VX to VX and VY.
          return 11;
        break;

        case 0x0003: // 8XY3  Sets VX to VX xor VY.
          return 12;
        break;

        case 0x0004: // 8XY4  Adds VY to VX. VF is set to 1 when there's 
          return 13; //       a carry, and to 0 when there isn't.
        break;

        case 0x0005: // 8XY5 VY is subtracted from VX. VF is set to 0 when 
          return 14; //      there's a borrow, and 1 when there isn't.
        break;

        case 0x0006: // 8XY0  Sets VX to the value of VY.
          return 15;
        break;

        case 0x0007: // 8XY0  Sets VX to the value of VY.
          return 16;
        break;

        case 0x000E: // 8XY0  Sets VX to the value of VY.
          return 17;
        break;
      }
    break;

    case 0x9000: // 9XY0  Skips the next instruction if VX doesn't equal VY.
      return 18;
    break;

    case 0xA000: // ANNN  Sets I to the address NNN.
      return 19;
    break;

    case 0xB000: // BNNN  Jumps to the address NNN plus V0.
      return 20;
    break;

    case 0xC000: // CXNN  Sets VX to the result of a bitwise and 
      return 21; //       operation on a random number and NN.
    break;

    case 0xD000: // DXYN  Sprites stored in memory at location in index 
      return 22; //       register (I), 8bits wide. See wiki.
    break;

    case 0xE000:
      switch (op & 0x000F) {
        case 0x000E: // EX9E  Skips the next instruction if the key stored in VX is pressed.
          return 23;
        break;
        case 0x0001: // EXA1  Skips the next instruction if the key stored in VX isn't pressed.
          return 24;
        break;
      }
    break;

    case 0xF000:
      switch (op & 0x00FF) {
        case 0x0007: // FX07  Sets VX to the value of the delay timer. 
          return 25;
        break;
        case 0x000A: // FX0A  A key press is awaited, and then stored in VX.
          return 26;
        break; 
        case 0x0015: // FX15  Sets the delay timer to VX.
          return 27;
        break;
        case 0x0018: // FX18  Sets the sound timer to VX. 
          return 28;
        break;
        case 0x001E: // FX1E  Adds VX to I.
          return 29;
        break;
        case 0x0029: // FX29  Sets I to the location of the sprite for the character in VX.
          return 30; //       Characters 0-F (in hexadecimal) are represented by a 4x5 font.
        break;
        case 0x0033: // FX33  Stores the Binary-coded decimal representation of VX, with the most 
          return 31; //       significant of three digits at the address in I, the middle digit 
                     //       at I plus 1, and the least significant digit at I plus 2. 
        break;
        case 0x0055: // FX55  Stores V0 to VX in memory starting at address I.
          return 32;
        break;
        case 0x0065: // FX65  Fills V0 to VX with values from memory starting at address I.
          return 33;
        break;
      }
    break;
  } 
  // Should never happen
  console.log("Opcode " + op.toString(16) + " not found.");
  return -1;
}