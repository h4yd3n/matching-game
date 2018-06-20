class MemoryGame {
    
    constructor(app, arr) {
        
        // pass the constructor arguments to properties of Class
        this.app = document.getElementById(app)
        
        // div for displaying feedback messages during game
        this.msgBox = document.getElementById('msg-box')
        
        this.footer = document.querySelector('footer')
        
        this.playBtn = document.getElementById('play-btn');
        this.playBtn.addEventListener('click', this.playGame.bind(this))
        
        // keeping score:
        this.attempts = 0
        this.matches = 0
        this.average = 0
        this.score = 0
        this.scoreBox = document.getElementById('score-box')
        
        // keeping time
        this.seconds = 5
        this.minutes = 0
        this.totSec = 0
        this.timerBox = document.getElementById('timer-box')
        
        // the array passed into the constrctor method, passed to an object
        this.arr = arr
        
        // an array to hold 2 clicked pics at a time for comparing them
        this.picChoices = []
        
        // randomize the array items
        for(let i = 0; i < this.arr.length; i++) {
            
            // assume item 0, "anchor" swapping places w some random number, "lion"
            let rando = Math.floor(Math.random()*this.arr.length)
            let tempItem = this.arr[i] // "anchor" temporarily stashed
            // replace "anchor" w "lion"
            this.arr[i] = this.arr[rando]
            // complete swap by replacing "lion" w tempItem "anchor"
            this.arr[rando] = tempItem
            
        } // end for loop
    
    } // close constructor()
    
    playGame() { // runs when user clicks PLAY
        
        // get the value (12, 18, 25, or 30) from select menu
        this.totGamePics = document.getElementById('chooser').value
        
        // a randomized array of correct length for game play
        this.gameArr = this.arr.splice(0, this.totGamePics)
        
        // double the array, since you need pairs
        this.gameArr = [...this.gameArr, ...this.gameArr]
        // alert(this.gameArr.length)
        
        // randomize the gameArr or else you get repeats
        this.gameArr.sort((a, b) => 0.5 - Math.random())
            
        // loop through randomized array and make images
        for(let i = 0; i < this.gameArr.length; i++) {

            // CODE2 : make a new image obj
            let pic = new Image()
            // CODE3 : set its source to correct JPG
            pic.src = `images/final/200x200/${this.gameArr[i]}.jpg`
            // CODE4 : make pic call showPic func on click
            pic.addEventListener('click', this.showPic.bind(this))
            // CODE5 : set class to "pics"
            pic.className = "pics"
            // CODE6 : give it a name so func knows which pic is clicked
            pic.name = this.gameArr[i] // "anchor" or whatever
            // CODE7 : give each pic a unique ID
            pic.id = i
            // CODE8 : output the image to the app div
            this.app.appendChild(pic)
            
        }
        
        this.hideAll()

        // Countdown to gray-out
        const countdownInterval = setInterval(() => {
            // shave 1 sec and update msg box 
            this.msgBox.innerHTML = 'HIDING ALL IN ' + this.seconds + ' SECONDS'
            this.seconds--
            // stop the interval when sec gets to zero
            if(this.seconds == -1) { // stop countdown
                this.msgBox.innerHTML = "GOOD LUCK!"
                clearInterval(countdownInterval)
            }
        }, 1000)
        
    } // playGame()
    
    showPic() { // runs whenever any pic is clicked
                
        // if less than 2 choices, show the just-clicked pic and push pic into array
        if(this.picChoices.length < 2) {
            
            event.target.src = 'images/final/200x200/' + event.target.name + '.jpg'
            this.picChoices.push(event.target)
            
        }
        
        // if 2 items are in the picChoices array, compare them to see if they match
        if(this.picChoices.length == 2) {
            
            this.attempts++ // right or wrong, this counts as an attempt

            // if names match, so far so good
            if(this.picChoices[0].name == this.picChoices[1].name) {
                
                // if the ID's do not match, that is a true match
                if(this.picChoices[0].id != this.picChoices[1].id) {
                    
                    // if you made it this far, you have a MATCH !!
                    this.msgBox.innerHTML = "THAT'S A MATCH! GOOD JOB!"
                    
                    // get the matched pair from the DOM
                    let picChoice0 = document.getElementById(this.picChoices[0].id)
                    let picChoice1 = document.getElementById(this.picChoices[1].id)
                    // make two replacement pics that look just like originals
                    let newPic0 = new Image()
                    let newPic1 = new Image()
                    
                    // set source and class to the new replacement images
                    newPic0.src = `images/final/200x200/${this.picChoices[0].name}.jpg`
                    newPic0.className = "pics"
                    this.app.replaceChild(newPic0, picChoice0)
                    
                    newPic1.src = `images/final/200x200/${this.picChoices[1].name}.jpg`
                    newPic1.className = "pics"
                    this.app.replaceChild(newPic1, picChoice1)

                    this.matches++ // successful attempt -- that's a match !!

                    // INSTEAD OF ALERTS OUTPUT THE FEEDBACK MSGS TO HEADER
                    this.picChoices = [] // empty the array
                    
                } else { // both ID's are the SAME !! 
                    
                    // names match, but so do ID's so it's the exact SAME image !!
                    this.msgBox.innerHTML = "Hey! You clicked the SAME pic twice!"
                    this.hideChoices()
                    
                } 
                
            } else { // names don't match -- a total mis-match

                // names don't match, so turn these boxes gray again
                this.msgBox.innerHTML = "Oops! Choices don't match! Keep trying!"
                // make the bad choices blank again
                this.hideChoices()
                
            }
            
            // update the score and output it to the scoreBox span tag
            this.average = (this.matches / this.attempts).toFixed(3)
            
            // the complex score saved to High Scores in DB
            this.score = Math.floor(this.average * this.matches * (this.arr.length ** 2) / this.totSec)
            
            this.scoreBox.innerHTML = `Attempts: &nbsp; ${this.attempts} &nbsp; 
               Matches: &nbsp; ${this.matches} &nbsp;
               Average: &nbsp; ${this.average} &nbsp;
               Score: &nbsp; ${this.score} &nbsp;`  
            
        } // end if(this.picChoices == 2)
        
    } // end showPic()
    
    hideChoices() { // delay hiding the choices -- hide 1st choice after 1.5 sec; hide 2nd choice after 3 seconds
        
        setTimeout(() => { 
            this.picChoices[0].src = "images/blank.png"
        }, 1500)

        setTimeout(() => { 
            this.picChoices[1].src = "images/blank.png"
            // after hiding choices, empty out the array
            this.picChoices = []
        }, 3000)

    } // hideChoices()
        
    hideAll() {
        
        // hide all pics (turn them gray) 5 seconds after this hideAll method is called
        setTimeout(() => { // setTimeout takes anon func as arg
            // loop through each pic, hiding each and every one
            for(let i = 0; i < this.gameArr.length; i++) {
                this.app.children[i].src = 'images/blank.png' 
            } // end for
            
            // pass the baton to the initTimer method
            this.initTimer()
            
        }, 6500)
        
    } // hideAll()
    
    initTimer() {
        
        // start the timer and update time every second until game over
        // this.seconds = 0
        
        setInterval(() => {
            
            this.seconds++
            this.totSec++
            if(this.seconds == 60) {
                this.minutes++
                this.seconds = 0
            }
            
            // ouput the time, as 00:00
            var mySec = 0
            if(this.seconds < 10) {
                mySec = '0' + this.seconds
            } else { // seconds is double-digit, so no leading zero
                 mySec = this.seconds
            }
            
            var myMin = 0
            if(this.minutes < 10) {
                myMin = '0' + this.minutes
            } else { // minutes is double-digit, so no leading zero
                 myMin = this.minutes
            }
            
            this.timerBox.innerHTML = myMin + ':' + mySec
            
        }, 1000)
        
    }
    
} // close class MemoryGame




