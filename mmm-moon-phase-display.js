// MagicMirror Module
// © Sven Stroomberg

Module.register("mmm-moon-phase-display",{
    // Default module config.
    defaults: {
        text: "Hello World!",
        width: "218".
        height: "218"
    },

    // Override dom generator.
    getDom: function() {
        /*
          calculates the moon phase (0-7), accurate to 1 segment.
          0 = > new moon.
          4 => full moon.
          calculations based on https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
          */
        /* var date = new Date()
        var day = date.getDate()
        var month = date.getMonth() + 1
        var year = date.getFullYear()

        if (month < 3) {
            year--
            month += 12
        }

        // Calculate Julian Day (jd) 
        var a = parseInt(year / 100)
        var b = parseInt(a / 4)
        var c = 2 - a + b
        var e = parseInt(365.25 * (year + 4716))
        var f = parseInt(30.6001 * (month + 1))
        var jd = c + day + e + f - 1524.5

        var daysSinceNew = jd - 2451549.5
        var newMoons = daysSinceNew / 29.53
        var newMoonsFract = newMoons - parseInt(newMoons)   // Get the fractional part of newMoons
        var phase = newMoonsFract * 29.53
        

        if (phase >= 28.5) {        // 0 and 8 are the same so turn 8 into 0
            phase = 0
        }

        // Choose correct moon phase image
        var moonImage = ''

        switch(true){
            case  phase < 1.5:
                moonImage = './img/0-new-moon.jpg'
                break
            case phase < 6:
                moonImage = './img/1-waxing-crescent.jpg'
                break
            case phase < 9:
                moonImage = './img/2-first-quarter.jpg'
                break
            case phase < 14:
                moonImage = './img/3-waxing-gibbous.jpg'
                break
            case phase < 16:
                moonImage = './img/4-full-moon.jpg'
                break
            case phase < 21:
                moonImage = './img/5-waning-gibbous.jpg'
                break
            case phase < 24:
                moonImage = './img/6-last-quarter.jpg'
                break
            case phase < 28.5:
                moonImage = './img/7-waning-crescent.jpg'
                break
        }

        // Create and return the necessary html
        var wrapper = document.createElement("div")
            wrapper.style.width = this.config.width + "px"
            wrapper.style.height = this.config.height + "px"
            wrapper.style.overflow = "hidden"
            wrapper.style.position = "relative"
            wrapper.style.textAlign = "center"
            wrapper.style.backgroundColor = "#fff"

        var img = document.createElement("img")
            img.style.position = "relative"
            img.height = this.config.height
            img.width = this.config.width
            img.src = moonImage
            wrapper.appendChild(img)
        */

        var wrapper = document.createElement("div")
            wrapper.innerHTML = this.config.text
            wrapper.style.width = this.config.width + "px"
            wrapper.style.height = this.config.height + "px"

        return wrapper
    }
});