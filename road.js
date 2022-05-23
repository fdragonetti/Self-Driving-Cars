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
    }

    // Trova il centro di una singola corsia
    getLaneCenter(laneIndex){
        const laneWidth = this.width/this.laneCount;
        return this.left+laneWidth/2 + Math.min(laneIndex,this.laneCount-1) * laneWidth;
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        // Disegna le strisce delle corsie
        for (let i=0; i<=this.laneCount; i++){
            // Per ottenere la posizione su x utilizziamo la "linear interpolation"
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            );
            // Disegna le strisce centrali
            if(i>0 && i<this.laneCount){
                ctx.setLineDash([20,20]);
            } else {
                ctx.setLineDash([]);
            }

            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }
    }
}