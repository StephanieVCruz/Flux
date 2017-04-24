<!DOCTYPE html>
<html>

<head>

	<meta charset="utf-8">
	<!-- Always force latest IE rendering engine & Chrome Frame -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>Flux HTML Mockup</title>


	<!-- Stylesheets -->
	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="css/materialize.min.css" media="all">
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
  <link rel="stylesheet" href="css/main.css" media="all">

	<!--Let browser know website is optimized for mobile-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

	<!-- Scripts -->
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	<script type="text/javascript" src="scripts/materialize.min.js"></script>
	<script type="text/javascript" src="scripts/js.cookie.js"></script>
	<script type="text/javascript" src="scripts/moment.min.js"></script>
	<script type="text/javascript" src="scripts/scripts.js"></script>

</head>

<body class="white-text">

	<div class="fixed-action-btn horizontal click-to-toggle">
		<a class="btn-floating btn-large blue">
			<i class="material-icons">menu</i>
		</a>
		<ul>
			<li><a class="btn-floating blue" id="list-button" onclick="cookieList()"><i class="material-icons">list</i></a></li>
			<li><a class="btn-floating blue" id="cal-button" onclick="cookieCal()"><i class="material-icons">today</i></a></li>
			<li><a class="btn-floating blue" id="quote-button" onclick="cookieQuote()"><i class="material-icons">format_quote</i></a></li>
			<li><a class="btn-floating blue" id="weather-button" onclick="cookieWeather()"><i class="material-icons">location_on</i></a></li>
		</ul>
	</div>

    <!-- First Section Group -->
    <div class="row">
      <div class="col s4">
        <div id="clock">Clock</div>
      </div>
      <div class="col s4">
        <h3 class="light" id="title">TODAY'S OUTLOOK</h3>
      </div>
      <div id="weather-section" class="col s4">
          <div id="icon"></div>
          <div id="city">City, ST</div>
          <div id="temp">Temperature</div>
          <div id="forecast">Weather</div>
          <div id="description">Description</div>
      </div>
		</div>
      <!-- Second Section Group -->
      <div class="row">
				<div class="col s3">
					<div id="datepicker"></div>
				</div>
        <div class="col s6">

          <div id="todo-box" class="todo-box">
						<div class="todo-top-section">
							<div class="todo-heading flow-text">TO DO LIST</div>
							<div id="dateToDo" class="todo-date light"></div>
						</div>
						<div class="todo-middle-section task-list">
							<ul class="todo-list-ul">

							<?php

								require("includes/connect.php");

								$query = mysql_query("SELECT * FROM tasks ORDER BY date ASC, time ASC");
								$numrows = mysql_num_rows($query);

								if($numrows>0){
									while( $row = mysql_fetch_assoc( $query ) ){

										$task_id = $row['id'];
										$task_name = $row['task'];

										echo '<li class="animated lightSpeedIn todo-list-item">
												<span class="todo-list-item">'.$task_name.'</span>
												<img id="'.$task_id.'" class="delete-button" width="10px" src="images/close.svg" />
											</li>';
									}
								}

							?>

							</ul>
						</div>
						<form class="add-new-task" autocomplete="off">
							<input type="text" name="new-task" placeholder="Add a new item..." />
						</form>
						<div class="todo-bottom-section">
							<div class="todo-button">
								 <a class="waves-effect waves-light btn light" id="addTask">Add Task</a>
							</div>
						</div>
						</div>

					</div>

        </div>

        <div class="col s3">
          <!--Blank-->
        </div>
      </div>

      <!-- Third Section Group -->
      <div class="row">
        <div class="col s3">
          <!--Blank-->
        </div>
        <div class="col s6">
          <div id="quotes-box" class="quotes-box light">
						 <!--<div id="response" class="light"></div>
						 <div class="quote-button">
						 		<a class="waves-effect waves-light btn light" id="quoteAJAX">New Quote</a>
						 </div>
					 -->


        	</div>
        <div class="col s3">
          <!--Blank-->
        </div>
      </div>

      <!-- Fourth Section Group -->
      <div class="row">
        <div class="col s3">
          <!--Blank-->
        </div>
        <div class="col s6">
          <!--Links-->
        </div>
        <div class="col s3">
          <!--Logo-->
        </div>
      </div>

			<script>

			    add_task();
			    delete_task();

			    function add_task() {

			        $('.add-new-task').submit(function(){

			            var new_task = $('.add-new-task input[name=new-task]').val();

			            if(new_task != ''){

			                $.post('includes/add-task.php', { task: new_task }, function( data ) {

			                    $('.add-new-task input[name=new-task]').val('');

			                    $(data).appendTo('.task-list ul').hide().fadeIn();

			                    delete_task();
			                });
			            }

			            return false; // make sure form doesn't submit twice
			        });
			    }

			    function delete_task() {

			        $('.delete-button').click(function(){

			            var current_element = $(this);

			            var id = $(this).attr('id');

			            $.post('includes/delete-task.php', { task_id: id }, function() {

			                current_element.parent().addClass("lightSpeedOut").delay(750).fadeOut("fast", function() { $(this).remove(); });
			            });
			        });
			    }

					  $("#addTask").click(function() {

								var new_task = $('.add-new-task input[name=new-task]').val();

								if(new_task != ''){

										$.post('includes/add-task.php', { task: new_task }, function( data ) {

												$('.add-new-task input[name=new-task]').val('');

												$(data).appendTo('.task-list ul').hide().fadeIn();

												delete_task();
										});
								}

								return false; // make sure form doesn't submit twice
						});


			</script>

</body>
</html>
