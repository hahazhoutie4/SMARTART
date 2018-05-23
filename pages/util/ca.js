var ball=function(canvas){
  this.name='ball'
  this.x=100
  this.y=100
  this.radius=10
  this.color='#aabbcc'
  this.LineWidth=2
  this.draw=function(){
    canvas.setFillStyle(this.color)
    canvas.setStrokeStyle(this.color)
    canvas.setLineWidth(this.LineWidth)
    canvas.arc(this.x,this.y,this.radius,0,2*Math.PI,false)
    canvas.stroke()
    canvas.fill()
  }
}

module.exports={
  ball:ball
}