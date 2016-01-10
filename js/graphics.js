/** 
 * graphics.js
 * Handles drawing to the screen and defines
 * the CHIP-8 fontset for programs to use.
 */

var canvas = document.getElementById("canvas"),
    width  = 64, // Size of CHIP-8 screen
    height = 32,
    ctx    = canvas.getContext("2d");

var font = [    
  0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
  0x20, 0x60, 0x20, 0x20, 0x70, // 1
  0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
  0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
  0x90, 0x90, 0xF0, 0x10, 0x10, // 4
  0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
  0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
  0xF0, 0x10, 0x20, 0x40, 0x40, // 7
  0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
  0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
  0xF0, 0x90, 0xF0, 0x90, 0x90, // A
  0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
  0xF0, 0x80, 0x80, 0x80, 0xF0, // C
  0xE0, 0x90, 0x90, 0x90, 0xE0, // D
  0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
  0xF0, 0x80, 0xF0, 0x80, 0x80  // F
];

/**
 * init_graphics
 * Prepares the canvas for drawing and loads the
 * CHIP-8 standard font into memory. 
 */
function init_graphics() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < font.length; i++) {
	  memory[i] = font[i];
  }	
}

/**
 * draw
 * Draws to the canvas by using the pixel buffer.
 */
function draw() {
  var x, y;
  for (var i = 0; i < display.length; i++) {
    ctx.fillStyle = display[i] ? "#FFFFFF" : "#000000";

    // The canvas size is bigger than the pixel buffer,
    // so (x, y) are translated and pixels are 8x8 in size.
    x = (i % width)/width * canvas.width;
    y = Math.floor(i / width)/width * canvas.width;
    ctx.fillRect(x, y, 8, 8);
  }
}
