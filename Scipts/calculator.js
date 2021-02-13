$(document).ready(function(){
  var button = $('#doCalculation');
  var resetCalc = $('#resetResults');
  var resetInput = $('#resetInputs');

  // only allow input of minute OR laps, not both
  $('#raceDuration').on('change keyup', function() {
    if ($('#raceDuration').val() != '') {
      $('#raceLaps').val('');
    }
  });
  $('#raceLaps').on('change keyup', function() {
    if ($('#raceLaps').val() != '') {
      $('#raceDuration').val('');
    }
  });

  // remove error-class
  $('#minutes, #seconds, #milliseconds, #fuel').on('change keyup', function() {
    $(this).removeClass('fault');
  });
  $('#raceDuration, #raceLaps').on('change keyup', function() {
    $('#raceDuration, #raceLaps').removeClass('fault');
  });

  button.on("click", function(){
    // set inputError false before validation
    inputError = false;
    // clear fields if there already was a Calculation
    $('#timeRace').val('');
    $('#lapsRace').val('');
    $('#neededFuel').val('');

    // show error if missing inputs
    if ($('#seconds').val() == '') {
      $('#seconds').addClass('fault');
      inputError = true;
    };
    if ($('#fuel').val() == '') {
      $('#fuel').addClass('fault');
      inputError = true;
    };
    if ($('#raceDuration').val() == '' && $('#raceLaps').val() == '') {
      $('#raceDuration').addClass('fault');
      $('#raceLaps').addClass('fault');
      inputError = true;
    };

    // Alert user if inputs are missing or wrong
    if(inputError) {
      alert('Missing or wrong inputs!');
      return;
    };

    // Set milliseconds to 000 if no value is entered
    if ($('#milliseconds').val() == '') {
      $('#milliseconds').val('000');
    };

    // fetch inputs
    var minutesInput = parseFloat($('#minutes').val());
    var secondsInput = parseFloat($('#seconds').val());
    var milsecInput = parseFloat($('#milliseconds').val());
    var lengthInput = parseFloat($('#raceDuration').val());
    var lapsInput = parseFloat($('#raceLaps').val());
    var fuelInput = parseFloat($('#fuel').val());

    // set 0 minutes if no value is entered, so value != null
    if ($('#minutes').val() == '') {
      var minutesInput = 0;
    };

    // convert minutes and seconds to milliseconds
    var min = minutesInput * 60 * 1000;
    var sec = secondsInput * 1000;

    if ($('#raceLaps').val() != '') {
      // calculate total time in milliseconds for fixed laps race
      var totalTimeLaps = (min + sec + milsecInput) * lapsInput;
      // convert into est. duration
      var ms = totalTimeLaps % 1000;
      var s = ((totalTimeLaps - ms) / 1000) % 60;
      var m = (((totalTimeLaps - ms) / 1000) - s) / 60;
      // calculate needed fuel
      var fuel = fuelInput * lapsInput;
      // fill fields
      $('#timeRace').val(m + ':' + String("0" + s).slice(-2) + '.' + ms);
      $('#lapsRace').val(lapsInput + ' laps');
      $('#neededFuel').val(fuel.toFixed(2) + ' litres/gallons/kg');
      // alert('laps');
    }else{
      // convert single lap and total time to milliseconds
      var timeSingleLap = (min + sec + milsecInput);
      var timeCompleteRace = lengthInput * 60 * 1000;
      // count laps
      var totalLaps = timeCompleteRace / timeSingleLap;
      // calculate duration in milliseconds
      var totalDuration = (Math.ceil(totalLaps.toFixed(2))) * timeSingleLap
      var ms = totalDuration % 1000;
      var s = ((totalDuration - ms) / 1000) % 60;
      var m = (((totalDuration - ms) / 1000) - s) / 60;
      // calculate needed fuel
      var fuel = fuelInput * (Math.ceil(totalLaps.toFixed(2)));
      // fill fields
      $('#timeRace').val(m + ':' + String("0" + s).slice(-2) + '.' + ms);
      $('#lapsRace').val(Math.ceil(totalLaps.toFixed(2)) + ' laps');
      $('#neededFuel').val(fuel.toFixed(2) + ' litres/gallons/kg');
      // alert('time');
    };
  });

  // reset results
  resetCalc.on("click", function(){
    $('#timeRace').val('');
    $('#lapsRace').val('');
    $('#neededFuel').val('');
  });

  // reset inputs
  resetInput.on("click", function(){
    $('#minutes').val('');
    $('#seconds').val('');
    $('#milliseconds').val('');
    $('#raceDuration').val('');
    $('#raceLaps').val('');
    $('#fuel').val('');
  });
});
