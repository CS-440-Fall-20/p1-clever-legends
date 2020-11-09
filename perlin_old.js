class Perlin{

    gradients = []
    freq = 0
    lowerBound = 0
    interval_size = 0

    Perlin(freq){
        if (freq < 2){
            console.log("Frequency must be at least 2")
            return
        }
        this.gradients = []
        this.freq = freq
        this.lowerBound = 0
        this.interval_size = 100/(this.freq -1)

        for (i = 0; i < this.freq; i++){
            this.gradients.push(Math.random() * (2 - (-2)) + (-2))
            
        }
        console.log(this.freq, this.lowerBound, this.interval_size)
    }

    valueAt(t){
        if (t<this.lowerBound){
            console.log("Error: Input parameter is out of bounds!")
            return 
        }
        var discarded = Math.floor(this.lowerBound/this.interval_size)
        while (t>= (this.gradients.length-1+discarded)*this.interval_size){
            this.gradients.push(Math.random() * (2 - (-2)) + (-2))

        }

        var numOfintervals = Math.floor(t/this.interval_size)

        var a1 = this.gradients[numOfintervals - discarded]
        var a2 = this.gradients[numOfintervals - 1 - discarded]
        var amt = this.ease((t-numOfintervals*this.interval_size) / this.interval_size)
        return this.lerp(a1,a2,amt);
    }

    ease(x){
        return 6*Math.pow(x, 5)-15*Math.pow(x, 4)+10*Math.pow(x, 3)
    }
    
    lerp(start, stop, amt){
        return amt*(stop-start)+start
    }

   discard(amount){
    toDiscard = Math.floor((amount+this.lowerBound%this.interval_size)/this.interval_size)
    this.gradients = this.gradients.slice(toDiscard,len(this.gradients))
    this.lowerBound += amount
}

}

function PerlinGen(freq, time){
    let noise = new Perlin(freq)
    var values = []
    for (i = 0; i< time; i++){
        values.push(noise.valueAt(i))
    }

    return values
}
// Source: https://github.com/Supreme-Sector/Python-Perlin-Noise
// This code has been copied and changed to JS from the cited github repository