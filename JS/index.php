<?php
sleep(2);

echo json_encode( 
	array('navigation' => array 
		('state_id' => 2, 'path_id' => 1, 'path' => array
			('prev_state' => 33343, 'actions' => array
				( 'option 1'=> 1232, 'option 2' => 1234)
			)
		)
	)
);

//echo json_encode(array('wake' => 2));

?>
