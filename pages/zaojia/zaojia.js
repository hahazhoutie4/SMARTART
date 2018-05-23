// pages/zaojia/zaojia.js
var WxDraw=require("../util/wxdraw.min.js").wxDraw
var Shape=require("../util/wxdraw.min.js").Shape
var ca=require("../util/ca.js")
var url=getApp().getUrl();
var action;
Page({
  data: {
  width:0,
  height:0,
  WxCanvas:null,
  w:{},
  d:""
  },
onLoad:function(){
  wx.showLoading({
    title: '正在加载数据',
  })
  var that = this
  var canvasid = "zaojia"
  var canvascontext = wx.createCanvasContext(canvasid)
  wx.request({
    url: 'http://localhost:8000/static/json/zaojiashi/2017/jijia-2017-1.json',
    success:function(res1){
      that.setData({d:res1.data.list.examDtoList[0].content.toString()})
      console.log(res1.data.list.examDtoList[0].content)
      wx.getSystemInfo({
        success: function (res) {
          console.log("获取到系统数据")
          that.setData({
            width: res.screenWidth,
            height: res.screenHeight
          })
         var fontsize=15
          that.WxCanvas = new WxDraw(canvascontext, 0, 0, res.screenWidth, res.screenHeight)
          
          var question = new Shape('text', {
            x: 0, y: 15, text: "店啊非安抚周彤你好fsdfsfdsfs反对撒方法分身乏术的防晒服发 he", fillStyle: "#000000",fontSize:fontsize}, "fill", true)
          that.WxCanvas.add(question)
          let i = that.handleText("周彤你好fsdfsfdsfs反对撒方法分身乏术的防晒服发heal了理发店啊非安抚周彤你好fsdfsfdsfs反对撒方法分身乏术的防晒服发heal理发店啊非安抚周彤你好fsdfsfdsfs反对撒方法分身乏术的防晒服发heal了理发店啊非安抚".trim(),that.data.width,that.data.height,fontsize)
          console.log("fsdfsfdsfsfsdfsfdsfsfsdfsfdsfsfsdfsfdsfsffssff".length)
          console.log(i)
          wx.hideLoading()
    }
  })  
}
  })
  
},
onReady:function(){
  var canvas = wx.createCanvasContext("zaojia")
  var c = new ca.ball(canvas)
  c.draw()
  canvas.draw()
},
onShow:function(){
},
bindtouchstart:function(e){
  this.WxCanvas.touchstartDetect(e)
},
bindtouchmove:function(e){
  this.WxCanvas.touchmoveDetect(e)
},
bindtouchend:function(e){
  this.WxCanvas.touchendDetect(e)
},
binttap:function(e){
  this.WxCanvas.tapDetect(e)
},
bindlongpress:function(e){
  this.WxCanvas.tapDetect(e)
  },
handleText:function(t,wh,hh,fontSize){
  var re = /^[\u4e00-\u9fa5]/
  var length=t.length
  var w=0
  var s=0
  var si=0
  var arr=[]
  for(var i=0;i<length;i++){
    if(!re.test(t[i])){
      s+=fontSize
      if(parseInt(w/wh)==0&&parseInt(s/wh)==1){
        arr.push(t.substring(si,i))
        si = i
        w=0
        s=0
      }else{
        w=s
      }
    }else{
      s+=fontSize/2
      if (parseInt(w / wh) == 0 && parseInt(s / wh) == 1) {
        arr.push(t.substring(si, i))
        si = i
        w = 0
        s = 0
      }else{
        w=s
      }
    }
  }
  return(arr)
  }
})