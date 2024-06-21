
/* Perform tool reset */
launcher.reset()

/* Setup DigitalIO */
function set_dio(){
	
    /* Set channel 1 as a voltage output */
	dio.dir[0]=true
	dio.out[0]=true
	
	/* Set channels 2 and3 as sensor inputs */
	dio.dir[1]=false
	dio.out[1]=false
    dio.dir[2]=false
	dio.out[2]=false

    /* Set channel 4 as an output for the motor */
	dio.dir[3]=true
	dio.out[3]=true

	
	/* Run DigitalIO */
	dio.running = true
	msleep(1000)
	
}

/* Poll the water level sensors and turn pump ON/OFF accordingly */
function check_tank(){
	
    var lower_sensor_status = dio.out[1]
    var upper_sensor_status = dio.out[2]

    if (lower_sensor_status == 0) {   // lower sensor detects NO water
        dio.out[3] = true             // Turn pump ON
    }

    if (upper_sensor_status == 1) {   // upper sensor detects water
        dio.out[3] = false            // Turn pump OFF
    }

    msleep(1000)
    dio.running = false
}


/*Setup Oscilloscope*/
function set_oscilloscope(){
	
	/* Enable Oscilloscope Channel 1  */
	osc.channels[0].enabled = true
	osc.channels[1].enabled = true
    osc.channels[2].enabled = true
	osc.channels[3].enabled = true
	
	/* Set Volts/Div to 1V/div */
	osc.channels[0].volts_per_div = 1
    osc.channels[1].volts_per_div = 1
    osc.channels[2].volts_per_div = 1
    osc.channels[3].volts_per_div = 1
	
	/* Set Time Base to 1 ms */
	osc.time_base = 0.001
	
	/* Set Time Position to 0s */
	osc.time_position = 0
	
	/* Run Oscilloscope */
	osc.running = true
}






/* main function */
function main(){

	set_dio()
	
    check_tank()
	
    msleep(1000)

    set_oscilloscope()
	
	msleep(1000)
	
	set_oscilloscope()
	
	msleep(1000)
	
	var pp1 = osc.channels[0].peak_to_peak
    var pp2 = osc.channels[0].peak_to_peak
    var pp3 = osc.channels[0].peak_to_peak
    var pp4 = osc.channels[0].peak_to_peak

	printToConsole(pp1)
    printToConsole(pp2)
    printToConsole(pp3)
    printToConsole(pp4)
}

main()