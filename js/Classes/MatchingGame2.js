class MatchingGame2 {

    constructor(elem, arry) { // levl is a number: 12, 20, 30 -- number of pairs to use
         
         // element and array passed into constructor in html file
         this.app = document.getElementById(elem);
         this.arry = arry
         this.footer = document.querySelector('footer')
         this.msg = document.querySelector('h2');  
         this.clock = document.getElementById('clock');
         this.body = document.querySelector('body')
         this.min = 0
         this.sec = 1
         this.totSec = 1
           
    } // constructor()
    
    initGame() {
        this.choices = []
        this.tries = 0
        this.matches = 0
        this.avg = 0
        this.app.innerHTML = ''
        this.min = 0
        this.sec = 1
        this.totSec = 1
        this.clock.innerHTML = '00:00'
        this.footer.innerHTML = 'Attempts: &nbsp; 0 &nbsp;  Matches: &nbsp; 0 &nbsp; Average: &nbsp; 0.0'
        
        // make objects, one per item from array array
         // each obj has two properties: fileName: 'horse.jpg' and name: 'horse'
         this.objs = this.arry.map(e => {
             let gamePiece = {
                 fileName: e + '.jpg',
                 name: e
             }
             return gamePiece
         });
        
        // copy the gamePieces array, since we need doubles of everything for matching game
        this.gameObjs = [ ...this.objs, ...this.objs ]
                
        // shuffle once
        this.gameObjs.sort((a, b) => {
            return 0.5 - Math.random()
        });
        
        // this.app.innerHTML += this.gameObjs[0].fileName + '<br/><br/>'
        
        // shuffle again
        for(let i = 0; i < this.gameObjs.length; i++) {
            let tempObj = this.gameObjs[i]
            let randNum = Math.floor(Math.random() * this.gameObjs.length)
            this.gameObjs[i] = this.gameObjs[randNum]
            this.gameObjs[randNum] = tempObj
        }
        
        // this.app.innerHTML += this.gameObjs[0].fileName + '<br/><br/>'

        // output grid of pics -- none should be clickable yet
        this.gameObjs.map((e, i) => {
            let pic = new Image();
            pic.src = 'images/final/100x100/' + e.fileName
            pic.className = 'pics' // default pic size is for hard level: 30 pairs
            // set the size of the pics based on total num pics -- easy is biggest
            if(this.arry.length == 12) { // easy: only 12 pairs
                pic.style.width = "125px"
            } 
            if(this.arry.length == 18) { // medium: 20 pairs
                pic.style.width = "115px"
            }
            if(this.arry.length == 25) { // pro: 25 pairs
                pic.style.width = "95px"
            }
            pic.name = e.name
            pic.id = i
            pic.matched = false
            pic.addEventListener('click', this.showPic.bind(this))
            this.app.appendChild(pic)
        });
        
        // disable mouse so user cannot click pics while all are visible at start of game
        this.body.cursor = "none"
        
       // on the count of 5, hide the pics -- after all this is a memory game
       this.hideAll()
        
    } // close initGame()
    
    hideAll() {
        
        this.sec = 5
        this.msg.innerHTML = 'Hiding in<span class="secs"> ' + this.sec + '</span> seconds'
        
        // run set interval once per second for 5 seconds
        var countdownInterval = setInterval(() => {  
            this.sec -= 1
            this.msg.innerHTML = 'Hiding in<span class="secs"> ' + this.sec + '</span> seconds' 
        }, 1000)
        
        setTimeout(() => {
                        
            clearInterval(countdownInterval) // turn off the countdown interval
            this.msg.innerHTML = '<span class="secs">&nbsp;</span>MATCH PAIRS!'
            
            // make an array from all the images
            let pics = document.getElementsByTagName('img')
            // HIDE ALL: iterate the array, setting each img src to blank.png
            for(let i = 0; i < pics.length; i++) {
                pics[i].src = 'images/blank.png'
            }
            
            // start timer
            this.timerInterval = setInterval(this.startTimer.bind(this), 1000)
                                
        }, 6000);
        
    } // close hidePics()
    
    startTimer() {
        
        this.sec++
        this.totSec++
        if(this.sec == 60) {
            this.sec = 0
            this.min++
        }
        if(this.sec < 10) {
            this.clock.innerHTML = '0' + this.min + ':0' + this.sec
        } else {
            this.clock.innerHTML = '0' + this.min + ':' + this.sec
        }

        this.score = Math.ceil(this.avg * this.arry.length * this.arry.length * this.matches * 1000 / this.totSec)
        this.clock.innerHTML += ' &nbsp;  &nbsp;  &nbsp; Score: ' + this.score
        
        if(this.matches == this.arry.length) {
            clearInterval(this.timerInterval)
            this.msg.innerHTML = "GAME OVER!"
            
            // make SAVE button
            this.saveBtn = document.createElement('button')
            this.saveBtn.innerHTML = 'SAVE SCORE'
            this.saveBtn.style.marginLeft = "25px"
            this.saveBtn.addEventListener('click', this.saveScore.bind(this))
            this.clock.appendChild(this.saveBtn)
            
        }

   } // startTimer() 
    
    showPic() {
        
        if(!event.target.matched) {
            
             if(this.choices.length < 2) {

               this.choices.push(event.target) // push the clicked pic into the array
               this.msg.innerHTML = event.target.name
               // reveal the image
               event.target.src = 'images/final/100x100/' + event.target.name + '.jpg'

            }

             if(this.choices.length == 2) {

                this.tries++ // one complete try (2 clicks has been made)

                if(this.choices[0].name == this.choices[1].name) {

                    // make sure the match isn't the exact same item
                    if(this.choices[0].id == this.choices[1].id) { 

                       this.msg.innerHTML = '<span class="secs">HEY?!</span> SAME ITEM!'

                       this.hidePic()

                    } else { // item names match but ID's don't, so this is a matched pair

                       this.msg.innerHTML = '<span class="secs">MATCH!</span> KEEP GOING!'
                       this.matches++ // one match has been made

                       this.choices[0].matched = "true"
                       this.choices[0].style.cursor = "default"

                       this.choices[1].matched = "true"
                       this.choices[1].style.cursor = "default"

                       this.avg = (this.matches / this.tries).toFixed(2)
                       this.footer.innerHTML = `Attempts: &nbsp; ${this.tries} &nbsp;  Matches: &nbsp; ${this.matches} &nbsp; Average: &nbsp; ${this.avg}`

                       // remove click event from matched pairs, which are now visible

                       this.choices = []        

                    }

                } else { // this.choices[0].name != this.choices[1].name

                    this.msg.innerHTML = '<span class="secs">&nbsp;</span>CHOICES DON\'T MATCH!'
                    this.hidePic()

                }

                this.avg = (this.matches / this.tries).toFixed(2)
                this.footer.innerHTML = `Attempts: &nbsp; ${this.tries} &nbsp;  Matches: &nbsp; ${this.matches} &nbsp; Average: &nbsp; ${this.avg}`

            } // end if(this.choices.length == 2) 
            
        } // end if(!event.target.matched)

    } // showPic()
    
    hidePic() { // after showPic reveals 2nd clicked pic, hidePic is called to hide both pics
        
        setTimeout(() => {
            this.choices[0].src = 'images/blank.png'
        }, 1250)
        
        setTimeout(() => {
            this.choices[1].src = 'images/blank.png'
            this.choices = []
        }, 2000)

    } // hidePic()
    
    saveScore() {
        
        // get the score values
        
        // alert('hello from saveScore method')
        var xhr = new XMLHttpRequest()
        
        xhr.onreadystatechange = function() {
            
            if(xhr.readyState == 4 && xhr.status == 200) {
                
                // alert('score saved!')
                this.showScores() 
                
            }
            
        } // close xhr.onreadystatechange = function()
        
        var procUrl = 'save-score.php?'
        // concat the score vars as url vars for ajax
        var urlVars = 'attempts=' + this.attempts
        urlVars += '&matches=' + this.matches
        urlVars += '&average=' + this.average
        urlVars += '&seconds=' + this.totSecs
        urlVars += '&score=' + this.score
        
        xhr.open('GET', procUrl + urlVars, true)
        xhr.send()
        
    } // saveScore()
    
    showScores() {
        // called by ajax after a score is saved to the db
    }

} // MatchingGame()






