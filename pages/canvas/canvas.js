// canvas.js
var url=getApp().getUrl();
var msg_canvas = wx.createCanvasContext("2");
var rate=6;     //触碰灵敏度
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"品牌变更",    //从上个查询网页获取专项策划的名称
    Entities:null,//从网页获取的数据
    touch:{x:'',y:''},  //获取当前触碰的坐标
    color: ["red","#7CFC00","white"],  //设置节点圆圈的颜色
    xyoff:{x1:180,x2:280,y:30,offset:40},             //左右起点、终点的x坐标，y起始坐标，y轴偏移量
    text_off_x1:{x:-55,y:-12},        //圆圈左坐标
    text_off_x2: { x:12, y: 12},     //圆圈右坐标
    person: ["刘刚", "王莉莉", "工业部门", "洪元堂", "刘伟", "李刚", "苏中泽","事业部部门","宋明刚","徐建中","刘新海"],
    gongye_person:["王银斌","刘国强","陈星","肖伟兵","谢定军","陈东"],
    shiyebu_person:["谢成","阳鹏飞","干杰军","王巍"],
    state:null,      // true表明当前canvas-id2存在内容,false表示无内容，通过start改变状态
    msgbox:{width:150,height:80},
    endpoint:[],
    percent:66,
    progress_color:"#BCEE68",
    checked:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var process=options.process   //
    var process_status;
    for(var i=this.data.person.length;i>0;i--){
      if(process.indexOf(this.data.person[i])>-1){
        process_status=i
        break;
      }
    }
    console.log(process_status)
    var status=options.status
    if(status=="Running"){
      this.setData({ percent: (process_status/this.data.person.length*100).toFixed(0) })
    }else if(status=="Aborted"){
      this.setData({ percent:0 })
    }else if(status="Finished"){
      this.setData({percent:100})
    }

    this.setData({name:options.name})
      var that=this;
      that.data.state=false;     //初始化canvas内容为空
      wx.request({
        url: url+'contentdetail?flowid='+options.id,
        data:'',
        success:function(res){
          that.setData({
            Entities: res.data,
                    })
          console.log(that.data.Entities)    //that.data.Entities.Data[0].ListNode[] 评审数组  --fianlly_delete   
                  }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      //获取最后节点
     // var length= this.data.Entities.Data[0].ListNode; //当前数组的长度
      var name="";
     
      console.log(name);
      var canvas=wx.createCanvasContext("1");
           canvas.setFontSize(15)
      var length= 50;
      for (var i = 0; i < this.data.person.length - 1;i++){
     this.drawArrow(canvas, this.data.xyoff,length,i,9,this.data.person[i+1])
      }
      canvas.draw();
        },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  drawMsgbox: function (context,message,position){
   // console.log(position)
      var x=position.x;
      var y=position.y;
      context.setStrokeStyle("black")
      context.beginPath();
      context.moveTo(x,y)
      context.lineTo(x+30,y-10)   
      context.lineTo(x+5,y-10)    //左下点
      context.lineTo(x+5,y-this.data.msgbox.height)    //左上点
      context.lineTo(x+this.data.msgbox.width, y - this.data.msgbox.height)   //右上点
      context.lineTo(x+this.data.msgbox.width,y-10)       //右下点
      context.lineTo(x+50,y-10)
      context.lineTo(x,y)
      context.closePath()
      context.setFillStyle("cyan")
      context.fill()
      context.setFillStyle("black")
      context.setFontSize(12)
      context.fillText(message,x + 5, y - this.data.msgbox.height+12)
      context.arc(position.x,position.y,4,0,Math.PI*2)
      context.stroke()
      context.draw()
      //console.log(position)
  },
  drawText:function(context,message,position,size,color){
    context.setFillStyle(color);
    context.setFontSize(size);
    context.fillText(message,position.x,position.y);  //position:{x:x,y:y}
  },

  //屏幕触发点击事件，出现对话框
    start:function(e){
      var x=e.touches[0].x
      var y=e.touches[0].y
       if (x>this.data.xyoff.x1-rate && x< this.data.xyoff.x1+rate+48){   //判断在x轴上面
       var endpoint_=this.data.endpoint;
       var count
       for(var i=0;i<endpoint_.length;i++){
         var y_=endpoint_[i].y
         if(y>y_-rate-12&&y<y_+rate){
           console.log("get it");
           var select_person=this.data.person[i+1]
           console.log(select_person)
           var listnode=this.data.Entities.Data[0].ListNode
           var length=listnode.length      //获取当前数据的长度
           for(var j=length-1;j>0;j--){
                if(listnode[j].Tip.DealUsr==select_person){
                  console.log(listnode[j].Tip.DealRemark)
                  console.log(listnode[j].Tip.DealRemark==undefined)
                  break;
                }
           }
           this.drawMsgbox(msg_canvas, "fsdfsdffsf", { x: endpoint_[i].x, y: endpoint_[i].y });
           break;
                     }
        }
       }
      },
    drawArrow:function(context,start,length,i,offset,text){
    var start_x=start.x1;
    var start_y=start.y+i*length+offset;
    var end_x=start.x1
    var end_y = start.y + length + i * length
    if (i == 0){
      context.beginPath();
      context.setFillStyle("green");      //发起人永远都是绿色的圆圈
      context.arc(start_x , start_y-4,4,0,2*Math.PI) ;    
      context.closePath();
      context.fill();
      context.fillText("刘刚", start_x + 12, start_y);      //发起人永远都是刘刚
    }
    // 先移动到初始点位，然后划线到终点 。在终点处划文本
    console.log(text)      // 打印出当前的评审人员--fianlly_delete
      context.beginPath();
    context.moveTo(start_x, start_y)
    context.lineTo(end_x,end_y);
    context.fillText(text,end_x+12,end_y+8)
    context.closePath();
    context.stroke();

    //在终点划处理圆圈（颜色按照处理来定）
    context.beginPath();
    context.setFillStyle("#ABCDEF");        //终点圈圈的颜色 由当前评审人评审通过决定
    context.arc(end_x,end_y+5,4,0,Math.PI*2);
    this.data.endpoint.push({x:end_x,y:end_y+5})
    context.closePath();
    context.fill();

    //划箭头
    context.beginPath();
    context.moveTo(end_x-5, end_y-5)
    context.lineTo(end_x, end_y)
    context.lineTo(end_x+5,end_y-5)
    context.closePath();
    context.stroke();
  },
    //切换显示
    checked:function(e){
        var ch=this.data.checked
        this.setData({checked:!ch})
    }

})