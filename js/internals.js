/** 
 * internals.js
 * Defines and initializes the CHIP-8
 * virtual machine's registers and memory.
 */

var memory  = new Uint8Array(4096), // CHIP-8 4K memory
    stack   = new Uint16Array(16),  // 16 level stack
    display = new Uint8Array(2048), // 64*32 pixel buffer
    V       = new Uint8Array(16),   // General purpose registers
    keys    = new Uint8Array(16);   // Hexadecimal keypad

var I     = 0,   // 16-bit address register
    pc    = 512, // Program counter
    sp    = 0,   // Stack pointer
    delay = 0,   // Delay timer
    sound = 0;   // Sound timer

/** 
 * reset
 * Resets CHIP-8 internals to
 * their initial values.
 */
function reset() {
  memory.fill(0);
  display.fill(0);
  stack.fill(0);
  V.fill(0);
  keys.fill(0);
  I = 0;
  sp = 0;
  delay = 0;
  sound = 0;
  pc = 512;
}

