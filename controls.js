class Controls {
    constructor() {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        this.#addKeyboardListeners();
    }

    //? L'hashtag definisce un metodo privato
    #addKeyboardListeners() {
        //? Utilizza l'arrow function in modo che il "this" si riferisca al contesto dell'oggetto, mentre con una funzione normale il "this" si riferirebbe alla funzione stessa
        document.onkeydown=(event)=>{
            switch (event.key) {
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }
            //console.table(this);
        }

        document.onkeyup=(event)=>{
            switch (event.key) {
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
            //console.table(this);
        }
    }
}