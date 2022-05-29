class Car {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Rende il movimento meno "netto"
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        // Rotazione della macchina
        this.angle = 0;

        // Sensori
        this.sensor=new Sensor(this);
        // Event listener frecce
        this.controls = new Controls();
    }

    update(roadBorders) {
        this.#move();
        this.sensor.update(roadBorders);
    }

    // Muove la macchina nel canvas
    #move() {
        // Movimento in avanti e indietro
        if(this.controls.forward) {
            this.speed += this.acceleration;
        }
        if(this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        // Evita che il movimento sia troppo veloce
        if(this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2) {
            this.speed = -this.maxSpeed/2;
        }

        if(this.speed > 0) {
            this.speed -= this.friction;
        }
        if(this.speed < 0) {
            this.speed += this.friction;
        }
        // Evita che la macchina continui a muoversi senza pressione di tasti per via della frizione
        if(Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // Capovolge i comandi dell'auto in base alla posizione
        //? Box2D è una libreria per semplificare la fisica dei movimenti
        if(this.speed != 0) {
            const flip = this.speed > 0?1:-1;
            // Rotazione dell'auto
            if(this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if(this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }


        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
        // this.y -= this.speed;
    }

    // Disegna la macchina nel canvas
    draw(ctx) {
        ctx.save();
        // Ruota la macchina
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle)

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();  
        ctx.restore();     
        
        // Disegna i sensori
        this.sensor.draw(ctx);
    }
}