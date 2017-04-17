$(document).ready(function(){
  function cookieList() {
   if (typeof Cookie.get('list') === 'undefined'){
     Cookie.set('list', true);
     $('#list-button').attr('class', 'btn-floating grey');

     // hide list
     $('#list-section').css('display', 'none');

   } else {
     Cookie.remove('list');
     $('#list-button').attr('class', 'btn-floating blue');

     // show list
     $('#list-section').css('display', 'inline');

   }
  }

  function cookieCal() {
   if (typeof Cookie.get('cal') === 'undefined'){
     Cookie.set('cal', true);
     $('#cal-button').attr('class', 'btn-floating grey');

     // hide cal
     $('#cal-section').css('display', 'none');

   } else {
     Cookie.remove('cal');
     $('#cal-button').attr('class', 'btn-floating blue');

     // show cal
     $('#cal-section').css('display', 'inline');

   }
  }

  function cookieQuote() {
   if (typeof Cookie.get('quote') === 'undefined'){
     Cookie.set('quote', true);
     $('#quote-button').attr('class', 'btn-floating grey');

     // hide quote
     $('#quote-section').css('display', 'none');

   } else {
     Cookie.remove('quote');
     $('#quote-button').attr('class', 'btn-floating blue');

     // show quote
     $('#quote-section').css('display', 'inline');

   }
  }

  function cookieWeather() {
   if (typeof Cookie.get('weather') === 'undefined'){
     Cookie.set('weather', true);
     $('#weather-button').attr('class', 'btn-floating grey');

     // hide weather
     $('#weather-section').css('display', 'none');

   } else {
     Cookie.remove('weather');
     $('#weather-button').attr('class', 'btn-floating blue');

     // show weather
     $('#weather-section').css('display', 'inline');

   }
  }
  //Date Picker
  $( "#datepicker" ).datepicker();

  //Clock
  function update() {
    $('#clock').html(moment().format('H:mm:ss'));
  }
  setInterval(update, 1000);

  //Weather
  $.ajax({
    url: "http://ip-api.com/json",
    success: function(data) {
        var lat = data.lat;
        var lon = data.lon;
        loadWeather(lat, lon);
      } // success function
  }); // get IP address

  function loadWeather(lat, lon) {

    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather",
      data: {
        lat: lat,
        lon: lon,
        units:"metric",
        appid: "950cc6058d049d7012d92c5291e7d10b"
      },
      success: function(data) {
        var weatherCode = data.weather[0].id;
        var icoClass = "owf owf-"+ weatherCode;
        var current_temp = Math.floor(data.main.temp);
        var icon = data.weather[0].icon;
        $("#city").text(data.name);
        $("#temp").html(Math.floor(current_temp * 1.8 + 32) + "&degF");
        $("#forecast").text(data.weather[0].main);
        $("#description").text(data.weather[0].description);
        temp_convert(current_temp);
        $("#icon").append("<img src='images/"+icon+".png'/>");
      }

    });

      }; // loadWeather function
      function temp_convert(current_temp){

        $("#convert_f").on("click", function(){

          $("#temp").html(Math.floor(current_temp * 1.8 + 32) + "&degF");

        });

        $("#convert_c").on("click", function(){

          $("#temp").html(current_temp + "&degC");

        });

      };


   });
