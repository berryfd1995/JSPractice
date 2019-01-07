class Arrow{
    constructor(canvas,ctx,p1, p2){
      this.canvas = canvas;
      this.ctx = ctx;
      this.p1 = p1;
      this.p2 = p2;
      this.gravity = .4;
      this.setup();
    }
    setup(){
      this.speed = this.distance()/2.8;
      this.velX = (Math.cos(this.getAngle())*this.speed);
      this.velY = (Math.sin(this.getAngle())*this.speed);
    }
    getAngle(){
      return  Math.atan2(this.p2.y-this.p1.y, this.p2.x-this.p1.x);
    }
    distance(){
      return Math.sqrt(Math.pow(this.p2.x-this.p1.x,2) + Math.pow(this.p2.y-this.p1.y,2));
    }
    drawArrow(){
      if(!this.outOfBounds){
        this.checkBounds();
        this.updateCords();
      }
      this.ctx.beginPath();
      this.ctx.moveTo(this.p2.x, this.p2.y);
      this.ctx.lineTo(this.p1.x, this.p1.y);
      this.ctx.stroke();
    }
    updateCords(){
      this.velY += this.gravity;
      this.p2.x += this.velX;
      this.p2.y += this.velY;

      this.p1.x = this.p2.x + this.getVector().x;
      this.p1.y = this.p2.y + this.getVector().y;
    }
    getVector(){
      let x = this.p1.x - this.p2.x;
      let y = this.p1.y - this.p2.y;
      let mag = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
      x = x / mag;
      y = y / mag;
      x *= 25;
      y *= 25;
      return {x: x, y: y};
    }
    checkBounds(){
      if(this.p2.x > this.canvas.width && this.p1.x > this.canvas.width){
        this.outOfBounds = true;
        this.removeArrow(5000);
      }else if(this.p2.y> this.canvas.height-50 ){
        this.outOfBounds = true;
        this.removeArrow(5000);
      }else if(this.p2.x < 0){
        this.removeArrow(5000);
        this.outOfBounds = true;
      }
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async  removeArrow(ms) {
      await this.sleep(ms);
      this.remove(this);
    }
}
