class MatchGame {

    constructor(elem) {
    
         this.imgFiles = ["anchor", "apple", "barn", "baseball", "basketball-player", "boxer", "car", "cat", "cowboy-boot", "duck", "eagle", "golden-anchor", "grapes", "horse", "house", "jumping-horse", "jumping", "key", "keys", "lion", "monster-truck", "motorcycle", "pocket-watch", "scissors", "seahorse", "shoe", "stopwatch", "wagon-wheel", "wheel", "slamdunk"]; 
        
        // more: , "shoe", "stopwatch", "wagon-wheel", "wheel", "basketball-player-dunking"

         this.app = document.getElementById(elem);
        
         this.footer = document.querySelector('footer')
         this.msg = document.querySelector('h2');
        
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
        
            this.gameObjs.map((e, i) => {
                let pic = new Image();
                pic.src = 'images/final/100x100/' + e.fileName
                pic.className = 'pics'
                pic.name = e.name
                pic.id = i
                pic.addEventListener('click', this.evalPicClick.bind(this))
                this.app.appendChild(pic)
            });
        
    } // end initGame()
    
    evalPicClick() {
        
        if(this.choices.length < 2) {
           
           this.choices.push(event.target) 
           this.msg.innerHTML = event.target.name
            
        }
        
         if(this.choices.length == 2) {
             
            this.tries++ // one complete try (2 clicks has been made)
             
            if(this.choices[0].name == this.choices[1].name) {
                
                // make sure the match isn't the exact same item
                if(this.choices[0].id == this.choices[1].id) { 
                    
                    this.msg.innerHTML = 'HEY! YOU CLICKED THE SAME ITEM TWICE! START OVER!'
                    
                } else { // item names match but ID's don't, so this is a true matched pair -- which is GOOD!
                          
                   this.msg.innerHTML = 'GOOD JOB! YOU MADE A MATCH! KEEP GOING!'
                   this.matches++ // one match has been made
                   // "turn over" the pairs
                   let pic1 = document.getElementById(this.choices[0].id)
                   pic1.src = 'images/blank.png'
                   pic1.style.backgroundColor = "#d3cbcb"
                   let pic2 = document.getElementById(this.choices[1].id)
                   pic2.src = 'images/blank.png'
                   pic2.style.backgroundColor = "#d3cbcb"
                    
                }
                
            } else { // this.choices[0].name != this.choices[1].name
                
                this.msg.innerHTML = 'CHOICES DON\'T MATCH! START OVER!'
                
            }
             
            this.choices = [] // start over w empty array
            this.avg = (this.matches / this.tries).toFixed(2)
            this.footer.innerHTML = `Attempts: &nbsp; ${this.tries} &nbsp;  Matches: &nbsp; ${this.matches} &nbsp; Average: &nbsp; ${this.avg}`
            
        } // end if(this.choices.length == 2) 
        
    } // close evalPicClick()

} // MatchGame()