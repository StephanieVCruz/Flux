$(document).ready(function(){

  $( "#datepicker" ).datepicker();


  function update() {
    $('#clock').html(moment().format('H:mm:ss'));
  }

  setInterval(update, 1000);

   });
