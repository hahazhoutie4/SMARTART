// pages/work/work.js
var url=getApp().getUrl();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{},
    login:false,
    title:{},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //options.param
  switch(options.param){
case 'chengben':
  this.setData({title:'成本测算表'})
  break;
  case 'cehua':
  this.setData({title:"商务策划书"})
  case 'jiesuan':
  this.setData({title:"结算策划书"})
  break
  case "mubiao":
  this.setData({title:"目标责任书"})
  }
  var that=this
  wx.getSetting({
    success:function(res){
      console.log(res.authSetting['scope.userInfo'])
      if(res.authSetting['scope.userInfo']){
       util.validate(url,that);
      }else{
        wx.authorize({
          scope: 'scope.userInfo',
          success:function(res){
            util.validate(url,that)
          },
          fail:function(){
            //do nothing,login will be false
          }
        })

      }
    }
  })
  // wx.authorize({
  //   scope: 'scope.userInfo',
  //   success:function(re){
  //     console.log(re)
  //   }
  // })  
  },
  validate:function(){
    wx.getUserInfo({
      success: function (re) {
        wx.request({
          url: url + "validate",
          data: { "nickName": encodeURI(encodeURI(re.userInfo.nickName)) },
          success: function (res) {
            if (res.data == "authorized") {
              that.setData({ login: true })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  

  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})