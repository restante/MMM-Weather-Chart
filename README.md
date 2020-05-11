# MMM-Weather-Chart
Weather Module showing Temp Max, Min and Pressure.

It uses openweathermap.org one call API : https://openweathermap.org/api/one-call-api

![screenshot](/images/screenshot.png)



**Installation :**

	cd ~/MagicMirror/modules
	
	git clone https://github.com/restante/MMM-Weather-Chart
	
	cd MMM-Weather-Chart
	
	npm install

**Using the module** :
To use this module, add the following configuration block to the modules array in the config/config.js file:



	var config = {
		modules: [
	    {
	        module: 'MMM-Weather-Chart',
	        position: "top_right",
	        config: {
		    title           : "London",
	            width       	: "250px",
	            height      	: "400px",
	            updateInterval	: 60 * 60 * 1000,
	            appid			: "YOUR API KEY", // https://openweathermap.org/api/one-call-api
	            lat				: "51.430720",
	            lon				: "-0.014421",
	            fontSize		: 10,
	        }
	    }
	    ]
	}
