/* Magic Mirror
 * Module: MMM-Weather-Chart
 *
 * By Claudio Restante https://github.com/restante/
 * MIT Licensed.
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');



module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getOneCallResults: function(url) {
       // console.log(url); // uncomment to see in terminal
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
               
		 		 //console.log(body); // uncomment to see in terminal
                    this.sendSocketNotification('ONE_CALL_RESULTS', body);
		
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_ONE_CALL_RESULTS') {
            this.getOneCallResults(payload);
        }
    }
});