var memory  = new Uint8Array(4096),
    stack   = new Uint16Array(16),
    display = new Uint8Array(2048),
    V       = new Uint8Array(16);

var I     = 0, 
    pc    = 512, 
    sp    = 0,
    delay = 0, 
    sound = 0;