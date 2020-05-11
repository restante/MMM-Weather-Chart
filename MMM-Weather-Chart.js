/* global Module */

/* Magic Mirror
 * Module: MMM-Weather-Chart
 *
 * By Claudio Restante https://github.com/restante/
 * MIT Licensed.
 */

Module.register("MMM-Weather-Chart", {
    defaults: {
        width       : "250px",
        height      : "400px",
        retryDelay  : 2500,
        updateInterval: 60 * 60 * 1000,
        animationSpeed: 3000, // fade in and out speed
        appid: "8332df84f0a138b84f5fab8026acf650",
        lat: "51.430720",
        lon: "-0.014421",
        fontSize: 10,

    },

    getScripts: function() {
		return  ["modules/" + this.name + "/node_modules/chart.js/dist/Chart.bundle.min.js", "moment.js"];
	},

	start: function() {
        this.config = Object.assign({}, this.defaults, this.config);
        this.url = "https://api.openweathermap.org/data/2.5/onecall?lat="+this.config.lat+"&lon="+this.config.lon+"&exclude=hourly&appid="+this.config.appid+"&units=metric";
        this.ONE_CALL_RESULTS = [];
        Log.info("Starting module: " + this.name);
        this.scheduleUpdate();
	},

	getDom: function() {
       const wrapperEl = document.createElement("div");
        wrapperEl.style.width = this.config.width;
        wrapperEl.style.width = this.config.height;

        if (!this.loaded) {
            wrapperEl.innerHTML = "Loading...";
            return wrapperEl;
        }
        var array = JSON.parse(this.ONE_CALL_RESULTS).daily;
        var myLabels = []
        var pressureValues = []
        var minTempValues = []
        var maxTempValues = []
        var iconValues = []
        var iconX = []

        array.forEach(function(object) {
            myLabels.push(moment(object.dt * 1000).format("DD MMM"));
            pressureValues.push(object.pressure);
            minTempValues.push(object.temp.min);
            maxTempValues.push(object.temp.max);
            iconValues.push(object.weather[0].icon);
            iconX.push(0.5);
        });

        var myData = {
            labels: myLabels,
            datasets: [
              {
                label: "Pressure",
                borderColor : "rgba(255, 255, 255, 0.8)",
                borderWidth: 1,
                yAxisID: 'PRESSURE',
                data: pressureValues,
                
              },
              {
                label: "°C Min",
                borderColor : "rgba(63, 191, 191, 0.8)",
                borderWidth: 1,
                yAxisID: 'TEMP',
                data: minTempValues,
              },
              {
                label: "°C Max",
                borderColor : "rgba(241, 64, 64, 0.8)",
                borderWidth: 1,
                yAxisID: 'TEMP',
                data: maxTempValues,
              },
              
              {
                label: "Weather",
                data: iconX,
                yAxisID: 'TEMP',
                
              }
            ]
          };

        var element = document.createElement("canvas")

        var options = {
            type : 'line',
            data : myData,
            options: {
                legend: {
                    position: 'bottom',
                    align: 'start',
                    display: true,
                    labels: {
                        filter: function(item, chart) {
                            return !item.text.includes('Weather');
                        },
                        fontColor: "white",
                        fontSize: this.config.fontSize,
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
                                fontColor: "white",
                                fontSize: this.config.fontSize,
                                display: false
                            }
                        },
                        {
                            id: 'TEMP',
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                fontColor: "white",
                                fontSize: this.config.fontSize,
                                display: false,
                                beginAtZero: true
                            }
                        }
                    ],
                    xAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontSize: this.config.fontSize,
                        }
                    }]
                }
            },
            plugins: [{
                afterDatasetsDraw: function(chart) {
                    var iconNames = ["01d", "02d", "03d", "04d","091d", "10d", "11d", "13d", "50d"];
                    var ctx = chart.ctx;
                    chart.data.datasets.forEach(function(dataset, index) {
                        if (index === 3) return;
                        var datasetMeta = chart.getDatasetMeta(index);
                        if (datasetMeta.hidden) return;
                        datasetMeta.data.forEach(function(point, index) {
                        var value = dataset.data[index],
                            x = point.getCenterPoint().x,
                            y = point.getCenterPoint().y,
                            radius = point._model.radius,
                            fontSize = 8,
                            fontFamily = 'Verdana',
                            fontColor = 'white',
                            fontStyle = 'normal';
                        ctx.save();
                        ctx.textBaseline = 'middle';
                        ctx.textAlign = 'center';
                        ctx.font = fontStyle + ' ' + fontSize + 'px' + ' ' + fontFamily;
                        ctx.fillStyle = fontColor;                        
                        ctx.fillText(value, x, y - radius - fontSize);
                        ctx.restore();
                        });
                    });
                }
            }]
        }
       
      
        
        Chart.pluginService.register({
            afterUpdate: function(chart) {

                
                iconValues.forEach(function (item, index) {
                    var pic = new Image();
                    var picURL = "http://openweathermap.org/img/wn/"+item+".png";
                    pic.src = picURL;
                    pic.width = 30;
                    pic.height = 30;
                    //console.log(item, index, picURL);
                    chart.config.data.datasets[3]._meta[0].data[index]._model.pointStyle = pic;
                  });
                
          
            }
        })
       var chart = new Chart(element.getContext("2d"), options);
       
        // Append chart
       
        wrapperEl.appendChild(element);
        return wrapperEl
        
    },

	// this processes your data
    processOneCallResults: function(data) { 
        this.ONE_CALL_RESULTS = data; 
    //    console.log(this.ONE_CALL_RESULTS); // uncomment to see if you're getting data (in dev console)
        this.loaded = true;
    },
	
	
	
// this tells module when to update
    scheduleUpdate: function() { 
        setInterval(() => {
            this.getOneCallResults();
        }, this.config.updateInterval);
        this.getOneCallResults(this.config.initialLoadDelay);
        var self = this;
    },
	
	
	// this asks node_helper for data
    getOneCallResults: function() { 
        this.sendSocketNotification('GET_ONE_CALL_RESULTS', this.url);
    },
	
	
	// this gets data from node_helper
    socketNotificationReceived: function(notification, payload) { 
        if (notification === "ONE_CALL_RESULTS") {
            this.processOneCallResults(payload);
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },

});
