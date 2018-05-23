var url = getApp().getUrl();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data:null,
    data_success:0,
    data_run:0,
    display:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    var data_run = 0
    var data_success = 0
    var page=options.page
    console.log(page);
    var that=this
    if(page=="index"){
      wx.showLoading({
        title: '正在加载数据',
      })
    wx.request({
      url: url+'content',
      success:function(res){
        wx.hideLoading();
        that.setData({data:res.data})
        console.log(res.data)
        var f=res.data
        var length=f.length
                for(var i=0;i<length;i++){
                var fs=f[i]
          if(fs.Status.name=="Running"){
            data_run+=1;
          }else if(fs.Status.name=="Finished"){
            data_success+=1;
          }else{
                //都是被终止的任务
          }
        }
        that.setData({data_success:data_success,data_run:data_run})
      },
      fail:function(res){
        wx.showToast({
          title: '加载数据失败',
        })
        console.log("连接数据失败")
      }
    })
    }else if(page=="search"){
      //搜索页面
        console.log("searchvalue"+options.param)
    }
  },
  //触碰某个专项商务策划
  tap :function (e){
    var id = e.currentTarget.dataset.set
    var status=e.currentTarget.dataset.status
    var process=e.currentTarget.dataset.process
   var name_=e.currentTarget.dataset.name.split("—")
    if(e.currentTarget.dataset.name.indexOf("-")>-1){
      var gg=e.currentTarget.dataset.name.split("-")
      var name=gg[gg.length-1]
    }else{
      var name=name_[name_.length-1]
    }
       wx.navigateTo({
       url: '../canvas/canvas?id='+id+'&name='+name+'&status='+status+'&process='+process,
      })
  }
})