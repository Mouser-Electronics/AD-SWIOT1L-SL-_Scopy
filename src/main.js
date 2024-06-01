
/* Perform tool reset */
launcher.reset()

/* Setup DigitalIO */
function set_dio(){
	
    /* Set channel 0 as an output for the motor */
	dio.dir[0]=true
	dio.out[0]=true
	
	/* Set all other channels as sensor inputs */
	for ( var i = 1; i < 3; i++){
		dio.dir[i]=false
		dio.out[i]=false
	}
	
	/* Run DigitalIO */
	dio.running = true
	msleep(1000)
	
}

/* Poll the water level sensors and turn pump ON/OFF accordingly */
function check_tank(){
	
    var lower_sensor_status = dio.out[1]
    var upper_sensor_status = dio.out[2]

    if (lower_sensor_status == 0) {   // lower sensor detects NO water
        dio.out[0] = true             // Turn pump ON
    }

    if (upper_sensor_status == 1) {   // upper sensor detects water
        dio.out[0] = false            // Turn pump OFF
    }

    msleep(1000)
    dio.running = false
}


/* main function */
function main(){

	set_dio()
	
    check_tank()
	
    msleep(1000)
}

main()