# MMM-Weather-Chart
Weather Module showing Temp Max, Min and Pressure.


It uses openweathermap.org one call API : https://openweathermap.org/api/one-call-api

Configuration :


		{
			module: 'MMM-Weather-Chart',
			position: "top_right",
			config: {
				width       : "250px",
				height      : "400px",
				updateInterval: 60 * 60 * 1000,
				appid: "YOUR API KEY", // https://openweathermap.org/api/one-call-api
				lat: "51.430720",
				lon: "-0.014421",
				fontSize: 10,
			}
		}
