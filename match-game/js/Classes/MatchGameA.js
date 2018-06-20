class MatchingGame2 {

    constructor(elem, arry) { // levl is a number: 12, 20, 30 -- number of pairs to use
         
         // pass constructor args to properties
         this.app = document.getElementById(elem);
         this.arry = arry

         // grab the other DOM elements
         this.footer = document.querySelector('footer')
         this.msg = document.querySelector('h2');  
         this.clock = document.getElementById('clock');
         this.body = document.querySelector('body')
        
         // for the timer
         this.min = 0
         this.sec = 1
         this.totSec = 1
           
    } // constructor()
    
    initGame() { // runs when user clicks the PLAY button
        
        // an array to keep track of total choices -- this array never gets more than TWO items before the items are compared to see if we have a pair. Then, then array is emptied again
        this.choices = []
        
        // keep track of total tries (attempts to make pairs), matches (successful pairs), avg = tries/matches, 
        this.tries = 0
        this.matches = 0
        this.avg = 0
        this.app.innerHTML = ''
        this.min = 0
        this.sec = 1
        this.totSec = 1
        this.clock.innerHTML = '00:00' // reset the clock
        this.footer.innerHTML = 'Attempts: &nbsp; 0 &nbsp;  Matches: &nbsp; 0 &nbsp; Average: &nbsp; 0.0'
        
        this.highScoreDiv = document.createElement('div') // the div that holds the high scores
        this.highScoreDiv.className = "highScores" // this class has display:none to hide the div
        this.highScoreDiv.id = "highScoreDiv" // the id lets us get the item from the DOM later
        this.app.appendChild(this.highScoreDiv) // output the high score div to the main app div
        
         // make objects, one per item from array of names
         this.objs = this.arry.map(e => {
             
             // we need an array of not just string names but of objects, each w properties for fileName
             
         });
        
        // we need doubles of each item, so copy the objs array to a new array called gameObjs
        this.gameObjs = [ ...this.objs, ...this.objs ]

        // output grid of pics
        this.gameObjs.map((e, i) => {
           
            // make a new image each time through. the pics get the fileName property attached to it so that when the pic is clicked, even if it looks like a gray square, we know the file name
            
        });
        
        // disable mouse so user cannot click pics while all are visible at start of game
        this.body.cursor = "none"
        
       // on the count of 5, hide the pics -- after all this is a memory game
       this.hideAll()
        
    } // close initGame()
    
    hideAll() { // runs on a delay
    
        setTimeout(() => {
            
            // the setTimeout delays the hiding of the images. once this runs, though, the pics disappear by setting the img sources to the gray box
            
        }, 6000)
    
    } // close hideAll()
    
    startTimer() { // the game time starts and increments every 1 second
        
        // the sec var is incremented every 1000 ms, when sec gets to 60, it is reset to 0 and min is incremented by 1
        
   } // startTimer() 
    
   showPic() { // show a pic when player clicks on a square
    
       // when the user clicks a gray square, the image src is reset to use the fileName property of the image object. keep track of the pics -- push them into an array. When the array has 2 items in it, it is time to compare the two items to see if they have a matching name BUT not a matching id -- they must be the same pic but not the exact same square ! If the 2 pics make a match, keep them visible and update the score. If the 2 pics don't match, call the hidePic function
       
    } // showPic()
    
    hidePic() { // after showPic reveals 2nd clicked pic, hidePic is called to hide both pics, one, then the other, on a delay of 1250 ms and 2000 ms
    
        // after showPic function evaluates the 2 clicked and revealed images, if the pics are not a pair, the hidePic func is called and it resets the 2 pic sources to be the gray square

    } // hidePic()
    
    saveScore() {
        
        // after the game is done--the number of matches made equals the total number of pairs, the SAVE SCORE button appears -- clicking it calls an AJAX funtion
        // AJAX function to send out the score vars
        // php file saves new score to MySQL and loads the top high scores
        // the funciton concats the get vars into a url querystring, which is appended to the save-score-php URL. The response from save-score.php is a JSON string of high scores, which is parsed. Then the high scores are concatenated into table rows and outputted to an AP div in the middle of screen.
        // var url = 'save-score.php'
        // xhr.open('GET', url + vars, true)
        // the save-score.php page does TWO CRUD queries: saving the new game to the DB and loading the top 20 high scores
        // php then loops through the 20 scores, concats them into a JSON string and echoes that back to JS. The JSON is parse into a JS object array: 
        // var highScores = JSON.parse(xhr.responseText)
        
    } // saveScore()


} // MatchingGame()






