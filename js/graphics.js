var canvas = document.getElementById("canvas"),
    width  = 64,
    height = 32,
    ctx    = canvas.getContext("2d");

function init_graphics() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  var x, y;
  ctx.fillStyle = "#00FF00";
  for (var i = 0; i < display.length; i++) {
    if (display[i]) {
      x = (i % width)/width * canvas.width;
      y = Math.floor(i / width)/width * canvas.width;
      ctx.fillRect(x, y, 8, 8);
    }
  }
}