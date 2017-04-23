<!DOCTYPE HTML>
<html>
<head>
	<title>To-Do List</title>
	<!-- Scripts and Styles -->
	<link rel="stylesheet" href="css/style.css">
	<script type="text/javascript" src="scripts/main.js"></script>

	<!-- CDN -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
    <div id="gradient">
		<div class="wrap">
			<h1>To-Do List</h1>
			<div class="task-list">
				<ul>

				<?php 
					require("includes/connect.php");

					$query = mysql_query("SELECT * FROM tasks ORDER BY date ASC, time ASC");
					$numrows = mysql_num_rows($query);

					if($numrows>0){
						while( $row = mysql_fetch_assoc( $query ) ){

							$task_id = $row['id'];
							$task_name = $row['task'];

							echo '<li class="animated lightSpeedIn">
									<span>'.$task_name.'</span>
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
		</div>
	</div>
</body>
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

</script>

</html>