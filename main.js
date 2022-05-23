const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
// Definisce la strada
const road = new Road(canvas.width/2,canvas.width*0.9);
// Definisce la macchina
const car = new Car(road.getLaneCenter(2),100,30,50);

animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx);
    // Richiama il metodo "animate" ripetutamente, dando l'illusione di movimento
    requestAnimationFrame(animate);
}