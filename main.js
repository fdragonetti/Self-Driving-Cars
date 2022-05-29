const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
// Definisce la strada
const road = new Road(canvas.width/2,canvas.width*0.9);
// Definisce la macchina
const car = new Car(road.getLaneCenter(2),100,30,50);

animate();

function animate() {
    car.update(road.borders);
    canvas.height = window.innerHeight;

    // Movimento della strada;
    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    // Richiama il metodo "animate" ripetutamente, dando l'illusione di movimento
    requestAnimationFrame(animate);
}