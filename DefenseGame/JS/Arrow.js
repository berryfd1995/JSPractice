class Arrow{
    constructor(canvas,ctx,x1, y1, x2, y2){
      this.canvas = canvas;
      this.ctx = ctx;
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.outOfBounds = false;
      this.power = this.getPower();
      this.direction = this.getDirection();
    }


    drawArrow(){
      this.ctx.beginPath();
      if(!this.outOfBounds){
        this.checkBounds();
        this.x1 +=2;
        this.x2 +=2;
        this.y1 +=2;
        this.y2 +=2;
      }
      this.ctx.moveTo(this.x1, this.y1);
      this.ctx.lineTo(this.x2, this.y2);
      this.ctx.stroke();
    }


    checkBounds(){
      if(this.x1 > this.canvas.width && this.x2 > this.canvas.width){
        this.outOfBounds = true;
        this.removeArrow();
      }else if(this.y1> this.canvas.height-50 ){
        this.outOfBounds = true;
        this.removeArrow();
      }
    }

    getPower(){

    }

    getDirection(){

    }
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  async  removeArrow() {
    await this.sleep(5000);
    this.remove(this);
  }


}
