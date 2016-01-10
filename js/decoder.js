/** 
 * decoder.js
 * Implements a decoding function for
 * the opcode lookup table in opcodes.js
 */

/**
 * decode(op)
 * Given an opcode, returns the index of the 
 * function implementing the opcode in the 
 * lookup table. 
 */
function decode(op) {
  switch(op & 0xF000) { 
    case 0x0000:
      switch (op & 0x000F) {
        case 0x0000: 
          return 0;
        break;

        case 0x000E: 
          return 1;
        break;
      }
    break;

    case 0x1000: 
      return 2;
    break;

    case 0x2000: 
      return 3;
    break;

    case 0x3000: 
      return 4;
    break;

    case 0x4000: 
      return 5;
    break;

    case 0x5000: 
      return 6;
    break;

    case 0x6000: 
      return 7;
    break;

    case 0x7000: 
      return 8;
    break;

    case 0x8000:
      switch (op & 0x000F) {
        case 0x0000: 
          return 9;
        break;

        case 0x0001: 
          return 10;
        break;

        case 0x0002: 
          return 11;
        break;

        case 0x0003: 
          return 12;
        break;

        case 0x0004: 
          return 13; 
        break;

        case 0x0005: 
          return 14; 
        break;

        case 0x0006: 
          return 15;
        break;

        case 0x0007: 
          return 16;
        break;

        case 0x000E: 
          return 17;
        break;
      }
    break;

    case 0x9000: 
      return 18;
    break;

    case 0xA000: 
      return 19;
    break;

    case 0xB000: 
      return 20;
    break;

    case 0xC000: 
      return 21; 
    break;

    case 0xD000: 
      return 22; 
    break;

    case 0xE000:
      switch (op & 0x000F) {
        case 0x000E: 
          return 23;
        break;
        case 0x0001: 
          return 24;
        break;
      }
    break;

    case 0xF000:
      switch (op & 0x00FF) {
        case 0x0007: 
          return 25;
        break;
        case 0x000A: 
          return 26;
        break; 
        case 0x0015: 
          return 27;
        break;
        case 0x0018: 
          return 28;
        break;
        case 0x001E: 
          return 29;
        break;
        case 0x0029: 
          return 30; 
        break;
        case 0x0033: 
          return 31; 
                     
        break;
        case 0x0055: 
          return 32;
        break;
        case 0x0065: 
          return 33;
        break;
      }
    break;
  } 
  return 34;
}