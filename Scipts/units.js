$(document).ready(function(){
  // PSI -> KPA
  $('#psiInput').on('change keyup', function() {
    var psi = parseFloat($('#psiInput').val());
    if ($('#psiInput').val() == '') {
      $('#kpaOutput').val('')
    }else{
      $('#kpaOutput').val((psi * 6.89475729).toFixed(1));
    }
  });

  // KPA -> PSI
  $('#kpaInput').on('change keyup', function() {
    var kpa = parseFloat($('#kpaInput').val());
    if ($('#kpaInput').val() == '') {
      $('#psiOutput').val('')
    }else{
      $('#psiOutput').val((kpa / 6.89475729).toFixed(1));
    }
  });

  // KPH -> MPH
  $('#kphInput').on('change keyup', function() {
    var kph = parseFloat($('#kphInput').val());
    if ($('#kphInput').val() == '') {
      $('#mphOutput').val('')
    }else{
      $('#mphOutput').val((kph * 0.625).toFixed(1));
    }
  });

  // MPH -> KPH
  $('#mphInput').on('change keyup', function() {
    var mph = parseFloat($('#mphInput').val());
    if ($('#mphInput').val() == '') {
      $('#kphOutput').val('')
    }else{
      $('#kphOutput').val((mph / 0.625).toFixed(1));
    }
  });

  // litres -> gals
  $('#litreInput').on('change keyup', function() {
    var litre = parseFloat($('#litreInput').val());
    if ($('#litreInput').val() == '') {
      $('#galsOutput').val('')
    }else{
      $('#galsOutput').val((litre / 3.78541).toFixed(1));
    }
  });

  // gals -> litres
  $('#galsInput').on('change keyup', function() {
    var gals = parseFloat($('#galsInput').val());
    if ($('#galsInput').val() == '') {
      $('#litreOutput').val('')
    }else{
      $('#litreOutput').val((gals * 3.78541).toFixed(1));
    }
  });
});
