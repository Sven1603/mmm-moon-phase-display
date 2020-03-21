/* global Log, Module */
/* MMM2 Module */

/* SvenStroom
 * Module: Moon Phase Display
 *
 * MIT Licensed.
 */

Module.register("mmm-moon-phase-display", {
        defaults: {
                updateInterval: 14400 * 1000, // every 2 hours
                initialLoadDelay: 1,
                retryDelay: 2500,
                height: 150,
                width: 150,
//              delay: 0,
                homeMM: "/home/pi/Projects/MagicMirror"
        },

        // Define required scripts.
        getScripts: function() {
                return ["moment.js"];

        },

        getDom: function() {
                var wrapper = document.createElement("div");
                wrapper.style.width = this.config.width + "px";
                wrapper.style.height = this.config.height + "px";
                wrapper.style.overflow = "hidden";
                wrapper.style.position = "relative";

                var img = document.createElement("img");
                img.style.position = "absolute";
                img.style.left = "5px";
                img.style.top = "-" + Math.round(this.config.height / 10) + "px";
                img.height = this.config.height;
                img.width = this.config.width;
                img.src = updateMoon();
                wrapper.appendChild(img);
                return wrapper;
        },

        // Define start sequence.
        start: function() {
                Log.info("Starting module: " + this.name);

                this.loaded = false;
                this.scheduleUpdate(this.config.initialLoadDelay);
                this.updateTimer = null;

        },

        updateMoon: function() {
                /*
              calculates the moon phase (0-7), accurate to 1 segment.
              0 = > new moon.
              4 => full moon.
              based on https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
              */
            var moonImage = ''
            var date = new Date()
            var day = 10
            var month = date.getMonth() + 1
            var year = date.getFullYear()

            if (month < 3) {
                year--
                month += 12
            }

            /* Calculate Julian Day (jd) */
            var a = parseInt(year / 100)
            var b = parseInt(a / 4)
            var c = 2 - a - b
            var e = parseInt(365.25 * (year + 4716))
            var f = parseInt(30.6001 * (month + 1))
            var jd = c + day + e + f - 1524.5

            var daysSinceNew = jd - 2451549.5
            var newMoons = daysSinceNew / 29.53

            var newMoonsFract = newMoons - parseInt(newMoons)   /* Get the fractional part of newMoons */

            var daysInCycle = Math.round(newMoonsFract * 29.53)

            
            if (daysInCycle >= 7) {        /* 0 and 8 are the same so turn 8 into 0 */
                daysInCycle = 0
            }

            console.log(day)
            console.log(month)
            console.log(year)
            switch(daysInCycle){
                case 0:
                    moonImage = './img/0-new-moon.jpg'
                    break
                case 1:
                    moonImage = './img/1-waning-crescent.jpg'
                    break
                case 2:
                    moonImage = './img/2-third-quarter.jpg'
                    break
                case 3:
                    moonImage = './img/3-waning-gibbous.jpg'
                    break
                case 4:
                    moonImage = './img/4-full-moon.jpg'
                    break
                case 5:
                    moonImage = './img/5-waxing-gibbous.jpg'
                    break
                case 6:
                    moonImage = './img/6-first-quarter.jpg'
                    break
                case 7:
                    moonImage = './img/7-waxing-crescent.jpg'
                    break
            }

            return moonImage
        },

        socketNotificationReceived: function(notification, payload) {
                if(notification === "MOON"){
                        this.imgmoon=payload
                        if (typeof this.imgmoon !== "undefined") {
                            this.loaded=true;
                            this.updateDom();
                        };
                        this.scheduleUpdate();
                }

        },

        scheduleUpdate: function(delay) {
                var nextLoad = this.config.updateInterval;
                if (typeof delay !== "undefined" && delay >= 0) {
                        nextLoad = delay;
                }

                var self = this;
                clearTimeout(this.updateTimer);
                this.updateTimer = setTimeout(function() {
                        self.updateMoon();
                }, nextLoad);
        },

});