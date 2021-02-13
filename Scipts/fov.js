$(document).ready(function(){
  // Slider for distance
  var sliderDistance = document.getElementById('distance-s');
  var outputDistance = document.getElementById('distance-n');
  outputDistance.innerHTML = sliderDistance.value; // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  sliderDistance.oninput = function() {
    outputDistance.innerHTML = this.value;
  };

  // Slider for screensize
  var sliderScreen = document.getElementById('size-s');
  var outputScreen = document.getElementById('size-n');
  outputScreen.innerHTML = sliderScreen.value; // Display the default slider value
  // Update the current slider value (each time you drag the slider handle)
  sliderScreen.oninput = function() {
    outputScreen.innerHTML = this.value;
  };

  $('#distance-s, #size-s').on('input', function() {
    var screenSizeCm = sliderScreen.value * 2.54;

    // Calculate Screen width and height
    var rw = 16;
    var rh = 9;
    var d = screenSizeCm;

    var h = (d * rh) / Math.sqrt(rw * rw + rh * rh); // height of monitor
    var w = (rw / rh) * h; // width of monitor

    var distance = sliderDistance.value;

    // Horizontal fov
    var distSides = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(distance, 2)).toFixed(2);
    var horFovRad = (2 * (Math.asin(w / (2 * distSides))));

    // Vertical fov
    var distSides = Math.sqrt(Math.pow(h / 2, 2) + Math.pow(distance, 2)).toFixed(2);
    var vertFovRad = (2 * (Math.asin(h / (2 * distSides))));

    // Results for games
    var horFovDeg = ((horFovRad * 180) / Math.PI); // horizontal fov (e.g. iRacing)
    var vertFovDeg = ((vertFovRad * 180) / Math.PI); // vertical fov (e.g. Assetto Corsa)
    var rbr = horFovRad; // Richard Burns Rally
    var r3e = (Math.round((vertFovDeg * 10) / 58) / 10); // Raceroom Racing Experience
    var dirt = ((vertFovDeg - 30) / 40); // Dirt Rally
    var f1 = Math.round(((horFovDeg - 77) / 2)) / 20; // Codemasters F1

    // fill fields with results
    $('#horFov').val(horFovDeg.toFixed(0));
    $('#vertFov').val(vertFovDeg.toFixed(0));
    $('#r3eFov').val(r3e + 'x');
    $('#rbrFov').val(rbr.toFixed(2));
    $('#dirtFov').val(dirt.toFixed(1));
    $('#f1Fov').val(f1.toString().replace('-', '\u2212'));

    // alert(f1);
  });
});
