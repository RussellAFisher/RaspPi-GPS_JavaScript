$(document).ready(function() {

    var five = require("johnny-five");
    var Raspi = require("raspi-io")
    var board = new five.Board({
        io: new Raspi()
    });

    board.on("ready", function() {

        var gps = new five.GPS({
            breakout: "ADAFRUIT_ULTIMATE_GPS",
            pins: ['P1-8', 'P1-10']
        });

        // If latitude, longitude, course or speed change log it
        gps.on("change", function() {
            $('#speed').text(this.speed + "MPH");
            $('#latitude').text(this.latitude + "Latitude");
            $('#longitude').text(this.longitude + "Longitude");
            $('#connection').text(this.sat + "Satellite Connection(s)");
            console.log("Position");
            console.log("latitude: ", (this.latitude).toFixed(5));
            console.log("longitude: ", (this.longitude).toFixed(5));
            console.log("speed: ", this.speed);
            console.log("altitude: ", (this.altitude * 3.2808).toFixed(2) + " feet");
            console.log("satellite connection: ", this.sat);
            console.log("--------------------------------------");
        });
    });
});
