class Road {
    constructor(x,width,laneCount=3){
        this.x=x;
        this.width=width;
        this.laneCount=laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        // Rende la striscia infinita
        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;

        // Definisce i bordi della strada
        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ]
    }

    // Trova il centro di una singola corsia
    getLaneCenter(laneIndex){
        const laneWidth = this.width/this.laneCount;
        // Limita il posizionamento nella corsia più a destra
        return this.left+laneWidth/2 + Math.min(laneIndex,this.laneCount-1) * laneWidth;
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        // Disegna le strisce delle corsie
        for (let i=1; i<=this.laneCount-1; i++){
            // Per ottenere la posizione su x utilizziamo la "linear interpolation"
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            );

            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }

        // Disegna le strisce esterne
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        })
    }
}