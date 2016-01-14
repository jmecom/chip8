/** 
 * interface.js
 * Scripts for the UI.
 */

/* Show/hide the help text */
document.getElementById('help-btn').addEventListener('click',
  function(e) {
    var text = document.getElementById("help-text"); 
    var hv = text.style.visibility == "hidden" ? "visible" : "hidden";
    text.style.visibility = hv;
  }, 
false);

/* Only show file text if a file is selected */
document.getElementById('file').addEventListener('change', 
  function(e) {
    var file_div = document.getElementById('file-div');
    var color = e.target.value == "" ? "#262626" : "#F0FFFF";
    file_div.style.color = color;
  }, 
false);