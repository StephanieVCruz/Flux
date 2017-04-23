$(document).ready(function(){
  $( "#clock" ).draggable();
  $( "#datepicker" ).draggable();
  $( "#weather-section" ).draggable();
  $( "#todo-box" ).draggable();
  $( "#quotes-box" ).draggable();

  //Date Picker
  $( "#datepicker" ).datepicker();

  //Clock
  function updateClock() {
    $("#clock").html(moment().format('H:mm:ss'));
  }
  setInterval(updateClock, 1000);

  $("#dateToDo").html(moment().format('L'));


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
      $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      }
      })
      .done(quoteUpdate)
      .fail(handleErr);

      $("#quoteAJAX").click(function() {
      $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      }
      })
      .done(quoteUpdate)
      .fail(handleErr);
      });


        function quoteUpdate(response) {
          quoteText = response.quoteText;
          quoteAuthor = response.quoteAuthor;
          $('#log').prepend('<div>' + $('#response').html() + '</div>');
          $('#response').text('"'+quoteText+'" - '+quoteAuthor);
          //console.log(response);
          console.log(response);
        }

        function handleErr(jqxhr, textStatus, err) {
          console.log("Request Failed: " + textStatus + ", " + err);
        }
        var quoteText = response.quoteText;
        var quoteAuthor = response.quoteAuthor;
          $('#response').text('"'+quoteText+'" - '+quoteAuthor);


   });


   function cookieList() {
    if (typeof Cookies.get('list') === 'undefined'){
      Cookies.set('list', true);
      $('#list-button').attr('class', 'btn-floating grey');

      // hide list
      $('#todo-box').css('display', 'none');

    } else {
      Cookies.remove('list');
      $('#list-button').attr('class', 'btn-floating blue');

      // show list
      $('#todo-box').css('display', 'block');

    }
   }

   function cookieCal() {
    if (typeof Cookies.get('cal') === 'undefined'){
      Cookies.set('cal', true);
      $('#cal-button').attr('class', 'btn-floating grey');

      // hide cal
      $('#datepicker').css('display', 'none');

    } else {
      Cookies.remove('cal');
      $('#cal-button').attr('class', 'btn-floating blue');

      // show cal
      $('#datepicker').css('display', 'block');

    }
   }

   function cookieQuote() {
    if (typeof Cookies.get('quote') === 'undefined'){
      Cookies.set('quote', true);
      $('#quote-button').attr('class', 'btn-floating grey');

      // hide quote
      $('#quotes-box').css('display', 'none');

    } else {
      Cookies.remove('quote');
      $('#quote-button').attr('class', 'btn-floating blue');

      // show quote
      $('#quotes-box').css('display', 'block');

    }
   }

   function cookieWeather() {
    if (typeof Cookies.get('weather') === 'undefined'){
      Cookies.set('weather', true);
      $('#weather-button').attr('class', 'btn-floating grey');

      // hide weather
      $('#weather-section').css('display', 'none');

    } else {
      Cookies.remove('weather');
      $('#weather-button').attr('class', 'btn-floating blue');

      // show weather
      $('#weather-section').css('display', 'block');

    }
   }
