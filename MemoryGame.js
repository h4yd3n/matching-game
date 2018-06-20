class MemoryGame {
    
    constructor(app, arr) {
        
        // pass the constructor arguments to properties of Class
        this.app = document.getElementById(app)
        
        // double the array (matching games need pairs)
        this.arr = [...arr, ...arr]
        
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
    
        // loop through randomized array and make images
        for(let i = 0; i < this.arr.length; i++) {

            // CODE2 : make a new image obj
            let pic = new Image()
            // CODE3 : set its source to correct JPG
            pic.src = `images/final/200x200/${this.arr[i]}.jpg`
            // CODE4 : make pic call showPic func on click
            pic.addEventListener('click', this.showPic.bind(this))
            // CODE5 : set class to "pics"
            pic.className = "pics"
            // CODE6 : give it a name so func knows which pic is clicked
            pic.name = this.arr[i] // "anchor" or whatever
            // CODE7 : give each pic a unique ID
            pic.id = i
            // CODE8 : output the image to the app div
            this.app.appendChild(pic)
            
        }
        
        this.hideAll()

    } // close constructor()
    
    showPic() {
        alert(event.target.name + ' : ' + event.target.id)
    }
    
    hideAll() {
        
        // hide all pics (turn them gray) 5 seconds after this hideAll method is called
        
    }
    
} // close class MemoryGame