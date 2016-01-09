/** 
 * programloader.js
 * Reads a .ch8 file using JS' File API
 * and then loads the program into memory.
 */

function read_file(file, callback) {
  reset();
  draw();
  var reader = new FileReader();
  reader.onload = callback;
  reader.readAsArrayBuffer(file);
  main();
}

document.getElementById('file').addEventListener('change', 
  function(e) {
	read_file(e.target.files[0], function(e) {
	  var buffer = e.target.result;
	  var view = new Uint8Array(buffer);
	  for (var i = 0; i < view.length; i++) {
	  	memory[i + 512] = view[i];
	  }
    });
  }, 
false);
