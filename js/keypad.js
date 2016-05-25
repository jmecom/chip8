/** 
 * keypad.js
 * Defines event handlers for keypresses,
 * which update the internal CHIP-8 keys buffer.
 */

/**
 * map_key(keyCode)
 * Given a keyCode from a key event, 
 * returns the index for that key in keys.
 */
function map_key(keyCode) {
  switch(keyCode) {
    case 49: // 1
      return 0;
    break;

    case 50: // 2
      return 1;
    break;

    case 51: // 3
      return 2;
    break;

    case 52: // 4
      return 3;
    break;

    case 81: // Q
      return 4;
    break;

    case 87: // W
      return 5;
    break;
      
    case 69: // E
      return 6;
    break;
      
    case 82: // R
      return 7;
    break;
      
    case 65: // A
      return 8;
    break;
      
    case 83: // S
      return 9;
    break;
      
    case 68: // D
      return 10;
    break;
      
    case 70: // F
      return 11;
    break;
      
    case 90: // Z
      return 12;
    break;
      
    case 88: // X
      return 13;
    break;

    case 67: // C
      return 14;
    break;

    case 86: // V
      return 15;
    break;
  }
}

/**
 * onkeydown
 * Updates the keys array to 
 * indiciate a key is down.
 */
document.onkeydown = function(e) {
  e = e || window.event;
  keys[map_key(e.keyCode)] = 1;
};

/**
 * onkeyup
 * Updates the keys array to
 * indiciate a key is up.
 */
document.onkeyup = function(e) {
  e = e || window.event;
  keys[map_key(e.keyCode)] = 0;
};