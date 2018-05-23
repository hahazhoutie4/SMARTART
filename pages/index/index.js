//index.js
//获取应用实例
var url = getApp().getUrl();
Page({
  data: {
    color: ["#87CEEB", "#698B22", "#4876FF", "#C0FF3E", "#BFEFFF", "#DC143C", "#E6E6FA"],
    url: [url+"image?id=1122",url+"image?id=1123"],
    data: [{ year: 2017 - 1, data: 131200.0 }, { year: 2017 - 2, data: 101200.0 }, { year: 2017 - 3, data: 91200.0 }, { year: 2017 - 4, data: 121200.0 }, { year: 2017 - 5, data: 111200.0}] //画布结算数据
      },
  onLoad: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        console.log(res.windowWidth)
      },
    })
  },
    info:function(e){
        wx.navigateTo({
            url: '../work/work?param='+e.currentTarget.dataset.idx,
        })
          },
  /** map没有写完
   * */
    getlocation:function(){
        wx.navigateTo({
            url: '../map/map',
        })
    }
,
  look:function(e){
    wx.navigateTo({
      url: '../content/content?page=index',
    })
  },
  quequan:function(e){
      var data=e.currentTarget.dataset.ff;
      if(data==1){
            //正在申报
      }else if(data==2){
            //正在走流程

      }else if(data==3){
            //已经完成

      }else{
          //动态更新台帐
          
      }
  },
  zaojia:function(e){
    wx.navigateTo({
      url: '../zaojia/zaojia',
    })
  }
})