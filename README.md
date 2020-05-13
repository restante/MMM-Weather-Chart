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
	            width       	: "250px",
	            height      	: "400px",
	            updateInterval	: 60 * 60 * 1000,
	            appid		: "YOUR API KEY", // https://openweathermap.org/api/one-call-api
	            lat			: "51.430720", 
	            lon			: "-0.014421",
				pointFontColor  : "white", 
				pointFontSize	: 3,
	            chartOptions    : {} // Chart js options for Line. see https://www.chartjs.org/docs/latest/charts/line.html
	        }
	    }
	    ]
	}


**Example of Chart Options :** (Used for the above image)
	
				chartOptions    : {
					title: {
						display: true,
						text: "London",
						fontColor : "black",
						fontSize : 15
					},
					legend: {
						position: 'bottom',
						align: 'start',
						display: true,
						labels: {
							filter: function(item, chart) {
								return !item.text.includes('Weather');
							},
							fontColor: "black",
							fontSize: 10,
							boxWidth: 10
						}
					},
					scales: {
						yAxes: [
							{
								id: 'PRESSURE',
								type: 'linear',
								position: 'left',
								ticks: {
									fontColor: "black",
									fontSize: 10,
									display: false
								},
								gridLines: {
									drawBorder: false,
									display: false,
									 
								}
							},
							{
								id: 'TEMP',
								type: 'linear',
								position: 'right',
								ticks: {
									fontColor: "black",
									fontSize: 10,
									display: false,
									beginAtZero: true
								},
								gridLines: {
									drawBorder: false,
									display: false,
								}
							}
						],
						xAxes: [{
							ticks: {
								fontColor: "black",
								fontSize: 10,
							},
							gridLines: {
									drawBorder: false,
									display: false,
							}
						}]
					}
				}
****