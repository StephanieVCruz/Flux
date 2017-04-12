$(document).ready(function(){

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
        console.log(icon);
        //$("#filer").html("/");
        $("#city").text(data.name);
        $("#temp").html(Math.floor(data.main.temp) + "&degC");
        $("#weather").text(data.weather[0].main);
        $("#description").text(data.weather[0].description);
        temp_convert(current_temp);
        $("#icon").append("<img src='http://openweathermap.org/img/w/"+icon+".png'/>");
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
