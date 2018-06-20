class MatchingGame {

    constructor(elem) {
    
         this.imgFiles = ["anchor", "apple", "barn", "baseball", "basketball-player", "boxer", "car", "cat", "cowboy-boot", "duck", "eagle", "golden-anchor", "grapes", "horse", "house", "jumping-horse", "jumping", "key", "keys", "lion", "monster-truck", "motorcycle", "pocket-watch", "scissors", "seahorse", "shoe", "stopwatch", "wagon-wheel", "wheel", "slamdunk"]; 
        
         // more: , "shoe", "stopwatch", "wagon-wheel", "wheel", "basketball-player-dunking"

         this.app = document.getElementById(elem);
        
         this.footer = document.querySelector('footer')
         this.msg = document.querySelector('h2');
        
         this.rando = 0
        
         // make objects, one per image from imgFiles array
         // each obj has two properties: fileName to render the image
         // and name to do the matching: "jumping" == "jumping"
         this.objs = this.imgFiles.map(e => {
             
             let gamePiece = {
                 fileName: e + '.jpg',
                 name: e
             }
             
             // browser test:
             // this.app.innerHTML += gamePiece.fileName + ' '
             return gamePiece
             
         });
        
        // copy the gamePieces array, since we need doubles of everything for matching game
        this.gameObjs = [ ...this.objs, ...this.objs ]
        
        // this.app.innerHTML = this.gameObjs[0].fileName + '<br/><br/>'
        
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
           
    } // constructor()
    
    initGame() {
        
        this.choices = []
        this.tries = 0
        this.matches = 0
        this.avg = 0
        this.app.innerHTML = ''

        // fill app w randomly ordered pics

        this.gameObjs.map((e, i) => {

            let pic = new Image();
            pic.src = 'images/final/100x100/' + e.fileName
            pic.className = 'pics'
            pic.name = e.name
            pic.id = i
            pic.addEventListener('click', this.showPic.bind(this))
            this.app.appendChild(pic)

        });

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
            this.msg.innerHTML = 'MEMORY CHALLENGE!<span class="secs">&nbsp;</span>MATCH PAIRS!'
            
            // make an array from all the images
            let pics = document.getElementsByTagName('img')
            // HIDE ALL: iterate the array, setting each img src to blank.png
            for(let i = 0; i < pics.length; i++) {
                pics[i].src = 'images/blank.png'
            }
                                
        }, 6000);
        
    } // close hidePics()
    
    showPic() {
        
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
                    
                   this.msg.innerHTML = '<span class="secs">WTF?!</span> YOU CLICKED THE SAME ITEM TWICE!!'
                    
                   this.hidePic()
                                        
                } else { // item names match but ID's don't, so this is a matched pair
                   
                   this.msg.innerHTML = '<span class="secs">MATCH!</span> KEEP GOING!'
                   this.matches++ // one match has been made
                    
                   // "turn over" the pairs and remove their click events
                   this.choices[0].removeEventListener('click', this.showPic.bind(this))
                   let pic1 = document.getElementById(this.choices[0].id)
                   
                   this.choices[1].removeEventListener('click', this.showPic.bind(this))
                   let pic2 = document.getElementById(this.choices[1].id) 
                   this.avg = (this.matches / this.tries).toFixed(2)
                   this.footer.innerHTML = `Attempts: &nbsp; ${this.tries} &nbsp;  Matches: &nbsp; ${this.matches} &nbsp; Average: &nbsp; ${this.avg}`
                   this.choices = []
                }
                
            } else { // this.choices[0].name != this.choices[1].name
                
                this.msg.innerHTML = '<span class="secs">&nbsp;</span>CHOICES DON\'T MATCH! TRY AGAIN!'
                
                this.hidePic()
                
            }
             
            this.avg = (this.matches / this.tries).toFixed(2)
            this.footer.innerHTML = `Attempts: &nbsp; ${this.tries} &nbsp;  Matches: &nbsp; ${this.matches} &nbsp; Average: &nbsp; ${this.avg}`
            
        } // end if(this.choices.length == 2) 

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

} // MatchingGame()






